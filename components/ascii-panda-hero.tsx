"use client";

import { useEffect, useRef } from "react";

const ASCII_ART = `\
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⣿⣧⣤⡴⠞⠛⠛⠛⠛⠛⠛⠛⠛⠳⢦⣤⣴⣿⣿⣿⣦⡄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⡿⢋⡽⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢯⡙⢻⣿⣿⡄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣷⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣾⣿⣿⠃⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢠⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣼⠃⠀⠀⠀⠀⠀⠀⣠⣤⣄⠀⠀⠀⢀⣤⣄⡀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⢀⣴⣾⣿⣿⣿⠀⠀⠀⢾⣾⣿⣿⣦⣄⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠸⣧⠀⠀⠀⠘⠿⣿⣿⣿⠋⠰⣶⡶⠈⢻⣿⣿⡿⠟⠀⠀⠀⠀⣸⠇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣘⣷⢤⣀⣀⠠⣤⠠⠘⠢⠠⡜⣄⣠⣚⠽⠄⠤⠼⠁⣀⡴⠞⠛⢦⡀⠀⠀⠀⠀⠀⠀
⠀⠀⢀⡴⠊⣉⡉⠵⣟⠛⡏⢁⣀⡠⣤⠕⠶⠂⡉⢉⣀⣀⣀⣠⠤⠴⠖⠚⠉⠉⠀⠀⠀⠀⠙⣦⡀⠀⠀⠀⠀
⠀⡠⠞⠊⢹⣀⣀⠀⡼⠒⠉⠁⡇⢆⠆⠀⠀⢀⣠⠊⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠈⢷⡄⠀⠀⠀
⠈⠦⢴⡶⣈⣁⠠⠞⠁⠀⠀⠠⠗⠁⠀⠀⠸⠊⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⠀⠀⠀⠀⠀⠀⢿⡄⠀⠀
⠀⠀⠘⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠈⣷⠀⠀
⠀⠀⠀⠈⠻⠶⢤⣤⠤⢤⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀
⠀⠀⠀⠀⠀⠀⢰⡏⠀⢸⡇⠀⠀⠀PANDA'S LAB⠀⠀⠀⢀⡼⠁⠀⠀⠀⠀⠀⠀⢀⣿⡄⠀
⠀⠀⠀⠀⠀⢀⡿⠀⠀⠸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡾⠁⠀⠀⠀⠀⠀⠀⢀⡼⠃⢿⡀
⠀⠀⠀⣀⡤⠼⢇⡀⠀⠀⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢧⡀⠀⠀⠀⣀⣤⠴⠋⠀⠀⠈⣷
⠀⠀⡼⡥⢔⢑⢎⢩⢢⡀⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣩⡛⢛⠛⠢⡀⠀⠀⠀⠀⠀⣿
⠀⠀⡇⡪⢱⠉⢐⠀⠀⢡⠀⠐⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠎⠀⢘⢃⢠⠒⡴⡀⠀⠀⠀⠀⣿
⠀⠀⣧⠐⠂⠀⠀⠀⢠⠘⡄⠀⠘⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡜⠀⠀⠃⠀⠐⠒⠀⡇⠀⠀⠀⣼⠃
⠀⠀⠘⡄⢀⠀⠀⠀⠸⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠈⠀⠀⠀⠈⠈⢰⠁⠀⢀⣴⠏⠀
⠀⠀⠀⠙⢦⡁⠂⠐⠁⡸⠀⠀⠀⠀⣀⣀⣀⣀⣀⣠⣀⣀⣀⣀⠀⠀⠀⡇⠠⡀⠀⢀⠄⢠⢃⣠⡶⠋⠁⠀⠀
⠀⠀⠀⠀⠀⠉⠓⠒⠊⠉⠛⠛⠛⠋⠉⠉⠉⠉⠁⠀⠀⠈⠉⠉⠙⠛⠳⢾⣦⡀⣁⣠⡴⠟⠋⠁⠀⠀⠀⠀⠀`;

type Rgb = [number, number, number];
type Ripple = {
  cx: number;
  cy: number;
  t: number;
  maxT: number;
};

const C_BASE: Rgb = [175, 125, 5];
const C_BELLY: Rgb = [218, 162, 10];
const C_MID: Rgb = [255, 210, 0];
const C_HOT: Rgb = [255, 250, 195];
const C_WHITE: Rgb = [255, 255, 255];
const ALT_CHARS = ["░", "▒", "▓", "█", "▄", "▀", "■", "●", "◉", "★", "✦", "◆", "⊕", "▸"];
const BLANK = new Set([" ", "\u2800"]);

