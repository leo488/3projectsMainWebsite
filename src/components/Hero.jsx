import './Hero.css'

export default function Hero({ zoneRef, imgRef, contentRef }) {
  return (
    <div ref={zoneRef} className="hero-scroll-zone">
      <div className="hero-wrapper">

        {/* ── Navbar ── */}
        <nav className="navbar">
          <a href="/" className="nav-logo">
            <img src="/images/logo%20dark.svg" alt="3Projects" />
          </a>

          <ul className="nav-links">
            <li><a href="#">About</a></li>
            <li><a href="#">Expertise</a></li>
            <li><a href="#">Industries</a></li>
            <li>
              <a href="#" className="has-dropdown">
                Case Studies
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </li>
            <li><a href="#">Insights</a></li>
            <li><a href="#">Impact</a></li>
            <li><a href="#">Careers</a></li>
          </ul>

          <a href="#" className="nav-contact">
            Contact
            <span className="contact-arrow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2.5 7H11.5M11.5 7L7.5 3M11.5 7L7.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </a>
        </nav>

        {/* ── Hero Image ── */}
        <div ref={imgRef} className="hero-image-container">
          <img
            src="/images/hero%20image.png"
            alt="Aerial view of enterprise logistics"
            className="hero-bg-image"
          />
          <div ref={contentRef} className="hero-content">
            <h1 className="hero-headline">
              <span className="line-wrap">
                <span className="line-inner line-1">We redesign how the</span>
              </span>
              <span className="line-wrap">
                <span className="line-inner line-2">
                  enterprise <em className="hero-accent">grows.</em>
                </span>
              </span>
            </h1>
            <div className="hero-actions">
              <a href="#" className="btn-primary">Start a Conversation</a>
              <a href="#" className="btn-ghost">View Case Studies ↗</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
