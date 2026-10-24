"""Renders the blog's cover images: small 3D studio scenes in the brand
blues, one per article, each a plain metaphor for the piece.

A tiny signed-distance raymarcher in numpy (no other dependencies but
Pillow): spheres, rounded boxes and tori on a seamless studio floor,
lit by one soft key light and a sky fill, with soft shadows and
ambient occlusion. Run: python3 scripts/render_blog_art.py [slug ...]
Writes public/images/blog/<slug>.jpg at 1200 x 750."""
import math, os, sys
import numpy as np
from PIL import Image, ImageFilter

W, H = 1200, 750
OUT = 'public/images/blog'

COBALT = (0x00, 0x4B, 0xFF)
ENTERPRISE = (0x00, 0x31, 0xB8)
MIDNIGHT = (0x00, 0x1A, 0x66)
LUMINOUS = (0x2A, 0x6B, 0xFF)
SKY = (0x7F, 0xA5, 0xFF)
PALE = (0xA3, 0xC0, 0xFF)
MIST = (0xC9, 0xDA, 0xFF)
TINT = (0xED, 0xF2, 0xFF)
WHITE = (0xF6, 0xF7, 0xFA)
CARBON = (0x14, 0x14, 0x14)


def c(rgb):
    return np.array(rgb, dtype=float) / 255.0


# ── Primitives: each returns distance for points p (N x 3) ──

def rot_y(p, a):
    ca, sa = math.cos(a), math.sin(a)
    x, y, z = p[:, 0], p[:, 1], p[:, 2]
    return np.stack([ca * x - sa * z, y, sa * x + ca * z], axis=1)


def rot_x(p, a):
    ca, sa = math.cos(a), math.sin(a)
    x, y, z = p[:, 0], p[:, 1], p[:, 2]
    return np.stack([x, ca * y - sa * z, sa * y + ca * z], axis=1)


def sphere(center, r):
    ce = np.array(center, float)
    return lambda p: np.linalg.norm(p - ce, axis=1) - r


def box(center, half, r=0.0, yaw=0.0, pitch=0.0):
    ce = np.array(center, float)
    hb = np.array(half, float) - r
    def f(p):
        q = p - ce
        if pitch: q = rot_x(q, -pitch)
        if yaw: q = rot_y(q, -yaw)
        q = np.abs(q) - hb
        return np.linalg.norm(np.maximum(q, 0), axis=1) + np.minimum(q.max(axis=1), 0) - r
    return f


def torus(center, R, r, pitch=0.0, yaw=0.0):
    ce = np.array(center, float)
    def f(p):
        q = p - ce
        if yaw: q = rot_y(q, -yaw)
        if pitch: q = rot_x(q, -pitch)
        xz = np.sqrt(q[:, 0] ** 2 + q[:, 2] ** 2) - R
        return np.sqrt(xz ** 2 + q[:, 1] ** 2) - r
    return f


def cylinder(center, r, h, rr=0.05):
    ce = np.array(center, float)
    def f(p):
        q = p - ce
        d = np.stack([np.sqrt(q[:, 0] ** 2 + q[:, 2] ** 2) - r + rr, np.abs(q[:, 1]) - h + rr], axis=1)
        return np.minimum(d.max(axis=1), 0) + np.linalg.norm(np.maximum(d, 0), axis=1) - rr
    return f


# ── Renderer ──

class Scene:
    def __init__(self, ground, sky_top, sky_bottom, floor_y=0.0, gloss=0.6):
        self.objs = []     # (sdf, colour, gloss)
        self.ground = c(ground)
        self.sky_top, self.sky_bottom = c(sky_top), c(sky_bottom)
        self.floor_y = floor_y
        self.gloss = gloss

    def add(self, sdf, colour, gloss=None):
        self.objs.append((sdf, c(colour), self.gloss if gloss is None else gloss))
        return self

    def dist(self, p, with_id=False):
        ds = [np.asarray(p[:, 1] - self.floor_y)] + [o[0](p) for o in self.objs]
        ds = np.stack(ds, axis=1)
        if with_id:
            return ds.min(axis=1), ds.argmin(axis=1)
        return ds.min(axis=1)


def normal(scene, p, e=1e-3):
    k = np.array([[1, -1, -1], [-1, -1, 1], [-1, 1, -1], [1, 1, 1]], float)
    n = sum(k[i] * scene.dist(p + k[i] * e)[:, None] for i in range(4))
    return n / np.linalg.norm(n, axis=1, keepdims=True)


