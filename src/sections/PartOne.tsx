import { useState } from 'react';
import { Chapter, Reveal, Step, Hand, Petals, Stars, Art, Heart, Underline } from '../components/ui';
import { useSequence } from '../lib/hooks';
import { art, alt } from '../lib/art';
import Sprig from '../components/Sprig';

/* ══════════════════════════════ OPENING ══════════════════════════════ */
export function Opening() {
  return (
    <Chapter id="opening" tone="ivory" className="tall opening" label="Opening">
      <Petals count={6} seed={2} opacity={0.75} />
      <Art src={art.corner} className="op-corner" w="min(152px, 38vw)"
           style={{ top: -62, left: -60, opacity: .4 }} />
      <Sprig w="min(200px, 50vw)" flip
             style={{ bottom: 26, right: -36, color: 'var(--soft)', opacity: .7 }} />

      <Reveal>
        <p className="kicker">a little story, only for one person</p>
      </Reveal>

      <Reveal delay={200}>
        <h1 className="title">
          <span className="to">To my</span>
          Julian
        </h1>
      </Reveal>

      <Reveal delay={520}>
        <div className="open-env">
          <img src={art.envelope} alt={alt.envelope} width={951} height={1000} />
        </div>
      </Reveal>

      <Reveal delay={700}>
        <p className="byline">
          made by <b>Razal</b>
        </p>
      </Reveal>

      <Reveal delay={1000}>
        <p className="scroll-cue">
          it starts stupidly, I promise
          <span aria-hidden="true">↓</span>
        </p>
      </Reveal>
    </Chapter>
  );
}

/* ══════════════════════ 01 · BORED ON OMETV ══════════════════════ */
export function BoredOnOmeTV() {
  const { ref, step } = useSequence(4, 450);
  return (
    <Chapter id="bored" n="Chapter 01" label="The most random decision ever" tone="ivory">
      <div ref={ref}>
        <Reveal>
          <h2 className="big wine">I was bored.</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="body">
            That’s it. That’s the whole reason. I opened OmeTV because I had nothing
            better to do. No plan. No expectation. Nothing serious.
          </p>
        </Reveal>

        <Hand delay={180}>bro was literally just bored.</Hand>

        <Reveal delay={260}>
          <div className="ome" role="img" aria-label="An illustrated video-chat window: the first stranger, skipped, then the second — her">
            <div className="ome-tile skip-tile">
              <span>stranger #1</span>
            </div>
            <div className="ome-bar">
              <span><i className="dot" /> skipped</span>
              <span>next →</span>
            </div>
          </div>
        </Reveal>

        <Step at={1} step={step} className="rv" >
          <p className="body" style={{ marginTop: 22 }}>Then the second person appeared.</p>
        </Step>

        <Step at={2} step={step}>
          <div className="ome" style={{ marginTop: 6 }}>
            <div className="ome-tile her">
              <img src={art.julian} alt={alt.julian} className="ome-julian-img" />
              <div className="ome-julian-overlay" />
              <span className="ome-julian-text">you</span>
            </div>
            <div className="ome-bar">
              <span><i className="dot live" /> connected</span>
              <span>02 / ∞</span>
            </div>
          </div>
        </Step>

        <Step at={3} step={step}>
          <div style={{ marginTop: 24 }}>
            <h3 className="mid wine">Her eyes.</h3>
            <p className="body" style={{ marginTop: -6 }}>That was the first thing. Before anything else.</p>
            <h3 className="mid wine" style={{ marginTop: 18 }}>Then her smile.</h3>
            <Hand tilt="r">yeah... those eyes.</Hand>
          </div>
        </Step>
      </div>
    </Chapter>
  );
}

/* ══════════════════ 01b · THE INSTAGRAM QUESTION ══════════════════ */
export function JulianAppears() {
  return (
    <Chapter id="julian-appears" tone="blush" label="Asking for your Instagram">
      <Art src={art.rose} w="min(108px, 26vw)"
           style={{ top: 'clamp(46px, 9vh, 86px)', right: -30, opacity: .42, transform: 'rotate(14deg)' }} />
      <Reveal>
        <p className="lede">We didn’t even talk properly at first.</p>
      </Reveal>
      <Reveal delay={120}>
        <p className="body">
          We just chatted through OmeTV. Typed things. Nothing dramatic. And then,
          somewhere in there, I asked for your Instagram.
        </p>
      </Reveal>
      <Reveal delay={260}>
        <h2 className="big wine" style={{ marginTop: 18 }}>
          Best decision
          <br />I ever made.
        </h2>
      </Reveal>
      <Reveal delay={360}>
        <Underline width={200} />
      </Reveal>
      <Hand delay={520} tilt="r" className="wine">look what happened.</Hand>
    </Chapter>
  );
}

