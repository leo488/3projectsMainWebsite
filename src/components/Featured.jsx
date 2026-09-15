import { useEffect, useRef, useState } from 'react'
import './Featured.css'

/* State 0 is the existing card, unchanged — ground, eyebrow, headline
   and body all as they were. The two that follow are the slots this
   section exists to carry: further ideas introduced in place, without
   the reader leaving the section. */
const STATES = [
  {
    ground: 'var(--navy)',
    eyebrow: 'Featured Transformation',
    headline: ['Turning Operational', 'Complexity into Competitive', 'Advantage.'],
    body: '3Projects partners with enterprise leaders to uncover these hidden constraints, redesign how critical operations work, and implement technology strategies that create measurable business value.',
  },
  {
    ground: 'var(--indigo)',
    eyebrow: 'How we engage',
    headline: ['One team at the table,', 'from the first diagnostic', 'to the last handover.'],
    body: 'Strategy, design and delivery do not arrive as separate workstreams. The people who find the constraint are the people who redesign around it, which is why nothing is lost in translation between phases.',
  },
  {
    ground: 'var(--carbon)',
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
          <div className="featured-pattern" role="presentation" />
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
