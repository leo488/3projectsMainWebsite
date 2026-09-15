import { useEffect, useRef } from 'react'
import { Link } from '../router'
import {
  SERVICES, INDUSTRIES, OFFICES, FIRM_LINKS, CONTACT_EMAIL, SOCIAL_LINKS,
} from '../data/site'
import './Footer.css'

const COLUMNS = [
  {
    title: 'Capabilities',
    links: SERVICES.map((s) => ({ label: s.label, href: '/work' })),
  },
  {
    title: 'Industries',
    links: INDUSTRIES.map((i) => ({ label: i, href: '/work' })),
  },
  {
    title: 'The Firm',
    links: FIRM_LINKS,
  },
  {
    title: 'Offices',
    links: OFFICES.map((o) => ({
      label: o,
      href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Enquiry — ${o}`)}`,
    })),
  },
]

/* Simple monochrome glyphs — they take the link colour, so they sit on
   the bone ground the same way the text links do. */
const SOCIALS = [
  {
    name: 'LinkedIn',
    path: 'M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0zM.24 8.25h4.5V24H.24zM9.1 8.25h4.31v2.15h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.9c0-1.88-.03-4.3-2.62-4.3-2.62 0-3.02 2.05-3.02 4.16V24H9.1z',
  },
  {
    name: 'Instagram',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91a5.9 5.9 0 0 0 1.38 2.13 5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z',
  },
  {
    name: 'X',
    path: 'M18.24 2.25h3.31l-7.23 8.26L22.82 21.75h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23zm-1.16 17.52h1.83L7.01 4.13H5.04z',
  },
  {
    name: 'YouTube',
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
          <p className="footer-blurb">
            An enterprise transformation firm architecting the operating models
            of the organizations that move markets.
          </p>

          {SOCIALS.some((s) => SOCIAL_LINKS[s.name]) && (
            <ul className="footer-social">
              {SOCIALS.filter((s) => SOCIAL_LINKS[s.name]).map((s) => (
                <li key={s.name}>
                  <a
                    href={SOCIAL_LINKS[s.name]}
                    aria-label={s.name}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={s.path} fill="currentColor" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {COLUMNS.map((col, i) => (
          <div key={col.title} className="footer-col" style={{ '--i': i + 1 }}>
            <p className="footer-col-title">{col.title}</p>
            <ul className="footer-col-links">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('mailto:')
                    ? <a href={link.href}>{link.label}</a>
                    : <Link href={link.href}>{link.label}</Link>}
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
              {item === 'Cookies' ? (
                <button
                  type="button"
                  className="footer-legal-btn"
                  onClick={() => window.dispatchEvent(new CustomEvent('cookie:open'))}
                >
                  {item}
                </button>
              ) : (
                <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(item)}`}>
                  {item}
                </a>
              )}
            </li>
          ))}
        </ul>
        <span className="footer-copyright">
          © 2026 3Projects LLP · All rights reserved
        </span>
      </div>

      <p className="footer-dedication">
        {/* Drawn on the same grid as the hero artwork — seven cells
            across, filled by hand rather than traced from a glyph. */}
        <svg
          className="footer-heart"
          viewBox="0 0 7 6"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          {[
            '.XX.XX.',
            'XXXXXXX',
            'XXXXXXX',
            '.XXXXX.',
            '..XXX..',
            '...X...',
          ].map((row, y) =>
            Array.from(row).map((cell, x) =>
              cell === 'X' ? (
                <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
              ) : null,
            ),
          )}
        </svg>
        A Pitch Blossoms company, made with the servant heart of Jesus Christ.
      </p>

    </footer>
  )
}
