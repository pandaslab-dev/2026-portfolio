import type { ReactNode } from "react";

import { DividerLine } from "@/components/divider-line";
import { Reveal } from "@/components/reveal";

type SectionWrapperProps = {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
  className?: string;
  children: ReactNode;
};

export function SectionWrapper({
  id,
  kicker,
  title,
  intro,
  className = "",
  children,
}: SectionWrapperProps) {
  return (
    <section id={id} className={`scroll-mt-28 py-10 md:py-14 ${className}`}>
      <div className="mx-auto w-[min(100%-2rem,1200px)]">
        <DividerLine className="mb-10 md:mb-12" />

        <Reveal className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)] lg:gap-12">
          <p className="section-kicker pt-2">{kicker}</p>

          <div className="max-w-4xl">
            <h2 className="text-3xl leading-tight tracking-[-0.06em] md:text-5xl">
              {title}
            </h2>

            {intro ? (
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                {intro}
              </p>
            ) : null}
          </div>
        </Reveal>

        {children}
      </div>
    </section>
  );
}
