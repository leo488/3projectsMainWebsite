import { useEffect } from 'react'
import './MsApp.css'

/* The pieces every rebuilt Myspotlyt screen shares: the app's own font,
   its icons, and the phone around it. */

export function useAppFont() {
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

export const Icon = {
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
  heart: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 18l-1 3 4-1.5A8 8 0 1 0 5 18z" /></svg>
  ),
  bookmark: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v16l-5-3.5L7 20z" /></svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5l6 6-6 6M20 11H10a6 6 0 0 0-6 6v1" /></svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="9" r="3.5" /><path d="M3 19a6 6 0 0 1 12 0M16 5.5a3.5 3.5 0 0 1 0 7M21 19a6 6 0 0 0-4-5.6" /></svg>
  ),
  ticket: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v3a2 2 0 0 0 0 4v3H4v-3a2 2 0 0 0 0-4zM14 7v10" /></svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h15v12H4zM4 7l11-3v3M15 13h2" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /></svg>
  ),
  settings: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" /></svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11z" /><circle cx="12" cy="10" r="2" /></svg>
  ),
}

// Myspotlyt's mark: a ring with a spark inside, in its own violet.
export function MsLogo() {
  return (
    <span className="ms-logo">
      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.5" /><path d="M14.5 14.5l4 4" /></svg>
      Myspotlyt
    </span>
  )
}

export function StatusBar() {
  return <div className="ms-status"><span>9:41</span><span className="ms-status-icons" /></div>
}

export function TabBar({ active }) {
  const tab = (name, icon) => (
    <span className={active === name ? 'is-on' : ''}>{icon}{name}</span>
  )
  return (
    <nav className="ms-nav" aria-hidden="true">
      {tab('Home', Icon.home)}
      {tab('Discover', Icon.search)}
      <span className="ms-plus">+</span>
      {tab('Awards', Icon.award)}
      {tab('Profile', Icon.profile)}
    </nav>
  )
}
