import React from 'react';
import { Link } from 'react-router-dom';
import profilePhoto from "../assets/profile/profile-photo.jpg";
import Breadcrumb from '../components/Breadcrumb';

export default function AboutMePage() {
  return (
    <div className="section">
      <div className="container">
        <Breadcrumb items={[{ label: 'About Me', to: '/about' }]} />

        {/* Profile Hero Card (Two-Column Layout with Real Photo & COA Accents) */}
        <div className="profile-card" style={{ marginBottom: 'var(--space-2xl)' }}>
          
          {/* Left Column: Photo & Architectural Accents */}
          <div className="profile-photo-column">
            <div className="profile-photo-wrapper">
              {/* COA Subtle Technical Corner Accents */}
              <div className="photo-coa-corner-tl" aria-hidden="true" />
              <div className="photo-coa-corner-br" aria-hidden="true" />
              
              {/* Subtle Binary Badge removed per user request */}


              <div className="profile-photo-frame">
                <img 
                  src={profilePhoto} 
                  alt="Richa Sharma - Computer Science &amp; Engineering Undergraduate" 
                  className="profile-photo-img" 
                  loading="eager"
                />
              </div>

              {/* Status / Architecture Chip Tag */}
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
              <span className="badge badge-amber">COA Learner</span>
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
              Highly motivated undergraduate engineering student with a strong passion for low-level systems programming, computer architecture, digital logic, and memory hierarchy optimization. Currently maintaining academic excellence and developing interactive simulators for Computer Organization &amp; Architecture.
            </p>

            {/* Quick Academic Highlights */}
            <div className="profile-highlights">
              <div className="profile-highlight-item">
                <span className="profile-highlight-label">Degree &amp; Major</span>
                <span className="profile-highlight-value">B.E. Computer Science &amp; Engineering</span>
              </div>
              <div className="profile-highlight-item">
                <span className="profile-highlight-label">Core Specialization</span>
                <span className="profile-highlight-value">Computer Systems &amp; Architecture</span>
              </div>
              <div className="profile-highlight-item">
                <span className="profile-highlight-label">Key Competencies</span>
                <span className="profile-highlight-value">Cache Simulation, Digital Logic, Assembly</span>
              </div>
            </div>

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
              <Link to="/assignment-1" className="btn btn-secondary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                View Coursework
              </Link>
            </div>

            <div className="profile-meta-footer">
              <span>Student ID: <strong style={{ color: 'var(--text-main)' }}>[Student ID]</strong></span>
              <span>&bull;</span>
              <span>Batch: <strong style={{ color: 'var(--text-main)' }}>2023 &ndash; 2027</strong></span>
              <span>&bull;</span>
              <span>Campus: <strong style={{ color: 'var(--text-main)' }}>Chandigarh University</strong></span>
            </div>
          </div>
        </div>

        {/* Education & Skills Grid */}
        <div className="grid-2">
          {/* Education */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
              Education
            </h2>

            <div style={{ marginBottom: 'var(--space-lg)' }}>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                Bachelor of Technology (B.Tech / B.E.) &mdash; Computer Science &amp; Engineering
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
                Chandigarh University (CU) &bull; 2023 &ndash; Present (Expected 2027)
              </div>
              <p style={{ fontSize: '0.875rem' }}>
                Current CGPA: <strong>[CGPA Placeholder / 10.0]</strong><br />
                Key Coursework: Computer Organization &amp; Architecture, Data Structures, Operating Systems, Digital Logic Design.
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
                Higher Secondary Certificate (Grade XII)
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>
                [Junior College / High School Placeholder] &bull; [Graduation Year]
              </div>
              <p style={{ fontSize: '0.875rem' }}>
                Physics, Chemistry, Mathematics &amp; Computer Science &bull; Score: <strong>[Percentage / Grade Placeholder]</strong>
              </p>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="card">
            <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
              Technical Skills
            </h2>

            <div style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Systems &amp; Languages
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span className="badge">C / C++ (Low-Level Systems)</span>
                <span className="badge">Assembly (x86 / MIPS / RISC-V)</span>
                <span className="badge">Python</span>
                <span className="badge">JavaScript / React</span>
              </div>
            </div>

            <div style={{ marginBottom: 'var(--space-md)' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                COA &amp; Hardware Tools
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span className="badge badge-primary">Logisim / Evolution</span>
                <span className="badge badge-primary">MARS MIPS Simulator</span>
                <span className="badge badge-primary">Cache Simulator (SMPCache)</span>
                <span className="badge badge-primary">Verilog / VHDL (Introductory)</span>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                Frameworks &amp; Environment
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span className="badge badge-teal">FastAPI</span>
                <span className="badge badge-teal">SQLite</span>
                <span className="badge badge-teal">Git &amp; GitHub</span>
                <span className="badge badge-teal">Linux / Bash CLI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="card" style={{ marginTop: 'var(--space-xl)' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-md)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--space-sm)' }}>
            Areas of Academic Interest
          </h2>
          <div className="grid-3" style={{ marginTop: 'var(--space-md)' }}>
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Memory Hierarchy &amp; Caching</h3>
              <p style={{ fontSize: '0.8125rem' }}>
                Miss rate reduction, set associative replacement policies (LRU, FIFO, LFU), multi-level cache coherence, and virtual memory translation.
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Instruction Set Architecture (ISA)</h3>
              <p style={{ fontSize: '0.8125rem' }}>
                RISC-V pipeline hazard mitigation, data forwarding, branch prediction heuristics, and cycle-accurate performance estimation.
              </p>
            </div>
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: 'var(--space-md)', borderRadius: 'var(--radius-sm)' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Arithmetic Logic Units (ALU)</h3>
              <p style={{ fontSize: '0.8125rem' }}>
                Combinational adder architectures (CLA, Ripple), Booth's multiplication algorithms, restoring division, and IEEE-754 floating-point units.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
