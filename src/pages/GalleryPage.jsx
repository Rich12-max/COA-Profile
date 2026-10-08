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

  useEffect(() => {
    setLoading(true);
    apiService
      .getAchievements(filter)
      .then((data) => {
        setItems(data || []);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load achievements from database.');
      })
      .finally(() => setLoading(false));
  }, [filter]);

  return (
    <div className="section">
      <div className="container">
        <Breadcrumb items={[{ label: 'Gallery & Achievements', to: '/gallery' }]} />

        <div className="section-header text-center">
          <span className="tagline">Credentials &amp; Honors</span>
          <h1>Gallery &amp; Achievements</h1>
          <p>
            Curated archive of engineering certifications, technical competition honors, hackathons, and academic citations.
            Click any item to view a detailed lightbox preview.
          </p>
        </div>

        {/* Filter Tab Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 'var(--space-2xl)' }}>
          {[
            { id: 'all', label: 'All Items' },
            { id: 'certificates', label: 'Certificates' },
            { id: 'competitions', label: 'Competitions' },
            { id: 'hackathons', label: 'Hackathons & Ideathons' },
            { id: 'academic', label: 'Academic Honors' },
            { id: 'events', label: 'Event Photographs' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`btn btn-sm ${filter === tab.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <ErrorAlert message={error} onDismiss={() => setError(null)} />

        {loading && <LoadingSpinner message="Fetching verified achievements from SQLite database..." />}

        {!loading && (
          <div className="grid-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="card card-interactive"
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onClick={() => setSelectedItem(item)}
              >
                {/* Thumbnail Container */}
                <div
                  style={{
                    height: '210px',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-md)',
                    overflow: 'hidden',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.02)'
                  }}
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        transition: 'transform 0.35s ease'
                      }}
                    />
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'var(--text-light)', gap: '0.5rem' }}>
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <circle cx="8.5" cy="8.5" r="1.5"></circle>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                      <span className="badge" style={{ fontSize: '0.7rem' }}>
                        Click for Lightbox Preview
                      </span>
                    </div>
                  )}

                  <div
                    style={{
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      backgroundColor: 'rgba(15, 23, 42, 0.78)',
                      color: '#ffffff',
                      fontSize: '0.6875rem',
                      fontFamily: 'var(--font-mono)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backdropFilter: 'blur(4px)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      letterSpacing: '0.04em'
                    }}
                  >
                    <span>View Certificate</span>
                    <span aria-hidden="true">&nearr;</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-xs)', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-primary">{item.category_label || item.category}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>{item.date}</span>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--space-xs)', color: 'var(--text-main)' }}>
                  {item.title}
                </h3>

                <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginBottom: 'var(--space-sm)' }}>
                  {item.meta_info}
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5', marginTop: 'auto' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Modal Lightbox */}
        <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </div>
  );
}
