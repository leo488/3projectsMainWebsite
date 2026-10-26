// Case studies, one record per engagement from the case-study intake.
// `art` names the pixel illustration shown on the work index.

export const PROJECTS = [
  {
    slug: 'crunchies-inventory',
    art: 'pos-terminal',
    title: 'Inventory Innovation / Solution',
    client: 'Crunchies Group — Crunchies Fried Chicken',
    summary: 'Limited real-time visibility into stock across outlets, warehouses and kitchens, with much of the process still dependent on manual tracking and reporting.',
    tag: 'Inventory Operations Hub — phase 1 of 8',
    categories: ['Operations', 'Platform'],
    industry: 'Hospitality / Food chain',
    year: 'In progress',
    ground: 'var(--enterprise)',
    tone: 'dark',
    ratio: '4 / 5',
    services: ['Centralised item database', 'Digital inventory workflows', 'SAGE ERP integration'],
    metrics: [
      { value: '₦25M–₦36M', label: 'Estimated internal value (projected)' },
      { value: '100%', label: 'Digital inventory requests (projected)' },
    ],
    intro:
      'Crunchies had no reliable view of its stock across outlets, warehouses and kitchens. Most of it was still tracked by hand.',
    story: [
      'Stock management ran on manual tracking, documentation and reporting, leaving no reliable view of levels across outlets, warehouses and kitchens. Without a connected system, gaps opened between Inventory, Procurement, Production and Operations: delays, stock-outs, overstocking and avoidable waste.',
      'We are building one connected Inventory Operations Hub. Digital requests, warehouse issuance, kitchen records, approvals and real-time dashboards run over a single standard item list, integrated with SAGE ERP.',
      'Delivery is planned in **eight phases**. **Phase one** is in build.',
    ],
    // one wide picture before the phases.
    gallery: [
      { photo: 'hero-notes', alt: 'A painting of a restaurant manager writing up stock by hand while on the phone', position: '50% 60%' },
    ],
    outcome: {
      headline: 'From paper and spreadsheets to one traceable view of every item.',
      body: 'Once phase one is live, every request, issue and kitchen record moves through one system, and management can see stock across every location for the first time. The figures below are projected.',
    },
    sections: [
      {
        label: 'Discover',
        heading: 'Where the inventory picture breaks down',
        body: 'No real-time visibility across branches, warehouses and kitchens. Daily records uploaded by hand, no structured database for branch requests or transactions, and data integrity weak enough to allow manipulation across outlets. Item descriptions were not standardised, which made reconciliation difficult and submissions late.',
        ground: 'var(--phase-discover)',
        photo: 'blog-call',
        imageAlt: 'A painting of a manager on the phone at a shop counter, checking stock by call',
        position: '40% 40%',
      },
      {
        label: 'Design',
        heading: 'One connected Inventory Operations Hub',
        body: 'A digital system bringing the department onto one platform, replacing Excel, email and paper with digital inventory requests, warehouse issuance, kitchen records, approvals, reports and real-time dashboards. A standard item list and a digital record of stock movement make stock traceable across every location. Delivery is planned across **eight phases**; **phase one** is in build.',
        ground: 'var(--phase-design)',
        photo: 'crunchies-team',
        imageAlt: 'A painting of two colleagues on a sofa working through a design on a laptop',
        position: '50% 45%',
      },
      {
        label: 'Deliver',
        heading: 'Mobile-first, and built to reconcile',
        body: 'A mobile-first approach over a centralised item database, with digital workflows, dashboards, barcode support, audit logs, automated reporting, alerts and real-time tracking. API integration with SAGE ERP and data validation sit underneath, alongside demand forecasting.',
        ground: 'var(--phase-deliver)',
        photo: 'blog-van',
        imageAlt: 'A painting from above of a worker logging boxes from a van on a tablet',
        position: '55% 50%',
      },
      {
        label: 'Sustain',
        heading: 'From manual process to traceable workflow',
        body: 'The aim is to move inventory management from a largely manual process to a structured digital workflow — changing how staff submit requests, track stock, record daily activity and share information across branches, warehouses and kitchens, and giving management visibility it did not previously have. The roadmap carries further phases including demand forecasting and AI features such as smart reorder suggestions, overstock alerts and waste prediction.',
        ground: 'var(--phase-sustain)',
        photo: 'crunchies-home',
        imageAlt: 'A painting of a woman at a laptop at home, checking the day on one screen',
        position: '62% 40%',
      },
    ],
  },
  {
    slug: 'myspotlyt',
    art: 'hand-phone',
    title: 'Myspotlyt',
    client: 'Myspotlyt',
    summary: 'A live platform lacking stability and features, with no user retention and no new user acquisition.',
    tag: 'Platform stability & feature delivery',
    categories: ['Platform', 'Design'],
    industry: 'Arts and Entertainment',
    year: '2022–2026',
    ground: 'var(--phase-discover)',
    tone: 'dark',
    ratio: '4 / 5',
    services: ['NestJS backend', 'Vite + Express frontend', 'MongoDB'],
    metrics: [
      { value: '30×',    label: 'Revenue growth, 2022 to 2026' },
      { value: '₦3M+',   label: 'Revenue in 2026, up from ₦100K+ in 2022' },
      { value: '5,000',  label: 'Active users on the platform' },
      { value: '3',      label: 'Major features shipped: awards, agents and payments' },
    ],
    intro:
      'Myspotlyt was already live when 3Projects came in. The platform lacked stability, was not fully user friendly and was missing features, with a user base **between zero and five thousand**.',
    story: [
      'People could sign up, but there was little reason for them to stay. Releases were unstable, key journeys were hard to use and the features the audience expected were not there, so retention was flat and new users had stopped arriving.',
      'We took the platform on as it ran. First we made what was live stable, then we shipped what it was missing, the Award, agent and payment features among them, on a steady cadence of **one considered release every two to three months**.',
      'Four years on, revenue has grown **thirtyfold**, from **₦100K+ in 2022** to **over ₦3M in 2026**, and the platform holds an active base of **five thousand users**.',
    ],
    outcome: {
      headline: 'From a platform nobody stayed on to **thirtyfold revenue growth**.',
      body: 'Myspotlyt now runs on a stable stack, ships features on a predictable cadence and holds an active base of **five thousand users**. The work continues one release at a time.',
    },
    // one wide picture, then two side by side.
    gallery: [
      { photo: 'talent-dance', alt: 'A painting of a woman dancing alone in a sunlit kitchen', position: '50% 45%' },
      { photo: 'talent-walk', alt: 'A painting of a young man walking past a brown wall, headphones round his neck', position: '40% 50%' },
      { photo: 'talent-blue', alt: 'A painting of a woman in a blue shirt smiling at her phone over tea', position: '50% 40%' },
    ],
    // Near the close: the talent the platform is for, her photograph
    // beside her profile in the app.
    finale: {
      photo: 'talent-listening',
      alt: 'A painting of a woman in headphones by a sunlit bus window, on her phone',
      position: '50% 40%',
      // Her face, cropped from the same painting for the app's avatar.
      avatar: { size: '560%', x: 41, y: 29 },
      eyebrow: 'Who it is for',
      text: 'Behind every vote, ticket and follow on Myspotlyt is **a performer waiting to be seen**. For an actor in Lagos, being found on a phone during the ride to work can be the difference between an audition and **another year of waiting**.',
      name: 'Adaeze Okafor',
      role: 'Actor · Lagos',
      badge: 'Nominee · Fessa Awards',
    },
    // The app rebuilt in code inside the phone in the painting of
    // hands holding one: a search that finds her. `screen` is the painted
    // screen's corners in the painting's pixels (top left, top right,
    // bottom right, bottom left); `focus` is the point kept in view.
    scene: {
      photo: 'talent-hand',
      size: [1672, 941],
      screen: [[547.5, 102.5], [816, 84], [895, 671.5], [621.5, 698.5]],
      focus: [720, 390],
      face: 'talent-blue',
      also: 'talent-commute',
      avatar: { size: '520%', x: 50, y: 27 },
      caption: 'Talent, a search away.',
    },
    // Breaks the phases after Design with a statement in the opening's
    // large type and the billboard painting across the width.
    interlude: {
      after: 1,
      eyebrow: 'What we built for',
      text: 'A talent platform lives on one feeling: **being seen**. Every screen we shipped was made to get people there faster.',
      photo: 'talent-billboard',
      alt: 'A painting of a billboard reading "Easy talent search." beside a woman smiling at her phone',
      position: '50% 48%',
    },
    sections: [
      {
        label: 'Discover',
        heading: 'Live, but not holding anyone',
        body: [
          'The platform was shipping without the stability or the feature set to keep people on it. The two problems that mattered were plain: no user retention, and no new user acquisition.',
          'We started by finding where the platform broke and where people dropped off, so the first releases went to the problems costing the most users.',
        ],
        screen: 'live',
        // The feed's stream shows the painting sharp; around the phone the
        // same painting carries on, softened.
        backdrop: { photo: 'talent-stretch', position: '50% 30%', through: true },
        imageAlt: 'The Myspotlyt home feed, live, with comments and hearts coming in',
        ground: 'var(--phase-discover)',
      },
      {
        label: 'Design',
        heading: 'Build the features the platform was missing',
        body: [
          'The team deployed new features to lift the platform: the Award feature, the agent feature and the payment feature among them.',
          'Each feature was chosen for one job: give the people already on the platform a reason to come back, and give new people a reason to join.',
        ],
        screen: 'vote',
        backdrop: { photo: 'talent-commute', position: '30% 50%' },
        imageAlt: 'The Myspotlyt Awards screen, with a vote being paid for and confirmed',
        ground: 'var(--phase-design)',
      },
      {
        label: 'Deliver',
        heading: 'The stack underneath',
        body: [
          'NestJS for the backend, Vite with Express for the frontend, and MongoDB as the database.',
          'A modern, well-supported stack means new features can be added without unsettling what is already live, which is what made a steady release rhythm possible.',
        ],
        screen: 'dashboard',
        // Above the dashboard: the person at the desk behind the figures.
        lead: { photo: 'talent-desk', alt: 'A painting of a woman at her desk, thinking, a laptop open in front of her', position: '50% 35%' },
        backdrop: { photo: 'talent-desk', position: '50% 50%' },
        imageAlt: 'The Myspotlyt admin dashboard, its figures counting up and revenue lines drawing in',
        ground: 'var(--phase-deliver)',
      },
      {
        label: 'Sustain',
        heading: 'A measured delivery cadence',
        body: [
          'Deploying a feature on Myspotlyt takes approximately **two to three months**. Revenue over the engagement moved from **₦100K+ in 2022** to **over ₦3M by 2026**, against an active user base **under five thousand**.',
          'That rhythm, one considered release at a time, is what turned a stalled platform into one that keeps growing.',
        ],
        screen: 'tickets',
        backdrop: { photo: 'talent-dance', position: '50% 50%' },
        imageAlt: 'The Myspotlyt tickets screen, with tickets selling',
        ground: 'var(--phase-sustain)',
      },
    ],
  },
]

// Filters offered on the work index: only disciplines with live work.
export const CATEGORIES = ['All', ...new Set(PROJECTS.flatMap((p) => p.categories))]

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug)
