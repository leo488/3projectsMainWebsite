import { Link } from '../router'
import Arrow from './Arrow'
import { SERVICES, INDUSTRIES, PHASES } from '../data/site'
import './MegaMenu.css'

/* Three parts, divided by rules: a case-study panel on the left, the
   services on a solid Deep Enterprise panel, then plain link columns.
   Every item in the panel is a link. The case-study panel shows the
   kit's wave pattern until it has a picture of its own, since no
   picture is repeated across the site. */
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
        <Link href="/work/crunchies-inventory" onClick={onNavigate} className="mega-feature">
          <span className="mega-feature-pattern" aria-hidden="true" />
          <span className="mega-feature-caption">
            <span className="tiny">Case study</span>
            <span className="mega-feature-title">Crunchies: one live view of stock <Arrow size={16} /></span>
          </span>
        </Link>

        <section className="mega-col mega-col--services">
          <Link href="/work" onClick={onNavigate} className="tiny mega-label">Services</Link>
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
          <Link href="/work" onClick={onNavigate} className="tiny mega-label">Industries</Link>
          <ul className="mega-list mega-list--plain">
            {INDUSTRIES.map((i) => (
              <li key={i}>
                <Link href="/work" onClick={onNavigate}>{i}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mega-col">
          <Link href="/work" onClick={onNavigate} className="tiny mega-label">How the work runs</Link>
          <ul className="mega-list mega-list--plain">
            {PHASES.map((p) => (
              <li key={p.label}>
                <Link href="/work" onClick={onNavigate}>{p.label}</Link>
              </li>
            ))}
          </ul>
          <Link href="/work" onClick={onNavigate} className="mega-all">
            View all work <Arrow size={16} />
          </Link>
        </section>
      </div>
    </div>
  )
}
