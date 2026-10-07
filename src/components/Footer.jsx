import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-link">
              <div className="brand-logo" aria-hidden="true">COA</div>
              <div className="brand-info">
                <span className="brand-title">Computer Organization &amp; Architecture</span>
                <span className="brand-subtitle">Academic Learning Platform</span>
              </div>
            </div>
            <p>
              A full-stack educational platform featuring interactive architectural simulators, radix converters, cache mapping visualizers, and coursework records.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <a
                href="https://github.com/Rich12-max"
                className="btn btn-secondary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Richa Sharma's GitHub Profile"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/richa-sharma-b55244382/"
                className="btn btn-secondary btn-sm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Richa Sharma's LinkedIn Profile"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Me</Link></li>
              <li><Link to="/assignment-1">Assignment 1</Link></li>
              <li><Link to="/gallery">Gallery &amp; Achievements</Link></li>
              <li><Link to="/github">GitHub Projects</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>COA Simulators</h4>
            <ul className="footer-links">
              <li><Link to="/coa-learning">Learning Hub</Link></li>
              <li><Link to="/coa-learning/number-converter">Number System Converter</Link></li>
              <li><Link to="/coa-learning/set-associative">Set Associative Overview</Link></li>
              <li><Link to="/coa-learning/set-associative/0-way">0-Way Set (Fully Associative)</Link></li>
              <li><Link to="/coa-learning/set-associative/1-way">1-Way Set (Direct Mapped)</Link></li>
              <li><Link to="/coa-learning/set-associative/2-way">2-Way Set Associative</Link></li>
              <li><Link to="/coa-learning/set-associative/3-way">3-Way Set Associative</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Academic Metadata</h4>
            <p style={{ fontSize: '0.8125rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
              Course: <strong>Computer Organization &amp; Architecture</strong><br />
              Department: <strong>[Department / Faculty Placeholder]</strong><br />
              Institution: <strong>[University / College Placeholder]</strong><br />
              Backend: <strong>FastAPI + SQLite (REST API)</strong>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div>&copy; 2026 Richa Sharma &mdash; Computer Organization &amp; Architecture Learning Platform.</div>
          <div>Academic Coursework &bull; React + Vite + FastAPI Full-Stack Architecture</div>
        </div>
      </div>
    </footer>
  );
}
