import PixelGlyph from './PixelGlyph'
import useReveal from './useReveal'
import './Capabilities.css'

/* One glyph per phase, in the order the work runs: Discover, Design,
   Deliver, Sustain. */
const CAPABILITIES = [
  {
    title: 'Business Strategy',
    desc: 'Every decision starts with understanding your business, customers, and market.',
    glyph: 'magnifier',
  },
  {
    title: 'Human-Centered Design',
    desc: 'Products designed around real user behavior, not assumptions.',
    glyph: 'nib',
  },
  {
    title: 'Technology & Delivery',
    desc: 'Modern systems engineered for reliability, performance, and growth.',
    glyph: 'carton',
  },
  {
    title: 'Continuous Evolution',
    desc: 'We measure, learn, and improve long after launch.',
    glyph: 'coin',
  },
]

export default function Capabilities() {
  const ref = useReveal('is-visible')

  return (
    <section className="caps" ref={ref}>
      <ul className="caps-track">
        <li className="cap-card cap-card--intro" style={{ '--i': 0 }}>
          <p className="cap-intro-eyebrow">Our Process</p>
          <h2 className="cap-intro-title">What&nbsp;We&nbsp;Do</h2>
          <p className="cap-intro-desc">
            Four disciplines, run as one engagement — from the first
            diagnostic through to the systems that outlive it.
          </p>
        </li>

        {CAPABILITIES.map((c, i) => (
          <li key={c.title} className="cap-card" style={{ '--i': i + 1 }}>
            <h3 className="cap-title">{c.title}</h3>
            <p className="cap-desc">{c.desc}</p>
            <PixelGlyph name={c.glyph} className="cap-glyph" />
          </li>
        ))}
      </ul>
    </section>
  )
}
