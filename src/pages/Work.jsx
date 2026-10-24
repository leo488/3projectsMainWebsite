import { useState } from 'react'
import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import useReveal from '../components/useReveal'
import PixelArt from '../components/PixelArt'
import PhaseCards from '../components/PhaseCards'
import { Link } from '../router'
import { PROJECTS, CATEGORIES } from '../data/projects'
import './Work.css'

function ProjectCard({ project, index }) {
  return (
    <li
      className={`work-card work-card--${project.tone || 'dark'}`}
      style={{ '--i': index, '--ratio': project.ratio }}
    >
      <Link href={`/work/${project.slug}`} className="work-card-link">
        <div className={`work-card-visual${project.art ? ` work-card-visual--${project.art}` : ''}`}>
          {project.art && <PixelArt name={project.art} className="work-card-art" />}
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

  const shown = active === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.categories.includes(active))

  return (
    <div>
      <Navbar />

      {/* ── Introduction ── */}
      <header className="page-intro">
        <p className="tiny page-intro-eyebrow">Selected Work</p>
        <h1 className="page-intro-headline">
          The work we do and <br />the organisations we do it with
        </h1>
        <p className="page-intro-body">
          We are brought in when the operating model is the problem — when the
          work has outgrown the way it is organised and no single team can see
          the whole of it. What follows is a selection of those engagements.
        </p>
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

      {/* ── How the work runs — Deep Carbon from here into the footer ── */}
      <section className="approach">
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
        <PhaseCards />
      </section>

      <SiteFooter />
    </div>
  )
}
