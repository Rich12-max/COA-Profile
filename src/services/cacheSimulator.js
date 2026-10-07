/**
 * Cache Simulator Engine (Pure Client-Side JavaScript)
 * Calculates bitwise address decomposition (Tag, Set Index, Offset),
 * cache directory preview layout, hit/miss candidate analysis,
 * and step-by-step mathematical derivations for 0-way, 1-way, 2-way, and 3-way caches.
 */

function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

function parseAddress(addrStr) {
  const clean = (addrStr || '').trim();
  if (clean.toLowerCase().startsWith('0x')) {
    const val = parseInt(clean, 16);
    if (isNaN(val)) throw new Error(`Invalid hexadecimal address: ${addrStr}`);
    return val >>> 0;
  }
  const val = parseInt(clean, 10);
  if (isNaN(val)) throw new Error(`Invalid memory address: ${addrStr}`);
  return val >>> 0;
}

export function calculateCacheMapping({
  ways,
  cache_size_bytes,
  block_size_bytes,
  address_bits = 32,
  memory_address = "0x7FFF04A8",
  replacement_policy = "LRU"
}) {
  if (cache_size_bytes <= 0) {
    throw new Error("Cache size must be greater than 0 bytes.");
  }
  if (block_size_bytes <= 0) {
    throw new Error("Block size must be greater than 0 bytes.");
  }
  if (block_size_bytes > cache_size_bytes) {
    throw new Error("Block size cannot exceed total cache size.");
  }
  if (!isPowerOfTwo(block_size_bytes)) {
    throw new Error(`Block size (${block_size_bytes}B) must be a power of 2.`);
  }

  const total_lines = Math.floor(cache_size_bytes / block_size_bytes);
  const offset_bits = Math.round(Math.log2(block_size_bytes));

  let associativity_name = "";
  let ways_per_set = 1;
  let number_of_sets = 1;
  let set_index_bits = 0;
  let tag_bits = 0;
  let pedagogical_notes = "";

  if (ways === 0) {
    // 0-Way / Fully Associative
    associativity_name = "0-Way Set (Fully Associative Memory Pool)";
    ways_per_set = total_lines;
    number_of_sets = 1;
    set_index_bits = 0;
    tag_bits = address_bits - offset_bits;
    pedagogical_notes =
      "In 0-Way or Fully Associative organization, there are zero set index bits. Any main memory block " +
      "can be placed in any cache line. This eliminates conflict misses completely, but requires parallel " +
      "hardware comparators for every single cache line, making large pools costly and latency-intensive.";
  } else if (ways === 1) {
    // 1-Way / Direct Mapped
    associativity_name = "1-Way Set (Direct Mapped Cache)";
    ways_per_set = 1;
    number_of_sets = total_lines;
    set_index_bits = Math.round(Math.log2(number_of_sets));
    tag_bits = address_bits - (set_index_bits + offset_bits);
    pedagogical_notes =
      "In a 1-Way (Direct Mapped) cache, each set consists of exactly 1 line. Every memory block maps to " +
      "exactly one cache line: Set = (Block Address mod Number of Lines). This provides the lowest comparator " +
      "cost and fastest lookup, but multiple frequently used blocks mapping to the same line will cause conflict misses.";
  } else if (ways === 2) {
    // 2-Way Set Associative
    associativity_name = "2-Way Set Associative Cache";
    ways_per_set = 2;
    number_of_sets = Math.floor(total_lines / 2);
    set_index_bits = Math.round(Math.log2(number_of_sets));
    tag_bits = address_bits - (set_index_bits + offset_bits);
    pedagogical_notes =
      "In a 2-Way Set Associative cache, each set houses 2 lines (ways). A memory block maps to a designated set, " +
      "and can occupy either of the two ways. If both lines are filled, a replacement policy (such as LRU) selects " +
      "which line to evict. This dramatically cuts conflict misses compared to direct mapping.";
  } else if (ways === 3) {
    // 3-Way Set Associative
    associativity_name = "3-Way Set Associative Cache";
    ways_per_set = 3;
    const raw_sets = Math.floor(total_lines / 3);
    number_of_sets = raw_sets >= 1 ? (1 << Math.floor(Math.log2(raw_sets))) : 1;
    set_index_bits = number_of_sets > 1 ? Math.round(Math.log2(number_of_sets)) : 0;
    tag_bits = address_bits - (set_index_bits + offset_bits);
    pedagogical_notes =
      "A 3-Way Set Associative cache provides three parallel lines per set. Tri-way tag comparators evaluate " +
      "all three ways simultaneously. While non-power-of-2 ways are less common in general-purpose CPU L1 caches, " +
      "they appear in custom DSPs and embedded accelerators to balance associativity and cache line capacity.";
  } else {
    throw new Error(`Unsupported associativity: ${ways}-way.`);
  }

  // Address parsing & extraction
  const parsed_addr = parseAddress(memory_address);
  const offset_mask = (1 << offset_bits) - 1;
  const offset_val = parsed_addr & offset_mask;

  let set_val = 0;
  if (set_index_bits > 0) {
    const set_mask = (1 << set_index_bits) - 1;
    set_val = (parsed_addr >>> offset_bits) & set_mask;
  }

  const tag_val = (parsed_addr >>> (offset_bits + set_index_bits));

  // Mathematical Calculation Steps
  const calc_steps = [
    `Step 1 (Total Cache Lines): Total Lines (L) = Cache Size (${cache_size_bytes}B) ÷ Block Size (${block_size_bytes}B) = ${total_lines} lines.`,
    `Step 2 (Word/Byte Offset Bits): Offset = log₂(Block Size) = log₂(${block_size_bytes}) = ${offset_bits} bits.`,
  ];

  if (ways === 0) {
    calc_steps.push("Step 3 (Sets for 0-Way / Fully Associative): 1 unified pool of lines. No set index bits needed (Set Index = 0 bits).");
    calc_steps.push(`Step 4 (Tag Bits): Tag = Total Address Bits (${address_bits}) − Offset Bits (${offset_bits}) = ${tag_bits} bits.`);
  } else {
    calc_steps.push(`Step 3 (Number of Sets): Sets (S) = Total Lines (${total_lines}) ÷ Ways (${ways_per_set}) = ${number_of_sets} sets.`);
    calc_steps.push(`Step 4 (Set Index Bits): Set Index = log₂(Sets) = log₂(${number_of_sets}) = ${set_index_bits} bits.`);
    calc_steps.push(`Step 5 (Tag Bits Calculation): Tag = Address Bits (${address_bits}) − [Set Bits (${set_index_bits}) + Offset Bits (${offset_bits})] = ${tag_bits} bits.`);
  }

  calc_steps.push(
    `Step 6 (Deconstruct Query Address 0x${parsed_addr.toString(16).toUpperCase()}): ` +
    `Tag = 0x${tag_val.toString(16).toUpperCase()} (${tag_val.toString(2).padStart(tag_bits, '0')}), ` +
    `Set Index = ${set_val} (0x${set_val.toString(16).toUpperCase()}), ` +
    `Offset = ${offset_val} (0x${offset_val.toString(16).toUpperCase()}).`
  );

  // Cache table preview rows
  const visual_rows = [];
  const preview_sets_count = Math.min(4, number_of_sets);

  for (let s_idx = 0; s_idx < preview_sets_count; s_idx++) {
    const slots = [];
    const display_ways = Math.min(ways_per_set, 4);
    for (let w_idx = 0; w_idx < display_ways; w_idx++) {
      const is_hit_candidate = (s_idx === set_val && w_idx === 0);
      const tagStr = is_hit_candidate
        ? `0x${tag_val.toString(16).toUpperCase().padStart(4, '0')}`
        : `0x${((tag_val + s_idx + w_idx * 17) & 0xFFFF).toString(16).toUpperCase().padStart(4, '0')}`;

      slots.push({
        way_index: w_idx,
        tag: tagStr,
        valid: is_hit_candidate ? true : (s_idx % 2 === 0),
        status: is_hit_candidate ? "Match Candidate" : "Valid Block",
      });
    }

    visual_rows.push({
      set_index: s_idx,
      set_hex: `0x${s_idx.toString(16).toUpperCase().padStart(2, '0')}`,
      blocks: slots,
    });
  }

  const hit_miss_analysis = {
    query_address: `0x${parsed_addr.toString(16).toUpperCase()}`,
    target_set: set_val,
    target_tag: `0x${tag_val.toString(16).toUpperCase()}`,
    offset: offset_val,
    simulated_lookup: `Tag Comparator evaluation triggered on Set ${set_val}`,
    comparator_checks: `${ways_per_set} parallel comparator(s) active simultaneously`,
    replacement_algorithm_active: replacement_policy,
    compulsory_miss_check: "If line valid bit is 0, a cold/compulsory miss occurs, fetching block from main memory DRAM into cache.",
  };

  const bit_breakdown = {
    tag_bits,
    set_index_bits,
    offset_bits,
    total_bits: address_bits,
    tag_hex: `0x${tag_val.toString(16).toUpperCase()}`,
    tag_bin: tag_val.toString(2).padStart(Math.max(1, tag_bits), '0'),
    set_index_dec: set_val,
    set_index_bin: set_val.toString(2).padStart(Math.max(1, set_index_bits), '0'),
    offset_dec: offset_val,
    offset_bin: offset_val.toString(2).padStart(Math.max(1, offset_bits), '0'),
  };

  return {
    associativity_name,
    ways_per_set,
    total_cache_size_bytes: cache_size_bytes,
    block_size_bytes: block_size_bytes,
    total_lines,
    number_of_sets,
    bit_breakdown,
    test_address: `0x${parsed_addr.toString(16).toUpperCase()}`,
    calculation_steps: calc_steps,
    cache_table_preview: visual_rows,
    hit_miss_analysis,
    pedagogical_notes,
  };
}
