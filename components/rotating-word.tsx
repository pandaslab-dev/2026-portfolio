"use client";

import { pixelifySans } from "@/app/fonts";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const WORDS = ["WORK", "LOOK", "FEEL", "DEPLOY", "RUN"];
const GLITCH_CHARS = ["░", "▒", "▓", "█", "▄", "▀", "■", "●", "◉", "★", "✦", "◆", "⊕", "▸"];
const CLAIM_MOVE_TRANSITION =
  "transform 180ms cubic-bezier(0.2, 0.78, 0.26, 1)";
const SCRAMBLE_FRAME_MS = 42;
const LETTER_SETTLE_MS = 62;
const HOLD_MS = 1180;
const ERASE_MS = 54;
const WORD_GAP_MS = 180;

type Phase = "typing" | "holding" | "erasing";

type WordState = {
  wordIndex: number;
  phase: Phase;
  visibleCount: number;
  scrambleChar: string;
  scrambleCycles: number;
  scrambleFrame: number;
};

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] ?? "█";
}

function randomCycles() {
  return 2 + Math.floor(Math.random() * 3);
}

function createTypingState(wordIndex: number): WordState {
  return {
    wordIndex,
    phase: "typing",
    visibleCount: 0,
    scrambleChar: randomChar(),
    scrambleCycles: randomCycles(),
    scrambleFrame: 0,
  };
}

export function RotatingWord() {
  const rotatorRef = useRef<HTMLSpanElement | null>(null);
  const motionRectsRef = useRef(new Map<Element, DOMRect>());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [state, setState] = useState<WordState>(() => createTypingState(0));

  const getMotionElements = useCallback(() => {
    const claimLine = rotatorRef.current?.closest(".claim-line-two");

    return claimLine
      ? Array.from(claimLine.querySelectorAll(".claim-motion-part"))
      : [];
  }, []);

  const captureMotionRects = useCallback(() => {
    const nextRects = new Map<Element, DOMRect>();

    for (const element of getMotionElements()) {
      nextRects.set(element, element.getBoundingClientRect());
    }

    motionRectsRef.current = nextRects;
  }, [getMotionElements]);

  const setAnimatedState = useCallback(
    (updater: (current: WordState) => WordState) => {
      if (!prefersReducedMotion) {
        captureMotionRects();
      }

      setState(updater);
    },
    [captureMotionRects, prefersReducedMotion],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useLayoutEffect(() => {
    if (motionRectsRef.current.size === 0) {
      return;
    }

    if (prefersReducedMotion) {
      motionRectsRef.current.clear();
      return;
    }

    for (const element of getMotionElements()) {
      const previousRect = motionRectsRef.current.get(element);

      if (!previousRect) {
        continue;
      }

      const currentRect = element.getBoundingClientRect();
      const deltaX = previousRect.left - currentRect.left;

      if (Math.abs(deltaX) < 0.5) {
        continue;
      }

      const htmlElement = element as HTMLElement;

      htmlElement.style.transition = "none";
      htmlElement.style.transform = `translateX(${deltaX}px)`;
      htmlElement.getBoundingClientRect();

      requestAnimationFrame(() => {
        htmlElement.style.transition = CLAIM_MOVE_TRANSITION;
        htmlElement.style.transform = "translateX(0)";
      });
    }

    motionRectsRef.current.clear();
  }, [getMotionElements, prefersReducedMotion, state]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const resetId = window.requestAnimationFrame(() => {
        setState({
          wordIndex: 0,
          phase: "holding",
          visibleCount: WORDS[0].length,
          scrambleChar: "",
          scrambleCycles: 0,
          scrambleFrame: 0,
        });
      });

      const intervalId = window.setInterval(() => {
        setAnimatedState((current) => {
          const nextIndex = (current.wordIndex + 1) % WORDS.length;

          return {
            wordIndex: nextIndex,
            phase: "holding",
            visibleCount: WORDS[nextIndex].length,
            scrambleChar: "",
            scrambleCycles: 0,
            scrambleFrame: 0,
          };
        });
      }, HOLD_MS + 700);

      return () => {
        window.cancelAnimationFrame(resetId);
        window.clearInterval(intervalId);
      };
    }

    const currentWord = WORDS[state.wordIndex];
    let timeoutId = 0;

    if (state.phase === "typing") {
      if (state.visibleCount >= currentWord.length) {
        timeoutId = window.setTimeout(() => {
          setAnimatedState((current) =>
            current.phase === "typing"
              ? {
                  ...current,
                  phase: "holding",
                  scrambleChar: "",
                  scrambleCycles: 0,
                  scrambleFrame: 0,
                }
              : current,
          );
        }, 90);
      } else if (state.scrambleFrame < state.scrambleCycles) {
        timeoutId = window.setTimeout(() => {
          setAnimatedState((current) =>
            current.phase === "typing"
              ? {
                  ...current,
                  scrambleFrame: current.scrambleFrame + 1,
                  scrambleChar: randomChar(),
                }
              : current,
          );
        }, SCRAMBLE_FRAME_MS);
      } else {
        timeoutId = window.setTimeout(() => {
          setAnimatedState((current) =>
            current.phase === "typing"
              ? {
                  ...current,
                  visibleCount: current.visibleCount + 1,
                  scrambleChar: randomChar(),
                  scrambleCycles: randomCycles(),
                  scrambleFrame: 0,
                }
              : current,
          );
        }, LETTER_SETTLE_MS);
      }
    } else if (state.phase === "holding") {
      timeoutId = window.setTimeout(() => {
        setAnimatedState((current) =>
          current.phase === "holding"
            ? {
                ...current,
                phase: "erasing",
              }
            : current,
        );
      }, HOLD_MS);
    } else if (state.visibleCount > 0) {
      timeoutId = window.setTimeout(() => {
        setAnimatedState((current) =>
          current.phase === "erasing"
            ? {
                ...current,
                visibleCount: current.visibleCount - 1,
              }
            : current,
        );
      }, ERASE_MS);
    } else {
      timeoutId = window.setTimeout(() => {
        setAnimatedState((current) =>
          createTypingState((current.wordIndex + 1) % WORDS.length),
        );
      }, WORD_GAP_MS);
    }

    return () => window.clearTimeout(timeoutId);
  }, [prefersReducedMotion, setAnimatedState, state]);

  const currentWord = WORDS[state.wordIndex];
  const activeChar =
    !prefersReducedMotion &&
    state.phase === "typing" &&
    state.visibleCount < currentWord.length
      ? state.scrambleChar
      : "";
  const displayWord = `${currentWord.slice(0, state.visibleCount)}${activeChar}`;

  return (
    <span
      aria-label={currentWord.toLowerCase()}
      className={`${pixelifySans.className} word-rotator`}
      ref={rotatorRef}
    >
      <span className="word-terminal" aria-hidden="true">
        <span className="word-text">{displayWord || "\u00a0"}</span>
        <span className="word-cursor" />
      </span>
    </span>
  );
}
