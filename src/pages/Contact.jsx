import SiteFooter from '../components/SiteFooter'
import Navbar from '../components/Navbar'
import ContactPanel from '../components/ContactPanel'

// ?topic=cpa preselects the topic and ?call opens the call form, from the
// path or the hash route.
const topicFromUrl = () => window.location.href.match(/[?&]topic=([a-z]+)/)?.[1]
const modeFromUrl = () => (/[?&]call\b/.test(window.location.href) ? 'call' : 'message')

export default function Contact() {
  return (
    <div>
      <Navbar />

      <header className="page-intro">
        <p className="tiny page-intro-eyebrow">Contact</p>
        <h1 className="page-intro-headline">
          Start a conversation
        </h1>
        <p className="page-intro-body">
          Tell us what you are working on, or book a call with the team. Every
          message is read by the people who would do the work.
        </p>
      </header>

      <ContactPanel initialTopic={topicFromUrl()} initialMode={modeFromUrl()} />

      <SiteFooter />
    </div>
  )
}
