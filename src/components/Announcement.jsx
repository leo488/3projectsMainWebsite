import { Link } from '../router'
import BuildMark from './BuildMark'
import './Announcement.css'

/* The strip above the navbar, after Persona's announcement bar. While
   the site is being built it says so, beside the brand mark building
   itself out of the pixel grid. */
export default function Announcement() {
  return (
    <aside className="announce" aria-label="Announcement">
      <BuildMark />
      <p className="announce-text">
        <strong>Pardon the pixels.</strong>{' '}
        <span className="announce-more">Our new site is being built in the open, one block at a time.</span>
      </p>
      <Link href="/work" className="announce-link">
        See what&rsquo;s live <span aria-hidden="true">→</span>
      </Link>
    </aside>
  )
}
