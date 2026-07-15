import { useEffect, useRef } from 'react'
import DotGrid from './DotGrid'
import './PartnerCta.css'

export default function PartnerCta() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      section.classList.add('pc--visible')
      io.disconnect()
    }, { threshold: 0.15 })

    io.observe(section)
    return () => io.disconnect()
  }, [])

  return (
    <section className="partner-cta" ref={sectionRef}>
      <div className="partner-left">
        <h2 className="partner-headline">
          Turn relationships into lasting business opportunities.
        </h2>
        <a href="#" className="partner-btn">Become a CPA Partner</a>
      </div>
      <div className="partner-right">
        <DotGrid />
        <img src="/images/portrait-partner.png" alt="" className="partner-portrait" />
      </div>
    </section>
  )
}
