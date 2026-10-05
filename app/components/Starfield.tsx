"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas starfield: bintang-bedibergerak pelan ke atas seperti arus/breeze,
 * dibungkus seamless di tepi atas/bawah, ditambah twinkling dan bintang jatuh
 * (meteor). Render statis saat prefers-reduced-motion aktif.
 *
 * Performa: tiap bintang di-cache sebagai sprite kecil sekali di awal, lalu
 * hanya di-blit per frame dengan drawImage — jauh lebih murah daripada
 * arc()+fill() untuk tiap bintang tiap frame. Jumlah bintang dan device pixel
 * ratio diturunkan di layar kecil.
 */

interface Star {
  x: number;
  y: number;
  /** Kecepatan arus ke atas, px per detik. */
  speed: number;
  drift: number;
  baseAlpha: number;
  alpha: number;
  /** Kecepatan kedip, radian per detik. */
  twinkleSpeed: number;
  twinklePhase: number;
  /** Panjang ekor (px). 0 = tanpa ekor. */
  tail: number;
  sprite: HTMLCanvasElement;
  half: number;
}

interface Meteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  tail: number;
  width: number;
  /** Bintang jatuh kilat: goresan tipis, cepat, dan hampir mendatar. */
  fast: boolean;
  rgb: [number, number, number];
}

const SPRITE_COLORS = ["#ffffff", "#ffffff", "#f4f7ff", "#dbe7ff", "#c9dcff", "#fff0d6"];
const SPRITE_RADII = [0.5, 0.75, 1, 1.25, 1.5, 1.75];

const METEOR_COLORS: [number, number, number][] = [
  [255, 255, 255],
  [255, 255, 255],
  [207, 224, 255],
  [255, 240, 214],
];

const METEOR_MIN_GAP = 500;
const METEOR_MAX_GAP = 1800;
const METEOR_BURST_CHANCE = 0.22;
const METEOR_MAX_BURST = 3;
/** Peluang meteor jadi versi kilat (cepat) — sisanya kecepatan normal. */
const METEOR_FAST_CHANCE = 0.55;

/** Margin tipis di tepi canvas agar bintang tidak menyentuh border halaman. */
const EDGE = 6;

function withAlpha(hex: string, alpha: number) {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Bintang + halo tipis di-cache sekali, lalu dipakai ulang tiap frame. */
function makeStarSprite(color: string, radius: number, dpr: number) {
  const box = Math.ceil(radius * 5);
  const sprite = document.createElement("canvas");
  sprite.width = Math.ceil(box * dpr);
  sprite.height = Math.ceil(box * dpr);

  const g = sprite.getContext("2d");

  if (g) {
    g.scale(dpr, dpr);
    const c = box / 2;
    const halo = g.createRadialGradient(c, c, radius, c, c, c);
    halo.addColorStop(0, withAlpha(color, 0.28));
    halo.addColorStop(1, withAlpha(color, 0));
    g.fillStyle = halo;
    g.fillRect(0, 0, box, box);

    g.fillStyle = color;
    g.beginPath();
    g.arc(c, c, radius, 0, Math.PI * 2);
    g.fill();
  }

  return { sprite, half: box / 2 };
}

type SpriteSet = ReturnType<typeof makeStarSprite>[];

function buildSprites(dpr: number): SpriteSet[] {
  return SPRITE_COLORS.map((color) =>
    SPRITE_RADII.map((radius) => makeStarSprite(color, radius, dpr)),
  );
}

/** Bintang lebih sedikit di layar kecil supaya frame rate tetap stabil. */
function starBudget() {
  const width = window.innerWidth;

  if (width < 640) return 110;
  if (width < 1024) return 190;
  return 280;
}

function pick<T>(list: T[]): T {
  return list[(Math.random() * list.length) | 0];
}

function createStars(width: number, height: number, sprites: SpriteSet[]): Star[] {
  const count = starBudget();
  const stars: Star[] = [];

  for (let i = 0; i < count; i += 1) {
    const { sprite, half } = pick(pick(sprites));

    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 30 + Math.random() * 50,
      drift: (Math.random() - 0.5) * 6,
      baseAlpha: 0.12 + Math.random() * 0.68,
      alpha: 0,
      twinkleSpeed: 0.5 + Math.random() * 1.5,
      twinklePhase: Math.random() * Math.PI * 2,
      tail: Math.random() < 0.12 ? 10 + Math.random() * 30 : 0,
      sprite,
      half,
    });
  }

  return stars;
}