function lerp3(a: Rgb, b: Rgb, t: number): Rgb {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function toRgb(color: Rgb) {
  return `rgb(${color[0] | 0},${color[1] | 0},${color[2] | 0})`;
}

function toRgba(color: Rgb, alpha: number) {
  return `rgba(${color[0] | 0},${color[1] | 0},${color[2] | 0},${alpha})`;
}

export function AsciiPandaHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!container || !canvas || !ctx) {
      return;
    }

    const containerEl = container;
    const canvasEl = canvas;
    const context = ctx;

    const lines = ASCII_ART.split("\n").filter((line) => line.length > 0);
    const grid = lines.map((line) => [...line]);
    const rows = grid.length;
    const cols = Math.max(...grid.map((row) => row.length));

    for (let row = 0; row < rows; row += 1) {
      while (grid[row].length < cols) {
        grid[row].push(" ");
      }
    }

    const bellySet = new Set<number>();
    [..."PANDA'S LAB"].forEach((_, index) => bellySet.add(14 * cols + 14 + index));

    const nonBlank: number[] = [];

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        if (!BLANK.has(grid[row][col])) {
          nonBlank.push(row * cols + col);
        }
      }
    }

    const glow = new Float32Array(rows * cols);
    const amb = new Float32Array(rows * cols);
    const altArr = new Array<string | null>(rows * cols).fill(null);
    const ripples: Ripple[] = [];

    let mounted = true;
    let fontSize = 12;
    let charWidth = 8;
    let charHeight = 14;
    let originX = 0;
    let originY = 0;
    let animY = 0;
    let frame = 0;
    let ambientFrame = 0;
    let mouseRow = -1;
    let mouseCol = -1;
    let rafId = 0;

    function measureAndLayout() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = containerEl.clientWidth;
      const height = containerEl.clientHeight;

      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const widthScale = width < 520 ? 0.7 : 0.82;
      let nextFontSize = (width * widthScale) / (cols * 0.605);

      if (nextFontSize * rows * 1.18 > height * 0.86) {
        nextFontSize = (height * 0.86) / (rows * 1.18);
      }

      fontSize = Math.min(Math.max(nextFontSize, width < 520 ? 4.8 : 7), 24);
      context.font = `bold ${fontSize}px "Courier New", monospace`;
      charWidth = context.measureText("\u28ff").width;
      charHeight = fontSize * 1.18;
      originX = (width - cols * charWidth) / 2;
      originY = (height - rows * charHeight) / 2;
    }

    function pointToGrid(x: number, y: number) {
      return {
        row: (y - originY - animY) / charHeight,
        col: (x - originX) / charWidth,
      };
    }

    function addRipple(x: number, y: number) {
      const rect = canvasEl.getBoundingClientRect();
      const { row, col } = pointToGrid(x - rect.left, y - rect.top);
      ripples.push({ cx: col, cy: row, t: 0, maxT: 88 });
    }

    function handleMove(event: MouseEvent) {
      const rect = canvasEl.getBoundingClientRect();
      const point = pointToGrid(event.clientX - rect.left, event.clientY - rect.top);
      mouseRow = point.row;
      mouseCol = point.col;
    }

    function handleLeave() {
      mouseRow = -1;
      mouseCol = -1;
    }

    function handleDown(event: MouseEvent) {
      addRipple(event.clientX, event.clientY);
    }

    function handleTouchMove(event: TouchEvent) {
      event.preventDefault();
      const touch = event.touches[0];
      const rect = canvasEl.getBoundingClientRect();
      const point = pointToGrid(touch.clientX - rect.left, touch.clientY - rect.top);
      mouseRow = point.row;
      mouseCol = point.col;
    }

    function handleTouchEnd(event: TouchEvent) {
      event.preventDefault();
      const touch = event.changedTouches[0];

      if (touch) {
        addRipple(touch.clientX, touch.clientY);
      }
    }

    canvasEl.addEventListener("mousemove", handleMove);
    canvasEl.addEventListener("mouseleave", handleLeave);
    canvasEl.addEventListener("mousedown", handleDown);
    canvasEl.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvasEl.addEventListener("touchend", handleTouchEnd, { passive: false });

    const resizeObserver = new ResizeObserver(measureAndLayout);
    resizeObserver.observe(containerEl);
    measureAndLayout();

    function draw() {
      if (!mounted) {
        return;
      }

      rafId = window.requestAnimationFrame(draw);
      frame += 1;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvasEl.width / dpr;
      const height = canvasEl.height / dpr;

      context.clearRect(0, 0, width, height);
      animY = Math.sin(frame * 0.017) * 5;

      ambientFrame += 1;

      if (ambientFrame % 7 === 0) {
        for (let pulse = 0; pulse < Math.floor(Math.random() * 4) + 1; pulse += 1) {
          const index = nonBlank[Math.floor(Math.random() * nonBlank.length)];

          if (amb[index] < 0.12) {
            amb[index] = 0.35 + Math.random() * 0.5;
          }
        }
      }

      for (let index = 0; index < amb.length; index += 1) {
        if (amb[index] > 0) {
          amb[index] = Math.max(0, amb[index] - 0.009);
        }
      }

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const index = row * cols + col;
          const isBelly = bellySet.has(index);

          if (mouseRow >= 0) {
            const distance = Math.sqrt((row - mouseRow) ** 2 + ((col - mouseCol) * 0.52) ** 2);

            if (distance < 5.5) {
              const target = (1 - distance / 5.5) ** 1.4;
              glow[index] = Math.min(1, glow[index] + (target - glow[index]) * 0.2);

              if (
                !isBelly &&
                target > 0.6 &&
                !altArr[index] &&
                !BLANK.has(grid[row][col]) &&
                Math.random() < 0.07
              ) {
                altArr[index] = ALT_CHARS[Math.floor(Math.random() * ALT_CHARS.length)];
                window.setTimeout(() => {
                  if (mounted) {
                    altArr[index] = null;
                  }
                }, 150 + Math.random() * 380);
              }
            } else {
              glow[index] = Math.max(0, glow[index] - 0.038);

              if (glow[index] < 0.04) {
                altArr[index] = null;
              }
            }
          } else {
            glow[index] = Math.max(0, glow[index] - 0.032);

            if (glow[index] < 0.04) {
              altArr[index] = null;
            }
          }
        }
      }

      for (let index = ripples.length - 1; index >= 0; index -= 1) {
        ripples[index].t += 1;

        if (ripples[index].t > ripples[index].maxT) {
          ripples.splice(index, 1);
        }
      }

      context.font = `bold ${fontSize}px "Courier New", monospace`;
      context.textBaseline = "top";

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const char = grid[row][col];

          if (BLANK.has(char)) {
            continue;
          }

          const index = row * cols + col;
          const isBelly = bellySet.has(index);
          const x = originX + col * charWidth;
          const y = originY + row * charHeight + animY;
          let rippleValue = 0;

          for (const ripple of ripples) {
            const distance = Math.sqrt((row - ripple.cy) ** 2 + (col - ripple.cx) ** 2);
            const band = Math.abs(distance - (ripple.t / ripple.maxT) * 24);

            if (band < 3.2) {
              const rippleFade = (1 - band / 3.2) * (1 - ripple.t / ripple.maxT) ** 0.6;

              if (rippleFade > rippleValue) {
                rippleValue = rippleFade;
              }
            }
          }

          const bellyBoost = isBelly ? 0.15 : 0;
          const total = Math.min(1, glow[index] + amb[index] * 0.5 + rippleValue * 0.95 + bellyBoost);
          const base = isBelly ? C_BELLY : C_BASE;
          const color =
            total <= 0
              ? base
              : total < 0.5
                ? lerp3(base, C_MID, total * 2)
                : total < 0.85
                  ? lerp3(C_MID, C_HOT, (total - 0.5) / 0.35)
                  : lerp3(C_HOT, C_WHITE, (total - 0.85) / 0.15);

          if (total > 0.06) {
            context.shadowColor = toRgba(C_MID, Math.min(0.85, total));
            context.shadowBlur = 5 + total * (isBelly ? 22 : 18);
          } else if (isBelly) {
            context.shadowColor = toRgba(C_MID, 0.35);
            context.shadowBlur = 8;
          } else {
            context.shadowBlur = 0;
          }

          context.fillStyle = toRgb(color);
          context.fillText(
            !isBelly && (glow[index] > 0.5 || rippleValue > 0.6) && altArr[index]
              ? altArr[index]
              : char,
            x,
            y,
          );
        }
      }

      context.shadowBlur = 0;
    }

    rafId = window.requestAnimationFrame(draw);

    return () => {
      mounted = false;
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      canvasEl.removeEventListener("mousemove", handleMove);
      canvasEl.removeEventListener("mouseleave", handleLeave);
      canvasEl.removeEventListener("mousedown", handleDown);
      canvasEl.removeEventListener("touchmove", handleTouchMove);
      canvasEl.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="ascii-panda-hero" ref={containerRef}>
      <canvas ref={canvasRef} aria-label="Interactive gold panda made from text" role="img" />
      <div className="panda-scanline" aria-hidden="true" />
    </div>
  );
}
