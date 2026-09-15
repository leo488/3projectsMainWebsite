import { useState } from 'react'
import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import useReveal from '../components/useReveal'
import { Link } from '../router'
import { PROJECTS, CATEGORIES } from '../data/projects'
import './Work.css'

const APPROACH = [
  {
    label: 'Discover',
    title: 'We start where you are',
    body: 'Every engagement opens against the operating model as it actually runs — the workarounds, the queues, the reports nobody reads — not the one on the org chart.',
    ground: 'var(--amber)',
  },
  {
    label: 'Design',
    title: 'Redesign the work first',
    body: 'Process before software. We rebuild each critical path around the decision it exists to support, then specify what has to be built, bought or retired to carry it.',
    ground: 'var(--indigo)',
  },
  {
    label: 'Deliver',
    title: 'Ship into the live operation',
    body: 'Delivery runs in slices against real work, so every change is measured against the operation it is meant to improve rather than a staging environment.',
    ground: 'var(--cyan)',
  },
  {
    label: 'Sustain',
    title: 'Leave the capability behind',
    body: 'Instrumentation, ownership and a review cadence stay with the teams running the work. The engagement ends; the operating model does not.',
    ground: 'var(--mint)',
  },
]

function ProjectCard({ project, index }) {
  return (
    <li className="work-card" style={{ '--i': index, '--ratio': project.ratio }}>
      <Link href={`/work/${project.slug}`} className="work-card-link">
        <div className="work-card-visual" style={{ background: project.ground }}>
          <span className="tiny work-card-industry">{project.industry}</span>
        </div>
        <div className="work-card-body">
          <h2 className="work-card-title">{project.title}</h2>
          <p className="work-card-summary">{project.summary}</p>
          <span className="tiny work-card-tag">{project.tag}</span>
        </div>
      </Link>
    </li>
  )
}

export default function Work() {
  const [active, setActive] = useState('All')
  const gridRef = useReveal('is-visible')
  const approachRef = useReveal('is-visible')

  const shown = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categories.includes(active))

  return (
    <>
      <Navbar theme="dark" />

      {/* ── Introduction on a solid brand ground ── */}
      <header className="work-intro">
        <p className="tiny work-intro-eyebrow">Selected Work</p>
        <h1 className="work-intro-headline">
          The work we do and<br />the organisations we do it with
        </h1>
        <p className="work-intro-body">
          We are brought in when the operating model is the problem — when the
          work has outgrown the way it is organised and no single team can see
          the whole of it. What follows is a selection of those engagements.
        </p>
        <dl className="work-intro-stats">
          <div><dt className="tiny">Engagements</dt><dd>{PROJECTS.length}</dd></div>
          <div><dt className="tiny">Sectors</dt><dd>4</dd></div>
          <div><dt className="tiny">Disciplines</dt><dd>4</dd></div>
        </dl>
      </header>

      {/* ── Category filter ── */}
      <nav className="work-filter" aria-label="Filter work by discipline">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`tiny work-filter-btn${c === active ? ' is-active' : ''}`}
            aria-pressed={c === active}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
        <span className="tiny work-filter-count">
          {shown.length} {shown.length === 1 ? 'project' : 'projects'}
        </span>
      </nav>

      {/* ── Two-column grid, deliberately uneven ── */}
      <section className="work-grid-section" ref={gridRef}>
        {shown.length > 0 ? (
          <ul className="work-grid">
            {shown.map((p, i) => <ProjectCard key={p.slug} project={p} index={i} />)}
          </ul>
        ) : (
          <p className="work-empty">Nothing under that discipline yet.</p>
        )}
      </section>

      {/* ── How the work runs — carries the page between grid and close ── */}
      <section className="approach" ref={approachRef}>
        <div className="approach-head">
          <p className="tiny approach-eyebrow">How the work runs</p>
          <h2 className="approach-headline">
            Four phases, one team, no handoff between them
          </h2>
          <p className="approach-body">
            The same four phases carry every engagement on this page. They are
            not stages a project passes through and leaves behind — each one
            keeps running as the next begins.
          </p>
        </div>
        <ol className="approach-list">
          {APPROACH.map((a, i) => (
            <li key={a.label} className="approach-item" style={{ '--i': i }}>
              <span className="approach-swatch" style={{ background: a.ground }} />
              <span className="tiny approach-label">{a.label}</span>
              <h3 className="approach-title">{a.title}</h3>
              <p className="approach-text">{a.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <SiteFooter tone="bone" />
    </>
  )
}