/* ═══════════════════════ 02 · INSTAGRAM ═══════════════════════ */
export function Instagram() {
  const { ref, step } = useSequence(4, 450);
  const state = step >= 3 ? 'friends' : step >= 2 ? 'back' : 'follow';
  const labels = { follow: 'Follow', back: 'Follow back', friends: 'Friends ♡' } as const;

  return (
    <Chapter id="instagram" n="Chapter 02" label="Then I found your Instagram" tone="ivory">
      <div ref={ref}>
        <Reveal>
          <div className="stack">
            <span className="line">One follow.</span>
            <span className="line quiet">Then another.</span>
            <span className="line">And suddenly...</span>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="phone" style={{ marginTop: 26 }}>
            <div className="notch" />
            <div className="avatar-ring">
              <span className="inner" aria-hidden="true">J</span>
            </div>
            <p className="handle">the girl from the second screen</p>
            <button className="follow-btn" data-state={state} type="button" disabled aria-live="polite">
              {labels[state]}
            </button>
          </div>
        </Reveal>

        <Step at={1} step={step}>
          <p className="lede" style={{ marginTop: 30 }}>
            I knew you existed outside OmeTV.
          </p>
        </Step>
        <Step at={3} step={step}>
          <p className="body">
            <strong>We became friends.</strong>
          </p>
        </Step>
      </div>
      <Art src={art.corner} w="min(140px, 34vw)"
           style={{ bottom: -46, left: -54, opacity: .34, transform: 'scaleY(-1)' }} />
    </Chapter>
  );
}

/* ═══════════════════════ 03 · JUST FRIENDS ═══════════════════════ */
export function JustFriends() {
  return (
    <Chapter id="friends" n="Chapter 03" label="Friends..." tone="ivory">
      <Reveal>
        <h2 className="big">
          We were <span className="wine it">“just friends.”</span>
        </h2>
      </Reveal>

      <Reveal delay={200}>
        <div className="bubbles" style={{ marginTop: 22 }}>
          <span className="bubble float">We talked.</span>
          <span className="bubble alt float">We laughed.</span>
          <span className="bubble float">We flirted.</span>
        </div>
      </Reveal>

      <Reveal delay={420}>
        <h3 className="mid wine" style={{ marginTop: 30 }}>
          A little too much for <span className="it">“just friends.”</span>
        </h3>
      </Reveal>

      <Hand delay={600} tilt="r">just saying.</Hand>
      <Art src={art.rose} w="min(92px, 24vw)"
           style={{ bottom: 40, right: 6, opacity: .4, transform: 'rotate(-18deg)' }} />
    </Chapter>
  );
}

/* ═══════════════ 04 · SILENCE, THEN SHE TEXTED ═══════════════ */
export function SheTextedAgain() {
  const { ref, step } = useSequence(6, 480);
  return (
    <Chapter id="she-texted" n="Chapter 04" label="And then..." tone="ivory"
             className={step >= 4 ? 'warming' : ''}>
      <div ref={ref}>
        <Reveal>
          <h2 className="big quiet">Time passed.</h2>
        </Reveal>

        <Reveal delay={200}>
          <div className="cal" aria-hidden="true">
            {Array.from({ length: 28 }, (_, i) => (
              <i key={i} style={{ animationDelay: `${(i % 7) * 0.24}s` }} />
            ))}
          </div>
        </Reveal>

        <Step at={1} step={step}>
          <h3 className="mid" style={{ marginTop: 34 }}>We stopped texting.</h3>
        </Step>

        <Step at={2} step={step}>
          <p className="body quiet" style={{ marginTop: 40 }}>And life kept moving.</p>
        </Step>

        <div style={{ minHeight: 'clamp(40px, 12vh, 90px)' }} />

        {step >= 3 && (
          <div className="notif pop" role="status">
            <span className="ic" aria-hidden="true">J</span>
            <div>
              <b>Julian</b>
              <span>sent you a message.</span>
            </div>
            <small>now</small>
          </div>
        )}

        <Step at={4} step={step}>
          <h3 className="mid wine" style={{ marginTop: 32 }}>You texted me again.</h3>
        </Step>

        <Step at={5} step={step}>
          <div className="eyes-line" style={{ marginTop: 10 }}>
            <img src={art.rose} alt="" width={640} height={1000}
                 style={{ width: 40, opacity: .85 }} loading="lazy" />
            <h3 className="mid wine" style={{ margin: 0 }}>And I was so happy.</h3>
          </div>
        </Step>
      </div>
    </Chapter>
  );
}

