import { useEffect, useRef, useState } from 'react'
import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import { Link } from '../router'
import Arrow from '../components/Arrow'
import PixelGlyph from '../components/PixelGlyph'
import Photo from '../components/Photo'
import PixelReveal from '../components/PixelReveal'
import SearchScene from '../components/SearchScene'
import MsScreen from '../components/MsScreens'
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

  // The next case study in the list, wrapping round to the first.
  const next = PROJECTS.length > 1
    ? PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length]
    : null

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

      {/* ── The starting point and what happened ── */}
      <section className="detail-story">
        <p className="tiny detail-story-eyebrow">The starting point</p>
        <p className="detail-lede">{project.intro}</p>
        {project.story && (
          <div className="detail-story-copy">
            <p className="tiny detail-story-label">What happened</p>
            {project.story.map((para) => <p key={para}>{para}</p>)}
          </div>
        )}
      </section>

      {/* ── Paired columns: text holds, visuals scroll ── */}
      {/* Photographs between the story and the phases: one wide, then a
          pair. A slot without a file yet shows as a labelled plate. */}
      {project.gallery?.length > 0 && (
        <section className="detail-gallery">
          {project.gallery.map((g, i) => (
            <figure key={i} className={`detail-shot${g.photo || g.src ? '' : ' is-empty'}`}>
              {g.photo && i === 0
                ? <PixelReveal name={g.photo} alt={g.alt || ''} sizes="100vw" position={g.position} />
                : g.photo
                ? <Photo name={g.photo} alt={g.alt || ''} sizes={i === 0 ? '100vw' : '(max-width: 900px) 100vw, 50vw'} loading="lazy" style={g.position ? { objectPosition: g.position } : undefined} />
                : g.src
                  ? <img src={g.src} alt={g.alt || ''} loading="lazy" decoding="async" />
                  : <span className="tiny detail-shot-label">{g.label || 'Image'}</span>}
            </figure>
          ))}
        </section>
      )}

      {project.scene && <SearchScene {...project.scene} />}

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
              <div className={`detail-panel-plate${s.image || s.screen ? ' has-image' : ''}${s.screen ? ` is-coded is-coded--${s.screen}` : ''}`}>
                {s.screen
                  ? <MsScreen kind={s.screen} label={s.imageAlt} />
                  : s.image
                  ? <img src={s.image} alt={s.imageAlt || ''} className="detail-panel-img" loading="lazy" decoding="async" />
                  : <PixelGlyph name={PHASE_GLYPH[s.label] || 'magnifier'} className="detail-panel-glyph" />}
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

      {/* ── Close: where it stands and the numbers behind it, on Deep
          Carbon so the page runs straight into the footer ── */}
      <section className="detail-close">
        <p className="tiny detail-outcome-eyebrow">Where it stands</p>
        {project.outcome && (
          <>
            <h2 className="detail-outcome-headline">{project.outcome.headline}</h2>
            <p className="detail-outcome-body">{project.outcome.body}</p>
          </>
        )}
        <ul className="detail-proof">
          {project.metrics.map((m) => (
            <li key={m.label}>
              <span className="detail-metric-value">{m.value}</span>
              <span className="detail-metric-label">{m.label}</span>
            </li>
          ))}
        </ul>
        {next && (
          <Link href={`/work/${next.slug}`} className="detail-next-link">
            <span className="tiny">Next case study</span>
            <span className="detail-next-title">{next.title} <Arrow size={18} /></span>
          </Link>
        )}
      </section>

      <SiteFooter />
    </div>
  )
}
