import './Expertise.css'

const CARDS = [
  {
    featured: true,
    tag: 'Global Financial Institution · $40B AUM',
    headline: 'Rebuilding the operating core of a global bank.',
    image: '/images/section4images02.png',
    stats: [
      { value: '$2.8B', label: 'Value Unlocked' },
      { value: '41%',   label: 'Faster Decisions' },
    ],
  },
  {
    tag: 'Pan-European Courier Network · 200M Parcels',
    headline: 'Reinventing last-mile delivery at continental scale.',
    image: '/images/section4images03.png',
    stats: [
      { value: '98.6%', label: 'On-Time Delivery' },
      { value: '3.2x',  label: 'Route Efficiency' },
    ],
  },
  {
    tag: 'Global Retail Group · 4,000 Stores',
    headline: 'Turning every store visit into lasting loyalty.',
    image: '/images/section4images01.png',
    stats: [
      { value: '+62%', label: 'Repeat Purchases' },
      { value: '19%',  label: 'Lower Cost-to-Serve' },
    ],
  },
]

export default function Expertise() {
  return (
    <section className="expertise-section">

        <div className="exp-header">
          <p className="exp-eyebrow">Our Expertise</p>
          <h2 className="exp-heading">Our Expertise</h2>
        </div>

        <div className="exp-rail-wrap">
          <div className="exp-rail">

            {CARDS.map((card, i) => (
              <div
                key={i}
                className={`exp-card ${card.featured ? 'exp-card--featured' : 'exp-card--category'}`}
              >
                <img src={card.image} alt="" className="exp-card-img" />
                <div className="exp-card-overlay" />
                <div className="exp-card-content">
                  <div className="exp-glass">
                    <p className="exp-card-tag">{card.tag}</p>
                    <h3 className="exp-card-headline">{card.headline}</h3>
                    <div className="exp-card-stats">
                      {card.stats.map((s, j) => (
                        <div key={j} className="exp-stat">
                          <span className={`exp-stat-val exp-stat-val--${j === 0 ? 'green' : 'cyan'}`}>
                            {s.value}
                          </span>
                          <span className="exp-stat-label">{s.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

    </section>
  )
}
