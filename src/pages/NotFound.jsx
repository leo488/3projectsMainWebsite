import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import { Link } from '../router'
import './Blog.css'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="post-missing">
        <p className="tiny">404</p>
        <h1>That page isn&rsquo;t here.</h1>
        <Link href="/" className="post-back-link">Back to the home page</Link>
      </section>
      <SiteFooter />
    </>
  )
}
