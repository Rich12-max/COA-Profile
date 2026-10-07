import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CacheSimulatorView from '../components/CacheSimulatorView';
import apiService from '../services/api';

export default function OneWaySetPage() {
  return (
    <div className="section">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'COA Learning Hub', to: '/coa-learning' },
            { label: 'Set Associative', to: '/coa-learning/set-associative' },
            { label: '1-Way Set', to: '/coa-learning/set-associative/1-way' },
          ]}
        />

        <div className="section-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="tagline">Associativity Mode</span>
              <h1>1-Way Set: Direct Mapped Cache</h1>
              <p>
                Each set contains exactly 1 cache line. A memory block maps to exactly one line determined by
                <code>(Block Address mod Number of Lines)</code>. Fast lookup with single comparator checking.
              </p>
            </div>
            <Link to="/coa-learning/set-associative" className="btn btn-secondary btn-sm">
              &larr; All Associativities
            </Link>
          </div>
        </div>

        <CacheSimulatorView
          wayNumber="1"
          wayTitle="1-Way Set Associative (Direct Mapped Cache)"
          wayBadge="Direct Mapped (1 Line / Set)"
          fetchFn={apiService.calculate1WayCache}
        />
      </div>
    </div>
  );
}
