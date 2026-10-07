import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CacheSimulatorView from '../components/CacheSimulatorView';
import apiService from '../services/api';

export default function ThreeWaySetPage() {
  return (
    <div className="section">
      <div className="container">
        <Breadcrumb
          items={[
            { label: 'COA Learning Hub', to: '/coa-learning' },
            { label: 'Set Associative', to: '/coa-learning/set-associative' },
            { label: '3-Way Set', to: '/coa-learning/set-associative/3-way' },
          ]}
        />

        <div className="section-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="tagline">Associativity Mode</span>
              <h1>3-Way Set Associative Cache</h1>
              <p>
                Each set consists of 3 distinct lines. Parallel tri-way comparators evaluate tag matches simultaneously,
                offering higher hit probability and lower conflict misses than 1-way and 2-way configurations.
              </p>
            </div>
            <Link to="/coa-learning/set-associative" className="btn btn-secondary btn-sm">
              &larr; All Associativities
            </Link>
          </div>
        </div>

        <CacheSimulatorView
          wayNumber="3"
          wayTitle="3-Way Set Associative Cache (Tri-Way Parallel)"
          wayBadge="3 Ways / Set"
          fetchFn={apiService.calculate3WayCache}
        />
      </div>
    </div>
  );
}
