import { useEffect, useState } from 'react'
import Logo from './Logo'
import { Link } from '../router'
import './Navbar.css'

const LINKS = [
  { label: 'About',       href: '/about' },
  { label: 'Expertise',   href: '/#expertise' },
  { label: 'Industries',  href: '/#industries' },
  { label: 'Case Studies', href: '/work' },
  { label: 'Careers',     href: '/careers' },
]

export default function Navbar({ theme = 'light' }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`navbar navbar--${theme}${scrolled ? ' navbar--scrolled' : ''}`}>
      <Link href="/" className="nav-logo">
        <Logo
          className="nav-logo-svg"
          mark={theme === 'dark' ? 'var(--white)' : '#0031B8'}
          word={theme === 'dark' ? 'var(--white)' : '#0E1B2E'}
        />
      </Link>

      <div className="nav-right">
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
          ))}
        </ul>

        <Link href="/#contact" className="btn-start btn-gradient">Start a Conversation</Link>
      </div>
    </nav>
  )
}
