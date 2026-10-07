import React from 'react';

export default function LoadingSpinner({ message = 'Loading calculations from server...' }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-light)' }}>
      <div
        style={{
          display: 'inline-block',
          width: '32px',
          height: '32px',
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          marginBottom: '0.75rem',
        }}
      ></div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ fontSize: '0.875rem' }}>{message}</div>
    </div>
  );
}
