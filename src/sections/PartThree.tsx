import { useEffect, useRef, useState } from 'react';
import { Chapter, Reveal, Step, Petals, Stars, Art, Heart } from '../components/ui';
import Sprig from '../components/Sprig';
import { useSequence, useReducedMotion } from '../lib/hooks';
import { art, alt } from '../lib/art';
import StoryMap from '../components/Map';
import { secretPS } from '../content';

export type Answer = 'yes' | 'no' | null;

/* ═══════════════════════ 19 · THE QUESTION ═══════════════════════ */
export function Proposal({ onAnswer, answer }: { onAnswer: (a: Answer) => void; answer: Answer }) {
  const { ref, step } = useSequence(5, 500);
  const choicesRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /* Once both buttons exist, make sure they're actually on screen —
     the question is useless if she can't see the answers. */
  useEffect(() => {
    if (step < 4) return;
    const t = setTimeout(() => {
      const el = choicesRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.bottom > innerHeight - 16) {
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'end' });
      }
    }, 700);
    return () => clearTimeout(t);
  }, [step, reduced]);

  if (answer) return null;

  return (
    <Chapter id="the-question" tone="deep" label="The question" className="tall ask">
      <div ref={ref}>
        <Reveal>
          <Sprig w="min(126px, 34vw)" className="ask-sprig"
                 style={{ position: 'static', margin: '0 auto', color: 'var(--blush)', opacity: .48 }} />
        </Reveal>
        <Reveal delay={150}>
          <p className="lede quiet">Okay...</p>
        </Reveal>

        <Step at={1} step={step}>
          <p className="lede">One serious question.</p>
        </Step>

        <Step at={2} step={step}>
          <h2 className="mid" style={{ marginTop: 'clamp(14px, 3vh, 24px)', marginBottom: '.1em' }}>Julian...</h2>
        </Step>

        <Step at={3} step={step}>
          <>
            <h3 className="q">Will you choose me?</h3>
            <p className="becauses">
              Not because I can promise exactly what the future looks like.
              <br />
              Not because distance suddenly disappeared.
              <br />
              Not because everything is easy.
            </p>
            <p className="lede" style={{ maxWidth: '26rem', marginInline: 'auto' }}>
              Just because you want to see where this story goes with me.
            </p>
          </>
        </Step>

        <Step at={4} step={step}>
          <>
            <h3 className="mid" style={{ marginTop: 'clamp(20px, 4vh, 30px)' }}>Will you be my girlfriend?</h3>
            <div className="choices" ref={choicesRef}>
              <button className="btn" type="button" onClick={() => onAnswer('yes')}>
                YES
              </button>
              <button className="btn ghost" type="button" onClick={() => onAnswer('no')}>
                NO
              </button>
            </div>
            <p className="answer-note">Both buttons are real. Whatever you press is okay.</p>
          </>
        </Step>
      </div>
    </Chapter>
  );
}

/* ═══════════════════════ IF SHE SAYS YES ═══════════════════════ */
export function YesResponse() {
  const { ref, step } = useSequence(5, 480);
  return (
    <Chapter id="yes" tone="ivory" label="Her answer" className="tall center">
      <Petals count={7} seed={91} opacity={0.6} />
      <Stars count={10} seed={92} />
      <div ref={ref}>
        <Reveal>
          <div className="bloom">
            <img src={art.rose} alt={alt.rose} />
          </div>
        </Reveal>

        <Reveal delay={300}>
          <h2 className="mid">Wait...</h2>
        </Reveal>

        <Step at={1} step={step}>
          <h3 className="big wine">You actually said yes.</h3>
        </Step>

        <Step at={2} step={step}>
          <h3 className="mid">You just made me very happy.</h3>
        </Step>

        <Step at={3} step={step}>
          <>
            <hr className="rule" />
            <h3 className="mid">So I guess...</h3>
            <h3 className="big wine">
              it’s really us now. <Heart size={26} />
            </h3>
          </>
        </Step>

        <Step at={4} step={step}>
          <>
            <p className="body center" style={{ marginTop: 18 }}>
              <strong>And I’m going to keep this little story close to my heart.</strong>
            </p>
            <h3 className="big wine" style={{ marginTop: 20 }}>My babe.</h3>
            <p style={{ color: 'var(--wine)' }}>
              <Heart size={16} />
            </p>
          </>
        </Step>
      </div>
    </Chapter>
  );
}