def soft_shadow(scene, p, ldir, k=10.0):
    res = np.ones(len(p))
    t = np.full(len(p), 0.02)
    for _ in range(48):
        d = scene.dist(p + ldir * t[:, None])
        res = np.minimum(res, np.clip(k * d / t, 0, 1))
        t += np.clip(d, 0.02, 0.4)
    return np.clip(res, 0, 1) ** 1.2


def occlusion(scene, p, n):
    occ = np.zeros(len(p))
    for i in range(1, 6):
        h = 0.06 * i
        occ += (h - scene.dist(p + n * h)) / (2 ** i)
    return np.clip(1 - 2.2 * occ, 0, 1)


def render(scene, eye, target, fov=32.0, light=(-0.55, 0.85, 0.45), w=W, h=H):
    eye, target = np.array(eye, float), np.array(target, float)
    fwd = target - eye; fwd /= np.linalg.norm(fwd)
    right = np.cross(fwd, [0, 1, 0]); right /= np.linalg.norm(right)
    up = np.cross(right, fwd)
    tan = math.tan(math.radians(fov) / 2)
    ys, xs = np.mgrid[0:h, 0:w]
    u = (2 * (xs + 0.5) / w - 1) * tan * w / h
    v = (1 - 2 * (ys + 0.5) / h) * tan
    rd = fwd[None] + u.reshape(-1, 1) * right[None] + v.reshape(-1, 1) * up[None]
    rd /= np.linalg.norm(rd, axis=1, keepdims=True)
    ro = np.broadcast_to(eye, rd.shape)

    t = np.zeros(len(rd)); hit = np.zeros(len(rd), bool); alive = np.ones(len(rd), bool)
    for _ in range(140):
        idx = np.nonzero(alive)[0]
        if not len(idx): break
        d = scene.dist(ro[idx] + rd[idx] * t[idx, None])
        t[idx] += d
        done = d < 1e-3 * (1 + t[idx])
        hit[idx[done]] = True
        far = t[idx] > 60
        alive[idx[done | far]] = False

    sky_t = np.clip(v.reshape(-1) / tan * 0.5 + 0.5, 0, 1)[:, None]
    col = scene.sky_bottom * (1 - sky_t) + scene.sky_top * sky_t

    idx = np.nonzero(hit)[0]
    p = ro[idx] + rd[idx] * t[idx, None]
    _, oid = scene.dist(p, with_id=True)
    n = normal(scene, p)
    ldir = np.array(light, float); ldir /= np.linalg.norm(ldir)
    pe = p + n * 2e-3
    sh = soft_shadow(scene, pe, ldir)
    ao = occlusion(scene, p, n)

    base = np.empty((len(idx), 3)); gloss = np.empty(len(idx))
    floor = oid == 0
    base[floor] = scene.ground; gloss[floor] = 0.0
    for i, (_, colour, g) in enumerate(scene.objs, start=1):
        m = oid == i
        base[m] = colour; gloss[m] = g

    diff = np.clip((n * ldir).sum(1), 0, 1) * sh
    sky = 0.5 + 0.5 * n[:, 1]
    hv = ldir - rd[idx]; hv /= np.linalg.norm(hv, axis=1, keepdims=True)
    spec = np.clip((n * hv).sum(1), 0, 1) ** 60 * sh * gloss * 1.4
    fres = (1 - np.clip(-(n * rd[idx]).sum(1), 0, 1)) ** 4 * gloss
    lit = base * (0.78 * diff[:, None] + 0.42 * sky[:, None] * ao[:, None]) \
        + spec[:, None] + fres[:, None] * scene.sky_top * 0.6

    # The floor fades into the backdrop with distance, like a studio sweep.
    fog = np.clip((t[idx] - 6) / 22, 0, 1)[:, None]
    lit = lit * (1 - fog) + col[idx] * fog
    col[idx] = lit

    img = np.clip(col.reshape(h, w, 3), 0, 1) ** (1 / 1.1)
    img = Image.fromarray((img * 255).astype(np.uint8))
    return img


def finish(img, grain=5):
    """A touch of grain and a softened edge, so the renders sit like
    photographs rather than diagrams."""
    a = np.asarray(img).astype(float)
    rng = np.random.default_rng(7)
    a += rng.normal(0, grain, a.shape)
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


# ── Scenes: one plain metaphor per article ──

