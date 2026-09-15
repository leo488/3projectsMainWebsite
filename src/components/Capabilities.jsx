import useReveal from './useReveal'
import './Capabilities.css'

const CAPABILITIES = [
  {
    title: 'Business Strategy',
    desc: 'Every decision starts with understanding your business, customers, and market.',
  },
  {
    title: 'Human-Centered Design',
    desc: 'Products designed around real user behavior, not assumptions.',
  },
  {
    title: 'Technology & Delivery',
    desc: 'Modern systems engineered for reliability, performance, and growth.',
  },
  {
    title: 'Continuous Evolution',
    desc: 'We measure, learn, and improve long after launch.',
  },
]

export default function Capabilities() {
  const ref = useReveal('is-visible')

  return (
    <section className="caps" ref={ref}>
      <ul className="caps-track">
        {CAPABILITIES.map((c, i) => (
          <li key={c.title} className="cap-card" style={{ '--i': i }}>
            <h3 className="cap-title">{c.title}</h3>
            <p className="cap-desc">{c.desc}</p>
          </li>
        ))}
        {/* The blue card runs off the right edge — it's the affordance
            that tells you the row scrolls. */}
        <li className="cap-card cap-card--accent" style={{ '--i': 4 }} aria-hidden="true" />
      </ul>
    </section>
  )
}
