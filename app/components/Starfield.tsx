"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas-based starfield background.
 *
 * Draws a static star layer once and runs a tiny twinkle loop
 * that only mutates opacity on a small subset of stars each frame.
 * Automatically pauses when prefers-reduced-motion is active.
 */

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

const STAR_COUNT = 200;
const TWINKLE_STARS = 30; // how many stars get the twinkle animation

function createStars(width: number, height: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    const baseAlpha = 0.15 + Math.random() * 0.55;
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.2 + 0.3,
      baseAlpha,
      alpha: baseAlpha,
      twinkleSpeed: 0.003 + Math.random() * 0.008,
      twinklePhase: Math.random() * Math.PI * 2,
    });
  }
  return stars;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Respect prefers-reduced-motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = () => motionQuery.matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let stars = createStars(width, height);
    let animationId: number;

    function drawStars() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.globalAlpha = star.alpha;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function animate() {
      if (prefersReducedMotion()) {
        // Static render — no animation loop
        drawStars();
        return;
      }

      const now = performance.now() * 0.001;

      // Only animate a subset of stars for performance
      for (let i = 0; i < TWINKLE_STARS; i++) {
        const star = stars[i];
        star.alpha =
          star.baseAlpha *
          (0.5 + 0.5 * Math.sin(now * star.twinkleSpeed * 100 + star.twinklePhase));
      }

      drawStars();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
      stars = createStars(width, height);
      if (prefersReducedMotion()) {
        drawStars();
      }
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
