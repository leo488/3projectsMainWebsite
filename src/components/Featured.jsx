import { useEffect, useState } from 'react'
import './Featured.css'

/* Three ideas introduced in place, without the reader leaving the
   section. Each state has its own ground and its own pattern from the
   brand kit: wave-multi (the full palette) on Deep Carbon, wave-blue
   on Deep Enterprise, pixel-lines-blue on Electric Cobalt.

   All three states are always in the page, stacked, and the active one
   cross-fades in, so a change never re-mounts or jumps. The states turn
   over on their own, like the hero band, and hold while hovered. The
   band sits directly on top of the CPA band, the same width, with its
   copy and pattern columns lined up with the CPA's copy and picture. */

const TURN = 6500
const STATES = [
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
    eyebrow: 'Featured Transformation',
    headline: ['Turning Operational', 'Complexity into Competitive', 'Advantage.'],
    body: 'Every enterprise carries hidden constraints that slow the work and inflate its cost. 3Projects partners with enterprise leaders to find them, redesign how critical operations run, and put in the technology that turns the fix into measurable business value.',
  },
  {
    ground: 'var(--cta-blue)',
    pattern: 'pixel-lines-blue',
    eyebrow: 'What we leave behind',
    headline: ['The engagement ends.', 'The operating model', 'keeps improving.'],
    body: 'Instrumentation, ownership and a review cadence stay with the teams running the work. We measure against the baseline captured before the first change, so the improvement can be argued with numbers.',
  },
]

export default function Featured() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % STATES.length), TURN)
    return () => clearInterval(id)
  }, [paused])

  const state = STATES[index]

  return (
    <section
      className="featured"
      style={{ background: state.ground }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="featured-copy">
        {STATES.map((st, i) => (
          <div
            key={st.eyebrow}
            className={`featured-state${i === index ? ' is-on' : ''}`}
            aria-hidden={i === index ? undefined : true}
          >
            <p className="tiny featured-eyebrow">{st.eyebrow}</p>
            <h2 className="featured-headline">
              {st.headline.map((line, j) => (
                <span key={j} className="featured-line" style={{ '--i': j }}>
                  {line}
                </span>
              ))}
            </h2>
            <p className="featured-body">{st.body}</p>
          </div>
        ))}
      </div>
      <div className="featured-pattern" role="presentation">
        {STATES.map((st) => (
          <span
            key={st.pattern + st.eyebrow}
            className={`featured-wave featured-wave--${st.pattern}${state === st ? ' is-on' : ''}`}
          />
        ))}
      </div>
    </section>
  )
}
