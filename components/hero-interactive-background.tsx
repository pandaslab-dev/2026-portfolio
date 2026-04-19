"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

export function HeroInteractiveBackground() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(32);

  const smoothX = useSpring(pointerX, {
    stiffness: 90,
    damping: 26,
    mass: 0.8,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 90,
    damping: 26,
    mass: 0.8,
  });

  const shiftX = useTransform(smoothX, [0, 100], [-16, 16]);
  const shiftY = useTransform(smoothY, [0, 100], [-10, 10]);

  const primaryGlow = useMotionTemplate`radial-gradient(34rem 34rem at ${smoothX}% ${smoothY}%, rgba(201, 162, 74, 0.2), transparent 62%)`;
  const secondaryGlow = useMotionTemplate`radial-gradient(22rem 22rem at calc(${smoothX}% + 12%) calc(${smoothY}% - 6%), rgba(201, 162, 74, 0.11), transparent 64%)`;

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth) * 100);
      pointerY.set((event.clientY / window.innerHeight) * 100);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [pointerX, pointerY, prefersReducedMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-[-24%] opacity-90"
        style={{ backgroundImage: primaryGlow }}
      />

      <motion.div
        className="absolute inset-[-20%] opacity-80"
        style={{
          backgroundImage: secondaryGlow,
          x: prefersReducedMotion ? 0 : shiftX,
          y: prefersReducedMotion ? 0 : shiftY,
        }}
      />

      <div className="hero-gridlines absolute inset-x-[4%] inset-y-[10%] opacity-40" />

      <motion.div
        className="absolute inset-x-[12%] top-[18%] bottom-[14%] border-x border-white/5"
        style={
          prefersReducedMotion
            ? undefined
            : {
                x: shiftX,
                y: shiftY,
              }
        }
      />

      <motion.div
        className="absolute left-[8%] right-[36%] top-[28%] h-px bg-gradient-to-r from-transparent via-[rgba(201,162,74,0.28)] to-transparent"
        style={prefersReducedMotion ? undefined : { x: shiftX }}
      />

      <motion.div
        className="absolute bottom-[22%] left-[34%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/16 to-transparent"
        style={prefersReducedMotion ? undefined : { x: shiftX }}
      />

      <div className="hero-sweep absolute inset-y-0 left-[-28%] w-[46%]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_42%)]" />
    </div>
  );
}
