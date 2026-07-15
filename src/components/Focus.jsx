import { useEffect, useRef, useState } from 'react'
import './Focus.css'

const IMAGES = ['/images/aerial-street-02.png', '/images/aerial-street-01.png']
const SWAP_MS = 5000

export default function Focus() {
  const cardRef = useRef(null)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      card.classList.add('focus--visible')
      io.disconnect()
    }, { threshold: 0.2 })

    io.observe(card)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % IMAGES.length), SWAP_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="focus-section">
      <div className="focus-card" ref={cardRef}>
        <div className="focus-left">
          <h2 className="focus-headline">
            <span className="focus-line-wrap">
              <span className="focus-line-inner focus-line-1">We focus on what matters.</span>
            </span>
            <span className="focus-line-wrap">
              <span className="focus-line-inner focus-line-2">Everything else waits.</span>
            </span>
          </h2>
          <p className="focus-body">
            3Projects partners with enterprise leaders to uncover these hidden constraints,
            redesign how critical operations work, and implement technology strategies that
            create measurable business value.
          </p>
        </div>
        <div className="focus-right">
          {IMAGES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`focus-img${i === slide ? ' is-active' : ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
