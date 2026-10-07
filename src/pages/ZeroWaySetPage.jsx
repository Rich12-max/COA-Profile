import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CacheSimulatorView from '../components/CacheSimulatorView';
import apiService from '../services/api';

export default function ZeroWaySetPage() {
  return (
    <div className="section">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'COA Learning Hub', to: '/coa-learning' },
            { label: 'Set Associative', to: '/coa-learning/set-associative' },
            { label: '0-Way Set', to: '/coa-learning/set-associative/0-way' },
          ]}
        />

        <div className="section-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="tagline">Associativity Mode</span>
              <h1>0-Way Set: Fully Associative Concept</h1>
              <p>
                In memory architecture theory, a 0-way or fully associative arrangement allows any block of main memory to reside in any cache line.
                There are 0 index bits required; the entire address consists solely of Tag and Offset bits.
              </p>
            </div>
            <Link to="/coa-learning/set-associative" className="btn btn-secondary btn-sm">
              &larr; All Associativities
            </Link>
          </div>
        </div>

        <CacheSimulatorView
          wayNumber="0"
          wayTitle="0-Way Set (Fully Associative Cache Pool)"
          wayBadge="Fully Associative"
          fetchFn={apiService.calculate0WayCache}
        />
      </div>
    </div>
  );
}
