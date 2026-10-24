import { useEffect, useRef, useState } from 'react'
import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import { Link } from '../router'
import PixelArt from '../components/PixelArt'
import PixelGlyph from '../components/PixelGlyph'
import { PROJECTS, getProject } from '../data/projects'
import './WorkDetail.css'

// Each phase panel carries its kit glyph, the same four the What We Do
// cards used, small on a textured card.
const PHASE_GLYPH = { Discover: 'magnifier', Design: 'nib', Deliver: 'carton', Sustain: 'coin' }

// A section body is one paragraph or a list of them.
const paragraphs = (body) => [].concat(body)

export default function WorkDetail({ slug }) {
  const project = getProject(slug)
  const [activeIndex, setActiveIndex] = useState(0)
  const panelRefs = useRef([])

  useEffect(() => {
    if (!project) return

    // The left column follows the right: whichever visual panel sits
    // closest to the middle of the viewport owns the text being shown.
    // Measured directly on scroll rather than batched through rAF — it
    // is four rect reads, and it keeps the pairing exact.
    const measure = () => {
      const panels = panelRefs.current.filter(Boolean)
      if (!panels.length) return

      const mid = window.innerHeight / 2
      let best = 0
      let bestDistance = Infinity

      panels.forEach((panel, i) => {
        const rect = panel.getBoundingClientRect()
        const distance = Math.abs(rect.top + rect.height / 2 - mid)
        if (distance < bestDistance) {
          bestDistance = distance
          best = i
        }
      })

      setActiveIndex(best)
    }

    measure()
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [project])

  if (!project) {
    return (
      <>
        <Navbar />
        <section className="detail-missing">
          <p className="tiny">404</p>
          <h1>That project isn&rsquo;t here.</h1>
          <Link href="/work" className="detail-back-link">Back to all work</Link>
        </section>
        <SiteFooter />
      </>
    )
  }

  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <div>
      <Navbar />

      {/* ── Project masthead ── */}
      <header className="detail-intro">
        <Link href="/work" className="tiny detail-back"><span aria-hidden="true">←</span> All work</Link>
        <h1 className="detail-title">{project.title}</h1>
        <p className="detail-summary">{project.summary}</p>

        <dl className="detail-meta">
          {/* Only the CSV-backed records carry a client name. */}
          {project.client && (
            <div>
              <dt className="tiny">Client</dt>
              <dd>{project.client}</dd>
            </div>
          )}
          <div>
            <dt className="tiny">Industry</dt>
            <dd>{project.industry}</dd>
          </div>
          <div>
            <dt className="tiny">Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div className="detail-meta-services">
            <dt className="tiny">Services</dt>
            <dd>{project.services.join(' · ')}</dd>
          </div>
        </dl>
      </header>

      {/* ── The starting point, what happened, and the proof ── */}
      <section className="detail-story">
        <p className="tiny detail-story-eyebrow">The starting point</p>
        <p className="detail-lede">{project.intro}</p>
        <div className="detail-story-grid">
          {project.story && (
            <div className="detail-story-copy">
              <p className="tiny detail-story-label">What happened</p>
              {project.story.map((para) => <p key={para}>{para}</p>)}
            </div>
          )}
          <ul className="detail-proof">
            {project.metrics.map((m) => (
              <li key={m.label}>
                <span className="detail-metric-value">{m.value}</span>
                <span className="detail-metric-label">{m.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Paired columns: text holds, visuals scroll ── */}
      <div className="detail-body">
        <aside className="detail-text-col">
          <div className="detail-text-sticky">
            <ol className="detail-progress">
              {project.sections.map((s, i) => (
                <li
                  key={s.label}
                  className={`tiny detail-progress-item${i === activeIndex ? ' is-active' : ''}`}
                >
                  {s.label}
                </li>
              ))}
            </ol>

            <div className="detail-chapters">
              {project.sections.map((s, i) => (
                <article
                  key={s.label}
                  className={`detail-chapter${i === activeIndex ? ' is-active' : ''}`}
                  aria-hidden={i !== activeIndex}
                >
                  <h2 className="detail-chapter-title">{s.heading}</h2>
                  {paragraphs(s.body).map((para) => (
                    <p key={para} className="detail-chapter-body">{para}</p>
                  ))}
                </article>
              ))}
            </div>
          </div>
        </aside>

        <div className="detail-visual-col">
          {project.sections.map((s, i) => (
            <section
              key={s.label}
              className="detail-panel"
              ref={(el) => { panelRefs.current[i] = el }}
            >
              <div className="detail-panel-plate">
                <PixelGlyph name={PHASE_GLYPH[s.label] || 'magnifier'} className="detail-panel-glyph" />
                <span className="tiny detail-panel-index">
                  {String(i + 1).padStart(2, '0')} / {String(project.sections.length).padStart(2, '0')}
                </span>
                <span className="tiny detail-panel-label">{s.label}</span>
              </div>
              {/* Repeated on small screens, where the columns stack. */}
              <div className="detail-panel-copy">
                <h2>{s.heading}</h2>
                {paragraphs(s.body).map((para) => <p key={para}>{para}</p>)}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ── Close: Deep Carbon from here into the footer ── */}
      <div className="detail-close">
        {project.outcome && (
          <section className="detail-outcome">
            <p className="tiny detail-outcome-eyebrow">Where it stands</p>
            <h2 className="detail-outcome-headline">{project.outcome.headline}</h2>
            <p className="detail-outcome-body">{project.outcome.body}</p>
          </section>
        )}

        {/* ── Next projects ── */}
        <section className="detail-next">
          <p className="tiny detail-next-eyebrow">More work</p>
          <ul className="detail-next-list">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="detail-next-link">
                  <span className="detail-next-plate">
                    {p.art && <PixelArt name={p.art} className="detail-next-art" />}
                  </span>
                  <h3>{p.title}</h3>
                  <span className="tiny">{p.tag}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <SiteFooter />
    </div>
  )
}
