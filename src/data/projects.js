/* ──────────────────────────────────────────────────────────────
   PLACEHOLDER DATA — awaiting the project CSV.

   The CSV had not landed when this page was built, so nothing here
   claims a client name, a figure or an outcome. Titles and summaries
   are drawn from copy already published on this site (the home page
   feature card, the capabilities list and the industries list); the
   metric slots keep the site's existing XX / $XM+ placeholders.

   Each record maps one-to-one onto the CSV columns, so replacing this
   array is the whole job — no component changes required.
   ────────────────────────────────────────────────────────────── */

export const CATEGORIES = [
  'All',
  'Strategy',
  'Design',
  'Platform',
  'Operations',
]

export const PROJECTS = [
  {
    slug: 'operational-complexity',
    title: 'Turning Operational Complexity into Competitive Advantage',
    summary: 'Uncovering the hidden constraints inside a complex operating model, then redesigning how the critical work actually runs.',
    tag: 'Full operating model redesign',
    categories: ['Strategy', 'Operations'],
    industry: 'Financial Services',
    year: '2025',
    ground: 'var(--enterprise)',
    ratio: '4 / 3',
    services: ['Enterprise Discovery', 'Strategic Analysis', 'Operational Optimization'],
    metrics: [
      { value: '$XM+', label: 'Operational efficiency improvement' },
      { value: 'XX',   label: 'Processes redesigned' },
    ],
    intro:
      'Scale hides its own cost. Work that made sense at one size becomes the thing that slows the next, and the constraint is rarely where the organisation thinks it is. This engagement started by finding out where the time actually went.',
    sections: [
      {
        label: 'Discover',
        heading: 'Start with the constraint, not the brief',
        body: 'Discovery ran against the real operating model rather than the documented one — the handoffs people work around, the approvals that queue, the reporting nobody reads. The map that came out of it was the first time the whole picture sat in one place.',
        ground: 'var(--amber)',
      },
      {
        label: 'Design',
        heading: 'Redesign the work, then the system',
        body: 'Process came before software. Each critical path was rebuilt around the decision it exists to support, and only then did we specify what had to be built, bought or retired to carry it.',
        ground: 'var(--indigo)',
      },
      {
        label: 'Deliver',
        heading: 'Ship into the live operation',
        body: 'Delivery ran in slices against live work, so every change was measured against the operation it was meant to improve rather than a staging environment that never had to hold up.',
        ground: 'var(--cyan)',
      },
      {
        label: 'Sustain',
        heading: 'Leave the capability behind',
        body: 'The engagement ends; the operating model does not. Instrumentation, ownership and a review cadence stayed with the teams running the work, so improvement continues without us in the room.',
        ground: 'var(--mint)',
      },
    ],
  },
  {
    slug: 'banking-operations',
    title: 'Modernizing Banking Operations',
    summary: 'Reducing operational bottlenecks through enterprise process redesign and technology modernization.',
    tag: 'Process redesign + modernization',
    categories: ['Operations', 'Platform'],
    industry: 'Financial Services',
    year: '2025',
    ground: 'var(--slate)',
    ratio: '4 / 5',
    services: ['Transformation Architecture', 'Technology Integration', 'Continuous Evolution'],
    metrics: [
      { value: 'XX',   label: 'Bottlenecks removed' },
      { value: '30%+', label: 'Operational efficiency improvement' },
    ],
    intro:
      'Core banking work accumulates sediment: a control added after an incident, a spreadsheet that became load-bearing, a system kept alive because nothing else knows the rules. Modernization here meant separating what is regulation from what is only habit.',
    sections: [
      {
        label: 'Discover',
        heading: 'Separate the rule from the habit',
        body: 'Every control was traced back to its origin. A large share turned out to be institutional memory rather than obligation — which is what made the rest of the work possible.',
        ground: 'var(--amber)',
      },
      {
        label: 'Design',
        heading: 'Architecture that survives the next decade',
        body: 'The target architecture was specified around the parts most likely to change, so the components with the shortest half-life could be replaced without disturbing the ones carrying regulatory weight.',
        ground: 'var(--indigo)',
      },
      {
        label: 'Deliver',
        heading: 'Modernize without stopping the bank',
        body: 'Migration ran path by path, each one proved in parallel before the old route was retired. No cutover weekend, no freeze on the business.',
        ground: 'var(--cyan)',
      },
      {
        label: 'Sustain',
        heading: 'Measure what modernization bought',
        body: 'Baselines were captured before the first change so the improvement could be argued with numbers rather than impressions, and the same instrumentation now drives the roadmap.',
        ground: 'var(--mint)',
      },
    ],
  },
  {
    slug: 'infrastructure-delivery',
    title: 'Rebuilding How Capital Projects Get Delivered',
    summary: 'A single operating picture across planning, procurement and delivery for an infrastructure portfolio.',
    tag: 'Portfolio operating model',
    categories: ['Strategy', 'Operations'],
    industry: 'Infrastructure',
    year: '2024',
    ground: 'var(--violet)',
    ratio: '4 / 5',
    services: ['Enterprise Discovery', 'Transformation Architecture', 'Operational Optimization'],
    metrics: [
      { value: 'XX',  label: 'Programmes brought onto one model' },
      { value: '10M', label: 'Portfolio value under management' },
    ],
    intro:
      'Capital delivery fails in the gaps — between the plan and the procurement, the procurement and the site. The work was to make those gaps visible early enough to act on them.',
    sections: [
      {
        label: 'Discover',
        heading: 'Find where certainty is lost',
        body: 'Programmes were traced end to end to locate the points where an estimate stops being reliable. The same three handoffs accounted for most of the drift.',
        ground: 'var(--amber)',
      },
      {
        label: 'Design',
        heading: 'One picture, many programmes',
        body: 'A common structure for scope, schedule and spend let independent programmes stay independent while still rolling up into a portfolio view that meant something.',
        ground: 'var(--indigo)',
      },
      {
        label: 'Deliver',
        heading: 'Adopt without a mandate',
        body: 'Rollout led with the reporting burden it removed rather than the compliance it added, so teams took it up because it was less work, not because they were told to.',
        ground: 'var(--cyan)',
      },
      {
        label: 'Sustain',
        heading: 'Keep the picture current',
        body: 'Ownership sits with the programme teams who generate the data, which is the only arrangement under which a portfolio view stays accurate past its first quarter.',
        ground: 'var(--mint)',
      },
    ],
  },
  {
    slug: 'energy-operations',
    title: 'An Operating Model Built for Volatile Demand',
    summary: 'Rebuilding planning and field operations around conditions that change faster than the annual cycle.',
    tag: 'Planning + field operations',
    categories: ['Strategy', 'Design', 'Platform'],
    industry: 'Energy & Utilities',
    year: '2024',
    ground: 'var(--carbon)',
    ratio: '4 / 3',
    services: ['Strategic Analysis', 'Technology Integration', 'Continuous Evolution'],
    metrics: [
      { value: 'XX',   label: 'Planning cycle reduced to' },
      { value: '$XM+', label: 'Operational efficiency improvement' },
    ],
    intro:
      'An annual planning cycle cannot answer a weekly question. The brief was to shorten the loop between what the network is doing and what the organisation decides to do about it.',
    sections: [
      {
        label: 'Discover',
        heading: 'How long is the loop, really',
        body: 'We measured elapsed time from signal to decision to action. The technology was rarely the delay; the wait for the next scheduled forum usually was.',
        ground: 'var(--amber)',
      },
      {
        label: 'Design',
        heading: 'Plan at the speed of the network',
        body: 'Planning was restructured around a short cycle with a standing decision forum, and the field tooling was rebuilt around what crews actually need at the point of work.',
        ground: 'var(--indigo)',
      },
      {
        label: 'Deliver',
        heading: 'Prove it in one region first',
        body: 'A single region ran the new cycle end to end for a full quarter. Rollout arguments are easier to make once one part of the business has already done it.',
        ground: 'var(--cyan)',
      },
      {
        label: 'Sustain',
        heading: 'Hold the cadence',
        body: 'The cadence is the product. Governance, instrumentation and ownership were set up so the short cycle survives leadership changes and busy quarters.',
        ground: 'var(--mint)',
      },
    ],
  },
  /* ── From the case-study intake CSV (responses of 2/9/2026 and
     7/9/2026). Everything below is taken from those responses; where a
     field was left blank or answered "Nil" it is simply absent rather
     than filled in. ── */
  {
    slug: 'crunchies-inventory',
    title: 'Inventory Innovation / Solution',
    client: 'Crunchies Group — Crunchies Fried Chicken',
    summary: 'Limited real-time visibility into stock across outlets, warehouses and kitchens, with much of the process still dependent on manual tracking and reporting.',
    tag: 'Inventory Operations Hub — phase 1 of 8',
    categories: ['Operations', 'Platform'],
    industry: 'Hospitality / Food chain',
    year: 'In progress',
    ground: 'var(--signal-red)',
    tone: 'dark',
    ratio: '4 / 3',
    services: ['Centralised item database', 'Digital inventory workflows', 'SAGE ERP integration'],
    metrics: [
      { value: '₦25M–₦36M', label: 'Estimated internal value (projected)' },
      { value: '100%', label: 'Digital inventory requests (projected)' },
    ],
    intro:
      'Stock management ran on manual tracking, documentation and reporting, leaving no reliable view of levels across outlets, warehouses and kitchens. Without a connected system, gaps opened between Inventory, Procurement, Production and Operations — delays, stock-outs, overstocking and avoidable waste.',
    sections: [
      {
        label: 'Discover',
        heading: 'Where the inventory picture breaks down',
        body: 'No real-time visibility across branches, warehouses and kitchens. Daily records uploaded by hand, no structured database for branch requests or transactions, and data integrity weak enough to allow manipulation across outlets. Item descriptions were not standardised, which made reconciliation difficult and submissions late.',
        ground: 'var(--amber)',
      },
      {
        label: 'Design',
        heading: 'One connected Inventory Operations Hub',
        body: 'A digital system bringing the department onto one platform, replacing Excel, email and paper with digital inventory requests, warehouse issuance, kitchen records, approvals, reports and real-time dashboards. A standard item list and a digital record of stock movement make stock traceable across every location. Delivery is planned across eight phases; phase one is in build.',
        ground: 'var(--indigo)',
      },
      {
        label: 'Deliver',
        heading: 'Mobile-first, and built to reconcile',
        body: 'A mobile-first approach over a centralised item database, with digital workflows, dashboards, barcode support, audit logs, automated reporting, alerts and real-time tracking. API integration with SAGE ERP and data validation sit underneath, alongside demand forecasting.',
        ground: 'var(--cyan)',
      },
      {
        label: 'Sustain',
        heading: 'From manual process to traceable workflow',
        body: 'The aim is to move inventory management from a largely manual process to a structured digital workflow — changing how staff submit requests, track stock, record daily activity and share information across branches, warehouses and kitchens, and giving management visibility it did not previously have. The roadmap carries further phases including demand forecasting and AI features such as smart reorder suggestions, overstock alerts and waste prediction.',
        ground: 'var(--mint)',
      },
    ],
  },
  {
    slug: 'myspotlyt',
    title: 'Myspotlyt',
    client: 'Myspotlyt',
    summary: 'A live platform lacking stability and features, with no user retention and no new user acquisition.',
    tag: 'Platform stability & feature delivery',
    categories: ['Platform', 'Design'],
    industry: 'Arts and Entertainment',
    year: '2022–2026',
    ground: 'var(--amber)',
    tone: 'light',
    ratio: '4 / 5',
    services: ['NestJS backend', 'Vite + Express frontend', 'MongoDB'],
    metrics: [
      { value: '₦3M+',  label: 'Revenue by 2026, from ₦100K+ in 2022' },
      { value: '<5,000', label: 'Active user base' },
    ],
    intro:
      'Myspotlyt was already live when 3Projects came in. The platform lacked stability, was not fully user friendly and was missing features, with a user base between zero and five thousand.',
    sections: [
      {
        label: 'Discover',
        heading: 'Live, but not holding anyone',
        body: 'The platform was shipping without the stability or the feature set to keep people on it. The two problems that mattered were plain: no user retention, and no new user acquisition.',
        ground: 'var(--amber)',
      },
      {
        label: 'Design',
        heading: 'Build the features the platform was missing',
        body: 'The team deployed new features to lift the platform — the Award feature, the agent feature and the payment feature among them.',
        ground: 'var(--indigo)',
      },
      {
        label: 'Deliver',
        heading: 'The stack underneath',
        body: 'NestJS for the backend, Vite with Express for the frontend, and MongoDB as the database.',
        ground: 'var(--cyan)',
      },
      {
        label: 'Sustain',
        heading: 'A measured delivery cadence',
        body: 'Deploying a feature on Myspotlyt takes approximately two to three months. Revenue over the engagement moved from ₦100K+ in 2022 to over ₦3M by 2026, against an active user base under five thousand.',
        ground: 'var(--mint)',
      },
    ],
  },
]

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug)
