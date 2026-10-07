import React from 'react';

export default function CpuIllustration() {
  return (
    <div className="cpu-visual-wrapper" aria-hidden="true">
      {/* Ambient background glow orbs */}
      <div className="cpu-glow-orb orb-lavender"></div>
      <div className="cpu-glow-orb orb-sage"></div>
      <div className="cpu-glow-orb orb-blush"></div>

      {/* Floating Micro Particles */}
      <div className="floating-particle float-item-1 text-mono">01</div>
      <div className="floating-particle float-item-2 text-mono">101</div>
      <div className="floating-particle float-item-3 text-mono">✦</div>
      <div className="floating-particle float-item-4 text-mono">010</div>
      <div className="floating-particle float-item-5 text-mono">•</div>
      <div className="floating-particle float-item-6 text-mono">11</div>
      <div className="floating-particle float-item-7 text-mono">✦</div>

      {/* Main Abstract Architecture SVG Visual */}
      <svg
        className="cpu-svg-art"
        viewBox="0 0 540 540"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle gradients */}
          <linearGradient id="dieGrad" x1="120" y1="120" x2="420" y2="420" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ede9fe" stopOpacity="0.6" />
          </linearGradient>

          <linearGradient id="coreGrad" x1="190" y1="190" x2="350" y2="350" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.75" />
          </linearGradient>

          <linearGradient id="circuitGrad" x1="0" y1="0" x2="540" y2="540" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id="goldBus" x1="200" y1="200" x2="340" y2="340" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.4" />
          </linearGradient>

          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Circular Radial Guides */}
        <circle cx="270" cy="270" r="240" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 8" opacity="0.6" />
        <circle cx="270" cy="270" r="190" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />

        {/* Outer Data Bus Traces */}
        <g className="circuit-lines" stroke="url(#circuitGrad)" strokeWidth="1.5" strokeLinecap="round">
          {/* Top Traces */}
          <path d="M270 40 V130" />
          <path d="M220 50 V110 L240 130" />
          <path d="M320 50 V110 L300 130" />
          <path d="M170 80 H200 L220 130" />
          <path d="M370 80 H340 L320 130" />

          {/* Bottom Traces */}
          <path d="M270 500 V410" />
          <path d="M220 490 V430 L240 410" />
          <path d="M320 490 V430 L300 410" />
          <path d="M170 460 H200 L220 410" />
          <path d="M370 460 H340 L320 410" />

          {/* Left Traces */}
          <path d="M40 270 H130" />
          <path d="M50 220 H110 L130 240" />
          <path d="M50 320 H110 L130 300" />

          {/* Right Traces */}
          <path d="M500 270 H410" />
          <path d="M490 220 H430 L410 240" />
          <path d="M490 320 H430 L410 300" />
        </g>

        {/* Pulse dots moving on circuit traces */}
        <circle className="pulse-dot dot-1" cx="270" cy="80" r="2.5" fill="#6366f1" filter="url(#softGlow)" />
        <circle className="pulse-dot dot-2" cx="340" cy="270" r="2.5" fill="#0284c7" filter="url(#softGlow)" />
        <circle className="pulse-dot dot-3" cx="270" cy="450" r="2.5" fill="#a855f7" filter="url(#softGlow)" />
        <circle className="pulse-dot dot-4" cx="90" cy="270" r="2.5" fill="#14b8a6" filter="url(#softGlow)" />

        {/* Outer Ceramic Substrate / Heat Spreader Package */}
        <rect
          x="120"
          y="120"
          width="300"
          height="300"
          rx="28"
          fill="url(#dieGrad)"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          filter="drop-shadow(0 20px 30px rgba(15, 23, 42, 0.06))"
        />

        {/* Pin Alignment Marker */}
        <circle cx="145" cy="145" r="5" fill="#94a3b8" opacity="0.6" />

        {/* Architectural Die Boundary */}
        <rect
          x="155"
          y="155"
          width="230"
          height="230"
          rx="18"
          fill="#ffffff"
          stroke="#e2e8f0"
          strokeWidth="1.5"
          opacity="0.9"
        />

        {/* Architectural Layout: Cache / ALU / Control Units */}
        {/* L1 / L2 Cache Matrix (Top Half) */}
        <g stroke="#cbd5e1" strokeWidth="1" fill="#f8fafc">
          <rect x="175" y="175" width="45" height="30" rx="4" />
          <rect x="225" y="175" width="45" height="30" rx="4" />
          <rect x="275" y="175" width="45" height="30" rx="4" />
          <rect x="325" y="175" width="40" height="30" rx="4" />

          {/* Text labels in micro-scale */}
          <text x="186" y="194" fill="#64748b" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">L1$</text>
          <text x="236" y="194" fill="#64748b" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">L2$</text>
          <text x="286" y="194" fill="#64748b" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">TAG</text>
          <text x="333" y="194" fill="#64748b" fontSize="8" fontFamily="var(--font-mono)" fontWeight="600">SET</text>
        </g>

        {/* Central Core Die (ALU + Registers) */}
        <rect
          x="175"
          y="220"
          width="190"
          height="145"
          rx="12"
          fill="url(#coreGrad)"
          stroke="#cbd5e1"
          strokeWidth="1"
        />

        {/* Internal Core Blocks */}
        <g>
          {/* ALU Block */}
          <rect x="190" y="235" width="75" height="55" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <text x="215" y="260" fill="#334155" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">ALU</text>
          <text x="202" y="276" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">Arithmetic</text>

          {/* Control Unit */}
          <rect x="275" y="235" width="75" height="55" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <text x="296" y="260" fill="#334155" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700">CTRL</text>
          <text x="286" y="276" fill="#94a3b8" fontSize="7" fontFamily="var(--font-mono)">Sequencer</text>

          {/* Register Bank */}
          <rect x="190" y="302" width="160" height="50" rx="6" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <text x="226" y="324" fill="#334155" fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">REGISTER FILE</text>
          
          {/* Miniature register slots */}
          <g fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="0.5">
            <rect x="202" y="332" width="28" height="12" rx="2" />
            <rect x="235" y="332" width="28" height="12" rx="2" />
            <rect x="268" y="332" width="28" height="12" rx="2" />
            <rect x="301" y="332" width="28" height="12" rx="2" />
          </g>
          <text x="208" y="341" fill="#64748b" fontSize="6" fontFamily="var(--font-mono)">$R0</text>
          <text x="241" y="341" fill="#64748b" fontSize="6" fontFamily="var(--font-mono)">$R1</text>
          <text x="274" y="341" fill="#64748b" fontSize="6" fontFamily="var(--font-mono)">$PC</text>
          <text x="307" y="341" fill="#64748b" fontSize="6" fontFamily="var(--font-mono)">$SP</text>
        </g>

        {/* Center Interconnect Bus Ring */}
        <circle cx="270" cy="270" r="16" fill="none" stroke="url(#goldBus)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
        <circle cx="270" cy="270" r="5" fill="#6366f1" opacity="0.85" filter="url(#softGlow)" />
      </svg>
    </div>
  );
}
