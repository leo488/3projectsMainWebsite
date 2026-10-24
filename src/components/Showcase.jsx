import PixelArt from './PixelArt'
import useReveal from './useReveal'
import { CONTACT_EMAIL } from '../data/site'
import './Showcase.css'

/* What a brand can have built, shown as demos in the pixel style rather
   than as past work (the hero already leads with the case studies).
   Each card is a kind of product, drawn in perspective and built cell
   by cell in the announcement banner's colours, with its tags below. */
const DEMOS = [
  {
    art: 'pos-terminal',
    kind: 'Operations platforms',
    title: 'Inventory, ordering and stock control that every outlet, warehouse and kitchen runs on.',
    tags: ['Live stock', 'Approvals', 'ERP + POS'],
  },
  {
    art: 'hand-phone',
    kind: 'Consumer apps',
    title: 'Mobile products your customers come back to, from sign-up through to payment.',
    tags: ['Onboarding', 'Payments', 'Rewards'],
    // The arm runs in from the card's edge rather than stopping short of it.
    edge: true,
  },
  {
    art: 'laptop-dashboard',
    kind: 'Dashboards and data',
    title: 'One live view of the business, built on the systems you already run.',
    tags: ['Real-time', 'Alerts', 'Reporting'],
  },
]

export default function Showcase() {
  const ref = useReveal('is-visible')

  return (
    <section className="showcase" ref={ref} aria-labelledby="showcase-heading">
      <header className="showcase-head">
        <p className="tiny showcase-eyebrow">What we build</p>
        <h2 className="showcase-headline" id="showcase-heading">
          The products behind a brand that runs well
        </h2>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Starting%20a%20conversation`}
          className="showcase-all"
        >
          Talk to us about yours
          <span aria-hidden="true">→</span>
        </a>
      </header>

      <ul className="showcase-grid">
        {DEMOS.map((d, i) => (
          <li key={d.kind} className="showcase-item" style={{ '--i': i }}>
            <div className="showcase-card">
              <div className="showcase-visual">
                <PixelArt
                  name={d.art}
                  className={`showcase-art showcase-art--${d.art}${d.edge ? ' showcase-art--edge' : ''}`}
                  sweep={1800}
                  loop
                />
              </div>
              <div className="showcase-copy">
                <p className="tiny showcase-client">{d.kind}</p>
                <h3 className="showcase-title">{d.title}</h3>
                <ul className="showcase-tags">
                  {d.tags.map((t) => <li key={t} className="tiny">{t}</li>)}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
