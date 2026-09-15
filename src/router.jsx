import { useEffect, useState, createContext, useContext } from 'react'

/* A very small path router. react-router is present in node_modules but
   not in package.json, so depending on it would break the deploy build —
   and this app only needs three routes and a scroll reset. */

const PathContext = createContext('/')

export function useRoute() {
  return useContext(PathContext)
}

export function navigate(href) {
  if (href.startsWith('#') || href.startsWith('http') || href.includes('/#')) {
    window.location.href = href
    return
  }
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
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
    <a href={href} className={className} onClick={onClick} {...rest}>
      {children}
    </a>
  )
}

export function Router({ children }) {
  const [path, setPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const onPop = () => {
      setPath(window.location.pathname)
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  return <PathContext.Provider value={path}>{children}</PathContext.Provider>
}
