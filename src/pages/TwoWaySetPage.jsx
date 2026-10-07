import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CacheSimulatorView from '../components/CacheSimulatorView';
import apiService from '../services/api';

export default function TwoWaySetPage() {
  return (
    <div className="section">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'COA Learning Hub', to: '/coa-learning' },
            { label: 'Set Associative', to: '/coa-learning/set-associative' },
            { label: '2-Way Set', to: '/coa-learning/set-associative/2-way' },
          ]}
        />

        <div className="section-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="tagline">Associativity Mode</span>
              <h1>2-Way Set Associative Cache</h1>
              <p>
                Each set contains 2 lines (ways). A memory block maps to a designated set based on its index, and can reside in either way.
                LRU or FIFO replacement policies select the victim line when conflicts occur.
              </p>
            </div>
            <Link to="/coa-learning/set-associative" className="btn btn-secondary btn-sm">
              &larr; All Associativities
            </Link>
          </div>
        </div>

        <CacheSimulatorView
          wayNumber="2"
          wayTitle="2-Way Set Associative Cache (Industry Standard)"
          wayBadge="2 Ways / Set (Dual Line)"
          fetchFn={apiService.calculate2WayCache}
        />
      </div>
    </div>
  );
}
