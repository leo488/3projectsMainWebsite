/* Client marks redrawn as single-colour vectors, so they stay sharp at
   any size and take the row's grey through currentColor. They are
   simplified tracings of the brands' own logos, made for this row. */

function Crunchies() {
  return (
    <svg className="mark-crunchies" viewBox="0 0 200 112" role="img" aria-label="Crunchies">
      <defs>
        <mask id="crunchies-cut">
          <rect width="200" height="112" fill="#fff" />
          <text
            x="100" y="98" textAnchor="middle"
            fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="30" letterSpacing="0.5"
            fill="#000"
          >CRUNCHIES</text>
        </mask>
      </defs>
      {/* Badge ring with the rooster's head: comb, face and beak */}
      <circle cx="100" cy="38" r="34" fill="none" stroke="currentColor" strokeWidth="6" />
      <circle cx="91" cy="18" r="6.5" fill="currentColor" />
      <circle cx="101" cy="14" r="7.5" fill="currentColor" />
      <circle cx="111" cy="18" r="6.5" fill="currentColor" />
      <path d="M86 28c10-6 26-4 30 8 3 10-1 22-10 28l-14-2c6-6 7-14 3-20-2-4-5-7-9-8z" fill="currentColor" />
      <path d="M86 34l-16 5 16 5z" fill="currentColor" />
      {/* Ribbon with the name cut through it */}
      <g mask="url(#crunchies-cut)">
        <path d="M14 68h172v40H14z" fill="currentColor" />
        <path d="M14 72L2 88l12 16zM186 72l12 16-12 16z" fill="currentColor" />
      </g>
    </svg>
  )
}

function Lola() {
  const rays = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2
    return [40 + Math.cos(a) * 13, 22 + Math.sin(a) * 13]
  })
  return (
    <svg viewBox="0 0 112 44" role="img" aria-label="Lola">
      <text x="0" y="36" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="40" fill="currentColor">L</text>
      <circle cx="40" cy="22" r="7" fill="currentColor" />
      {rays.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill="currentColor" />
      ))}
      <text x="57" y="36" fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="40" fill="currentColor">La</text>
    </svg>
  )
}

function Bistro23() {
  return (
    <svg viewBox="0 0 150 76" role="img" aria-label="Bistro 23">
      {/* The dome, with two rings cut through it */}
      <path d="M33 40a42 40 0 0 1 84 0z" fill="currentColor" />
      <path d="M45 40a30 28 0 0 1 60 0" fill="none" stroke="var(--logo-cut, #F5F5F5)" strokeWidth="3" />
      <path d="M56 40a19 17 0 0 1 38 0" fill="none" stroke="var(--logo-cut, #F5F5F5)" strokeWidth="3" />
      <text
        x="75" y="72" textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif" fontStyle="italic" fontWeight="700" fontSize="34"
        fill="currentColor"
      >Bistro23</text>
    </svg>
  )
}

function Myspotlyt() {
  return (
    <svg viewBox="0 0 170 44" role="img" aria-label="Myspotlyt">
      <text x="0" y="31" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="32" letterSpacing="-1" fill="currentColor">Myspotlyt</text>
    </svg>
  )
}

export const CLIENT_MARKS = { Crunchies, Lola, Bistro23, Myspotlyt }
