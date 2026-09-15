import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import useReveal from '../components/useReveal'
import { Link } from '../router'
import { CONTACT_EMAIL, PHASES, INDUSTRIES } from '../data/site'
import './About.css'

/* Figures follow the placeholder convention already used by the home
   page statistics band (XX, $XM+). Nothing here asserts a number the
   firm has not published. */
const NUMBERS = [
  { value: '20XX', note: 'The year the practice was founded, and the operating model it was built to fix.' },
  { value: 'XX+',  note: 'Strategists, architects, designers and engineers working as one team across six offices.' },
  { value: '$XM+', note: 'Operational efficiency released for the organisations we work with.' },
  { value: 'XXM+', note: 'People touched daily by the systems our engagements leave behind.' },
]

/* Role archetypes rather than named individuals — the practice is
   described by the disciplines it fields, not by a staff list we do
   not have. */
const PRACTICE = [
  { role: 'Transformation Director',   practice: 'Strategy',   base: 'London',    tags: ['Operating models', 'Board counsel'] },
  { role: 'Operations Architect',      practice: 'Operations', base: 'New York',  tags: ['Critical paths', 'Throughput'] },
  { role: 'Principal Systems Designer', practice: 'Design',     base: 'Remote, EU', tags: ['Service design', 'Interfaces'] },
  { role: 'Engagement Manager',        practice: 'Operations', base: 'Singapore', tags: ['Delivery', 'Governance'] },
  { role: 'Enterprise Analyst',        practice: 'Strategy',   base: 'Frankfurt', tags: ['Diagnostics', 'Modelling'] },
  { role: 'Platform Engineer',         practice: 'Technology', base: 'Remote, EU', tags: ['Integration', 'Migration'] },
  { role: 'Data & Instrumentation Lead', practice: 'Technology', base: 'London',   tags: ['Measurement', 'Telemetry'] },
  { role: 'Process Designer',          practice: 'Design',     base: 'São Paulo', tags: ['Workflow', 'Adoption'] },
  { role: 'Technology Strategist',     practice: 'Strategy',   base: 'Dubai',     tags: ['Architecture', 'Build vs buy'] },
  { role: 'Change Lead',               practice: 'Operations', base: 'New York',  tags: ['Adoption', 'Enablement'] },
]

export default function About() {
  const numbersRef = useReveal('is-visible')
  const practiceRef = useReveal('is-visible')

  return (
    <>
      <Navbar />

      {/* ── Statement ── */}
      <header className="about-hero">
        <h1 className="about-hero-headline">
          We exist between the operating<br />model and what it has to become
        </h1>
      </header>

      {/* ── Positioning ── */}
      <section className="about-position">
        <p className="tiny about-label">About 3Projects</p>
        <div className="about-position-copy">
          <p>
            Most organisations buy strategy from one firm, design from another
            and delivery from a third. Then, when it all has to come together,
            nothing quite fits. Here, strategy, design and technology work at
            the same table. One team. One conversation. From day one.
          </p>
          <p>
            We start where you are — with your constraints, your complexity,
            your teams. Discovery and research ground our decisions in what the
            work actually does, not in what the documentation says it does. We
            interrogate the brief, identify what is genuinely possible, and
            build a common thread that runs through the whole engagement. The
            result is a system that works now and keeps adapting as the
            organisation changes.
          </p>
        </div>
      </section>

      {/* ── Mark + story card ── */}
      <section className="about-story">
        <div className="about-story-plate" aria-hidden="true">
          <span className="about-story-mark">3</span>
        </div>
        <div className="about-story-card">
          <h2>How we got here</h2>
          <p>
            A practice built by operators, not by a consultancy template. Same
            people, same table, a deeper remit each year.
          </p>
          <Link href="/work" className="about-story-btn">
            Read the story <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="about-numbers" ref={numbersRef}>
        <p className="tiny about-numbers-label">3Projects in numbers</p>
        <div className="about-numbers-main">
          <h2 className="about-numbers-headline">Our journey and impact</h2>
          <ul className="about-numbers-list">
            {NUMBERS.map((n, i) => (
              <li key={n.value} className="about-number" style={{ '--i': i }}>
                <span className="about-number-value">{n.value}</span>
                <span className="about-number-note">{n.note}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Sectors ── */}
      <section className="about-sectors">
        <p className="tiny about-label">Sectors &amp; disciplines</p>
        <div className="about-sectors-main">
          <h2 className="about-sectors-headline">
            We work where the operating model carries real weight.
          </h2>
          <Link href="/work" className="about-sectors-btn">All work →</Link>

          <ul className="about-sectors-grid">
            {INDUSTRIES.map((industry) => (
              <li key={industry} className="about-sector">
                <h3>{industry}</h3>
                <p>
                  Engagements grounded in how this sector actually runs — its
                  constraints, its regulators, and the systems it cannot switch
                  off.
                </p>
                <ul className="about-sector-tags">
                  {PHASES.slice(0, 2).map((p) => (
                    <li key={p.label} className="tiny">
                      <span className="about-sector-dot" style={{ background: p.ground }} />
                      {p.label}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── The practice ── */}
      <section className="about-team" ref={practiceRef}>
        <p className="tiny about-label">The practice</p>
        <div className="about-team-main">
          <p className="about-team-copy">
            Strategists, architects, designers and engineers working across
            continents. What brings us together is not just what we do but how
            we do it: through clarity, collaboration and curiosity. With craft,
            care, and a commitment to the work outlasting us.
          </p>
          <Link href="/careers" className="about-team-btn">Careers →</Link>
        </div>

        <ul className="about-roster">
          {PRACTICE.map((r, i) => (
            <li key={r.role} className="about-roster-row" style={{ '--i': i }}>
              <span className="about-roster-role">{r.role}</span>
              <span className="tiny about-roster-practice">{r.practice}</span>
              <span className="tiny about-roster-base">{r.base}</span>
              <span className="about-roster-tags">
                {r.tags.map((t) => <span key={t} className="tiny">{t}</span>)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Close ── */}
      <section className="about-close">
        <h2>Let&rsquo;s explore what&rsquo;s next</h2>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Let%27s%20collaborate`}
          className="about-close-btn btn-gradient"
        >
          Let&rsquo;s collaborate
        </a>
      </section>

      <SiteFooter tone="bone" />
    </>
  )
}
