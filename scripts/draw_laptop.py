"""A laptop showing a dashboard, drawn in three-quarter perspective on the
pixel grid, in the same four tones as the other illustrations.

The laptop is modelled as a few flat faces in 3D, projected with a
simple perspective camera. Each face is a quad on screen; a homography
maps every grid cell back to the face's own (u, v), which is where the
face's detail (keys, bars, tiles) is drawn, so it foreshortens with the
face. build-pixel-art.py includes it; run this file alone to preview."""
import math
import numpy as np

COLS, ROWS = 73, 72


def rot(p, yaw, pitch):
    x, y, z = p
    cy, sy = math.cos(yaw), math.sin(yaw)
    x, z = x * cy + z * sy, -x * sy + z * cy
    cp, sp = math.cos(pitch), math.sin(pitch)
    y, z = y * cp - z * sp, y * sp + z * cp
    return x, y, z


def project(p, dist=160.0, f=160.0):
    x, y, z = p
    s = f / (dist - z)
    return x * s, -y * s


def homography(dst):
    """Maps the unit square (0,0) (1,0) (1,1) (0,1) onto the quad dst."""
    src = [(0, 0), (1, 0), (1, 1), (0, 1)]
    a = []
    for (u, v), (x, y) in zip(src, dst):
        a.append([u, v, 1, 0, 0, 0, -u * x, -v * x, -x])
        a.append([0, 0, 0, u, v, 1, -u * y, -v * y, -y])
    a = np.array(a, dtype=float)
    _, _, vt = np.linalg.svd(a)
    return vt[-1].reshape(3, 3)


# ── Face detail, in each face's own u (left→right) and v (top→bottom) ──

def screen(u, v):
    if u < 0.04 or u > 0.96 or v < 0.06 or v > 0.94:
        return 'S'
    # top bar
    if v < 0.17:
        return 'M'
    # sidebar
    if u < 0.19:
        return 'M'
    # three KPI tiles
    if 0.24 < v < 0.4:
        for l in (0.27, 0.51, 0.75):
            if l < u < l + 0.18:
                return 'B'
        return 'L'
    # bar chart rising to the right
    if 0.47 < v < 0.88 and 0.27 < u < 0.93:
        heights = [0.3, 0.45, 0.4, 0.62, 0.55, 0.8, 1.0]
        w = (0.93 - 0.27) / len(heights)
        i = int((u - 0.27) / w)
        if i < len(heights) and (u - 0.27) - i * w < w * 0.62:
            if v > 0.88 - heights[i] * 0.41:
                return 'B'
    return 'L'


def screen_edge(u, v):
    return 'B'


def base_top(u, v):
    # v runs from the hinge (0) to the front lip (1): keyboard, then pad.
    if 0.08 < u < 0.92 and 0.1 < v < 0.55:
        return 'M'
    if 0.36 < u < 0.64 and 0.63 < v < 0.9:
        return 'M'
    return 'L'


def solid(t):
    return lambda u, v: t


def draw(yaw=math.radians(-22), pitch=math.radians(26), tilt=math.radians(14)):
    W, D, T = 30.0, 17.0, 1.4       # base width, depth, thickness
    H, ST = 20.0, 0.8               # screen height, thickness
    hz = -D / 2                     # hinge line, at the back of the base
    # Screen leans back by `tilt` from upright, hinged at the base's back edge.
    def sp(x, h, depth=0.0):
        return (x, T + h * math.cos(tilt), hz - h * math.sin(tilt) - depth)
    faces = []
    # Screen: right edge, top edge, then the front face.
    faces.append(([sp(W / 2, H), sp(W / 2, H, ST), sp(W / 2, 0, ST), sp(W / 2, 0)], screen_edge))
    faces.append(([sp(-W / 2, H, ST), sp(W / 2, H, ST), sp(W / 2, H), sp(-W / 2, H)], screen_edge))
    faces.append(([sp(-W / 2, H), sp(W / 2, H), sp(W / 2, 0), sp(-W / 2, 0)], screen))
    # Base: front side, right side, then the top.
    faces.append(([(-W / 2, T, D / 2), (W / 2, T, D / 2), (W / 2, 0, D / 2), (-W / 2, 0, D / 2)], solid('B')))
    faces.append(([(W / 2, T, D / 2), (W / 2, T, -D / 2), (W / 2, 0, -D / 2), (W / 2, 0, D / 2)], solid('S')))
    faces.append(([(-W / 2, T, -D / 2), (W / 2, T, -D / 2), (W / 2, T, D / 2), (-W / 2, T, D / 2)], base_top))

    quads = [([project(rot(p, yaw, pitch)) for p in pts], fn) for pts, fn in faces]
    xs = [x for q, _ in quads for x, _ in q]
    ys = [y for q, _ in quads for _, y in q]
    pad = 3
    scale = min((COLS - 2 * pad) / (max(xs) - min(xs)), (ROWS - 2 * pad) / (max(ys) - min(ys)))
    ox = (COLS - (max(xs) - min(xs)) * scale) / 2 - min(xs) * scale
    oy = (ROWS - (max(ys) - min(ys)) * scale) / 2 - min(ys) * scale

    grid = [['.'] * COLS for _ in range(ROWS)]
    for quad, fn in quads:
        pts = [(x * scale + ox, y * scale + oy) for x, y in quad]
        hinv = np.linalg.inv(homography(pts))
        for r in range(ROWS):
            for c in range(COLS):
                u, v, w = hinv @ np.array([c + 0.5, r + 0.5, 1.0])
                u, v = u / w, v / w
                if 0 <= u <= 1 and 0 <= v <= 1:
                    grid[r][c] = fn(u, v)
    return grid


def cells(grid):
    return ' '.join(f'{r+1},{c+1},{t}' for r, row in enumerate(grid) for c, t in enumerate(row) if t != '.')


if __name__ == '__main__':
    print('\n'.join(''.join(row) for row in draw()))
