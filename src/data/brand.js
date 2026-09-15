/* The palette as published, with the role each colour is allowed to
   play. Roles are the point — cobalt is the only accent, the six hues
   below belong to the phase they name and are not decorative. */
export const PALETTE = [
  { name: 'Electric Cobalt',  hex: '#004BFF', role: 'The only primary accent', wide: true },
  { name: 'Deep Enterprise',  hex: '#0031B8', role: 'Large grounds', wide: true },
  { name: 'Deep Carbon',      hex: '#141414', role: 'All text', wide: true },
  { name: 'Amber',            hex: '#F2A61D', role: 'Discover' },
  { name: 'Indigo',           hex: '#2E2A8C', role: 'Design' },
  { name: 'Cyan',             hex: '#00C2E8', role: 'Deliver' },
  { name: 'Mint',             hex: '#2FD39A', role: 'Sustain' },
  { name: 'Violet',           hex: '#6E4CE8', role: 'Support' },
  { name: 'Slate',            hex: '#44506B', role: 'Structure' },
  { name: 'Signal Red',       hex: '#D92D22', role: 'Prohibition' },
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
