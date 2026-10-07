import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

export default function CoaLearningPage() {
  return (
    <div className="section">
      <div className="container">
        <Breadcrumb items={[{ label: 'COA Learning Hub', to: '/coa-learning' }]} />

        <div className="section-header">
          <span className="tagline">Interactive Simulators</span>
          <h1>COA Learning Hub</h1>
          <p>
            Welcome to the central laboratory for Computer Organization and Architecture. Select an interactive module below to analyze low-level binary data transformations or simulate cache memory line placement.
          </p>
        </div>

        {/* Two Major Options Grid */}
        <div className="grid-2" style={{ marginBottom: 'var(--space-3xl)' }}>
          {/* Option 1: Number System Converter */}
          <div className="card card-interactive" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <h2 className="card-title" style={{ fontSize: '1.4rem' }}>Number System Converter</h2>
              <span className="badge badge-primary">Module 01</span>
            </div>

            <p className="card-desc">
              Dedicated tool for multi-radix mathematical conversions. Convert seamlessly between Decimal, Binary, Hexadecimal, and Octal formats with full support for Unsigned, Sign-Magnitude, 1's Complement, and 2's Complement representations.
            </p>

            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: 'var(--space-xl)', flexGrow: 1 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                Included Capabilities:
              </div>
              <ul style={{ fontSize: '0.875rem', color: 'var(--text-muted)', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li>Radix 2, 8, 10, and 16 bi-directional conversions</li>
                <li>8-bit, 16-bit, and 32-bit width selection</li>
                <li>Two's Complement negative number derivation</li>
                <li>Step-by-step arithmetic division and expansion breakdown</li>
              </ul>
            </div>

            <Link to="/coa-learning/number-converter" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Open Number System Converter &rarr;
            </Link>
          </div>

          {/* Option 2: Set Associative Mapping */}
          <div className="card card-interactive" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="card-icon" style={{ backgroundColor: 'var(--accent-teal-light)', color: 'var(--accent-teal)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-xs)' }}>
              <h2 className="card-title" style={{ fontSize: '1.4rem' }}>Set Associative Mapping</h2>
              <span className="badge badge-teal">Module 02</span>
            </div>

            <p className="card-desc">
              Dedicated laboratory simulator for CPU cache line placement. Study address splitting (Tag, Set Index, Word Offset), block mapping equations, and set organization across varying associativity depths.
            </p>

            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: 'var(--space-xl)', flexGrow: 1 }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                Specific Set Options:
              </div>
              <ul style={{ fontSize: '0.875rem', color: 'var(--text-muted)', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <li><Link to="/coa-learning/set-associative/0-way"><strong>0-Way Set:</strong> Fully associative / pool mapping principles</Link></li>
                <li><Link to="/coa-learning/set-associative/1-way"><strong>1-Way Set:</strong> Direct mapped cache organization</Link></li>
                <li><Link to="/coa-learning/set-associative/2-way"><strong>2-Way Set:</strong> Dual-way associative block pairs &amp; LRU</Link></li>
                <li><Link to="/coa-learning/set-associative/3-way"><strong>3-Way Set:</strong> Multi-way organization &amp; conflict reduction</Link></li>
              </ul>
            </div>

            <Link to="/coa-learning/set-associative" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              Open Set Associative Simulator &rarr;
            </Link>
          </div>
        </div>

        {/* Associativity Modes Direct Navigation */}
        <div className="section-header">
          <span className="tagline">Deep Dive Modes</span>
          <h2>Explore Cache Associativities Directly</h2>
          <p>Quickly access dedicated interactive pages with real parameter calculators.</p>
        </div>

        <div className="grid-4">
          <div className="card">
            <span className="badge" style={{ marginBottom: 'var(--space-xs)' }}>Conceptual</span>
            <h3 style={{ fontSize: '1.1rem' }}>0-Way Set</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
              Fully Associative model. No set index bits required.
            </p>
            <Link to="/coa-learning/set-associative/0-way" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Launch 0-Way &rarr;
            </Link>
          </div>

          <div className="card">
            <span className="badge badge-teal" style={{ marginBottom: 'var(--space-xs)' }}>Direct Mapped</span>
            <h3 style={{ fontSize: '1.1rem' }}>1-Way Set</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
              1 line per set. Deterministic index mapping.
            </p>
            <Link to="/coa-learning/set-associative/1-way" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Launch 1-Way &rarr;
            </Link>
          </div>

          <div className="card">
            <span className="badge badge-primary" style={{ marginBottom: 'var(--space-xs)' }}>Standard</span>
            <h3 style={{ fontSize: '1.1rem' }}>2-Way Set</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
              Dual lines per set. Balances miss mitigation &amp; delay.
            </p>
            <Link to="/coa-learning/set-associative/2-way" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Launch 2-Way &rarr;
            </Link>
          </div>

          <div className="card">
            <span className="badge badge-amber" style={{ marginBottom: 'var(--space-xs)' }}>Advanced</span>
            <h3 style={{ fontSize: '1.1rem' }}>3-Way Set</h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
              Tri-line associative sets. Parallel tag comparators.
            </p>
            <Link to="/coa-learning/set-associative/3-way" className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
              Launch 3-Way &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
