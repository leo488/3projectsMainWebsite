import Newsletter from './Newsletter'
import Footer from './Footer'
import Billboard from './Billboard'
import CookieBanner from './CookieBanner'
import './SiteFooter.css'

/* Every page closes the same way, so the run lives in one place rather
   than being repeated five times. The dark tone closes the case-study
   pages, which run on a dark ground throughout. */
export default function SiteFooter({ tone = 'light' }) {
  return (
    <div className={`site-footer site-footer--${tone}`}>
      <Newsletter />
      <Footer />
      <Billboard tone={tone} />
      <CookieBanner />
    </div>
  )
}
