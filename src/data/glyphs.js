/* Pixel glyphs on a 16x16 cell grid, in the house style: a mid-blue
   outline, a light-blue body and deep-blue detail. '.' leaves the cell
   open so the card ground reads through, which is how the holes in the
   pen nib and the coin are drawn.

   B = outline (--cobalt)   L = body (--sky)   D = detail (--enterprise)
*/
export const GLYPHS = {
  // Discover — magnifier
  magnifier: [
    '................',
    '.....BBBB.......',
    '...BBLLLLBB.....',
    '...BLLLLLLB.....',
    '..BLLLLLLLLB....',
    '..BLLLLLLLLB....',
    '..BLLLLLLLLB....',
    '...BLLLLLLB.....',
    '...BBLLLLBB.....',
    '.....BBBB.DD....',
    '..........DDD...',
    '...........DDD..',
    '............DDD.',
    '.............DD.',
    '................',
    '................',
  ],

  // Design — pen nib
  nib: [
    '................',
    '..BBBBBBBBBBB...',
    '..BLLLLLLLLLB...',
    '..BLLLL..LLLB...',
    '...BLLL..LLB....',
    '...BLLLLLLLB....',
    '....BLLLLLB.....',
    '....BLLLLLB.....',
    '.....BLLLB......',
    '.....BLLLB......',
    '......BLB.......',
    '......BDB.......',
    '.......D........',
    '................',
    '................',
    '................',
  ],

  // Deliver — carton
  carton: [
    '................',
    '................',
    '.BBBBBBBBBBBB...',
    '.BLLLLLDDLLLB...',
    '.BLLLLLDDLLLB...',
    '.BBBBBBBBBBBB...',
    '.BLLLLLLLLLLB...',
    '.BLLLLLLLLLLB...',
    '.BLLDDDDDDLLB...',
    '.BLLD....DLLB...',
    '.BLLDDDDDDLLB...',
    '.BLLLLLLLLLLB...',
    '.BBBBBBBBBBBB...',
    '................',
    '................',
    '................',
  ],

  // Sustain — coin
  coin: [
    '................',
    '.....BBBBB......',
    '...BBLLLLLBB....',
    '..BLLLLDLLLLB...',
    '..BLLLDDDLLLB...',
    '.BLLLDDLLLLLB...',
    '.BLLLLDDDLLLB...',
    '.BLLLLLLLDLLB...',
    '.BLLLDLLLDLLB...',
    '..BLLLDDDLLLB...',
    '..BLLLLDLLLLB...',
    '...BBLLLLLBB....',
    '.....BBBBB......',
    '................',
    '................',
    '................',
  ],
}

export const GLYPH_TONES = {
  B: 'var(--cobalt)',
  L: 'var(--sky)',
  D: 'var(--enterprise)',
}
