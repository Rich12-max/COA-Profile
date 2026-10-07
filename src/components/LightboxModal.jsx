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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
          <div className="lightbox-image-preview">
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
          </div>

          <div style={{ marginBottom: 'var(--space-sm)' }}>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
              {item.meta_info} &bull; {item.date}
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
