import { useEffect, useRef, useState } from 'react'
import './CaseCarousel.css'

const SLIDES = [
  {
    img: '/images/hero-main.png',
    title: 'Modernizing Banking Operations',
    desc: 'Reduced operational bottlenecks through enterprise process redesign and technology modernization.',
  },
  {
    img: '/images/services-tile-02.jpg',
    title: 'Reimagining Retail Experiences',
    desc: 'Unified point-of-sale and inventory systems across 400+ locations for faster, simpler service.',
  },
  {
    img: '/images/restaurant-worker.png',
    title: 'Elevating Hospitality Operations',
    desc: 'Modernized reservations and service workflows for a fast-growing hospitality group.',
  },
  {
    img: '/images/expertise-logistics.png',
    title: 'Scaling Urban Mobility Networks',
    desc: 'Rebuilt routing and fleet visibility to move people and goods faster across the city.',
  },
]

export default function CaseCarousel() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      section.classList.add('cc--visible')
      io.disconnect()
    }, { threshold: 0.15 })

    io.observe(section)
    return () => io.disconnect()
  }, [])

  const slide = SLIDES[active]
  const peeks = SLIDES.map((s, i) => ({ ...s, i })).filter((s) => s.i !== active)

  return (
    <section className="cc-section" ref={sectionRef}>
      <div className="cc-rail">

        <div className="cc-main">
          {SLIDES.map((s, i) => (
            <img
              key={s.img}
              src={s.img}
              alt=""
              className={`cc-main-img${i === active ? ' is-active' : ''}`}
            />
          ))}
          <div className="cc-scrim" />
          <div className="cc-copy" key={active}>
            <h3>{slide.title}</h3>
            <p>{slide.desc}</p>
          </div>
          <a href="#" className="cc-arrow" aria-label="View case study">
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <div className="cc-peeks">
          {peeks.map((s) => (
            <button
              key={s.img}
              className="cc-peek"
              aria-label={`Show ${s.title}`}
              onClick={() => setActive(s.i)}
            >
              <img src={s.img} alt="" />
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}
