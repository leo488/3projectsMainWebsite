import { Link } from '../router'
import BuildMark, { GEAR } from './BuildMark'
import './Announcement.css'

/* The strip above the navbar, after Persona's announcement bar. While
   the site is being built it says so, beside the kit's gear icon. */
export default function Announcement() {
  return (
    <aside className="announce" aria-label="Announcement">
      <BuildMark grid={GEAR} still />
      <p className="announce-text">
        <strong>Our new site is on its way.</strong>{' '}
        <span className="announce-more">New pages go live as each one is finished.</span>
      </p>
      <Link href="/work" className="announce-link">
        See what&rsquo;s live <span aria-hidden="true">→</span>
      </Link>
    </aside>
  )
}
