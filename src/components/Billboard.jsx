import { useEffect, useRef } from 'react'
import './Billboard.css'

export default function Billboard() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      section.classList.add('billboard--visible')
      io.disconnect()
    }, { threshold: 0.2 })

    io.observe(section)
    return () => io.disconnect()
  }, [])

  return (
    <section className="billboard-section" ref={sectionRef}>
      <img
        src="/images/billboard-ad.png"
        alt="Billboard — Complexity isn't a hurdle. It's an asset. 3Projects"
        className="billboard-img"
      />
    </section>
  )
}
