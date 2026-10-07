import React from 'react';

export default function ErrorAlert({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="alert-error" role="alert">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <div style={{ flex: 1 }}>{message}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={{ color: 'inherit', fontWeight: 'bold', fontSize: '1rem', padding: '0 4px' }}
          aria-label="Dismiss error"
        >
          &times;
        </button>
      )}
    </div>
  );
}
