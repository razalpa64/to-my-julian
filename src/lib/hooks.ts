import { useEffect, useRef, useState } from 'react';

/** True when the user asked the OS for less motion. Live-updating. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof matchMedia === 'function'
      ? matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/** Fires once when the element scrolls into view. */
export function useInView<T extends Element>(
  opts: { amount?: number; rootMargin?: string } = {}
) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!('IntersectionObserver' in window)) return setSeen(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: opts.amount ?? 0.05, rootMargin: opts.rootMargin ?? '100px 0px 100px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, opts.amount, opts.rootMargin]);
  return { ref, seen };
}

/**
 * Steps 0..n once the section is in view — this is how the story "breathes".
 * Reduced motion collapses the pauses so everything is there almost at once.
 */
export function useSequence(steps: number, gapMs = 900, startWhenSeen = true) {
  const { ref, seen } = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (startWhenSeen && !seen) return;
    if (step >= steps) return;
    const gap = reduced ? Math.min(180, gapMs) : gapMs;
    const t = setTimeout(() => setStep((s) => s + 1), gap);
    return () => clearTimeout(t);
  }, [seen, step, steps, gapMs, reduced, startWhenSeen]);
  return { ref, step, seen };
}

/** 0 → 1 scroll progress of the whole document. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - innerHeight;
        setP(h > 0 ? Math.min(1, scrollY / h) : 0);
      });
    };
    on();
    addEventListener('scroll', on, { passive: true });
    addEventListener('resize', on);
    return () => {
      removeEventListener('scroll', on);
      removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return p;
}

/** Deterministic pseudo-random so decorations don't jump between renders. */
export function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}
