import { useEffect, useRef, useState } from 'react'
import Photo from './Photo'
import { PHOTOS } from '../data/images'
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

function useAppFont() {
  useEffect(() => {
    const id = 'font-poppins'
    if (document.getElementById(id)) return
    const link = document.createElement('link')
    link.id = id
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap'
    document.head.appendChild(link)
  }, [])
}

const Icon = {
  search: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4.5 4.5" /></svg>
  ),
  filter: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M7 12h10M10 17h4" /></svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z" /></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v4a5 5 0 0 1-10 0zM12 13v4M8 20h8M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" /></svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="10" r="3" /><path d="M6.5 18a6.5 6.5 0 0 1 11 0" /></svg>
  ),
}

export default function SearchScene({ photo, position, caption, also }) {
  useAppFont()
  const ref = useRef(null)
  const [t, setT] = useState(0)          // ms into the current pass
  const [on, setOn] = useState(false)    // on screen
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
    <section ref={ref} className={`search-scene${on || still ? ' is-on' : ''}`}>
      <div className="search-scene-photo">
        <Photo name={photo} alt="" sizes="100vw" loading="lazy" style={position ? { objectPosition: position } : undefined} />
      </div>

      <div className="ms-phone" role="img" aria-label="The Myspotlyt app: a search for a talent opens her profile">
        <div className="ms-status"><span>9:41</span><span className="ms-status-icons" /></div>

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

        <nav className="ms-nav" aria-hidden="true">
          <span>{Icon.home}Home</span>
          <span className={profile ? '' : 'is-on'}>{Icon.search}Discover</span>
          <span className="ms-plus">+</span>
          <span>{Icon.award}Awards</span>
          <span>{Icon.profile}Profile</span>
        </nav>
      </div>

      {caption && <p className="search-scene-caption">{caption}</p>}
    </section>
  )
}
