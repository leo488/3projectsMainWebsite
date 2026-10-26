import { useEffect, useRef, useState } from 'react'
import Photo from './Photo'
import { PHOTOS } from '../data/images'
import { Icon, MsLogo, StatusBar, TabBar, useAppFont } from './msApp'
import { countUp, prefersStill, useClock, useFit, useInView } from './useScene'
import './MsScreens.css'

/* The Myspotlyt case study's four phase panels, rebuilt in code from the
   Figma file so they stay sharp and can move. Each is laid out on a
   780 × 520 stage that scales with its panel: the stage fills the
   panel's height and keeps its centre, so on narrow screens the edges
   fall away and the middle, where the screen is, stays. Photographs
   from the app are grey stand-ins until the originals arrive.
   Everything moves only while on screen; with reduced motion each holds
   its finished frame. */

const naira = (n) => `₦${Math.round(n).toLocaleString('en-NG')}`

// ── 01 Discover: the home feed, live ──────────────────────────────

const COMMENTS = [
  ['Ada', 'This is everything 👏'],
  ['Tobi', 'Voted twice already'],
  ['Kemi', 'Where is the next audition?'],
  ['Ife', 'Queen behaviour 👑'],
  ['Musa', 'Lagos is watching'],
  ['Zara', 'That walk though'],
  ['Femi', 'Front row next year'],
  ['Bisi', 'Sharing this now'],
]

function Live({ on, through }) {
  // A clock that never wraps, so each comment keeps its place as the
  // next one pushes it up.
  const t = useClock(on, 1e9, { rest: 3 * 1500 + 1 })
  const n = Math.floor(t / 1500)
  const shown = [3, 2, 1, 0].map((back) => n - back)
  const comment = (m) => COMMENTS[((m % COMMENTS.length) + COMMENTS.length) % COMMENTS.length]
  const watching = 1284 + Math.round(36 * Math.sin(t / 1300) + (t % 60000) / 400)
  const hearts = 445.8 + (t % 600000) / 9000

  return (
    <div className="ms-live ms-phone">
      <div className="ms-live-video" style={through} />
      <StatusBar />
      <div className="ms-live-tabs">
        <span className="is-on">Home feed</span><span>Following</span><span>Auditions</span>
      </div>
      <div className="ms-live-badges">
        <span className="ms-live-badge"><i />LIVE</span>
        <span className="ms-live-watch">{Icon.eye}{watching.toLocaleString('en-NG')}</span>
      </div>

      <div className="ms-live-rail">
        <span className="ms-live-heart">
          {Icon.heart}
          {[0, 1, 2, 3, 4].map((i) => <i key={i} className="ms-float" style={{ '--d': `${i * 0.7}s`, '--x': `${(i % 2 ? 1 : -1) * (6 + i * 3)}px` }}>{Icon.heart}</i>)}
          {hearts.toFixed(1)}k
        </span>
        <span>{Icon.chat}12k</span>
        <span>{Icon.bookmark}70.5k</span>
        <span>{Icon.share}101.2k</span>
      </div>

      <ul className="ms-live-comments">
        {shown.map((m) => (
          <li key={m}><b>{comment(m)[0]}</b>{comment(m)[1]}</li>
        ))}
      </ul>

      <div className="ms-live-creator">
        <p><span className="ms-dot-avatar" />Okafor Emmanuella <span className="ms-pill">Follow</span></p>
        <p className="ms-live-entry">Entry in <u>Fessa Award and Dinner Night</u>, Entrepreneur of the year</p>
      </div>
      <TabBar active="Home" />
    </div>
  )
}

// ── 02 Design: a vote, from the award to the payment ─────────────

const PAY_AT = 1300
const STEP_AT = 1900
const PRESS_AT = STEP_AT + 9 * 170 + 500
const DONE_AT = PRESS_AT + 450
const VOTE_LOOP = DONE_AT + 4200

