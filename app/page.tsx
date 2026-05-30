'use client'

import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: '#080B14', color: '#F1F5F9' }}>

      {/* Ambient background glows */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse 80% 50% at 20% 10%, rgba(124,58,237,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(124,58,237,0.05) 0%, transparent 60%),
          radial-gradient(ellipse 40% 30% at 50% 50%, rgba(245,158,11,0.03) 0%, transparent 70%)
        `
      }} />

      {/* Noise texture overlay */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px'
      }} />

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        borderBottom: '1px solid rgba(124,58,237,0.1)',
        backdropFilter: 'blur(20px)',
        background: 'rgba(8,11,20,0.8)',
        padding: '0 2rem',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* S Logo Mark */}
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="rgba(124,58,237,0.15)" />
            {/* Abstract S with candlestick integrated */}
            <path d="M20 8 C20 8 12 8 12 12 C12 16 20 14 20 18 C20 22 12 22 12 22" 
              stroke="url(#sgrad)" strokeWidth="2" strokeLinecap="round" fill="none"/>
            {/* Candlestick wick through the S */}
            <line x1="16" y1="5" x2="16" y2="27" stroke="rgba(245,158,11,0.6)" strokeWidth="1" strokeLinecap="round"/>
            {/* Candle body */}
            <rect x="14" y="11" width="4" height="8" rx="1" fill="rgba(245,158,11,0.8)"/>
            <defs>
              <linearGradient id="sgrad" x1="12" y1="8" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#7C3AED"/>
                <stop offset="100%" stopColor="#A855F7"/>
              </linearGradient>
            </defs>
          </svg>
          <span style={{ 
            fontFamily: "'Syne', sans-serif", 
            fontWeight: 800, 
            fontSize: '1.1rem',
            letterSpacing: '0.05em',
            background: 'linear-gradient(135deg, #F1F5F9 0%, rgba(168,85,247,0.8) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            SPOTEX CORE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="#how" style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'none', letterSpacing: '0.05em' }}>HOW IT WORKS</a>
          <a href="#pricing" style={{ fontSize: '0.85rem', color: '#64748B', textDecoration: 'none', letterSpacing: '0.05em' }}>PRICING</a>
          <a href="/login" style={{ 
            fontSize: '0.85rem', color: '#A855F7', textDecoration: 'none', letterSpacing: '0.05em'
          }}>SIGN IN</a>
          <a href="/signup" style={{
            fontSize: '0.82rem',
            padding: '8px 20px',
            background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
            borderRadius: '6px',
            color: '#fff',
            textDecoration: 'none',
            letterSpacing: '0.05em',
            border: '1px solid rgba(168,85,247,0.3)',
            boxShadow: '0 0 20px rgba(124,58,237,0.2)'
          }}>
            GET STARTED FREE
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 2rem 80px',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 16px',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: '100px',
          marginBottom: '2.5rem',
          background: 'rgba(245,158,11,0.05)',
          animation: 'fadeUp 0.8s ease forwards'
        }}>
          <span style={{ 
            width: '6px', height: '6px', borderRadius: '50%', 
            background: '#F59E0B',
            boxShadow: '0 0 8px rgba(245,158,11,0.8)',
            animation: 'pulse 2s infinite'
          }}/>
          <span style={{ fontSize: '0.75rem', color: '#F59E0B', letterSpacing: '0.15em', fontFamily: "'Syne', sans-serif" }}>
            LIVE SIGNALS · 50 PAIRS · 4 TIMEFRAMES
          </span>
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(2.8rem, 7vw, 6rem)',
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem',
          maxWidth: '900px',
          animation: 'fadeUp 0.8s ease 0.1s both'
        }}>
          <span style={{ 
            background: 'linear-gradient(135deg, #F1F5F9 0%, #CBD5E1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Where Smart Money
          </span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #F59E0B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Meets Intelligence
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: '#64748B',
          maxWidth: '560px',
          lineHeight: 1.7,
          marginBottom: '3rem',
          fontFamily: "'DM Sans', sans-serif",
          animation: 'fadeUp 0.8s ease 0.2s both'
        }}>
          Institutional-grade Break of Structure detection across multiple timeframes. 
          Built on Smart Money Concepts. Real-time alerts. No noise.
        </p>

        <div style={{ 
          display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center',
          animation: 'fadeUp 0.8s ease 0.3s both'
        }}>
          <a href="/signup" style={{
            padding: '14px 36px',
            background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
            borderRadius: '8px',
            color: '#fff',
            textDecoration: 'none',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: '0.9rem',
            letterSpacing: '0.08em',
            border: '1px solid rgba(168,85,247,0.4)',
            boxShadow: '0 0 40px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            transition: 'all 0.2s ease'
          }}>
            START FREE — 3 MONTHS FULL ACCESS
          </a>
          <a href="#how" style={{
            padding: '14px 36px',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '8px',
            color: '#94A3B8',
            textDecoration: 'none',
            fontFamily: "'Syne', sans-serif",
            fontWeight: 600,
            fontSize: '0.9rem',
            letterSpacing: '0.08em',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.2s ease'
          }}>
            SEE HOW IT WORKS
          </a>
        </div>

        {/* Live signal card preview */}
        <div style={{
          marginTop: '5rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          animation: 'fadeUp 0.8s ease 0.4s both'
        }}>
          {[
            { symbol: 'BTCUSDT', tf: '4H', type: 'Bullish BOS', price: '67,842', color: '#10B981' },
            { symbol: 'ETHUSDT', tf: '1H', type: 'Bearish BOS', price: '3,421', color: '#EF4444' },
            { symbol: 'SOLUSDT', tf: '4H', type: 'Bullish BOS', price: '142.5', color: '#10B981' },
          ].map((signal, i) => (
            <div key={i} style={{
              padding: '16px 24px',
              background: 'rgba(13,20,33,0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(124,58,237,0.15)',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
              minWidth: '200px',
              textAlign: 'left',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Glow top border */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: `linear-gradient(90deg, transparent, ${signal.color}40, transparent)`
              }}/>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#F1F5F9' }}>
                  {signal.symbol}
                </span>
                <span style={{ 
                  fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px',
                  background: 'rgba(124,58,237,0.15)', color: '#A855F7',
                  fontFamily: "'Syne', sans-serif", letterSpacing: '0.1em'
                }}>
                  {signal.tf}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: signal.color, fontWeight: 600, marginBottom: '4px', fontFamily: "'DM Sans', sans-serif" }}>
                {signal.type === 'Bullish BOS' ? '▲' : '▼'} {signal.type}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#475569', fontFamily: "'DM Sans', sans-serif" }}>
                ${signal.price}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats bar */}
      <section style={{
        borderTop: '1px solid rgba(124,58,237,0.1)',
        borderBottom: '1px solid rgba(124,58,237,0.1)',
        padding: '3rem 2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '4rem',
        flexWrap: 'wrap',
        background: 'rgba(124,58,237,0.03)',
        position: 'relative',
        zIndex: 1
      }}>
        {[
          { value: '50+', label: 'Trading Pairs' },
          { value: '4', label: 'Timeframes' },
          { value: '24/7', label: 'Live Detection' },
          { value: '< 1s', label: 'Alert Speed' },
        ].map((stat, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '2.2rem',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #F1F5F9, #A855F7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '4px'
            }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#475569', letterSpacing: '0.1em', fontFamily: "'Syne', sans-serif" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section id="how" style={{ padding: '8rem 2rem', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#7C3AED', letterSpacing: '0.2em', fontFamily: "'Syne', sans-serif", marginBottom: '1rem' }}>
            THE ENGINE
          </p>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#F1F5F9',
            letterSpacing: '-0.02em'
          }}>
            Built on Smart Money Concepts
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              step: '01',
              title: 'Structure Detection',
              desc: 'Our engine scans swing highs and lows across 50 major pairs every hour. No indicators. Pure price action.',
              icon: '◈'
            },
            {
              step: '02',
              title: 'BOS Confirmation',
              desc: 'When price closes above a swing high (bullish) or below a swing low (bearish), a Break of Structure is confirmed.',
              icon: '⬡'
            },
            {
              step: '03',
              title: 'Order Block Analysis',
              desc: 'We identify the institutional order blocks and Fair Value Gaps associated with each BOS event.',
              icon: '◎'
            },
            {
              step: '04',
              title: 'Instant Alert',
              desc: 'The moment a signal is confirmed, your Telegram receives a detailed alert with symbol, timeframe, and price.',
              icon: '⚡'
            },
          ].map((item, i) => (
            <div key={i} style={{
              padding: '2rem',
              background: 'rgba(13,20,33,0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(124,58,237,0.12)',
              borderRadius: '16px',
              position: 'relative',
              overflow: 'hidden',
              transition: 'border-color 0.3s ease'
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)'
              }}/>
              <div style={{ 
                fontSize: '0.7rem', color: '#7C3AED', fontFamily: "'Syne', sans-serif",
                letterSpacing: '0.2em', marginBottom: '1rem'
              }}>
                {item.step}
              </div>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
              <h3 style={{ 
                fontFamily: "'Syne', sans-serif", fontWeight: 700, 
                fontSize: '1.1rem', color: '#F1F5F9', marginBottom: '0.75rem'
              }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.7, fontFamily: "'DM Sans', sans-serif" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <p style={{ fontSize: '0.75rem', color: '#7C3AED', letterSpacing: '0.2em', fontFamily: "'Syne', sans-serif", marginBottom: '1rem' }}>
            PRICING
          </p>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            color: '#F1F5F9',
            letterSpacing: '-0.02em',
            marginBottom: '1rem'
          }}>
            Start free. Upgrade when ready.
          </h2>
          <p style={{ color: '#475569', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem' }}>
            No card required. Full access for your first 3 months.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '1.5rem',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Free tier */}
          <div style={{
            padding: '2.5rem',
            background: 'rgba(13,20,33,0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
          }}>
            <p style={{ fontSize: '0.75rem', color: '#475569', letterSpacing: '0.15em', fontFamily: "'Syne', sans-serif", marginBottom: '1rem' }}>
              AFTER TRIAL
            </p>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.8rem', fontWeight: 800, color: '#F1F5F9', marginBottom: '0.5rem' }}>
              Free
            </h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif", marginBottom: '2rem' }}>
              Core signals, limited pairs
            </p>
            {[
              '5 major pairs (BTC, ETH, SOL, BNB, XRP)',
              '1H and 4H timeframes only',
              'Dashboard access',
              '7 days signal history',
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#475569', fontSize: '0.9rem' }}>—</span>
                <span style={{ color: '#64748B', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
              </div>
            ))}
          </div>

          {/* Premium tier */}
          <div style={{
            padding: '2.5rem',
            background: 'rgba(13,20,33,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 0 60px rgba(124,58,237,0.1)'
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, #7C3AED, #A855F7, #F59E0B)'
            }}/>
            <div style={{
              position: 'absolute', top: '1.5rem', right: '1.5rem',
              padding: '4px 12px',
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: '100px',
              fontSize: '0.7rem',
              color: '#F59E0B',
              fontFamily: "'Syne', sans-serif",
              letterSpacing: '0.1em'
            }}>
              POPULAR
            </div>
            <p style={{ fontSize: '0.75rem', color: '#7C3AED', letterSpacing: '0.15em', fontFamily: "'Syne', sans-serif", marginBottom: '1rem' }}>
              PREMIUM
            </p>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.8rem', fontWeight: 800, color: '#F1F5F9', marginBottom: '0.25rem' }}>
              $19<span style={{ fontSize: '1rem', color: '#475569' }}>/month</span>
            </h3>
            <p style={{ color: '#475569', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif", marginBottom: '2rem' }}>
              Everything, unlimited
            </p>
            {[
              'All 50+ trading pairs',
              'All timeframes (5m, 15m, 1H, 4H)',
              'Real-time Telegram alerts',
              'Full order block details',
              'Unlimited signal history',
              'Custom pair watchlist',
              'Email alerts',
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#7C3AED', fontSize: '0.9rem' }}>✦</span>
                <span style={{ color: '#94A3B8', fontSize: '0.9rem', fontFamily: "'DM Sans', sans-serif" }}>{f}</span>
              </div>
            ))}
            <a href="/signup" style={{
              display: 'block',
              marginTop: '2rem',
              padding: '14px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
              borderRadius: '8px',
              color: '#fff',
              textDecoration: 'none',
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              border: '1px solid rgba(168,85,247,0.3)',
              boxShadow: '0 0 30px rgba(124,58,237,0.3)'
            }}>
              START FREE — NO CARD NEEDED
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '8rem 2rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(124,58,237,0.1)'
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}/>
        <p style={{ fontSize: '0.75rem', color: '#7C3AED', letterSpacing: '0.2em', fontFamily: "'Syne', sans-serif", marginBottom: '1.5rem' }}>
          GET STARTED
        </p>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 800,
          color: '#F1F5F9',
          letterSpacing: '-0.02em',
          marginBottom: '1.5rem',
          maxWidth: '700px',
          margin: '0 auto 1.5rem'
        }}>
          See what the smart money is doing. Right now.
        </h2>
        <p style={{ color: '#475569', fontFamily: "'DM Sans', sans-serif", marginBottom: '3rem', fontSize: '1rem' }}>
          3 months full access. No credit card. Cancel anytime.
        </p>
        <a href="/signup" style={{
          display: 'inline-block',
          padding: '16px 48px',
          background: 'linear-gradient(135deg, #7C3AED, #6D28D9)',
          borderRadius: '8px',
          color: '#fff',
          textDecoration: 'none',
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: '0.95rem',
          letterSpacing: '0.08em',
          border: '1px solid rgba(168,85,247,0.4)',
          boxShadow: '0 0 60px rgba(124,58,237,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}>
          CREATE FREE ACCOUNT
        </a>
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid rgba(124,58,237,0.08)',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        position: 'relative',
        zIndex: 1
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.8rem', color: '#1E293B', fontWeight: 700, letterSpacing: '0.1em' }}>
          SPOTEX CORE
        </span>
        <span style={{ fontSize: '0.8rem', color: '#1E293B', fontFamily: "'DM Sans', sans-serif" }}>
          © 2026 Spotex Core. Smart Money Detection Engine.
        </span>
      </footer>

      {/* Font imports & animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        a:hover { opacity: 0.85; }
      `}</style>
    </main>
  )
}