LIGHT_STUDIO = dict(ground=TINT, sky_top=MIST, sky_bottom=TINT)
BLUE_STUDIO = dict(ground=ENTERPRISE, sky_top=MIDNIGHT, sky_bottom=ENTERPRISE)
DARK_STUDIO = dict(ground=(0x1C, 0x1C, 0x1E), sky_top=CARBON, sky_bottom=(0x22, 0x22, 0x26))
CAM = dict(eye=(6.5, 4.6, 8.5), target=(0, 0.9, 0))


def tech_works():
    # A clean stack of blocks, one of them set a quarter-turn off true.
    s = Scene(**LIGHT_STUDIO)
    for i, (x, z) in enumerate([(-1.1, 0), (0, 0), (1.1, 0), (-0.55, 0), (0.55, 0)]):
        y = 0.5 if i < 3 else 1.5
        s.add(box((x, y, z), (0.5, 0.5, 0.5), 0.06), WHITE, 0.4)
    s.add(box((0, 2.52, 0.15), (0.5, 0.5, 0.5), 0.06, yaw=0.5), COBALT, 0.8)
    return s, dict(eye=(6, 4.4, 8), target=(0, 1.3, 0))


def another_app():
    # A tall stack of glossy app tiles, and the one that matters.
    s = Scene(**BLUE_STUDIO)
    for i in range(7):
        s.add(box((0.25 * math.sin(i * 1.3), 0.14 + i * 0.3, 0.2 * math.cos(i)), (1.0, 0.1, 0.62), 0.09, yaw=0.18 * i), SKY if i % 2 else PALE, 0.7)
    s.add(box((0.0, 2.6, 0.0), (1.0, 0.1, 0.62), 0.09, yaw=-0.3), WHITE, 0.9)
    return s, dict(eye=(6.5, 5.2, 7.5), target=(0, 1.3, 0))


def people_know():
    # A field of white spheres with one cobalt among them.
    s = Scene(**LIGHT_STUDIO)
    rng = np.random.default_rng(3)
    for i in range(-3, 4):
        for j in range(-2, 3):
            r = 0.36
            x, z = i * 0.86 + rng.uniform(-0.1, 0.1), j * 0.86 + rng.uniform(-0.1, 0.1)
            s.add(sphere((x, r, z), r), COBALT if (i, j) == (1, 0) else WHITE, 0.85 if (i, j) == (1, 0) else 0.35)
    return s, dict(eye=(5, 5.5, 7), target=(0.2, 0, 0))


def growth_hides():
    # A rising column of blocks with one missing from deep inside.
    s = Scene(**DARK_STUDIO)
    for k in range(6):
        for i in range(2):
            for j in range(2):
                if (k, i, j) == (2, 1, 1):
                    continue
                s.add(box((i * 0.62 - 0.31, 0.3 + k * 0.62, j * 0.62 - 0.31), (0.3, 0.3, 0.3), 0.04),
                      COBALT if k > 3 else LUMINOUS if k > 1 else ENTERPRISE, 0.6)
    return s, dict(eye=(5.5, 3.6, 6.5), target=(0, 1.8, 0))


def build_buy_integrate():
    # Three ways in: a block, a sphere, a ring.
    s = Scene(**LIGHT_STUDIO)
    s.add(box((-1.9, 0.7, 0.2), (0.7, 0.7, 0.7), 0.08, yaw=0.4), COBALT, 0.7)
    s.add(sphere((0.1, 0.75, -0.3), 0.75), WHITE, 0.6)
    s.add(torus((2.0, 0.78, 0.3), 0.6, 0.18, pitch=math.pi / 2, yaw=-0.5), ENTERPRISE, 0.8)
    return s, dict(eye=(0.5, 3.2, 9), target=(0, 0.6, 0))


def everyone_asks():
    # Many small spheres queued at one narrow ring.
    s = Scene(**BLUE_STUDIO)
    s.add(torus((0, 0.9, 0), 0.62, 0.14, pitch=math.pi / 2, yaw=-0.6), WHITE, 0.9)
    rng = np.random.default_rng(5)
    for i in range(16):
        r = 0.22
        x = -1.0 - i * 0.32 + rng.uniform(-0.1, 0.1)
        z = 0.6 + i * 0.22 + rng.uniform(-0.25, 0.25)
        s.add(sphere((x * 0.82, r, z * 0.82), r), PALE if i % 3 else SKY, 0.6)
    return s, dict(eye=(4.5, 3.4, 8.5), target=(-1.2, 0.6, 0.8))


