/**
 * Instruction Set Architecture & Cycle Simulator Engine
 * Ported from https://github.com/Rich12-max/COA-SIMULATOR.git
 * Converts high-level arithmetic expressions to Postfix and generates
 * machine instructions across 3-Address, 2-Address, 1-Address (Accumulator),
 * and 0-Address (Stack) CPU instruction formats.
 */

export const SAMPLE_EXPRESSIONS = [
  '(A+B)*(C-D)/E',
  'A+B*C',
  '((A+B)-C)/(D+E)',
  'A*B+C*D',
  '(A+B)*(C+D)'
];

export function isOperand(token) {
  return /^[A-Z]$/.test(token);
}

export function precedence(operator) {
  if (operator === '+' || operator === '-') return 1;
  if (operator === '*' || operator === '/') return 2;
  return 0;
}

export function validateExpression(expression) {
  const sanitized = (expression || '').replace(/\s+/g, '').toUpperCase();

  if (!sanitized) {
    return { valid: false, error: 'Enter an expression using uppercase letters and + - * / ( ).' };
  }

  if (/[^A-Z+\-*/()]/.test(sanitized)) {
    return { valid: false, error: 'Only uppercase letters A-Z and operators + - * / ( ) are allowed.' };
  }

  let balance = 0;
  let previousType = 'start';

  for (const token of sanitized) {
    const currentType = isOperand(token)
      ? 'operand'
      : token === '('
        ? 'open'
        : token === ')'
          ? 'close'
          : 'operator';

    if (currentType === 'operand') {
      if (previousType === 'operand' || previousType === 'close') {
        return { valid: false, error: 'Missing operator between adjacent operands or parentheses.' };
      }
      previousType = 'operand';
      continue;
    }

    if (currentType === 'open') {
      if (previousType === 'operand' || previousType === 'close') {
        return { valid: false, error: 'Missing operator before opening parenthesis.' };
      }
      balance += 1;
      previousType = 'open';
      continue;
    }

    if (currentType === 'close') {
      if (balance === 0 || previousType === 'operator' || previousType === 'open' || previousType === 'start') {
        return { valid: false, error: 'Invalid closing parenthesis placement.' };
      }
      balance -= 1;
      previousType = 'close';
      continue;
    }

    if (previousType !== 'operand' && previousType !== 'close') {
      return { valid: false, error: 'An operator must follow an operand or closing parenthesis.' };
    }

    previousType = 'operator';
  }

  if (balance !== 0) {
    return { valid: false, error: 'Parentheses are unbalanced.' };
  }

  if (previousType === 'operator' || previousType === 'open' || previousType === 'start') {
    return { valid: false, error: 'Expression cannot end with an operator or an open parenthesis.' };
  }

  return { valid: true, sanitized };
}

export function infixToPostfix(expression) {
  const output = [];
  const stack = [];

  for (const token of expression) {
    if (isOperand(token)) {
      output.push(token);
      continue;
    }

    if (token === '(') {
      stack.push(token);
      continue;
    }

    if (token === ')') {
      while (stack.length && stack[stack.length - 1] !== '(') {
        output.push(stack.pop());
      }
      stack.pop();
      continue;
    }

    while (stack.length && precedence(stack[stack.length - 1]) >= precedence(token)) {
      output.push(stack.pop());
    }
    stack.push(token);
  }

  while (stack.length) {
    output.push(stack.pop());
  }

  return output.join('');
}

export function generateThreeAddressCode(postfix) {
  const stack = [];
  const instructions = [];
  let registerIndex = 1;

  const opcodeMap = {
    '+': 'ADD',
    '-': 'SUB',
    '*': 'MUL',
    '/': 'DIV',
  };

  for (const token of postfix) {
    if (isOperand(token)) {
      stack.push(token);
      continue;
    }

    const right = stack.pop();
    const left = stack.pop();
    const resultRegister = `R${registerIndex++}`;
    const mnemonic = opcodeMap[token] || token;
    const comment = `${resultRegister} ← ${left} ${token} ${right}`;

    instructions.push({
      mnemonic,
      operands: `${resultRegister}, ${left}, ${right}`,
      full: `${mnemonic} ${resultRegister}, ${left}, ${right}`,
      comment
    });
    stack.push(resultRegister);
  }

  return {
    instructions,
    count: instructions.length,
  };
}

