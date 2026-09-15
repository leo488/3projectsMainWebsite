import Hero         from './components/Hero'
import Featured     from './components/Featured'
import Capabilities from './components/Capabilities'
import PartnerCta   from './components/PartnerCta'
import Stats        from './components/Stats'
import FinalCta     from './components/FinalCta'
import Footer       from './components/Footer'
import Billboard    from './components/Billboard'
import './App.css'

export default function App() {
  return (
    <main>
      <Hero />
      <Featured />
      <Capabilities />
      <PartnerCta />
      <Stats />
      <FinalCta />
      <Footer />
      <Billboard />
    </main>
  )
}
