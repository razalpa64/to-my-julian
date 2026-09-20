#!/usr/bin/env python3
"""Fold the Vite build into ONE self-contained .html file.

Fonts, illustrations, CSS and JS all become data URIs, so the result opens by
double-clicking — no server, no internet, nothing to install.
"""
import base64, re, os, pathlib

BASE = pathlib.Path(__file__).resolve().parent.parent
DIST = BASE / 'dist'
PUB = BASE / 'public'
OUT = BASE / 'To-My-Julian.html'

MIME = {
    '.webp': 'image/webp', '.woff2': 'font/woff2', '.png': 'image/png',
    '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.mp3': 'audio/mpeg',
}


def datauri(path: pathlib.Path) -> str:
    b = path.read_bytes()
    m = MIME.get(path.suffix.lower(), 'application/octet-stream')
    return f"data:{m};base64,{base64.b64encode(b).decode()}"


# Map every public asset URL -> data URI
assets = {}
for p in PUB.rglob('*'):
    if p.is_file() and p.suffix.lower() in MIME:
        assets['/' + p.relative_to(PUB).as_posix()] = datauri(p)

html = (DIST / 'index.html').read_text(encoding='utf-8')

# ---- inline CSS -------------------------------------------------------
def inline_css(m):
    href = m.group(1)
    f = DIST / href.lstrip('/')
    css = f.read_text(encoding='utf-8')

    # Resolve every url(...) exactly once. Skip anything already a data URI.
    def fix(mm):
        raw = mm.group(1).strip('\'"')
        if raw.startswith('data:'):
            return mm.group(0)
        if raw in assets:
            return f'url({assets[raw]})'
        cand = DIST / raw.lstrip('/')
        if len(raw) < 300 and cand.is_file() and cand.suffix.lower() in MIME:
            return f'url({datauri(cand)})'
        return mm.group(0)

    css = re.sub(r'url\(([^)]+)\)', fix, css)
    return f'<style>{css}</style>'

html = re.sub(r'<link[^>]+rel="stylesheet"[^>]*href="([^"]+)"[^>]*>', inline_css, html)

# ---- inline JS --------------------------------------------------------
def inline_js(m):
    src = m.group(1)
    js = (DIST / src.lstrip('/')).read_text(encoding='utf-8')
    for url, uri in assets.items():
        js = js.replace('"' + url + '"', '"' + uri + '"')
        js = js.replace("'" + url + "'", "'" + uri + "'")
    js = js.replace('</script>', '<\\/script>')
    return f'<script type="module">{js}</script>'

html = re.sub(r'<script[^>]+type="module"[^>]*src="([^"]+)"[^>]*></script>', inline_js, html)

# ---- drop preload links (already inlined) & inline any stray refs ------
html = re.sub(r'<link[^>]+rel="preload"[^>]*>', '', html)
for url, uri in assets.items():
    html = html.replace('"' + url + '"', '"' + uri + '"')

OUT.write_text(html, encoding='utf-8')
mb = OUT.stat().st_size / 1_048_576
print(f'{OUT}  {mb:.1f} MB')
leftover = re.findall(r'(?:src|href)="(/[^"]+)"', html)
print('unresolved refs:', set(leftover) or 'none')
