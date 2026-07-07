import { useEffect, useRef } from 'react'
import './Intro.css'

export default function Intro() {
  const sectionRef = useRef(null)
  const wrapRef    = useRef(null)
  const textRef    = useRef(null)

  // Scroll-triggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          textRef.current?.classList.add('is-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (textRef.current) observer.observe(textRef.current)
    return () => observer.disconnect()
  }, [])

  // Parallax — text drifts up slightly slower than scroll
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !wrapRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const py = rect.top * 0.05
      wrapRef.current.style.transform = `translateY(${py}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="intro-section" ref={sectionRef}>
      <div className="intro-parallax-wrap" ref={wrapRef}>
        <p className="intro-text" ref={textRef}>
          Large organizations rarely stall for lack of ambition.{' '}
          They stall inside the{' '}
          <a href="#" className="intro-link">complexity they have accumulated</a>
          {' '}— the handoffs, the systems, the decisions no one can see. We make
          that complexity visible, then design the operating models that turn it
          into <a href="#" className="intro-link">durable growth.</a>
        </p>
      </div>
    </section>
  )
}
