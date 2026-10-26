"""Builds the site's photographs from the original files.

Each photo is written at full resolution (capped at 3200px wide) and as
a 1080px copy, each in AVIF, WebP and baseline JPEG, into public/images/.
Always run it on the originals, never on files it wrote, so no picture
is compressed twice. List new photos in src/data/images.js too.

    python3 scripts/build-photos.py <folder with the originals> [names...]
"""
import os
import sys

from PIL import Image

# name -> (original file, pixels to trim from each edge)
PHOTOS = {
    'hero-pos':          ('29d29810-image.png', 0),
    'hero-apps':         ('9916ef55-image.png', 0),
    'hero-notes':        ('fdd953fc-image.png', 0),
    'cpa-partners':      ('afbf9b61-image.png', 0),
    'blog-pos':          ('dfc2d8b8-image.png', 0),
    'blog-platform':     ('1e7d4def-image.png', 0),
    'blog-tap':          ('bb5d3f6b-image.png', 0),
    'blog-taxi':         ('a0c0d17e-image.png', 0),
    'blog-van':          ('cc5052d2-image.png', 0),
    'blog-call':         ('542cf487-image.png', 0),
    # Myspotlyt.
    # Crunchies, from the same painted set.
    'crunchies-team':    ('5f3e8419-image.png', 0),
    'crunchies-home':    ('23d6de34-image.png', 0),
    'talent-commute':    ('60ccd251-image.png', 0),
    'talent-listening':  ('2309b9a7-image.png', 0),
    'talent-stretch':    ('ab66ead1-image.png', 0),
    'talent-dance':      ('688387f2-image.png', 0),
    'talent-walk':       ('fc8e97f9-image.png', 0),
    'talent-blue':       ('e1326874-image.png', 0),
    'talent-hand':       ('99d345b3-image.png', 0),
    'talent-desk':       ('85dad75d-image.png', 0),
    'talent-billboard':  ('05aa6b0c-image.png', 0),
}
SIZES = (('full', 3200), ('sm', 1080))
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images')


def load(path, trim):
    im = Image.open(path)
    if im.mode == 'RGBA':
        ground = Image.new('RGB', im.size, 'white')
        ground.paste(im, mask=im.split()[3])
        im = ground
    else:
        im = im.convert('RGB')
    if trim:
        im = im.crop((trim, trim, im.width - trim, im.height - trim))
    return im


def main(src, only=()):
    for name, (file, trim) in PHOTOS.items():
        if only and name not in only:
            continue
        im = load(os.path.join(src, file), trim)
        for tag, cap in SIZES:
            # No small copy when the original is already that small.
            if tag == 'sm' and im.width <= cap:
                continue
            out = im if im.width <= cap else im.resize((cap, round(im.height * cap / im.width)), Image.LANCZOS)
            base = os.path.join(OUT, f'{name}-{tag}')
            # Baseline, not progressive: it draws at full sharpness from
            # the top rather than as a blurry first pass.
            out.save(base + '.jpg', quality=88, optimize=True, progressive=False, subsampling=0)
            out.save(base + '.webp', quality=90, method=6)
            out.save(base + '.avif', quality=80, speed=4)
            print(base, out.size)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2:])
