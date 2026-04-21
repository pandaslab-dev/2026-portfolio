"use client";

import { useEffect, useState } from "react";

const WORDS = ["WORK", "LOOK", "FEEL", "BUILD", "RUN"];

type WordState = {
  index: number;
  previous: string | null;
  tick: number;
};

export function RotatingWord() {
  const [state, setState] = useState<WordState>({
    index: 0,
    previous: null,
    tick: 0,
  });

  useEffect(() => {
    const intervalId = window.setInterval(() => {
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
  }, []);

  const currentWord = WORDS[state.index];

  return (
    <span className="word-rotator" aria-label={currentWord.toLowerCase()}>
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
  );
}
