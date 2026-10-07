import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

export default function SetAssociativePage() {
  return (
    <div className="section">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'COA Learning Hub', to: '/coa-learning' },
            { label: 'Set Associative Mapping', to: '/coa-learning/set-associative' },
          ]}
        />

        <div className="section-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="tagline">COA Interactive Laboratory</span>
              <h1>Set Associative Cache Mapping</h1>
              <p>
                Explore physical memory address decoding, tag comparator requirements, and line placement for direct and set-associative cache architectures.
              </p>
            </div>
            <Link to="/coa-learning" className="btn btn-secondary btn-sm">
              &larr; Back to Learning Hub
            </Link>
          </div>
        </div>

        {/* 4 Dedicated Mode Cards */}
        <div style={{ marginBottom: 'var(--space-2xl)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-md)' }}>
            Select Associativity Architecture
          </h2>
          <div className="grid-4">
            {/* 0-Way Set */}
            <div className="card card-interactive" style={{ borderTop: '3px solid #64748b' }}>
              <span className="badge" style={{ marginBottom: 'var(--space-xs)' }}>Theoretical</span>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>0-Way Set</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
                Fully Associative pool model. No set index bits required; any memory block maps to any cache line.
              </p>
              <Link to="/coa-learning/set-associative/0-way" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                Open 0-Way Simulator &rarr;
              </Link>
            </div>

            {/* 1-Way Set */}
            <div className="card card-interactive" style={{ borderTop: '3px solid var(--accent-teal)' }}>
              <span className="badge badge-teal" style={{ marginBottom: 'var(--space-xs)' }}>Direct Mapped</span>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>1-Way Set</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
                Direct mapped cache: 1 line per set. Memory block has exactly one fixed location. Fast, low hardware cost.
              </p>
              <Link to="/coa-learning/set-associative/1-way" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                Open 1-Way Simulator &rarr;
              </Link>
            </div>

            {/* 2-Way Set */}
            <div className="card card-interactive" style={{ borderTop: '3px solid var(--primary)' }}>
              <span className="badge badge-primary" style={{ marginBottom: 'var(--space-xs)' }}>Classic Standard</span>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>2-Way Set</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
                Dual-line sets. Balances conflict miss mitigation with 2 comparators per set. Employs LRU replacement.
              </p>
              <Link to="/coa-learning/set-associative/2-way" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                Open 2-Way Simulator &rarr;
              </Link>
            </div>

            {/* 3-Way Set */}
            <div className="card card-interactive" style={{ borderTop: '3px solid var(--accent-amber)' }}>
              <span className="badge badge-amber" style={{ marginBottom: 'var(--space-xs)' }}>Multi-Way</span>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '0.25rem' }}>3-Way Set</h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
                Specialized 3-line associative sets. Higher hit probability, tri-comparator parallel tag checking.
              </p>
              <Link to="/coa-learning/set-associative/3-way" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                Open 3-Way Simulator &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Theoretical Framework */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-md)' }}>
            Mathematical Principles of Cache Dimensioning
          </h2>
          <div className="grid-3" style={{ marginTop: 'var(--space-md)' }}>
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.25rem' }}>1. Sets Equation</h3>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                S = Total Lines ÷ Ways
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Where Total Lines = Cache Size ÷ Block Size.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.25rem' }}>2. Bit Field Decomposition</h3>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                Offset = log₂(Block Size)<br />
                Set Bits = log₂(Sets)
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Power-of-two address partitioning.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: '0.9375rem', marginBottom: '0.25rem' }}>3. Tag Bit Matching</h3>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                Tag = Address Bits − (Set + Offset)
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                Identifies unique memory block in comparator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
