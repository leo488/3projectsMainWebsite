import { useEffect, useRef } from 'react'

/* Adds `className` to the element the first time it scrolls into view.
   Every section animates in the same way, so the observer lives here
   rather than being rewritten per component. */
export default function useReveal(className = 'is-visible', threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add(className)
      return
    }

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      el.classList.add(className)
      io.disconnect()
    }, { threshold })

    io.observe(el)
    return () => io.disconnect()
  }, [className, threshold])

  return ref
}
