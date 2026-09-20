import { useState } from 'react';
import { Chapter, Reveal, Step, Hand, Petals, Stars, Art, Heart, Babe, Underline } from '../components/ui';
import { useSequence } from '../lib/hooks';
import { art, alt } from '../lib/art';
import StoryMap from '../components/Map';
import Sprig from '../components/Sprig';
import { littleThings } from '../content';

/* ═══════════════ 08 · THE PART THAT SCARED US ═══════════════ */
export function TheProblem() {
  const { ref, step } = useSequence(3, 480);
  return (
    <Chapter id="the-problem" n="Chapter 08" label="The part that scared us" tone="deep">
      <Petals count={3} seed={21} opacity={0.3} />
      <div ref={ref}>
        <Reveal>
          <h2 className="mid">And then reality caught up with us.</h2>
        </Reveal>

        <Step at={1} step={step}>
          <div className="obstacles" style={{ marginTop: 26 }}>
            <div className="obstacle"><b>Two different countries.</b></div>
            <div className="obstacle"><b>A huge distance.</b></div>
            <div className="obstacle"><b>Two different religions.</b></div>
          </div>
        </Step>

        <Step at={2} step={step}>
          <>
            <div className="faiths" style={{ marginTop: 22 }}>
              <span className="f">You — Christian</span>
              <span className="amp" aria-hidden="true">&amp;</span>
              <span className="f">Me — Muslim</span>
            </div>
            <p className="body" style={{ marginTop: 22, opacity: .78 }}>
              Neither of us pretended those things were small. They’re not. They
              belong to us, to our families, to the lives we already have.
            </p>
            <hr className="rule" />
            <h3 className="mid">We thought maybe this had no future.</h3>
            <p className="lede quiet" style={{ marginTop: 26 }}>So we tried to stop.</p>
          </>
        </Step>
      </div>
    </Chapter>
  );
}

/* ═══════════════ 09 · BUT LOVE DIDN'T LISTEN ═══════════════ */
export function LoveDidntFade() {
  const { ref, step } = useSequence(3, 480);
  return (
    <Chapter id="love-didnt-fade" n="Chapter 09" label="But love didn’t listen" tone="wine">
      <Stars count={9} seed={33} />
      <div ref={ref}>
        <Reveal>
          <h2 className="big">We stopped talking...</h2>
        </Reveal>

        <Step at={1} step={step}>
          <h3 className="big" style={{ marginTop: 4 }}>But the feelings didn’t stop.</h3>
        </Step>

        <Step at={2} step={step}>
          <>
            <div className="stack" style={{ marginTop: 34 }}>
              <span className="line quiet">The distance was still there.</span>
              <span className="line quiet">The fear was still there.</span>
              <span className="line quiet">The uncertainty was still there.</span>
            </div>
            <h3 className="big" style={{ marginTop: 34 }}>But so was the love.</h3>
            <p className="lede" style={{ marginTop: 26, opacity: .85 }}>
              We couldn’t simply turn it off.
            </p>
          </>
        </Step>
      </div>
    </Chapter>
  );
}

/* ═══════════════ 10 · SO WE STOPPED FIGHTING IT ═══════════════ */
export function GoWithTheFlow() {
  const { ref, step } = useSequence(3, 450);
  return (
    <Chapter id="go-with-the-flow" n="Chapter 10" label="So we stopped fighting it" tone="ivory">
      <Petals count={8} seed={41} />
      <Stars count={7} seed={42} />
      <Sprig w="min(230px, 56vw)"
             style={{ top: 44, right: -56, color: 'var(--soft)', opacity: .8 }} />
      <div ref={ref}>
        <Reveal>
          <h2 className="mid">So we decided...</h2>
        </Reveal>

        <Step at={1} step={step}>
          <h3 className="big wine">Let’s just go with the flow.</h3>
        </Step>

        <Step at={2} step={step}>
          <>
            <h3 className="big wine" style={{ marginTop: -2 }}>Let’s love each other.</h3>
            <hr className="rule" />
            <div className="stack sans">
              <span className="line">No pretending we don’t feel it.</span>
              <span className="line">No pretending it isn’t important.</span>
              <span className="line" style={{ color: 'var(--wine)' }}>Just us.</span>
            </div>
          </>
        </Step>
      </div>
      <Art src={art.bouquet} w="min(130px, 32vw)"
           style={{ bottom: -10, left: -26, opacity: .5 }} />
    </Chapter>
  );
}

