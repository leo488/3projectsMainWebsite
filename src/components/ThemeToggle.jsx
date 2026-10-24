import { useState } from 'react'
import { applyTheme, THEME_KEY } from '../theme'
import './ThemeToggle.css'

/* Trial switch between the light site and the all-dark one. It only
   appears on previews (the hash-routed build, Vercel preview links and
   local dev), so the choice can be judged side by side before one is
   made the default. ?theme=dark in the address sets it too. */
const isPreview = () =>
  import.meta.env.DEV ||
  import.meta.env.VITE_HASH_ROUTES === '1' ||
  window.location.hostname.endsWith('.vercel.app')

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')
  if (!isPreview()) return null

  const flip = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
    try { localStorage.setItem(THEME_KEY, next) } catch { /* private mode */ }
  }

  return (
    <button type="button" className="theme-toggle" onClick={flip} aria-pressed={theme === 'dark'}>
      <span className="theme-toggle-dot" aria-hidden="true" />
      {theme === 'dark' ? 'Dark site' : 'Light site'}
      <span className="theme-toggle-hint">Switch</span>
    </button>
  )
}
