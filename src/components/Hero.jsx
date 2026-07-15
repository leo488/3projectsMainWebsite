import { useEffect, useState } from 'react'
import './Hero.css'

export default function Hero() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="hero-section">

      {/* ── Navbar ── */}
      <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
        <a href="/" className="nav-logo">
          <img src="/images/logo-dark.svg" alt="3Projects" />
        </a>

        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Expertise</a></li>
            <li><a href="#">Industries</a></li>
            <li><a href="#">Case Studies</a></li>
            <li><a href="#">Careers</a></li>
          </ul>

          <a href="#" className="btn-start">Start a Conversation</a>
        </div>
      </nav>

      {/* ── Headline ── */}
      <div className="hero-headline-row">
        <h1 className="hero-headline">
          <span className="line-wrap">
            <span className="line-inner line-1">We build the systems that make</span>
          </span>
          <span className="line-wrap">
            <span className="line-inner line-2">
              your enterprise <em className="hero-accent">unstoppable.</em>
            </span>
          </span>
        </h1>
        <a href="#" className="hero-view-link">
          View Case Studies
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* ── Featured case study image ── */}
      <div className="hero-case-card">
        <img src="/images/restaurant-worker.png" alt="" className="hero-case-img" />
        <div className="hero-case-scrim" />
        <div className="hero-case-copy">
          <h3>Modernizing Banking Operations</h3>
          <p>Reduced operational bottlenecks through enterprise process redesign and technology modernization.</p>
        </div>
        <a href="#" className="hero-case-arrow" aria-label="View case study">
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* ── Stats row ── */}
      <div className="hero-stats-row">
        <div className="hero-stat">
          <strong>160</strong> countries
        </div>
        <div className="hero-stat">
          <strong>11K+</strong> locations globally
        </div>
        <div className="hero-stat hero-stat--products">
          <span className="hero-stat-label">Products used</span>
          <span className="hero-stat-value">Payments, Terminal, Connect, Radar, and Stripe Intergration</span>
        </div>
      </div>

    </section>
  )
}
