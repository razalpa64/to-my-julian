import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion, rand } from '../lib/hooks';
import { petals as petalSrc } from '../lib/art';

/* ---------------------------------------------------------------
   Reveal — fades a block up when it enters the viewport.
   Reduced motion turns it into a plain fade (handled in CSS).
   --------------------------------------------------------------- */
export function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: any;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      className={`rv ${seen ? 'in' : ''} ${className}`}
      style={{ ...style, ['--d' as any]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* Shows children only once `step` has been reached (see useSequence). */
export function Step({
  at,
  step,
  children,
  className = '',
  as: Tag = 'div',
}: {
  at: number;
  step: number;
  children: React.ReactNode;
  className?: string;
  as?: any;
}) {
  return (
    <Tag className={`rv ${step >= at ? 'in' : ''} ${className}`}>{children}</Tag>
  );
}

/* ---------------------------------------------------------------
   Chapter shell
   --------------------------------------------------------------- */
export function Chapter({
  id,
  n,
  label,
  tone = 'ivory',
  children,
  className = '',
  innerRef,
}: {
  id: string;
  n?: string;
  label?: string;
  tone?: 'ivory' | 'blush' | 'wine' | 'deep';
  children: React.ReactNode;
  className?: string;
  innerRef?: React.Ref<HTMLElement>;
}) {
  const dark = tone === 'wine' || tone === 'deep';
  return (
    <section
      id={id}
      ref={innerRef}
      aria-label={label}
      className={`chapter grain t-${tone} ${dark ? 'on-dark' : ''} ${className}`}
    >
      <div className="wrap">
        {n && (
          <Reveal as="p" className="num">
            <b>{n}</b>
            {label ? <> &nbsp;·&nbsp; {label}</> : null}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}

/* Handwritten margin note. */
export function Hand({
  children,
  tilt = 'l',
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  tilt?: 'l' | 'r';
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay}>
      <p className={`hand ${tilt === 'r' ? 'r' : ''} ${className}`}>{children}</p>
    </Reveal>
  );
}

/* ---------------------------------------------------------------
   Falling petals — real painted petal cutouts, very slow, few.
   Disabled entirely under reduced motion.
   --------------------------------------------------------------- */
export function Petals({
  count = 7,
  seed = 1,
  opacity = 0.85,
}: {
  count?: number;
  seed?: number;
  opacity?: number;
}) {
  const reduced = useReducedMotion();
  const { ref, seen } = useInView<HTMLDivElement>({ amount: 0.02 });
  if (reduced) return null;
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="petal-field"
      style={{ opacity: seen ? opacity : 0 }}
    >
      {Array.from({ length: count }, (_, i) => {
        const r1 = rand(seed * 31 + i);
        const r2 = rand(seed * 71 + i * 7);
        const r3 = rand(seed * 17 + i * 13);
        const size = 15 + r2 * 20;
        return (
          <img
            key={i}
            src={petalSrc[i % petalSrc.length]}
            alt=""
            loading="lazy"
            decoding="async"
            className="petal"
            style={{
              left: `${4 + r1 * 92}%`,
              width: size,
              animationDuration: `${17 + r3 * 15}s, ${5 + r2 * 4}s`,
              animationDelay: `${-r2 * 26}s, ${-r1 * 6}s`,
            }}
          />
        );
      })}
    </div>
  );
}

/* Tiny twinkling stars, drawn as CSS-animated SVG sparks. */
export function Stars({ count = 14, seed = 3 }: { count?: number; seed?: number }) {
  const reduced = useReducedMotion();
  return (
    <div className="star-field" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => {
        const r1 = rand(seed + i * 3.3);
        const r2 = rand(seed * 5 + i * 1.7);
        const s = 5 + r2 * 8;
        return (
          <svg
            key={i}
            className="star"
            width={s}
            height={s}
            viewBox="0 0 10 10"
            style={{
              left: `${3 + r1 * 94}%`,
              top: `${4 + r2 * 92}%`,
              animationDelay: reduced ? '0s' : `${-r1 * 5}s`,
              animationDuration: reduced ? '0s' : `${3.4 + r2 * 3}s`,
            }}
          >
            <path
              d="M5 0 C5.5 3.6 6.4 4.5 10 5 C6.4 5.5 5.5 6.4 5 10 C4.5 6.4 3.6 5.5 0 5 C3.6 4.5 4.5 3.6 5 0 Z"
              fill="currentColor"
            />
          </svg>
        );
      })}
    </div>
  );
}

/* A small ink heart. */
export function Heart({
  size = 18,
  filled = true,
  className = '',
}: {
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 22"
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: '-0.14em' }}
    >
      <path
        d="M12 21S1.8 14.3 1.8 7.6C1.8 4.2 4.4 1.8 7.4 1.8c2 0 3.7 1.1 4.6 2.7.9-1.6 2.6-2.7 4.6-2.7 3 0 5.6 2.4 5.6 5.8C22.2 14.3 12 21 12 21Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.4}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* A hand-drawn-feeling underline that draws itself in. */
export function Underline({ width = 130 }: { width?: number }) {
  const { ref, seen } = useInView<HTMLSpanElement>();
  return (
    <span ref={ref} className="uline" style={{ width }}>
      <svg viewBox="0 0 130 10" preserveAspectRatio="none" aria-hidden="true">
        <path
          className={seen ? 'draw in' : 'draw'}
          d="M2 6.4C22 2.8 52 1.8 74 3.4c18 1.3 34 3.2 54 1.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* Positioned decorative illustration. */
export function Art({
  src,
  alt = '',
  className = '',
  style,
  w,
}: {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  w?: number | string;
}) {
  return (
    <div className={`art ${className}`} style={{ width: w, ...style }} aria-hidden={alt ? undefined : 'true'}>
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}

/* Word that sprouts a tiny heart when you touch or hover it. */
export function Babe({ children = 'babe' }: { children?: string }) {
  const [on, setOn] = useState(false);
  const t = useRef<number>();
  const poke = () => {
    setOn(true);
    clearTimeout(t.current);
    t.current = window.setTimeout(() => setOn(false), 1400);
  };
  useEffect(() => () => clearTimeout(t.current), []);
  return (
    <span
      className="babe"
      onMouseEnter={poke}
      onTouchStart={poke}
      onFocus={poke}
      tabIndex={0}
      role="text"
    >
      {children}
      <span className={`babe-heart ${on ? 'on' : ''}`} aria-hidden="true">
        <Heart size={14} />
      </span>
    </span>
  );
}
