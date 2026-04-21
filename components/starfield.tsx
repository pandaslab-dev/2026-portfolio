"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  z: number;
  speed: number;
  size: number;
  twinkle: number;
  streak: number;
  gold: boolean;
};

function makeStar(width: number, height: number): Star {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    z: 0.28 + Math.random() * 0.9,
    speed: 0.08 + Math.random() * 0.22,
    size: 0.35 + Math.random() * 1.1,
    twinkle: Math.random() * Math.PI * 2,
    streak: Math.random() < 0.18 ? 10 + Math.random() * 28 : 0,
    gold: Math.random() > 0.72,
  };
}

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return;
    }

    const canvasEl = canvas;
    const ctx = context;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars: Star[] = [];
    let frameId = 0;
    let targetX = 0.5;
    let targetY = 0.5;
    let mouseX = 0.5;
    let mouseY = 0.5;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const starCount = Math.min(180, Math.max(78, Math.floor((width * height) / 7800)));
      stars = Array.from({ length: starCount }, () => makeStar(width, height));
    }

    function handlePointerMove(event: PointerEvent) {
      targetX = event.clientX / Math.max(width, 1);
      targetY = event.clientY / Math.max(height, 1);
    }

    function draw() {
      frameId = window.requestAnimationFrame(draw);
      mouseX += (targetX - mouseX) * 0.045;
      mouseY += (targetY - mouseY) * 0.045;

      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        mouseX * width,
        mouseY * height,
        0,
        mouseX * width,
        mouseY * height,
        Math.max(width, height) * 0.36,
      );
      glow.addColorStop(0, "rgba(205, 151, 0, 0.055)");
      glow.addColorStop(0.45, "rgba(205, 151, 0, 0.018)");
      glow.addColorStop(1, "rgba(205, 151, 0, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      const driftX = (mouseX - 0.5) * 34;
      const driftY = (mouseY - 0.5) * 20;

      for (const star of stars) {
        if (!reducedMotion) {
          star.y += star.speed * star.z;
          star.x += star.speed * 0.06;
        }

        if (star.y > height + 36) {
          star.y = -36;
          star.x = Math.random() * width;
        }

        if (star.x > width + 36) {
          star.x = -36;
        }

        const x = star.x + driftX * star.z;
        const y = star.y + driftY * star.z;
        const shimmer = 0.55 + Math.sin(performance.now() * 0.0015 + star.twinkle) * 0.45;
        const alpha = (0.08 + shimmer * 0.24) * star.z;

        if (star.streak > 0) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(235, 232, 218, ${alpha * 0.5})`;
          ctx.lineWidth = Math.max(0.45, star.size * 0.7);
          ctx.moveTo(x, y);
          ctx.lineTo(x + star.streak * 0.55, y + star.streak);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.fillStyle = star.gold
            ? `rgba(224, 166, 5, ${alpha})`
            : `rgba(235, 232, 218, ${alpha})`;
          ctx.arc(x, y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    frameId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return <canvas className="starfield-canvas" ref={canvasRef} aria-hidden="true" />;
}
