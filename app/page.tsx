'use client'

import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&family=Instrument+Serif:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #060810;
          --surface:   #0a0d16;
          --glass:     rgba(255,255,255,0.03);
          --glass-b:   rgba(139,92,246,0.15);
          --violet:    #7c3aed;
          --violet-l:  #a855f7;
          --gold:      #d97706;
          --gold-l:    #f59e0b;
          --green:     #059669;
          --red:       #dc2626;
          --text:      #e2e8f0;
          --muted:     #475569;
          --border:    rgba(139,92,246,0.12);
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'Syne', sans-serif;
          overflow-x: hidden;
          cursor: none;
        }

        .cursor {
          position: fixed;
          width: 8px; height: 8px;
          background: var(--violet-l);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.1s ease;
          mix-blend-mode: screen;
        }
        .cursor-ring {
          position: fixed;
          width: 32px; height: 32px;
          border: 1px solid rgba(168,85,247,0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transition: transform 0.15s ease;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          opacity: 0.4;
        }

        .ambient {
          position: fixed;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
          transform: translate(-50%, -50%);
          transition: left 0.4s ease, top 0.4s ease;
        }

        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 1.25rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s, background 0.3s;
        }
        nav.scrolled {
          background: rgba(6,8,16,0.85);
          backdrop-filter: blur(20px);
          border-color: var(--border);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .s-mark { width: 36px; height: 36px; }
        .s-mark svg { width: 100%; height: 100%; }

        .logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.1rem;
          letter-spacing: 0.08em;
          color: var(--text);
        }
        .logo-text span { color: var(--violet-l); }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          list-style: none;
        }
        .nav-links a {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--text); }

        .nav-cta {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--violet-l);
          text-decoration: none;
          border: 1px solid rgba(168,85,247,0.3);
          padding: 0.5rem 1.25rem;
          border-radius: 2px;
          transition: all 0.2s;
        }
        .nav-cta:hover {
          background: rgba(124,58,237,0.1);
          border-color: var(--violet-l);
          color: #fff;
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8rem 2rem 4rem;
          text-align: center;
          overflow: hidden;
          z-index: 2;
        }

        .hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }

        .hero-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--gold-l);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.2s forwards;
        }
        .hero-tag::before, .hero-tag::after {
          content: '';
          width: 24px; height: 1px;
          background: var(--gold);
        }

        .hero-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(3rem, 8vw, 7rem);
          line-height: 0.95;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.4s forwards;
        }

        .hero-title .line-1 { display: block; color: var(--text); }
        .hero-title .line-2 {
          display: block;
          background: linear-gradient(135deg, var(--violet-l) 0%, #c084fc 50%, var(--gold-l) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: italic;
          font-family: 'Instrument Serif', serif;
          font-size: 0.95em;
        }

        .hero-sub {
          font-family: 'DM Mono', monospace;
          font-size: 0.9rem;
          color: var(--muted);
          max-width: 500px;
          line-height: 1.7;
          margin-bottom: 3rem;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.6s forwards;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          opacity: 0;
          animation: fadeUp 0.8s ease 0.8s forwards;
        }

        .btn-primary {
          background: var(--violet);
          color: #fff;
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.875rem 2rem;
          border-radius: 2px;
          border: none;
          cursor: none;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          display: inline-block;
        }
        .btn-primary:hover { background: var(--violet-l); transform: translateY(-1px); }

        .btn-ghost {
          color: var(--muted);
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.875rem 2rem;
          border-radius: 2px;
          border: 1px solid var(--border);
          transition: all 0.3s;
          cursor: none;
          display: inline-block;
        }
        .btn-ghost:hover {
          color: var(--text);
          border-color: rgba(139,92,246,0.3);
        }

        .ticker {
          margin-top: 5rem;
          width: 100%;
          max-width: 800px;
          opacity: 0;
          animation: fadeUp 0.8s ease 1s forwards;
        }

        .ticker-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 0.75rem;
          text-align: left;
        }

        .ticker-card {
          background: var(--glass);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }
        .ticker-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--violet), transparent);
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .ticker-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        .ticker-dot.bullish { background: var(--green); }
        .ticker-dot.bearish { background: var(--red); }

        .ticker-symbol {
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text);
        }
        .ticker-tf {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          color: var(--muted);
          background: rgba(255,255,255,0.04);
          padding: 0.15rem 0.4rem;
          border-radius: 2px;
        }
        .ticker-type {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
        }
        .ticker-type.bullish { color: var(--green); }
        .ticker-type.bearish { color: var(--red); }

        .stats {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }

        .stat {
          background: var(--bg);
          padding: 3rem 2rem;
          text-align: center;
        }

        .stat-number {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 3.5rem;
          line-height: 1;
          background: linear-gradient(135deg, var(--text) 0%, var(--muted) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }
        .stat-number.accent {
          background: linear-gradient(135deg, var(--violet-l), var(--gold-l));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .features {
          position: relative;
          z-index: 2;
          padding: 8rem 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .section-header { margin-bottom: 4rem; }

        .section-tag {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--violet-l);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .section-tag::before {
          content: '';
          width: 16px; height: 1px;
          background: var(--violet);
        }

        .section-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
        }
        .section-title em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          color: var(--violet-l);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
        }

        .feature {
          background: var(--bg);
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .feature:hover { background: rgba(124,58,237,0.04); }
        .feature::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--violet), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .feature:hover::before { opacity: 1; }

        .feature-num {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: var(--violet-l);
          margin-bottom: 1.5rem;
          opacity: 0.6;
        }

        .feature-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 0.75rem;
          color: var(--text);
        }

        .feature-desc {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          line-height: 1.7;
          color: var(--muted);
        }

        .pricing {
          position: relative;
          z-index: 2;
          padding: 8rem 3rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          margin-top: 4rem;
        }

        .plan {
          background: var(--bg);
          padding: 3rem;
          position: relative;
          overflow: hidden;
        }

        .plan.featured { background: rgba(124,58,237,0.05); }
        .plan.featured::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--violet), var(--violet-l), var(--gold));
        }

        .plan-badge {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--gold-l);
          background: rgba(217,119,6,0.1);
          border: 1px solid rgba(217,119,6,0.2);
          padding: 0.25rem 0.75rem;
          border-radius: 2px;
          display: inline-block;
          margin-bottom: 1.5rem;
        }

        .plan-name {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .plan-price {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 3rem;
          line-height: 1;
          margin-bottom: 0.5rem;
          color: var(--text);
        }
        .plan-price span {
          font-size: 1rem;
          font-weight: 400;
          color: var(--muted);
          font-family: 'DM Mono', monospace;
        }

        .plan-desc {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          color: var(--muted);
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .plan-features {
          list-style: none;
          margin-bottom: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .plan-features li {
          font-family: 'DM Mono', monospace;
          font-size: 0.78rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .plan-features li::before {
          content: '—';
          color: var(--violet-l);
          font-size: 0.65rem;
        }
        .plan-features li.active { color: var(--text); }
        .plan-features li.inactive { opacity: 0.35; }

        .cta-section {
          position: relative;
          z-index: 2;
          padding: 8rem 3rem;
          text-align: center;
          border-top: 1px solid var(--border);
        }

        .cta-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: clamp(2.5rem, 5vw, 5rem);
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 1.5rem;
        }
        .cta-title em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          background: linear-gradient(135deg, var(--violet-l), var(--gold-l));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        footer {
          position: relative;
          z-index: 2;
          padding: 2rem 3rem;
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-text {
          font-family: 'DM Mono', monospace;
          font-size: 0.7rem;
          color: var(--muted);
          letter-spacing: 0.05em;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }

        @media (max-width: 768px) {
          nav { padding: 1rem 1.5rem; }
          .nav-links { display: none; }
          .features-grid { grid-template-columns: 1fr; }
          .pricing-grid { grid-template-columns: 1fr; }
          .stats { grid-template-columns: 1fr; }
          .features, .pricing { padding: 4rem 1.5rem; }
          footer { flex-direction: column; gap: 1rem; text-align: center; }
          .ticker-card { flex-wrap: wrap; gap: 0.75rem; }
        }
      `}</style>

      <div className="cursor" style={{ left: mousePos.x - 4, top: mousePos.y - 4 }} />
      <div className="cursor-ring" style={{ left: mousePos.x - 16, top: mousePos.y - 16 }} />
      <div className="ambient" style={{ left: mousePos.x, top: mousePos.y }} />

      <nav className={scrollY > 20 ? 'scrolled' : ''}>
        <a href="/" className="logo">
          <div className="s-mark">
            <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="18" y1="2" x2="18" y2="34" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
              <path d="M26 11c0-3.866-3.582-7-8-7s-8 3.134-8 7c0 3.866 3.582 7 8 7s8 3.134 8 7c0 3.866-3.582 7-8 7s-8-3.134-8-7" stroke="url(#sg)" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
              <rect x="14" y="6" width="8" height="10" rx="1" fill="rgba(124,58,237,0.25)" stroke="#a855f7" strokeWidth="0.75"/>
              <rect x="14" y="20" width="8" height="10" rx="1" fill="rgba(217,119,6,0.2)" stroke="#f59e0b" strokeWidth="0.75"/>
              <defs>
                <linearGradient id="sg" x1="10" y1="4" x2="26" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#a855f7"/>
                  <stop offset="100%" stopColor="#f59e0b"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="logo-text">SPOTEX <span>CORE</span></span>
        </a>
        <ul className="nav-links">
          <li><a href="#features">Engine</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <a href="/auth/signup" className="nav-cta">Get Access</a>
      </nav>

      <section className="hero" ref={heroRef}>
        <div className="hero-tag">Smart Money Detection Engine</div>
        <h1 className="hero-title">
          <span className="line-1">See What</span>
          <span className="line-2">Institutions See</span>
        </h1>
        <p className="hero-sub">
          Multi-timeframe Break of Structure detection powered by Smart Money Concepts.
          Real signals. No noise. Your edge in the market.
        </p>
        <div className="hero-actions">
          <a href="/auth/signup" className="btn-primary">Start Free — 3 Months</a>
          <a href="#features" className="btn-ghost">How it works</a>
        </div>
        <div className="ticker">
          <div className="ticker-label">⬡ Live detections</div>
          <div className="ticker-card">
            {[
              { symbol: 'BTCUSDT', tf: '4H', type: 'Bullish BOS', dir: 'bullish' },
              { symbol: 'ETHUSDT', tf: '1H', type: 'Bearish BOS', dir: 'bearish' },
              { symbol: 'SOLUSDT', tf: '4H', type: 'Bullish BOS', dir: 'bullish' },
              { symbol: 'BNBUSDT', tf: '15m', type: 'Bearish BOS', dir: 'bearish' },
            ].map((s, i) => (
              <div key={i} className="ticker-item">
                <div className={`ticker-dot ${s.dir}`} />
                <span className="ticker-symbol">{s.symbol}</span>
                <span className="ticker-tf">{s.tf}</span>
                <span className={`ticker-type ${s.dir}`}>{s.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="stats">
        <div className="stat">
          <div className="stat-number accent">50+</div>
          <div className="stat-label">Pairs Monitored</div>
        </div>
        <div className="stat">
          <div className="stat-number">4</div>
          <div className="stat-label">Timeframes</div>
        </div>
        <div className="stat">
          <div className="stat-number accent">24/7</div>
          <div className="stat-label">Always Running</div>
        </div>
      </div>

      <section className="features" id="features">
        <div className="section-header">
          <div className="section-tag">The Engine</div>
          <h2 className="section-title">Built on <em>institutional</em><br />price structure</h2>
        </div>
        <div className="features-grid">
          {[
            { num: '01', title: 'Break of Structure', desc: 'Detects bullish and bearish BOS across 5m, 15m, 1H and 4H simultaneously. No lagging indicators — pure price action.' },
            { num: '02', title: 'Order Block Detection', desc: 'Identifies 1-candle and 2-candle order blocks with Fair Value Gap confirmation. Knows when price returns to mitigate.' },
            { num: '03', title: 'Multi-Timeframe Logic', desc: 'Higher timeframe BOS cascades down to lower timeframes automatically. See the full picture, not just one slice.' },
            { num: '04', title: 'Instant Alerts', desc: 'Telegram notifications the moment a signal fires. No delayed data. No missed setups. Your phone knows first.' },
            { num: '05', title: 'Personalised Dashboard', desc: 'Your pairs, your timeframes, your view. Toggle symbols on and off. Favourite the setups you care about.' },
            { num: '06', title: 'Always On', desc: 'Runs on cloud infrastructure 24 hours a day. No PC required. No manual execution. Just signals.' },
          ].map((f, i) => (
            <div key={i} className="feature">
              <div className="feature-num">{f.num}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="section-header">
          <div className="section-tag">Pricing</div>
          <h2 className="section-title">Start <em>free.</em><br />Upgrade when ready.</h2>
        </div>
        <div className="pricing-grid">
          <div className="plan">
            <div className="plan-name">Core</div>
            <div className="plan-price">$0<span>/mo</span></div>
            <div className="plan-desc">After your 3-month full access trial. No card required to start.</div>
            <ul className="plan-features">
              <li className="active">BTC, ETH, SOL, BNB, XRP</li>
              <li className="active">1H and 4H timeframes</li>
              <li className="active">Live dashboard</li>
              <li className="active">7-day signal history</li>
              <li className="inactive">Telegram alerts</li>
              <li className="inactive">15m and 5m signals</li>
              <li className="inactive">Order block details</li>
              <li className="inactive">Custom watchlist</li>
            </ul>
            <a href="/auth/signup" className="btn-ghost" style={{display:'block',textAlign:'center'}}>Start Free</a>
          </div>
          <div className="plan featured">
            <div className="plan-badge">3 Months Free</div>
            <div className="plan-name">Premium</div>
            <div className="plan-price">$19<span>/mo</span></div>
            <div className="plan-desc">Full access. Everything included. Cancel anytime.</div>
            <ul className="plan-features">
              <li className="active">All 50+ pairs</li>
              <li className="active">All timeframes (5m–4H)</li>
              <li className="active">Real-time Telegram alerts</li>
              <li className="active">Unlimited signal history</li>
              <li className="active">Order block details</li>
              <li className="active">Custom watchlist</li>
              <li className="active">Email alerts</li>
              <li className="active">Priority support</li>
            </ul>
            <a href="/auth/signup" className="btn-primary" style={{display:'block',textAlign:'center'}}>Get Full Access Free</a>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">
          The market does not wait.<br />
          <em>Neither should you.</em>
        </h2>
        <div style={{marginTop:'2.5rem'}}>
          <a href="/auth/signup" className="btn-primary">Start Your 3 Months Free</a>
        </div>
      </section>

      <footer>
        <div className="footer-text">© 2026 Spotex Core. Smart Money Detection.</div>
        <div className="footer-text" style={{display:'flex',gap:'2rem'}}>
          <a href="#" style={{color:'inherit',textDecoration:'none'}}>Terms</a>
          <a href="#" style={{color:'inherit',textDecoration:'none'}}>Privacy</a>
          <a href="#" style={{color:'inherit',textDecoration:'none'}}>Contact</a>
        </div>
      </footer>
    </>
  )
}
