import Newsletter from './Newsletter'
import Footer from './Footer'
import Billboard from './Billboard'
import CookieBanner from './CookieBanner'
import './SiteFooter.css'

/* Every page closes the same way, so the run lives in one place rather
   than being repeated five times. It is all Deep Carbon by default; the
   light tone is kept for any page that wants it. */
export default function SiteFooter({ tone = 'dark' }) {
  return (
    <div className={`site-footer site-footer--${tone}`}>
      <Newsletter />
      <Footer />
      <Billboard />
      <CookieBanner />
    </div>
  )
}
