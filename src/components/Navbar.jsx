import { useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import MegaMenu from './MegaMenu'
import { Link } from '../router'
import { CONTACT_EMAIL } from '../data/site'
import './Navbar.css'

export default function Navbar({ theme = 'light' }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const wrapRef = useRef(null)
  const panelRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    const onKey = (e) => {
      if (e.key !== 'Escape') return
      setMenuOpen(false)
      triggerRef.current?.focus()
    }
    const onPointer = (e) => {
      if (wrapRef.current?.contains(e.target)) return
      setMenuOpen(false)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [menuOpen])

  return (
    <nav className={`navbar navbar--${theme}${scrolled ? ' navbar--scrolled' : ''}${menuOpen ? ' navbar--menu-open' : ''}`}>
      <Link href="/" className="nav-logo">
        <Logo
          className="nav-logo-svg"
          mark={theme === 'dark' ? 'var(--white)' : '#0031B8'}
          word={theme === 'dark' ? 'var(--white)' : '#0E1B2E'}
        />
      </Link>

      <div className="nav-right">
        <ul className="nav-links">
          <li><Link href="/about">About</Link></li>

          <li
            className="nav-has-menu"
            ref={wrapRef}
            onMouseEnter={() => setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <button
              type="button"
              ref={triggerRef}
              className={`nav-menu-trigger${menuOpen ? ' is-open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="expertise-menu"
              aria-haspopup="true"
              onClick={() => setMenuOpen((v) => !v)}
            >
              Expertise
              <svg className="nav-caret" width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <MegaMenu
              open={menuOpen}
              panelRef={panelRef}
              onNavigate={() => setMenuOpen(false)}
            />
          </li>

          <li><Link href="/work">Case Studies</Link></li>
          <li><Link href="/careers">Careers</Link></li>
        </ul>

        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Starting%20a%20conversation`}
          className="btn-start btn-gradient"
        >
          Start a Conversation
        </a>
      </div>
    </nav>
  )
}
