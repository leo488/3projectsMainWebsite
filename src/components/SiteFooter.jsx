import Newsletter from './Newsletter'
import Footer from './Footer'
import Billboard from './Billboard'
import CookieBanner from './CookieBanner'

/* Every page closes the same way, so the run lives in one place rather
   than being repeated five times. */
export default function SiteFooter() {
  return (
    <>
      <Newsletter />
      <Footer />
      <Billboard />
      <CookieBanner />
    </>
  )
}
