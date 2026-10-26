import { useEffect, useRef, useState } from 'react'
import MorphWord from './MorphWord'
import { Link } from '../router'
import { CLIENT_LOGOS } from '../data/site'
import { getProject } from '../data/projects'
import Photo from './Photo'
import { CLIENT_MARKS } from './ClientLogos'
import ContactLink from './ContactLink'
import './Hero.css'

/* One centred line, a short subhead, two actions and a grey row of
   client marks, then a full-width band in three parts: the case study
   in play with its numbers, its picture, and a strip of brand pattern.
   The band turns over on its own: each turn changes the ground and
   pattern (Pale Blue, Deep Enterprise, Electric Cobalt, each with
   its kit pattern) and the case study. It holds while hovered. */
const STATES = [
  { ground: 'var(--pale-blue)',    pattern: 'wave-multi', light: true },
  { ground: 'var(--section-blue)', pattern: 'wave-blue' },
  { ground: 'var(--cta-blue)',     pattern: 'pixel-lines-blue' },
]

const SLIDES = [
  {
    slug: 'crunchies-inventory',
    line: 'One live view of stock across every outlet, warehouse and kitchen.',
    image: 'hero-notes',
  },
  {
    slug: 'myspotlyt',
    line: 'A live platform rebuilt for stability, with the features to grow it.',
    image: 'hero-apps',
  },
]

// The row holds six places, so the marks repeat to fill it.
const ROW = Array.from({ length: 6 }, (_, i) => CLIENT_LOGOS[i % CLIENT_LOGOS.length])

const TURN = 6500

function ClientMark({ logo }) {
  const Mark = CLIENT_MARKS[logo.mark]
  return Mark ? <Mark /> : <span className="hero-logo-word">{logo.name}</span>
}

export default function Hero() {
  const [tick, setTick] = useState(0)
  const [paused, setPaused] = useState(false)
  const actionsRef = useRef(null)
  const state = STATES[tick % STATES.length]
  const slide = SLIDES[tick % SLIDES.length]
  const project = getProject(slide.slug)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setTick((t) => t + 1), TURN)
    return () => clearInterval(id)
  }, [paused])

  // Only one animated Start a conversation on screen at a time: while
  // the hero's is in view, the header's steps aside.
  useEffect(() => {
    const el = actionsRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle('cta-handoff', entry.isIntersecting)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      document.body.classList.remove('cta-handoff')
    }
  }, [])

  return (
    <section className="hero-section">
      <div className="hero-headline-row">
        <h1 className="hero-headline">
          <span className="line-wrap">
            <span className="line-inner">
              We make brands{' '}
              <MorphWord words={['Unstoppable', 'Adaptable', 'Decisive', 'Resilient', 'Relentless']} />
            </span>
          </span>
        </h1>
        <p className="hero-sub">
          We help businesses grow. We find what is holding them back,{' '}
          <br className="hero-sub-break" />
          prove it with data, and build what moves them forward.
        </p>
        <div className="hero-actions" ref={actionsRef}>
          <ContactLink className="hero-cta btn-gradient">
            Start a conversation
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
              <path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </ContactLink>
          <Link href="/work" className="btn btn--black">See our case studies</Link>
        </div>
      </div>

      <ul className="hero-logos" aria-label="Brands we have built for">
        {ROW.map((logo, i) => (
          <li
            key={i}
            className="hero-logo"
            style={{ '--i': i }}
            aria-hidden={i >= CLIENT_LOGOS.length ? 'true' : undefined}
          >
            <ClientMark logo={logo} />
          </li>
        ))}
      </ul>

      <div
        className={`hero-band${state.light ? ' hero-band--light' : ''}`}
        style={{ background: state.ground }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {project && (
          <Link href={`/work/${slide.slug}`} className="hero-case" key={slide.slug}>
            <p className="tiny hero-case-client">{project.client.split(' — ')[0]}</p>
            <p className="hero-case-line">{slide.line}</p>
            <dl className="hero-case-numbers">
              {project.metrics.slice(0, 2).map((m) => (
                <div key={m.label} className="hero-case-number">
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </Link>
        )}

        <Link href={`/work/${slide.slug}`} className="hero-visual" aria-label={project?.client}>
          {SLIDES.map((s) => (
            <Photo
              key={s.slug}
              name={s.image}
              className={`hero-img${s === slide ? ' is-on' : ''}`}
              sizes="(max-width: 760px) 100vw, 80vw"
              fetchPriority={s === SLIDES[0] ? 'high' : undefined}
            />
          ))}
        </Link>

        <div className="hero-pattern" role="presentation">
          {STATES.map((st) => (
            <span
              key={st.pattern}
              className={`hero-wave hero-wave--${st.pattern}${st === state ? ' is-on' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
