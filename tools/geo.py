"""Project simplified real coastlines into a shared SVG viewBox."""
import math, json

INDIA = [(68.2,23.9),(70.0,22.8),(72.6,21.5),(72.8,19.1),(73.8,15.4),(74.8,12.9),
         (76.3,9.5),(77.5,8.1),(79.8,10.3),(80.3,13.1),(82.3,16.9),(85.8,19.9),
         (87.0,21.6),(88.9,21.7),(89.0,25.3),(88.1,26.5),(90.0,26.8),(92.0,26.9),
         (95.3,27.0),(97.3,28.2),(96.0,29.2),(92.5,27.9),(88.9,27.3),(85.0,27.5),
         (81.0,30.3),(78.8,31.5),(77.0,32.7),(76.0,34.5),(74.5,34.7),(73.9,33.2),
         (74.6,32.5),(73.9,31.0),(71.9,27.8),(70.0,24.3)]

PH = {
 'luzon':[(120.5,18.5),(121.3,18.6),(122.1,18.3),(122.3,17.4),(121.6,16.4),(122.3,15.9),
          (122.6,15.2),(122.0,14.6),(121.6,14.0),(122.5,14.2),(123.4,13.8),(124.0,13.6),
          (124.2,13.0),(123.6,12.9),(123.0,13.4),(122.4,13.9),(121.5,13.9),(120.9,14.0),
          (120.6,14.8),(120.0,15.5),(119.8,16.3),(120.3,16.6),(119.9,17.5),(120.3,18.2)],
 'mindoro':[(120.5,13.5),(121.2,13.5),(121.4,12.9),(121.0,12.2),(120.6,12.5),(120.4,13.0)],
 'palawan':[(119.3,11.3),(119.8,11.0),(118.8,10.0),(117.9,9.0),(117.3,8.4),(117.0,8.6),
            (118.0,9.5),(118.9,10.4),(119.0,11.3)],
 'panay':[(121.9,11.8),(122.6,11.6),(123.1,11.0),(122.6,10.4),(121.9,10.5),(121.9,11.1)],
 'negros':[(122.9,10.9),(123.3,10.9),(123.4,10.0),(123.1,9.4),(122.6,9.7),(122.5,10.4)],
 'cebu':[(123.9,11.3),(124.1,10.8),(123.9,10.0),(123.4,9.5),(123.3,10.2),(123.6,10.9)],
 'samar':[(124.3,12.5),(125.1,12.5),(125.6,11.9),(125.3,11.2),(124.6,11.5),(124.3,12.0)],
 'leyte':[(124.4,11.4),(125.0,11.3),(125.2,10.7),(124.8,10.0),(124.5,10.5),(124.3,11.0)],
 'bohol':[(123.8,10.2),(124.5,10.2),(124.6,9.6),(123.8,9.6)],
 'mindanao':[(121.9,7.3),(122.5,7.8),(123.0,7.8),(123.5,8.2),(124.2,8.6),(125.0,9.0),
             (125.6,9.8),(126.0,9.2),(126.3,8.5),(126.5,7.5),(126.2,6.9),(126.1,6.0),
             (125.7,6.1),(125.4,5.6),(125.2,6.1),(124.6,6.9),(124.2,6.2),(123.4,6.6),
             (122.8,6.5),(122.1,6.9)],
}

def norm(pts, scale, ox, oy, lat0, lng0):
    k = math.cos(math.radians(lat0))
    return [((lng - lng0) * k * scale + ox, (lat0 - lat) * scale + oy) for lng, lat in pts]

def smooth(pts, close=True, t=0.22):
    """Catmull-Rom -> cubic bezier, so coastlines read as drawn, not polygonal."""
    n = len(pts)
    d = [f"M{pts[0][0]:.1f} {pts[0][1]:.1f}"]
    rng = range(n) if close else range(n - 1)
    for i in rng:
        p0 = pts[(i - 1) % n]; p1 = pts[i]; p2 = pts[(i + 1) % n]; p3 = pts[(i + 2) % n]
        c1 = (p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t)
        c2 = (p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t)
        d.append(f"C{c1[0]:.1f} {c1[1]:.1f} {c2[0]:.1f} {c2[1]:.1f} {p2[0]:.1f} {p2[1]:.1f}")
    if close: d.append("Z")
    return "".join(d)

out = {}
# India: 8..37N, 68..97E  -> target ~ 92 wide
S_IN = 4.2
out['india'] = smooth(norm(INDIA, S_IN, 0, 0, 37.0, 68.0))
# Philippines: 5..19N, 117..127E -> keep same visual density, slightly larger scale
S_PH = 5.8
out['ph'] = {k: smooth(norm(v, S_PH, 0, 0, 19.0, 117.0)) for k, v in PH.items()}

# bounds report
def bounds(pts, s, lat0, lng0):
    p = norm(pts, s, 0, 0, lat0, lng0)
    xs=[a for a,_ in p]; ys=[b for _,b in p]
    return round(min(xs)),round(max(xs)),round(min(ys)),round(max(ys))
print('india bounds', bounds(INDIA,S_IN,37.0,68.0))
allph=[p for v in PH.values() for p in v]
print('ph bounds', bounds(allph,S_PH,19.0,117.0))
import math as _m
def pin(lng,lat,s,lat0,lng0,ox,oy):
    k=_m.cos(_m.radians(lat0))
    return [round((lng-lng0)*k*s+ox,1), round((lat0-lat)*s+oy,1)]
IN_OX,IN_OY = 18,34
PH_OX,PH_OY = 296,56
out['t'] = {'india': f'translate({IN_OX},{IN_OY})', 'ph': f'translate({PH_OX},{PH_OY})'}
out['pins'] = {
  'india': pin(76.3, 9.9, S_IN, 37.0, 68.0, IN_OX, IN_OY),
  'ph':    pin(121.0, 14.6, S_PH, 19.0, 117.0, PH_OX, PH_OY),
}
print('pins', out['pins'])
print('india box', IN_OX, IN_OY, '->', IN_OX+bounds(INDIA,S_IN,37,68)[1], IN_OY+bounds(INDIA,S_IN,37,68)[3])
print('ph box', PH_OX, PH_OY, '->', PH_OX+bounds(allph,S_PH,19,117)[1], PH_OY+bounds(allph,S_PH,19,117)[3])
open('/home/user/site/src/lib/geo.json','w').write(json.dumps(out, indent=0))
print('written')