/* ═══════════════════════ IF SHE SAYS NO ═══════════════════════ */
export function NoResponse() {
  const { ref, step } = useSequence(3, 480);
  return (
    <Chapter id="no" tone="ivory" label="Her answer" className="tall center">
      <div ref={ref}>
        <Reveal>
          <div className="bloom" style={{ width: 'min(150px, 40vw)' }}>
            <img src={art.rose} alt={alt.rose} />
          </div>
        </Reveal>

        <Reveal delay={260}>
          <h2 className="big wine">That’s okay.</h2>
        </Reveal>

        <Step at={1} step={step}>
          <p className="body center">
            <strong>Thank you for being honest with me.</strong>
          </p>
        </Step>

        <Step at={2} step={step}>
          <>
            <hr className="rule" />
            <h3 className="mid">I’m still really glad I found you.</h3>
            <p className="body center" style={{ marginTop: 14 }}>
              <strong>
                Some people enter your life unexpectedly and still leave it more
                beautiful than they found it.
              </strong>
            </p>
          </>
        </Step>
      </div>
    </Chapter>
  );
}

/* ═══════════════════════ 20 · FINAL SCREEN ═══════════════════════ */
export function FinalScreen({ answered }: { answered: boolean }) {
  const { ref, step } = useSequence(4, 480);
  return (
    <Chapter id="final" tone="ivory" label="Final" className="tall final">
      <Petals count={5} seed={101} opacity={0.45} />
      <div className="art" aria-hidden="true"
           style={{ inset: 0, display: 'grid', placeItems: 'center', opacity: .085 }}>
        <StoryMap connected={false} travellers={false} />
      </div>

      <div ref={ref}>
        <Reveal>
          <div className="final-art">
            <img src={art.letter} alt={alt.letter} loading="lazy" />
          </div>
        </Reveal>

        <Reveal delay={240}>
          <h2 className="mid">From India,</h2>
        </Reveal>
        <Reveal delay={420}>
          <h2 className="mid wine">to my Julian in the Philippines.</h2>
        </Reveal>

        <Step at={1} step={step}>
          <h3 className="mid" style={{ marginTop: 26 }}>Somehow...</h3>
        </Step>
        <Step at={2} step={step}>
          <h3 className="big wine">I found you.</h3>
        </Step>
        <Step at={3} step={step}>
          <>
            <h3 className="mid">And I’m really glad I did.</h3>
            <hr className="rule" />
            <p className="body center" style={{ marginBottom: 0 }}>
              <strong>Love,</strong>
            </p>
            <p className="title" style={{ fontSize: 'clamp(2.6rem, 16vw, 4.4rem)' }}>Razal</p>
            <p className="hand wine" style={{ marginTop: 18 }}>
              for my Julian <Heart size={13} />
            </p>
          </>
        </Step>

        {answered && <SecretPS ready={step >= 3} />}
      </div>
    </Chapter>
  );
}

/* ═══════════════════════ SECRET P.S. ═══════════════════════ */
export function SecretPS({ ready }: { ready: boolean }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => setVisible(true), reduced ? 600 : 4200);
    return () => clearTimeout(t);
  }, [ready, reduced]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        openerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!visible) return null;

  return (
    <>
      <div style={{ marginTop: 'clamp(40px, 10vh, 70px)' }}>
        <button
          ref={openerRef}
          className="ps-btn"
          type="button"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
        >
          P.S.
        </button>
      </div>

      {open && (
        <div
          className="note-backdrop"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="note grain" role="dialog" aria-modal="true" aria-labelledby="ps-title">
            <button
              ref={closeRef}
              className="note-close"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close the note"
            >
              ×
            </button>
            <h3 id="ps-title">{secretPS.heading}</h3>
            {secretPS.lines.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
            <p className="sig">{secretPS.signoff}</p>
            <Art src={art.rose} w={54}
                 style={{ bottom: -12, right: -8, opacity: .45, transform: 'rotate(18deg)' }} />
          </div>
        </div>
      )}
    </>
  );
}