function createMeteor(width: number, height: number): Meteor {
  const fast = Math.random() < METEOR_FAST_CHANCE;

  // Kilat melintas nyaris mendatar supaya terbaca abstrak, normalnya jatuh
  // miring seperti bintang jatuh biasa.
  const angle = (fast ? 18 + Math.random() * 26 : 55 + Math.random() * 30) * (Math.PI / 180);
  const speed = fast ? 9 + Math.random() * 8 : 3.4 + Math.random() * 2.8;
  const rgb = pick(METEOR_COLORS);

  return {
    x: Math.random() * width * 1.1 - width * 0.05,
    y: Math.random() * height * (fast ? 0.75 : 0.55) - height * 0.1,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    age: 0,
    life: fast ? 40 + Math.random() * 30 : 55 + Math.random() * 45,
    tail: fast ? 190 + Math.random() * 280 : 60 + Math.random() * 90,
    width: fast ? 0.7 + Math.random() * 0.8 : 1 + Math.random() * 1.4,
    fast,
    rgb,
  };
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.5 : 2);

    let width = window.innerWidth;
    let height = window.innerHeight;
    let sprites = buildSprites(dpr);
    const stars = createStars(width, height, sprites);
    const meteors: Meteor[] = [];
    let nextMeteorAt = performance.now() + 500;
    let lastTime = performance.now();
    let animationId = 0;

    function resizeCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawStars() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        ctx.globalAlpha = star.alpha;

        if (star.tail > 0) {
          const trail = ctx.createLinearGradient(star.x, star.y - star.tail, star.x, star.y);
          trail.addColorStop(0, "rgba(255, 255, 255, 0)");
          trail.addColorStop(1, `rgba(255, 255, 255, ${star.alpha * 0.55})`);
          ctx.strokeStyle = trail;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y - star.tail);
          ctx.lineTo(star.x, star.y);
          ctx.stroke();
        }

        ctx.drawImage(star.sprite, star.x - star.half, star.y - star.half);
      }

      ctx.globalAlpha = 1;
    }

    function drawMeteors() {
      if (!ctx) return;

      for (let i = meteors.length - 1; i >= 0; i -= 1) {
        const m = meteors[i];
        const hx = m.x + m.vx * m.age;
        const hy = m.y + m.vy * m.age;
        const alpha = Math.sin((m.age / m.life) * Math.PI);
        const [r, g, b] = m.rgb;
        const tailX = hx - m.vx * m.tail;
        const tailY = hy - m.vy * m.tail;

        // Meteor kilat diberi goresan cahaya lebar di belakang ekornya.
        if (m.fast) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.14})`;
          ctx.lineWidth = m.width * 6;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(hx, hy);
          ctx.stroke();
        }

        const grad = ctx.createLinearGradient(tailX, tailY, hx, hy);
        grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        grad.addColorStop(0.75, `rgba(${r}, ${g}, ${b}, ${alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${alpha * 0.95})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(hx, hy);
        ctx.stroke();

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(hx, hy, m.width * 1.6, 0, Math.PI * 2);
        ctx.fill();

        m.age += 1;
        if (m.age > m.life) meteors.splice(i, 1);
      }
    }

    function spawnMeteors() {
      const burst =
        Math.random() < METEOR_BURST_CHANCE
          ? 2 + Math.floor(Math.random() * (METEOR_MAX_BURST - 1))
          : 1;

      for (let i = 0; i < burst; i += 1) {
        meteors.push(createMeteor(width, height));
      }
    }

    /** Geser seluruh bintang ke atas lalu dibungkus seamless di tepi canvas. */
    function drift(dt: number) {
      const spanY = height + EDGE * 2;
      const spanX = width + EDGE * 2;

      for (const star of stars) {
        star.y -= star.speed * dt;
        star.x -= star.drift * dt;

        if (star.y < -EDGE) {
          star.y += spanY;
          star.x = Math.random() * width;
        } else if (star.y > height + EDGE) {
          star.y -= spanY;
          star.x = Math.random() * width;
        }

        if (star.x < -EDGE) star.x += spanX;
        else if (star.x > width + EDGE) star.x -= spanX;
      }
    }

    function animate(now: number) {
      if (motionQuery.matches) {
        drawStars();
        return;
      }

      // Dibatasi 50ms supaya kembali dari tab tersembunyi tidak melompat.
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const seconds = now * 0.001;

      for (let i = 0; i < Math.floor(stars.length * 0.7); i += 1) {
        const star = stars[i];
        // Dua harmonik supaya kedipannya tidak terasa mekanis.
        const wave =
          Math.sin(seconds * star.twinkleSpeed + star.twinklePhase) * 0.72 +
          Math.sin(seconds * star.twinkleSpeed * 2.6 + star.twinklePhase * 1.9) * 0.28;
        star.alpha = star.baseAlpha * (0.35 + 0.65 * (0.5 + 0.5 * wave));
      }

      drift(dt);
      drawStars();

      if (now >= nextMeteorAt) {
        spawnMeteors();
        nextMeteorAt =
          now + METEOR_MIN_GAP + Math.random() * (METEOR_MAX_GAP - METEOR_MIN_GAP);
      }

      drawMeteors();
      animationId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate(performance.now());

    function handleResize() {
      resizeCanvas();
      sprites = buildSprites(dpr);
for (const star of stars) star.alpha = star.baseAlpha * 0.7;
      if (motionQuery.matches) drawStars();
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}