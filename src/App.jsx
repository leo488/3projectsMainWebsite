import { lazy, Suspense } from 'react'
import SiteFooter from './components/SiteFooter'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Featured     from './components/Featured'
import PartnerCta   from './components/PartnerCta'
import Stats        from './components/Stats'
import Insights     from './components/Insights'
// The home page ships in the first download; every other page is its
// own small file, fetched when someone goes there.
const Work       = lazy(() => import('./pages/Work'))
const WorkDetail = lazy(() => import('./pages/WorkDetail'))
const Careers    = lazy(() => import('./pages/Careers'))
const About      = lazy(() => import('./pages/About'))
const Brand      = lazy(() => import('./pages/Brand'))
const Blog       = lazy(() => import('./pages/Blog'))
const BlogPost   = lazy(() => import('./pages/BlogPost'))
const Legal      = lazy(() => import('./pages/Legal'))
const Contact    = lazy(() => import('./pages/Contact'))
import NotFound     from './pages/NotFound'
import { useRoute } from './router'
import { LEGAL_PAGES } from './data/legal'
import useSeo       from './components/useSeo'
import ThemeToggle  from './components/ThemeToggle'
import Announcement from './components/Announcement'
import ContactModal from './components/ContactModal'
import './App.css'

const LEGAL_PATHS = Object.keys(LEGAL_PAGES).map((k) => `/${k}`)

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Insights />
      <div className="home-pair">
        <Featured />
        <PartnerCta />
      </div>
      <SiteFooter />
    </>
  )
}

export default function App() {
  const path = useRoute().split('?')[0].replace(/\/+$/, '') || '/'
  useSeo(path)

  let page = <NotFound />
  if (path === '/') {
    page = <Home />
  } else if (path === '/work') {
    page = <Work />
  } else if (path.startsWith('/work/')) {
    page = <WorkDetail slug={path.slice('/work/'.length)} />
  } else if (path === '/careers') {
    page = <Careers />
  } else if (path === '/about') {
    page = <About />
  } else if (path === '/contact') {
    page = <Contact />
  } else if (path === '/brand') {
    page = <Brand />
  } else if (path === '/blog') {
    page = <Blog />
  } else if (path.startsWith('/blog/')) {
    page = <BlogPost slug={path.slice('/blog/'.length)} />
  } else if (LEGAL_PATHS.includes(path)) {
    page = <Legal key={path} page={path.slice(1)} />
  }

  return (
    <>
      <Announcement />
      <main><Suspense fallback={null}>{page}</Suspense></main>
      <ThemeToggle />
      <ContactModal />
    </>
  )
}