def communication():
    # Two towers that never meet, with a bridge of blocks left unfinished.
    s = Scene(**LIGHT_STUDIO)
    s.add(box((-1.8, 1.2, 0), (0.45, 1.2, 0.45), 0.06), ENTERPRISE, 0.5)
    s.add(box((1.8, 1.2, 0), (0.45, 1.2, 0.45), 0.06), ENTERPRISE, 0.5)
    for i in range(3):
        s.add(box((-1.1 + i * 0.42, 2.2, 0), (0.19, 0.19, 0.3), 0.03), COBALT, 0.7)
    for i in range(2):
        s.add(box((1.1 - i * 0.42, 2.2, 0), (0.19, 0.19, 0.3), 0.03), COBALT, 0.7)
    return s, dict(eye=(1.2, 3.4, 8.5), target=(0, 1.3, 0))


def outgrows():
    # A sphere that has grown too big for the box built around it.
    s = Scene(**DARK_STUDIO)
    frame = box((0, 0.8, 0), (0.8, 0.8, 0.8), 0.04)
    hole = box((0, 0.8, 0), (0.66, 0.66, 1.2), 0.0)
    hole2 = box((0, 0.8, 0), (1.2, 0.66, 0.66), 0.0)
    hole3 = box((0, 0.8, 0), (0.66, 1.2, 0.66), 0.0)
    s.add(lambda p: np.maximum(np.maximum(np.maximum(frame(p), -hole(p)), -hole2(p)), -hole3(p)), WHITE, 0.5)
    s.add(sphere((0, 0.95, 0), 0.95), COBALT, 0.9)
    return s, dict(eye=(4.6, 3.0, 6.2), target=(0, 0.9, 0))


def versions_of_truth():
    # The same block, turned a different way in every department.
    s = Scene(**LIGHT_STUDIO)
    tones = [ENTERPRISE, COBALT, LUMINOUS, SKY, PALE]
    for i, tone in enumerate(tones):
        x = (i - 2) * 1.45
        s.add(box((x, 0.62, 0.15 * (i % 2)), (0.5, 0.5, 0.5), 0.07, yaw=0.32 * i, pitch=0.18 * (i - 2)), tone, 0.65)
    return s, dict(eye=(0.8, 3.6, 9.5), target=(0, 0.5, 0))


def never_notices():
    # A calm, smooth surface on top; the working parts out of sight below it.
    s = Scene(ground=TINT, sky_top=MIST, sky_bottom=TINT, floor_y=-3)
    s.add(box((0, 1.6, 0), (2.1, 0.12, 1.3), 0.12), WHITE, 0.8)
    rng = np.random.default_rng(11)
    for i in range(-3, 4):
        for j in range(-2, 2):
            hgt = rng.uniform(0.2, 0.75)
            s.add(box((i * 0.55, 1.3 - hgt, j * 0.55 + 0.27), (0.22, hgt, 0.22), 0.03),
                  COBALT if (i + j) % 3 == 0 else ENTERPRISE, 0.5)
    return s, dict(eye=(5.5, 1.9, 7), target=(0, 1.0, 0))


SCENES = {
    'why-technology-projects-fail-even-when-the-technology-works': tech_works,
    'the-business-doesnt-need-another-app': another_app,
    'the-people-who-know-where-the-problem-is': people_know,
    'growth-can-hide-a-problem-until-it-becomes-too-expensive-to-ignore': growth_hides,
    'build-buy-or-integrate-the-technology-decision-businesses-often-get-wrong': build_buy_integrate,
    'the-most-expensive-person-in-the-company-may-be-the-person-everyone-has-to-ask': everyone_asks,
    'your-business-may-not-have-a-communication-problem': communication,
    'the-day-your-business-outgrows-its-first-system': outgrows,
    'what-happens-when-every-department-has-its-own-version-of-the-truth': versions_of_truth,
    'the-best-technology-project-may-be-the-one-the-customer-never-notices': never_notices,
}


def main(slugs, scale=1.0):
    os.makedirs(OUT, exist_ok=True)
    for slug in slugs or SCENES:
        scene, cam = SCENES[slug]()
        img = render(scene, cam['eye'], cam['target'], w=int(W * scale), h=int(H * scale))
        img = finish(img)
        path = f'{OUT}/{slug}.jpg'
        img.save(path, quality=84, optimize=True, progressive=True)
        print(path, os.path.getsize(path) // 1024, 'KB')


if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    scale = 0.3 if '--draft' in sys.argv else 1.0
    main(args, scale)
