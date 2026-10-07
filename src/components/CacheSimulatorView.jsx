import React, { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import ErrorAlert from './ErrorAlert';

export default function CacheSimulatorView({
  wayNumber,
  wayTitle,
  wayBadge,
  fetchFn,
}) {
  const [cacheSizeKB, setCacheSizeKB] = useState(32);
  const [blockSizeBytes, setBlockSizeBytes] = useState(64);
  const [memoryAddress, setMemoryAddress] = useState('0x7FFF04A8');
  const [replacementPolicy, setReplacementPolicy] = useState('LRU');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleSimulate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await fetchFn({
        cache_size_bytes: cacheSizeKB * 1024,
        block_size_bytes: parseInt(blockSizeBytes, 10),
        address_bits: 32,
        memory_address: memoryAddress.trim() || '0x7FFF04A8',
        replacement_policy: replacementPolicy,
      });
      setResult(data);
    } catch (err) {
      setError(err.message || 'Cache simulation failed.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSimulate();
  }, [wayNumber]);

  return (
    <div className="tool-container">
      <div className="tool-toolbar">
        <div>
          <h2 style={{ fontSize: '1.35rem' }}>{wayTitle}</h2>
          <p style={{ fontSize: '0.875rem' }}>
            Directly connected to FastAPI calculation endpoint (<code>POST /api/cache/{wayNumber}-way</code>)
          </p>
        </div>
        <span className="badge badge-primary">{wayBadge}</span>
      </div>

      {/* Simulator Parameter Form */}
      <form onSubmit={handleSimulate} style={{ marginBottom: 'var(--space-xl)' }}>
        <div className="grid-4" style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-lg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: 'var(--space-md)' }}>
          <div className="tool-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="cache-size" className="tool-label">Cache Capacity:</label>
            <select
              id="cache-size"
              className="tool-select"
              value={cacheSizeKB}
              onChange={(e) => setCacheSizeKB(parseInt(e.target.value, 10))}
            >
              <option value={1}>1 KB (1,024 Bytes)</option>
              <option value={4}>4 KB (4,096 Bytes)</option>
              <option value={16}>16 KB (16,384 Bytes)</option>
              <option value={32}>32 KB (Standard L1)</option>
              <option value={64}>64 KB</option>
              <option value={128}>128 KB</option>
            </select>
          </div>

          <div className="tool-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="block-size" className="tool-label">Block / Line Size:</label>
            <select
              id="block-size"
              className="tool-select"
              value={blockSizeBytes}
              onChange={(e) => setBlockSizeBytes(parseInt(e.target.value, 10))}
            >
              <option value={16}>16 Bytes (Offset: 4 bits)</option>
              <option value={32}>32 Bytes (Offset: 5 bits)</option>
              <option value={64}>64 Bytes (Offset: 6 bits)</option>
              <option value={128}>128 Bytes (Offset: 7 bits)</option>
            </select>
          </div>

          <div className="tool-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="mem-addr" className="tool-label">Query Address (Hex):</label>
            <input
              id="mem-addr"
              type="text"
              className="tool-input"
              value={memoryAddress}
              onChange={(e) => setMemoryAddress(e.target.value)}
              placeholder="e.g. 0x7FFF04A8"
              spellCheck="false"
            />
          </div>

          <div className="tool-form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="rep-policy" className="tool-label">Replacement Policy:</label>
            <select
              id="rep-policy"
              className="tool-select"
              value={replacementPolicy}
              onChange={(e) => setReplacementPolicy(e.target.value)}
            >
              <option value="LRU">LRU (Least Recently Used)</option>
              <option value="FIFO">FIFO (First-In, First-Out)</option>
              <option value="Random">Random Replacement</option>
              <option value="LFU">LFU (Least Frequently Used)</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Executing Hardware Model Calculation...' : 'Simulate & Calculate Cache Mapping'}
        </button>
      </form>

      <ErrorAlert message={error} onDismiss={() => setError(null)} />

      {loading && <LoadingSpinner message="Calculating address decomposition, tag matching, and cache sets..." />}

      {result && !loading && (
        <div>
          {/* Address Bit Division Visualizer */}
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)' }}>
              <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)' }}>
                32-Bit Physical Memory Address Decomposition
              </h3>
              <span className="badge">Query: {result.test_address}</span>
            </div>

            <div className="cache-layout-breakdown">
              <div className="cache-bit-field tag">
                <div className="cache-field-name" style={{ color: 'var(--primary)' }}>Tag Field</div>
                <div className="cache-field-bits">{result.bit_breakdown.tag_bits} Bits</div>
                <div className="cache-field-desc">Val: {result.bit_breakdown.tag_hex}</div>
              </div>

              <div className="cache-bit-field set">
                <div className="cache-field-name" style={{ color: 'var(--accent-teal)' }}>Set Index Field</div>
                <div className="cache-field-bits">{result.bit_breakdown.set_index_bits} Bits</div>
                <div className="cache-field-desc">Set Index: {result.bit_breakdown.set_index_dec}</div>
              </div>

              <div className="cache-bit-field offset">
                <div className="cache-field-name" style={{ color: 'var(--accent-amber)' }}>Word / Byte Offset</div>
                <div className="cache-field-bits">{result.bit_breakdown.offset_bits} Bits</div>
                <div className="cache-field-desc">Offset: {result.bit_breakdown.offset_dec}B</div>
              </div>
            </div>
          </div>

          {/* Cache Summary Metrics Grid */}
          <div className="grid-4" style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="bit-display-card">
              <div className="bit-display-label">Total Cache Lines</div>
              <div className="bit-display-value">{result.total_lines} Lines</div>
            </div>

            <div className="bit-display-card">
              <div className="bit-display-label">Total Sets</div>
              <div className="bit-display-value">{result.number_of_sets} Sets</div>
            </div>

            <div className="bit-display-card">
              <div className="bit-display-label">Associativity Depth</div>
              <div className="bit-display-value">{result.ways_per_set} Way(s)</div>
            </div>

            <div className="bit-display-card" style={{ borderLeft: '3px solid var(--primary)' }}>
              <div className="bit-display-label">Target Set Index</div>
              <div className="bit-display-value">{result.bit_breakdown.set_index_dec}</div>
            </div>
          </div>

          {/* Visual Cache Directory Table */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-sm)' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
                Cache Set Directory &amp; Way Slot Preview
              </h3>
              <span className="badge badge-teal">Live Simulated Layout</span>
            </div>

            <div className="cache-table-wrapper">
              <table className="cache-table">
                <thead>
                  <tr>
                    <th style={{ width: '120px' }}>Set Identifier</th>
                    {Array.from({ length: result.ways_per_set }).map((_, i) => (
                      <th key={i}>Way {i} [Tag | Valid | Status]</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.cache_table_preview.map((row) => (
                    <tr key={row.set_index}>
                      <td style={{ fontWeight: 600, color: 'var(--primary)' }}>
                        Set {row.set_hex} ({row.set_index})
                      </td>
                      {row.blocks.map((b) => (
                        <td key={b.way_index}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <span className="badge" style={{ fontSize: '0.7rem' }}>
                              Valid: {b.valid ? '1' : '0'}
                            </span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>
                              Tag: {b.tag}
                            </span>
                            <span
                              className={`badge ${b.status === 'Match Candidate' ? 'badge-primary' : ''}`}
                              style={{ marginLeft: 'auto', fontSize: '0.7rem' }}
                            >
                              {b.status}
                            </span>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Step-by-Step Educational Derivation */}
          <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-sm)' }}>
              Theoretical Calculation Steps &amp; Equations
            </h3>
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', lineHeight: '1.8' }}>
              {result.calculation_steps.map((step, idx) => (
                <div key={idx} style={{ color: 'var(--text-main)' }}>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Hit/Miss & Comparator Analysis */}
          <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
            <div className="card">
              <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-xs)' }}>Tag Comparator Analysis</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                {result.hit_miss_analysis.simulated_lookup}
              </p>
              <div style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 600 }}>
                &bull; {result.hit_miss_analysis.comparator_checks}
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-xs)' }}>Replacement &amp; Miss Policy</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                Policy: <strong>{result.hit_miss_analysis.replacement_algorithm_active}</strong>
              </p>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)' }}>
                {result.hit_miss_analysis.compulsory_miss_check}
              </div>
            </div>
          </div>

          {/* Pedagogical Concept Note */}
          <div style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-lg)' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-xs)' }}>
              Architectural Concept Summary
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {result.pedagogical_notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
