import { Link } from '../router'
import './Hero.css'

export default function Hero() {
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
              your enterprise <span className="hero-accent">Unstoppable</span>
            </span>
          </span>
        </h1>
        <Link href="/work" className="hero-view-link">
          View Case Studies
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* ── Pixel-art hero image ──
         Served as a flat raster for now. public/images/Hero.svg holds the
         same artwork with the pixel blocks as individual vector shapes —
         swap to that (inlined) when we animate the pixels. */}
      <div className="hero-visual">
        <img
          className="hero-visual-img"
          src="/images/hero-2880.jpg"
          srcSet="/images/hero-1600.jpg 1600w, /images/hero-2880.jpg 2880w"
          sizes="100vw"
          width="2880"
          height="2035"
          alt=""
          fetchPriority="high"
        />
      </div>

    </section>
  )
}
