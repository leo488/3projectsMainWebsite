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
import { useRoute } from './router'
import './App.css'

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

  let page = <Home />
  if (path === '/work') {
    page = <Work />
  } else if (path.startsWith('/work/')) {
    page = <WorkDetail slug={path.slice('/work/'.length)} />
  } else if (path === '/careers') {
    page = <Careers />
  } else if (path === '/about') {
    page = <About />
  } else if (path === '/brand') {
    page = <Brand />
  }

  return <main>{page}</main>
}
