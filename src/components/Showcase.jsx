import PixelArt from './PixelArt'
import useReveal from './useReveal'
import { CONTACT_EMAIL } from '../data/site'
import './Showcase.css'

/* What a brand can have built, shown as demos in the pixel style rather
   than as past work (the hero already leads with the case studies).
   Each card is a kind of product, drawn and described plainly. */
const DEMOS = [
  {
    art: 'pos-terminal',
    kind: 'Operations platforms',
    title: 'Inventory, ordering and stock control that every outlet, warehouse and kitchen runs on.',
    points: ['Live stock across locations', 'Digital requests and approvals', 'ERP and POS integration'],
  },
  {
    art: 'hand-phone',
    kind: 'Consumer apps',
    title: 'Mobile products your customers come back to, from sign-up through to payment.',
    points: ['Accounts and onboarding', 'Payments and rewards', 'Built to scale with demand'],
  },
  {
    art: 'platform',
    kind: 'Dashboards and data',
    title: 'One live view of the business, built on the systems you already run.',
    points: ['Real-time reporting', 'Alerts on what needs action', 'One source of truth'],
    wide: true,
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
              <div className={`showcase-visual${d.wide ? ' showcase-visual--wide' : ''}`}>
                <PixelArt
                  name={d.art}
                  variant={d.wide ? 'B' : 'A'}
                  className={`showcase-art${d.wide ? ' showcase-art--wide' : ''}`}
                  sweep={1100}
                />
              </div>
              <div className="showcase-copy">
                <p className="tiny showcase-client">{d.kind}</p>
                <h3 className="showcase-title">{d.title}</h3>
                <ul className="showcase-points">
                  {d.points.map((pt) => <li key={pt}>{pt}</li>)}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
