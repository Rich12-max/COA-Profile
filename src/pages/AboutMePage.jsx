import React from 'react';
import profilePhoto from '../assets/profile/profile-photo.jpg';
import Breadcrumb from '../components/Breadcrumb';

export default function AboutMePage() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="section">
      <div className="container about-page-wrapper">
        <Breadcrumb items={[{ label: 'About Me', to: '/about' }]} />

        {/* ── Soft Ambient Glow Blooms ───────────────────────────────── */}
        <div className="about-ambient-glow about-glow-1" aria-hidden="true" />
        <div className="about-ambient-glow about-glow-2" aria-hidden="true" />
        <div className="about-ambient-glow about-glow-3" aria-hidden="true" />

        {/* ── 1. Beautiful Intro / Hero ───────────────────────────────── */}
        <section className="about-hero-section" aria-label="Introduction">
          {/* Left Column: Personal Editorial Narrative */}
          <div className="about-hero-left">
            <div className="about-hero-label">
              <span className="about-hero-label-dot" aria-hidden="true" />
              <span>ABOUT ME &middot; 01</span>
            </div>

            <h1 className="about-hero-title">
              Hi, I'm Richa.
            </h1>

            <div className="about-hero-subtitle">
              A Computer Science &amp; Engineering student exploring Artificial Intelligence, technology, and creative problem-solving.
            </div>

            <p className="about-hero-bio">
              I enjoy turning ideas into practical digital experiences, learning through projects, and discovering new ways technology can solve everyday problems.
            </p>

            <div className="about-hero-buttons">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => scrollToSection('my-journey')}
                id="btn-explore-journey"
              >
                Explore My Journey &rarr;
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => scrollToSection('connect')}
                id="btn-lets-connect"
              >
                Let's Connect &#8599;
              </button>
            </div>
          </div>

          {/* Right Column: Layered Artistic Photo Frame */}
          <div className="about-photo-centerpiece">
            <div className="about-photo-stage">
              {/* Layer 1: Back abstract offset rounded shape */}
              <div className="about-photo-back-offset" aria-hidden="true" />

              {/* Layer 2: Main photo container */}
              <div className="about-photo-frame">
                <img
                  src={profilePhoto}
                  alt="Richa Sharma - Computer Science &amp; Engineering Undergraduate"
                  className="about-photo-img"
                  loading="eager"
                />
              </div>

              {/* Floating Labels & Annotations */}
              <div className="about-scrap-chip about-scrap-chip-tl">
                Richa Sharma
              </div>
              <div className="about-scrap-chip about-scrap-chip-tr">
                CSE &times; AI
              </div>
              <div className="about-scrap-chip about-scrap-chip-br">
                2025&mdash;2029
              </div>

              {/* Floating Status */}
              <div className="about-status-learning">
                <span className="about-learning-dot" aria-hidden="true" />
                <span>currently learning</span>
              </div>

              {/* Decorative Subtle Elements */}
              <span className="about-scrap-sparkle" style={{ top: '-18px', right: '18px' }} aria-hidden="true">&#10022;</span>
              <span className="about-scrap-sparkle" style={{ bottom: '-14px', left: '16px', color: 'var(--accent-sage)' }} aria-hidden="true">&#10022;</span>
              <span className="about-scrap-binary" style={{ top: '22px', left: '-22px' }} aria-hidden="true">01</span>
              <span className="about-scrap-binary" style={{ bottom: '26px', right: '-24px' }} aria-hidden="true">10</span>
            </div>
          </div>
        </section>

        {/* ── 3. "A Little About Me" — Editorial Section ─────────────── */}
        <section className="about-editorial-quote-box" aria-label="Personal Philosophy">
          <div className="about-editorial-label">A LITTLE ABOUT ME</div>
          <h2 className="about-editorial-large-quote">
            &ldquo;I like learning by building.&rdquo;
          </h2>
          <p className="about-editorial-body">
            I'm a Computer Science &amp; Engineering student specializing in Artificial Intelligence. I enjoy exploring software development, web technologies, databases and AI while continuously improving my problem-solving skills through hands-on projects.
          </p>
          <div className="about-editorial-handwriting">
            curious &middot; creative &middot; learning &middot; building
          </div>
        </section>

        {/* ── 4. Personal Identity Cards (Asymmetric Scrapbook) ──────── */}
        <section aria-label="Personal Reflections" style={{ marginBottom: 'var(--space-3xl)' }}>
          <div className="about-scrapbook-grid">
            {/* Card 01 */}
            <div className="about-scrap-card about-scrap-card-1">
              <span className="about-scrap-tag">CARD 01</span>
              <span className="about-scrap-lead">I enjoy</span>
              <p className="about-scrap-content">
                Building things from ideas.
              </p>
            </div>

            {/* Card 02 */}
            <div className="about-scrap-card about-scrap-card-2">
              <span className="about-scrap-tag">CARD 02</span>
              <span className="about-scrap-lead">I learn through</span>
              <p className="about-scrap-content">
                Projects, experiments &amp; problem solving.
              </p>
            </div>

            {/* Card 03 */}
            <div className="about-scrap-card about-scrap-card-3">
              <span className="about-scrap-tag">CARD 03</span>
              <span className="about-scrap-lead">I'm curious about</span>
              <p className="about-scrap-content">
                AI, software &amp; emerging technology.
              </p>
            </div>

            {/* Card 04 */}
            <div className="about-scrap-card about-scrap-card-4">
              <span className="about-scrap-tag">CARD 04</span>
              <span className="about-scrap-lead">Outside code</span>
              <p className="about-scrap-content">
                Singing, writing &amp; exploring places.
              </p>
            </div>
          </div>
        </section>

        {/* ── 5. "What I Like Building" — Vertical Editorial List ─────── */}
        <section className="about-section-container" aria-labelledby="building-heading">
          <div className="about-section-heading-clean" id="building-heading">
            WHAT I LIKE BUILDING
          </div>

          <div className="about-building-list">
            <div className="about-building-item">
              <div className="about-building-left-meta">
                <span className="about-building-index">01</span>
                <span className="about-building-title">AI Applications</span>
              </div>
              <span className="about-building-arrow" aria-hidden="true">&#8599;</span>
            </div>

            <div className="about-building-item">
              <div className="about-building-left-meta">
                <span className="about-building-index">02</span>
                <span className="about-building-title">Web Applications</span>
              </div>
              <span className="about-building-arrow" aria-hidden="true">&#8599;</span>
            </div>

            <div className="about-building-item">
              <div className="about-building-left-meta">
                <span className="about-building-index">03</span>
                <span className="about-building-title">Software Solutions</span>
              </div>
              <span className="about-building-arrow" aria-hidden="true">&#8599;</span>
            </div>

            <div className="about-building-item">
              <div className="about-building-left-meta">
                <span className="about-building-index">04</span>
                <span className="about-building-title">Problem-Solving Projects</span>
              </div>
              <span className="about-building-arrow" aria-hidden="true">&#8599;</span>
            </div>
          </div>
        </section>

        {/* ── 6. My Toolbox — Subtle & Premium ───────────────────────── */}
        <section className="about-toolbox-panel" aria-labelledby="toolbox-heading">
          <div className="about-section-heading-clean" id="toolbox-heading" style={{ marginBottom: 'var(--space-lg)' }}>
            MY TOOLBOX
          </div>

          <div className="about-toolbox-categories">
            {/* PROGRAMMING */}
            <div className="about-toolbox-category-col">
              <div className="about-toolbox-header">PROGRAMMING</div>
              <div className="about-toolbox-tags">
                <span className="about-minimal-pill">Python</span>
                <span className="about-minimal-pill">Java</span>
                <span className="about-minimal-pill">C++</span>
                <span className="about-minimal-pill">SQL</span>
              </div>
            </div>

            {/* WEB */}
            <div className="about-toolbox-category-col">
              <div className="about-toolbox-header">WEB</div>
              <div className="about-toolbox-tags">
                <span className="about-minimal-pill">HTML</span>
                <span className="about-minimal-pill">CSS</span>
                <span className="about-minimal-pill">JavaScript</span>
                <span className="about-minimal-pill">React</span>
              </div>
            </div>

            {/* DATABASES */}
            <div className="about-toolbox-category-col">
              <div className="about-toolbox-header">DATABASES</div>
              <div className="about-toolbox-tags">
                <span className="about-minimal-pill">MySQL</span>
                <span className="about-minimal-pill">MariaDB</span>
              </div>
            </div>

            {/* BACKEND */}
            <div className="about-toolbox-category-col">
              <div className="about-toolbox-header">BACKEND</div>
              <div className="about-toolbox-tags">
                <span className="about-minimal-pill">FastAPI</span>
                <span className="about-minimal-pill">REST APIs</span>
              </div>
            </div>

            {/* AI & CLOUD */}
            <div className="about-toolbox-category-col">
              <div className="about-toolbox-header">AI &amp; CLOUD</div>
              <div className="about-toolbox-tags">
                <span className="about-minimal-pill" style={{ borderColor: 'var(--primary-border)', color: 'var(--primary)' }}>
                  Artificial Intelligence
                </span>
                <span className="about-minimal-pill">Microsoft Azure</span>
              </div>
            </div>

            {/* TOOLS */}
            <div className="about-toolbox-category-col">
              <div className="about-toolbox-header">TOOLS</div>
              <div className="about-toolbox-tags">
                <span className="about-minimal-pill">Git</span>
                <span className="about-minimal-pill">GitHub</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. "Currently Exploring" Horizontal Flow ────────────────── */}
        <section className="about-exploring-banner" aria-label="Currently Exploring">
          <div className="about-exploring-lead">Currently exploring &rarr;</div>
          <div className="about-exploring-chips-wrap">
            <span className="about-exploring-chip">Artificial Intelligence</span>
            <span className="about-chip-connector-dot" aria-hidden="true" />
            <span className="about-exploring-chip">Data Structures &amp; Algorithms</span>
            <span className="about-chip-connector-dot" aria-hidden="true" />
            <span className="about-exploring-chip">React</span>
            <span className="about-chip-connector-dot" aria-hidden="true" />
            <span className="about-exploring-chip">Database Systems</span>
            <span className="about-chip-connector-dot" aria-hidden="true" />
            <span className="about-exploring-chip">Microsoft Azure</span>
            <span className="about-chip-connector-dot" aria-hidden="true" />
            <span className="about-exploring-chip">Software Development</span>
          </div>
        </section>

        {/* ── 8 & 9. Education & Journey Timelines ────────────────────── */}
        <div className="about-dual-timelines" id="my-journey">
          {/* Education Timeline */}
          <section className="about-timeline-card-box" aria-labelledby="edu-heading">
            <div className="about-section-heading-clean" id="edu-heading">
              MY EDUCATION
            </div>

            <div className="about-vertical-track">
              {/* University */}
              <div className="about-track-node">
                <div className="about-track-dot" aria-hidden="true" />
                <div className="about-track-year">2025 &mdash; 2029</div>
                <div className="about-track-title">B.E. Computer Science &amp; Engineering</div>
                <div className="about-track-sub">
                  Chandigarh University<br />
                  Specialization: <strong style={{ color: 'var(--text-main)' }}>Artificial Intelligence</strong>
                </div>
              </div>

              {/* School */}
              <div className="about-track-node">
                <div className="about-track-dot" aria-hidden="true" />
                <div className="about-track-year">2025</div>
                <div className="about-track-title">Senior Secondary Education</div>
                <div className="about-track-sub">Kendriya Vidyalaya Mankhurd</div>
              </div>
            </div>
          </section>

          {/* My Journey So Far */}
          <section className="about-timeline-card-box" aria-labelledby="journey-heading">
            <div className="about-section-heading-clean" id="journey-heading">
              MY JOURNEY SO FAR
            </div>

            <div className="about-vertical-track">
              <div className="about-track-node">
                <div className="about-track-dot" aria-hidden="true" />
                <div className="about-track-year">2025</div>
                <div className="about-track-title">Started my CSE journey</div>
              </div>

              <div className="about-track-node">
                <div className="about-track-dot" aria-hidden="true" />
                <div className="about-track-year">2025+</div>
                <div className="about-track-title">Exploring programming &amp; software</div>
              </div>

              <div className="about-track-node">
                <div className="about-track-dot" aria-hidden="true" />
                <div className="about-track-year">2026</div>
                <div className="about-track-title">Building projects &amp; learning AI</div>
              </div>

              <div className="about-track-node">
                <div className="about-track-dot" aria-hidden="true" />
                <div className="about-track-year">NOW</div>
                <div className="about-track-title" style={{ fontStyle: 'italic', color: 'var(--primary)' }}>
                  Still learning. Still building.
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── 10. Achievement Spotlight ───────────────────────────────── */}
        <section className="about-achievement-spotlight" aria-label="Achievement Spotlight">
          <div className="about-spotlight-watermark" aria-hidden="true">03</div>
          <div className="about-spotlight-header-tag">ONE MOMENT I'M PROUD OF</div>
          
          <div className="about-spotlight-title-row">
            <span>3rd Position &mdash; IKS Ideathon</span>
            <span style={{ color: 'var(--accent-amber)', fontSize: '1.25rem' }} aria-hidden="true">&#10022;</span>
          </div>

          <div className="about-spotlight-institution">
            Chandigarh University
          </div>

          <p className="about-spotlight-caption">
            &ldquo;A reminder that curiosity becomes meaningful when you turn ideas into action.&rdquo;
          </p>
        </section>

        {/* ── 11. Certifications (Learning Milestones) ────────────────── */}
        <section className="about-milestones-section" aria-labelledby="milestones-heading">
          <div className="about-section-heading-clean" id="milestones-heading">
            LEARNING MILESTONES
          </div>

          <div className="about-cert-cards-row">
            <div className="about-cert-card">
              <div className="about-cert-icon-box" aria-hidden="true">
                📜
              </div>
              <div>
                <div className="about-cert-code">AZ-900</div>
                <div className="about-cert-name">Microsoft Azure Fundamentals</div>
              </div>
            </div>

            <div className="about-cert-card">
              <div className="about-cert-icon-box" aria-hidden="true">
                📜
              </div>
              <div>
                <div className="about-cert-code">PYTHON</div>
                <div className="about-cert-name">Python Programming Certificate</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 12. Beyond Code — Organic Editorial Words ───────────────── */}
        <section className="about-beyond-panel" aria-labelledby="beyond-heading">
          <div className="about-section-heading-clean" id="beyond-heading">
            BEYOND CODE
          </div>

          <div className="about-beyond-words-grid">
            <div className="about-beyond-word-item">
              <div className="about-beyond-primary-word">SINGING</div>
              <div className="about-beyond-desc-editorial">Finding rhythm.</div>
            </div>

            <div className="about-beyond-word-item">
              <div className="about-beyond-primary-word">WRITING</div>
              <div className="about-beyond-desc-editorial">Turning thoughts into words.</div>
            </div>

            <div className="about-beyond-word-item">
              <div className="about-beyond-primary-word">TRAVELLING</div>
              <div className="about-beyond-desc-editorial">Discovering new places.</div>
            </div>

            <div className="about-beyond-word-item">
              <div className="about-beyond-primary-word">EXPLORING</div>
              <div className="about-beyond-desc-editorial">Staying curious.</div>
            </div>
          </div>
        </section>

        {/* ── 13. Personal Web Presence ───────────────────────────────── */}
        <section className="about-web-presence-section" id="connect" aria-labelledby="presence-heading">
          <div className="about-section-heading-clean" id="presence-heading">
            FIND ME AROUND THE WEB
          </div>

          <div className="about-web-presence-grid">
            <a
              href="https://github.com/Rich12-max"
              target="_blank"
              rel="noopener noreferrer"
              className="about-web-presence-card"
              id="presence-github"
            >
              <div className="about-web-left">
                <div className="about-web-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div className="about-web-label">GitHub &#8599;</div>
                  <div className="about-web-handle">Rich12-max</div>
                </div>
              </div>
              <span style={{ color: 'var(--text-light)', fontSize: '1.1rem' }} aria-hidden="true">&rarr;</span>
            </a>

            <a
              href="https://www.linkedin.com/in/richa-sharma-b55244382/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-web-presence-card"
              id="presence-linkedin"
            >
              <div className="about-web-left">
                <div className="about-web-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </div>
                <div>
                  <div className="about-web-label">LinkedIn &#8599;</div>
                  <div className="about-web-handle">Richa Sharma</div>
                </div>
              </div>
              <span style={{ color: 'var(--text-light)', fontSize: '1.1rem' }} aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </section>

        {/* ── 14. Beautiful Ending Statement ──────────────────────────── */}
        <section className="about-ending-artistic-box" aria-label="Closing Note">
          <div className="about-ending-three-lines">
            Still learning.<br />
            Still building.<br />
            Still curious.
          </div>

          <p className="about-ending-substatement">
            Let's build something interesting.
          </p>

          <a
            href="https://www.linkedin.com/in/richa-sharma-b55244382/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-lg"
            id="btn-say-hello"
          >
            Say Hello &#8599;
          </a>
        </section>
      </div>
    </div>
  );
}
