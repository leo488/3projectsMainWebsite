import { useEffect, useRef, useState } from 'react'
import './Featured.css'

/* Three ideas introduced in place, without the reader leaving the
   section. Each state sets the card's ground and which of the kit's
   two wave patterns sits beside the copy: wave-blue on Deep
   Enterprise, wave-multi (the full palette) on Deep Carbon. */
const STATES = [
  {
    ground: 'var(--section-blue)',
    pattern: 'wave-blue',
    eyebrow: 'Featured Transformation',
    headline: ['Turning Operational', 'Complexity into Competitive', 'Advantage.'],
    body: 'Every enterprise carries hidden constraints that slow the work and inflate its cost. 3Projects partners with enterprise leaders to find them, redesign how critical operations run, and put in the technology that turns the fix into measurable business value.',
  },
  {
    ground: 'var(--carbon)',
    pattern: 'wave-multi',
    eyebrow: 'How we engage',
    headline: ['One team at the table,', 'from the first diagnostic', 'to the last handover.'],
    body: 'Strategy, design and delivery do not arrive as separate workstreams. The people who find the constraint are the people who redesign around it, which is why nothing is lost in translation between phases.',
  },
  {
    ground: 'var(--section-blue)',
    pattern: 'wave-blue',
    eyebrow: 'What we leave behind',
    headline: ['The engagement ends.', 'The operating model', 'keeps improving.'],
    body: 'Instrumentation, ownership and a review cadence stay with the teams running the work. We measure against the baseline captured before the first change, so the improvement can be argued with numbers.',
  },
]

export default function Featured() {
  const sectionRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // The section is taller than the viewport and its card is pinned, so
    // the page holds still while the states turn over, then releases
    // once the last one has had its share of the scroll.
    const measure = () => {
      const rect = section.getBoundingClientRect()
      const travel = rect.height - window.innerHeight
      if (travel <= 0) {
        setIndex(0)
        return
      }
      const progress = Math.min(Math.max(-rect.top / travel, 0), 1)
      const next = Math.min(
        STATES.length - 1,
        Math.floor(progress * STATES.length),
      )
      setIndex(next)
    }

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const state = STATES[index]

  return (
    <section className="featured" ref={sectionRef}>
      <div className="featured-pin">
        <div
          className="featured-card"
          style={{ background: state.ground }}
        >
          <div className="featured-copy">
            <p className="featured-eyebrow">{state.eyebrow}</p>
            <h2 className="featured-headline" key={`h-${index}`}>
              {state.headline.map((line, i) => (
                <span key={i} className="featured-line" style={{ '--i': i }}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="featured-body" key={`b-${index}`}>{state.body}</p>
          </div>
          {/* Both brand waves are stacked and cross-fade with the
              state, so the pattern turns over with the ground. */}
          <div className="featured-pattern" role="presentation">
            {['wave-blue', 'wave-multi'].map((name) => (
              <span
                key={name}
                className={`featured-wave featured-wave--${name}${state.pattern === name ? ' is-on' : ''}`}
              />
            ))}
          </div>
        </div>

        <ol className="featured-dots" aria-hidden="true">
          {STATES.map((s, i) => (
            <li
              key={s.eyebrow}
              className={`featured-dot${i === index ? ' is-active' : ''}`}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}
