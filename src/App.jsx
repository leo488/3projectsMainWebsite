import Navbar       from './components/Navbar'
import Hero         from './components/Hero'
import Featured     from './components/Featured'
import Capabilities from './components/Capabilities'
import PartnerCta   from './components/PartnerCta'
import Stats        from './components/Stats'
import FinalCta     from './components/FinalCta'
import Footer       from './components/Footer'
import Billboard    from './components/Billboard'
import Work         from './pages/Work'
import WorkDetail   from './pages/WorkDetail'
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
      <Footer />
      <Billboard />
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
  }

  return <main>{page}</main>
}
