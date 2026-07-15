import { useEffect, useRef } from 'react'
import './Footer.css'

/* The three slabs of the 3Projects mark, filled with the brand gradient */
function GradientMark({ className, id }) {
  return (
    <svg className={className} viewBox="0 0 42.2 36.2" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-a`} x1="0" y1="36" x2="42" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0"    stopColor="#FF2E7E" />
          <stop offset="0.5"  stopColor="#B429F9" />
          <stop offset="1"    stopColor="#2E4BFF" />
        </linearGradient>
        <linearGradient id={`${id}-b`} x1="0" y1="36" x2="42" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0"    stopColor="#35E1F0" />
          <stop offset="0.45" stopColor="#B429F9" />
          <stop offset="1"    stopColor="#FF2E7E" />
        </linearGradient>
      </defs>
      <path d="M41.9705 35.819L42.1503 25.8806L0.0126962 28.2837L0 36.1002L41.9705 35.819Z" fill={`url(#${id}-b)`} />
      <path d="M41.7116 18.3649L40.9459 7.02446L0.223009 22.5473L0.146623 27.2527L41.7116 18.3649Z" fill={`url(#${id}-a)`} />
      <path d="M40.3957 4.88894L36.3734 0L0.803406 16.2763L0.281094 20.7281L40.3957 4.88894Z" fill={`url(#${id}-a)`} />
    </svg>
  )
}

const COLUMNS = [
  {
    title: 'Capabilities',
    links: [
      'Enterprise Discovery',
      'Strategic Analysis',
      'Transformation Architecture',
      'Operational Optimization',
      'Technology Integration',
      'Continuous Evolution',
    ],
  },
  {
    title: 'Industries',
    links: [
      'Financial Services',
      'Manufacturing',
      'Energy & Utilities',
      'Infrastructure',
      'Technology',
    ],
  },
  {
    title: 'The Firm',
    links: ['About', 'Leadership', 'Careers', 'Newsroom', 'Insights', 'Contact'],
  },
  {
    title: 'Offices',
    links: ['New York', 'London', 'Frankfurt', 'Dubai', 'Singapore', 'São Paulo'],
  },
]

const LEGAL = ['Privacy', 'Terms', 'Cookies', 'Accessibility', 'Modern Slavery Statement']

export default function Footer() {
  const footerRef = useRef(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      footer.classList.add('footer--visible')
      io.disconnect()
    }, { threshold: 0.1 })

    io.observe(footer)
    return () => io.disconnect()
  }, [])

  return (
    <footer className="footer" ref={footerRef}>

      {/* ── Big CTA headline ── */}
      <div className="footer-cta">
        <h2 className="footer-cta-headline">
          Let&rsquo;s redesign how your<br />
          enterprise <em className="footer-accent">grows.</em>
        </h2>
      </div>

      {/* ── Link columns ── */}
      <div className="footer-grid">
        <div className="footer-brand" style={{ '--i': 0 }}>
          <GradientMark className="footer-mark" id="fm-small" />
          <p className="footer-blurb">
            An enterprise transformation firm architecting the operating models
            of the organizations that move markets.
          </p>
          <div className="footer-contact">
            <a href="mailto:hello@3projects.com">hello@3projects.com</a>
            <a href="tel:+18005550142">+1 (800) 555-0142</a>
          </div>
        </div>

        {COLUMNS.map((col, i) => (
          <div key={col.title} className="footer-col" style={{ '--i': i + 1 }}>
            <p className="footer-col-title">{col.title}</p>
            <ul className="footer-col-links">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Legal bar ── */}
      <div className="footer-legal">
        <ul className="footer-legal-links">
          {LEGAL.map((item) => (
            <li key={item}>
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
        <span className="footer-copyright">
          © 2026 3Projects LLP · All rights reserved
        </span>
      </div>

      {/* ── Giant brand lockup ── */}
      <div className="footer-lockup">
        <GradientMark className="footer-lockup-mark" id="fm-big" />
        <div className="footer-lockup-word">
          <span className="footer-wordmark">3PROJECTS</span>
          <span className="footer-tm">™</span>
        </div>
      </div>

    </footer>
  )
}
