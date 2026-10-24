import useReveal from './useReveal'
import PixelGlyph from './PixelGlyph'
import './PhaseCards.css'

const PHASES = [
  {
    label: 'Discover',
    title: 'We start where you are',
    body: 'Every engagement opens against the operating model as it actually runs — the workarounds, the queues, the reports nobody reads — not the one on the org chart.',
    glyph: 'magnifier',
  },
  {
    label: 'Design',
    title: 'Redesign the work first',
    body: 'Process before software. We rebuild each critical path around the decision it exists to support, then specify what has to be built, bought or retired to carry it.',
    glyph: 'nib',
  },
  {
    label: 'Deliver',
    title: 'Ship into the live operation',
    body: 'Delivery runs in slices against real work, so every change is measured against the operation it is meant to improve rather than a staging environment.',
    glyph: 'carton',
  },
  {
    label: 'Sustain',
    title: 'Leave the capability behind',
    body: 'Instrumentation, ownership and a review cadence stay with the teams running the work. The engagement ends; the operating model does not.',
    glyph: 'coin',
  },
]

/* The four phases of every engagement, one textured card each.
   `compact` is the shorter set on the home page, sitting on white. */
export default function PhaseCards({ compact = false }) {
  const ref = useReveal('is-visible')

  return (
    <ol className={`approach-list${compact ? ' approach-list--compact' : ''}`} ref={ref}>
      {PHASES.map((a, i) => (
        <li key={a.label} className="approach-item" style={{ '--i': i }}>
          <span className="tiny approach-label">
            {String(i + 1).padStart(2, '0')} / {a.label}
          </span>
          <h3 className="approach-title">{a.title}</h3>
          <p className="approach-text">{a.body}</p>
          <PixelGlyph name={a.glyph} className="approach-icon" />
        </li>
      ))}
    </ol>
  )
}
