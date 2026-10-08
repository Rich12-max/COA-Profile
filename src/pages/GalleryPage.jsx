import React, { useEffect, useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import LightboxModal from '../components/LightboxModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import apiService from '../services/api';

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    apiService
      .getAchievements(filter)
      .then((data) => {
        setItems(data || []);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load credentials from repository.');
      })
      .finally(() => setLoading(false));
  }, [filter]);

  // All 5 authentic credentials for the spotlight carousel and stats
  const [allCredentials, setAllCredentials] = useState([]);
  useEffect(() => {
    apiService.getAchievements('all').then((data) => {
      setAllCredentials(data || []);
    });
  }, []);

  const activeSpotlight = allCredentials[spotlightIndex] || items[0] || null;

  const handlePrevSpotlight = () => {
    if (allCredentials.length === 0) return;
    setSpotlightIndex((prev) => (prev === 0 ? allCredentials.length - 1 : prev - 1));
  };

  const handleNextSpotlight = () => {
    if (allCredentials.length === 0) return;
    setSpotlightIndex((prev) => (prev === allCredentials.length - 1 ? 0 : prev + 1));
  };

  const handleSelectSpotlightById = (id) => {
    const idx = allCredentials.findIndex((c) => c.id === id);
    if (idx !== -1) {
      setSpotlightIndex(idx);
      // Smooth scroll up to stage if clicked from wall
      const stageEl = document.getElementById('curator-spotlight-stage');
      if (stageEl) {
        stageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const filterTabs = [
    { id: 'all', label: 'All Exhibits', count: allCredentials.length || 5 },
    { id: 'certificates', label: 'Industry Certifications', count: allCredentials.filter(c => c.category === 'certificates').length || 1 },
    { id: 'competitions', label: 'Competitions & Podium', count: allCredentials.filter(c => c.category === 'competitions').length || 1 },
    { id: 'hackathons', label: 'Hackathons & Summits', count: allCredentials.filter(c => c.category === 'hackathons').length || 2 },
    { id: 'academic', label: 'Academic Credits', count: allCredentials.filter(c => c.category === 'academic').length || 1 },
  ];

  return (
    <div className="section" style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-3xl)' }}>
      <div className="container">
        <Breadcrumb items={[{ label: 'Credentials & Archival Exhibition', to: '/gallery' }]} />

        {/* Curator Intro / Editorial Header */}
        <div className="gallery-provenance-header">
          <div className="gallery-curator-pill">
            <span className="pulse-dot" aria-hidden="true"></span>
            <span>Archival Repository &bull; Verified Proof of Work</span>
          </div>
          <h1 className="gallery-main-title">
            Curated Credentials &amp; Honors
          </h1>
          <p className="gallery-main-lead">
            An authentic exhibition of verified industry credentials, competitive podium finishes,
            collaborative hackathons, and university academic credits earned by Richa Sharma.
            Every item is verified by official issuing institutions.
          </p>
        </div>

        {/* Provenance Metrics Strip */}
        <div className="gallery-metrics-strip">
          <div className="gallery-metric-card">
            <div className="gallery-metric-top">
              <span className="gallery-metric-num">05</span>
              <span className="gallery-metric-badge" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
                100% Backed
              </span>
            </div>
            <div className="gallery-metric-title">Verified Credentials</div>
            <div className="gallery-metric-sub">Microsoft, IEEE, CU &amp; Certiport</div>
          </div>

          <div className="gallery-metric-card">
            <div className="gallery-metric-top">
              <span className="gallery-metric-num">01</span>
              <span className="gallery-metric-badge" style={{ backgroundColor: 'rgba(0, 120, 212, 0.1)', color: '#0078d4' }}>
                Global Standard
              </span>
            </div>
            <div className="gallery-metric-title">Microsoft Certified</div>
            <div className="gallery-metric-sub">AZ-900: Azure Fundamentals</div>
          </div>

          <div className="gallery-metric-card">
            <div className="gallery-metric-top">
              <span className="gallery-metric-num">01</span>
              <span className="gallery-metric-badge" style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
                Podium Finish
              </span>
            </div>
            <div className="gallery-metric-title">3rd Place Bronze</div>
            <div className="gallery-metric-sub">Green Mobility Ideathon (IKS)</div>
          </div>

          <div className="gallery-metric-card">
            <div className="gallery-metric-top">
              <span className="gallery-metric-num">01</span>
              <span className="gallery-metric-badge" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                Academic Merit
              </span>
            </div>
            <div className="gallery-metric-title">University Credit</div>
            <div className="gallery-metric-sub">Python Advance Credit Specialization</div>
          </div>
        </div>

        {/* Interactive Spotlight Stage (Curator's Pedestal) */}
        {activeSpotlight && (
          <div id="curator-spotlight-stage" className="gallery-spotlight-stage">
            <div className="gallery-stage-topbar">
              <div className="gallery-stage-eyebrow">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--primary)' }}>
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>Curator Spotlight &bull; Exhibit {String(spotlightIndex + 1).padStart(2, '0')} of {String(allCredentials.length || 5).padStart(2, '0')}</span>
              </div>
              <div className="gallery-stage-controls">
                <button
                  type="button"
                  className="gallery-stage-nav-btn"
                  onClick={handlePrevSpotlight}
                  aria-label="Previous exhibit in spotlight"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <span>Prev</span>
                </button>
                <button
                  type="button"
                  className="gallery-stage-nav-btn"
                  onClick={handleNextSpotlight}
                  aria-label="Next exhibit in spotlight"
                >
                  <span>Next</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>

            <div className="gallery-stage-layout">
              {/* Left: Certificate Mat Preview */}
              <div
                className="gallery-stage-mat"
                onClick={() => setSelectedItem(activeSpotlight)}
                title="Click to view full-resolution certificate"
              >
                <span className="gallery-stage-corner tl" style={{ borderColor: activeSpotlight.accent_color || '#cbd5e1' }}></span>
                <span className="gallery-stage-corner tr" style={{ borderColor: activeSpotlight.accent_color || '#cbd5e1' }}></span>
                <span className="gallery-stage-corner bl" style={{ borderColor: activeSpotlight.accent_color || '#cbd5e1' }}></span>
                <span className="gallery-stage-corner br" style={{ borderColor: activeSpotlight.accent_color || '#cbd5e1' }}></span>

                <div className="gallery-stage-img-wrap">
                  <img
                    src={activeSpotlight.image_url}
                    alt={activeSpotlight.title}
                    className="gallery-stage-img"
                    loading="eager"
                  />
                  <div className="gallery-stage-zoom-pill">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                    <span>Examine Full Resolution</span>
                  </div>
                </div>
              </div>

              {/* Right: Archival Dossier */}
              <div className="gallery-stage-dossier">
                <div className="gallery-stage-dossier-top">
                  <span
                    className="badge"
                    style={{
                      backgroundColor: activeSpotlight.accent_bg || 'rgba(37, 99, 235, 0.08)',
                      color: activeSpotlight.accent_color || 'var(--primary)',
                      border: `1px solid ${activeSpotlight.accent_color || 'var(--primary)'}33`,
                      fontWeight: 600
                    }}
                  >
                    {activeSpotlight.badge || activeSpotlight.category_label}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-light)' }}>
                    Conferred: {activeSpotlight.date}
                  </span>
                </div>

                <h2 className="gallery-stage-title">
                  {activeSpotlight.title}
                </h2>

                {activeSpotlight.highlight && (
                  <div className="gallery-stage-highlight">
                    &bull; {activeSpotlight.highlight}
                  </div>
                )}

                <table className="gallery-stage-table">
                  <tbody>
                    <tr>
                      <td>Issuing Body</td>
                      <td>{activeSpotlight.issuer || activeSpotlight.meta_info}</td>
                    </tr>
                    {activeSpotlight.signatory && (
                      <tr>
                        <td>Signatory Authority</td>
                        <td>{activeSpotlight.signatory}</td>
                      </tr>
                    )}
                    {(activeSpotlight.credential_id || activeSpotlight.team || activeSpotlight.course) && (
                      <tr>
                        <td>Registration / ID</td>
                        <td>
                          <code style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-subtle)', padding: '2px 5px', borderRadius: '3px' }}>
                            {activeSpotlight.credential_id || activeSpotlight.team || activeSpotlight.course}
                          </code>
                        </td>
                      </tr>
                    )}
                    <tr>
                      <td>Integrity Status</td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.8rem' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          Verified Authentic Document
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <p className="gallery-stage-desc">
                  {activeSpotlight.description}
                </p>

                <div className="gallery-stage-actions">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setSelectedItem(activeSpotlight)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                    <span>Inspect in Lightbox</span>
                  </button>

                  {activeSpotlight.verification_url && (
                    <a
                      href={activeSpotlight.verification_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-sm"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <span>Verify on Certiport</span>
                      <span aria-hidden="true">&nearr;</span>
                    </a>
                  )}

                  <a
                    href={activeSpotlight.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <span>Download Raw PNG</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Thumbnail Selector Strip */}
            <div className="gallery-selector-strip">
              {allCredentials.map((cred, idx) => (
                <div
                  key={cred.id}
                  className={`gallery-thumb-chip ${idx === spotlightIndex ? 'active' : ''}`}
                  onClick={() => setSpotlightIndex(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setSpotlightIndex(idx);
                  }}
                  title={`Mount ${cred.title} to spotlight stage`}
                >
                  <img
                    src={cred.image_url}
                    alt={cred.title}
                    className="gallery-thumb-chip-img"
                    loading="lazy"
                  />
                  <div className="gallery-thumb-chip-info">
                    <div className="gallery-thumb-chip-title">{cred.title}</div>
                    <div className="gallery-thumb-chip-badge">{cred.badge || cred.category_label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section Divider & Filter Bar */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-md)' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-light)' }}>
            Exhibition Archive Wall
          </span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.25rem 0 1rem', color: 'var(--text-main)' }}>
            Filter by Credential Domain
          </h3>
        </div>

        <div className="gallery-filter-bar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`gallery-filter-btn ${filter === tab.id ? 'active' : ''}`}
              onClick={() => setFilter(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="gallery-filter-count">{tab.count}</span>
            </button>
          ))}
        </div>

        <ErrorAlert message={error} onDismiss={() => setError(null)} />

        {loading && <LoadingSpinner message="Consulting verified academic records database..." />}

        {/* Exhibition Wall Grid */}
        {!loading && (
          <div className="gallery-wall-grid">
            {items.map((item, idx) => (
              <div key={item.id} className="gallery-wall-card">
                {/* Header with Exhibit Number & Spotlight CTA */}
                <div className="gallery-wall-header">
                  <span className="gallery-wall-index">
                    EXHIBIT № {String(item.id).padStart(2, '0')}
                  </span>
                  <button
                    type="button"
                    className="gallery-wall-spotlight-btn"
                    onClick={() => handleSelectSpotlightById(item.id)}
                    title="Feature this credential on the spotlight stage above"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>Mount on Stage</span>
                  </button>
                </div>

                {/* Framed Thumbnail Preview */}
                <div
                  className="gallery-wall-preview"
                  onClick={() => setSelectedItem(item)}
                  title="Click to view full-screen certificate"
                >
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="gallery-wall-img"
                    loading="lazy"
                  />
                  <div className="gallery-wall-view-tag">
                    <span>Inspect</span>
                    <span aria-hidden="true">&nearr;</span>
                  </div>
                </div>

                {/* Badges & Date */}
                <div className="gallery-wall-meta">
                  <span
                    className="badge"
                    style={{
                      backgroundColor: item.accent_bg || 'rgba(37, 99, 235, 0.08)',
                      color: item.accent_color || 'var(--primary)',
                      border: `1px solid ${item.accent_color || 'var(--primary)'}22`,
                      fontSize: '0.72rem',
                      fontWeight: 600
                    }}
                  >
                    {item.badge || item.category_label}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                    {item.date}
                  </span>
                </div>

                <h3 className="gallery-wall-title">
                  {item.title}
                </h3>

                <div className="gallery-wall-issuer">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-green)' }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>{item.issuer || item.meta_info}</span>
                </div>

                <p className="gallery-wall-desc">
                  {item.description}
                </p>

                <div className="gallery-wall-actions">
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary"
                    style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem 0.65rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <span>Inspect</span>
                  </button>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.4rem 0.65rem' }}
                    onClick={() => handleSelectSpotlightById(item.id)}
                  >
                    Stage &uarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Institutional Guarantee & Provenance Banner */}
        <div className="gallery-guarantee-banner">
          <div className="gallery-guarantee-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <div className="gallery-guarantee-text">
            <h4>Institutional Credential Authenticity Guarantee</h4>
            <p>
              All certificates exhibited in this archive represent authentic proof-of-work. Digital credentials
              are backed by verifiable authorities including Microsoft Corporation, Certiport, IEEE India Council,
              and Chandigarh University. Raw document verification codes and institutional signatures are available
              for inspection upon request.
            </p>
          </div>
          <div>
            <span
              className="badge"
              style={{
                backgroundColor: 'rgba(5, 150, 105, 0.1)',
                color: '#059669',
                border: '1px solid rgba(5, 150, 105, 0.25)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                padding: '0.35rem 0.75rem'
              }}
            >
              ● Verified Archive
            </span>
          </div>
        </div>

        {/* Lightbox Modal */}
        <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </div>
  );
}
