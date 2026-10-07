import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import apiService from '../services/api';

export default function GitHubProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiService
      .getProjects()
      .then((data) => {
        setProjects(data || []);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load projects from backend database.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <Breadcrumb items={[{ label: 'GitHub Projects', to: '/github' }]} />

        <div className="section-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="tagline">Open Source &amp; Coursework</span>
              <h1>GitHub &amp; Code Repositories</h1>
              <p>
                Explore source repositories for educational simulators, radix algorithms, cache models, and coursework code.
              </p>
            </div>

            <a
              href="https://github.com/Rich12-max"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View GitHub Profile
            </a>
          </div>
        </div>

        <ErrorAlert message={error} onDismiss={() => setError(null)} />

        {loading && <LoadingSpinner message="Fetching project repositories from SQLite database..." />}

        {!loading && (
          <div className="grid-3">
            {projects.map((p) => (
              <div key={p.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
                  <span className="badge badge-primary">{p.category}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-light)' }}>
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>

                <h2 style={{ fontSize: '1.25rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>
                  {p.name}
                </h2>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: 'var(--space-lg)', flexGrow: 1 }}>
                  {p.description}
                </p>

                <div style={{ marginBottom: 'var(--space-lg)' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.35rem', fontWeight: 600 }}>
                    Technology Stack:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                    {p.tech_stack.split(',').map((tech, idx) => (
                      <span key={idx} className="badge" style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-color)' }}>
                  <a
                    href={p.github_url || '#'}
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