function Vote({ on }) {
  const t = useClock(on, VOTE_LOOP, { rest: DONE_AT + 1 })
  const votes = Math.min(10, 1 + Math.max(0, Math.floor((t - STEP_AT) / 170) + 1))
  const ending = t > VOTE_LOOP - 500

  return (
    <>
      <div className="ms-vote-phone ms-phone">
        <StatusBar />
        <div className="ms-vote-screen">
          <p className="ms-screen-title">Awards</p>
          <div className="ms-field">{Icon.search}<span>Search awards</span></div>
          <span className="ms-btn-violet">Create New Award</span>
          {[
            ['Student of the Year Award', 'Celebrating scholars', 'November', '14th'],
            ['Fessa Award and Dinner Night', 'A night of grand mirage', 'November', '22nd'],
          ].map(([name, line, month, day]) => (
            <article key={name} className="ms-award">
              <div className="ms-award-photo" />
              <p className="ms-award-name"><span className="ms-dot-avatar" />{name}{Icon.share}</p>
              <div className="ms-award-foot">
                <span>{line}<small>Step into the spotlight and claim your crown.</small></span>
                <span className="ms-date">{month}<b>{day}</b></span>
              </div>
            </article>
          ))}
        </div>
        <TabBar active="Awards" />
      </div>

      <div className={`ms-card ms-pay${t >= PAY_AT && !ending ? ' is-in' : ''}`}>
        <p className="ms-card-title">Complete vote</p>
        <p className="ms-card-sub">Fessa Award and Dinner Night</p>
        <div className="ms-nominee">
          <span className="ms-dot-avatar ms-dot-avatar--big" />
          <span>Okoro Emmanuel<small>Entrepreneur of the year</small></span>
        </div>
        <div className="ms-stepper">
          <span>Votes</span>
          <span className="ms-stepper-ctl"><i>−</i><b>{votes}</b><i className={t >= STEP_AT && votes < 10 ? 'is-tap' : ''}>+</i></span>
        </div>
        <div className="ms-total"><span>Total</span><b>{naira(votes * 100)}</b></div>
        <span className={`ms-btn-violet ms-btn-block${t >= PRESS_AT && t < PRESS_AT + 220 ? ' is-press' : ''}`}>Pay {naira(votes * 100)}</span>
      </div>

      <div className={`ms-card ms-toast${t >= DONE_AT && !ending ? ' is-in' : ''}`}>
        <span className="ms-check">{Icon.check}</span>
        <span>
          <b>Voting successful</b>
          <small>You voted for Okoro Emmanuel for Entrepreneur of the year.</small>
        </span>
      </div>
    </>
  )
}

// ── 03 Deliver: the admin dashboard ──────────────────────────────

const STATS = [
  ['Total users', 4812, '5%'],
  ['Active users', 3024, '8%'],
  ['Votes cast', 18460, '12%'],
  ['Ticket sales today', 42000, '2%', true],
]

// Three revenue lines across twelve months, in chart coordinates.
const LINES = [
  ['#7158e2', [120, 60, 150, 40, 110, 90, 30, 70, 120, 50, 100, 20]],
  ['#3b7bff', [140, 130, 110, 125, 95, 100, 80, 90, 70, 75, 60, 45]],
  ['#22b07d', [150, 140, 145, 120, 128, 110, 115, 95, 100, 85, 88, 70]],
]
// The activity feed: a new line arrives at the top every few seconds.
const ACTIVITY = [
  ['Chioma O.', 'Voted in Fessa Awards', naira(1000)],
  ['Tunde A.', "Bought a ticket, Nigeria's Got Talent", naira(5000)],
  ['Aisha B.', 'Joined as a talent', 'Free'],
  ['Kelechi N.', 'Voted in Student of the Year', naira(500)],
  ['Funmi S.', 'Bought a ticket, Lagos Open Mic', naira(5000)],
  ['Ibrahim D.', 'Registered for an audition', naira(2000)],
]
const ACTIVITY_EVERY = 2400

const path = (ys) => ys.map((y, i) => `${i ? 'L' : 'M'}${i * 40} ${y}`).join(' ')

