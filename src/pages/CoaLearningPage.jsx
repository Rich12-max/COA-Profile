import React, { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { convertNumberSystem } from '../services/numberConverter';
import { calculateCacheMapping } from '../services/cacheSimulator';

export default function CoaLearningPage() {
  const fromBaseId = useId();
  const toBaseId = useId();
  const cacheMappingModeId = useId();

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
  const [cacheWays, setCacheWays] = useState(1); // 0, 1, 2, 3
  const [cacheAddress, setCacheAddress] = useState('0x7FFF04A8');
  const [cacheSize, setCacheSize] = useState(1024);
  const [blockSize, setBlockSize] = useState(64);
  const [cacheResult, setCacheResult] = useState(() => {
    try {
      return calculateCacheMapping({
        ways: 1,
        cache_size_bytes: 1024,
        block_size_bytes: 64,
        address_bits: 32,
        memory_address: '0x7FFF04A8'
      });
    } catch {
      return null;
    }
  });
  const [cacheError, setCacheError] = useState(null);

  const handleSimulateCache = (waysVal = cacheWays) => {
    try {
      setCacheError(null);
      const res = calculateCacheMapping({
        ways: waysVal,
        cache_size_bytes: Number(cacheSize),
        block_size_bytes: Number(blockSize),
        address_bits: 32,
        memory_address: cacheAddress
      });
      setCacheResult(res);
    } catch (err) {
      setCacheError(err.message || 'Cache simulation parameter error.');
      setCacheResult(null);
    }
  };

  const selectWays = (w) => {
    setCacheWays(w);
    handleSimulateCache(w);
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
            className={`coa-nav-btn ${activeTab === 'cpu' ? 'active' : ''}`}
            onClick={() => scrollToSection('explore-cards', 'cpu')}
          >
            CPU Architecture
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
                onClick={() => scrollToSection('coa-concepts', 'concepts')}
                className="btn btn-outline"
                style={{ width: '100%', fontSize: '0.85rem' }}
              >
                Explore CPU &rarr;
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

        {/* ── 6. CACHE MAPPING LABORATORY (MAIN ATTRACTION) ── */}
        <section id="cache-lab" className="coa-cache-lab-panel" aria-labelledby="cache-lab-heading">
          <div className="coa-lab-header">
            <div className="coa-lab-eyebrow">INTERACTIVE HARDWARE SIMULATOR &bull; LIVE PLACEMENT</div>
            <h2 id="cache-lab-heading" className="coa-lab-heading">CACHE MAPPING LAB</h2>
            <p className="coa-lab-desc">
              See exactly where a memory block goes. Simulate line placement across Direct Mapped, 2-Way, 3-Way, and Fully Associative cache hierarchies.
            </p>
          </div>

          {/* Mode Selector: 0-Way, 1-Way, 2-Way, 3-Way */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor={cacheMappingModeId} style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
              SELECT MAPPING MODE
            </label>
            <div id={cacheMappingModeId} className="coa-cache-ways-selector">
              <button
                type="button"
                className={`coa-cache-way-btn ${cacheWays === 0 ? 'active' : ''}`}
                onClick={() => selectWays(0)}
              >
                <div className="coa-way-title">0-Way Set</div>
                <div className="coa-way-sub">Fully Associative Pool</div>
              </button>

              <button
                type="button"
                className={`coa-cache-way-btn ${cacheWays === 1 ? 'active' : ''}`}
                onClick={() => selectWays(1)}
              >
                <div className="coa-way-title">1-Way Set</div>
                <div className="coa-way-sub">Direct Mapping (1 Line/Set)</div>
              </button>

              <button
                type="button"
                className={`coa-cache-way-btn ${cacheWays === 2 ? 'active' : ''}`}
                onClick={() => selectWays(2)}
              >
                <div className="coa-way-title">2-Way Set</div>
                <div className="coa-way-sub">2 Lines per Set (Dual-Way)</div>
              </button>

              <button
                type="button"
                className={`coa-cache-way-btn ${cacheWays === 3 ? 'active' : ''}`}
                onClick={() => selectWays(3)}
              >
                <div className="coa-way-title">3-Way Set</div>
                <div className="coa-way-sub">3 Lines per Set (Tri-Way)</div>
              </button>
            </div>
          </div>

          {/* Associativity Mode Visual Comparison Explainer (Requirement 10) */}
          <div style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.85rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.8125rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>
                {cacheWays === 0 && '0-Way: Fully Associative Organization'}
                {cacheWays === 1 && '1-Way: Direct Mapped Organization'}
                {cacheWays === 2 && '2-Way Set Associative Organization'}
                {cacheWays === 3 && '3-Way Set Associative Organization'}
              </strong>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)' }}>
                {cacheWays === 0 ? 'SET 0 &rarr; [ ALL BLOCKS POOL ]' :
                 cacheWays === 1 ? 'SET 0 &rarr; [ BLOCK ]' :
                 cacheWays === 2 ? 'SET 0 &rarr; [ BLOCK ][ BLOCK ]' :
                 'SET 0 &rarr; [ BLOCK ][ BLOCK ][ BLOCK ]'}
              </span>
            </div>
            <p style={{ margin: 0, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {cacheWays === 0 && 'In 0-Way / Fully Associative mode, there are no set boundaries. Any memory block can be stored in any available cache line, eliminating conflict misses at the expense of parallel tag comparators.'}
              {cacheWays === 1 && 'In 1-Way (Direct Mapping), each set holds exactly 1 block. Memory block X always maps to Set (X mod Total Sets). Fastest lookup and lowest hardware cost, but prone to conflict misses.'}
              {cacheWays === 2 && 'In 2-Way Set Associative, each set contains two lines. Two different memory blocks mapping to the same set can coexist without displacing each other, cutting conflict misses.'}
              {cacheWays === 3 && 'In 3-Way Set Associative, each set accommodates three parallel lines evaluated simultaneously by tri-way comparators, as utilized in specialized DSP and accelerator caches.'}
            </p>
          </div>

          {/* Simulator Controls Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label htmlFor="cache-input-addr" style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', marginBottom: '0.4rem' }}>
                MEMORY ADDRESS (HEX / DEC)
              </label>
              <input
                id="cache-input-addr"
                type="text"
                value={cacheAddress}
                onChange={(e) => setCacheAddress(e.target.value)}
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
                CACHE SIZE (BYTES)
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
                BLOCK SIZE (BYTES)
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
            type="button"
            onClick={() => handleSimulateCache()}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem', fontWeight: 600, marginBottom: '1.5rem' }}
          >
            Run Cache Mapping Simulation &rarr;
          </button>

          {/* Simulation Error */}
          {cacheError && (
            <div style={{ padding: '0.85rem 1rem', backgroundColor: 'var(--accent-red-light)', color: 'var(--accent-red)', border: '1px solid var(--accent-red)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem', fontFamily: 'var(--font-mono)' }}>
              &times; {cacheError}
            </div>
          )}

          {/* ── 8. SHOW THE ADDRESS BREAKDOWN (TAG, SET, OFFSET) ── */}
          {cacheResult && (
            <>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ADDRESS BREAKDOWN (32-BIT PHYSICAL BUS)
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--primary)' }}>
                    Query: {cacheResult.test_address}
                  </span>
                </div>

                <div className="coa-breakdown-bar">
                  <div className="coa-breakdown-segment">
                    <div className="coa-segment-tag">TAG ({cacheResult.bit_breakdown.tag_bits} BITS)</div>
                    <div className="coa-segment-val">{cacheResult.bit_breakdown.tag_hex}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '2px', wordBreak: 'break-all' }}>
                      {cacheResult.bit_breakdown.tag_bin}
                    </div>
                  </div>

                  <div className="coa-breakdown-segment">
                    <div className="coa-segment-tag">SET ({cacheResult.bit_breakdown.set_index_bits} BITS)</div>
                    <div className="coa-segment-val">
                      {cacheWays === 0 ? 'N/A (Pool)' : `Set ${cacheResult.bit_breakdown.set_index_dec}`}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '2px' }}>
                      {cacheWays === 0 ? '0 bits used' : cacheResult.bit_breakdown.set_index_bin}
                    </div>
                  </div>

                  <div className="coa-breakdown-segment">
                    <div className="coa-segment-tag">OFFSET ({cacheResult.bit_breakdown.offset_bits} BITS)</div>
                    <div className="coa-segment-val">Offset {cacheResult.bit_breakdown.offset_dec}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '2px' }}>
                      {cacheResult.bit_breakdown.offset_bin}
                    </div>
                  </div>
                </div>

                {/* Educational Breakdown Explanation */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', fontSize: '0.8125rem' }}>
                  <div>
                    <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '2px' }}>TAG</strong>
                    <span style={{ color: 'var(--text-muted)' }}>Identifies the unique memory block to verify hit candidate match.</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '2px' }}>SET</strong>
                    <span style={{ color: 'var(--text-muted)' }}>Determines which cache set or index group is selected.</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '2px' }}>OFFSET</strong>
                    <span style={{ color: 'var(--text-muted)' }}>Identifies the exact byte location inside the 64-byte block.</span>
                  </div>
                </div>
              </div>

              {/* ── 7. MAKE CACHE MAPPING VISUAL (MAIN MEMORY & CACHE SETS) ── */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    HARDWARE PLACEMENT VISUALIZATION
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--primary)' }}>
                    Memory Block &rarr; Set &rarr; Cache Line
                  </span>
                </div>

                <div className="coa-cache-visual-arena">
                  {/* Column 1: Main Memory Blocks */}
                  <div>
                    <div className="coa-arena-col-title">MAIN MEMORY BLOCKS</div>
                    <div className="coa-arena-block-list">
                      {[
                        { block: '0000', label: 'Block 0x0000', addr: '0x00000000' },
                        { block: '0001', label: 'Block 0x0001', addr: '0x00000040' },
                        {
                          block: '0010',
                          label: `Block Target (${Math.floor(parseInt(cacheAddress.replace(/^0x/i, ''), 16) / blockSize) || 45})`,
                          addr: cacheAddress,
                          active: true
                        },
                        { block: '0011', label: 'Block 0x0011', addr: '0x000000C0' },
                        { block: '0100', label: 'Block 0x0100', addr: '0x00000100' }
                      ].map((mb, i) => (
                        <div key={i} className={`coa-arena-block-row ${mb.active ? 'highlighted' : ''}`}>
                          <span>{mb.block} &bull; {mb.label}</span>
                          <span style={{ fontSize: '0.7rem', color: mb.active ? 'var(--primary)' : 'var(--text-light)' }}>
                            {mb.active ? 'MAPS &rarr;' : 'DRAM'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Cache Sets */}
                  <div>
                    <div className="coa-arena-col-title">CACHE DIRECTORY SETS</div>
                    <div className="coa-arena-block-list">
                      {cacheResult.cache_table_preview.slice(0, 4).map((setRow) => {
                        const isTarget = setRow.set_index === cacheResult.bit_breakdown.set_index_dec;
                        return (
                          <div key={setRow.set_index} className={`coa-arena-block-row ${isTarget ? 'highlighted' : ''}`}>
                            <div>
                              <strong>SET {setRow.set_index}</strong>
                              <span style={{ fontSize: '0.7rem', marginLeft: '6px', color: 'var(--text-light)' }}>
                                ({cacheWays === 0 ? 'Pool' : `${setRow.blocks.length} Way(s)`})
                              </span>
                            </div>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {setRow.blocks.map((blk, bi) => (
                                <span
                                  key={bi}
                                  style={{
                                    fontSize: '0.65rem',
                                    padding: '2px 5px',
                                    borderRadius: '3px',
                                    border: '1px solid var(--border-color)',
                                    background: isTarget && bi === 0 ? 'var(--primary)' : 'var(--bg-subtle)',
                                    color: isTarget && bi === 0 ? '#ffffff' : 'var(--text-main)',
                                    fontFamily: 'var(--font-mono)'
                                  }}
                                >
                                  {blk.tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 9. MAPPING RESULT PANEL ── */}
              <div style={{ backgroundColor: 'var(--bg-surface)', border: '1.5px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--primary)' }}>
                    MAPPING RESULT
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--accent-sage)', fontWeight: 700 }}>
                    &check; Mapping Successful
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Memory Address</div>
                    <strong>{cacheResult.test_address}</strong>
                  </div>
                  <span style={{ color: 'var(--text-light)' }}>&rarr;</span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Memory Block</div>
                    <strong>{Math.floor(parseInt(cacheAddress.replace(/^0x/i, ''), 16) / blockSize) || 45}</strong>
                  </div>
                  <span style={{ color: 'var(--text-light)' }}>&rarr;</span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Cache Set</div>
                    <strong>{cacheWays === 0 ? '0 (Unified Pool)' : cacheResult.bit_breakdown.set_index_dec}</strong>
                  </div>
                  <span style={{ color: 'var(--text-light)' }}>&rarr;</span>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>Target Line</div>
                    <strong>Line 0 in Set</strong>
                  </div>
                </div>
              </div>

              {/* ── 11. “WHAT JUST HAPPENED?” EDUCATIONAL EXPLANATION ── */}
              <div style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  WHAT JUST HAPPENED?
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                  The memory address was divided into its <strong>TAG</strong> ({cacheResult.bit_breakdown.tag_bits} bits), <strong>SET</strong> ({cacheResult.bit_breakdown.set_index_bits} bits), and <strong>OFFSET</strong> ({cacheResult.bit_breakdown.offset_bits} bits) components. The SET value determined where the block could be placed in cache.
                </p>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--text-muted)', borderLeft: '2px solid var(--primary)', paddingLeft: '1rem' }}>
                  <div>Associativity: <strong>{cacheResult.associativity_name}</strong></div>
                  <div>Cache Lines: <strong>{cacheResult.total_lines} lines</strong> &bull; Total Sets: <strong>{cacheResult.number_of_sets} sets</strong></div>
                  <div>Status: <strong>{cacheResult.hit_miss_analysis.simulated_lookup} ({cacheResult.hit_miss_analysis.comparator_checks})</strong></div>
                </div>
              </div>
            </>
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
              { num: '04', title: 'CPU Organization', desc: 'ALU, control registers, and instruction execution cycle', targetId: 'explore-cards', tab: 'cpu' }
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
