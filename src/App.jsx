import SiteFooter from './components/SiteFooter'
import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Featured     from './components/Featured'
import Capabilities from './components/Capabilities'
import PartnerCta   from './components/PartnerCta'
import Stats        from './components/Stats'
import FinalCta     from './components/FinalCta'
import Work         from './pages/Work'
import WorkDetail   from './pages/WorkDetail'
import Careers      from './pages/Careers'
import About        from './pages/About'
import Brand        from './pages/Brand'
import Blog         from './pages/Blog'
import BlogPost     from './pages/BlogPost'
import Legal        from './pages/Legal'
import NotFound     from './pages/NotFound'
import { useRoute } from './router'
import { LEGAL_PAGES } from './data/legal'
import useSeo       from './components/useSeo'
import './App.css'

const LEGAL_PATHS = Object.keys(LEGAL_PAGES).map((k) => `/${k}`)

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Featured />
      <Capabilities />
      <PartnerCta />
      <Stats />
      <FinalCta />
      <SiteFooter />
    </>
  )
}

export default function App() {
  const path = useRoute().replace(/\/+$/, '') || '/'
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
  } else if (path === '/brand') {
    page = <Brand />
  } else if (path === '/blog') {
    page = <Blog />
  } else if (path.startsWith('/blog/')) {
    page = <BlogPost slug={path.slice('/blog/'.length)} />
  } else if (LEGAL_PATHS.includes(path)) {
    page = <Legal key={path} page={path.slice(1)} />
  }

  return <main>{page}</main>
}