/* ═══════════════════════ 11 · YOU ═══════════════════════ */
export function YouChapter() {
  const { ref, step } = useSequence(4, 450);
  return (
    <Chapter id="you" n="Chapter 11" label="You" tone="ivory">
      <div ref={ref}>
        <Reveal>
          <h2 className="mid">
            And somehow...
            <br />
            <span className="quiet">out of everyone I could have met that day...</span>
          </h2>
        </Reveal>

        <Reveal delay={200}>
          <div style={{ margin: '26px 0 6px' }}>
            <StoryMap connected travellers compact />
          </div>
        </Reveal>

        <Step at={1} step={step}>
          <h3 className="big wine center" style={{ marginTop: 18 }}>I met you.</h3>
        </Step>

        <Step at={2} step={step}>
          <>
            <hr className="rule" />
            <h3 className="mid">The girl with the beautiful eyes.</h3>
            <h3 className="mid wine">The girl with the beautiful smile.</h3>
          </>
        </Step>

        <Step at={3} step={step}>
          <>
            <p className="hand">the one I wasn’t looking for.</p>
            <br />
            <p className="hand r wine">the one I found anyway.</p>
          </>
        </Step>
      </div>
    </Chapter>
  );
}

/* ═══════════════════════ 12 · BABE ═══════════════════════ */
export function BabeChapter() {
  return (
    <Chapter id="babe" n="Chapter 12" tone="blush" label="Babe" className="center">
      <Reveal>
        <h2 className="title" style={{ fontSize: 'clamp(3.4rem, 22vw, 6.5rem)', marginBottom: 12 }}>
          <Babe />
        </h2>
      </Reveal>
      <Reveal delay={300}>
        <p className="body center">
          <strong>Somehow, one random word became ours.</strong>
        </p>
      </Reveal>
      <Reveal delay={450}>
        <h3 className="mid wine">Funny how that happens.</h3>
      </Reveal>
      <Reveal delay={620}>
        <p style={{ color: 'var(--wine)', margin: '10px 0 18px' }}>
          <Heart size={18} />
        </p>
      </Reveal>
      <Reveal delay={720}>
        <p className="body center">Out of all the names in the world...</p>
      </Reveal>
      <Reveal delay={840}>
        <h3 className="mid wine">this one sounds right.</h3>
      </Reveal>
    </Chapter>
  );
}

/* ═══════════════════ 13 · THE LITTLE THINGS ═══════════════════ */
export function LittleThings() {
  return (
    <Chapter id="little-things" n="Chapter 13" label="The little things" tone="ivory">
      <Art src={art.corner} w="min(160px, 38vw)"
           style={{ top: -8, right: -36, opacity: .42, transform: 'scaleX(-1)' }} />
      <Reveal>
        <h2 className="big">It’s the little things.</h2>
      </Reveal>
      <hr className="rule" />
      <div className="stack">
        {littleThings.map((t, i) => (
          <Reveal key={t} delay={180 + i * 260}>
            <span className="line" style={{ color: i < 2 ? 'var(--wine)' : undefined }}>
              {t}
            </span>
          </Reveal>
        ))}
      </div>
      <Hand delay={1200} tilt="r">what are the odds?</Hand>
    </Chapter>
  );
}

/* ═══════════════════ 14 · TWO COUNTRIES ═══════════════════ */
export function TwoCountries() {
  const { ref, step } = useSequence(3, 450);
  return (
    <Chapter id="two-countries" n="Chapter 14" label="Two countries" tone="ivory">
      <Stars count={10} seed={55} />
      <div ref={ref}>
        <Reveal>
          <div className="center" style={{ marginBottom: 6 }}>
            <p className="num" style={{ marginBottom: 14 }}>
              India <span aria-hidden="true">·</span> Philippines
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <StoryMap connected travellers />
        </Reveal>
        <Reveal delay={400}>
          <p className="map-cap">approximately 4,400 km of extremely rude geography</p>
        </Reveal>

        <Reveal delay={500}>
          <h2 className="big" style={{ marginTop: 30 }}>You are far away.</h2>
        </Reveal>

        <Step at={1} step={step}>
          <h3 className="mid quiet">Really far away.</h3>
        </Step>

        <Step at={2} step={step}>
          <>
            <p className="hand r">very inconvenient, btw.</p>
            <h3 className="mid wine" style={{ marginTop: 22 }}>
              But somehow...
              <br />
              you still feel close.
            </h3>
          </>
        </Step>
      </div>
    </Chapter>
  );
}

