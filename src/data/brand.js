/* The palette as published, with the role each colour is allowed to
   play. Cobalt is the only accent; everything else is a step on the
   same blue ramp or a neutral, so the site stays within the blues. */
export const PALETTE = [
  { name: 'Electric Cobalt',  hex: '#004BFF', role: 'The only primary accent', wide: true },
  { name: 'Deep Enterprise',  hex: '#0031B8', role: 'Large grounds', wide: true },
  { name: 'Deep Carbon',      hex: '#141414', role: 'All text', wide: true },
  { name: 'Navy',             hex: '#0A2072', role: 'Deep grounds, Deliver' },
  { name: 'Ink',              hex: '#0E1B2E', role: 'Dark panels, Sustain' },
  { name: 'Pixel Mid',        hex: '#6F95FF', role: 'Illustration shade' },
  { name: 'Pixel Light',      hex: '#A3C0FF', role: 'Illustration surfaces' },
  { name: 'Sky',              hex: '#7FA5FF', role: 'On dark' },
  { name: 'Bone',             hex: '#E9E9E4', role: 'Light ground' },
]

export const TYPE_SPECIMENS = [
  {
    family: 'Manrope',
    face: 'Regular · 400',
    weight: 400,
    use: 'Long-form body copy and the largest display lines, where the type should read as open rather than emphatic.',
  },
  {
    family: 'Manrope',
    face: 'Medium · 500',
    weight: 500,
    use: 'The workhorse. Headlines, statistics and anything that needs presence without weight.',
  },
  {
    family: 'Manrope',
    face: 'SemiBold · 600',
    weight: 600,
    use: 'Buttons, card titles and short labels that sit inside a busier field.',
  },
]

export const MISUSE = [
  'Do not recolour the mark outside the palette on this page.',
  'Do not stretch, rotate or re-space the lockup.',
  'Do not set the wordmark in a substitute typeface.',
  'Do not place the primary lockup on a ground it cannot hold contrast against.',
]
