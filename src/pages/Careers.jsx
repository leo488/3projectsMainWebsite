import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import useReveal from '../components/useReveal'
import { Link } from '../router'
import { CONTACT_EMAIL, PHASES } from '../data/site'
import './Careers.css'

const PRINCIPLES = [
  {
    title: 'One team, working together',
    body: 'Strategy sits with design, design sits alongside delivery. From the first diagnostic through to the systems that outlast the engagement, everyone works from one conversation rather than passing a brief down a chain.',
  },
  {
    title: 'What guides us',
    body: 'Clarity, collaboration, curiosity, craft and care. These are not abstract principles — they are how we work. We push for clarity when things get complex, and we collaborate honestly even when the answer is unwelcome.',
  },
  {
    title: 'Remote-first, genuinely connected',
    body: 'We are distributed across six offices and several more time zones. Remote does not mean disconnected: we build systems for staying aligned, sharing knowledge, and supporting each other wherever the work happens.',
  },
  {
    title: 'Room to grow',
    body: 'Learning happens through real engagements, not past training programmes. People here take on challenges that stretch them, work across disciplines, and shape their own development.',
  },
]

const ROLES = [
  { title: 'Senior Transformation Consultant',   team: 'Strategy',   location: 'London · Remote' },
  { title: 'Operations Architect',               team: 'Operations', location: 'New York · Remote' },
  { title: 'Principal Systems Designer',         team: 'Design',     location: 'Remote, EU' },
  { title: 'Senior Platform Engineer',           team: 'Technology', location: 'Frankfurt · Remote' },
  { title: 'Data & Instrumentation Lead',        team: 'Technology', location: 'Remote, EU' },
  { title: 'Engagement Manager',                 team: 'Operations', location: 'Singapore' },
]

function mail(subject) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`
}

export default function Careers() {
  const principlesRef = useReveal('is-visible')
  const rolesRef = useReveal('is-visible')

  return (
    <>
      <Navbar theme="dark" />

      {/* ── Masthead on a solid brand ground ── */}
      <header className="careers-intro">
        <p className="tiny careers-intro-eyebrow">Careers</p>
        <h1 className="careers-intro-headline">
          Where strategy, design and<br />technology work at one table
        </h1>
        <div className="careers-intro-actions">
          <a href="#open-positions" className="careers-intro-btn">
            See open positions
          </a>
          <span className="tiny careers-intro-count">{ROLES.length} open positions</span>
        </div>
      </header>

      {/* ── How we work ── */}
      <section className="careers-how">
        <p className="tiny careers-how-label">How we work</p>
        <div className="careers-how-copy">
          <p>
            Design brings creativity. Strategy brings clarity. Technology brings
            scale. Here, they do not compete for the same ground — they
            collaborate, and that balance is what makes the work challenging in
            the best way.
          </p>
          <p>
            The culture is built on how we approach that challenge. We push for
            clarity when things get messy. We stay curious about better answers.
            We collaborate honestly, even when it is difficult. We care about the
            details because craft matters, and about each other because the work
            is better when people feel supported.
          </p>
        </div>
      </section>

      <section className="careers-principles" ref={principlesRef}>
        <ol className="careers-principles-grid">
          {PRINCIPLES.map((p, i) => (
            <li key={p.title} className="careers-principle" style={{ '--i': i }}>
              <span className="tiny careers-principle-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Image strip — brand plates until the photography exists ── */}
      <section className="careers-strip" aria-hidden="true">
        {PHASES.map((p) => (
          <div key={p.label} className="careers-strip-plate" style={{ background: p.ground }}>
            <span className="tiny">{p.label}</span>
          </div>
        ))}
      </section>

      {/* ── Who we look for ── */}
      <section className="careers-people">
        <p className="tiny careers-people-label">Who we look for</p>
        <div className="careers-people-copy">
          <h2>People who care about the work and the people they work with</h2>
          <p>
            We look for people who are thoughtful about their craft and curious
            about the organisations they work inside — people who can hold
            complexity without needing every answer upfront.
          </p>
          <p>
            That means building meaningful work with care and intention. We value
            clear communication, a sense of responsibility, and respect for
            perspectives and ways of working that are not our own. If trust
            matters to you, and you welcome feedback and see quality as a
            collective effort, this is the kind of environment we are building.
          </p>
        </div>
      </section>

      {/* ── Open positions ── */}
      <section className="careers-roles" id="open-positions" ref={rolesRef}>
        <div className="careers-roles-head">
          <p className="tiny careers-roles-label">Core positions</p>
          <h2>Current open positions in our core team</h2>
        </div>

        <ul className="careers-roles-list">
          {ROLES.map((r, i) => (
            <li key={r.title} className="careers-role" style={{ '--i': i }}>
              <span className="careers-role-title">{r.title}</span>
              <span className="tiny careers-role-team">{r.team}</span>
              <span className="tiny careers-role-location">{r.location}</span>
              <a
                href={mail(`Application — ${r.title}`)}
                className="tiny careers-role-apply"
              >
                Apply
              </a>
            </li>
          ))}
        </ul>

        <div className="careers-pool">
          <p className="tiny careers-roles-label">Talent pool</p>
          <h3>
            We collaborate with specialists as projects and needs evolve.
            Interested in joining our network?
          </h3>
          <a href={mail('Open application')} className="careers-pool-link">
            Send an open application →
          </a>
        </div>
      </section>

      {/* ── Close ── */}
      <section className="careers-close">
        <h2>Let&rsquo;s explore what&rsquo;s next</h2>
        <div className="careers-close-actions">
          <a href={mail('Starting a conversation')} className="careers-close-btn btn-gradient">
            Start a Conversation
          </a>
          <Link href="/work" className="careers-close-secondary">See the work →</Link>
        </div>
      </section>

      <SiteFooter tone="bone" />
    </>
  )
}
