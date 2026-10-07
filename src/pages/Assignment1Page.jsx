import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import apiService from '../services/api';

export default function Assignment1Page() {
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiService
      .getAssignments()
      .then((data) => {
        if (data && data.length > 0) {
          setAssignment(data[0]);
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch assignment details from backend database.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="section">
      <div className="container">
        <Breadcrumb items={[{ label: 'Assignment 1', to: '/assignment-1' }]} />

        {loading && <LoadingSpinner message="Fetching verified coursework from SQLite database..." />}
        <ErrorAlert message={error} onDismiss={() => setError(null)} />

        {assignment && !loading && (
          <div>
            {/* Header Banner */}
            <div className="card" style={{ marginBottom: 'var(--space-2xl)', borderLeft: '4px solid var(--primary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <span className="badge badge-primary" style={{ marginBottom: 'var(--space-xs)' }}>
                    Academic Coursework &bull; {assignment.course_code}
                  </span>
                  <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', marginBottom: '0.35rem' }}>
                    {assignment.title}
                  </h1>
                  <p style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>
                    Course: {assignment.course_name}
                  </p>
                </div>

                <a
                  href={assignment.github_url || '#'}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  View Code on GitHub
                </a>
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-xl)', flexWrap: 'wrap', marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid var(--border-color)', fontSize: '0.8125rem', color: 'var(--text-light)' }}>
                <div>Student Name: <strong style={{ color: 'var(--text-main)' }}>{assignment.student_name}</strong></div>
                <div>Student ID: <strong style={{ color: 'var(--text-main)' }}>{assignment.student_id}</strong></div>
                <div>Faculty / Instructor: <strong style={{ color: 'var(--text-main)' }}>{assignment.instructor}</strong></div>
                <div>Submission Date: <strong style={{ color: 'var(--text-main)' }}>{assignment.submission_date}</strong></div>
              </div>
            </div>

            {/* Structured Sections */}
            <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
              {/* Sidebar Outline */}
              <aside className="card" style={{ position: 'sticky', top: 'calc(var(--header-height) + 1rem)' }}>
                <h3 style={{ fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.75rem' }}>
                  Document Outline
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
                  <li><a href="#problem-statement">1. Problem Statement</a></li>
                  <li><a href="#objective">2. Objective</a></li>
                  <li><a href="#algorithm">3. Algorithm</a></li>
                  <li><a href="#explanation">4. Explanation</a></li>
                  <li><a href="#implementation">5. Implementation</a></li>
                  <li><a href="#output">6. Output</a></li>
                  <li><a href="#conclusion">7. Conclusion</a></li>
                </ul>
              </aside>

              {/* Main Content Area */}
              <div>
                {/* 1. Problem Statement */}
                <article id="problem-statement" className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-md)', paddingBottom: 'var(--space-xs)', borderBottom: '1px solid var(--border-color)' }}>
                    <span className="badge badge-primary">01</span>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Problem Statement</h2>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                    {assignment.problem_statement}
                  </p>
                </article>

                {/* 2. Objective */}
                <article id="objective" className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-md)', paddingBottom: 'var(--space-xs)', borderBottom: '1px solid var(--border-color)' }}>
                    <span className="badge badge-primary">02</span>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Objective</h2>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                    {assignment.objective}
                  </p>
                </article>

                {/* 3. Algorithm */}
                <article id="algorithm" className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-md)', paddingBottom: 'var(--space-xs)', borderBottom: '1px solid var(--border-color)' }}>
                    <span className="badge badge-primary">03</span>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Algorithm</h2>
                  </div>
                  <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', color: 'var(--text-main)', lineHeight: '1.7', fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>
                    {assignment.algorithm}
                  </div>
                </article>

                {/* 4. Explanation */}
                <article id="explanation" className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-md)', paddingBottom: 'var(--space-xs)', borderBottom: '1px solid var(--border-color)' }}>
                    <span className="badge badge-primary">04</span>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Explanation &amp; Methodology</h2>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                    {assignment.explanation}
                  </p>
                </article>

                {/* 5. Implementation */}
                <article id="implementation" className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-md)', paddingBottom: 'var(--space-xs)', borderBottom: '1px solid var(--border-color)' }}>
                    <span className="badge badge-primary">05</span>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Implementation</h2>
                  </div>
                  <div className="code-block-wrapper">
                    <div className="code-block-header">
                      <span>cache_simulator.c</span>
                      <span>C / C++ (C99 Standard)</span>
                    </div>
                    <pre className="code-block">
                      <code>{assignment.implementation_code}</code>
                    </pre>
                  </div>
                </article>

                {/* 6. Output */}
                <article id="output" className="card" style={{ marginBottom: 'var(--space-xl)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-md)', paddingBottom: 'var(--space-xs)', borderBottom: '1px solid var(--border-color)' }}>
                    <span className="badge badge-primary">06</span>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Output &amp; Verification</h2>
                  </div>
                  <div className="code-block-wrapper" style={{ backgroundColor: '#020617' }}>
                    <div className="code-block-header" style={{ backgroundColor: '#0f172a' }}>
                      <span>Terminal Benchmark Log</span>
                      <span style={{ color: '#4ade80' }}>Exit Status: 0 OK</span>
                    </div>
                    <pre className="code-block" style={{ color: '#38bdf8' }}>
                      <code>{assignment.output_trace}</code>
                    </pre>
                  </div>
                </article>

                {/* 7. Conclusion */}
                <article id="conclusion" className="card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--space-md)', paddingBottom: 'var(--space-xs)', borderBottom: '1px solid var(--border-color)' }}>
                    <span className="badge badge-primary">07</span>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Conclusion</h2>
                  </div>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                    {assignment.conclusion}
                  </p>
                </article>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
