import { useEffect, useRef } from 'react'
import Hero      from './components/Hero'
import Services  from './components/Services'
import CaseStudy  from './components/CaseStudy'
import Expertise  from './components/Expertise'
import Billboard  from './components/Billboard'
import Footer     from './components/Footer'

const lerp    = (a, b, t) => a + (b - a) * t
const clamp01 = (v) => Math.max(0, Math.min(1, v))

export default function App() {
  const heroZoneRef    = useRef(null)
  const heroImgRef     = useRef(null)
  const heroContentRef = useRef(null)
  const card1Ref       = useRef(null)
  const startRectRef   = useRef(null)

  useEffect(() => {
    let rafId
    let smoothP   = 0      // eased pin progress — trails the scroll for buttery motion
    let imgActive = false  // whether image inline styles are currently applied

    const HOLD    = 0.20   // first 20% of the pin: image holds full-bleed, hero text fades
    const PHASE1  = 0.58   // shrink-in-place portion of the animation
    const SWAP_AT = 0.88   // crossfade to the landing tile over the last 12%

    // Capture the exact in-flow position of the hero image before any scroll
    const captureStart = () => {
      const img = heroImgRef.current
      if (!img || img.style.position === 'fixed') return
      const r = img.getBoundingClientRect()
      startRectRef.current = { top: r.top, left: r.left, width: r.width, height: r.height }
    }

    const releaseImg = () => {
      const img  = heroImgRef.current
      const card = card1Ref.current
      if (!img) return
      img.style.cssText = ''
      const bgImg = img.querySelector('img')
      if (bgImg) bgImg.style.animationPlayState = ''
      if (card) { card.style.opacity = '0'; card.style.transition = 'none' }
      imgActive = false
    }

    const tick = () => {
      const zone    = heroZoneRef.current
      const img     = heroImgRef.current
      const content = heroContentRef.current
      const card    = card1Ref.current

      if (zone && img && card) {
        const vh    = window.innerHeight
        const vw    = window.innerWidth
        const range = zone.offsetHeight - vh          // sticky pin scroll distance
        const p     = clamp01((window.scrollY - zone.offsetTop) / range)

        // Ease toward the scroll position — smooth in BOTH directions (down and back up)
        smoothP = lerp(smoothP, p, 0.1)
        if (Math.abs(smoothP - p) < 0.0005) smoothP = p

        if (smoothP <= 0.0005) {
          if (imgActive) releaseImg()
          if (content) { content.style.opacity = ''; content.style.transform = '' }
        } else {
          // Hero text fades out during the hold phase
          if (content) {
            content.style.opacity   = `${Math.max(0, 1 - smoothP / HOLD)}`
            content.style.transform = `translateY(${-20 * Math.min(smoothP / HOLD, 1)}px)`
          }

          // Image animation progress (starts after the hold, ends just before pin release)
          const t = clamp01((smoothP - HOLD) / (0.96 - HOLD))

          if (t <= 0) {
            if (imgActive) releaseImg()
          } else {
            imgActive = true

            // Pause Ken Burns so it doesn't fight the transform
            const bgImg = img.querySelector('img')
            if (bgImg) bgImg.style.animationPlayState = 'paused'

            const sr = startRectRef.current
            const start = {
              top:    sr ? sr.top    : 88,
              left:   sr ? sr.left   : 16,
              width:  sr ? sr.width  : vw - 32,
              height: sr ? sr.height : vh - 88,
            }

            // Midpoint: shrunk to 45%, centered in the viewport — the image never
            // chases the tile while the tile is still below the screen
            const mid = {
              width:  start.width * 0.45,
              height: start.height * 0.45,
            }
            mid.top  = (vh - mid.height) / 2
            mid.left = (vw - mid.width) / 2

            let rect
            if (t < PHASE1) {
              const k = t / PHASE1
              rect = {
                top:    lerp(start.top,    mid.top,    k),
                left:   lerp(start.left,   mid.left,   k),
                width:  lerp(start.width,  mid.width,  k),
                height: lerp(start.height, mid.height, k),
              }
            } else {
              // Fly from the centered mid state to the live landing tile
              const k  = (t - PHASE1) / (1 - PHASE1)
              const cr = card.getBoundingClientRect()
              rect = {
                top:    lerp(mid.top,    cr.top,    k),
                left:   lerp(mid.left,   cr.left,   k),
                width:  lerp(mid.width,  cr.width,  k),
                height: lerp(mid.height, cr.height, k),
              }
            }

            img.style.position      = 'fixed'
            img.style.top           = `${rect.top}px`
            img.style.left          = `${rect.left}px`
            img.style.width         = `${rect.width}px`
            img.style.height        = `${rect.height}px`
            img.style.borderRadius  = `${lerp(14, 18, t)}px`
            img.style.margin        = '0'
            img.style.zIndex        = '50'
            img.style.transition    = 'none'
            img.style.overflow      = 'hidden'
            img.style.pointerEvents = 'none'

            // Last stretch: crossfade fixed image → landing tile
            const swap = Math.max(0, (t - SWAP_AT) / (1 - SWAP_AT))
            img.style.opacity     = `${1 - swap}`
            card.style.opacity    = `${swap}`
            card.style.transition = 'none'
          }
        }
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(() => {
      captureStart()
      rafId = requestAnimationFrame(tick)
    })
    window.addEventListener('resize', captureStart)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', captureStart)
    }
  }, [])

  return (
    <main>
      <Hero
        zoneRef={heroZoneRef}
        imgRef={heroImgRef}
        contentRef={heroContentRef}
      />
      <Services card1Ref={card1Ref} />
      <CaseStudy />
      <Expertise />
      <Billboard />
      <Footer />
    </main>
  )
}
