# To My Julian

A private digital love story. From Razal, with love.

## Run it

```bash
npm install
npm run dev      # open the printed URL on your phone
npm run build    # production build -> dist/
```

## The two things you'll probably want to change

**`src/content.ts`** — the whole story config in one file:

- `secretPS` — the hidden note behind the final letter. **Change this.** It's
  the one place with placeholder-ish wording; make it yours.
- `letter` — your letter, exactly as you wrote it. Untouched.
- `littleThings` — Chapter 13. Add more only if they're actually true.

**`public/audio/our-song.mp3`** — drop your song in with that exact name and
the "♪ play our song" button starts working. It never autoplays; Julian has to
tap it. With no file there, the button quietly disables itself and nothing
breaks.

## How it's built

- React + TypeScript + Vite, plain CSS. No UI framework, no animation library —
  every motion is CSS, so it stays smooth on an ordinary phone.
- Fonts are self-hosted (Cormorant Garamond / Inter / Caveat), so there's no
  network round-trip and no layout shift.
- All 10 illustrations were generated for this site and cut to transparent
  WebP — no white boxes anywhere. `public/art/petal/` holds nine individual
  petals used for the gentle falling-petal drifts.
- `src/lib/geo.json` holds real simplified coastlines for India and the
  Philippines, redrawn as smooth curves so they read as ink sketches rather
  than as a map product. Regenerate with `python3 tools/geo.py`.

## Things deliberately built in

- **The NO button is real.** Same size, same position, same prominence as YES.
  It never moves, never hides, never nags. The response to NO is warm and
  thanks her for being honest.
- **`prefers-reduced-motion`** is fully respected: falling petals don't render
  at all, twinkles stop, timed reveals collapse to near-instant fades.
- Keyboard navigable end to end with visible focus rings; the P.S. note is a
  proper dialog that traps Escape and returns focus to its opener.
- Mobile-first, verified with no horizontal scroll at 360px. The proposal
  scrolls itself so YES and NO are always both on screen.

## Structure

```
src/
├── App.tsx                 chapter order + the song toggle
├── content.ts              ← edit this
├── sections/
│   ├── PartOne.tsx         Opening → Feelings (ch. 1–7)
│   ├── PartTwo.tsx         TheProblem → UntilThen (ch. 8–18)
│   └── PartThree.tsx       Proposal, Yes, No, Final, SecretPS (ch. 19–20)
├── components/
│   ├── ui.tsx              Chapter, Reveal, Petals, Stars, Babe, Heart…
│   ├── Map.tsx             India ↔ Philippines
│   └── Sprig.tsx           inline SVG botanical
└── lib/hooks.ts            useSequence (the story's pacing), useInView…
```

The pacing of the whole site comes from `useSequence` — it's what makes lines
arrive one at a time instead of all at once, and it's what makes Chapter 04
land.
