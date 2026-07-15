import { useEffect, useRef } from 'react'
import './Services.css'

export default function Services() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = section.querySelectorAll('.card')

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card--visible')
          observer.unobserve(entry.target)
        }
      }),
      { threshold: 0.15 }
    )
    cards.forEach(card => observer.observe(card))

    // 3D tilt + glare hover interaction
    const MAX_TILT = 8

    const onMove = (e) => {
      const card = e.currentTarget
      const r    = card.getBoundingClientRect()
      const dx   = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2)
      const dy   = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2)
      const gx   = ((e.clientX - r.left) / r.width)  * 100
      const gy   = ((e.clientY - r.top)  / r.height) * 100

      let shadow = 'rgba(0,0,0,0.14)'
      if (card.classList.contains('card--blue')) shadow = 'rgba(0,49,184,0.30)'
      if (card.classList.contains('card--dark')) shadow = 'rgba(14,27,46,0.36)'

      card.style.transform  = `translateY(-6px) perspective(700px) rotateX(${-dy * MAX_TILT}deg) rotateY(${dx * MAX_TILT}deg) scale(1.03)`
      card.style.transition = 'transform 0.08s linear, box-shadow 0.15s ease'
      card.style.boxShadow  = `0 20px 56px ${shadow}`
      card.style.zIndex     = '10'
      card.style.setProperty('--gx', `${gx}%`)
      card.style.setProperty('--gy', `${gy}%`)
    }

    const onEnter = (e) => {
      e.currentTarget.classList.add('card--hovered')
    }

    const onLeave = (e) => {
      const card = e.currentTarget
      card.classList.remove('card--hovered')
      card.style.transform  = 'translateY(0)'
      card.style.transition = 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease'
      card.style.boxShadow  = ''
      setTimeout(() => { if (!card.matches(':hover')) card.style.zIndex = '' }, 700)
    }

    cards.forEach(card => {
      card.addEventListener('mouseenter', onEnter)
      card.addEventListener('mousemove',  onMove)
      card.addEventListener('mouseleave', onLeave)
    })

    return () => {
      observer.disconnect()
      cards.forEach(card => {
        card.removeEventListener('mouseenter', onEnter)
        card.removeEventListener('mousemove',  onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <section className="services-section" ref={sectionRef}>

      {/* ── Top row of tiles ── */}
      <div className="services-row services-row--top">

        <div className="card tile-t1" style={{ '--delay': '0ms' }}>
          <img src="/images/services-tile-01.jpg" alt="" className="card-img" />
        </div>

        <div className="card card--dark tile-t2" style={{ '--delay': '80ms' }}>
          <span className="card-symbol">; )</span>
        </div>

        <div className="card tile-t3" style={{ '--delay': '120ms' }}>
          <img
            src="/images/hero-logistics.png"
            alt="Enterprise logistics"
            className="card-img"
          />
        </div>

        <div className="card card--blue tile-t4" style={{ '--delay': '160ms' }}>
          <span className="card-symbol">$$</span>
        </div>

        <div className="card tile-t5" style={{ '--delay': '240ms' }}>
          <img src="/images/services-tile-02.jpg" alt="" className="card-img" />
        </div>

      </div>

      <h2 className="services-heading">
        Building smarter enterprises through strategy, technology, and transformation.
      </h2>

      {/* ── Bottom row of tiles ── */}
      <div className="services-row services-row--bottom">

        <div className="card tile-b1" style={{ '--delay': '60ms' }}>
          <img src="/images/services-tile-03.jpg" alt="" className="card-img" />
        </div>

        <div className="card card--light tile-b2" style={{ '--delay': '140ms' }} />

        <div className="card card--dark tile-b3" style={{ '--delay': '220ms' }}>
          <img src="/images/logo-white.svg" alt="3Projects" className="card-logo" />
        </div>

        <div className="card card--blue tile-b4" style={{ '--delay': '300ms' }}>
          <span className="card-symbol">↗</span>
        </div>

        <div className="card tile-b5" style={{ '--delay': '380ms' }}>
          <img src="/images/expertise-logistics.png" alt="" className="card-img" />
        </div>

      </div>

    </section>
  )
}
