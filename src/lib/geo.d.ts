declare module '*/geo.json' {
  const v: {
    india: string;
    ph: Record<string, string>;
    t: { india: string; ph: string };
    pins: { india: [number, number]; ph: [number, number] };
  };
  export default v;
}
