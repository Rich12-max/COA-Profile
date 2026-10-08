import React, { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { convertNumberSystem } from '../services/numberConverter';
import { calculateCacheMapping } from '../services/cacheSimulator';
import { simulateInstructionExecution, SAMPLE_EXPRESSIONS } from '../services/instructionSimulator';

export default function CoaLearningPage() {
  const fromBaseId = useId();
  const toBaseId = useId();

  // Active category navigation tab
  const [activeTab, setActiveTab] = useState('overview');

  // --- Number System Lab State ---
  const [numInput, setNumInput] = useState('45');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [numResult, setNumResult] = useState(() => {
    try {
      return convertNumberSystem({ number: '45', from_base: 10, to_base: 2 });
    } catch {
      return null;
    }
  });
  const [numError, setNumError] = useState(null);

  const handleConvertNumber = (e) => {
    if (e) e.preventDefault();
    try {
      setNumError(null);
      const res = convertNumberSystem({
        number: numInput,
        from_base: fromBase,
        to_base: toBase,
        bit_width: 8
      });
      setNumResult(res);
    } catch (err) {
      setNumError(err.message || 'Invalid number format for selected radix.');
      setNumResult(null);
    }
  };

  // --- Cache Mapping Lab State ---
  const [cacheAddress, setCacheAddress] = useState('0x7FFF04A8');
  const [cacheSize, setCacheSize] = useState(1024);
  const [blockSize, setBlockSize] = useState(64);
  const [cacheResults, setCacheResults] = useState(() => {
    try {
      return {
        0: calculateCacheMapping({ ways: 0, cache_size_bytes: 1024, block_size_bytes: 64, address_bits: 32, memory_address: '0x7FFF04A8' }),
        1: calculateCacheMapping({ ways: 1, cache_size_bytes: 1024, block_size_bytes: 64, address_bits: 32, memory_address: '0x7FFF04A8' }),
        2: calculateCacheMapping({ ways: 2, cache_size_bytes: 1024, block_size_bytes: 64, address_bits: 32, memory_address: '0x7FFF04A8' }),
        3: calculateCacheMapping({ ways: 3, cache_size_bytes: 1024, block_size_bytes: 64, address_bits: 32, memory_address: '0x7FFF04A8' })
      };
    } catch {
      return null;
    }
  });
  const [cacheError, setCacheError] = useState(null);

  const getMemoryBlockNumber = (res) => {
    if (!res) return '0';
    const clean = res.test_address.replace(/^0x/i, '');
    const addrVal = parseInt(clean, 16);
    return isNaN(addrVal) ? '0' : Math.floor(addrVal / res.block_size_bytes);
  };

  const handleCalculateAllMappings = (e) => {
    if (e) e.preventDefault();
    try {
      setCacheError(null);
      const cSize = Number(cacheSize);
      const bSize = Number(blockSize);
      const res0 = calculateCacheMapping({ ways: 0, cache_size_bytes: cSize, block_size_bytes: bSize, address_bits: 32, memory_address: cacheAddress });
      const res1 = calculateCacheMapping({ ways: 1, cache_size_bytes: cSize, block_size_bytes: bSize, address_bits: 32, memory_address: cacheAddress });
      const res2 = calculateCacheMapping({ ways: 2, cache_size_bytes: cSize, block_size_bytes: bSize, address_bits: 32, memory_address: cacheAddress });
      const res3 = calculateCacheMapping({ ways: 3, cache_size_bytes: cSize, block_size_bytes: bSize, address_bits: 32, memory_address: cacheAddress });
      setCacheResults({ 0: res0, 1: res1, 2: res2, 3: res3 });
    } catch (err) {
      setCacheError(err.message || 'Cache simulation parameter error.');
      setCacheResults(null);
    }
  };

  // --- Instruction Cycle & Formats State (Ported from COA-SIMULATOR) ---
  const [instExpression, setInstExpression] = useState('(A+B)*(C-D)/E');
  const [instResult, setInstResult] = useState(() => {
    try {
      return simulateInstructionExecution('(A+B)*(C-D)/E');
    } catch {
      return null;
    }
  });
  const [instError, setInstError] = useState(null);
  const [copiedFormat, setCopiedFormat] = useState('');

  const handleGenerateInstruction = (e) => {
    if (e) e.preventDefault();
    try {
      setInstError(null);
      const res = simulateInstructionExecution(instExpression);
      setInstResult(res);
    } catch (err) {
      setInstError(err.message || 'Invalid arithmetic expression.');
      setInstResult(null);
    }
  };

  const handleClearInstruction = () => {
    setInstExpression('');
    setInstError(null);
    setInstResult(null);
    setCopiedFormat('');
  };

  const handleSampleInstruction = (sample) => {
    setInstExpression(sample);
    setInstError(null);
    try {
      const res = simulateInstructionExecution(sample);
      setInstResult(res);
    } catch (err) {
      setInstError(err.message);
      setInstResult(null);
    }
  };

  const handleCopyInstructions = async (formatName, instructions) => {
    try {
      const text = instructions.map((ins, i) => `${i + 1}. ${ins.full}  // ${ins.comment}`).join('\n');
      await navigator.clipboard.writeText(text);
      setCopiedFormat(formatName);
      setTimeout(() => setCopiedFormat(''), 1500);
    } catch {
      // ignore
    }
  };

  // --- Cache Hit vs Miss Interactive Visual State ---
  const [hitMissState, setHitMissState] = useState('hit'); // 'hit' or 'miss'

  // --- Concept Notes Accordion State ---
  const [openConcept, setOpenConcept] = useState(0);

  const conceptNotes = [
    {
      title: 'What is Cache?',
      text: 'Cache is a small, ultra-fast static RAM (SRAM) buffer located on or right next to the CPU chip. It stores recently accessed memory instructions and data to minimize the high latency penalty of reading from slower main system RAM (DRAM).'
    },
    {
      title: 'What is a Cache Hit?',
      text: 'A Cache Hit occurs when the processor requests a memory address and that address tag is successfully matched inside the cache lines. The CPU retrieves data immediately with virtually no delay (typically 1–4 clock cycles).'
    },
    {
      title: 'What is a Cache Miss?',
      text: 'A Cache Miss occurs when the requested address tag does not exist in any cache line. The CPU must stall or execute out-of-order instructions while the data block is fetched from DRAM or SSD, taking dozens to hundreds of clock cycles.'
    },
    {
      title: 'What is Memory Mapping?',
      text: 'Memory mapping is the mathematical rule hardware implements to partition incoming physical memory addresses into Tag, Set Index, and Offset fields, determining the exact cache row or line where a block can reside.'
    },
    {
      title: 'What is Direct Mapping?',
      text: 'Direct Mapping (1-Way) allocates every main memory block to exactly one cache line given by (Block Address mod Total Lines). It requires minimal hardware comparators and is fast, but identical sets will continually evict each other (conflict miss).'
    },
    {
      title: 'What is Set Associative Mapping?',
      text: 'In N-Way Set Associative mapping, the cache is partitioned into sets of N lines each. A block maps to a designated Set Index, but can be placed in any of the N ways within that set, striking an ideal compromise between hardware cost and miss rate.'
    },
    {
      title: 'What is Associative Mapping (0-Way)?',
      text: 'In Fully Associative (0-Way) cache, there are no set boundaries. Any block of memory can be placed in any empty cache line. This eliminates conflict misses entirely, but requires simultaneous parallel tag comparisons across all lines.'
    }
  ];

  // --- Quick Knowledge Check Quiz State ---
  const quizQuestions = [
    {
      question: 'Which memory level is physically closest to the CPU execution units?',
      options: ['Main RAM (DRAM)', 'L3 Cache', 'CPU Registers', 'Solid State Drive (SSD)'],
      correct: 2,
      explanation: 'CPU registers are built directly inside the processor data path and operate at full core clock frequencies with single-cycle latency.'
    },
    {
      question: 'What does the TAG segment in a decomposed cache address represent?',
      options: [
        'The exact byte offset inside a memory block',
        'The unique identifier ensuring the cached line matches the requested memory block',
        'The clock frequency of the memory bus',
        'The number of total sets in the hardware'
      ],
      correct: 1,
      explanation: 'The Tag identifies the unique memory block to verify that the cached line actually belongs to the requested address rather than an aliased block.'
    },
    {
      question: 'In a 1-Way (Direct Mapped) cache, how many lines belong to each set?',
      options: ['Exactly 1 line', '2 lines', '4 lines', 'Unlimited lines'],
      correct: 0,
      explanation: 'In Direct Mapping, every set contains exactly one line (way = 1), so each memory block can reside in only one specific location.'
    },
    {
      question: 'What happens immediately during a Cache Miss?',
      options: [
        'The CPU resets and halts execution',
        'Data is retrieved from cache instantly in 1 cycle',
        'The processor must fetch the missing block from a lower memory level (like DRAM)',
        'The cache size is doubled automatically'
      ],
      correct: 2,
      explanation: 'When a miss occurs, the cache controller fetches the full line from main memory DRAM into the cache while forwarding requested words to the CPU.'
    }
  ];

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const handleSelectQuiz = (idx) => {
    setSelectedQuizAnswer(idx);
    setQuizAnswered(true);
  };

  const handleNextQuiz = () => {
    setSelectedQuizAnswer(null);
    setQuizAnswered(false);
    setCurrentQuizIndex((prev) => (prev + 1) % quizQuestions.length);
  };

  const scrollToSection = (id, tabName) => {
    setActiveTab(tabName);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentQ = quizQuestions[currentQuizIndex];

  return (
    <div className="section" style={{ paddingTop: 'var(--space-md)' }}>
      <div className="container coa-hub-wrapper">
        <Breadcrumb items={[{ label: 'COA Learning Hub', to: '/coa-learning' }]} />

        {/* ── 2. HERO SECTION ── */}
        <div className="coa-hero-grid">
          <div>
            <div className="coa-hero-eyebrow">
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)' }}></span>
              COMPUTER ORGANIZATION &amp; ARCHITECTURE
            </div>
            <h1 className="coa-hero-title">
              Understand how computers actually work.
            </h1>
            <p className="coa-hero-subheading">
              Explore the fundamentals of Computer Organization &amp; Architecture through interactive visual tools, experiments, and simulations.
            </p>
            <div className="coa-hero-buttons">
              <button
                type="button"
                onClick={() => scrollToSection('number-lab', 'number-systems')}
                className="btn btn-primary"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                Explore Tools &darr;
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('coa-concepts', 'concepts')}
                className="btn btn-outline"
                style={{ padding: '0.75rem 1.4rem' }}
              >
                View Concepts &rarr;
              </button>
            </div>
          </div>

          {/* Right Side: Abstract Stylized Computer Architecture Diagram */}
          <div className="coa-arch-visual-stage" aria-label="Abstract Computer Architecture Visualization">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px dashed var(--border-color)', paddingBottom: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-light)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                HARDWARE DATAPATH
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 600 }}>
                ACTIVE BUS
              </span>
            </div>

            <div className="coa-arch-diagram-flow">
              {/* CPU Box */}
              <div className="coa-block-cpu">
                <div className="coa-block-title">CPU</div>
                <div className="coa-block-subtitle">ALU + Control Unit</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '6px' }}>
                  <span style={{ fontSize: '0.65rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '1px 6px', borderRadius: '3px', fontFamily: 'var(--font-mono)' }}>R0..R15</span>
                  <span style={{ fontSize: '0.65rem', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '1px 6px', borderRadius: '3px', fontFamily: 'var(--font-mono)' }}>PC</span>
                </div>
              </div>

              {/* Data Bus Connection 1 */}
              <div className="coa-bus-line-vertical">
                <div className="coa-bus-data-pulse"></div>
              </div>

              {/* Memory Box */}
              <div className="coa-block-mem">
                <div className="coa-block-title">MEMORY</div>
                <div className="coa-block-subtitle">L1 / L2 / L3 Cache &amp; RAM</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-light)', marginTop: '4px' }}>
                  Tag Match &bull; 64B Line Blocks
                </div>
              </div>

              {/* Data Bus Connection 2 */}
              <div className="coa-bus-line-vertical">
                <div className="coa-bus-data-pulse" style={{ animationDelay: '1.1s' }}></div>
              </div>

              {/* Storage Box */}
              <div className="coa-block-storage">
                <div className="coa-block-title">STORAGE</div>
                <div className="coa-block-subtitle">NVMe SSD &amp; Disk Secondary</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. LEARNING HUB HORIZONTAL NAVIGATION ── */}
        <div className="coa-category-bar" role="navigation" aria-label="COA Sub-Navigation">
          <span className="coa-nav-tag">LEARNING HUB</span>
          <button
            type="button"
            className={`coa-nav-btn ${activeTab === 'number-systems' ? 'active' : ''}`}
            onClick={() => scrollToSection('number-lab', 'number-systems')}
          >
            Number Systems
          </button>
          <button
            type="button"
            className={`coa-nav-btn ${activeTab === 'cache-mapping' ? 'active' : ''}`}
            onClick={() => scrollToSection('cache-lab', 'cache-mapping')}
          >
            Cache Mapping
          </button>
          <button
            type="button"
            className={`coa-nav-btn ${activeTab === 'memory' ? 'active' : ''}`}
            onClick={() => scrollToSection('hierarchy-section', 'memory')}
          >
            Memory Hierarchy
          </button>
          <button
            type="button"
            className={`coa-nav-btn ${activeTab === 'instruction-cycle' ? 'active' : ''}`}
            onClick={() => scrollToSection('instruction-lab', 'instruction-cycle')}
          >
            Instruction Cycle
          </button>
          <button
            type="button"
            className={`coa-nav-btn ${activeTab === 'concepts' ? 'active' : ''}`}
            onClick={() => scrollToSection('coa-concepts', 'concepts')}
          >
            Concept Notes
          </button>
          <button
            type="button"
            className={`coa-nav-btn ${activeTab === 'quiz' ? 'active' : ''}`}
            onClick={() => scrollToSection('quick-check-section', 'quiz')}
          >
            Quick Check
          </button>
        </div>

        {/* ── 4. “EXPLORE COA” ARCHITECTURE CARDS ── */}
        <div id="explore-cards" style={{ marginBottom: 'var(--space-2xl)' }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>
              ARCHITECTURE ROADMAP
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem', marginBottom: '0.35rem' }}>
              EXPLORE THE ARCHITECTURE
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
              Learn the concepts behind the components that make a computer work.
            </p>
          </div>

          <div className="coa-arch-cards-grid">
            {/* CARD 01 — CPU */}
            <div className="coa-arch-card">
              <div className="coa-arch-card-top">
                <span className="coa-arch-card-badge">CARD 01</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)' }}>PROCESSOR CORE</span>
              </div>
              <h3 className="coa-arch-card-title">CPU Organization</h3>
              <p className="coa-arch-card-desc">
                Understand how the processor executes instructions through fetch-decode-execute pipelines.
              </p>
              <div className="coa-arch-visual-box">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-surface)' }}>Registers</span>
                  <span>&rarr;</span>
                  <span style={{ border: '1px solid var(--primary-border)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '4px', background: 'var(--primary-light)' }}>ALU + CU</span>
                  <span>&rarr;</span>
                  <span style={{ border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '4px', background: 'var(--bg-surface)' }}>Datapath</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('instruction-lab', 'instruction-cycle')}
                className="btn btn-outline"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Explore Instruction Cycle &rarr;
              </button>
            </div>

            {/* CARD 02 — Memory */}
            <div className="coa-arch-card">
              <div className="coa-arch-card-top">
                <span className="coa-arch-card-badge">CARD 02</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)' }}>MEMORY SYSTEM</span>
              </div>
              <h3 className="coa-arch-card-title">Memory Hierarchy</h3>
              <p className="coa-arch-card-desc">
                See how registers, cache, RAM and storage work together to balance access speed and capacity.
              </p>
              <div className="coa-arch-visual-box">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                  <span>Registers</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-light)' }}>&darr;</span>
                  <span>Cache (L1/L2/L3)</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-light)' }}>&darr;</span>
                  <span>RAM (DRAM) &darr; Storage</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('hierarchy-section', 'memory')}
                className="btn btn-outline"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Explore Memory &rarr;
              </button>
            </div>

            {/* CARD 03 — Number Systems */}
            <div className="coa-arch-card">
              <div className="coa-arch-card-top">
                <span className="coa-arch-card-badge">CARD 03</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)' }}>RADIX MATHEMATICS</span>
              </div>
              <h3 className="coa-arch-card-title">Number Systems</h3>
              <p className="coa-arch-card-desc">
                Convert and understand Binary, Decimal, Octal and Hexadecimal formats with step-by-step arithmetic.
              </p>
              <div className="coa-arch-visual-box">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                  <div style={{ letterSpacing: '0.1em', fontWeight: 600 }}>BIN &harr; DEC</div>
                  <div style={{ color: 'var(--text-light)' }}>&varr; &nbsp; &nbsp; &varr;</div>
                  <div style={{ letterSpacing: '0.1em', fontWeight: 600 }}>OCT &harr; HEX</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('number-lab', 'number-systems')}
                className="btn btn-outline"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Open Converter &rarr;
              </button>
            </div>

            {/* CARD 04 — Cache Mapping */}
            <div className="coa-arch-card">
              <div className="coa-arch-card-top">
                <span className="coa-arch-card-badge">CARD 04</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)' }}>LINE PLACEMENT</span>
              </div>
              <h3 className="coa-arch-card-title">Cache Mapping</h3>
              <p className="coa-arch-card-desc">
                Visualize how memory blocks are mapped into cache sets across 0-Way, 1-Way, 2-Way, and 3-Way organizations.
              </p>
              <div className="coa-arch-visual-box">
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ border: '1px dashed var(--border-color)', padding: '2px 6px', borderRadius: '3px' }}>Block 45</span>
                  <span style={{ color: 'var(--primary)' }}>&rarr;</span>
                  <span style={{ border: '1px solid var(--primary-border)', padding: '2px 6px', borderRadius: '3px', background: 'var(--primary-light)', color: 'var(--primary)' }}>Set 1 [Line 0]</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection('cache-lab', 'cache-mapping')}
                className="btn btn-outline"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Open Simulator &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* ── 5. NUMBER SYSTEM LAB (BEAUTIFUL INTERACTIVE REDESIGN) ── */}
        <section id="number-lab" className="coa-converter-lab-panel" aria-labelledby="num-lab-heading">
          <div className="coa-lab-header">
            <div className="coa-lab-eyebrow">INTERACTIVE ENGINE &bull; REAL CLIENT-SIDE CALCULATION</div>
            <h2 id="num-lab-heading" className="coa-lab-heading">NUMBER SYSTEM LAB</h2>
            <p className="coa-lab-desc">
              Convert numbers between different number systems and understand every step of the mathematical transformation.
            </p>
          </div>

          <form onSubmit={handleConvertNumber}>
            {/* FROM Radix Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor={fromBaseId} style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                FROM SYSTEM
              </label>
              <div id={fromBaseId} className="coa-base-tab-group">
                {[
                  { label: 'Binary (Base 2)', val: 2 },
                  { label: 'Decimal (Base 10)', val: 10 },
                  { label: 'Octal (Base 8)', val: 8 },
                  { label: 'Hexadecimal (Base 16)', val: 16 }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    className={`coa-base-tab-btn ${fromBase === item.val ? 'selected' : ''}`}
                    onClick={() => {
                      setFromBase(item.val);
                      // Clear or convert
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Value */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="num-input-field" style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                INPUT NUMBER
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  id="num-input-field"
                  type="text"
                  value={numInput}
                  onChange={(e) => setNumInput(e.target.value)}
                  placeholder={fromBase === 16 ? 'e.g. 2D or 0x2D' : fromBase === 2 ? 'e.g. 101101' : 'e.g. 45'}
                  style={{
                    flexGrow: 1,
                    minWidth: '220px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.05rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-main)'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 1.75rem', fontWeight: 600 }}
                >
                  Convert &rarr;
                </button>
              </div>
            </div>

            {/* TO Radix Selector */}
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor={toBaseId} style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                TO SYSTEM
              </label>
              <div id={toBaseId} className="coa-base-tab-group">
                {[
                  { label: 'Binary (Base 2)', val: 2 },
                  { label: 'Decimal (Base 10)', val: 10 },
                  { label: 'Octal (Base 8)', val: 8 },
                  { label: 'Hexadecimal (Base 16)', val: 16 }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    className={`coa-base-tab-btn ${toBase === item.val ? 'selected' : ''}`}
                    onClick={() => {
                      setToBase(item.val);
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Validation Error Message */}
          {numError && (
            <div style={{ padding: '0.85rem 1rem', backgroundColor: 'var(--accent-red-light)', color: 'var(--accent-red)', border: '1px solid var(--accent-red)', borderRadius: 'var(--radius-md)', marginTop: '1rem', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
              &times; {numError}
            </div>
          )}

          {/* Result Display & Mathematical Derivation */}
          {numResult && (
            <div className="coa-result-billboard">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', fontWeight: 700 }}>
                  CONVERTED RESULT
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                  Radix {numResult.to_base}
                </span>
              </div>

              <div className="coa-result-num">
                {numResult.result}
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                <div>Decimal Value: <strong>{numResult.decimal_value}</strong></div>
                {numResult.twos_complement_8bit && (
                  <div>8-Bit Two&apos;s Complement: <strong>{numResult.twos_complement_8bit}</strong></div>
                )}
              </div>

              {/* HOW IT WORKED - STEP BY STEP DERIVATION */}
              <div style={{ marginTop: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    HOW IT WORKED &bull; STEP-BY-STEP ARITHMETIC
                  </span>
                </div>

                <div className="coa-step-box">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.75rem', color: 'var(--text-light)', fontSize: '0.75rem' }}>
                    <span>Radix {numResult.from_base}</span>
                    <span>&rarr;</span>
                    <span>Radix 10 (Decimal Conversion)</span>
                    <span>&rarr;</span>
                    <span>Radix {numResult.to_base} (Division Method)</span>
                    <span>&rarr;</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>Final Output</span>
                  </div>

                  {numResult.steps && numResult.steps.map((st, idx) => (
                    <div key={idx} style={{ padding: '0.2rem 0', whiteSpace: 'pre-wrap' }}>
                      {st}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── 6. CACHE MAPPING SECTION (STREAMLINED 4-WAY COMPARISON) ── */}
        <section id="cache-lab" className="coa-cache-lab-panel" aria-labelledby="cache-lab-heading">
          <div className="coa-lab-header" style={{ marginBottom: '1.5rem' }}>
            <h2 id="cache-lab-heading" className="coa-lab-heading" style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
              CACHE MAPPING
            </h2>
          </div>

          <form onSubmit={handleCalculateAllMappings}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
              <div>
                <label htmlFor="cache-input-addr" style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                  Memory Address
                </label>
                <input
                  id="cache-input-addr"
                  type="text"
                  value={cacheAddress}
                  onChange={(e) => setCacheAddress(e.target.value)}
                  placeholder="0x7FFF04A8"
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-main)'
                  }}
                />
              </div>

              <div>
                <label htmlFor="cache-size-select" style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                  Cache Size
                </label>
                <select
                  id="cache-size-select"
                  value={cacheSize}
                  onChange={(e) => setCacheSize(Number(e.target.value))}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-main)'
                  }}
                >
                  <option value={512}>512 Bytes</option>
                  <option value={1024}>1024 Bytes (1 KB)</option>
                  <option value={2048}>2048 Bytes (2 KB)</option>
                  <option value={4096}>4096 Bytes (4 KB)</option>
                </select>
              </div>

              <div>
                <label htmlFor="block-size-select" style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                  Block Size
                </label>
                <select
                  id="block-size-select"
                  value={blockSize}
                  onChange={(e) => setBlockSize(Number(e.target.value))}
                  style={{
                    width: '100%',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.95rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-main)'
                  }}
                >
                  <option value={16}>16 Bytes</option>
                  <option value={32}>32 Bytes</option>
                  <option value={64}>64 Bytes</option>
                  <option value={128}>128 Bytes</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.75rem', fontWeight: 600, marginBottom: '1.5rem' }}
            >
              Calculate Mapping &rarr;
            </button>
          </form>

          {cacheError && (
            <div style={{ padding: '0.85rem 1rem', backgroundColor: 'var(--accent-red-light)', color: 'var(--accent-red)', border: '1px solid var(--accent-red)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
              &times; {cacheError}
            </div>
          )}

          {cacheResults && cacheResults[0] && cacheResults[1] && cacheResults[2] && cacheResults[3] && (
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.75rem', textAlign: 'center' }}>
                CACHE MAPPING RESULTS
              </div>

              <div className="coa-results-quad-grid">
                {/* 0-WAY */}
                <div className="coa-quad-card">
                  <div className="coa-quad-header">
                    <div className="coa-quad-badge">0-WAY</div>
                    <div className="coa-quad-sub">Fully Associative</div>
                  </div>
                  <div className="coa-quad-body">
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Memory Block</span>
                      <span className="coa-quad-val">{getMemoryBlockNumber(cacheResults[0])}</span>
                    </div>
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Location / Placed At</span>
                      <span className="coa-quad-val">Any available line in cache pool</span>
                    </div>
                  </div>
                </div>

                {/* 1-WAY */}
                <div className="coa-quad-card">
                  <div className="coa-quad-header">
                    <div className="coa-quad-badge">1-WAY</div>
                    <div className="coa-quad-sub">Direct Mapping</div>
                  </div>
                  <div className="coa-quad-body">
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Memory Block</span>
                      <span className="coa-quad-val">{getMemoryBlockNumber(cacheResults[1])}</span>
                    </div>
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Set</span>
                      <span className="coa-quad-val">Set {cacheResults[1].bit_breakdown.set_index_dec}</span>
                    </div>
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Cache Line</span>
                      <span className="coa-quad-val">Line {cacheResults[1].bit_breakdown.set_index_dec}</span>
                    </div>
                  </div>
                </div>

                {/* 2-WAY */}
                <div className="coa-quad-card">
                  <div className="coa-quad-header">
                    <div className="coa-quad-badge">2-WAY</div>
                    <div className="coa-quad-sub">2-Way Set Associative</div>
                  </div>
                  <div className="coa-quad-body">
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Memory Block</span>
                      <span className="coa-quad-val">{getMemoryBlockNumber(cacheResults[2])}</span>
                    </div>
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Set</span>
                      <span className="coa-quad-val">Set {cacheResults[2].bit_breakdown.set_index_dec}</span>
                    </div>
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Possible Line</span>
                      <span className="coa-quad-val">Line 0 or Line 1 in Set {cacheResults[2].bit_breakdown.set_index_dec}</span>
                    </div>
                  </div>
                </div>

                {/* 3-WAY */}
                <div className="coa-quad-card">
                  <div className="coa-quad-header">
                    <div className="coa-quad-badge">3-WAY</div>
                    <div className="coa-quad-sub">3-Way Set Associative</div>
                  </div>
                  <div className="coa-quad-body">
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Memory Block</span>
                      <span className="coa-quad-val">{getMemoryBlockNumber(cacheResults[3])}</span>
                    </div>
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Set</span>
                      <span className="coa-quad-val">Set {cacheResults[3].bit_breakdown.set_index_dec}</span>
                    </div>
                    <div className="coa-quad-row">
                      <span className="coa-quad-label">Possible Line</span>
                      <span className="coa-quad-val">Line 0, 1, or 2 in Set {cacheResults[3].bit_breakdown.set_index_dec}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── INSTRUCTION CYCLE & FORMATS LAB (FROM COA-SIMULATOR) ── */}
        <section id="instruction-lab" className="coa-inst-panel" aria-labelledby="inst-lab-heading">
          <div className="coa-lab-header">
            <div className="coa-lab-eyebrow">PROCESSOR EXECUTION &bull; REAL ISA GENERATION</div>
            <h2 id="inst-lab-heading" className="coa-lab-heading">INSTRUCTION CYCLE &amp; FORMATS LAB</h2>
            <p className="coa-lab-desc">
              Enter an arithmetic expression to validate it, convert it to postfix notation, and generate the complete machine instruction cycle across 3-Address, 2-Address, 1-Address (Accumulator), and 0-Address (Stack) architectures.
            </p>
          </div>

          <form onSubmit={handleGenerateInstruction}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="inst-input-expr" style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                ARITHMETIC EXPRESSION (A-Z, +, -, *, /, (, ))
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  id="inst-input-expr"
                  type="text"
                  value={instExpression}
                  onChange={(e) => setInstExpression(e.target.value.toUpperCase())}
                  placeholder="(A+B)*(C-D)/E"
                  style={{
                    flexGrow: 1,
                    minWidth: '240px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.05rem',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid var(--border-color)',
                    backgroundColor: 'var(--bg-subtle)',
                    color: 'var(--text-main)'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 1.75rem', fontWeight: 600 }}
                >
                  Generate Cycle &rarr;
                </button>
                <button
                  type="button"
                  onClick={handleClearInstruction}
                  className="btn btn-outline"
                  style={{ padding: '0.75rem 1.25rem', fontWeight: 600 }}
                >
                  Clear
                </button>
              </div>

              {/* Sample Chips */}
              <div className="coa-inst-sample-row">
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-light)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Examples:
                </span>
                {SAMPLE_EXPRESSIONS.map((sample) => (
                  <button
                    key={sample}
                    type="button"
                    className="coa-inst-sample-chip"
                    onClick={() => handleSampleInstruction(sample)}
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          </form>

          {/* Validation Error Banner */}
          {instError && (
            <div style={{ padding: '0.85rem 1rem', backgroundColor: 'var(--accent-red-light)', color: 'var(--accent-red)', border: '1px solid var(--accent-red)', borderRadius: 'var(--radius-md)', marginTop: '1rem', marginBottom: '1.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
              &times; {instError}
            </div>
          )}

          {/* Results Display */}
          {instResult && (
            <div>
              {/* Postfix & Summary Billboard */}
              <div className="coa-inst-summary-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', fontWeight: 700 }}>
                    CONVERTED POSTFIX NOTATION (REVERSE POLISH)
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
                    Expression: {instResult.expression}
                  </span>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.75rem' }}>
                  {instResult.postfix}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '0.75rem', borderTop: '1px dashed var(--border-color)', paddingTop: '0.75rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                  <div>Three-Address: <strong>{instResult.three.count} inst</strong></div>
                  <div>Two-Address: <strong>{instResult.two.count} inst</strong></div>
                  <div>One-Address (ACC): <strong>{instResult.one.count} inst</strong></div>
                  <div>Zero-Address (Stack): <strong>{instResult.zero.count} inst</strong></div>
                </div>
              </div>

              {/* 4 Instruction Formats Comparison Grid */}
              <div className="coa-inst-formats-grid">
                {/* 1. Three Address Code */}
                <div className="coa-inst-format-card">
                  <div className="coa-inst-format-header">
                    <div>
                      <div className="coa-inst-format-title">Three Address Code</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                        General Register Architecture &bull; {instResult.three.count} Instructions
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                      onClick={() => handleCopyInstructions('Three Address', instResult.three.instructions)}
                    >
                      {copiedFormat === 'Three Address' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="coa-inst-table-wrap">
                    <table className="coa-inst-table">
                      <thead>
                        <tr>
                          <th style={{ width: '35px' }}>#</th>
                          <th>Instruction</th>
                          <th>Micro-Operation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {instResult.three.instructions.map((ins, idx) => (
                          <tr key={idx}>
                            <td style={{ color: 'var(--text-light)' }}>{idx + 1}</td>
                            <td><strong>{ins.full}</strong></td>
                            <td style={{ color: 'var(--text-muted)' }}>{ins.comment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. Two Address Code */}
                <div className="coa-inst-format-card">
                  <div className="coa-inst-format-header">
                    <div>
                      <div className="coa-inst-format-title">Two Address Code</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                        Register-Register / Destructive &bull; {instResult.two.count} Instructions
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                      onClick={() => handleCopyInstructions('Two Address', instResult.two.instructions)}
                    >
                      {copiedFormat === 'Two Address' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="coa-inst-table-wrap">
                    <table className="coa-inst-table">
                      <thead>
                        <tr>
                          <th style={{ width: '35px' }}>#</th>
                          <th>Instruction</th>
                          <th>Micro-Operation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {instResult.two.instructions.map((ins, idx) => (
                          <tr key={idx}>
                            <td style={{ color: 'var(--text-light)' }}>{idx + 1}</td>
                            <td><strong>{ins.full}</strong></td>
                            <td style={{ color: 'var(--text-muted)' }}>{ins.comment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 3. One Address Code */}
                <div className="coa-inst-format-card">
                  <div className="coa-inst-format-header">
                    <div>
                      <div className="coa-inst-format-title">One Address Code</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                        Accumulator (ACC) Based &bull; {instResult.one.count} Instructions
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                      onClick={() => handleCopyInstructions('One Address', instResult.one.instructions)}
                    >
                      {copiedFormat === 'One Address' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="coa-inst-table-wrap">
                    <table className="coa-inst-table">
                      <thead>
                        <tr>
                          <th style={{ width: '35px' }}>#</th>
                          <th>Instruction</th>
                          <th>Micro-Operation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {instResult.one.instructions.map((ins, idx) => (
                          <tr key={idx}>
                            <td style={{ color: 'var(--text-light)' }}>{idx + 1}</td>
                            <td><strong>{ins.full}</strong></td>
                            <td style={{ color: 'var(--text-muted)' }}>{ins.comment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 4. Zero Address Code */}
                <div className="coa-inst-format-card">
                  <div className="coa-inst-format-header">
                    <div>
                      <div className="coa-inst-format-title">Zero Address Code</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                        Stack-Organized (TOS) &bull; {instResult.zero.count} Instructions
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}
                      onClick={() => handleCopyInstructions('Zero Address', instResult.zero.instructions)}
                    >
                      {copiedFormat === 'Zero Address' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <div className="coa-inst-table-wrap">
                    <table className="coa-inst-table">
                      <thead>
                        <tr>
                          <th style={{ width: '35px' }}>#</th>
                          <th>Instruction</th>
                          <th>Micro-Operation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {instResult.zero.instructions.map((ins, idx) => (
                          <tr key={idx}>
                            <td style={{ color: 'var(--text-light)' }}>{idx + 1}</td>
                            <td><strong>{ins.full}</strong></td>
                            <td style={{ color: 'var(--text-muted)' }}>{ins.comment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ── 13. CACHE HIT vs CACHE MISS INTERACTIVE VISUAL ── */}
        <section className="coa-hit-miss-panel" aria-labelledby="hit-miss-heading">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>
              LOOKUP EVALUATION
            </span>
            <h2 id="hit-miss-heading" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem' }}>
              CACHE HIT vs CACHE MISS
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
              Toggle between scenarios to see how the CPU branches when searching for cached instructions.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="coa-hit-miss-switch" role="tablist">
              <button
                type="button"
                className={`coa-hit-miss-btn ${hitMissState === 'hit' ? 'active hit' : ''}`}
                onClick={() => setHitMissState('hit')}
                role="tab"
                aria-selected={hitMissState === 'hit'}
              >
                &check; Simulate Cache Hit
              </button>
              <button
                type="button"
                className={`coa-hit-miss-btn ${hitMissState === 'miss' ? 'active miss' : ''}`}
                onClick={() => setHitMissState('miss')}
                role="tab"
                aria-selected={hitMissState === 'miss'}
              >
                &times; Simulate Cache Miss
              </button>
            </div>
          </div>

          {/* Hit / Miss Visual Datapath */}
          <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-sm)', fontWeight: 700 }}>
                CPU REQUESTS ADDRESS 0x7FFF04A8
              </div>
              <div style={{ color: 'var(--text-light)' }}>&darr;</div>
              <div style={{ background: 'var(--bg-surface)', border: '1.5px solid var(--primary)', padding: '0.5rem 1.25rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, color: 'var(--primary)' }}>
                CACHE DIRECTORY LOOKUP (TAG MATCH)
              </div>
              <div style={{ color: 'var(--text-light)' }}>&darr;</div>

              {hitMissState === 'hit' ? (
                <div style={{ width: '100%', textAlign: 'center', border: '1.5px solid var(--accent-sage)', backgroundColor: 'var(--accent-sage-light)', color: 'var(--accent-sage)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '2px' }}>&check; CACHE HIT &bull; DATA FOUND</div>
                  <div style={{ fontSize: '0.8125rem' }}>Tag comparator matched Line 0. Word forwarded directly to CPU in 1–2 clock cycles.</div>
                </div>
              ) : (
                <div style={{ width: '100%', textAlign: 'center', border: '1.5px solid var(--accent-amber)', backgroundColor: 'var(--accent-amber-light)', color: 'var(--accent-amber)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '2px' }}>&times; CACHE MISS &bull; DATA NOT IN CACHE</div>
                  <div style={{ fontSize: '0.8125rem' }}>Tag mismatch or cold miss. Memory controller initiates DRAM fetch (~50–100ns stall latency).</div>
                </div>
              )}
            </div>

            <div style={{ marginTop: '1.25rem', borderTop: '1px dashed var(--border-color)', paddingTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.8125rem' }}>
              <div>
                <strong style={{ color: 'var(--accent-sage)', display: 'block', marginBottom: '2px' }}>Cache Hit</strong>
                <span style={{ color: 'var(--text-muted)' }}>Data was already available in fast SRAM cache, keeping latency near zero.</span>
              </div>
              <div>
                <strong style={{ color: 'var(--accent-amber)', display: 'block', marginBottom: '2px' }}>Cache Miss</strong>
                <span style={{ color: 'var(--text-muted)' }}>Data was not available, so it must be fetched from a lower memory level (RAM).</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 14. MEMORY HIERARCHY TIER VISUALIZATION ── */}
        <section id="hierarchy-section" className="coa-hierarchy-panel" aria-labelledby="hierarchy-heading">
          <div className="coa-hierarchy-layout">
            <div>
              <div style={{ marginBottom: '1.25rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>
                  STORAGE &amp; SPEED SPECTRUM
                </span>
                <h2 id="hierarchy-heading" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem', marginBottom: '0.35rem' }}>
                  MEMORY HIERARCHY
                </h2>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                  Modern computer architectures organize storage into tiers to balance extreme speed against prohibitive silicon manufacturing costs.
                </p>
              </div>

              {/* Vertical Tier Bars */}
              <div className="coa-pyramid-tiers">
                <div className="coa-tier-bar coa-tier-registers">
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>REGISTERS</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>&lt; 1 ns &bull; ~1 KB</div>
                </div>

                <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>&darr;</div>

                <div className="coa-tier-bar coa-tier-cache">
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>SRAM CACHE (L1 / L2 / L3)</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>1 &ndash; 15 ns &bull; 32 KB &ndash; 64 MB</div>
                </div>

                <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>&darr;</div>

                <div className="coa-tier-bar coa-tier-ram">
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>MAIN RAM (DRAM)</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>50 &ndash; 100 ns &bull; 16 &ndash; 64 GB</div>
                </div>

                <div style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>&darr;</div>

                <div className="coa-tier-bar coa-tier-storage">
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>SECONDARY STORAGE (SSD / DISK)</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>10,000+ ns &bull; 512 GB &ndash; 4 TB</div>
                </div>
              </div>
            </div>

            {/* Dimensional Indicators Beside the Pyramid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: 'var(--bg-subtle)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                  ASCENDING PROPERTIES &uarr;
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li><strong>Faster</strong> Access Time (&lt; 1ns)</li>
                  <li><strong>Smaller</strong> Physical Capacity</li>
                  <li><strong>More Expensive</strong> per Megabyte</li>
                </ul>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '1rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                  DESCENDING PROPERTIES &darr;
                </div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <li><strong>Slower</strong> Access Time (10ms)</li>
                  <li><strong>Larger</strong> Storage Volume (Terabytes)</li>
                  <li><strong>Cheaper</strong> per Gigabyte ($)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── 12. CONCEPT NOTES (EXPANDABLE ACCORDION) ── */}
        <section id="coa-concepts" className="coa-concepts-container" aria-labelledby="concepts-heading">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>
              EXAM PREPARATION &bull; CORE CURRICULUM
            </span>
            <h2 id="concepts-heading" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem', marginBottom: '0.35rem' }}>
              CONCEPT NOTES
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
              Concise, beginner-friendly explanations of core architectural definitions.
            </p>
          </div>

          <div className="coa-accordion-list">
            {conceptNotes.map((item, idx) => (
              <div key={idx} className={`coa-accordion-item ${openConcept === idx ? 'open' : ''}`}>
                <button
                  type="button"
                  className="coa-accordion-trigger"
                  onClick={() => setOpenConcept(openConcept === idx ? -1 : idx)}
                  aria-expanded={openConcept === idx}
                >
                  <span>{item.title}</span>
                  <span style={{ fontSize: '1.2rem', transform: openConcept === idx ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease', color: 'var(--text-light)' }}>
                    +
                  </span>
                </button>
                {openConcept === idx && (
                  <div className="coa-accordion-content">
                    {item.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 15. LEARNING PROGRESS: YOUR COA JOURNEY ── */}
        <section style={{ marginBottom: 'var(--space-3xl)' }} aria-labelledby="journey-heading">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>
              CURATED PATHWAY
            </span>
            <h2 id="journey-heading" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.25rem', marginBottom: '0.35rem' }}>
              YOUR COA JOURNEY
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
              Follow this structured learning pathway from gate-level data representations to high-performance processor design.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
            {[
              { num: '01', title: 'Number Systems', desc: 'Binary radix, conversion steps & 2\'s complement arithmetic', targetId: 'number-lab', tab: 'number-systems' },
              { num: '02', title: 'Cache Mapping', desc: 'Tag/Set/Offset breakdown across 0-Way, 1-Way, 2-Way & 3-Way', targetId: 'cache-lab', tab: 'cache-mapping' },
              { num: '03', title: 'Memory Hierarchy', desc: 'Multi-tiered storage balancing access latency and hardware cost', targetId: 'hierarchy-section', tab: 'memory' },
              { num: '04', title: 'Instruction Cycle', desc: 'Arithmetic expression decoding across 3, 2, 1, and 0-address formats', targetId: 'instruction-lab', tab: 'instruction-cycle' }
            ].map((step, i) => (
              <div key={i} style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '1.25rem', flexGrow: 1 }}>
                  {step.desc}
                </p>
                <button
                  type="button"
                  onClick={() => scrollToSection(step.targetId, step.tab)}
                  className="btn btn-outline"
                  style={{ width: '100%', fontSize: '0.8125rem', padding: '0.45rem' }}
                >
                  Explore &rarr;
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ── 16. MINI KNOWLEDGE CHECK QUIZ ── */}
        <section id="quick-check-section" className="coa-quiz-panel" aria-labelledby="quiz-heading">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>
              KNOWLEDGE CHECK &bull; QUESTION {currentQuizIndex + 1} OF {quizQuestions.length}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)' }}>
              Interactive Self-Assessment
            </span>
          </div>

          <h2 id="quiz-heading" style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '1rem' }}>
            {currentQ.question}
          </h2>

          <div className="coa-quiz-options-grid">
            {currentQ.options.map((opt, optIdx) => {
              let btnClass = 'coa-quiz-option-btn';
              if (quizAnswered) {
                if (optIdx === currentQ.correct) {
                  btnClass += ' correct';
                } else if (selectedQuizAnswer === optIdx) {
                  btnClass += ' wrong';
                }
              }
              return (
                <button
                  key={optIdx}
                  type="button"
                  className={btnClass}
                  onClick={() => !quizAnswered && handleSelectQuiz(optIdx)}
                  disabled={quizAnswered}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginRight: '8px', opacity: 0.6 }}>
                    {String.fromCharCode(65 + optIdx)}.
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          {quizAnswered && (
            <div style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginTop: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: '0.25rem', color: selectedQuizAnswer === currentQ.correct ? 'var(--accent-sage)' : 'var(--accent-red)' }}>
                {selectedQuizAnswer === currentQ.correct ? '✓ Correct!' : 'Try again next time!'}
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                {currentQ.explanation}
              </p>
              <div style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={handleNextQuiz}
                  className="btn btn-primary"
                  style={{ fontSize: '0.8125rem', padding: '0.45rem 1rem' }}
                >
                  Next Question &rarr;
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ── 17. BEAUTIFUL FOOTER CALL TO ACTION ── */}
        <section className="coa-footer-cta" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="coa-footer-cta-title">
            Don&apos;t just memorize architecture. Understand it.
          </h2>
          <p className="coa-footer-cta-sub">
            Explore. Experiment. Visualize. Learn.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveTab('overview');
              }}
              className="btn btn-primary"
              style={{ padding: '0.75rem 1.75rem' }}
            >
              Back to Learning Hub &uarr;
            </button>
            <Link
              to="/"
              className="btn btn-outline"
              style={{ padding: '0.75rem 1.75rem' }}
            >
              Return to Home &rarr;
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