function Dashboard({ on }) {
  const t = useClock(on, 1e9, { rest: 1e9 - 1 })
  const nav = ['Home', 'Users', 'Scouts KYC', 'Awards', 'Tickets', 'Finance & ledger', 'Votes & engagement', 'Moderation']
  const icons = [Icon.home, Icon.users, Icon.shield, Icon.award, Icon.ticket, Icon.wallet, Icon.heart, Icon.shield]

  return (
    <div className="ms-window ms-dash">
      <aside className="ms-side">
        <MsLogo />
        <ul>
          {nav.map((n, i) => <li key={n} className={i === 0 ? 'is-on' : ''}>{icons[i]}{n}</li>)}
        </ul>
        <p className="ms-side-user"><span className="ms-dot-avatar ms-dot-avatar--big" />Admin<small>admin@myspotlyt.com</small></p>
      </aside>
      <main className="ms-main">
        <div className="ms-top"><span className="ms-field ms-field--light">{Icon.search}Search events, cities, scouts</span></div>
        <p className="ms-welcome">Welcome, Admin</p>
        <div className="ms-stats">
          {STATS.map(([label, value, up, money], i) => {
            const v = countUp(t, 300 + i * 120, 1500, value)
            return (
              <div key={label} className="ms-stat">
                <span className="ms-stat-icon">{[Icon.users, Icon.profile, Icon.heart, Icon.ticket][i]}</span>
                <small>Last 30 days</small>
                <p>{label}</p>
                <b>{money ? naira(v) : Math.round(v).toLocaleString('en-NG')}<i>↑ {up}</i></b>
              </div>
            )
          })}
        </div>
        <div className="ms-dash-row">
          <section className="ms-panel ms-chart">
            <header><b>Revenue trends</b>
              <span className="ms-legend"><i style={{ background: LINES[0][0] }} />Tickets<i style={{ background: LINES[1][0] }} />Votes<i style={{ background: LINES[2][0] }} />Registration</span>
            </header>
            <svg viewBox="-36 -10 486 190" aria-hidden="true">
              {[0, 40, 80, 120, 160].map((y, i) => (
                <g key={y}><path d={`M0 ${y}H440`} className="ms-grid" /><text x="-10" y={y + 4}>{(4 - i) * 250}</text></g>
              ))}
              {LINES.map(([c, ys], i) => (
                <path key={c} d={path(ys)} pathLength="1" className="ms-line" style={{ stroke: c, '--d': `${0.4 + i * 0.25}s` }} />
              ))}
              <circle cx="440" cy={LINES[0][1][11]} r="4" className="ms-line-end" />
            </svg>
          </section>
          <section className="ms-panel ms-review">
            <header><b>Needs review</b></header>
            {[['Dianne Russell', 'High value payout', naira(245000)], ['@mikeflow', 'Flagged video', '12 reports']].map(([who, what, n], i) => (
              <div key={who} className="ms-review-item">
                <span><span className="ms-dot-avatar" />{who}<small>{what}</small><em>{n}</em></span>
                <span className={`ms-btn-violet${i === 0 ? ' is-pulse' : ''}`}>Review</span>
              </div>
            ))}
          </section>
        </div>
        <section className="ms-panel ms-activity">
          <header><b>Recent activity</b><span className="ms-live-dot">Live</span></header>
          <ul>
            {[0, 1, 2].map((back) => {
              const m = Math.floor(t / ACTIVITY_EVERY) - back
              const [who, what, amount] = ACTIVITY[((m % ACTIVITY.length) + ACTIVITY.length) % ACTIVITY.length]
              return (
                <li key={m}>
                  <span className="ms-dot-avatar" /><b>{who}</b><span>{what}</span><em>{amount}</em><span>{back ? `${back * 2}m ago` : 'Just now'}</span>
                </li>
              )
            })}
          </ul>
        </section>
      </main>
    </div>
  )
}

// ── 04 Sustain: tickets, selling ─────────────────────────────────

const EVENTS = [
  ["Nigeria's Got Talent", 'Dance', 142],
  ['Fessa Dinner Night', 'Awards', 96],
  ['Lagos Open Mic', 'Music', 58],
  ['Afro Steps Live', 'Dance', 171],
  ['Spoken Word Sunday', 'Poetry', 33],
  ['Campus Star Finals', 'Talent', 120],
]
const BUYERS = ['Chioma', 'Tunde', 'Aisha', 'Kelechi', 'Funmi', 'Ibrahim']
const SALE_EVERY = 2600