export function generateTwoAddressCode(postfix) {
  const stack = [];
  const instructions = [];
  let registerIndex = 1;

  const opcodeMap = {
    '+': 'ADD',
    '-': 'SUB',
    '*': 'MUL',
    '/': 'DIV',
  };

  for (const token of postfix) {
    if (isOperand(token)) {
      stack.push(token);
      continue;
    }

    const right = stack.pop();
    const left = stack.pop();
    const targetRegister = left.startsWith('R') ? left : `R${registerIndex++}`;

    if (!left.startsWith('R')) {
      instructions.push({
        mnemonic: 'MOV',
        operands: `${targetRegister}, ${left}`,
        full: `MOV ${targetRegister}, ${left}`,
        comment: `${targetRegister} ← ${left}`
      });
    }

    const mnemonic = opcodeMap[token] || token;
    const comment = `${targetRegister} ← ${targetRegister} ${token} ${right}`;
    instructions.push({
      mnemonic,
      operands: `${targetRegister}, ${right}`,
      full: `${mnemonic} ${targetRegister}, ${right}`,
      comment
    });
    stack.push(targetRegister);
  }

  return {
    instructions,
    count: instructions.length,
  };
}

export function generateOneAddressCode(postfix) {
  const stack = [];
  const instructions = [];
  let tempIndex = 1;

  const opcodeMap = {
    '+': 'ADD',
    '-': 'SUB',
    '*': 'MUL',
    '/': 'DIV',
  };

  for (const token of postfix) {
    if (isOperand(token)) {
      stack.push(token);
      continue;
    }

    const right = stack.pop();
    const left = stack.pop();
    const tempName = `T${tempIndex++}`;
    const mnemonic = opcodeMap[token] || token;

    instructions.push({
      mnemonic: 'LOAD',
      operands: left,
      full: `LOAD ${left}`,
      comment: `ACC ← ${left}`
    });
    instructions.push({
      mnemonic,
      operands: right,
      full: `${mnemonic} ${right}`,
      comment: `ACC ← ACC ${token} ${right}`
    });
    instructions.push({
      mnemonic: 'STORE',
      operands: tempName,
      full: `STORE ${tempName}`,
      comment: `${tempName} ← ACC`
    });
    stack.push(tempName);
  }

  return {
    instructions,
    count: instructions.length,
  };
}

export function generateZeroAddressCode(postfix) {
  const instructions = [];

  const opcodeMap = {
    '+': 'ADD',
    '-': 'SUB',
    '*': 'MUL',
    '/': 'DIV',
  };

  for (const token of postfix) {
    if (isOperand(token)) {
      instructions.push({
        mnemonic: 'PUSH',
        operands: token,
        full: `PUSH ${token}`,
        comment: `Push ${token} onto stack`
      });
      continue;
    }

    const mnemonic = opcodeMap[token] || token;
    const comment = `Pop top two operands, evaluate ${mnemonic}, push result`;
    instructions.push({
      mnemonic,
      operands: '',
      full: mnemonic,
      comment
    });
  }

  return {
    instructions,
    count: instructions.length,
  };
}

export function simulateInstructionExecution(expression) {
  const validation = validateExpression(expression);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const postfix = infixToPostfix(validation.sanitized);
  const three = generateThreeAddressCode(postfix);
  const two = generateTwoAddressCode(postfix);
  const one = generateOneAddressCode(postfix);
  const zero = generateZeroAddressCode(postfix);

  return {
    expression: validation.sanitized,
    postfix,
    three,
    two,
    one,
    zero,
  };
}
