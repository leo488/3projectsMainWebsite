import { Link } from '../router'
import Arrow from './Arrow'
import './Announcement.css'

/* The strip above the navbar, after Persona's announcement bar. While
   the site is being built it says so, in text alone. */
export default function Announcement() {
  return (
    <aside className="announce" aria-label="Announcement">
      <p className="announce-text">
        <strong>Our new site is on its way.</strong>{' '}
        <span className="announce-more">New pages go live as each one is finished.</span>
      </p>
      <Link href="/work" className="announce-link">
        See what&rsquo;s live <Arrow size={16} />
      </Link>
    </aside>
  )
}
