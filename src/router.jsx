import { useEffect, useState, createContext, useContext } from 'react'

/* A very small path router. react-router is present in node_modules but
   not in package.json, so depending on it would break the deploy build —
   and this app only needs three routes and a scroll reset. */

const PathContext = createContext('/')

// Preview builds (npm run build:preview) are hosted under a path the app
// doesn't own, so they route on the URL hash instead of the pathname.
const HASH = import.meta.env.VITE_HASH_ROUTES === '1'
const currentPath = () =>
  HASH ? window.location.hash.replace(/^#/, '') || '/' : window.location.pathname

export function useRoute() {
  return useContext(PathContext)
}

export function navigate(href) {
  if (href.startsWith('#') || href.startsWith('http') || href.includes('/#')) {
    window.location.href = href
    return
  }
  if (HASH) {
    window.location.hash = href
    return
  }
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

// The full address of an in-app path, for sharing.
export function absoluteUrl(path) {
  return new URL(HASH ? `#${path}` : path, window.location.href).href
}

// What an <a href> should hold for an in-app path.
export function hrefFor(path) {
  return HASH && path.startsWith('/') ? `#${path}` : path
}

export function Link({ href, children, className, ...rest }) {
  const onClick = (e) => {
    // Let modified clicks behave like normal links.
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    if (href.startsWith('http') || href.includes('/#')) return
    e.preventDefault()
    navigate(href)
  }

  return (
    <a href={hrefFor(href)} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  )
}

export function Router({ children }) {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    const event = HASH ? 'hashchange' : 'popstate'
    const onPop = () => {
      setPath(currentPath())
      window.scrollTo(0, 0)
    }
    window.addEventListener(event, onPop)
    return () => window.removeEventListener(event, onPop)
  }, [])

  return <PathContext.Provider value={path}>{children}</PathContext.Provider>
}
