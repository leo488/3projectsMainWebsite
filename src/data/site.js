/* Single source for the navigation taxonomy. The footer columns and the
   Expertise dropdown were drifting apart as separate literals; both now
   read from here. */

export const CONTACT_EMAIL = 'hello@3projects.com'

export const SERVICES = [
  { label: 'Enterprise Discovery',       desc: 'Map the operating model as it actually runs.' },
  { label: 'Strategic Analysis',         desc: 'Find where certainty is lost, and what it costs.' },
  { label: 'Transformation Architecture', desc: 'Target states built around what will change.' },
  { label: 'Operational Optimization',   desc: 'Redesign the critical paths, then the systems.' },
  { label: 'Technology Integration',     desc: 'Ship into the live operation, slice by slice.' },
  { label: 'Continuous Evolution',       desc: 'Instrumentation and ownership that outlast us.' },
]

export const INDUSTRIES = [
  'Financial Services',
  'Manufacturing',
  'Energy & Utilities',
  'Infrastructure',
  'Technology',
]

export const PHASES = [
  { label: 'Discover', ground: 'var(--amber)',  note: 'Start with the constraint' },
  { label: 'Design',   ground: 'var(--indigo)', note: 'Redesign the work first' },
  { label: 'Deliver',  ground: 'var(--cyan)',   note: 'Ship into the live operation' },
  { label: 'Sustain',  ground: 'var(--mint)',   note: 'Leave the capability behind' },
]

export const OFFICES = ['New York', 'London', 'Frankfurt', 'Dubai', 'Singapore', 'São Paulo']

export const FIRM_LINKS = [
  { label: 'About',      href: '/about' },
  { label: 'Leadership', href: '/about#leadership' },
  { label: 'Careers',    href: '/careers' },
  { label: 'Newsroom',   href: '/about#newsroom' },
  { label: 'Insights',   href: '/about#insights' },
  { label: 'Contact',    href: `mailto:${CONTACT_EMAIL}` },
]

/* Social profiles. Paste the real profile URLs here and the footer row
   renders itself — the icons are already drawn. Left empty rather than
   guessed, because a wrong profile link is worse than none, and an
   icon pointing at "#" is a dead control. */
export const SOCIAL_LINKS = {
  LinkedIn:  '',
  Instagram: '',
  X:         '',
  YouTube:   '',
}
