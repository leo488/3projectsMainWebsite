import { useEffect, useState } from 'react'
import MorphWord from './MorphWord'
import HeroParticles from './HeroParticles'
import { Link } from '../router'
import { CONTACT_EMAIL, CLIENT_LOGOS } from '../data/site'
import { getProject } from '../data/projects'
import { CLIENT_MARKS } from './ClientLogos'
import './Hero.css'

/* One centred line, a short subhead, two actions and a grey row of
   client marks, then one case-study card as wide as the feature card
   below it: the picture on the left, and a Deep Carbon panel on the
   right with the story at the top and its numbers underneath. The
   cards turn over on their own and hold while hovered.

   A slide without an `image` shows a grey box in its place. */
const PLACEHOLDER = '/images/placeholder-gray.png'

const SLIDES = [
  {
    slug: 'crunchies-inventory',
    line: 'One live view of stock across every outlet, warehouse and kitchen.',
    image: '/images/hero-crunchies-1448.jpg',
    small: '/images/hero-crunchies-900.jpg',
  },
  {
    slug: 'myspotlyt',
    line: 'A live platform rebuilt for stability, with the features to grow it.',
    image: '/images/hero-myspotlyt-1600.jpg',
    small: '/images/hero-myspotlyt-900.jpg',
  },
]

// The row holds six places, so the marks repeat to fill it.
const ROW = Array.from({ length: 6 }, (_, i) => CLIENT_LOGOS[i % CLIENT_LOGOS.length])

const SLIDE_INTERVAL = 7000

function ClientMark({ logo }) {
  const Mark = CLIENT_MARKS[logo.mark]
  return Mark ? <Mark /> : <span className="hero-logo-word">{logo.name}</span>
}

function Card({ slide }) {
  const project = getProject(slide.slug)
  if (!project) return null
  const src = slide.image || PLACEHOLDER

  return (
    <article className="hero-card">
      <Link href={`/work/${slide.slug}`} className="hero-card-link">
        <div className={`hero-card-visual${slide.image ? '' : ' is-placeholder'}`}>
          {slide.image && (
            <img
              className="hero-card-img"
              src={slide.image}
              srcSet={slide.small ? `${slide.small} 900w, ${slide.image} 1600w` : undefined}
              sizes="(max-width: 900px) 100vw, 60vw"
              alt=""
            />
          )}
          <HeroParticles className="hero-card-canvas" src={slide.small || src} />
        </div>
        <div className="hero-card-stats">
          <div className="hero-card-head">
            <p className="hero-card-client">{project.client.split(' — ')[0]}</p>
            <p className="hero-card-line">{slide.line}</p>
          </div>
          <dl className="hero-card-numbers">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label} className="hero-card-number">
                <dt>{m.label}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Link>
    </article>
  )
}

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setCurrent((i) => (i + 1) % SLIDES.length), SLIDE_INTERVAL)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section className="hero-section">

      <div className="hero-headline-row">
        <h1 className="hero-headline">
          <span className="line-wrap">
            <span className="line-inner line-1">
              We make brands{' '}
              <MorphWord
                words={['Unstoppable', 'Adaptable', 'Decisive', 'Resilient', 'Relentless']}
              />
            </span>
          </span>
        </h1>
        <p className="hero-sub">
          3Projects designs and builds the platforms behind growing brands,
          from inventory systems to consumer apps.
        </p>
        <div className="hero-actions">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Starting%20a%20conversation`}
            className="hero-cta btn-gradient"
          >
            Start a conversation
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
              <path d="M0 6h20M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
          <Link href="/work" className="hero-view-link">
            See our case studies
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden="true">
              <path d="M1.5 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
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
        className="hero-stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Card key={current} slide={SLIDES[current]} />
      </div>

    </section>
  )
}