function Tickets({ on }) {
  const t = useClock(on, 1e9, { rest: 0 })
  const sale = Math.floor(t / SALE_EVERY)
  const at = sale % EVENTS.length
  // Every sale lands on the next event in turn.
  const sold = (i) => EVENTS[i][2] + (sale >= i ? Math.floor((sale - i) / EVENTS.length) + 1 : 0)

  return (
    <>
      <div className="ms-window ms-tickets">
        <aside className="ms-side ms-side--profile">
          <span className="ms-dot-avatar ms-dot-avatar--huge" />
          <p>Amber Jay<small>Organiser</small></p>
          <ul>
            <li>{Icon.home}Home</li><li>{Icon.search}Explore talents</li><li>{Icon.award}Awards</li>
            <li className="is-on">{Icon.ticket}Tickets</li><li>{Icon.chat}Messages</li><li>{Icon.settings}Settings</li>
          </ul>
        </aside>
        <main className="ms-main">
          <div className="ms-tickets-head">
            <b>Tickets</b>
            <span className="ms-field ms-field--light">{Icon.search}Search events, cities</span>
            <span className="ms-btn-violet">Create ticket</span>
          </div>
          <div className="ms-tabs-light"><span className="is-on">All tickets</span><span>Created tickets</span><span>My tickets</span></div>
          <p className="ms-feat">Featured events</p>
          <div className="ms-events">
            {EVENTS.map(([name, kind], i) => (
              <article key={name} className={`ms-event${at === i ? ' is-sale' : ''}`} style={{ '--i': i }}>
                <div className="ms-event-photo"><span>{kind}</span></div>
                <p className="ms-event-name">{name}<b>₦5,000</b></p>
                <p className="ms-event-meta">{Icon.pin}Lagos, Nigeria<span className="ms-date ms-date--light">March<b>18</b></span></p>
                <span className="ms-sold"><i style={{ width: `${(sold(i) / 200) * 100}%` }} /></span>
                <small className="ms-sold-n">{sold(i)} of 200 sold</small>
              </article>
            ))}
          </div>
        </main>
      </div>

      <div key={sale} className="ms-card ms-sale">
        <span className="ms-check ms-check--ticket">{Icon.ticket}</span>
        <span>
          <b>Ticket sold</b>
          <small>{BUYERS[sale % BUYERS.length]} · {EVENTS[at][0]} · ₦5,000</small>
        </span>
      </div>
    </>
  )
}

const SCREENS = { live: Live, vote: Vote, dashboard: Dashboard, tickets: Tickets }

// Where the backdrop's painting falls inside the phone's stream, so the
// stream shows the same picture, sharp, exactly over the blurred one:
// the phone reads as a window onto the scene behind it.
function useThrough(ref, backdrop, k) {
  const [style, setStyle] = useState(undefined)
  useEffect(() => {
    const stage = ref.current
    const files = backdrop?.through && PHOTOS[backdrop.photo]
    if (!stage || !files) return
    const src = files[files.length - 1].webp
    const [px, py] = (backdrop.position || '50% 50%').split(' ').map((v) => parseFloat(v) / 100)
    let ratio = 0
    const place = () => {
      const video = stage.querySelector('.ms-live-video')
      const back = stage.querySelector('.ms-backdrop img')
      if (!video || !back || !ratio) return
      // The backdrop as drawn, its slight zoom included.
      const box = back.getBoundingClientRect()
      const v = video.getBoundingClientRect()
      const s = v.width / video.offsetWidth   // screen pixels per CSS pixel inside the phone
      const w = Math.max(box.width, box.height * ratio)
      const h = w / ratio
      const x = (box.width - w) * px - (v.left - box.left)
      const y = (box.height - h) * py - (v.top - box.top)
      setStyle({
        backgroundImage: `linear-gradient(180deg, rgb(20 17 24 / 0.45), transparent 22%, transparent 52%, rgb(20 17 24 / 0.9) 90%), url(${src})`,
        backgroundSize: `100% 100%, ${w / s}px ${h / s}px`,
        backgroundPosition: `0 0, ${x / s}px ${y / s}px`,
      })
    }
    const img = new Image()
    img.onload = () => { ratio = img.naturalWidth / img.naturalHeight; place() }
    img.src = src
    const ro = new ResizeObserver(() => requestAnimationFrame(place))
    ro.observe(stage)
    return () => ro.disconnect()
  }, [ref, backdrop, k])
  return style
}

export default function MsScreen({ kind, label, backdrop }) {
  useAppFont()
  const ref = useRef(null)
  const on = useInView(ref, 0.35)
  // Phones fill the panel's height and lose the stage's edges on narrow
  // screens; the desktop windows always show whole.
  const isWindow = kind === 'dashboard' || kind === 'tickets'
  const k = useFit(ref, (w, h) => (isWindow ? Math.min(w / 780, h / 520) : h / 520))
  const through = useThrough(ref, backdrop, k)
  const Screen = SCREENS[kind]
  if (!Screen) return null

  return (
    <div
      ref={ref}
      className={`ms-stage ms-stage--${kind}${on || prefersStill() ? ' is-on' : ''}`}
      style={{ '--k': k }}
      role="img"
      aria-label={label}
    >
      {/* A painting behind the screen, blurred to a wash of its colours. */}
      {backdrop && (
        <div className={`ms-backdrop${backdrop.through ? ' is-through' : ''}`}>
          <Photo name={backdrop.photo} alt="" sizes="(max-width: 1000px) 100vw, 64vw" loading="lazy" style={backdrop.position ? { objectPosition: backdrop.position } : undefined} />
        </div>
      )}
      <div className="ms-stage-inner ms-app" aria-hidden="true">
        <Screen on={on} through={through} />
      </div>
    </div>
  )
}