/* ═══════════════════ 15 · IF YOU WERE HERE ═══════════════════ */
export function IfYouWereHere() {
  const wishes: Array<[string, string, string]> = [
    [art.chairs, alt.chairs, 'I’d sit beside you.'],
    [art.balcony, alt.balcony, 'I’d finally look at your eyes without a screen between us.'],
    [art.heart, alt.heart, 'I’d hold your hand.'],
    [art.cups, alt.cups, 'I’d make you laugh.'],
    [art.rose, alt.rose, 'I’d annoy you.'],
  ];
  return (
    <Chapter id="if-you-were-here" n="Chapter 15" label="If you were here" tone="ivory">
      <Petals count={5} seed={61} opacity={0.5} />
      <Reveal>
        <h2 className="big">If you were here...</h2>
      </Reveal>

      <div className="wishes">
        {wishes.map(([src, a, text], i) => (
          <Reveal key={text} delay={i * 220}>
            <div className="wish">
              <div className="thumb">
                <img src={src} alt={a} loading="lazy" decoding="async" />
              </div>
              <p>{text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Hand delay={1100} tilt="r">probably a lot.</Hand>

      <Reveal delay={1300}>
        <h3 className="mid wine" style={{ marginTop: 14 }}>And I’d be really happy.</h3>
      </Reveal>
      <Reveal delay={1450}>
        <p className="body quiet" style={{ marginTop: 6 }}>
          None of that has happened yet. That’s sort of the point.
        </p>
      </Reveal>
    </Chapter>
  );
}

/* ═══════════════════════ 16 · THE LETTER ═══════════════════════ */
export function LoveLetter({ lines }: { lines: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <Chapter id="letter" n="Chapter 16" label="The letter" tone="blush">
      {!open && <Petals count={6} seed={71} opacity={0.5} />}
      {!open ? (
        <div className="center">
          <Reveal>
            <div className="env-teaser">
              <img src={art.envelope} alt={alt.envelope} loading="lazy" />
            </div>
          </Reveal>
          <Reveal delay={200}>
            <h2 className="mid wine">There’s a letter.</h2>
          </Reveal>
          <Reveal delay={320}>
            <p className="body center" style={{ marginBottom: 24 }}>
              I wrote it properly. No jokes in this one.
            </p>
          </Reveal>
          <Reveal delay={440}>
            <button className="btn letter-open-btn" type="button" onClick={() => setOpen(true)}>
              Open the letter
            </button>
          </Reveal>
        </div>
      ) : (
        <article className="letter-sheet grain">
          <Art src={art.corner} className="letter-corner" w="min(104px, 26vw)" />
          <Art src={art.rose} className="letter-rose" w="min(62px, 17vw)" />
          <h3>To my Julian,</h3>
          {lines.slice(1).map((l, i) => (
            <p key={i} className={l.length < 42 ? 'tight' : undefined}>{l}</p>
          ))}
          <p className="sign">
            Love,
            <b>Razal</b>
          </p>
          <div className="wax" aria-hidden="true">R</div>
          <span className="fold" aria-hidden="true" />
        </article>
      )}
    </Chapter>
  );
}

/* ═══════════════════ 17 · THE FUN PART AGAIN ═══════════════════ */
export function FunInterlude() {
  const [said, setSaid] = useState(false);
  return (
    <Chapter id="fun-again" n="Chapter 17" label="The fun part again" tone="ivory">
      <Reveal>
        <h2 className="big">Anyway...</h2>
      </Reveal>
      <Reveal delay={180}>
        <h3 className="mid wine">Enough emotional damage.</h3>
      </Reveal>
      <Hand delay={340}>I have one question.</Hand>

      <Reveal delay={520}>
        <div className="obv-wrap" style={{ marginTop: 18 }}>
          <h3 className="mid" style={{ margin: 0 }}>Are you still my <Babe />?</h3>
          {!said ? (
            <button className="btn" type="button" onClick={() => setSaid(true)}>
              Obviously
            </button>
          ) : (
            <p className="good" role="status">
              Good. <Heart size={26} className="pop-heart" />
            </p>
          )}
        </div>
      </Reveal>
      <Sprig w="min(210px, 52vw)" flip
             style={{ bottom: 28, right: -50, color: 'var(--soft)', opacity: .65 }} />
    </Chapter>
  );
}

/* ═══════════════════════ 18 · UNTIL THEN ═══════════════════════ */
export function UntilThen() {
  const { ref, step } = useSequence(2, 480);
  return (
    <Chapter id="until-then" n="Chapter 18" label="Until then" tone="ivory">
      <Stars count={12} seed={81} />
      <Petals count={4} seed={82} opacity={0.4} />
      <div ref={ref}>
        <Reveal>
          <StoryMap connected travellers />
        </Reveal>
        <Reveal delay={300}>
          <h2 className="mid" style={{ marginTop: 28 }}>
            Until the distance becomes a memory.
          </h2>
        </Reveal>
        <Reveal delay={480}>
          <p className="body">
            <strong>
              I’ll keep looking forward to the day the screen isn’t between us anymore.
            </strong>
          </p>
        </Reveal>

        <Step at={1} step={step}>
          <>
            <hr className="rule" />
            <h3 className="big wine">
              Until then...
            </h3>
            <h3 className="big wine" style={{ marginTop: -4 }}>
              you’re still my <Babe />.
            </h3>
          </>
        </Step>
      </div>
    </Chapter>
  );
}
