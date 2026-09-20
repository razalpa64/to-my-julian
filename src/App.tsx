import { useEffect, useRef, useState } from 'react';
import { useScrollProgress } from './lib/hooks';
import { letter, song } from './content';
import {
  Opening, BoredOnOmeTV, JulianAppears, Instagram, JustFriends,
  SheTextedAgain, RoundTwo, OnlineMarriage, Feelings,
} from './sections/PartOne';
import {
  TheProblem, LoveDidntFade, GoWithTheFlow, YouChapter, BabeChapter,
  LittleThings, TwoCountries, IfYouWereHere, LoveLetter, FunInterlude, UntilThen,
} from './sections/PartTwo';
import {
  Proposal, YesResponse, NoResponse, FinalScreen, type Answer,
} from './sections/PartThree';

/* The little audio control. Never autoplays — she has to ask for it. */
function SongToggle() {
  const el = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [missing, setMissing] = useState(false);
  const [tucked, setTucked] = useState(false);

  /* Tuck the control into a small circle once she starts reading,
     so it never sits on top of the story. */
  useEffect(() => {
    const on = () => setTucked(scrollY > innerHeight * 0.7);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, []);

  const toggle = async () => {
    const a = el.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    try {
      await a.play();
      setPlaying(true);
    } catch {
      setMissing(true);
    }
  };

  return (
    <>
      <audio
        ref={el}
        src={song.src}
        loop
        preload="none"
        onError={() => setMissing(true)}
        onEnded={() => setPlaying(false)}
      />
      <button
        className={`song ${tucked && !playing ? 'tucked' : ''}`}
        type="button"
        onClick={toggle}
        disabled={missing}
        data-playing={playing}
        aria-pressed={playing}
        aria-label={playing ? 'Pause our song' : `Play our song`}
        title={missing ? 'no song added yet' : undefined}
      >
        <span className="eq" aria-hidden="true"><i /><i /><i /></span>
        <span className="label">
          {missing ? 'song coming soon' : playing ? 'pause our song' : `♪ ${song.label}`}
        </span>
      </button>
    </>
  );
}

export default function App() {
  const [answer, setAnswer] = useState<Answer>(null);
  const progress = useScrollProgress();
  const afterRef = useRef<HTMLDivElement>(null);

  /* When she answers, walk her gently to the response instead of jumping. */
  useEffect(() => {
    if (!answer) return;
    const t = setTimeout(() => {
      afterRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
    return () => clearTimeout(t);
  }, [answer]);

  return (
    <>
      <a className="skip" href="#letter">Skip to the letter</a>
      <div className="thread" style={{ ['--p' as any]: `${progress * 100}%` }} aria-hidden="true" />

      <main>
        <Opening />
        <BoredOnOmeTV />
        <JulianAppears />
        <Instagram />
        <JustFriends />
        <SheTextedAgain />
        <RoundTwo />
        <OnlineMarriage />
        <Feelings />
        <TheProblem />
        <LoveDidntFade />
        <GoWithTheFlow />
        <YouChapter />
        <BabeChapter />
        <LittleThings />
        <TwoCountries />
        <IfYouWereHere />
        <LoveLetter lines={letter} />
        <FunInterlude />
        <UntilThen />

        <Proposal onAnswer={setAnswer} answer={answer} />

        <div ref={afterRef}>
          {answer === 'yes' && <YesResponse />}
          {answer === 'no' && <NoResponse />}
          {answer && <FinalScreen answered />}
        </div>
      </main>

      <SongToggle />
    </>
  );
}
