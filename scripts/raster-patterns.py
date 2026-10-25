"""Rasterise the brand-kit pattern SVGs to lossless WebP at 2x.

The patterns are flat rectangles on whole-pixel coordinates, so drawing
them directly gives the exact same image as the SVG, with every colour
preserved, at a fraction of the decode cost. Run after changing any
public/images/pattern-*.svg:

    python3 scripts/raster-patterns.py
"""
import re
from pathlib import Path
from PIL import Image, ImageDraw

SCALE = 2
ROOT = Path(__file__).resolve().parent.parent / 'public' / 'images'

for svg in sorted(ROOT.glob('pattern-*.svg')):
    text = svg.read_text()
    w, h = (int(v) for v in re.search(r'viewBox="0 0 (\d+) (\d+)"', text).groups())
    img = Image.new('RGBA', (w * SCALE, h * SCALE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    for fill, body in re.findall(r'<g[^>]*fill="(#[0-9A-Fa-f]{6})"[^>]*>(.*?)</g>', text, re.S):
        for x, y, rw, rh in re.findall(r'<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"', body):
            x, y, rw, rh = (float(v) * SCALE for v in (x, y, rw, rh))
            draw.rectangle([x, y, x + rw - 1, y + rh - 1], fill=fill)
    out = svg.with_suffix('.webp')
    img.save(out, lossless=True, quality=100, method=6)
    print(out.name, img.size, out.stat().st_size, 'bytes')
