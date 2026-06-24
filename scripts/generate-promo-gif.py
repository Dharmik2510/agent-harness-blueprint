#!/usr/bin/env python3
"""Generate docs/public/promo.gif for README and docs homepage."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "public" / "promo.gif"

W, H = 960, 540
FPS = 10
DURATION_SEC = 5.0

BG = (7, 11, 20)
CYAN = (34, 211, 238)
INDIGO = (129, 140, 248)
ORANGE = (249, 115, 22)
TEXT = (241, 245, 249)
MUTED = (148, 163, 184)


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/SFNSDisplay-Bold.otf" if bold else "/System/Library/Fonts/SFNSDisplay-Regular.otf",
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def lerp(a: float, b: float, t: float) -> float:
    return a + (b - a) * t


def lerp_color(c1: tuple[int, int, int], c2: tuple[int, int, int], t: float) -> tuple[int, int, int]:
    return (
        int(lerp(c1[0], c2[0], t)),
        int(lerp(c1[1], c2[1], t)),
        int(lerp(c1[2], c2[2], t)),
    )


def draw_bg(draw: ImageDraw.ImageDraw, t: float) -> None:
    for y in range(H):
        ratio = y / H
        pulse = 0.08 * math.sin(t * math.pi * 2)
        color = lerp_color((7, 11, 20), (17, 24, 39), ratio + pulse)
        draw.line([(0, y), (W, y)], fill=color)


def draw_glow_orb(base: Image.Image, cx: int, cy: int, radius: int, color: tuple[int, int, int], alpha: int) -> None:
    orb = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(orb)
    for r in range(radius, 0, -4):
        a = int(alpha * (r / radius) ** 2)
        od.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(*color, a))
    base.alpha_composite(orb)


def text_center_y(lines: list[str], font_title: ImageFont.ImageFont, font_sub: ImageFont.ImageFont, gap: int = 16) -> int:
    total = 0
    for i, line in enumerate(lines):
        total += font_title.size if i == 0 else font_sub.size
        if i < len(lines) - 1:
            total += gap
    return (H - total) // 2


def frame_intro(progress: float) -> Image.Image:
    img = Image.new("RGBA", (W, H))
    draw = ImageDraw.Draw(img)
    draw_bg(draw, progress * 0.5)
    draw_glow_orb(img, 180, 140, 120, CYAN, 55)
    draw_glow_orb(img, 780, 400, 140, INDIGO, 45)

    title_font = load_font(52, bold=True)
    sub_font = load_font(28)
    small_font = load_font(20)

    alpha = min(1.0, progress * 1.8)
    title = "Agent Harness Blueprint"
    subtitle = "Turn Copilot into a reliable teammate"

    ty = text_center_y([title, subtitle], title_font, sub_font, 20)
    draw.text((W // 2, ty), title, font=title_font, fill=(*CYAN, int(255 * alpha)), anchor="ma")
    draw.text((W // 2, ty + 70), subtitle, font=sub_font, fill=(*TEXT, int(255 * alpha)), anchor="ma")

    badge = "VS Code Copilot  ·  Labs  ·  Templates"
    draw.rounded_rectangle((W // 2 - 220, H - 88, W // 2 + 220, H - 48), radius=20, fill=(34, 211, 238, int(30 * alpha)), outline=(*CYAN, int(80 * alpha)))
    draw.text((W // 2, H - 68), badge, font=small_font, fill=(*MUTED, int(255 * alpha)), anchor="mm")
    return img


def frame_loop(progress: float) -> Image.Image:
    img = Image.new("RGBA", (W, H))
    draw = ImageDraw.Draw(img)
    draw_bg(draw, 0.3)
    draw_glow_orb(img, W // 2, H // 2, 200, INDIGO, 35)

    title_font = load_font(40, bold=True)
    step_font = load_font(22, bold=True)
    draw.text((W // 2, 56), "The Reliability Loop", font=title_font, fill=CYAN, anchor="ma")

    steps = ["Bootstrap", "Scope", "Build", "Verify", "Handoff"]
    xs = [120, 270, 420, 570, 720]
    y = 220

    for i, (x, label) in enumerate(zip(xs, steps)):
        active = progress >= i / len(steps)
        scale = 1.0 if active else 0.85
        r = int(34 * scale)
        color = CYAN if active else MUTED
        draw.ellipse((x - r, y - r, x + r, y + r), fill=(*color, 40 if active else 20), outline=color, width=3)
        draw.text((x, y), str(i + 1), font=step_font, fill=TEXT if active else MUTED, anchor="mm")
        draw.text((x, y + 52), label, font=load_font(18), fill=TEXT if active else MUTED, anchor="ma")
        if i < len(steps) - 1:
            line_alpha = 255 if progress > (i + 0.5) / len(steps) else 80
            draw.line([(x + r + 8, y), (xs[i + 1] - r - 8, y)], fill=(*INDIGO, line_alpha), width=4)

    draw.text((W // 2, 400), "Same rhythm every Copilot session", font=load_font(24), fill=TEXT, anchor="ma")
    draw.text((W // 2, 440), "init.sh  →  one feature  →  tests pass  →  PROGRESS.md", font=load_font(18), fill=MUTED, anchor="ma")
    return img


def frame_pillars(progress: float) -> Image.Image:
    img = Image.new("RGBA", (W, H))
    draw = ImageDraw.Draw(img)
    draw_bg(draw, 0.6)
    draw_glow_orb(img, 120, 420, 100, ORANGE, 40)
    draw_glow_orb(img, 840, 120, 110, CYAN, 40)

    title_font = load_font(38, bold=True)
    draw.text((W // 2, 50), "Five pillars. Zero guesswork.", font=title_font, fill=TEXT, anchor="ma")

    pillars = [
        ("Instructions", "AGENTS.md"),
        ("State", "PROGRESS.md"),
        ("Verify", "npm test"),
        ("Scope", "feature_list"),
        ("Lifecycle", "init.sh"),
    ]
    card_w, card_h = 160, 120
    gap = 18
    total_w = len(pillars) * card_w + (len(pillars) - 1) * gap
    start_x = (W - total_w) // 2
    y = 170

    for i, (name, file) in enumerate(pillars):
        reveal = min(1.0, max(0.0, progress * len(pillars) - i))
        if reveal <= 0:
            continue
        x = start_x + i * (card_w + gap)
        offset_y = int((1 - reveal) * 30)
        fill = lerp_color((17, 24, 39), (30, 41, 59), reveal)
        draw.rounded_rectangle(
            (x, y + offset_y, x + card_w, y + card_h + offset_y),
            radius=14,
            fill=fill,
            outline=lerp_color((40, 50, 70), CYAN, reveal),
            width=2,
        )
        draw.text((x + card_w // 2, y + 42 + offset_y), name, font=load_font(20, bold=True), fill=TEXT, anchor="ma")
        draw.text((x + card_w // 2, y + 78 + offset_y), file, font=load_font(16), fill=MUTED, anchor="ma")

    draw.text((W // 2, 430), "Copy templates → validate → ship", font=load_font(26), fill=ORANGE, anchor="ma")
    return img


def frame_cta(progress: float) -> Image.Image:
    img = Image.new("RGBA", (W, H))
    draw = ImageDraw.Draw(img)
    draw_bg(draw, 0.2)
    draw_glow_orb(img, W // 2, H // 2, 180, CYAN, 50)

    title_font = load_font(44, bold=True)
    sub_font = load_font(24)
    url_font = load_font(20, bold=True)

    pulse = 0.5 + 0.5 * math.sin(progress * math.pi * 2)
    draw.text((W // 2, 180), "Start in 15 minutes", font=title_font, fill=TEXT, anchor="ma")
    draw.text((W // 2, 250), "Quick start  ·  Lab 01  ·  Template packs", font=sub_font, fill=MUTED, anchor="ma")

    bx1, by1, bx2, by2 = W // 2 - 280, 310, W // 2 + 280, 390
    draw.rounded_rectangle((bx1, by1, bx2, by2), radius=18, fill=lerp_color((34, 211, 238), (6, 182, 212), pulse), outline=CYAN, width=2)
    draw.text((W // 2, 350), "dharmik2510.github.io/agent-harness-blueprint", font=url_font, fill=BG, anchor="mm")

    draw.text((W // 2, 460), "Make Copilot finish the job — with proof.", font=load_font(22), fill=INDIGO, anchor="ma")
    return img


def build_frames() -> list[Image.Image]:
    total_frames = int(DURATION_SEC * FPS)
    segment = total_frames // 4
    frames: list[Image.Image] = []

    for i in range(total_frames):
        seg_i = i // segment
        seg_t = (i % segment) / max(segment - 1, 1)

        if seg_i == 0:
            frame = frame_intro(seg_t)
        elif seg_i == 1:
            frame = frame_loop(seg_t)
        elif seg_i == 2:
            frame = frame_pillars(seg_t)
        else:
            frame = frame_cta(seg_t)

        frames.append(frame.convert("P", palette=Image.ADAPTIVE, colors=128))

    return frames


def main() -> None:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    frames = build_frames()
    duration_ms = int(1000 / FPS)
    frames[0].save(
        OUT,
        save_all=True,
        append_images=frames[1:],
        duration=duration_ms,
        loop=0,
        optimize=True,
        disposal=2,
    )
    print(f"Wrote {OUT} ({len(frames)} frames, {W}x{H})")


if __name__ == "__main__":
    main()
