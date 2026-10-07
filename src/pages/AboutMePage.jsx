import React from 'react';
import profilePhoto from "../assets/profile/profile-photo.jpg";
import Breadcrumb from '../components/Breadcrumb';

export default function AboutMePage() {
  return (
    <div className="section">
      <div className="container">
        <Breadcrumb items={[{ label: 'About Me', to: '/about' }]} />

        {/* ── 1. Profile Hero Card (Two-Column Layout with Real Photo) ── */}
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
            
            <p className="profile-bio" style={{ marginBottom: 'var(--space-md)' }}>
              Computer Science &amp; Engineering student specializing in Artificial Intelligence, with an interest in software development, problem-solving, and building practical technology solutions. I enjoy exploring programming, databases, web development, and AI while continuously improving my technical skills through projects and hands-on learning.
            </p>

            {/* Who I Am Subsection */}
            <div style={{
              backgroundColor: 'var(--bg-subtle)',
              borderLeft: '3px solid var(--primary)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.65rem 0.95rem',
              marginBottom: 'var(--space-md)'
            }}>
              <div style={{ fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', marginBottom: '0.2rem' }}>
                Who I Am
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                I'm a Computer Science &amp; Engineering student specializing in Artificial Intelligence. I enjoy learning new technologies, solving programming problems, and turning ideas into practical projects.
              </p>
            </div>

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

        {/* ── 2. Education & Technical Skills (Grid 2) ── */}
        <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
          {/* Education Card */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
              Education
            </h2>

            <div style={{ marginBottom: 'var(--space-lg)', paddingBottom: 'var(--space-md)', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                B.E. Computer Science &amp; Engineering
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Chandigarh University
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--primary)', marginTop: '0.2rem', fontWeight: 600 }}>
                Specialization: Artificial Intelligence
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                Batch: 2025 &ndash; 2029 &bull; Student ID: 25BAI10049
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                12th (Higher Secondary)
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Kendriya Vidyalaya Mankhurd
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>
                Passed out: 2025
              </div>
            </div>
          </div>

          {/* Technical Skills Card */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
              Technical Skills
            </h2>

            {/* Programming */}
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.35rem', fontWeight: 700 }}>
                Programming
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                <span className="badge">Python</span>
                <span className="badge">Java</span>
                <span className="badge">C++</span>
                <span className="badge">SQL</span>
              </div>
            </div>

            {/* Web Development */}
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.35rem', fontWeight: 700 }}>
                Web Development
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                <span className="badge">HTML</span>
                <span className="badge">CSS</span>
                <span className="badge">JavaScript</span>
                <span className="badge">React</span>
              </div>
            </div>

            {/* Database */}
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.35rem', fontWeight: 700 }}>
                Database
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                <span className="badge">MySQL</span>
                <span className="badge">MariaDB</span>
              </div>
            </div>

            {/* Backend */}
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.35rem', fontWeight: 700 }}>
                Backend
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                <span className="badge badge-teal">FastAPI</span>
                <span className="badge badge-teal">REST APIs</span>
              </div>
            </div>

            {/* AI */}
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.35rem', fontWeight: 700 }}>
                AI
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                <span className="badge badge-primary">Artificial Intelligence</span>
              </div>
            </div>

            {/* Tools & Platforms */}
            <div>
              <div style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.35rem', fontWeight: 700 }}>
                Tools &amp; Platforms
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                <span className="badge">Git</span>
                <span className="badge">GitHub</span>
                <span className="badge">Microsoft Azure</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── 3. What I Like Building & Currently Learning (Grid 2) ── */}
        <div className="grid-2" style={{ marginBottom: 'var(--space-xl)' }}>
          {/* What I Like Building Card */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
              What I Like Building
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-sm)' }}>
              {/* Card 1 */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 0.85rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  🤖 AI Applications
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Building practical applications using AI.
                </div>
              </div>

              {/* Card 2 */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 0.85rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  💻 Software Development
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Creating useful and functional software solutions.
                </div>
              </div>

              {/* Card 3 */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 0.85rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  🌐 Web Applications
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Developing interactive and user-friendly web applications.
                </div>
              </div>

              {/* Card 4 */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 0.85rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  🧩 Problem Solving
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Working with programming, DSA and databases.
                </div>
              </div>
            </div>
          </div>

          {/* Currently Learning Card */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
              Currently Learning
            </h2>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-md)' }}>
              Actively expanding technical depth across core computer science and emerging AI domains:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span className="badge badge-primary" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}>
                <span className="status-dot" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)', marginRight: '6px' }} />
                Artificial Intelligence
              </span>
              <span className="badge badge-teal" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}>
                <span className="status-dot" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-teal)', marginRight: '6px' }} />
                Data Structures &amp; Algorithms
              </span>
              <span className="badge" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}>
                React
              </span>
              <span className="badge" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}>
                Database Systems
              </span>
              <span className="badge" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}>
                Microsoft Azure
              </span>
              <span className="badge" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}>
                Software Development
              </span>
            </div>
          </div>
        </div>

        {/* ── 4. Developer Journey & Achievements / Certifications / Hobbies (Grid 2) ── */}
        <div className="grid-2">
          {/* Developer Journey Timeline Card */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
              My Developer Journey
            </h2>

            <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
              {/* Vertical line indicator */}
              <div style={{
                position: 'absolute',
                left: '7px',
                top: '6px',
                bottom: '12px',
                width: '2px',
                backgroundColor: 'var(--border-color)'
              }} />

              {/* Timeline Item 1 */}
              <div style={{ position: 'relative', marginBottom: 'var(--space-md)' }}>
                <div style={{
                  position: 'absolute',
                  left: '-1.5rem',
                  top: '3px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  border: '2px solid var(--bg-surface)'
                }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.04em' }}>
                  2025
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-main)', marginTop: '2px' }}>
                  🎓 Completed 12th
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Kendriya Vidyalaya Mankhurd
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div style={{ position: 'relative', marginBottom: 'var(--space-md)' }}>
                <div style={{
                  position: 'absolute',
                  left: '-1.5rem',
                  top: '3px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  border: '2px solid var(--bg-surface)'
                }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.04em' }}>
                  2025
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-main)', marginTop: '2px' }}>
                  💻 Started B.E. Computer Science &amp; Engineering
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                  Chandigarh University
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div style={{ position: 'relative', marginBottom: 'var(--space-md)' }}>
                <div style={{
                  position: 'absolute',
                  left: '-1.5rem',
                  top: '3px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-teal)',
                  border: '2px solid var(--bg-surface)'
                }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-teal)', letterSpacing: '0.04em' }}>
                  2026
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-main)', marginTop: '2px' }}>
                  🤖 Exploring Artificial Intelligence
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div style={{ position: 'relative', marginBottom: 'var(--space-md)' }}>
                <div style={{
                  position: 'absolute',
                  left: '-1.5rem',
                  top: '3px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-teal)',
                  border: '2px solid var(--bg-surface)'
                }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-teal)', letterSpacing: '0.04em' }}>
                  2026
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-main)', marginTop: '2px' }}>
                  💻 Building software and web projects
                </div>
              </div>

              {/* Timeline Item 5 */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '-1.5rem',
                  top: '3px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--accent-amber)',
                  border: '2px solid var(--bg-surface)'
                }} />
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-amber)', letterSpacing: '0.04em' }}>
                  2026
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--text-main)', marginTop: '2px' }}>
                  🏆 3rd Position &mdash; IKS Ideathon
                </div>
              </div>
            </div>
          </div>

          {/* Achievement, Certifications & Hobbies Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
            {/* Achievement Subsection */}
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-sm)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
                Achievement
              </h2>
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem 0.9rem'
              }}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
                  <span>🥉</span> 3rd Position &mdash; IKS Ideathon
                </div>
                <p style={{ margin: 0, fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Participated in the IKS Ideathon conducted by the university and secured 3rd position.
                </p>
              </div>
            </div>

            {/* Certifications & Learning Subsection */}
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-sm)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
                Certifications &amp; Learning
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <div style={{
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.55rem 0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.8125rem' }}>AZ-900</span>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>&bull;</span>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.875rem', fontWeight: 500 }}>Microsoft Azure Fundamentals</span>
                </div>

                <div style={{
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '0.55rem 0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ color: 'var(--accent-teal)', fontWeight: 700, fontSize: '0.875rem' }}>Python</span>
                  <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }}>&bull;</span>
                  <span style={{ color: 'var(--text-main)', fontSize: '0.875rem', fontWeight: 500 }}>Python Programming Certificate</span>
                </div>
              </div>
            </div>

            {/* Hobbies & Interests Subsection */}
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-sm)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
                Hobbies &amp; Interests
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span className="badge" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}>
                  🎵 Singing
                </span>
                <span className="badge" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}>
                  ✍️ Creative Writing
                </span>
                <span className="badge" style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}>
                  ✈️ Travelling &amp; Exploring Places
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
