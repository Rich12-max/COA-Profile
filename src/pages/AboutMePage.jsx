import React from 'react';
import profilePhoto from "../assets/profile/profile-photo.jpg";
import Breadcrumb from '../components/Breadcrumb';

export default function AboutMePage() {
  return (
    <div className="section">
      <div className="container">
        <Breadcrumb items={[{ label: 'About Me', to: '/about' }]} />

        {/* Profile Hero Card */}
        <div className="profile-card" style={{ marginBottom: 'var(--space-2xl)' }}>
          
          {/* Left Column: Photo & Frame Styling */}
          <div className="profile-photo-column">
            <div className="profile-photo-wrapper">
              <div className="photo-coa-corner-tl" aria-hidden="true" />
              <div className="photo-coa-corner-br" aria-hidden="true" />

              <div className="profile-photo-frame">
                <img 
                  src={profilePhoto} 
                  alt="Richa Sharma - Computer Science &amp; Engineering Undergraduate" 
                  className="profile-photo-img" 
                  loading="eager"
                />
              </div>

              {/* Status Chip */}
              <div className="photo-coa-accent-bl" aria-label="Student profile status">
                <span className="status-dot" />
                <span>CU &bull; CSE Portfolio</span>
              </div>
            </div>
          </div>

          {/* Right Column: Personal & Academic Details */}
          <div className="profile-info-column">
            <div className="profile-badge-row">
              <span className="badge badge-primary">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                Chandigarh University
              </span>
              <span className="badge badge-teal">B.E. CSE</span>
              <span className="badge badge-amber">Artificial Intelligence</span>
            </div>

            <h1 className="profile-name">Richa Sharma</h1>
            <div className="profile-role">Computer Science &amp; Engineering Undergraduate</div>
            <div className="profile-institution">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Chandigarh University (CU), Punjab, India
            </div>
            
            <p className="profile-bio">
              Computer Science &amp; Engineering student specializing in Artificial Intelligence, with an interest in software development, problem-solving, and building practical technology solutions. I enjoy exploring programming, databases, web development, and AI while continuously improving my technical skills through projects and hands-on learning.
            </p>

            {/* Academic Highlights */}
            <div className="profile-highlights">
              <div className="profile-highlight-item">
                <span className="profile-highlight-label">Degree &amp; Major</span>
                <span className="profile-highlight-value">B.E. Computer Science &amp; Engineering</span>
              </div>
              <div className="profile-highlight-item">
                <span className="profile-highlight-label">Core Specialization</span>
                <span className="profile-highlight-value">Artificial Intelligence</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="profile-social-buttons">
              <a href="https://github.com/Rich12-max" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub Profile
              </a>
              <a href="https://www.linkedin.com/in/richa-sharma-b55244382/" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn Profile
              </a>
            </div>

            <div className="profile-meta-footer">
              <span>Student ID: <strong style={{ color: 'var(--text-main)' }}>25BAI10049</strong></span>
              <span>&bull;</span>
              <span>Batch: <strong style={{ color: 'var(--text-main)' }}>2025 &ndash; 2029</strong></span>
              <span>&bull;</span>
              <span>Campus: <strong style={{ color: 'var(--text-main)' }}>Chandigarh University</strong></span>
            </div>
          </div>
        </div>

        {/* Education & Technical Skills Grid */}
        <div className="grid-2">
          {/* Education */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
              Education
            </h2>

            <div style={{ marginBottom: 'var(--space-lg)', paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                B.E. Computer Science &amp; Engineering
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginTop: '0.15rem', marginBottom: '0.35rem' }}>
                Chandigarh University &bull; 2025 &ndash; 2029
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Specialization: <strong style={{ color: 'var(--text-main)' }}>Artificial Intelligence</strong>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                12th (Higher Secondary)
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginTop: '0.15rem', marginBottom: '0.35rem' }}>
                Kendriya Vidyalaya Mankhurd
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Passed out: <strong style={{ color: 'var(--text-main)' }}>2025</strong>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
              Technical Skills
            </h2>

            <div style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Programming
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span className="badge">Python</span>
                <span className="badge">Java</span>
                <span className="badge">C++</span>
                <span className="badge">SQL</span>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Web Development
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span className="badge">HTML</span>
                <span className="badge">CSS</span>
                <span className="badge">JavaScript</span>
                <span className="badge">React</span>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Database
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span className="badge">MariaDB / MySQL</span>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Tools &amp; Platforms
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span className="badge">Git</span>
                <span className="badge">GitHub</span>
                <span className="badge">Microsoft Azure</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                AI &amp; Development
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span className="badge badge-primary">Artificial Intelligence</span>
                <span className="badge badge-teal">FastAPI</span>
                <span className="badge badge-teal">REST APIs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
