import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Close menus on page navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const isCoaActive = location.pathname.startsWith('/coa-learning');

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <NavLink to="/" className="brand-link" aria-label="COA Learning Home">
          <div className="brand-logo" aria-hidden="true">
            <span>COA</span>
          </div>
          <div className="brand-info">
            <span className="brand-title">COA Learning</span>
            <span className="brand-subtitle">Computer Architecture</span>
          </div>
        </NavLink>

        {/* Mobile Hamburger Toggle */}
        <button
          className="mobile-nav-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <nav id="primary-nav" aria-label="Main Navigation">
          <ul className={`nav-menu ${mobileMenuOpen ? 'show' : ''}`}>
            <li>
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About Me
              </NavLink>
            </li>

            {/* COA Learning Dropdown */}
            <li className={`nav-dropdown ${dropdownOpen ? 'open' : ''}`}>
              <button
                type="button"
                className={`nav-link dropdown-toggle ${isCoaActive ? 'active' : ''}`}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                COA Learning
                <svg
                  style={{
                    width: 14,
                    height: 14,
                    transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                    transition: 'transform 150ms ease',
                  }}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                <li>
                  <NavLink to="/coa-learning" end className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                    COA Learning Hub
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coa-learning/number-converter" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                    Number System Converter
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coa-learning/set-associative" end className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                    Set Associative Mapping
                  </NavLink>
                </li>
                <li className="dropdown-divider"></li>
                <li className="dropdown-header">Associativity Modes</li>
                <li>
                  <NavLink to="/coa-learning/set-associative/0-way" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                    0-Way (Fully Associative)
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coa-learning/set-associative/1-way" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                    1-Way (Direct Mapped)
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coa-learning/set-associative/2-way" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                    2-Way Set Associative
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/coa-learning/set-associative/3-way" className={({ isActive }) => `dropdown-item ${isActive ? 'active' : ''}`}>
                    3-Way Set Associative
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink to="/assignment-1" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Assignment 1
              </NavLink>
            </li>

            <li>
              <NavLink to="/gallery" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Gallery
              </NavLink>
            </li>

            <li>
              <NavLink to="/github" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                GitHub
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
