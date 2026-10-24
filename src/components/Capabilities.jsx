import PixelArt from './PixelArt'
import useReveal from './useReveal'
import './Capabilities.css'

/* One illustration per discipline, in the order the work runs:
   Discover, Design, Deliver, Sustain. */
const CAPABILITIES = [
  {
    title: 'Business Strategy',
    desc: 'Every decision starts with understanding your business, customers, and market.',
    phase: 'Discover',
    art: 'icon-strategy',
  },
  {
    title: 'Human-Centered Design',
    desc: 'Products designed around real user behavior, not assumptions.',
    phase: 'Design',
    art: 'icon-design',
  },
  {
    title: 'Technology & Delivery',
    desc: 'Modern systems engineered for reliability, performance, and growth.',
    phase: 'Deliver',
    art: 'icon-technology',
  },
  {
    title: 'Continuous Evolution',
    desc: 'We measure, learn, and improve long after launch.',
    phase: 'Sustain',
    art: 'icon-evolution',
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
            <PixelArt name={c.art} className="cap-art" sweep={520} />
            <div className="cap-copy">
              <p className="cap-phase">
                <span>{String(i + 1).padStart(2, '0')}</span>{c.phase}
              </p>
              <h3 className="cap-title">{c.title}</h3>
              <p className="cap-desc">{c.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
