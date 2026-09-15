import { useEffect, useRef } from 'react'
import './Stats.css'

const STATS = [
  { to: 10, suffix: 'M',  label: ['Operational Efficiency', 'Improvement'] },
  { raw: '$XM+',          label: ['Operational Efficiency', 'Improvement'] },
  { raw: 'XX',            label: ['Operational Efficiency', 'Improvement'] },
  { to: 30, suffix: '%+', label: ['Operational Efficiency', 'Improvement'] },
]

function countUp(el, target, suffix, duration = 1600) {
  const start = performance.now()
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    el.textContent = `${Math.round(eased * target)}${suffix}`
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export default function Stats() {
  const sectionRef = useRef(null)
  const numRefs = useRef([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      section.classList.add('is-visible')
      STATS.forEach((s, i) => {
        const el = numRefs.current[i]
        if (!el || s.to == null) return
        if (reduced) {
          el.textContent = `${s.to}${s.suffix}`
          return
        }
        setTimeout(() => countUp(el, s.to, s.suffix), i * 100 + 400)
      })
      io.disconnect()
    }, { threshold: 0.25 })

    io.observe(section)
    return () => io.disconnect()
  }, [])

  return (
    <section className="stats" ref={sectionRef}>
      <div className="stats-row">
        {STATS.map((s, i) => (
          <div key={i} className="stat" style={{ '--i': i }}>
            <span
              className="stat-num"
              ref={el => { numRefs.current[i] = el }}
            >
              {s.raw ?? `0${s.suffix}`}
            </span>
            <span className="stat-label">
              {s.label[0]}<br />{s.label[1]}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
