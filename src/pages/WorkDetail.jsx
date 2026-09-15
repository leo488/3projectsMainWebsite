import { useEffect, useRef, useState } from 'react'
import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import { Link } from '../router'
import { PROJECTS, getProject } from '../data/projects'
import './WorkDetail.css'

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
        <SiteFooter tone="bone" />
      </>
    )
  }

  const others = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <>
      {/* A light project ground cannot carry a white lockup. */}
      <Navbar theme={project.tone === 'light' ? 'onlight' : 'dark'} />

      {/* ── Project masthead ── */}
      <header
        className={`detail-intro detail-intro--${project.tone || 'dark'}`}
        style={{ background: project.ground }}
      >
        <Link href="/work" className="tiny detail-back">← All work</Link>
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

      <p className="detail-lede">{project.intro}</p>

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
                  <span className="detail-progress-dot" style={{ background: s.ground }} />
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
                  <p className="detail-chapter-body">{s.body}</p>
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
              {/* Placeholder ground — real project imagery drops in here. */}
              <div className="detail-panel-plate" style={{ background: s.ground }}>
                <span className="tiny detail-panel-index">
                  {String(i + 1).padStart(2, '0')} / {String(project.sections.length).padStart(2, '0')}
                </span>
                <span className="tiny detail-panel-label">{s.label}</span>
              </div>
              {/* Repeated on small screens, where the columns stack. */}
              <div className="detail-panel-copy">
                <h2>{s.heading}</h2>
                <p>{s.body}</p>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ── Outcome ── */}
      <section className="detail-metrics">
        <p className="tiny detail-metrics-eyebrow">Outcome</p>
        <ul className="detail-metrics-list">
          {project.metrics.map((m) => (
            <li key={m.label}>
              <span className="detail-metric-value">{m.value}</span>
              <span className="detail-metric-label">{m.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Next projects ── */}
      <section className="detail-next">
        <p className="tiny detail-next-eyebrow">More work</p>
        <ul className="detail-next-list">
          {others.map((p) => (
            <li key={p.slug}>
              <Link href={`/work/${p.slug}`} className="detail-next-link">
                <span className="detail-next-plate" style={{ background: p.ground }} />
                <h3>{p.title}</h3>
                <span className="tiny">{p.tag}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter tone="bone" />
    </>
  )
}
