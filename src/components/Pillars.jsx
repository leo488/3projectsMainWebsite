import { useEffect, useRef } from 'react'
import PixelIcon from './PixelIcon'
import './Pillars.css'

const PILLARS = [
  {
    title: 'Business Strategy',
    desc: 'Every decision starts with understanding your business, customers, and market.',
  },
  {
    title: 'Human-Centered Design',
    desc: 'Products designed around real user behavior, not assumptions.',
  },
  {
    title: 'Technology & Delivery',
    desc: 'Modern systems engineered for reliability, performance, and growth.',
  },
  {
    title: 'Continuous Evolution',
    desc: 'We measure, learn, and improve long after launch.',
  },
]

/* 7x7 bitmaps — one glyph per pillar, drawn onto the dotted grid */
const PIXEL_ICONS = [
  ['..XXX..', '.X...X.', 'X..X..X', 'X.XXX.X', 'X..X..X', '.X...X.', '..XXX..'],
  ['..XXX..', '..XXX..', '.......', '.XXXXX.', 'XXXXXXX', 'XXXXXXX', 'XX...XX'],
  ['..X.X..', '.XXXXX.', 'XX...XX', 'XX.X.XX', 'XX...XX', '.XXXXX.', '..X.X..'],
  ['.XX.XX.', 'X..X..X', 'X..X..X', '.XX.XX.', 'X..X..X', 'X..X..X', '.XX.XX.'],
]

export default function Pillars() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      section.classList.add('pillars--visible')
      io.disconnect()
    }, { threshold: 0.15 })

    io.observe(section)
    return () => io.disconnect()
  }, [])

  return (
    <section className="pillars-section" ref={sectionRef}>
      <h2 className="pillars-heading">
        Every engagement starts with understanding the<br />
        business—not just the brief.
      </h2>

      <div className="pillars-grid">
        {PILLARS.map((p, i) => (
          <div key={i} className="pillar-cell" style={{ '--i': i }}>
            <PixelIcon pattern={PIXEL_ICONS[i]} className="pillar-pixel-icon" />
            <p className="pillar-title">{p.title}</p>
            <p className="pillar-desc">{p.desc}</p>
          </div>
        ))}

        <a href="#" className="pillar-cell pillar-cta" style={{ '--i': 0 }}>
          <span className="pillar-cta-arrow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
          <span className="pillar-cta-label">Start a<br />Conversation</span>
        </a>
        <div className="pillar-cell pillar-cell--empty" style={{ '--i': 1 }} />
        <div className="pillar-cell pillar-cell--empty" style={{ '--i': 2 }} />
        <div className="pillar-cell pillar-cell--empty" style={{ '--i': 3 }} />
      </div>
    </section>
  )
}
