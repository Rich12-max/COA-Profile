import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteLogo() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-link" to="/" aria-label="COA Learning Home">
          {/* Brand Logo – using same style as original Navbar */
          <div className="brand-logo">
            COA
          </div>
          <div className="brand-info">
            <h1 className="brand-title">COA Learning</h1>
            <p className="brand-subtitle">Hub</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
