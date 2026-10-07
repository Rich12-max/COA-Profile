import React from 'react';
import { Link } from 'react-router-dom';
import profilePhoto from '../assets/profile/profile-photo.jpg';
import Breadcrumb from '../components/Breadcrumb';

export default function AboutMePage() {
  return (
    <div className="section">
      <div className="container about-page-wrapper">
        <Breadcrumb items={[{ label: 'About Me', to: '/about' }]} />

        {/* ── Soft Ambient Decorative Glows ────────────────────────────── */}
        <div className="about-ambient-glow about-glow-1" aria-hidden="true" />
        <div className="about-ambient-glow about-glow-2" aria-hidden="true" />

        {/* ── 2. HERO — "THIS IS ME" (Two-Column Side-by-Side) ─────────── */}
        <section className="about-hero-section" aria-label="Introduction">
          {/* Left Column: Personal Editorial Intro */}
          <div className="about-hero-left">
            <div className="about-hero-tag">
              <span className="about-hero-tag-dot" aria-hidden="true" />
              <span>About Me / 01</span>
            </div>

            <h1 className="about-hero-title">
              Hi, I'm Richa.
            </h1>

            <div className="about-hero-subtitle">
              Computer Science &amp; Engineering student exploring Artificial Intelligence, technology and creative problem-solving.
            </div>

            <p className="about-hero-bio">
              I'm currently pursuing B.E. in Computer Science &amp; Engineering with a specialization in Artificial Intelligence at Chandigarh University. I enjoy learning through hands-on projects and turning ideas into practical technology solutions.
            </p>

            <div className="about-hero-actions">
              <a
                href="https://github.com/Rich12-max"
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
                id="about-btn-github"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/richa-sharma-b55244382/"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                id="about-btn-linkedin"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Right Column: Layered Centerpiece Photo Frame */}
          <div className="about-photo-centerpiece">
            <div className="about-photo-stage">
              {/* Layer 1: Back abstract offset rounded shape */}
              <div className="about-photo-back-shape" aria-hidden="true" />

              {/* Layer 2: Main photo container */}
              <div className="about-photo-frame">
                <img
                  src={profilePhoto}
                  alt="Richa Sharma - Computer Science &amp; Engineering Undergraduate"
                  className="about-photo-img"
                  loading="eager"
                />
              </div>

              {/* Floating Labels & Design Elements */}
              <div className="about-float-chip about-chip-top-left">
                Richa Sharma
              </div>
              <div className="about-float-chip about-chip-side">
                CSE &times; AI
              </div>
              <div className="about-float-chip about-chip-bottom-right">
                2025&mdash;2029
              </div>

              {/* Subtle Tech & Editorial Accents */}
              <span className="about-sparkle-icon about-sparkle-1" aria-hidden="true">&#10022;</span>
              <span className="about-sparkle-icon about-sparkle-2" aria-hidden="true">&#10022;</span>
              <span className="about-binary-accent about-binary-1" aria-hidden="true">01</span>
              <span className="about-binary-accent about-binary-2" aria-hidden="true">10</span>
            </div>
          </div>
        </section>

        {/* ── 4. PERSONAL IDENTITY STRIP ───────────────────────────────── */}
        <div className="about-identity-strip" role="region" aria-label="Student Identity">
          <div className="about-identity-col">
            <span className="identity-label">Full Name</span>
            <span className="identity-val">Richa Sharma</span>
          </div>

          <div className="about-identity-divider" aria-hidden="true" />

          <div className="about-identity-col">
            <span className="identity-label">Course &amp; Major</span>
            <span className="identity-val">B.E. Computer Science &amp; Engineering</span>
          </div>

          <div className="about-identity-divider" aria-hidden="true" />

          <div className="about-identity-col">
            <span className="identity-label">Specialization</span>
            <span className="identity-val" style={{ color: 'var(--primary)' }}>Artificial Intelligence</span>
          </div>

          <div className="about-identity-divider" aria-hidden="true" />

          <div className="about-identity-col">
            <span className="identity-label">University</span>
            <span className="identity-val">Chandigarh University</span>
          </div>

          <div className="about-identity-divider" aria-hidden="true" />

          <div className="about-identity-col">
            <span className="identity-label">Student ID</span>
            <span className="identity-val" style={{ fontFamily: 'var(--font-mono)' }}>25BAI10049</span>
          </div>

          <div className="about-identity-divider" aria-hidden="true" />

          <div className="about-identity-col">
            <span className="identity-label">Batch</span>
            <span className="identity-val">2025 &ndash; 2029</span>
          </div>
        </div>

        {/* ── 5. "A LITTLE ABOUT ME" (Large Quote Statement) ──────────── */}
        <section className="about-quote-container" aria-label="About Philosophy">
          <div className="about-quote-watermark" aria-hidden="true">&ldquo;</div>
          <div className="about-quote-header-tag">A Little About Me</div>
          <h2 className="about-quote-heading">
            &ldquo;I like learning by building.&rdquo;
          </h2>
          <p className="about-quote-body">
            From programming and databases to AI and web development, I enjoy understanding how things work and experimenting with ideas through projects.
          </p>
        </section>

        {/* ── 6. "WHAT I LIKE BUILDING" (2x2 Layout) ───────────────────── */}
        <section aria-labelledby="building-heading">
          <div className="about-section-header">
            <span className="about-section-label">Focus Areas</span>
            <h2 id="building-heading" className="about-section-title">What I Like Building</h2>
          </div>

          <div className="about-building-grid">
            {/* 01 — AI Applications */}
            <div className="about-building-card">
              <div className="about-building-top">
                <span className="about-building-num">01</span>
                <span className="about-building-icon" aria-hidden="true">🤖</span>
              </div>
              <div className="about-building-name">AI Applications</div>
              <p className="about-building-desc">
                Building practical applications using AI.
              </p>
            </div>

            {/* 02 — Web Experiences */}
            <div className="about-building-card">
              <div className="about-building-top">
                <span className="about-building-num">02</span>
                <span className="about-building-icon" aria-hidden="true">🌐</span>
              </div>
              <div className="about-building-name">Web Experiences</div>
              <p className="about-building-desc">
                Creating interactive and user-friendly web applications.
              </p>
            </div>

            {/* 03 — Software Solutions */}
            <div className="about-building-card">
              <div className="about-building-top">
                <span className="about-building-num">03</span>
                <span className="about-building-icon" aria-hidden="true">💻</span>
              </div>
              <div className="about-building-name">Software Solutions</div>
              <p className="about-building-desc">
                Turning ideas into useful and functional software.
              </p>
            </div>

            {/* 04 — Problem Solving */}
            <div className="about-building-card">
              <div className="about-building-top">
                <span className="about-building-num">04</span>
                <span className="about-building-icon" aria-hidden="true">🧩</span>
              </div>
              <div className="about-building-name">Problem Solving</div>
              <p className="about-building-desc">
                Exploring programming, DSA and database challenges.
              </p>
            </div>
          </div>
        </section>

        {/* ── 7. TECHNICAL SKILLS ("MY TOOLBOX") ───────────────────────── */}
        <section className="about-toolbox-container" aria-labelledby="toolbox-heading">
          <div className="about-section-header" style={{ marginBottom: 'var(--space-lg)' }}>
            <span className="about-section-label">Skills &amp; Technologies</span>
            <h2 id="toolbox-heading" className="about-section-title">My Toolbox</h2>
          </div>

          <div className="about-toolbox-grid">
            {/* PROGRAMMING */}
            <div className="about-toolbox-category">
              <div className="about-toolbox-cat-name">Programming</div>
              <div className="about-toolbox-pills">
                <span className="about-tool-pill">Python</span>
                <span className="about-tool-pill">Java</span>
                <span className="about-tool-pill">C++</span>
                <span className="about-tool-pill">SQL</span>
              </div>
            </div>

            {/* WEB */}
            <div className="about-toolbox-category">
              <div className="about-toolbox-cat-name">Web</div>
              <div className="about-toolbox-pills">
                <span className="about-tool-pill">HTML</span>
                <span className="about-tool-pill">CSS</span>
                <span className="about-tool-pill">JavaScript</span>
                <span className="about-tool-pill">React</span>
              </div>
            </div>

            {/* BACKEND */}
            <div className="about-toolbox-category">
              <div className="about-toolbox-cat-name">Backend</div>
              <div className="about-toolbox-pills">
                <span className="about-tool-pill">FastAPI</span>
                <span className="about-tool-pill">REST APIs</span>
              </div>
            </div>

            {/* DATABASE */}
            <div className="about-toolbox-category">
              <div className="about-toolbox-cat-name">Database</div>
              <div className="about-toolbox-pills">
                <span className="about-tool-pill">MySQL</span>
                <span className="about-tool-pill">MariaDB</span>
              </div>
            </div>

            {/* AI */}
            <div className="about-toolbox-category">
              <div className="about-toolbox-cat-name">AI</div>
              <div className="about-toolbox-pills">
                <span className="about-tool-pill" style={{ borderColor: 'var(--primary-border)', color: 'var(--primary)' }}>
                  Artificial Intelligence
                </span>
              </div>
            </div>

            {/* TOOLS */}
            <div className="about-toolbox-category">
              <div className="about-toolbox-cat-name">Tools</div>
              <div className="about-toolbox-pills">
                <span className="about-tool-pill">Git</span>
                <span className="about-tool-pill">GitHub</span>
                <span className="about-tool-pill">Microsoft Azure</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. "CURRENTLY EXPLORING" ─────────────────────────────────── */}
        <section className="about-exploring-container" aria-labelledby="exploring-heading">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="about-pulse-dot" aria-hidden="true" />
            <span id="exploring-heading" style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)', fontWeight: 700 }}>
              Currently Exploring
            </span>
          </div>

          <div className="about-exploring-flow">
            <span className="about-exploring-node">AI</span>
            <span className="about-exploring-connector" aria-hidden="true">
              <span className="about-pulse-dot" />
              <span className="about-pulse-dot" />
            </span>

            <span className="about-exploring-node">Data Structures</span>
            <span className="about-exploring-connector" aria-hidden="true">
              <span className="about-pulse-dot" />
              <span className="about-pulse-dot" />
            </span>

            <span className="about-exploring-node">React</span>
            <span className="about-exploring-connector" aria-hidden="true">
              <span className="about-pulse-dot" />
              <span className="about-pulse-dot" />
            </span>

            <span className="about-exploring-node">Databases</span>
            <span className="about-exploring-connector" aria-hidden="true">
              <span className="about-pulse-dot" />
              <span className="about-pulse-dot" />
            </span>

            <span className="about-exploring-node">Azure</span>
            <span className="about-exploring-connector" aria-hidden="true">
              <span className="about-pulse-dot" />
              <span className="about-pulse-dot" />
            </span>

            <span className="about-exploring-node">Software Development</span>
          </div>
        </section>

        {/* ── 9 & 10. EDUCATION & DEVELOPER JOURNEY (Side-by-Side) ─────── */}
        <div className="about-timelines-grid">
          {/* My Education Timeline */}
          <section className="about-timeline-card" aria-labelledby="education-heading">
            <div className="about-section-header" style={{ marginBottom: 'var(--space-md)' }}>
              <span className="about-section-label">Academic Path</span>
              <h2 id="education-heading" className="about-section-title">My Education</h2>
            </div>

            <div className="about-timeline-track">
              {/* School */}
              <div className="about-timeline-entry">
                <div className="about-timeline-dot" aria-hidden="true" />
                <div className="about-timeline-date">2025</div>
                <div className="about-timeline-title">Kendriya Vidyalaya Mankhurd</div>
                <div className="about-timeline-subtitle">12th &mdash; Passed out 2025</div>
              </div>

              {/* University */}
              <div className="about-timeline-entry">
                <div className="about-timeline-dot" aria-hidden="true" />
                <div className="about-timeline-date">2025 &mdash; 2029</div>
                <div className="about-timeline-title">Chandigarh University</div>
                <div className="about-timeline-subtitle">
                  B.E. Computer Science &amp; Engineering<br />
                  Specialization: <strong style={{ color: 'var(--text-main)' }}>Artificial Intelligence</strong>
                </div>
                <div className="about-timeline-meta">
                  Student ID: 25BAI10049
                </div>
              </div>
            </div>
          </section>

          {/* My Journey So Far Timeline */}
          <section className="about-timeline-card" aria-labelledby="journey-heading">
            <div className="about-section-header" style={{ marginBottom: 'var(--space-md)' }}>
              <span className="about-section-label">Milestones</span>
              <h2 id="journey-heading" className="about-section-title">My Journey So Far</h2>
            </div>

            <div className="about-timeline-track">
              <div className="about-timeline-entry">
                <div className="about-timeline-dot" aria-hidden="true" />
                <div className="about-timeline-date">2025</div>
                <div className="about-timeline-title">Completed 12th</div>
              </div>

              <div className="about-timeline-entry">
                <div className="about-timeline-dot" aria-hidden="true" />
                <div className="about-timeline-date">2025</div>
                <div className="about-timeline-title">Started B.E. CSE at Chandigarh University</div>
              </div>

              <div className="about-timeline-entry">
                <div className="about-timeline-dot" aria-hidden="true" />
                <div className="about-timeline-date">2026</div>
                <div className="about-timeline-title">Started exploring Artificial Intelligence</div>
              </div>

              <div className="about-timeline-entry">
                <div className="about-timeline-dot" aria-hidden="true" />
                <div className="about-timeline-date">2026</div>
                <div className="about-timeline-title">Started building software and web projects</div>
              </div>

              <div className="about-timeline-entry">
                <div className="about-timeline-dot" aria-hidden="true" />
                <div className="about-timeline-date">2026</div>
                <div className="about-timeline-title">3rd Position &mdash; IKS Ideathon</div>
              </div>
            </div>
          </section>
        </div>

        {/* ── 11, 12, 13. SPOTLIGHT, MILESTONES & BEYOND CODE ─────────── */}
        <section className="about-spotlight-section" aria-label="Achievements and Interests">
          {/* 11. Achievement Spotlight */}
          <div>
            <div className="about-section-header" style={{ marginBottom: 'var(--space-sm)' }}>
              <span className="about-section-label">Recognition</span>
              <h2 className="about-section-title">One Moment I'm Proud Of</h2>
            </div>

            <div className="about-highlight-box">
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '1.25rem' }} aria-hidden="true">🥉</span>
                <span>3rd Position &mdash; IKS Ideathon</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Participated in the IKS Ideathon conducted by the university and secured 3rd position.
              </p>
            </div>
          </div>

          {/* 12. Certifications & Learning Milestones */}
          <div>
            <div className="about-section-header" style={{ marginBottom: 'var(--space-sm)' }}>
              <span className="about-section-label">Verified Certifications</span>
              <h2 className="about-section-title">Learning Milestones</h2>
            </div>

            <div className="about-milestones-row">
              <div className="about-milestone-pill">
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary)' }}>
                  AZ-900
                </span>
                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }} aria-hidden="true">&bull;</span>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                  Microsoft Azure Fundamentals
                </span>
              </div>

              <div className="about-milestone-pill">
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.85rem', color: 'var(--accent-teal)' }}>
                  Python
                </span>
                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem' }} aria-hidden="true">&bull;</span>
                <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                  Python Programming Certificate
                </span>
              </div>
            </div>
          </div>

          {/* 13. Hobbies — Beyond Code */}
          <div>
            <div className="about-section-header" style={{ marginBottom: 'var(--space-sm)' }}>
              <span className="about-section-label">Personal Life</span>
              <h2 className="about-section-title">Beyond Code</h2>
            </div>

            <div className="about-beyond-row" style={{ marginBottom: '0.75rem' }}>
              <span className="about-beyond-tag">
                <span aria-hidden="true">🎵</span> Singing
              </span>
              <span className="about-beyond-tag">
                <span aria-hidden="true">✍️</span> Creative Writing
              </span>
              <span className="about-beyond-tag">
                <span aria-hidden="true">✈️</span> Travelling &amp; Exploring Places
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '0.875rem', fontStyle: 'italic', color: 'var(--text-light)' }}>
              &ldquo;Because creativity doesn't stop when the code does.&rdquo;
            </p>
          </div>
        </section>

        {/* ── 14 & 15. SOCIAL CONNECT & ENDING STATEMENT ───────────────── */}
        <section className="about-ending-container" aria-label="Connect and Closing">
          <div className="about-section-label" style={{ marginBottom: 'var(--space-xs)' }}>
            Connect With Me
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: 'var(--space-lg)' }}>
            Find Me Around the Web
          </h2>

          <div className="about-connect-buttons">
            <a
              href="https://github.com/Rich12-max"
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              id="about-footer-github"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              github.com/Rich12-max
            </a>
            <a
              href="https://www.linkedin.com/in/richa-sharma-b55244382/"
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              id="about-footer-linkedin"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              linkedin.com/in/richa-sharma-b55244382/
            </a>
          </div>

          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <p className="about-ending-statement">
              &ldquo;Still learning. Still building. Still curious.&rdquo;
            </p>
            <p className="about-ending-sub">
              Let's build something interesting.
            </p>

            <Link to="/github" className="btn btn-primary btn-lg" id="about-btn-explore-projects">
              Explore My Projects &rarr;
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
