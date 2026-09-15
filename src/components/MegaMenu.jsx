import { Link } from '../router'
import { SERVICES, INDUSTRIES, PHASES } from '../data/site'
import './MegaMenu.css'

export default function MegaMenu({ open, onNavigate, panelRef, onEnter, onLeave }) {
  return (
    <div
      ref={panelRef}
      id="expertise-menu"
      className={`mega${open ? ' is-open' : ''}`}
      hidden={!open}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="mega-inner">
        <section className="mega-col mega-col--services">
          <p className="tiny mega-label">Services</p>
          <ul className="mega-list">
            {SERVICES.map((s) => (
              <li key={s.label}>
                <Link href="/work" onClick={onNavigate} className="mega-service">
                  <span className="mega-service-name">{s.label}</span>
                  <span className="mega-service-desc">{s.desc}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mega-col">
          <p className="tiny mega-label">Industries</p>
          <ul className="mega-list mega-list--plain">
            {INDUSTRIES.map((i) => (
              <li key={i}>
                <Link href="/work" onClick={onNavigate}>{i}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mega-col">
          <p className="tiny mega-label">How the work runs</p>
          <ul className="mega-list mega-list--phases">
            {PHASES.map((p) => (
              <li key={p.label}>
                <Link href="/work" onClick={onNavigate} className="mega-phase">
                  <span className="mega-phase-swatch" style={{ background: p.ground }} />
                  <span>
                    <span className="mega-phase-name">{p.label}</span>
                    <span className="mega-phase-note">{p.note}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mega-col mega-col--cta">
          <p className="tiny mega-label">Selected work</p>
          <p className="mega-cta-copy">
            Four engagements, four operating models rebuilt. See how the
            phases run end to end.
          </p>
          <Link href="/work" onClick={onNavigate} className="mega-cta-link">
            View all work →
          </Link>
        </section>
      </div>
    </div>
  )
}
