import { useRef } from 'react'
import Photo from './Photo'
import { PHOTOS } from '../data/images'
import { StatusBar, TabBar, useAppFont } from './msApp'
import { countUp, useClock, useInView } from './useScene'
import './TalentFinale.css'

/* Near the close of the case study: the talent the platform is for.
   Her photograph takes the wider column; beside it, on the kit's fine grid
   pattern, a few lines on why the work mattered and her profile in the
   app, rising from the foot of the column. She is followed once the
   column is on screen, and the count moves with it. */

const FOLLOW_AT = 1800

export default function TalentFinale({ photo, alt, position, avatar = { size: '440%', x: 50, y: 20 }, eyebrow, heading, body, name, role, badge }) {
  useAppFont()
  const ref = useRef(null)
  const on = useInView(ref, 0.3)
  const t = useClock(on, 1e9, { rest: FOLLOW_AT + 2000 })
  const src = PHOTOS[photo]?.[0]?.webp
  const followed = t >= FOLLOW_AT
  const followers = 40200 + Math.round(countUp(t, FOLLOW_AT, 2600, 37))

  const crop = (size, x, y) => ({ backgroundImage: `url(${src})`, backgroundSize: size, backgroundPosition: `${x}% ${y}%` })

  return (
    <section ref={ref} className={`finale${on ? ' is-on' : ''}`}>
      <figure className="finale-photo">
        <Photo name={photo} alt={alt} sizes="(max-width: 900px) 100vw, 60vw" loading="lazy" style={position ? { objectPosition: position } : undefined} />
      </figure>

      <div className="finale-side">
        <div className="finale-copy">
          <p className="tiny finale-eyebrow">{eyebrow}</p>
          <h2 className="finale-heading">{heading}</h2>
          <p className="finale-body">{body}</p>
        </div>

        <div className="finale-stage">
          <div className="finale-phone ms-phone ms-app" role="img" aria-label={`${name}'s profile in the Myspotlyt app`}>
            <StatusBar />
            <div className="finale-screen" aria-hidden="true">
              <p className="finale-title">Talent</p>
              <span className="finale-avatar" style={crop(avatar.size, avatar.x, avatar.y)} />
              <p className="finale-name">{name}</p>
              <p className="finale-role">{role}</p>
              <span className="finale-badge">{badge}</span>
              <div className="finale-stats">
                <span><b>1.2k</b>Following</span>
                <span><b>{followers.toLocaleString('en-NG')}</b>Followers</span>
                <span><b>18.4k</b>Votes</span>
              </div>
              <div className="finale-actions">
                <span className={`finale-btn finale-btn--follow${followed ? ' is-done' : ''}`}>{followed ? 'Following' : 'Follow'}</span>
                <span className="finale-btn">Message</span>
              </div>
              <div className="finale-tabs"><span className="is-on">Posts</span><span>Auditions</span><span>Awards</span></div>
              <div className="finale-grid">
                <span style={crop('300%', 40, 30)} />
                <span className="is-empty" />
                <span style={crop('420%', 30, 55)} />
                <span className="is-empty" />
                <span style={crop('260%', 55, 70)} />
                <span className="is-empty" />
              </div>
            </div>
            <TabBar active="Profile" />
          </div>
        </div>
      </div>
    </section>
  )
}
