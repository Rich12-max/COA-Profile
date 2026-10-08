import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

export default function Assignment1Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTopic, setActiveTopic] = useState(null);

  const pdfUrl = '/assignments/coa-assignment-1.pdf';

  // The 12 topics exactly corresponding to the 12 questions across the 4 pages of the original PDF
  const topics = [
    { num: '01', name: 'Raspberry Pi', page: 1 },
    { num: '02', name: 'AI Summit', page: 1 },
    { num: '03', name: 'Programming Languages', page: 2 },
    { num: '04', name: 'NPTEL', page: 2 },
    { num: '05', name: 'RAM & Word Size', page: 2 },
    { num: '06', name: 'Stampeding Herd', page: 2 },
    { num: '07', name: 'Turing Award', page: 3 },
    { num: '08', name: 'Intel & AMD', page: 3 },
    { num: '09', name: 'CPU / GPU / TPU', page: 3 },
    { num: '10', name: 'The Imitation Game', page: 3 },
    { num: '11', name: 'Yotta', page: 3 },
    { num: '12', name: 'GPU vs CPU', page: 4 },
  ];

  const handleSelectTopic = (t) => {
    setActiveTopic(t.num);
    setCurrentPage(t.page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 4) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="assignment-editorial-page">
      <style>{`
        /* ==========================================================================
           ASSIGNMENT 01 EDITORIAL SHOWCASE
           Minimal editorial portfolio × academic journal × soft technology
           ========================================================================== */

        .assignment-editorial-page {
          background-color: var(--bg-body, #faf8f5);
          color: var(--text-main, #1e293b);
          min-height: 100vh;
          padding-top: calc(var(--header-height, 72px) + 2rem);
          padding-bottom: 5rem;
          position: relative;
        }

        /* Subtle stationery grain texture overlay */
        .assignment-editorial-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(var(--border-color, #e5e0d8) 0.75px, transparent 0.75px);
          background-size: 24px 24px;
          opacity: 0.35;
          pointer-events: none;
          z-index: 0;
        }

        .assignment-editorial-inner {
          position: relative;
          z-index: 1;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }

        /* ── 2 & 3. Header & Paper Label ─────────────────────────────────── */
        .assignment-header {
          padding-bottom: 2.25rem;
          margin-bottom: 2.25rem;
          border-bottom: 1px solid var(--border-color, #e5e0d8);
          animation: assignmentFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .assignment-kicker-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .assignment-kicker-tag {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-light, #78716c);
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .assignment-kicker-tag::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary, #2563eb);
        }

        /* Floating tiny paper label */
        .assignment-paper-label {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--primary, #2563eb);
          background: var(--primary-light, #eff6ff);
          border: 1px solid var(--primary-border, #bfdbfe);
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          display: inline-block;
        }

        .assignment-title-wrap {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 0.75rem;
        }

        .assignment-main-heading {
          font-family: var(--font-serif, 'Newsreader', Georgia, serif);
          font-size: clamp(2.35rem, 5vw, 3.5rem);
          font-weight: 600;
          color: var(--text-main, #1e293b);
          letter-spacing: -0.025em;
          line-height: 1.08;
          margin: 0;
        }

        .assignment-subheading {
          font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
          font-size: clamp(1.15rem, 2.2vw, 1.45rem);
          font-weight: 500;
          color: var(--text-muted, #57534e);
          margin-top: 0.4rem;
          letter-spacing: -0.01em;
        }

        .assignment-header-aside {
          text-align: right;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.8125rem;
          line-height: 1.5;
        }

        .assignment-author-name {
          font-weight: 700;
          color: var(--text-main, #1e293b);
          font-size: 0.9375rem;
        }

        .assignment-author-id {
          color: var(--primary, #2563eb);
          font-weight: 600;
        }

        .assignment-quick-meta {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.78125rem;
          color: var(--text-light, #78716c);
          letter-spacing: 0.04em;
          margin-top: 0.75rem;
        }

        /* ── 4. Assignment Identity Row ──────────────────────────────────── */
        .assignment-identity-panel {
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e5e0d8);
          border-radius: var(--radius-md, 10px);
          padding: 1rem 1.35rem;
          margin-bottom: 1rem;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 1rem 1.5rem;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);
          animation: assignmentFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.08s;
        }

        .assignment-identity-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .assignment-identity-label {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.65625rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-light, #78716c);
        }

        .assignment-identity-val {
          font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main, #1e293b);
        }

        /* ── 5. Intro Line ───────────────────────────────────────────────── */
        .assignment-intro-line {
          font-family: var(--font-serif, 'Newsreader', Georgia, serif);
          font-style: italic;
          font-size: 1.05rem;
          color: var(--text-muted, #57534e);
          margin-bottom: 2.5rem;
          padding-left: 0.25rem;
          animation: assignmentFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.14s;
        }

        /* ── 6 & 7. Document Stage & Paper Stack Effect ──────────────────── */
        .assignment-stage {
          position: relative;
          margin: 0 auto 2.5rem auto;
          animation: assignmentFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 0.2s;
        }

        /* Floating decorative notes around the stage */
        .assignment-stage-decor {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 0.5rem;
          margin-bottom: 0.65rem;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.6875rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-light, #78716c);
          opacity: 0.75;
        }

        .assignment-decor-right {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* Multi-layered paper stack wrapper */
        .assignment-paper-stack {
          position: relative;
          background: #ffffff;
          border: 1px solid var(--border-color, #e5e0d8);
          border-radius: 12px;
          box-shadow:
            0 1px 3px rgba(15, 23, 42, 0.04),
            0 14px 28px -4px rgba(15, 23, 42, 0.07),
            0 4px 8px -2px rgba(15, 23, 42, 0.03);
          transition: box-shadow 0.3s ease;
        }

        /* Subtle physical offset paper layer 1 */
        .assignment-paper-stack::before {
          content: '';
          position: absolute;
          top: 6px;
          left: 6px;
          right: -6px;
          bottom: -6px;
          background: #fbf9f4;
          border: 1px solid var(--border-color, #e5e0d8);
          border-radius: 12px;
          z-index: -1;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.025);
        }

        /* Subtle physical offset paper layer 2 */
        .assignment-paper-stack::after {
          content: '';
          position: absolute;
          top: 12px;
          left: 12px;
          right: -12px;
          bottom: -12px;
          background: #f6f3eb;
          border: 1px solid var(--border-color, #e5e0d8);
          border-radius: 12px;
          z-index: -2;
          box-shadow: 0 8px 16px rgba(15, 23, 42, 0.02);
        }

        /* ── 12 & 13. Page Indicator & Progress Line ─────────────────────── */
        .assignment-progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.85rem 1.25rem;
          background: #ffffff;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          border-bottom: 1px solid var(--border-color, #e5e0d8);
        }

        .assignment-page-tag {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--primary, #2563eb);
          display: inline-flex;
          align-items: baseline;
          gap: 0.25rem;
        }

        .assignment-page-fraction {
          color: var(--text-light, #78716c);
          font-weight: 500;
          font-size: 0.75rem;
        }

        .assignment-doc-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-sage, #10b981);
          background: var(--accent-sage-light, #ecfdf5);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
        }

        /* Progress track line */
        .assignment-progress-track {
          width: 100%;
          height: 2px;
          background: var(--border-color, #e5e0d8);
          position: relative;
          overflow: hidden;
        }

        .assignment-progress-bar {
          height: 100%;
          background: var(--primary, #2563eb);
          transition: width 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* ── The PDF Viewer Object / IFrame ──────────────────────────────── */
        .assignment-pdf-frame-wrapper {
          background: #ffffff;
          overflow: hidden;
          position: relative;
        }

        .assignment-pdf-frame {
          width: 100%;
          height: 940px;
          display: block;
          border: none;
        }

        /* ── 9. Floating Minimal Controls Toolbar ────────────────────────── */
        .assignment-controls-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 0.85rem 1.25rem;
          background: #ffffff;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          border-top: 1px solid var(--border-color, #e5e0d8);
        }

        .assignment-nav-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .assignment-ctrl-btn {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.78125rem;
          font-weight: 600;
          padding: 0.4rem 0.85rem;
          border-radius: 6px;
          border: 1px solid var(--border-color, #e5e0d8);
          background: var(--bg-subtle, #f5f2eb);
          color: var(--text-main, #1e293b);
          cursor: pointer;
          transition: all 0.18s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          text-decoration: none;
        }

        .assignment-ctrl-btn:hover:not(:disabled) {
          background: var(--primary-light, #eff6ff);
          border-color: var(--primary-border, #bfdbfe);
          color: var(--primary, #2563eb);
          transform: translateY(-2px);
        }

        .assignment-ctrl-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }

        .assignment-page-counter {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.8125rem;
          font-weight: 700;
          color: var(--text-main, #1e293b);
          padding: 0 0.5rem;
        }

        .assignment-action-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .assignment-action-primary {
          background: var(--primary, #2563eb);
          color: #ffffff;
          border-color: var(--primary, #2563eb);
        }

        .assignment-action-primary:hover {
          background: var(--primary-hover, #1d4ed8);
          color: #ffffff;
          border-color: var(--primary-hover, #1d4ed8);
        }

        /* ── 8. Bottom Decorative Stage Notes ────────────────────────────── */
        .assignment-stage-decor-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 0.5rem 0 0.5rem;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.6875rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-light, #78716c);
          opacity: 0.7;
        }

        /* ── 10 & 11. “Inside This Assignment” Topic Index ───────────────── */
        .assignment-topics-section {
          margin-top: 3.5rem;
          padding-top: 2.5rem;
          border-top: 1px solid var(--border-color, #e5e0d8);
        }

        .assignment-topics-head {
          margin-bottom: 1.5rem;
        }

        .assignment-topics-kicker {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.6875rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--primary, #2563eb);
          display: block;
          margin-bottom: 0.25rem;
        }

        .assignment-topics-title {
          font-family: var(--font-serif, 'Newsreader', Georgia, serif);
          font-size: 1.75rem;
          font-weight: 600;
          color: var(--text-main, #1e293b);
          margin: 0 0 0.35rem 0;
        }

        .assignment-topics-sub {
          font-size: 0.875rem;
          color: var(--text-muted, #57534e);
          margin: 0;
        }

        .assignment-topics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 0.65rem;
        }

        .assignment-topic-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          background: var(--bg-surface, #ffffff);
          border: 1px solid var(--border-color, #e5e0d8);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          width: 100%;
        }

        .assignment-topic-card:hover {
          background: var(--primary-light, #eff6ff);
          border-color: var(--primary-border, #bfdbfe);
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.05);
        }

        .assignment-topic-card.active {
          border-color: var(--primary, #2563eb);
          background: var(--primary-light, #eff6ff);
        }

        .assignment-topic-left {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
        }

        .assignment-topic-num {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.78125rem;
          font-weight: 700;
          color: var(--text-light, #78716c);
          transition: color 0.2s ease;
        }

        .assignment-topic-card:hover .assignment-topic-num,
        .assignment-topic-card.active .assignment-topic-num {
          color: var(--primary, #2563eb);
        }

        .assignment-topic-name {
          font-family: var(--font-sans, 'Plus Jakarta Sans', sans-serif);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main, #1e293b);
        }

        .assignment-topic-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-light, #78716c);
          font-size: 0.75rem;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
        }

        .assignment-topic-arrow {
          display: inline-block;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .assignment-topic-card:hover .assignment-topic-arrow {
          transform: translateX(3px);
          color: var(--primary, #2563eb);
        }

        /* ── 14. Minimal Closing Section ─────────────────────────────────── */
        .assignment-closing {
          margin-top: 5rem;
          padding-top: 3rem;
          border-top: 1px solid var(--border-color, #e5e0d8);
          text-align: center;
        }

        .assignment-closing-quote {
          font-family: var(--font-serif, 'Newsreader', Georgia, serif);
          font-style: italic;
          font-size: 1.35rem;
          color: var(--text-main, #1e293b);
          margin-bottom: 0.4rem;
        }

        .assignment-closing-meta {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.78125rem;
          color: var(--text-light, #78716c);
          letter-spacing: 0.08em;
          margin-bottom: 1.75rem;
        }

        .assignment-back-hub-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.45rem;
          border-radius: 8px;
          border: 1px solid var(--border-color, #e5e0d8);
          background: var(--bg-surface, #ffffff);
          color: var(--text-main, #1e293b);
          font-size: 0.84375rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .assignment-back-hub-btn:hover {
          border-color: var(--primary, #2563eb);
          color: var(--primary, #2563eb);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
        }

        /* Animations */
        @keyframes assignmentFadeUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .assignment-header,
          .assignment-identity-panel,
          .assignment-intro-line,
          .assignment-stage {
            animation: none !important;
          }
          .assignment-ctrl-btn:hover,
          .assignment-topic-card:hover,
          .assignment-back-hub-btn:hover {
            transform: none !important;
          }
        }

        @media (max-width: 768px) {
          .assignment-pdf-frame {
            height: 650px;
          }
          .assignment-title-wrap {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .assignment-header-aside {
            text-align: left;
          }
          .assignment-stage-decor,
          .assignment-stage-decor-bottom {
            display: none;
          }
          .assignment-controls-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .assignment-nav-group,
          .assignment-action-group {
            justify-content: center;
          }
          .assignment-action-primary,
          .assignment-action-group a {
            flex: 1 1 auto;
            text-align: center;
            justify-content: center;
          }
        }
      `}</style>

      <div className="assignment-editorial-inner">
        <Breadcrumb items={[{ label: 'COA Learning Hub', to: '/coa' }, { label: 'Assignment 01', to: '/assignment-1' }]} />

        {/* ── 2 & 3. EDITORIAL HEADER & PAPER LABEL ── */}
        <header className="assignment-header">
          <div className="assignment-kicker-row">
            <span className="assignment-kicker-tag">ACADEMIC WORK &bull; 01</span>
            <div className="assignment-paper-label">
              COURSEWORK / 01
            </div>
          </div>

          <div className="assignment-title-wrap">
            <div>
              <h1 className="assignment-main-heading">Assignment 01</h1>
              <div className="assignment-subheading">Computer Organisation &amp; Architecture</div>
              <div className="assignment-quick-meta">12 Questions &bull; 4 Pages &bull; 06 August 2026</div>
            </div>

            <div className="assignment-header-aside">
              <div className="assignment-author-name">Richa Sharma</div>
              <div className="assignment-author-id">25BAI10049</div>
            </div>
          </div>
        </header>

        {/* ── 4. ASSIGNMENT IDENTITY SECTION ── */}
        <section className="assignment-identity-panel" aria-label="Assignment Submission Identity">
          <div className="assignment-identity-item">
            <span className="assignment-identity-label">SUBMITTED BY</span>
            <span className="assignment-identity-val">Richa Sharma</span>
          </div>

          <div className="assignment-identity-item">
            <span className="assignment-identity-label">UID</span>
            <span className="assignment-identity-val" style={{ fontFamily: 'var(--font-mono)' }}>25BAI10049</span>
          </div>

          <div className="assignment-identity-item">
            <span className="assignment-identity-label">SECTION</span>
            <span className="assignment-identity-val" style={{ fontFamily: 'var(--font-mono)' }}>25BAI-601</span>
          </div>

          <div className="assignment-identity-item">
            <span className="assignment-identity-label">SUBMITTED TO</span>
            <span className="assignment-identity-val">Dr. Ruchika Gupta</span>
          </div>

          <div className="assignment-identity-item">
            <span className="assignment-identity-label">DATE</span>
            <span className="assignment-identity-val" style={{ fontFamily: 'var(--font-mono)' }}>06 AUG 2026</span>
          </div>
        </section>

        {/* ── 5. BEAUTIFUL INTRO LINE ── */}
        <p className="assignment-intro-line">
          A collection of my Computer Organisation &amp; Architecture coursework.
        </p>

        {/* ── 6 & 7. HERO PDF STAGE WITH PAPER STACK EFFECT ── */}
        <section className="assignment-stage" aria-label="Assignment Original PDF Document Stage">
          {/* 8. Floating top decorative editorial details */}
          <div className="assignment-stage-decor">
            <span>COA / 01 &bull; 2026</span>
            <span className="assignment-decor-right">
              <span>COMPUTER ORGANISATION</span>
              <span>&bull;</span>
              <span>R.S.</span>
            </span>
          </div>

          {/* Layered Paper Stack Container */}
          <div className="assignment-paper-stack">
            {/* 12 & 13. Page Indicator & Original Document Label */}
            <div className="assignment-progress-header">
              <div className="assignment-page-tag">
                <span>PAGE 0{currentPage}</span>
                <span className="assignment-page-fraction">/ 04</span>
              </div>

              <div className="assignment-doc-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>ORIGINAL SUBMISSION</span>
              </div>
            </div>

            {/* Thin progress line */}
            <div className="assignment-progress-track">
              <div
                className="assignment-progress-bar"
                style={{ width: `${(currentPage / 4) * 100}%` }}
              />
            </div>

            {/* Native Browser PDF Stage */}
            <div className="assignment-pdf-frame-wrapper">
              <object
                key={`pdf-stage-${currentPage}`}
                data={`${pdfUrl}#page=${currentPage}&view=FitH&toolbar=1`}
                type="application/pdf"
                className="assignment-pdf-frame"
                title="Computer Organisation & Architecture Assignment 01 - Richa Sharma"
              >
                <iframe
                  src={`${pdfUrl}#page=${currentPage}&view=FitH&toolbar=1`}
                  className="assignment-pdf-frame"
                  title="Computer Organisation & Architecture Assignment 01 - Richa Sharma"
                >
                  <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                      Inline PDF display is not directly supported by your browser viewer.
                    </p>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="assignment-ctrl-btn assignment-action-primary"
                    >
                      Open Assignment in New Tab &nearr;
                    </a>
                  </div>
                </iframe>
              </object>
            </div>

            {/* 9. Minimal Floating Controls Toolbar */}
            <div className="assignment-controls-bar">
              {/* Previous / Page / Next */}
              <div className="assignment-nav-group">
                <button
                  type="button"
                  onClick={handlePrevPage}
                  disabled={currentPage <= 1}
                  className="assignment-ctrl-btn"
                  aria-label="Previous Page"
                >
                  <span aria-hidden="true">&larr;</span>
                  <span>Previous</span>
                </button>

                <div className="assignment-page-counter" aria-live="polite">
                  0{currentPage} / 04
                </div>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={currentPage >= 4}
                  className="assignment-ctrl-btn"
                  aria-label="Next Page"
                >
                  <span>Next</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>
              </div>

              {/* Fullscreen & Download */}
              <div className="assignment-action-group">
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="assignment-ctrl-btn"
                  title="Open original PDF in a new browser tab"
                >
                  <span>Open Fullscreen</span>
                  <span aria-hidden="true">&nearr;</span>
                </a>

                <a
                  href={pdfUrl}
                  download="Richa_Sharma_25BAI10049_COA_Assignment_1.pdf"
                  className="assignment-ctrl-btn assignment-action-primary"
                  title="Download the unmodified original assignment PDF"
                >
                  <span>Download PDF</span>
                  <span aria-hidden="true">&darr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* 8. Floating bottom decorative editorial details */}
          <div className="assignment-stage-decor-bottom">
            <span>12 QUESTIONS</span>
            <span>ARCHITECTURE COURSEWORK</span>
          </div>
        </section>

        {/* ── 10 & 11. “INSIDE THIS ASSIGNMENT” TOPIC INDEX ── */}
        <section className="assignment-topics-section" aria-labelledby="topics-heading">
          <div className="assignment-topics-head">
            <span className="assignment-topics-kicker">DOCUMENT DIRECTORY</span>
            <h2 id="topics-heading" className="assignment-topics-title">Inside This Assignment</h2>
            <p className="assignment-topics-sub">
              A curated index of the 12 questions explored in the submission. Click any topic to navigate to its page.
            </p>
          </div>

          <div className="assignment-topics-grid">
            {topics.map((t) => {
              const isActive = activeTopic === t.num || (currentPage === t.page && !activeTopic);
              return (
                <button
                  key={t.num}
                  type="button"
                  onClick={() => handleSelectTopic(t)}
                  className={`assignment-topic-card ${isActive ? 'active' : ''}`}
                  title={`View ${t.name} on Page ${t.page}`}
                >
                  <div className="assignment-topic-left">
                    <span className="assignment-topic-num">{t.num}</span>
                    <span className="assignment-topic-name">{t.name}</span>
                  </div>
                  <div className="assignment-topic-right">
                    <span>P. 0{t.page}</span>
                    <span className="assignment-topic-arrow" aria-hidden="true">&rarr;</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 14. MINIMAL CLOSING SECTION ── */}
        <section className="assignment-closing">
          <p className="assignment-closing-quote">Coursework, presented simply.</p>
          <div className="assignment-closing-meta">
            Computer Organisation &amp; Architecture &bull; Assignment 01
          </div>
          <Link to="/coa" className="assignment-back-hub-btn">
            <span>Back to COA Learning Hub</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </section>
      </div>
    </div>
  );
}
