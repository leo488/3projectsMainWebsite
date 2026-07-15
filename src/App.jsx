import Hero          from './components/Hero'
import BrandLogos    from './components/BrandLogos'
import Focus         from './components/Focus'
import CaseAccordion from './components/CaseAccordion'
import Pillars       from './components/Pillars'
import CaseStudy     from './components/CaseStudy'
import PartnerCta    from './components/PartnerCta'
import Billboard     from './components/Billboard'
import CaseCarousel  from './components/CaseCarousel'
import Footer        from './components/Footer'
import CookieConsent from './components/CookieConsent'
import './App.css'

export default function App() {
  return (
    <main>
      <div className="edge-line edge-line--left" />
      <div className="edge-line edge-line--right" />
      <Hero />
      <BrandLogos />
      <Focus />
      <CaseAccordion />
      <Pillars />
      <CaseStudy />
      <PartnerCta />
      <Billboard />
      <CaseCarousel />
      <Footer />
      <CookieConsent />
    </main>
  )
}
