import { useEffect, useRef, useState } from 'react'
import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import { Link } from '../router'
import Arrow from '../components/Arrow'
import PixelGlyph from '../components/PixelGlyph'
import Photo from '../components/Photo'
import SearchScene from '../components/SearchScene'
import MsScreen from '../components/MsScreens'
import TalentFinale from '../components/TalentFinale'
import ContactLink from '../components/ContactLink'
import { PROJECTS, getProject } from '../data/projects'
import './WorkDetail.css'

// Each phase panel carries its kit glyph, the same four the What We Do
// cards used, small on a textured card.
const PHASE_GLYPH = { Discover: 'magnifier', Design: 'nib', Deliver: 'carton', Sustain: 'coin' }

// A section body is one paragraph or a list of them.
const paragraphs = (body) => [].concat(body)

// Figures marked **like this** in the data are set in bold, so the
// numbers stand out from the sentences around them.
const rich = (text) =>
  text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))

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

  // One run of phases, from..to: the held text on the left, the panels
  // on the right. Each run shows the whole progress list; its text shows
  // the active phase, or the nearest of its own while another run is in
  // view.
  const phaseBlock = (from, to) => {
    const blockSections = project.sections.map((s, i) => [s, i]).slice(from, to)
    const shown = Math.min(Math.max(activeIndex, from), to - 1)
    return (
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
                {blockSections.map(([s, i]) => (
                  <article
                    key={s.label}
                    className={`detail-chapter${i === shown ? ' is-active' : ''}`}
                    aria-hidden={i !== shown}
                  >
                    <h2 className="detail-chapter-title">{s.heading}</h2>
                    {paragraphs(s.body).map((para) => (
                      <p key={para} className="detail-chapter-body">{rich(para)}</p>
                    ))}
                  </article>
                ))}
              </div>
            </div>
          </aside>

          <div className="detail-visual-col">
            {blockSections.map(([s, i]) => (
              <section
                key={s.label}
                className="detail-panel"
                ref={(el) => { panelRefs.current[i] = el }}
              >
                <div className={`detail-panel-plate${s.image || s.screen ? ' has-image' : ''}${s.screen ? ` is-coded is-coded--${s.screen}` : ''}${s.pair ? ' has-pair' : ''}`}>
                  {s.screen && s.pair
                    ? (
                      <>
                        {/* The screen and a photograph side by side. */}
                        <div className="detail-panel-half"><MsScreen kind={s.screen} label={s.imageAlt} /></div>
                        <figure className={`detail-panel-half detail-panel-pair${s.pair.photo ? '' : ' is-empty'}`}>
                          {s.pair.photo
                            ? <Photo name={s.pair.photo} alt={s.pair.alt || ''} sizes="(max-width: 1000px) 50vw, 32vw" loading="lazy" style={s.pair.position ? { objectPosition: s.pair.position } : undefined} />
                            : <span className="tiny detail-shot-label">{s.pair.label || 'Image'}</span>}
                        </figure>
                      </>
                    )
                    : s.screen
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
                  {paragraphs(s.body).map((para) => <p key={para}>{rich(para)}</p>)}
                </div>
              </section>
            ))}
          </div>
        </div>
    )
  }

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
        <p className="detail-lede">{rich(project.intro)}</p>
        {project.story && (
          <div className="detail-story-copy">
            <p className="tiny detail-story-label">What happened</p>
            {project.story.map((para) => <p key={para}>{rich(para)}</p>)}
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
              {g.photo
                ? <Photo name={g.photo} alt={g.alt || ''} sizes={i === 0 ? '100vw' : '(max-width: 900px) 100vw, 50vw'} loading="lazy" style={g.position ? { objectPosition: g.position } : undefined} />
                : g.src
                  ? <img src={g.src} alt={g.alt || ''} loading="lazy" decoding="async" />
                  : <span className="tiny detail-shot-label">{g.label || 'Image'}</span>}
            </figure>
          ))}
        </section>
      )}

      {project.scene && <SearchScene {...project.scene} />}

      {/* An interlude can break the phases in two, after a given phase. */}
      {phaseBlock(0, project.interlude ? project.interlude.after + 1 : project.sections.length)}

      {project.interlude && (
        <section className="detail-interlude">
          <p className="tiny detail-story-eyebrow">{project.interlude.eyebrow}</p>
          <p className="detail-lede">{rich(project.interlude.text)}</p>
          <figure className={`detail-interlude-shot${project.interlude.photo ? '' : ' is-empty'}`}>
            {project.interlude.photo
              ? <Photo name={project.interlude.photo} alt={project.interlude.alt || ''} sizes="100vw" loading="lazy" style={project.interlude.position ? { objectPosition: project.interlude.position } : undefined} />
              : <span className="tiny detail-shot-label">{project.interlude.label || 'Image'}</span>}
          </figure>
        </section>
      )}

      {project.interlude && phaseBlock(project.interlude.after + 1, project.sections.length)}

      {/* Who it was for: her words on their own, then her picture beside
          her profile in the app. */}
      {project.finale && (
        <>
          <section className="detail-interlude detail-finale-lead">
            <p className="tiny detail-story-eyebrow">{project.finale.eyebrow}</p>
            <p className="detail-lede">{rich(project.finale.text)}</p>
          </section>
          <TalentFinale {...project.finale} />
        </>
      )}

      {/* ── Where it stands: set like the starting point, on the same
          line, with the numbers in full weight ── */}
      <section className="detail-outcome">
        <p className="tiny detail-story-eyebrow">Where it stands</p>
        {project.outcome && (
          <>
            <p className="detail-lede">{rich(project.outcome.headline)}</p>
            <div className="detail-story-copy">
              <p>{rich(project.outcome.body)}</p>
            </div>
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
        {project.closingShot && (
          <figure className="detail-interlude-shot detail-outcome-shot">
            <Photo name={project.closingShot.photo} alt={project.closingShot.alt || ''} sizes="100vw" loading="lazy" style={project.closingShot.position ? { objectPosition: project.closingShot.position } : undefined} />
          </figure>
        )}
      </section>

      {/* ── The way in and the next case study, on Deep Carbon so the
          footer starts here ── */}
      <section className="detail-close">
        {/* The way in, as big as the page allows. */}
        <ContactLink className="detail-cta">
          <span className="tiny detail-cta-eyebrow">Have a problem like this?</span>
          <span className="detail-cta-text">
            Start a conversation
            <svg className="detail-cta-arrow" viewBox="0 0 44 24" aria-hidden="true"><path d="M0 12h40M30 2l10 10-10 10" /></svg>
          </span>
        </ContactLink>

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
