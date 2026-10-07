import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

/* ── Inline SVG Icons (Lucide-style line icons) ──────────────────────────── */
const icons = {
  home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  user: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  book: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  ),
  clipboard: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="12" y2="16" />
    </svg>
  ),
  trophy: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 22V18.36a5 5 0 0 1-3.54-3.54L6 14V4h12v10l-.46.82A5 5 0 0 1 14 18.36V22" />
    </svg>
  ),
  github: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  palette: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  menu: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  close: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

/* ── Navigation items ────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { to: '/',             icon: icons.home,      label: 'Home',                  end: true },
  { to: '/about',        icon: icons.user,      label: 'About Me' },
  { to: '/coa',          icon: icons.book,      label: 'COA Learning' },
  { to: '/assignment',   icon: icons.clipboard, label: 'Assignment 1' },
  { to: '/gallery',      icon: icons.trophy,    label: 'Gallery & Achievements' },
  { to: '/github',       icon: icons.github,    label: 'GitHub' },
];

export default function FloatingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();
  const location = useLocation();
  const navRef = useRef(null);
  const themeMenuRef = useRef(null);

  const currentThemeObj = themes.find(t => t.id === theme) || themes[0];

  // Close mobile menu & theme popover on navigation
  useEffect(() => {
    setMobileOpen(false);
    setThemeMenuOpen(false);
  }, [location.pathname]);

  // Close menus on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (mobileOpen && navRef.current && !navRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
      if (themeMenuOpen && themeMenuRef.current && !themeMenuRef.current.contains(e.target)) {
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [mobileOpen, themeMenuOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Check if COA-related or Assignment-related paths are active
  const isCoaPath = location.pathname.startsWith('/coa');
  const isAssignmentPath = location.pathname.startsWith('/assignment');

  const checkIsActive = (to, isActive) => {
    if (to === '/coa') return isCoaPath;
    if (to === '/assignment') return isAssignmentPath;
    return isActive;
  };

  return (
    <nav
      ref={navRef}
      className="floating-nav"
      aria-label="Main Navigation"
    >
      {/* ── Desktop vertical pill ─────────────────────────────────── */}
      <ul className="floating-nav-pill" role="menubar" aria-orientation="vertical">
        {NAV_ITEMS.map((item) => (
          <li key={item.to} className="floating-nav-item" role="none">
            <NavLink
              to={item.to}
              end={item.end || false}
              role="menuitem"
              aria-label={item.label}
              className={({ isActive }) => {
                const active = checkIsActive(item.to, isActive);
                return `floating-nav-link ${active ? 'active' : ''}`;
              }}
            >
              <span className="floating-nav-icon">{item.icon}</span>
              <span className="floating-nav-tooltip">{item.label}</span>
            </NavLink>
          </li>
        ))}

        {/* ── Theme Switcher Item ─────────────────────────────────── */}
        <li className="floating-nav-divider" role="separator" />

        <li key="theme-switcher" className="floating-nav-item theme-nav-item" role="none" ref={themeMenuRef}>
          <button
            type="button"
            className={`floating-nav-link floating-nav-theme-btn ${themeMenuOpen ? 'active' : ''}`}
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
            aria-label={`Current theme: ${currentThemeObj.name}. Click to choose theme.`}
            aria-expanded={themeMenuOpen}
            aria-haspopup="true"
          >
            <span className="floating-nav-icon">{icons.palette}</span>
            <span className="floating-nav-tooltip">Theme: {currentThemeObj.name}</span>
          </button>

          {/* Theme Selector Popover */}
          {themeMenuOpen && (
            <div className="theme-popover" role="dialog" aria-label="Select Theme">
              <div className="theme-popover-header">
                <div>
                  <div className="theme-popover-title">Themes</div>
                  <div className="theme-popover-sub">Select color palette</div>
                </div>
                <span className="theme-popover-badge">{currentThemeObj.name}</span>
              </div>

              <div className="theme-popover-list">
                {themes.map((t) => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      className={`theme-option-row ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setTheme(t.id);
                        setThemeMenuOpen(false);
                      }}
                      role="radio"
                      aria-checked={isSelected}
                    >
                      <div className="theme-swatch-combo">
                        <span className="swatch-bg" style={{ backgroundColor: t.preview[0] }} />
                        <span className="swatch-primary" style={{ backgroundColor: t.preview[1] }} />
                        <span className="swatch-accent" style={{ backgroundColor: t.preview[2] }} />
                      </div>
                      <div className="theme-option-meta">
                        <div className="theme-option-top">
                          <span className="theme-option-name">{t.name}</span>
                          <span className={`theme-badge-pill badge-${t.badge.toLowerCase()}`}>
                            {t.badge}
                          </span>
                        </div>
                        <span className="theme-option-desc">{t.subtitle}</span>
                      </div>
                      {isSelected && (
                        <span className="theme-check-icon">{icons.check}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </li>
      </ul>

      {/* ── Mobile menu button ────────────────────────────────────── */}
      <button
        className="floating-nav-mobile-toggle"
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? icons.close : icons.menu}
      </button>

      {/* ── Mobile dropdown menu ──────────────────────────────────── */}
      {mobileOpen && (
        <ul className="floating-nav-mobile-menu" role="menu">
          {NAV_ITEMS.map((item) => (
            <li key={item.to} role="none">
              <NavLink
                to={item.to}
                end={item.end || false}
                role="menuitem"
                className={({ isActive }) => {
                  const active = checkIsActive(item.to, isActive);
                  return `floating-nav-mobile-link ${active ? 'active' : ''}`;
                }}
              >
                <span className="floating-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}

          {/* Mobile Theme Selector */}
          <li className="mobile-theme-item" role="none">
            <div className="mobile-theme-header">
              <span className="floating-nav-icon">{icons.palette}</span>
              <span>Theme: <strong>{currentThemeObj.name}</strong></span>
            </div>
            <div className="mobile-theme-grid">
              {themes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`mobile-theme-pill ${theme === t.id ? 'active' : ''}`}
                  onClick={() => setTheme(t.id)}
                >
                  <span className="mobile-pill-dot" style={{ backgroundColor: t.preview[1] }} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </li>
        </ul>
      )}
    </nav>
  );
}
