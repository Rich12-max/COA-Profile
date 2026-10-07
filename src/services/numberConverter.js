/**
 * Number System Converter Engine (Pure Client-Side JavaScript)
 * Handles radix validation, mathematical conversion, two's complement,
 * and step-by-step mathematical explanations.
 */

const RADIX_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function validateNumberForBase(numberStr, base) {
  const cleanStr = (numberStr || '').trim();
  if (!cleanStr) {
    return { valid: false, error: "Input number cannot be empty." };
  }

  let body = cleanStr;
  if (body.startsWith('-') || body.startsWith('+')) {
    body = body.slice(1);
  }

  if (!body) {
    return { valid: false, error: "Input contains only a sign without any numeric digits." };
  }

  if (base === 16 && (body.startsWith('0x') || body.startsWith('0X'))) {
    body = body.slice(2);
    if (!body) {
      return { valid: false, error: "Hexadecimal input lacks digits after prefix '0x'." };
    }
  }

  const allowedChars = new Set(RADIX_CHARS.slice(0, base).toLowerCase() + RADIX_CHARS.slice(0, base).toUpperCase());

  for (const char of body) {
    if (!allowedChars.has(char)) {
      if (base === 2) {
        return { valid: false, error: `Invalid binary digit '${char}': Binary (Base 2) allows only 0 and 1.` };
      } else if (base === 8) {
        return { valid: false, error: `Invalid octal digit '${char}': Octal (Base 8) allows digits 0 through 7.` };
      } else if (base === 10) {
        return { valid: false, error: `Invalid decimal digit '${char}': Decimal (Base 10) allows only digits 0 through 9.` };
      } else if (base === 16) {
        return { valid: false, error: `Invalid hexadecimal digit '${char}': Hexadecimal (Base 16) allows only 0-9 and A-F.` };
      } else {
        return { valid: false, error: `Invalid digit '${char}' for Base ${base}.` };
      }
    }
  }

  return { valid: true, error: null };
}

export function parseToDecimal(numberStr, fromBase) {
  let cleanStr = (numberStr || '').trim();
  const isNegative = cleanStr.startsWith('-');
  if (isNegative || cleanStr.startsWith('+')) {
    cleanStr = cleanStr.slice(1);
  }

  if (fromBase === 16 && (cleanStr.startsWith('0x') || cleanStr.startsWith('0X'))) {
    cleanStr = cleanStr.slice(2);
  }

  const val = parseInt(cleanStr, fromBase);
  if (isNaN(val)) throw new Error(`Could not parse '${numberStr}' in Base ${fromBase}.`);
  return isNegative ? -val : val;
}

export function formatFromDecimal(decimalVal, toBase) {
  if (decimalVal === 0) return "0";
  const isNegative = decimalVal < 0;
  let n = Math.abs(decimalVal);

  const digits = [];
  while (n > 0) {
    digits.push(RADIX_CHARS[n % toBase]);
    n = Math.floor(n / toBase);
  }

  const res = digits.reverse().join('');
  return isNegative ? `-${res}` : res;
}

export function calculateTwosComplement(val, bits) {
  const minVal = -(1 << (bits - 1));
  const maxVal = (1 << (bits - 1)) - 1;

  if (val < minVal || val > maxVal) {
    return `Overflow: value ${val} cannot fit into signed ${bits}-bit integer (range: ${minVal} to ${maxVal})`;
  }

  if (val >= 0) {
    return (val >>> 0).toString(2).padStart(bits, '0').slice(-bits);
  } else {
    const twosVal = (1 << bits) + val;
    return twosVal.toString(2).padStart(bits, '0');
  }
}

export function generateConversionSteps(originalInput, fromBase, toBase, decVal, resultStr) {
  const steps = [];
  const absDec = Math.abs(decVal);

  if (fromBase !== 10) {
    let clean = originalInput.trim().replace(/^[-+]/, '').toLowerCase();
    if (fromBase === 16 && clean.startsWith('0x')) {
      clean = clean.slice(2);
    }

    const expansionParts = [];
    const length = clean.length;
    for (let idx = 0; idx < length; idx++) {
      const power = length - 1 - idx;
      const digitVal = parseInt(clean[idx], fromBase);
      expansionParts.push(`(${digitVal} × ${fromBase}^${power})`);
    }

    steps.push(`Step 1 (Expand to Base 10): ${expansionParts.join(' + ')} = ${absDec} (Decimal)`);
  } else {
    steps.push(`Step 1: Starting with Decimal value = ${decVal}`);
  }

  if (toBase !== 10 && absDec > 0) {
    const divSteps = [];
    let curr = absDec;
    let stepIdx = 1;
    const remainders = [];

    while (curr > 0) {
      const q = Math.floor(curr / toBase);
      const r = curr % toBase;
      const remChar = RADIX_CHARS[r];
      remainders.push(remChar);
      divSteps.push(`  ${stepIdx}. ${curr} ÷ ${toBase} = Quotient ${q}, Remainder ${r} ('${remChar}')`);
      curr = q;
      stepIdx++;
    }

    steps.push(`Step 2 (Successive Division by Base ${toBase}):`);
    steps.push(...divSteps);
    steps.push(`Step 3 (Assemble Result): Read remainders bottom to top: ${remainders.reverse().join('')}`);
  } else if (toBase === 10) {
    steps.push(`Step 2: Value already represented in target Base 10: ${resultStr}`);
  } else {
    steps.push(`Step 2: Zero value evaluates directly to '0' across all bases.`);
  }

  return steps;
}

export function convertNumberSystem({ number, from_base, to_base, bit_width = 8 }) {
  const validation = validateNumberForBase(number, from_base);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const decVal = parseToDecimal(number, from_base);
  const resultStr = formatFromDecimal(decVal, to_base);
  const steps = generateConversionSteps(number, from_base, to_base, decVal, resultStr);

  return {
    from_base,
    to_base,
    input: number.trim(),
    result: resultStr,
    decimal_value: decVal.toString(10),
    binary: formatFromDecimal(decVal, 2),
    hexadecimal: formatFromDecimal(decVal, 16),
    octal: formatFromDecimal(decVal, 8),
    twos_complement_8bit: calculateTwosComplement(decVal, 8),
    twos_complement_16bit: calculateTwosComplement(decVal, 16),
    steps: steps,
  };
}
