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


/* Simple monochrome glyphs — they take the link colour, so they sit on
   the bone ground the same way the text links do. */
const SOCIALS = [
  {
    name: 'LinkedIn',
    href: '#',
    path: 'M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.24 8.25h4.5V24H.24zM9.1 8.25h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V24H9.1z',
  },
  {
    name: 'Instagram',
    href: '#',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.38 2.13 5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z',
  },
  {
    name: 'X',
    href: '#',
    path: 'M18.24 2.25h3.31l-7.23 8.26L22.82 21.75h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23zm-1.16 17.52h1.83L7.01 4.13H5.04z',
  },
  {
    name: 'YouTube',
    href: '#',
    path: 'M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.08 0 12 0 12s0 3.92.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.8zM9.55 15.57V8.43L15.82 12z',
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

      {/* ── Link columns ── */}
      <div className="footer-grid">
        <div className="footer-brand" style={{ '--i': 0 }}>
          <GradientMark className="footer-mark" id="fm-small" />
          <p className="footer-blurb">
            An enterprise transformation firm architecting the operating models
            of the organizations that move markets.
          </p>

          <ul className="footer-social">
            {SOCIALS.map((s) => (
              <li key={s.name}>
                <a href={s.href} aria-label={s.name}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={s.path} fill="currentColor" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
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

    </footer>
  )
}