/* ═══════════════════════ 05 · ROUND TWO ═══════════════════════ */
export function RoundTwo() {
  return (
    <Chapter id="round-two" n="Chapter 05" label="Round two" tone="blush">
      <Petals count={5} seed={9} opacity={0.55} />
      <Reveal>
        <h2 className="big">
          And just like that...
          <br />
          <span className="wine">we were talking again.</span>
        </h2>
      </Reveal>

      <Reveal delay={240}>
        <div className="bubbles" style={{ marginTop: 24 }}>
          <span className="bubble alt float">talking</span>
          <span className="bubble float">laughing</span>
          <span className="bubble alt float">flirting</span>
        </div>
      </Reveal>

      <Reveal delay={420}>
        <p className="lede" style={{ marginTop: 24 }}>Getting closer again.</p>
      </Reveal>

      <Reveal delay={560}>
        <h3 className="mid wine" style={{ marginTop: 16 }}>
          Somehow, it felt even better this time.
        </h3>
      </Reveal>
    </Chapter>
  );
}

/* ═══════════════ 06 · THE FAKE MARRIAGE THAT WASN'T ═══════════════ */
export function OnlineMarriage() {
  const { ref, step } = useSequence(5, 450);
  const [stamped, setStamped] = useState(false);

  return (
    <Chapter id="marriage" n="Chapter 06" label="The fake marriage that wasn’t so fake" tone="ivory">
      <Stars count={8} seed={11} />
      <div ref={ref}>
        <Reveal>
          <h2 className="big">So obviously...</h2>
        </Reveal>

        <Step at={1} step={step}>
          <h3 className="big wine" style={{ marginTop: -4 }}>We got married.</h3>
        </Step>

        <Step at={2} step={step}>
          <p className="body" style={{ marginTop: -6 }}>
            <strong>online.</strong>
          </p>
        </Step>
        <Step at={3} step={step}>
          <p className="body" style={{ marginTop: -14 }}>
            <strong>for fun.</strong>
          </p>
        </Step>
        <Step at={4} step={step}>
          <p className="mid wine it" style={{ marginTop: -6 }}>...mostly.</p>
        </Step>

        <Reveal delay={200}>
          <div className="cert" style={{ marginTop: 26 }}>
            <span className="ribbon">est. somewhere online</span>
            <div className="rings">
              <img src={art.heart} alt="" loading="lazy"
                   style={{ width: '100%', opacity: .9 }} />
            </div>
            <h3>Certificate of Online Nonsense</h3>
            <p className="sub">also known as an official internet marriage</p>
            <p className="names">
              Razal
              <em>&amp;</em>
              Julian
            </p>
            <p className="fine">
              Witnessed by nobody. Filed nowhere. Legally meaningless in both
              countries and in every country in between. Entered into freely,
              mostly as a joke, on a perfectly ordinary evening.
            </p>
            <p className="status">Status: somehow getting serious.</p>
            <div className="cert-sign">
              <div>
                <p className="sig">Razal</p>
                <p className="lbl">the groom, allegedly</p>
              </div>
              <div>
                <p className="sig">Julian</p>
                <p className="lbl">the bride, allegedly</p>
              </div>
            </div>
            <span className={`stamp ${stamped ? 'on' : ''}`} aria-hidden="true">
              approved<br />by us<br />only
            </span>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="center" style={{ marginTop: 22 }}>
            <button
              className="btn ghost"
              type="button"
              onClick={() => setStamped(true)}
              aria-pressed={stamped}
            >
              {stamped ? 'certified nonsense ♡' : 'make it official'}
            </button>
          </div>
        </Reveal>

        <Hand delay={420} tilt="r">
          {stamped ? 'there. now it’s binding.' : 'go on, stamp it.'}
        </Hand>
      </div>
      <Art src={art.bouquet} w="min(112px, 28vw)"
           style={{ bottom: -30, left: -44, opacity: .4 }} />
    </Chapter>
  );
}

/* ═══════════════ 07 · SOMEWHERE ALONG THE WAY ═══════════════ */
export function Feelings() {
  const { ref, step } = useSequence(3, 480);
  return (
    <Chapter id="feelings" n="Chapter 07" label="Somewhere along the way" tone="ivory">
      <div ref={ref}>
        <Reveal>
          <h2 className="mid">Somewhere along the way...</h2>
        </Reveal>

        <Step at={1} step={step}>
          <h3 className="big wine" style={{ marginTop: 6 }}>It stopped feeling like a joke.</h3>
        </Step>

        <Step at={2} step={step}>
          <>
            <p className="lede" style={{ marginTop: 20 }}>We started developing feelings.</p>
            <hr className="rule" />
            <div className="stack sans">
              <span className="line">The laughs felt different.</span>
              <span className="line">The flirting felt different.</span>
              <span className="line">Talking started to matter more.</span>
            </div>
            <h3 className="mid wine" style={{ marginTop: 34 }}>
              And suddenly...
              <br />
              this was real.
            </h3>
          </>
        </Step>
      </div>
      <Heart className="feelings-heart" size={0} />
    </Chapter>
  );
}
