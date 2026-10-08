import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';

export default function Assignment1Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const pdfUrl = '/assignments/coa-assignment-1.pdf';

  // Questions mapped to their actual page locations in the 4-page PDF
  const questions = [
    { num: '01', page: 1 },
    { num: '02', page: 1 },
    { num: '03', page: 2 },
    { num: '04', page: 2 },
    { num: '05', page: 2 },
    { num: '06', page: 2 },
    { num: '07', page: 3 },
    { num: '08', page: 3 },
    { num: '09', page: 3 },
    { num: '10', page: 3 },
    { num: '11', page: 3 },
    { num: '12', page: 4 },
  ];

  const handleSelectQuestion = (q) => {
    setActiveQuestion(q.num);
    setCurrentPage(q.page);
  };

  const handleSelectPage = (pageNum) => {
    setCurrentPage(pageNum);
    // Find first question on this page if active question is on another page
    const firstQ = questions.find((q) => q.page === pageNum);
    if (firstQ && (!activeQuestion || questions.find((q) => q.num === activeQuestion)?.page !== pageNum)) {
      setActiveQuestion(firstQ.num);
    }
  };

  return (
    <div className="section" style={{ paddingTop: 'calc(var(--header-height) + 1.5rem)', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container" style={{ maxWidth: '1120px' }}>
        <Breadcrumb items={[{ label: 'COA Learning Hub', to: '/coa' }, { label: 'Assignment 01', to: '/assignment-1' }]} />

        {/* ── 1 & 2. HERO & INTRODUCTION ── */}
        <header style={{ marginBottom: 'var(--space-2xl)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--primary)',
                backgroundColor: 'var(--primary-light)',
                border: '1px solid var(--primary-border)',
                padding: '0.2rem 0.65rem',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              ACADEMIC WORK &bull; 01
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text-light)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              ASSIGNMENT 01
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.85rem)',
              fontWeight: 800,
              color: 'var(--text-main)',
              letterSpacing: '-0.025em',
              lineHeight: 1.15,
              margin: '0.25rem 0 0.5rem 0'
            }}
          >
            Computer Organisation &amp; Architecture
          </h1>

          <div
            style={{
              fontSize: '1.15rem',
              fontWeight: 600,
              color: 'var(--primary)',
              fontFamily: 'var(--font-sans)',
              marginBottom: '0.75rem'
            }}
          >
            Assignment &mdash; 12 Questions
          </div>

          <p
            style={{
              fontSize: '0.975rem',
              color: 'var(--text-muted)',
              maxWidth: '720px',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}
          >
            A collection of my coursework responses exploring computer architecture, processors, AI, programming, and computing concepts.
          </p>

          {/* Metadata banner */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.25rem 2rem',
              padding: '1rem 1.25rem',
              backgroundColor: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.8125rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)'
            }}
          >
            <div>
              <span style={{ color: 'var(--text-light)', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block' }}>Submitted by</span>
              <strong style={{ color: 'var(--text-main)' }}>Richa Sharma</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-light)', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block' }}>UID</span>
              <strong style={{ color: 'var(--text-main)' }}>25BAI10049</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-light)', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block' }}>Section</span>
              <strong style={{ color: 'var(--text-main)' }}>25BAI-601</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-light)', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block' }}>Submitted to</span>
              <strong style={{ color: 'var(--text-main)' }}>Dr. Ruchika Gupta</strong>
            </div>
            <div>
              <span style={{ color: 'var(--text-light)', textTransform: 'uppercase', fontSize: '0.7rem', display: 'block' }}>Submission Date</span>
              <strong style={{ color: 'var(--text-main)' }}>06 Aug, 2026</strong>
            </div>
          </div>
        </header>

        {/* ── 5. COMPACT ASSIGNMENT DETAILS CARD & ACTION CONTROLS ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            alignItems: 'stretch',
            marginBottom: '1.75rem'
          }}
        >
          {/* Assignment Details Panel */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.35rem 1.5rem',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: '0.65rem'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--primary)'
                }}
              >
                ASSIGNMENT DETAILS
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--text-light)'
                }}
              >
                Official PDF Coursework
              </span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.85rem 1.25rem',
                fontSize: '0.85rem'
              }}
            >
              <div>
                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Subject</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Computer Organisation &amp; Architecture</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Questions</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>12</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Pages</span>
                <span style={{ fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>4</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Student</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Richa Sharma</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>UID</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>25BAI10049</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Section</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>25BAI-601</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Faculty</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Dr. Ruchika Gupta</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-light)', fontSize: '0.75rem', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Submitted</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>06 Aug, 2026</span>
              </div>
            </div>
          </div>

          {/* Action & Download Box */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.35rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-xs)'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-light)',
                  display: 'block',
                  marginBottom: '0.4rem'
                }}
              >
                DOCUMENT ACCESS
              </span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                Original Submitted Document
              </h3>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.55, margin: 0 }}>
                View or download the exact, unaltered 4-page academic submission PDF exactly as submitted.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{
                  flex: '1 1 180px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none'
                }}
              >
                <span>VIEW FULL ASSIGNMENT</span>
                <span aria-hidden="true">&nearr;</span>
              </a>

              <a
                href={pdfUrl}
                download="Richa_Sharma_25BAI10049_COA_Assignment_1.pdf"
                className="btn btn-outline"
                style={{
                  flex: '1 1 150px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.25rem',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none'
                }}
              >
                <span>DOWNLOAD PDF</span>
                <span aria-hidden="true">&darr;</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── 6. QUESTION NAVIGATION STRIP ── */}
        <section
          style={{
            marginBottom: '1.5rem',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1rem 1.25rem',
            boxShadow: 'var(--shadow-xs)'
          }}
          aria-label="Question Navigation"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--text-light)'
              }}
            >
              QUESTION DIRECTORY (12 QUESTIONS) &bull; CLICK TO JUMP TO PAGE
            </span>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-light)' }}>
              Source of truth: Original PDF
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
              gap: '0.5rem'
            }}
          >
            {questions.map((q) => {
              const isSelected = activeQuestion === q.num || (!activeQuestion && currentPage === q.page);
              return (
                <button
                  key={q.num}
                  type="button"
                  onClick={() => handleSelectQuestion(q)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.45rem 0.35rem',
                    borderRadius: 'var(--radius-sm)',
                    border: isSelected ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-subtle)',
                    color: isSelected ? 'var(--primary)' : 'var(--text-main)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  title={`Question ${q.num} (Page ${q.page})`}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem' }}>
                    {q.num}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: isSelected ? 'var(--primary)' : 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                    P.{q.page}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── 3 & 4. BEAUTIFUL PDF VIEWER CONTAINER ── */}
        <section
          style={{
            backgroundColor: 'var(--bg-body)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden',
            marginBottom: 'var(--space-2xl)'
          }}
          aria-label="Assignment Document Viewer"
        >
          {/* Viewer Toolbar Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.25rem',
              backgroundColor: 'var(--bg-surface)',
              borderBottom: '1px solid var(--border-color)',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            {/* Page Jump Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--text-light)',
                  marginRight: '0.5rem'
                }}
              >
                PAGES:
              </span>
              {[1, 2, 3, 4].map((pNum) => (
                <button
                  key={pNum}
                  type="button"
                  onClick={() => handleSelectPage(pNum)}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    fontWeight: currentPage === pNum ? 700 : 500,
                    padding: '0.35rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    border: currentPage === pNum ? '1.5px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: currentPage === pNum ? 'var(--primary-light)' : 'var(--bg-subtle)',
                    color: currentPage === pNum ? 'var(--primary)' : 'var(--text-main)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  Page {pNum} / 4
                </button>
              ))}
            </div>

            {/* Quick Next / Prev & External Viewer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleSelectPage(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-main)',
                  cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage <= 1 ? 0.45 : 1
                }}
              >
                &larr; Prev
              </button>

              <button
                type="button"
                onClick={() => handleSelectPage(Math.min(4, currentPage + 1))}
                disabled={currentPage >= 4}
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-main)',
                  cursor: currentPage >= 4 ? 'not-allowed' : 'pointer',
                  opacity: currentPage >= 4 ? 0.45 : 1
                }}
              >
                Next &rarr;
              </button>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.35rem 0.65rem',
                  fontSize: '0.8125rem',
                  fontFamily: 'var(--font-mono)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-main)',
                  textDecoration: 'none'
                }}
                title="Open in new browser tab"
              >
                Fullscreen &nearr;
              </a>
            </div>
          </div>

          {/* Native Browser PDF Viewer Container */}
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--bg-body)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '100%',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                border: '1px solid var(--border-color)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              <object
                key={`pdf-page-${currentPage}`}
                data={`${pdfUrl}#page=${currentPage}&view=FitH&toolbar=1`}
                type="application/pdf"
                width="100%"
                style={{
                  width: '100%',
                  height: '920px',
                  display: 'block',
                  border: 'none'
                }}
                title="Computer Organisation & Architecture Assignment 01 - Richa Sharma"
              >
                <iframe
                  src={`${pdfUrl}#page=${currentPage}&view=FitH&toolbar=1`}
                  width="100%"
                  height="920px"
                  style={{ width: '100%', height: '920px', border: 'none', display: 'block' }}
                  title="Computer Organisation & Architecture Assignment 01 - Richa Sharma"
                >
                  <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Inline PDF preview is not supported directly by your browser.
                    </p>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ textDecoration: 'none' }}
                    >
                      Open Assignment PDF &nearr;
                    </a>
                  </div>
                </iframe>
              </object>
            </div>
          </div>
        </section>

        {/* ── 9. MINIMAL FOOTER ── */}
        <footer
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.875rem'
          }}
        >
          <div style={{ color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
            Computer Organisation &amp; Architecture &bull; Assignment 01
          </div>

          <Link
            to="/coa"
            className="btn btn-outline"
            style={{
              padding: '0.5rem 1.15rem',
              fontSize: '0.8125rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>Back to COA Learning Hub</span>
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </footer>
      </div>
    </div>
  );
}
