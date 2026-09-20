/** A hand-drawn botanical sprig, as inline SVG so it stays weightless and sharp. */
export default function Sprig({
  w = 180,
  className = '',
  style,
  flip = false,
}: {
  w?: number | string;
  className?: string;
  style?: React.CSSProperties;
  flip?: boolean;
}) {
  return (
    <div
      className={`art ${className}`}
      style={{ width: w, transform: flip ? 'scaleX(-1)' : undefined, ...style }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 90" fill="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <path
          d="M4 78C34 74 62 62 88 46c24-15 48-28 76-34"
          stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity=".55"
        />
        {[
          [30, 70, -28], [52, 62, -34], [74, 52, -40],
          [96, 42, -44], [120, 32, -48], [144, 22, -52],
        ].map(([x, y, r], i) => (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r})`} opacity=".5">
            <ellipse cx="0" cy="-8" rx="4.2" ry="9" stroke="currentColor" strokeWidth="1.1" />
            <path d="M0 0v-17" stroke="currentColor" strokeWidth=".8" />
          </g>
        ))}
        {[[42, 60], [86, 40], [134, 20], [168, 12]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cx="0" cy="-4.4" rx="2.5" ry="4.4"
                transform={`rotate(${a})`}
                fill="currentColor" opacity={i % 2 ? '.3' : '.45'}
              />
            ))}
            <circle r="1.5" fill="currentColor" opacity=".75" />
          </g>
        ))}
      </svg>
    </div>
  );
}
