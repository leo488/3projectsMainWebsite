/* Editorial written for the practice — positioning and method, not
   claims about named engagements. Project facts stay in projects.js,
   which is CSV-backed. */

export const POST_CATEGORIES = ['All', 'Operating models', 'Method', 'Technology', 'Practice']

export const POSTS = [
  {
    slug: 'the-constraint-is-never-where-you-think',
    title: 'The constraint is never where you think it is',
    excerpt: 'Every organisation has a theory about what is slowing it down. In our experience that theory is wrong roughly as often as it is right — and the cost of starting from it is a year of work aimed at the wrong thing.',
    category: 'Operating models',
    date: '2026-08-28',
    read: '6 min',
    ground: 'var(--enterprise)',
    ratio: '4 / 3',
    sections: [
      {
        heading: 'The documented model is not the real one',
        body: 'Every organisation runs two operating models: the one in the handbook and the one people actually use to get work out of the door. The second is the only one that matters, and it is almost never written down. It lives in the workaround someone built in a spreadsheet four years ago, in the approval everyone knows to skip, in the report that is produced monthly and read by nobody.',
      },
      {
        heading: 'Where the time actually goes',
        body: 'Ask a team where the delay is and they will tell you about the system. Measure it and the delay is usually a queue — work sitting still, waiting for a person, a forum or a decision that meets fortnightly. Software rarely causes that. Replacing the software rarely fixes it.',
      },
      {
        heading: 'Start with the constraint, not the brief',
        body: 'This is why the first phase of every engagement is diagnostic rather than design. We trace the critical paths end to end and measure elapsed time between signal, decision and action. The answer is frequently uncomfortable and almost always cheaper to act on than the programme that was about to be funded.',
      },
    ],
  },
  {
    slug: 'process-before-software',
    title: 'Process before software, every time',
    excerpt: 'Buying a platform to fix a process problem is how organisations end up paying twice: once for the licence, and again for the workarounds that grow around it.',
    category: 'Method',
    date: '2026-08-12',
    read: '5 min',
    ground: 'var(--indigo)',
    ratio: '4 / 5',
    sections: [
      {
        heading: 'Software encodes whatever you hand it',
        body: 'A platform does not improve a process. It makes the process faster, more consistent and much harder to change. Hand it a workflow built around a constraint that no longer exists and you have just made that constraint permanent, at considerable expense.',
      },
      {
        heading: 'Redesign the work first',
        body: 'We rebuild each critical path around the decision it exists to support, and only then specify what has to be built, bought or retired to carry it. The specification gets shorter every time we do this. Several of the systems in the original scope turn out to exist to service steps that no longer need to happen.',
      },
      {
        heading: 'What this buys you',
        body: 'A smaller build, a shorter delivery, and a system that still fits the business in three years because it was shaped around the decisions rather than the org chart of the moment.',
      },
    ],
  },
  {
    slug: 'modernising-without-a-cutover',
    title: 'Modernising without a cutover weekend',
    excerpt: 'The big-bang migration is still the default plan in most transformation programmes. It is also the single largest source of avoidable risk in them.',
    category: 'Technology',
    date: '2026-07-24',
    read: '7 min',
    ground: 'var(--cyan)',
    ratio: '4 / 5',
    sections: [
      {
        heading: 'Why the cutover persists',
        body: 'It is easy to plan and easy to govern. One date, one decision, one line in the board pack. It is also the point at which every assumption made over eighteen months gets tested simultaneously, with the business stopped and no way back.',
      },
      {
        heading: 'Path by path instead',
        body: 'Migrate one critical path at a time, prove it running in parallel against the live operation, and only then retire the old route. Each slice is small enough to reverse, and each one returns evidence that improves the next.',
      },
      {
        heading: 'Separate the rule from the habit',
        body: 'Much of what makes legacy systems hard to move is not regulation but institutional memory — a control added after an incident nobody remembers. Tracing each control back to its origin is what makes an incremental path possible in the first place.',
      },
    ],
  },
  {
    slug: 'what-we-leave-behind',
    title: 'What we leave behind',
    excerpt: 'The measure of an engagement is not the system that ships. It is whether the organisation is still improving it eighteen months after we have gone.',
    category: 'Practice',
    date: '2026-07-03',
    read: '4 min',
    ground: 'var(--mint)',
    ratio: '4 / 3',
    sections: [
      {
        heading: 'Consultancy has a half-life problem',
        body: 'Work lands, the team leaves, and the operating model slowly reverts. Not through negligence — through the ordinary pressure of a busy quarter and the absence of anyone whose job it is to hold the new shape.',
      },
      {
        heading: 'Instrumentation, ownership, cadence',
        body: 'Three things have to stay behind. Instrumentation, so improvement can be argued with numbers rather than impressions. Named ownership inside the business. And a review cadence short enough to catch drift while it is still cheap to correct.',
      },
      {
        heading: 'Baseline before you touch anything',
        body: 'Capture the baseline before the first change or you will spend the end of the programme arguing about whether it worked. It is the least glamorous week of any engagement and the one that determines whether the result can be defended.',
      },
    ],
  },
]

export const getPost = (slug) => POSTS.find((p) => p.slug === slug)

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
