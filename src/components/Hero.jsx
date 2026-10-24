import { useEffect, useState } from 'react'
import MorphWord from './MorphWord'
import HeroParticles from './HeroParticles'
import { Link } from '../router'
import { CONTACT_EMAIL } from '../data/site'
import './Hero.css'

/* The photographs the hero turns through, in order. Each is cut into
   the brand's pixel edge in the artwork itself. */
const SLIDES = [
  { name: 'retail', small: '/images/hero-retail-1600.jpg', large: '/images/hero-retail-2880.jpg' },
  { name: 'cargo',  small: '/images/hero-cargo-1600.jpg',  large: '/images/hero-cargo-2880.jpg' },
]

const WORD_INTERVAL = 5200

export default function Hero() {
  const [slide, setSlide] = useState(0)

  // The photograph changes on every other word, so each picture holds
  // for two turns of the headline.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setSlide((i) => (i + 1) % SLIDES.length), WORD_INTERVAL * 2)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero-section">

      {/* ── Headline ── */}
      <div className="hero-headline-row">
        <h1 className="hero-headline">
          <span className="line-wrap">
            <span className="line-inner line-1">We build the systems that make</span>
          </span>
          <span className="line-wrap">
            <span className="line-inner line-2">
              your enterprise{' '}
              <MorphWord
                words={['Unstoppable', 'Adaptable', 'Decisive', 'Resilient', 'Relentless']}
              />
            </span>
          </span>
        </h1>
        <p className="hero-sub">
          We find the constraints holding your operation back, redesign how
          the critical work runs, and ship the technology that makes the
          change stick.
        </p>
        <div className="hero-actions">
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Starting%20a%20conversation`}
            className="hero-cta btn-gradient"
          >
            Start a Conversation
          </a>
          <Link href="/work" className="hero-view-link">
            View Case Studies
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Hero photographs ──
         The first one is rebuilt out of grid particles on load, then the
         stills take over and cross-fade in turn. */}
      <div className="hero-visual">
        {SLIDES.map((sl, i) => (
          <img
            key={sl.name}
            className={`hero-visual-img${i === slide ? ' is-active' : ''}`}
            src={sl.large}
            srcSet={`${sl.small} 1600w, ${sl.large} 2880w`}
            sizes="100vw"
            width="2880"
            height="1643"
            alt=""
            fetchPriority={i === 0 ? 'high' : 'low'}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        <HeroParticles className="hero-visual-canvas" src={SLIDES[0].small} />
      </div>

    </section>
  )
}
