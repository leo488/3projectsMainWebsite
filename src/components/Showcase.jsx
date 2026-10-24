import PixelArt from './PixelArt'
import useReveal from './useReveal'
import { Link } from '../router'
import { PROJECTS } from '../data/projects'
import { CONTACT_EMAIL } from '../data/site'
import './Showcase.css'

/* The live case studies, shown the way a client would meet them: what
   was built, for whom, and the number it moved. Each card opens the
   full study. The closing card turns the reader's own operation into
   the next one. */
export default function Showcase() {
  const ref = useReveal('is-visible')
  const featured = PROJECTS.filter((p) => p.art).slice(0, 2)

  return (
    <section className="showcase" ref={ref} aria-labelledby="showcase-heading">
      <header className="showcase-head">
        <p className="tiny showcase-eyebrow">Selected work</p>
        <h2 className="showcase-headline" id="showcase-heading">
          Built, shipped and running in the live operation
        </h2>
        <Link href="/work" className="showcase-all">
          All case studies
          <span aria-hidden="true">→</span>
        </Link>
      </header>

      <ul className="showcase-grid">
        {featured.map((p, i) => (
          <li key={p.slug} className="showcase-item" style={{ '--i': i }}>
            <Link href={`/work/${p.slug}`} className="showcase-card">
              <div className="showcase-visual">
                <PixelArt name={p.art} className="showcase-art" sweep={1100} />
                <span className="tiny showcase-industry">{p.industry}</span>
              </div>
              <div className="showcase-copy">
                <p className="tiny showcase-client">{p.client.split(' — ')[0]}</p>
                <h3 className="showcase-title">{p.summary}</h3>
                {p.metrics[0] && (
                  <p className="showcase-metric">
                    <span className="showcase-metric-value">{p.metrics[0].value}</span>
                    <span className="showcase-metric-label">{p.metrics[0].label}</span>
                  </p>
                )}
                <span className="showcase-cta">
                  Read the case study <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </li>
        ))}

        <li className="showcase-item showcase-item--next" style={{ '--i': featured.length }}>
          <div className="showcase-card showcase-card--next">
            <div className="showcase-visual showcase-visual--next">
              <PixelArt name="platform" variant="B" className="showcase-art showcase-art--wide" sweep={1100} />
            </div>
            <div className="showcase-copy">
              <p className="tiny showcase-client">Your operation</p>
              <h3 className="showcase-title">
                The next platform we build could run your inventory,
                your customers or your field teams.
              </h3>
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Starting%20a%20conversation`}
                className="showcase-next-btn btn-gradient"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </li>
      </ul>
    </section>
  )
}
