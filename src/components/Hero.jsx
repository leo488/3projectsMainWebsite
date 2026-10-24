import MorphWord from './MorphWord'
import HeroParticles from './HeroParticles'
import { Link } from '../router'
import { CONTACT_EMAIL, CLIENT_LOGOS } from '../data/site'
import { getProject } from '../data/projects'
import './Hero.css'

/* The two engagements the hero leads with. Each photograph is cropped
   to the card's 3:2 frame in the file itself, so the pixel assembly and
   the still underneath land on exactly the same framing. */
const CASES = [
  {
    slug: 'crunchies-inventory',
    sector: 'Food & hospitality',
    line: 'One live view of stock across every outlet, warehouse and kitchen.',
    small: '/images/case-food-900.jpg',
    large: '/images/case-food-1600.jpg',
    alt: 'A restaurant manager checking stock on a tablet at the shop door',
  },
  {
    slug: 'myspotlyt',
    sector: 'Arts & entertainment',
    line: 'A live platform rebuilt for stability, with the features to grow it.',
    small: '/images/case-spotlyt-900.jpg',
    large: '/images/case-spotlyt-1224.jpg',
    alt: 'A creator smiling at her phone against an open sky',
  },
]

// The strip scrolls, so the set repeats until it is wider than any
// screen; the second half is a copy and is hidden from assistive tech.
const STRIP = Array.from({ length: 4 }, () => CLIENT_LOGOS).flat()

function ClientMark({ logo }) {
  if (logo.src) {
    return <img className="hero-logo-img" src={logo.src} alt={logo.name} />
  }
  return <span className={`hero-logo-word hero-logo-word--${logo.style}`}>{logo.name}</span>
}

export default function Hero() {
  return (
    <section className="hero-section">

      {/* ── Headline ── */}
      <div className="hero-headline-row">
        <h1 className="hero-headline">
          <span className="line-wrap">
            <span className="line-inner line-1">We build the platforms that make</span>
          </span>
          <span className="line-wrap">
            <span className="line-inner line-2">
              your brand{' '}
              <MorphWord
                words={['Unstoppable', 'Adaptable', 'Decisive', 'Resilient', 'Relentless']}
              />
            </span>
          </span>
        </h1>
        <p className="hero-sub">
          Strategy, design and engineering at one table. We find what is
          holding your business back, then design and ship the product
          that moves the number.
        </p>
        <div className="hero-actions">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Starting%20a%20conversation`}
            className="hero-cta btn-gradient"
          >
            Start a Conversation
          </a>
          <Link href="/work" className="hero-view-link">
            View Case Studies
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Brands we've built for ── */}
      <div className="hero-logos">
        <p className="tiny hero-logos-label">Brands we have built for</p>
        <div className="hero-logos-window">
          <ul className="hero-logos-track">
            {[...STRIP, ...STRIP].map((logo, i) => (
              <li
                key={i}
                className="hero-logo"
                aria-hidden={i >= CLIENT_LOGOS.length ? 'true' : undefined}
              >
                <ClientMark logo={logo} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Two engagements, each with its numbers underneath ──
         The photographs assemble out of the brand grid on load, then
         the sharp stills take over. */}
      <ul className="hero-cases">
        {CASES.map((c, i) => {
          const project = getProject(c.slug)
          if (!project) return null
          return (
            <li key={c.slug} className="hero-case" style={{ '--i': i }}>
              <Link href={`/work/${c.slug}`} className="hero-case-link">
                <div className="hero-case-visual">
                  <img
                    className="hero-case-img"
                    src={c.large}
                    srcSet={`${c.small} 900w, ${c.large} 1600w`}
                    sizes="(max-width: 900px) 86vw, 48vw"
                    width="1600"
                    height="1067"
                    alt={c.alt}
                    fetchPriority={i === 0 ? 'high' : 'auto'}
                  />
                  <HeroParticles className="hero-case-canvas" src={c.small} />
                  <span className="tiny hero-case-sector">{c.sector}</span>
                </div>
                <div className="hero-case-panel">
                  <div className="hero-case-head">
                    <p className="hero-case-client">{project.client.split(' — ')[0]}</p>
                    <p className="hero-case-line">{c.line}</p>
                  </div>
                  <dl className="hero-case-stats">
                    {project.metrics.slice(0, 2).map((m) => (
                      <div key={m.label} className="hero-case-stat">
                        <dt className="hero-case-stat-label">{m.label}</dt>
                        <dd className="hero-case-stat-value">{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <span className="hero-case-cta">
                    Read the case study <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

    </section>
  )
}
