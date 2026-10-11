import React, { useEffect, useState, useRef, useCallback } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import LightboxModal from '../components/LightboxModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';
import apiService from '../services/api';
import './GalleryMuseum.css';

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // All 5 authentic credentials for the 3D rotunda and curated wings
  const [allCredentials, setAllCredentials] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(2); // Center exhibit initially
  const [activeRoom, setActiveRoom] = useState('entrance');
  const [museumDepth, setMuseumDepth] = useState(0);
  const [audioGuideActive, setAudioGuideActive] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);

  // 3D Rotunda Mouse Vector & Smooth Interpolation
  const theatreRef = useRef(null);
  const [cursorVector, setCursorVector] = useState({ x: 0, y: 0 }); // Smoothed vector (-1 to +1)
  const targetVectorRef = useRef({ x: 0, y: 0 });
  const currentVectorRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef(null);
  const audioContextRef = useRef(null);

  // Detect user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setMotionReduced(true);
    }
    const handler = (e) => setMotionReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Fetch initial data
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

  useEffect(() => {
    apiService.getAchievements('all').then((data) => {
      setAllCredentials(data || []);
    });
  }, []);

  // Smooth lerp loop for 3D Rotunda cursor physics
  useEffect(() => {
    if (motionReduced) return;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updatePhysics = () => {
      currentVectorRef.current.x = lerp(currentVectorRef.current.x, targetVectorRef.current.x, 0.08);
      currentVectorRef.current.y = lerp(currentVectorRef.current.y, targetVectorRef.current.y, 0.08);

      // Quantize slightly to prevent continuous re-render on negligible floats
      const deltaX = Math.abs(currentVectorRef.current.x - cursorVector.x);
      const deltaY = Math.abs(currentVectorRef.current.y - cursorVector.y);
      if (deltaX > 0.002 || deltaY > 0.002) {
        setCursorVector({
          x: currentVectorRef.current.x,
          y: currentVectorRef.current.y
        });
      }

      animFrameRef.current = requestAnimationFrame(updatePhysics);
    };

    animFrameRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [motionReduced, cursorVector]);

  // Mouse move handler on the 3D Rotunda Theatre
  const handleTheatreMouseMove = useCallback((e) => {
    if (!theatreRef.current || motionReduced) return;
    const rect = theatreRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to +1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to +1
    targetVectorRef.current = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y))
    };

    // Determine nearest artwork column based on cursor X
    if (allCredentials.length > 0) {
      const step = 2 / (allCredentials.length - 1 || 1);
      let nearestIdx = Math.round((x + 1) / step);
      nearestIdx = Math.max(0, Math.min(allCredentials.length - 1, nearestIdx));
      if (nearestIdx !== focusedIndex) {
        setFocusedIndex(nearestIdx);
      }
    }
  }, [allCredentials.length, focusedIndex, motionReduced]);

  const handleTheatreMouseLeave = useCallback(() => {
    targetVectorRef.current = { x: 0, y: 0 };
    setFocusedIndex(2); // return to center
  }, []);

  // Web Audio subtle harmonic acoustic chime (Audio Guide ambiance)
  const playMuseumChime = useCallback((freq = 520) => {
    if (!audioGuideActive) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.9);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.95);
    } catch {
      // Audio context policy fallback
    }
  }, [audioGuideActive]);

  const toggleAudioGuide = () => {
    const nextState = !audioGuideActive;
    setAudioGuideActive(nextState);
    if (nextState) {
      playMuseumChime(587.33); // D5 chime
    }
  };

  // Scroll listener to update museum depth & current room
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      
      // Calculate realistic museum depth in meters (0m to 120m)
      const depthMeters = Math.round(progress * 120);
      setMuseumDepth(depthMeters);

      // Determine current room based on element positions
      const rooms = [
        { id: 'entrance', el: document.getElementById('museum-entrance') },
        { id: 'rotunda', el: document.getElementById('museum-rotunda') },
        { id: 'wing-1', el: document.getElementById('museum-wing-1') },
        { id: 'wing-2', el: document.getElementById('museum-wing-2') },
        { id: 'wing-3', el: document.getElementById('museum-wing-3') },
        { id: 'wing-4', el: document.getElementById('museum-wing-4') },
        { id: 'vault', el: document.getElementById('museum-vault') }
      ];

      for (let i = rooms.length - 1; i >= 0; i--) {
        const room = rooms[i];
        if (room.el) {
          const rect = room.el.getBoundingClientRect();
          if (rect.top <= 260) {
            setActiveRoom(room.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToRoom = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      playMuseumChime(659.25); // E5 chime
    }
  };

  // Filter tabs for the Vault archive
  const filterTabs = [
    { id: 'all', label: 'All Exhibits', count: allCredentials.length || 5 },
    { id: 'certificates', label: 'Industry Certifications', count: allCredentials.filter((c) => c.category === 'certificates').length || 1 },
    { id: 'competitions', label: 'Competitions & Podium', count: allCredentials.filter((c) => c.category === 'competitions').length || 1 },
    { id: 'hackathons', label: 'Hackathons & Summits', count: allCredentials.filter((c) => c.category === 'hackathons').length || 2 },
    { id: 'academic', label: 'Academic Credits', count: allCredentials.filter((c) => c.category === 'academic').length || 1 }
  ];

  // Specific milestone items for individual architectural wings
  const azureItem = allCredentials.find((c) => c.id === 1) || allCredentials[0];
  const bronzeItem = allCredentials.find((c) => c.id === 2) || allCredentials[1];
  const pythonItem = allCredentials.find((c) => c.id === 3) || allCredentials[2];
  const buildSummitItem = allCredentials.find((c) => c.id === 4) || allCredentials[3];
  const herizonItem = allCredentials.find((c) => c.id === 5) || allCredentials[4];

  // Calculate 3D transformation for each artwork frame in Rotunda based on cursorVector
  const getFrameTransform = (idx, total) => {
    if (motionReduced) {
      return {
        transform: 'none',
        filter: 'none',
        boxShadow: 'none',
        zIndex: idx === focusedIndex ? 10 : 1
      };
    }

    const normPos = total > 1 ? (idx / (total - 1)) * 2 - 1 : 0; // -1 (left) to +1 (right)
    const dist = Math.abs(cursorVector.x - normPos);
    
    // Proximity factor: 1 when cursor is directly over this frame's column, tapering down
    const closeness = Math.max(0, 1 - dist / 0.85);
    
    // Depth (Z-axis): Forward toward viewer when closeness is high, receding back when distant
    // Range: +85px (front) to -45px (back)
    const translateZ = (closeness * 95) - ((1 - closeness) * 45);
    
    // Scale: 1.08 when focused, 0.94 when receding
    const scale = 0.94 + closeness * 0.14;
    
    // Subtle rotation to face visitor as viewpoint changes
    const rotateY = (normPos - cursorVector.x) * 11;
    
    // Subtle tilt from mouse Y
    const rotateX = -cursorVector.y * 3.5;

    // Brightness and clarity
    const brightness = 0.88 + closeness * 0.18;
    const contrast = 0.96 + closeness * 0.08;
    
    // Shadow spread
    const shadowAlpha = 0.12 + closeness * 0.16;
    const shadowBlur = 15 + closeness * 35;
    const shadowY = 8 + closeness * 20;

    return {
      transform: `perspective(1200px) translate3d(0, 0, ${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) rotateX(${rotateX.toFixed(1)}deg) scale(${scale.toFixed(3)})`,
      filter: `brightness(${brightness.toFixed(2)}) contrast(${contrast.toFixed(2)})`,
      boxShadow: `0 ${shadowY}px ${shadowBlur}px -8px rgba(28, 34, 41, ${shadowAlpha.toFixed(2)})`,
      zIndex: Math.round(closeness * 10) + (idx === focusedIndex ? 5 : 1),
      transition: 'box-shadow 0.25s ease, filter 0.25s ease'
    };
  };

  return (
    <div className="museum-experience-wrapper">
      {/* Ambient Architectural Lighting & Gentle Floating Dust */}
      <div className="museum-ambient-canvas" aria-hidden="true">
        <div className="museum-ambient-light-top"></div>
        <div className="museum-ambient-dust"></div>
      </div>

      {/* =========================================================================
          MUSEUM HUD: INTERACTIVE WAYFINDING & WALKWAY TELEMETRY
          ========================================================================= */}
      <aside className="museum-hud-bar" aria-label="Museum Wayfinding Navigation">
        <div className="museum-hud-inner">
          <div className="museum-hud-telemetry">
            <span className="museum-compass-pill">
              <span className="museum-compass-dot"></span>
              <span>MUSEUM OF MY JOURNEY</span>
            </span>
            <div className="museum-depth-meter">
              <span>Depth:</span>
              <strong>{museumDepth}m</strong>
            </div>
          </div>

          {/* Exhibition Wings Walkway Navigator */}
          <nav className="museum-hud-rooms-nav" aria-label="Exhibition wings">
            <button
              type="button"
              className={`museum-nav-link-btn ${activeRoom === 'entrance' ? 'active' : ''}`}
              onClick={() => scrollToRoom('museum-entrance')}
            >
              <span>Foyer</span>
            </button>
            <button
              type="button"
              className={`museum-nav-link-btn ${activeRoom === 'rotunda' ? 'active' : ''}`}
              onClick={() => scrollToRoom('museum-rotunda')}
            >
              <span>3D Rotunda</span>
            </button>
            <button
              type="button"
              className={`museum-nav-link-btn ${activeRoom === 'wing-1' ? 'active' : ''}`}
              onClick={() => scrollToRoom('museum-wing-1')}
            >
              <span>Wing I • Cloud</span>
            </button>
            <button
              type="button"
              className={`museum-nav-link-btn ${activeRoom === 'wing-2' ? 'active' : ''}`}
              onClick={() => scrollToRoom('museum-wing-2')}
            >
              <span>Wing II • Arena</span>
            </button>
            <button
              type="button"
              className={`museum-nav-link-btn ${activeRoom === 'wing-3' ? 'active' : ''}`}
              onClick={() => scrollToRoom('museum-wing-3')}
            >
              <span>Wing III • Summits</span>
            </button>
            <button
              type="button"
              className={`museum-nav-link-btn ${activeRoom === 'wing-4' ? 'active' : ''}`}
              onClick={() => scrollToRoom('museum-wing-4')}
            >
              <span>Wing IV • Academy</span>
            </button>
            <button
              type="button"
              className={`museum-nav-link-btn ${activeRoom === 'vault' ? 'active' : ''}`}
              onClick={() => scrollToRoom('museum-vault')}
            >
              <span>Vault Archive</span>
            </button>
          </nav>

          {/* Audio Guide & Viewport Controls */}
          <div className="museum-hud-tools">
            <button
              type="button"
              className={`museum-tool-btn ${audioGuideActive ? 'active' : ''}`}
              onClick={toggleAudioGuide}
              title={audioGuideActive ? 'Mute ambient audio guide chimes' : 'Enable ambient museum acoustic chimes'}
              aria-pressed={audioGuideActive}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                {audioGuideActive ? (
                  <>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </>
                ) : (
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                )}
              </svg>
              <span>{audioGuideActive ? 'Acoustic Guide ON' : 'Audio Guide'}</span>
            </button>

            <button
              type="button"
              className={`museum-tool-btn ${motionReduced ? 'active' : ''}`}
              onClick={() => setMotionReduced(!motionReduced)}
              title="Toggle low-motion 2D perspective mode"
              aria-pressed={motionReduced}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{motionReduced ? 'Low Motion' : '3D Spatial'}</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <Breadcrumb items={[{ label: 'A Museum of My Journey', to: '/gallery' }]} />

        {/* =========================================================================
            ROOM 0: GRAND ENTRANCE FOYER
            ========================================================================= */}
        <section id="museum-entrance" className="museum-foyer-section" aria-labelledby="foyer-heading">
          <div className="museum-foyer-arch">
            <span>Archival Colonnade &bull; Room 00 &bull; Entrance Hall</span>
          </div>

          <h1 id="foyer-heading" className="museum-foyer-title">
            A Museum of <span>My Journey</span>
          </h1>

          <p className="museum-foyer-curator-statement">
            A collection of milestones, memories, and moments worth keeping.
            Step through an interactive spatial exhibition of authentic industry credentials,
            competitive podium finishes, national hackathons, and university academic credits earned by Richa Sharma.
          </p>

          {/* Museum Provenance Pedestals */}
          <div className="museum-pedestals-row">
            <div className="museum-pedestal-card">
              <div className="museum-pedestal-num">05</div>
              <span className="museum-pedestal-tag" style={{ backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
                100% Authentic
              </span>
              <div className="museum-pedestal-title">Exhibited Artworks</div>
              <div className="museum-pedestal-sub">Microsoft, IEEE, CU &amp; Certiport</div>
            </div>

            <div className="museum-pedestal-card">
              <div className="museum-pedestal-num">01</div>
              <span className="museum-pedestal-tag" style={{ backgroundColor: 'rgba(0, 120, 212, 0.1)', color: '#0078d4' }}>
                Global Standard
              </span>
              <div className="museum-pedestal-title">Cloud Certification</div>
              <div className="museum-pedestal-sub">AZ-900: Azure Fundamentals</div>
            </div>

            <div className="museum-pedestal-card">
              <div className="museum-pedestal-num">01</div>
              <span className="museum-pedestal-tag" style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)', color: '#d97706' }}>
                Bronze Podium
              </span>
              <div className="museum-pedestal-title">3rd Place Finish</div>
              <div className="museum-pedestal-sub">Green Mobility Ideathon (IKS)</div>
            </div>

            <div className="museum-pedestal-card">
              <div className="museum-pedestal-num">01</div>
              <span className="museum-pedestal-tag" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: '#059669' }}>
                Academic Credit
              </span>
              <div className="museum-pedestal-title">University Merit</div>
              <div className="museum-pedestal-sub">Python Advance Credit Program</div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ROOM 1: THE GRAND 3D ROTUNDA (CURSOR-CONTROLLED 3D ARTWORK)
            ========================================================================= */}
        <section id="museum-rotunda" className="museum-rotunda-section" aria-labelledby="rotunda-heading">
          <div className="museum-rotunda-header">
            <div className="museum-rotunda-tag">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span>Room 01 &bull; Interactive 3D Rotunda</span>
            </div>
            <h2 id="rotunda-heading" className="museum-rotunda-heading">
              The Curators' Spatial Salon
            </h2>
            <p className="museum-rotunda-guidance">
              Move your cursor across the gallery: artwork on the left smoothly sweeps forward when gazing left,
              artwork on the right comes into focus when looking right, and the central piece anchors the viewpoint.
              Click any frame to examine it in full resolution.
            </p>
          </div>

          {/* 3D Theatre Chamber */}
          <div
            ref={theatreRef}
            className="museum-3d-theatre"
            onMouseMove={handleTheatreMouseMove}
            onMouseLeave={handleTheatreMouseLeave}
          >
            <div className="museum-theatre-ceiling"></div>

            {/* Moving Dynamic Wall Spotlight */}
            {!motionReduced && (
              <div
                className="museum-spotlight-beam"
                style={{
                  left: `${50 + cursorVector.x * 32}%`,
                  top: `${42 + cursorVector.y * 22}%`
                }}
              ></div>
            )}

            {/* Perspective Viewport Stage */}
            <div className="museum-perspective-stage">
              <div
                className="museum-spatial-wall"
                style={{
                  transform: motionReduced
                    ? 'none'
                    : `rotateY(${(cursorVector.x * 5).toFixed(2)}deg) rotateX(${(-cursorVector.y * 3).toFixed(2)}deg)`
                }}
              >
                {allCredentials.map((cred, idx) => {
                  const frameStyle = getFrameTransform(idx, allCredentials.length);
                  const isFocused = idx === focusedIndex;

                  return (
                    <div
                      key={cred.id}
                      className="museum-3d-frame-wrapper"
                      style={frameStyle}
                      onClick={() => {
                        setSelectedItem(cred);
                        playMuseumChime(523.25);
                      }}
                      onMouseEnter={() => {
                        setFocusedIndex(idx);
                        playMuseumChime(440 + idx * 45);
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Examine ${cred.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedItem(cred);
                        } else if (e.key === 'ArrowRight') {
                          e.preventDefault();
                          setFocusedIndex((prev) => Math.min(allCredentials.length - 1, prev + 1));
                        } else if (e.key === 'ArrowLeft') {
                          e.preventDefault();
                          setFocusedIndex((prev) => Math.max(0, prev - 1));
                        }
                      }}
                    >
                      <div className={`museum-3d-frame-card ${isFocused ? 'is-active-focus' : ''}`}>
                        {/* Mat Board with Authentic Document */}
                        <div className="museum-frame-mat">
                          <div className="museum-frame-img-box">
                            <img
                              src={cred.image_url}
                              alt={cred.title}
                              className="museum-frame-img"
                              loading="eager"
                            />
                            <div className="museum-frame-zoom-cue">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                              </svg>
                              <span>Examine</span>
                            </div>
                          </div>
                        </div>

                        {/* Minimal Museum Brass Plaquette */}
                        <div className="museum-brass-placard">
                          <span className="museum-placard-number">EXHIBIT № {String(cred.id).padStart(2, '0')}</span>
                          <div className="museum-placard-title" title={cred.title}>{cred.title}</div>
                          <div className="museum-placard-meta">
                            {cred.issuer || cred.meta_info} &bull; {cred.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Polished Terrazzo Floor Reflections */}
              <div className="museum-floor-plane">
                <div className="museum-floor-reflection-glow"></div>
              </div>
            </div>

            {/* Rotunda Interactive Controls Footer */}
            <div className="museum-theatre-controls">
              <div className="museum-rotunda-legend">
                <span className="museum-rotunda-key-badge">&larr; &rarr;</span>
                <span>Move cursor or use Arrow keys to shift focal depth &bull; Click to inspect</span>
              </div>

              <div className="museum-rotunda-selectors">
                {allCredentials.map((cred, idx) => (
                  <button
                    key={cred.id}
                    type="button"
                    className={`museum-rotunda-chip ${idx === focusedIndex ? 'active' : ''}`}
                    onClick={() => {
                      setFocusedIndex(idx);
                      // Set target vector to align with this frame
                      const normX = (idx / (allCredentials.length - 1 || 1)) * 2 - 1;
                      targetVectorRef.current = { x: normX, y: 0 };
                      playMuseumChime(440 + idx * 45);
                    }}
                  >
                    <span>№ 0{cred.id}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ROOM 2: EXHIBITION WINGS — WALKING DEEPER THROUGH THE MUSEUM
            ========================================================================= */}
        <div className="museum-curated-exhibitions">

          {/* ──────────────────────────────────────────────────────────────────
              WING I: INDUSTRY & CLOUD ARCHITECTURE
              ────────────────────────────────────────────────────────────────── */}
          {azureItem && (
            <section id="museum-wing-1" className="museum-exhibition-wing" aria-labelledby="wing-1-title">
              <div className="museum-wing-archway">
                <div className="museum-wing-badge">
                  <strong>WING I</strong>
                  <span>Cloud Systems &bull; Industry Certification</span>
                </div>
                <div className="museum-wing-curator-note">
                  Room Depth: 35m &bull; Issuing Body: Microsoft Corporation &amp; Certiport
                </div>
              </div>

              <div className="museum-alcove-stage">
                <div className="museum-alcove-downlight"></div>
                <div className="museum-alcove-grid">
                  {/* Framed Artwork Display */}
                  <div
                    className="museum-alcove-frame-case"
                    onClick={() => {
                      setSelectedItem(azureItem);
                      playMuseumChime(523.25);
                    }}
                    title="Click to view full-resolution certificate"
                  >
                    <span className="museum-frame-corner tl"></span>
                    <span className="museum-frame-corner tr"></span>
                    <span className="museum-frame-corner bl"></span>
                    <span className="museum-frame-corner br"></span>

                    <div className="museum-alcove-mat">
                      <div className="museum-alcove-img-wrapper">
                        <img
                          src={azureItem.image_url}
                          alt={azureItem.title}
                          className="museum-alcove-img"
                          loading="lazy"
                        />
                        <div className="museum-alcove-zoom-badge">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                          <span>Inspect Exhibit</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Curatorial Dossier */}
                  <div className="museum-alcove-dossier">
                    <div className="museum-dossier-eyebrow">
                      <span className="badge" style={{ backgroundColor: 'rgba(0, 120, 212, 0.1)', color: '#0078d4', fontWeight: 600 }}>
                        {azureItem.badge || 'Microsoft Certified'}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                        Conferred: {azureItem.date}
                      </span>
                    </div>

                    <h3 id="wing-1-title" className="museum-dossier-title">
                      {azureItem.title}
                    </h3>

                    {azureItem.highlight && (
                      <div className="museum-dossier-highlight">
                        &bull; {azureItem.highlight}
                      </div>
                    )}

                    <table className="museum-dossier-table">
                      <tbody>
                        <tr>
                          <td>Issuing Body</td>
                          <td>{azureItem.issuer || azureItem.meta_info}</td>
                        </tr>
                        {azureItem.signatory && (
                          <tr>
                            <td>Signatory Authority</td>
                            <td>{azureItem.signatory}</td>
                          </tr>
                        )}
                        {azureItem.credential_id && (
                          <tr>
                            <td>Credential ID</td>
                            <td>
                              <code style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-subtle)', padding: '2px 5px', borderRadius: '3px' }}>
                                {azureItem.credential_id}
                              </code>
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td>Verification</td>
                          <td>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.8rem' }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Official Authenticity Verified
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="museum-dossier-desc">
                      {azureItem.description}
                    </p>

                    <div className="museum-dossier-actions">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelectedItem(azureItem)}
                      >
                        <span>Examine in Lightbox</span>
                      </button>
                      {azureItem.verification_url && (
                        <a
                          href={azureItem.verification_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline btn-sm"
                        >
                          <span>Verify with Certiport &nearr;</span>
                        </a>
                      )}
                      <a
                        href={azureItem.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        <span>Raw Document</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ──────────────────────────────────────────────────────────────────
              WING II: THE COMPETITIVE ARENA & IDEATHONS
              ────────────────────────────────────────────────────────────────── */}
          {bronzeItem && (
            <section id="museum-wing-2" className="museum-exhibition-wing" aria-labelledby="wing-2-title">
              <div className="museum-wing-archway">
                <div className="museum-wing-badge">
                  <strong>WING II</strong>
                  <span>The Arena &bull; Competitive Podium Finish</span>
                </div>
                <div className="museum-wing-curator-note">
                  Room Depth: 55m &bull; Sustainable Vehicles Inspired by IKS
                </div>
              </div>

              <div className="museum-alcove-stage">
                <div className="museum-alcove-downlight" style={{ left: '50%' }}></div>
                <div className="museum-alcove-grid">
                  {/* Curatorial Dossier (Left) */}
                  <div className="museum-alcove-dossier" style={{ order: 2 }}>
                    <div className="museum-dossier-eyebrow">
                      <span className="badge" style={{ backgroundColor: 'rgba(217, 119, 6, 0.12)', color: '#d97706', fontWeight: 600 }}>
                        {bronzeItem.badge || 'Bronze Medal • 3rd Place'}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                        Conferred: {bronzeItem.date}
                      </span>
                    </div>

                    <h3 id="wing-2-title" className="museum-dossier-title">
                      {bronzeItem.title}
                    </h3>

                    {bronzeItem.highlight && (
                      <div className="museum-dossier-highlight">
                        &bull; {bronzeItem.highlight}
                      </div>
                    )}

                    <table className="museum-dossier-table">
                      <tbody>
                        <tr>
                          <td>Organizers</td>
                          <td>{bronzeItem.issuer || bronzeItem.meta_info}</td>
                        </tr>
                        {bronzeItem.team && (
                          <tr>
                            <td>Registered Team</td>
                            <td>{bronzeItem.team}</td>
                          </tr>
                        )}
                        <tr>
                          <td>Academic Standing</td>
                          <td>Chandigarh University (NAAC Grade A+ &bull; NIRF Top 20)</td>
                        </tr>
                        <tr>
                          <td>Podium Rank</td>
                          <td>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#d97706', fontWeight: 600, fontSize: '0.8rem' }}>
                              ★ 3rd Position Bronze Trophy
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="museum-dossier-desc">
                      {bronzeItem.description}
                    </p>

                    <div className="museum-dossier-actions">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelectedItem(bronzeItem)}
                      >
                        <span>Examine in Lightbox</span>
                      </button>
                      <a
                        href={bronzeItem.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        <span>Raw Document</span>
                      </a>
                    </div>
                  </div>

                  {/* Framed Artwork Display (Right) */}
                  <div
                    className="museum-alcove-frame-case"
                    style={{ order: 1 }}
                    onClick={() => {
                      setSelectedItem(bronzeItem);
                      playMuseumChime(587.33);
                    }}
                    title="Click to view full-resolution certificate"
                  >
                    <span className="museum-frame-corner tl"></span>
                    <span className="museum-frame-corner tr"></span>
                    <span className="museum-frame-corner bl"></span>
                    <span className="museum-frame-corner br"></span>

                    <div className="museum-alcove-mat">
                      <div className="museum-alcove-img-wrapper">
                        <img
                          src={bronzeItem.image_url}
                          alt={bronzeItem.title}
                          className="museum-alcove-img"
                          loading="lazy"
                        />
                        <div className="museum-alcove-zoom-badge">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                          <span>Inspect Exhibit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ──────────────────────────────────────────────────────────────────
              WING III: COLLABORATIVE INNOVATION & SUMMITS (DUAL SALON)
              ────────────────────────────────────────────────────────────────── */}
          <section id="museum-wing-3" className="museum-exhibition-wing" aria-labelledby="wing-3-title">
            <div className="museum-wing-archway">
              <div className="museum-wing-badge">
                <strong>WING III</strong>
                <span>Collaborative Engineering &bull; Hackathons &amp; Summits</span>
              </div>
              <div className="museum-wing-curator-note">
                Room Depth: 75m &bull; IEEE India Council &amp; Engineers' Day Summits
              </div>
            </div>

            <div className="museum-alcove-stage">
              <h3 id="wing-3-title" className="museum-dossier-title" style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
                Engineering Summits &amp; Collaborative Innovation
              </h3>
              <p style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 2rem', color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Showcasing team-driven engineering endeavors: from celebrating Engineers' Day with prototype
                'Byte Built' to empowering women in technology with the IEEE India Council.
              </p>

              <div className="museum-salon-dual-grid">
                {/* Build Summit 2026 */}
                {buildSummitItem && (
                  <div className="museum-dual-card">
                    <div
                      className="museum-dual-img-box"
                      onClick={() => {
                        setSelectedItem(buildSummitItem);
                        playMuseumChime(523.25);
                      }}
                      title="Inspect Build Summit certificate"
                    >
                      <img
                        src={buildSummitItem.image_url}
                        alt={buildSummitItem.title}
                        className="museum-dual-img"
                        loading="lazy"
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <span className="badge" style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5', fontSize: '0.72rem' }}>
                        {buildSummitItem.badge}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-light)' }}>
                        {buildSummitItem.date}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px', color: 'var(--museum-charcoal)' }}>
                      {buildSummitItem.title}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem', flex: 1 }}>
                      {buildSummitItem.description}
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedItem(buildSummitItem)}
                    >
                      <span>Examine in Lightbox</span>
                    </button>
                  </div>
                )}

                {/* HERizon 2026 IEEE */}
                {herizonItem && (
                  <div className="museum-dual-card">
                    <div
                      className="museum-dual-img-box"
                      onClick={() => {
                        setSelectedItem(herizonItem);
                        playMuseumChime(659.25);
                      }}
                      title="Inspect HERizon IEEE certificate"
                    >
                      <img
                        src={herizonItem.image_url}
                        alt={herizonItem.title}
                        className="museum-dual-img"
                        loading="lazy"
                      />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                      <span className="badge" style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', fontSize: '0.72rem' }}>
                        {herizonItem.badge}
                      </span>
                      <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-light)' }}>
                        {herizonItem.date}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px', color: 'var(--museum-charcoal)' }}>
                      {herizonItem.title}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem', flex: 1 }}>
                      {herizonItem.description}
                    </p>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedItem(herizonItem)}
                    >
                      <span>Examine in Lightbox</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ──────────────────────────────────────────────────────────────────
              WING IV: THE ACADEMIC ACADEMY & DEGREE CREDITS
              ────────────────────────────────────────────────────────────────── */}
          {pythonItem && (
            <section id="museum-wing-4" className="museum-exhibition-wing" aria-labelledby="wing-4-title">
              <div className="museum-wing-archway">
                <div className="museum-wing-badge">
                  <strong>WING IV</strong>
                  <span>The Academy &bull; University Degree Credits</span>
                </div>
                <div className="museum-wing-curator-note">
                  Room Depth: 95m &bull; Course: 25GPA132 &bull; Programming in Python
                </div>
              </div>

              <div className="museum-alcove-stage">
                <div className="museum-alcove-downlight" style={{ left: '25%' }}></div>
                <div className="museum-alcove-grid">
                  {/* Framed Artwork Display */}
                  <div
                    className="museum-alcove-frame-case"
                    onClick={() => {
                      setSelectedItem(pythonItem);
                      playMuseumChime(523.25);
                    }}
                    title="Click to view full-resolution certificate"
                  >
                    <span className="museum-frame-corner tl"></span>
                    <span className="museum-frame-corner tr"></span>
                    <span className="museum-frame-corner bl"></span>
                    <span className="museum-frame-corner br"></span>

                    <div className="museum-alcove-mat">
                      <div className="museum-alcove-img-wrapper">
                        <img
                          src={pythonItem.image_url}
                          alt={pythonItem.title}
                          className="museum-alcove-img"
                          loading="lazy"
                        />
                        <div className="museum-alcove-zoom-badge">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                          <span>Inspect Exhibit</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Curatorial Dossier */}
                  <div className="museum-alcove-dossier">
                    <div className="museum-dossier-eyebrow">
                      <span className="badge" style={{ backgroundColor: 'rgba(5, 150, 105, 0.1)', color: '#059669', fontWeight: 600 }}>
                        {pythonItem.badge || '1 Academic Credit Earned'}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                        Session: {pythonItem.date}
                      </span>
                    </div>

                    <h3 id="wing-4-title" className="museum-dossier-title">
                      {pythonItem.title}
                    </h3>

                    {pythonItem.highlight && (
                      <div className="museum-dossier-highlight">
                        &bull; {pythonItem.highlight}
                      </div>
                    )}

                    <table className="museum-dossier-table">
                      <tbody>
                        <tr>
                          <td>Issuing Body</td>
                          <td>{pythonItem.issuer || pythonItem.meta_info}</td>
                        </tr>
                        {pythonItem.course && (
                          <tr>
                            <td>Course Code</td>
                            <td>
                              <code style={{ fontSize: '0.75rem', backgroundColor: 'var(--bg-subtle)', padding: '2px 5px', borderRadius: '3px' }}>
                                {pythonItem.course}
                              </code>
                            </td>
                          </tr>
                        )}
                        <tr>
                          <td>Degree Impact</td>
                          <td>1 Official Academic Credit Redeemed Toward University Degree</td>
                        </tr>
                        <tr>
                          <td>Integrity Verification</td>
                          <td>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.8rem' }}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                              Official Academic Transcript Record
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <p className="museum-dossier-desc">
                      {pythonItem.description}
                    </p>

                    <div className="museum-dossier-actions">
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelectedItem(pythonItem)}
                      >
                        <span>Examine in Lightbox</span>
                      </button>
                      <a
                        href={pythonItem.image_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                      >
                        <span>Raw Document</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

        </div>

        {/* =========================================================================
            ROOM 5: THE CURATOR'S PROVENANCE VAULT & COMPLETE ARCHIVE WALL
            ========================================================================= */}
        <section id="museum-vault" className="museum-vault-section" aria-labelledby="vault-heading">
          <div className="museum-vault-header">
            <span className="museum-vault-tag">
              Room Depth: 120m &bull; The Final Exhibition
            </span>
            <h2 id="vault-heading" className="museum-vault-title">
              The Curator's Provenance Vault
            </h2>
            <p className="museum-vault-subtitle">
              Filter and examine the complete archival registry of authentic credentials.
              Every document is cataloged with issuing authority records and institutional signatures.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="museum-filter-bar">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`museum-filter-btn ${filter === tab.id ? 'active' : ''}`}
                onClick={() => {
                  setFilter(tab.id);
                  playMuseumChime(440);
                }}
              >
                <span>{tab.label}</span>
                <span className="museum-filter-count">{tab.count}</span>
              </button>
            ))}
          </div>

          <ErrorAlert message={error} onDismiss={() => setError(null)} />

          {loading && <LoadingSpinner message="Consulting verified academic records database..." />}

          {/* Exhibition Wall Grid */}
          {!loading && (
            <div className="museum-vault-grid">
              {items.map((item) => (
                <div key={item.id} className="museum-vault-card">
                  {/* Header with Exhibit Number & Rotunda Jump */}
                  <div className="museum-vault-card-header">
                    <span className="museum-vault-index">
                      EXHIBIT № {String(item.id).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      className="museum-vault-stage-jump"
                      onClick={() => {
                        const rotundaEl = document.getElementById('museum-rotunda');
                        if (rotundaEl) {
                          rotundaEl.scrollIntoView({ behavior: 'smooth' });
                          const idx = allCredentials.findIndex((c) => c.id === item.id);
                          if (idx !== -1) setFocusedIndex(idx);
                        }
                      }}
                      title="Mount this artwork on the 3D Rotunda above"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      <span>Rotunda &uarr;</span>
                    </button>
                  </div>

                  {/* Framed Thumbnail Preview */}
                  <div
                    className="museum-vault-preview"
                    onClick={() => {
                      setSelectedItem(item);
                      playMuseumChime(523.25);
                    }}
                    title="Click to view full-resolution certificate"
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="museum-vault-img"
                      loading="lazy"
                    />
                    <div className="museum-vault-view-tag">
                      <span>Inspect</span>
                      <span aria-hidden="true">&nearr;</span>
                    </div>
                  </div>

                  {/* Badges & Date */}
                  <div className="museum-vault-meta">
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

                  <h3 className="museum-vault-title">
                    {item.title}
                  </h3>

                  <div className="museum-vault-issuer">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent-green)' }}>
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>{item.issuer || item.meta_info}</span>
                  </div>

                  <p className="museum-vault-desc">
                    {item.description}
                  </p>

                  <div className="museum-vault-actions">
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

                    {item.verification_url && (
                      <a
                        href={item.verification_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-outline"
                        style={{ fontSize: '0.75rem', padding: '0.4rem 0.65rem' }}
                      >
                        Verify &nearr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Institutional Credential Guarantee Banner */}
          <div className="museum-guarantee-banner">
            <div className="museum-guarantee-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="museum-guarantee-text">
              <h4>Institutional Credential Authenticity Guarantee</h4>
              <p>
                All certificates exhibited in this museum represent authentic proof-of-work. Digital credentials
                are backed by verifiable authorities including Microsoft Corporation, Certiport, IEEE India Council,
                and Chandigarh University. Cryptographic validation keys and institutional signatures remain
                permanently archived for verifiable provenance.
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
                  padding: '0.4rem 0.85rem'
                }}
              >
                ● 100% Backed Proof of Work
              </span>
            </div>
          </div>
        </section>

        {/* Full-Screen Archival Lightbox Modal */}
        <LightboxModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </div>
  );
}
