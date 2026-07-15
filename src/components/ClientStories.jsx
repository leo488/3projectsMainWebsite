import { useEffect, useRef, useState } from 'react'
import './ClientStories.css'

const STORIES = [
  {
    name: 'Meridian Bank',
    variant: 'bloom',
    desc: 'A leading financial institution modernizes digital banking experiences with 3Projects.',
  },
  {
    name: 'Northfield Foods',
    variant: 'portrait',
    desc: 'A regional food distribution network transforms operations with 3Projects.',
  },
  {
    name: 'Clearview Health',
    variant: 'blank',
    desc: 'A healthcare provider delivers more accessible digital services with 3Projects.',
  },
  {
    name: 'Atlas Retail',
    variant: 'mark',
    desc: 'A national retailer unifies physical and digital commerce with 3Projects.',
  },
]

export default function ClientStories() {
  const railRef = useRef(null)
  const sectionRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const updateEdges = () => {
    const rail = railRef.current
    if (!rail) return
    setAtStart(rail.scrollLeft <= 4)
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4)
  }

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    updateEdges()
    rail.addEventListener('scroll', updateEdges, { passive: true })
    window.addEventListener('resize', updateEdges)
    return () => {
      rail.removeEventListener('scroll', updateEdges)
      window.removeEventListener('resize', updateEdges)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      section.classList.add('stories--visible')
      io.disconnect()
    }, { threshold: 0.1 })

    io.observe(section)
    return () => io.disconnect()
  }, [])

  const scrollBy = (dir) => {
    const rail = railRef.current
    if (!rail) return
    rail.scrollBy({ left: dir * (rail.clientWidth * 0.8), behavior: 'smooth' })
  }

  return (
    <section className="stories-section" ref={sectionRef}>
      <div className="stories-header">
        <p className="stories-eyebrow">Client Stories</p>
        <div className="stories-nav">
          <button
            className={`stories-nav-btn${!atStart ? ' stories-nav-btn--active' : ''}`}
            aria-label="Previous"
            disabled={atStart}
            onClick={() => scrollBy(-1)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 3L5 7l6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={`stories-nav-btn${!atEnd ? ' stories-nav-btn--active' : ''}`}
            aria-label="Next"
            disabled={atEnd}
            onClick={() => scrollBy(1)}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 3l6 4-6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="stories-rail" ref={railRef}>
        {STORIES.map((s, i) => (
          <div key={s.name} className="story-card" style={{ '--i': i }}>
            <div className={`story-visual story-visual--${s.variant}`}>
              <span className="story-name">{s.name}</span>
            </div>
            <p className="story-desc">{s.desc}</p>
            <a href="#" className="story-link">
              Read {s.name.split(' ')[0]}&rsquo;s story
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 9l6-6M9 3H4M9 3v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
