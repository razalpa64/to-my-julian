import { useInView } from '../lib/hooks';
import geo from '../lib/geo.json';

/* Real coastlines, simplified and redrawn as smooth curves so they read like
   ink sketches rather than a mapping product. Pins sit on Kerala and Manila. */

const [ax, ay] = geo.pins.india;
const [bx, by] = geo.pins.ph;
const ARC = `M${ax} ${ay} C${ax + 62} ${ay - 76}, ${bx - 84} ${by - 46}, ${bx} ${by}`;

export default function StoryMap({
  connected = true,
  travellers = true,
  compact = false,
  labels = true,
}: {
  connected?: boolean;
  travellers?: boolean;
  compact?: boolean;
  labels?: boolean;
}) {
  const { ref, seen } = useInView<SVGSVGElement>({ amount: 0.28 });

  return (
    <svg
      ref={ref}
      className="map"
      viewBox="0 0 380 178"
      role="img"
      aria-label="An ink sketch of India and the Philippines, joined by a delicate line"
      style={compact ? { maxWidth: 340 } : undefined}
    >
      <g transform={geo.t.india}>
        <path className="land" d={geo.india} />
      </g>
      <g transform={geo.t.ph}>
        {Object.entries(geo.ph).map(([k, d]) => (
          <path key={k} className="land" d={d as string} />
        ))}
      </g>

      <path
        className={`thread-path ${connected && seen ? 'in' : ''}`}
        d={ARC}
        strokeDasharray="3.5 6"
      />

      <circle className="pin-ring" cx={ax} cy={ay} r="8" />
      <circle className="pin" cx={ax} cy={ay} r="3" />
      <circle className="pin-ring" cx={bx} cy={by} r="8" />
      <circle className="pin" cx={bx} cy={by} r="3" />

      {labels && (
        <>
          <text className="lbl" x={ax - 4} y={ay + 22} textAnchor="middle">India</text>
          <text className="lbl" x={bx + 2} y={by + 66} textAnchor="middle">Philippines</text>
        </>
      )}

      {travellers && seen && (
        <>
          <g className="traveller go" style={{ offsetPath: `path("${ARC}")` } as any}>
            <path d="M0 -3.2 C.4 -1.1 1.1 -.4 3.2 0 C1.1 .4 .4 1.1 0 3.2 C-.4 1.1 -1.1 .4 -3.2 0 C-1.1 -.4 -.4 -1.1 0 -3.2Z" />
          </g>
          <g className="traveller go" style={{ offsetPath: `path("${ARC}")`, animationDelay: '-3s' } as any}>
            <circle r="1.5" />
          </g>
          <g className="traveller go" style={{ offsetPath: `path("${ARC}")`, animationDelay: '-6s' } as any}>
            <path d="M0 -2.4 C.3 -.8 .8 -.3 2.4 0 C.8 .3 .3 .8 0 2.4 C-.3 .8 -.8 .3 -2.4 0 C-.8 -.3 -.3 -.8 0 -2.4Z" />
          </g>
        </>
      )}
    </svg>
  );
}
