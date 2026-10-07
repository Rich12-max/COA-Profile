import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import apiService from '../services/api';

export default function NumberConverterPage() {
  const [number, setNumber] = useState('255');
  const [fromBase, setFromBase] = useState(10);
  const [toBase, setToBase] = useState(2);
  const [bitWidth, setBitWidth] = useState(8);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultData, setResultData] = useState(null);

  const handleConvert = async (e) => {
    if (e) e.preventDefault();
    if (!number.trim()) {
      setError('Please enter a number to convert.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await apiService.convertNumber({
        number: number.trim(),
        from_base: parseInt(fromBase, 10),
        to_base: parseInt(toBase, 10),
        bit_width: parseInt(bitWidth, 10),
      });
      setResultData(data);
    } catch (err) {
      setError(err.message || 'Conversion failed. Please verify your input.');
      setResultData(null);
    } finally {
      setLoading(false);
    }
  };

  // Perform initial conversion on mount
  useEffect(() => {
    handleConvert();
  }, []);

  const baseLabels = {
    2: 'Binary (Base 2)',
    8: 'Octal (Base 8)',
    10: 'Decimal (Base 10)',
    16: 'Hexadecimal (Base 16)',
  };

  return (
    <div className="section">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'COA Learning Hub', to: '/coa-learning' },
            { label: 'Number System Converter', to: '/coa-learning/number-converter' },
          ]}
        />

        <div className="section-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="tagline">COA Interactive Tool</span>
              <h1>Number System Converter</h1>
              <p>
                Multi-radix transformation engine with strict algebraic validation, bitwise representation, and two's complement evaluation.
              </p>
            </div>
            <Link to="/coa-learning" className="btn btn-secondary btn-sm">
              &larr; Back to Learning Hub
            </Link>
          </div>
        </div>

        {/* Converter Form Container */}
        <div className="tool-container">
          <div className="tool-toolbar">
            <div>
              <h2 style={{ fontSize: '1.25rem' }}>Radix Conversion Engine</h2>
              <p style={{ fontSize: '0.875rem' }}>Connected directly to FastAPI REST Backend (<code>POST /api/number-system/convert</code>)</p>
            </div>
            <span className="badge badge-teal">Live API Connected</span>
          </div>

          <form onSubmit={handleConvert}>
            <div className="grid-3" style={{ marginBottom: 'var(--space-lg)' }}>
              {/* Input Number */}
              <div className="tool-form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="num-input" className="tool-label">
                  Enter Number:
                </label>
                <input
                  id="num-input"
                  type="text"
                  className="tool-input"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="e.g. 255 or 10101100"
                  spellCheck="false"
                  autoComplete="off"
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '4px', display: 'block' }}>
                  Supports positive &amp; negative integers
                </span>
              </div>

              {/* Source Base */}
              <div className="tool-form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="from-base" className="tool-label">
                  From (Source Base):
                </label>
                <select
                  id="from-base"
                  className="tool-select"
                  value={fromBase}
                  onChange={(e) => setFromBase(parseInt(e.target.value, 10))}
                >
                  <option value={2}>Binary (Base 2)</option>
                  <option value={8}>Octal (Base 8)</option>
                  <option value={10}>Decimal (Base 10)</option>
                  <option value={16}>Hexadecimal (Base 16)</option>
                </select>
              </div>

              {/* Target Base */}
              <div className="tool-form-group" style={{ marginBottom: 0 }}>
                <label htmlFor="to-base" className="tool-label">
                  To (Target Base):
                </label>
                <select
                  id="to-base"
                  className="tool-select"
                  value={toBase}
                  onChange={(e) => setToBase(parseInt(e.target.value, 10))}
                >
                  <option value={2}>Binary (Base 2)</option>
                  <option value={8}>Octal (Base 8)</option>
                  <option value={10}>Decimal (Base 10)</option>
                  <option value={16}>Hexadecimal (Base 16)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', flexWrap: 'wrap', marginBottom: 'var(--space-xl)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label htmlFor="bit-width" style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                  Register Width:
                </label>
                <select
                  id="bit-width"
                  className="tool-select"
                  style={{ width: 'auto', padding: '0.4rem 0.8rem' }}
                  value={bitWidth}
                  onChange={(e) => setBitWidth(parseInt(e.target.value, 10))}
                >
                  <option value={8}>8-Bit Byte</option>
                  <option value={16}>16-Bit Word</option>
                  <option value={32}>32-Bit Double Word</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary" disabled={loading} style={{ marginLeft: 'auto' }}>
                {loading ? 'Calculating...' : 'Convert'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            </div>
          </form>

          {/* Error Message Display */}
          <ErrorAlert message={error} onDismiss={() => setError(null)} />

          {/* Loading Indicator */}
          {loading && <LoadingSpinner message="Validating number and executing backend radix algorithms..." />}

          {/* Results Display */}
          {resultData && !loading && (
            <div>
              {/* Primary Conversion Callout */}
              <div
                style={{
                  backgroundColor: 'var(--primary-light)',
                  border: '1.5px solid var(--primary-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-lg)',
                  marginBottom: 'var(--space-xl)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Conversion Result ({baseLabels[resultData.from_base]} &rarr; {baseLabels[resultData.to_base]})
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)', marginTop: '4px' }}>
                    {resultData.result}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-primary">Input: {resultData.input}</span>
                </div>
              </div>

              {/* Multi-Radix Grid */}
              <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-sm)' }}>
                Simultaneous Base Encodings
              </h3>
              <div className="bit-display-grid" style={{ marginBottom: 'var(--space-xl)' }}>
                <div className="bit-display-card">
                  <div className="bit-display-label">Decimal (Base 10)</div>
                  <div className="bit-display-value">{resultData.decimal_value}</div>
                </div>

                <div className="bit-display-card">
                  <div className="bit-display-label">Binary (Base 2)</div>
                  <div className="bit-display-value">{resultData.binary}</div>
                </div>

                <div className="bit-display-card">
                  <div className="bit-display-label">Hexadecimal (Base 16)</div>
                  <div className="bit-display-value">{resultData.hexadecimal}</div>
                </div>

                <div className="bit-display-card">
                  <div className="bit-display-label">Octal (Base 8)</div>
                  <div className="bit-display-value">{resultData.octal}</div>
                </div>

                <div className="bit-display-card" style={{ borderLeft: '3px solid var(--primary)' }}>
                  <div className="bit-display-label">Two's Complement (8-Bit)</div>
                  <div className="bit-display-value">{resultData.twos_complement_8bit}</div>
                </div>

                <div className="bit-display-card" style={{ borderLeft: '3px solid var(--accent-teal)' }}>
                  <div className="bit-display-label">Two's Complement (16-Bit)</div>
                  <div className="bit-display-value">{resultData.twos_complement_16bit}</div>
                </div>
              </div>

              {/* Step-by-Step Derivation */}
              {resultData.steps && resultData.steps.length > 0 && (
                <div style={{ backgroundColor: '#fff', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-sm)' }}>
                    Mathematical Calculation Steps
                  </h3>
                  <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', lineHeight: '1.8' }}>
                    {resultData.steps.map((step, idx) => (
                      <div key={idx} style={{ color: 'var(--text-main)' }}>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conceptual Explanation Box */}
              <div style={{ backgroundColor: 'var(--bg-subtle)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 'var(--space-lg)' }}>
                <h3 style={{ fontSize: '1rem', marginBottom: 'var(--space-xs)' }}>
                  COA Architectural Concept
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {resultData.explanation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
