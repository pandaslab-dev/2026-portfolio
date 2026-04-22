"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const WORDS = ["WORK", "LOOK", "FEEL", "DEPLOY", "RUN"];
const CLAIM_MOVE_TRANSITION =
  "transform 300ms cubic-bezier(0.2, 0.78, 0.26, 1)";

type WordState = {
  index: number;
  previous: string | null;
  tick: number;
};

export function RotatingWord() {
  const rotatorRef = useRef<HTMLSpanElement | null>(null);
  const motionRectsRef = useRef(new Map<Element, DOMRect>());
  const [state, setState] = useState<WordState>({
    index: 0,
    previous: null,
    tick: 0,
  });

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

  useLayoutEffect(() => {
    if (motionRectsRef.current.size === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

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
  }, [getMotionElements, state.tick]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      captureMotionRects();

      setState((current) => {
        const nextTick = current.tick + 1;

        window.setTimeout(() => {
          setState((latest) =>
            latest.tick === nextTick ? { ...latest, previous: null } : latest,
          );
        }, 720);

        return {
          index: (current.index + 1) % WORDS.length,
          previous: WORDS[current.index],
          tick: nextTick,
        };
      });
    }, 1850);

    return () => window.clearInterval(intervalId);
  }, [captureMotionRects]);

  const currentWord = WORDS[state.index];

  return (
    <span
      className="word-rotator"
      aria-label={currentWord.toLowerCase()}
      ref={rotatorRef}
    >
      <span className="word-mask" aria-hidden="true">
        {state.previous ? (
          <span className="word word-exit" key={`out-${state.tick}`}>
            {state.previous}
          </span>
        ) : null}
        <span
          className={state.previous ? "word word-enter" : "word word-current"}
          key={`in-${state.tick}`}
        >
          {currentWord}
        </span>
      </span>
    </span>
  );
}
