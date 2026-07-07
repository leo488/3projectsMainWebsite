import { useEffect, useRef } from 'react'
import './CaseStudy.css'

const STATS = [
  { num: 10,   sfx: 'M',  label: ['Operational Efficiency', 'Improvement'] },
  { raw: '$XM+',          label: ['Operational Efficiency', 'Improvement'] },
  { raw: 'XX', accent: true, label: ['Operational Efficiency', 'Improvement'] },
  { num: 30,   sfx: '%+', label: ['Operational Efficiency', 'Improvement'] },
]

function countUp(el, target, suffix, duration = 1600) {
  const start = performance.now()
  const tick  = (now) => {
    const p = Math.min((now - start) / duration, 1)
    const e = 1 - Math.pow(1 - p, 3)
    el.textContent = `${Math.round(e * target)}${suffix}`
    if (p < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

export default function CaseStudy() {
  const sectionRef = useRef(null)
  const numRefs    = useRef([])
  const fired      = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      section.classList.add('cs--visible')
      if (!fired.current) {
        fired.current = true
        STATS.forEach((s, i) => {
          const el = numRefs.current[i]
          if (!el || !s.num) return
          setTimeout(() => countUp(el, s.num, s.sfx), i * 100 + 500)
        })
      }
      io.disconnect()
    }, { threshold: 0.1 })

    io.observe(section)
    return () => io.disconnect()
  }, [])

  return (
    <section className="case-study" ref={sectionRef}>

      <div className="cs-header">
        <div className="cs-left">
          <p className="cs-eyebrow">Featured Transformation</p>
          <h2 className="cs-headline">
            Turning Operational Complexity<br />
            into Competitive Advantage.
          </h2>
        </div>
        <div className="cs-right">
          <p className="cs-body">
            3Projects partners with enterprise leaders to uncover these hidden
            constraints, redesign how critical operations work, and implement
            technology strategies that create measurable business value.
          </p>
        </div>
      </div>

      <div className="cs-rule" />

      <div className="cs-stats">
        {STATS.map((s, i) => (
          <div key={i} className="cs-stat">
            <span
              ref={el => { numRefs.current[i] = el }}
              className={`cs-num${s.accent ? ' cs-num--accent' : ''}`}
            >
              {s.raw ?? `0${s.sfx}`}
            </span>
            <span className="cs-label">
              {s.label[0]}<br />{s.label[1]}
            </span>
          </div>
        ))}
      </div>

    </section>
  )
}
