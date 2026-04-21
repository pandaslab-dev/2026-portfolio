"use client";

import type { CSSProperties, PointerEvent } from "react";
import { useMemo, useState } from "react";

const WIDTH = 76;
const HEIGHT = 36;
const RAMP = " .~ox+=*%$@";

type Cell = {
  char: string;
  tone: "blank" | "head" | "shadow" | "patch" | "feature" | "glint";
};

const restingStyle = {
  "--panda-tilt-x": "0deg",
  "--panda-tilt-y": "0deg",
  "--panda-shift-x": "0px",
  "--panda-shift-y": "0px",
} as CSSProperties;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const t = clamp((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function ellipse(
  x: number,
  y: number,
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  angle = 0,
) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const dx = x - cx;
  const dy = y - cy;
  const px = dx * cos + dy * sin;
  const py = -dx * sin + dy * cos;

  return Math.sqrt((px / rx) ** 2 + (py / ry) ** 2);
}

function triangleNose(x: number, y: number) {
  const top = 0.28;
  const bottom = 0.49;
  const center = 0.39;
  const halfWidth = 0.23 * clamp(1 - (y - top) / (bottom - top), 0.15, 1);

  if (y < top || y > bottom) {
    return 0;
  }

  const horizontal = 1 - Math.abs(x) / halfWidth;
  const vertical = 1 - Math.abs(y - center) / 0.13;

  return clamp(Math.min(horizontal, vertical));
}

function texture(x: number, y: number) {
  const value = Math.sin(x * 41.7 + y * 89.2) * 43758.5453;
  return value - Math.floor(value);
}

function ramp(value: number, x: number, y: number) {
  const textured = clamp(value + (texture(x, y) - 0.5) * 0.08);
  return RAMP[Math.round(textured * (RAMP.length - 1))] ?? " ";
}

function drawPanda(isHovering: boolean) {
  const rows: Cell[][] = [];

  for (let row = 0; row < HEIGHT; row += 1) {
    const cells: Cell[] = [];
    const y = -1.08 + (row / (HEIGHT - 1)) * 2.16;

    for (let col = 0; col < WIDTH; col += 1) {
      const x = -1.32 + (col / (WIDTH - 1)) * 2.64;
      let value = 0;
      let tone: Cell["tone"] = "blank";

      const leftEar = ellipse(x, y, -0.78, -0.68, 0.34, 0.33, -0.2);
      const rightEar = ellipse(x, y, 0.78, -0.68, 0.34, 0.33, 0.2);
      const ear = Math.max(
        smoothstep(1.07, 0.82, leftEar),
        smoothstep(1.07, 0.82, rightEar),
      );

      if (ear > 0.02) {
        const innerEar = Math.max(
          smoothstep(1.05, 0.75, ellipse(x, y, -0.78, -0.68, 0.23, 0.22, -0.2)),
          smoothstep(1.05, 0.75, ellipse(x, y, 0.78, -0.68, 0.23, 0.22, 0.2)),
        );
        value = 0.42 + ear * 0.42 - innerEar * 0.16;
        tone = innerEar > 0.1 ? "shadow" : "patch";
      }

      const headDistance = ellipse(x, y, 0, 0.02, 1.03, 0.86);
      const head = smoothstep(1.04, 0.86, headDistance);

      if (head > 0.02) {
        const edge = smoothstep(0.62, 1.02, headDistance);
        const light = 0.78 - y * 0.2 - x * 0.04 + (isHovering ? 0.05 : 0);
        value = clamp((0.18 + head * 0.74) * light - edge * 0.23);
        tone = edge > 0.56 ? "shadow" : "head";
      }

      const muzzle = Math.max(
        smoothstep(1.04, 0.78, ellipse(x, y, -0.16, 0.52, 0.33, 0.2, 0.1)),
        smoothstep(1.04, 0.78, ellipse(x, y, 0.16, 0.52, 0.33, 0.2, -0.1)),
      );

      if (muzzle > 0.03) {
        value = clamp(Math.max(value, 0.52 + muzzle * 0.32 - y * 0.06));
        tone = "head";
      }

      const leftPatch = smoothstep(1.06, 0.72, ellipse(x, y, -0.37, -0.08, 0.22, 0.36, -0.1));
      const rightPatch = smoothstep(1.06, 0.72, ellipse(x, y, 0.37, -0.08, 0.22, 0.36, 0.1));
      const patch = Math.max(leftPatch, rightPatch);

      if (patch > 0.03) {
        const patchEdge = Math.max(
          smoothstep(0.72, 1.02, ellipse(x, y, -0.37, -0.08, 0.22, 0.36, -0.1)),
          smoothstep(0.72, 1.02, ellipse(x, y, 0.37, -0.08, 0.22, 0.36, 0.1)),
        );
        value = clamp(0.52 + patch * 0.42 - patchEdge * 0.16);
        tone = "patch";
      }

      const leftEye = smoothstep(1.02, 0.62, ellipse(x, y, -0.37, -0.08, 0.07, 0.17));
      const rightEye = smoothstep(1.02, 0.62, ellipse(x, y, 0.37, -0.08, 0.07, 0.17));
      const eye = Math.max(leftEye, rightEye);

      if (eye > 0.05) {
        value = 0.12;
        tone = "blank";
      }

      const leftGlint = smoothstep(1.04, 0.3, ellipse(x, y, -0.4, -0.18, 0.025, 0.042));
      const rightGlint = smoothstep(1.04, 0.3, ellipse(x, y, 0.34, -0.18, 0.025, 0.042));
      const glint = Math.max(leftGlint, rightGlint);

      if (glint > 0.08) {
        value = 1;
        tone = "glint";
      }

      const nose = triangleNose(x, y);

      if (nose > 0.05) {
        value = 0.94;
        tone = "feature";
      }

      const mouthLeft = Math.abs(y - (0.58 + (x + 0.09) ** 2 * 2.8)) < 0.018 && x > -0.22 && x < -0.02;
      const mouthRight = Math.abs(y - (0.58 + (x - 0.09) ** 2 * 2.8)) < 0.018 && x > 0.02 && x < 0.22;
      const philtrum = Math.abs(x) < 0.018 && y > 0.48 && y < 0.59;

      if (mouthLeft || mouthRight || philtrum) {
        value = 0.72;
        tone = "feature";
      }

      cells.push({
        char: value > 0.08 ? ramp(value, x, y) : " ",
        tone,
      });
    }

    rows.push(cells);
  }

  return rows;
}

export function AsciiPanda() {
  const [isHovering, setIsHovering] = useState(false);
  const [style, setStyle] = useState<CSSProperties>(restingStyle);
  const rows = useMemo(() => drawPanda(isHovering), [isHovering]);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    setStyle({
      "--panda-tilt-x": `${-y * 1.2}deg`,
      "--panda-tilt-y": `${x * 1.6}deg`,
      "--panda-shift-x": `${x * 4}px`,
      "--panda-shift-y": `${y * 3}px`,
    } as CSSProperties);
  }

  function handlePointerLeave() {
    setIsHovering(false);
    setStyle(restingStyle);
  }

  return (
    <div
      aria-label="Luminance-mapped ASCII panda based on the panda emoji"
      className="ascii-panda"
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      role="img"
      style={style}
    >
      <pre>{rows.map((row, rowIndex) => (
          <span className="ascii-row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <span className={`ascii-cell ascii-${cell.tone}`} key={cellIndex}>
                {cell.char}
              </span>
            ))}
          </span>
        ))}</pre>
    </div>
  );
}
