import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';
import CpuIllustration from '../components/CpuIllustration';


export default function HomePage() {
  const [backendStatus, setBackendStatus] = useState('checking');

  useEffect(() => {
    apiService
      .checkHealth()
      .then((res) => {
        if (res.status === 'ok') {
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
        }
      })
      .catch(() => setBackendStatus('offline'));
  }, []);


  return (
    <div className="landing-page-wrapper">

      {/* =========================================================================
          HERO LANDING SECTION (First Screen Experience)
          Soft academia + modern technology + minimalism + subtle dreamy visuals
          ========================================================================= */}
      <section className="landing-hero" aria-labelledby="landing-hero-heading">
        {/* Soft dreamy ambient background gradients */}
        <div className="landing-ambient-bg" aria-hidden="true">
          <div className="ambient-orb orb-lavender-hero"></div>
          <div className="ambient-orb orb-sage-hero"></div>
          <div className="ambient-orb orb-blush-hero"></div>
          <div className="ambient-grid-overlay"></div>
        </div>

        {/* Sparse ambient decorative glyphs in background */}
        <div className="ambient-glyphs" aria-hidden="true">
          <span className="glyph-bit glyph-1">01</span>
          <span className="glyph-bit glyph-2">10</span>
          <span className="glyph-star glyph-3">✦</span>
          <span className="glyph-dot glyph-4">•</span>
          <span className="glyph-bit glyph-5">101</span>
          <span className="glyph-star glyph-6">✦</span>
        </div>

        <div className="container landing-hero-container">
          {/* Left Column: Editorial Hero Content */}
          <div className="hero-text-col">
            {/* Soft Badge */}
            <div className="hero-soft-badge anim-fade-in">
              <span className="badge-sparkle">✦</span>
              <span className="badge-label">Computer Organization &amp; Architecture</span>
              {backendStatus === 'connected' && (
                <span className="badge-status-dot connected" title="FastAPI Engine Online"></span>
              )}
            </div>

            {/* Main Editorial Heading */}
            <h1 id="landing-hero-heading" className="hero-title-editorial anim-slide-up">
              Learn. Explore. <br />
              <span className="hero-title-accent">Understand.</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="hero-description-soft anim-fade-in-delayed">
              An interactive space to explore Computer Organization &amp; Architecture
              through visual tools, experiments, assignments, and projects.
            </p>

            {/* Hero Action Buttons */}
            <div className="hero-actions-soft anim-fade-in-buttons">
              <Link to="/coa-learning" className="btn-hero-primary" id="btn-explore-coa">
                <span>Explore COA</span>
                <svg
                  className="btn-arrow-icon"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </Link>

              <Link to="/github" className="btn-hero-secondary" id="btn-view-projects">
                <span>View Projects</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Abstract CPU & Circuit Universe Visual */}
          <div className="hero-visual-col anim-fade-in-visual">
            <CpuIllustration />
          </div>
        </div>

      </section>
    </div>
  );
}
