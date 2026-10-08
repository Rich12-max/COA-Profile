import React, { useEffect } from 'react';

export default function LightboxModal({ item, onClose }) {
  if (!item) return null;

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="lightbox-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      onClick={(e) => {
        if (e.target.classList.contains('lightbox-modal')) {
          onClose();
        }
      }}
    >
      <div className="lightbox-content">
        <div className="lightbox-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-primary">{item.category_label || item.category}</span>
            <h3 id="lightbox-title" style={{ fontSize: '1.125rem', margin: 0 }}>
              {item.title}
            </h3>
          </div>
          <button className="lightbox-close-btn" aria-label="Close modal preview" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="lightbox-body">
          <div
            className="lightbox-image-preview"
            style={{
              padding: item.image_url ? '0.75rem' : '2rem',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-md)'
            }}
          >
            {item.image_url ? (
              <div style={{ textAlign: 'center', width: '100%' }}>
                <img
                  src={item.image_url}
                  alt={item.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '62vh',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: '0 4px 16px rgba(15, 23, 42, 0.08)',
                    display: 'block',
                    margin: '0 auto'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
                  <a
                    href={item.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline"
                    style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                  >
                    View Original Certificate &nearr;
                  </a>
                  {item.verification_url && (
                    <a
                      href={item.verification_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                      style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                    >
                      Verify Credential &rarr;
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ margin: '0 auto 0.5rem auto' }}
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>
                  {item.image_placeholder || '[Full Resolution Document / Photograph Placeholder]'}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '4px' }}>
                  Clicking outside or pressing Escape will dismiss this preview.
                </p>
              </div>
            )}
          </div>

          <div style={{ marginBottom: 'var(--space-sm)' }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)' }}>
              {item.meta_info} &bull; {item.date}
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0 }}>
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
