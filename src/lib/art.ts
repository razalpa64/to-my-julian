/** Every generated illustration, in one place. */
export const art = {
  rose: '/art/rose-stem.webp',
  bouquet: '/art/bouquet.webp',
  corner: '/art/floral-corner.webp',
  envelope: '/art/envelope-open.webp',
  heart: '/art/floral-heart.webp',
  balcony: '/art/balcony.webp',
  chairs: '/art/two-chairs.webp',
  cups: '/art/two-cups.webp',
  letter: '/art/letter-flowers.webp',
  julian: '/art/julian.png',
} as const;

/* Listed literally (not generated) so the standalone single-file build can
   find and inline every asset path. */
export const petals = [
  '/art/petal/p0.webp',
  '/art/petal/p1.webp',
  '/art/petal/p2.webp',
  '/art/petal/p3.webp',
  '/art/petal/p4.webp',
  '/art/petal/p5.webp',
  '/art/petal/p6.webp',
  '/art/petal/p7.webp',
  '/art/petal/p8.webp',
];

export const alt = {
  rose: 'A painted burgundy rose on a single stem',
  bouquet: 'A small painted bouquet of burgundy and blush flowers',
  corner: 'A painted floral corner of roses and leaves',
  envelope: 'An open ivory envelope with a letter and a wax seal',
  heart: 'A heart drawn out of small painted flowers',
  balcony: 'A quiet moonlit balcony with climbing flowers',
  chairs: 'Two empty chairs standing side by side',
  cups: 'Two teacups waiting next to each other',
  letter: 'An open letter surrounded by pressed flowers',
  julian: 'Julian smiling softly',
} as const;
