import { useEffect, useRef, useState } from 'react'
import Photo from './Photo'
import { PHOTOS } from '../data/images'
import { Icon, StatusBar, TabBar, useAppFont } from './msApp'
import { useFit } from './useScene'
import './SearchScene.css'

/* A scene from the Myspotlyt app, rebuilt in code rather than pasted in
   as a screenshot, so it stays sharp at any size and can move. Someone
   searches for a talent, the suggestions come in, and the talent's
   profile opens, while the photograph behind slowly draws back. The
   loop runs only while the scene is on screen; with reduced motion it
   shows the finished search and stays still. */

const QUERY = 'Chidinma'
const SUGGESTIONS = ['Chidinma Amadi', 'Chidinma Melody', 'Chidinma audition', 'Chidinma trending']

// One pass of the story, in milliseconds from the start.
const TYPE_START = 900
const TYPE_STEP = 120
const SUGGEST_AT = TYPE_START + QUERY.length * TYPE_STEP + 300
const PICK_AT = SUGGEST_AT + 1400
const PROFILE_AT = PICK_AT + 600
const LOOP_AT = PROFILE_AT + 4200

export default function SearchScene({ photo, position, caption, also }) {
  useAppFont()
  const ref = useRef(null)
  const [t, setT] = useState(0)          // ms into the current pass
  const [on, setOn] = useState(false)    // on screen
  // The phone shrinks to fit a shorter scene, text and all, rather than
  // being cut at the top and bottom on tablets. Narrow screens keep room
  // for the caption above it.
  const k = useFit(ref, (w, h) => Math.min(1, (h - (w < 700 ? 150 : 96)) / 640))
  const still = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (still) { setT(PROFILE_AT + 1); return }
    if (!on) return
    // Ticks at the typing rate; nothing here repaints faster than that.
    let start = performance.now() - t
    const id = setInterval(() => {
      let now = performance.now() - start
      if (now > LOOP_AT) { start = performance.now(); now = 0 }
      setT(now)
    }, 60)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, still])

  const typed = QUERY.slice(0, Math.max(0, Math.floor((t - TYPE_START) / TYPE_STEP) + 1))
  const typing = t >= TYPE_START && t < SUGGEST_AT
  const suggest = t >= SUGGEST_AT
  const picked = t >= PICK_AT
  const profile = t >= PROFILE_AT
  const avatar = PHOTOS[photo]?.[0]?.webp
  const other = PHOTOS[also]?.[0]?.webp || avatar

  return (
    <section ref={ref} className={`search-scene${on || still ? ' is-on' : ''}`} style={{ '--k': k }}>
      <div className="search-scene-photo">
        <Photo name={photo} alt="" sizes="100vw" loading="lazy" style={position ? { objectPosition: position } : undefined} />
      </div>

      <div className="ms-phone ms-app" role="img" aria-label="The Myspotlyt app: a search for a talent opens her profile">
        <StatusBar />

        <div className={`ms-screen ms-discover${profile ? ' is-away' : ''}`}>
          <p className="ms-title">Discover</p>
          <div className="ms-search-row">
            <div className={`ms-field${t >= TYPE_START ? ' is-focus' : ''}`}>
              {Icon.search}
              {typed && t >= TYPE_START
                ? <span className="ms-typed">{typed}{typing && <i className="ms-caret" />}</span>
                : <span className="ms-placeholder">Search talents, tickets or auditions</span>}
            </div>
            <span className="ms-filter">{Icon.filter}</span>
          </div>

          <ul className={`ms-suggest${suggest ? ' is-in' : ''}`}>
            {SUGGESTIONS.map((s, i) => (
              <li key={s} style={{ transitionDelay: `${i * 70}ms` }}>{Icon.search}{s}</li>
            ))}
          </ul>

          <div className={`ms-accounts${suggest ? ' is-in' : ''}`}>
            <p className="ms-label">Accounts</p>
            <div className={`ms-account${picked ? ' is-picked' : ''}`}>
              <span className="ms-avatar" style={{ backgroundImage: `url(${avatar})` }} />
              <span>Chidinma Amadi</span>
            </div>
          </div>
        </div>

        <div className={`ms-screen ms-profile${profile ? ' is-in' : ''}`}>
          <p className="ms-title ms-title--small">Talent</p>
          <span className="ms-avatar ms-avatar--large" style={{ backgroundImage: `url(${avatar})` }} />
          <p className="ms-name">Chidinma Amadi</p>
          <p className="ms-handle">Talent</p>
          <div className="ms-stats">
            <span><b>12k</b>Following</span>
            <span><b>40k</b>Followers</span>
            <span><b>25</b>Posts</span>
          </div>
          <div className="ms-actions">
            <span className="ms-btn ms-btn--primary">Follow</span>
            <span className="ms-btn">Message</span>
          </div>
          <div className="ms-tabs"><span className="is-on">Posts</span><span>Auditions</span><span>Awards</span></div>
          <div className="ms-grid">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} style={{ backgroundImage: `url(${i % 2 ? other : avatar})`, backgroundPosition: `${30 + (i % 3) * 20}% ${25 + (i % 2) * 30}%` }} />
            ))}
          </div>
        </div>

        <TabBar active={profile ? '' : 'Discover'} />
      </div>

      {caption && <p className="search-scene-caption">{caption}</p>}
    </section>
  )
}
