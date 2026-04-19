import type { Project } from "@/data/portfolio";

import { DividerLine } from "@/components/divider-line";
import { Reveal } from "@/components/reveal";

type ProjectFeatureProps = {
  project: Project;
};

export function ProjectFeature({ project }: ProjectFeatureProps) {
  const reverse = project.align === "right";

  return (
    <article id={project.id} className="scroll-mt-28">
      <DividerLine className="mb-8 md:mb-10" />

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal
          className={`${reverse ? "lg:order-2 lg:col-span-5" : "lg:col-span-5"}`}
        >
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
            <span>{project.index}</span>
            <span className="h-px flex-1 bg-white/10" />
            <span>{project.eyebrow}</span>
          </div>

          <h3
            className={`mt-6 max-w-3xl tracking-[-0.07em] ${
              project.featured
                ? "text-4xl leading-[0.92] md:text-6xl lg:text-[4.35rem]"
                : "text-3xl leading-tight md:text-5xl"
            }`}
          >
            {project.title}
          </h3>

          <p
            className={`mt-6 max-w-2xl leading-8 text-[var(--muted)] ${
              project.featured ? "text-lg md:text-[1.18rem]" : "text-base md:text-lg"
            }`}
          >
            {project.description}
          </p>

          {project.note ? (
            <p className="mt-7 max-w-xl border-l border-[var(--line-strong)] pl-5 text-sm leading-7 text-[var(--muted-strong)]">
              {project.note}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.28em] text-[rgba(241,237,229,0.62)]">
            {project.highlights.map((highlight, index) => (
              <span key={highlight} className="flex items-center gap-3">
                {index > 0 ? (
                  <span className="text-[rgba(201,162,74,0.5)]" aria-hidden="true">
                    /
                  </span>
                ) : null}
                <span>{highlight}</span>
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {project.links.map((link, index) => (
              <a
                key={link.href}
                className={`gold-link ${index > 0 ? "gold-link-muted" : ""}`}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal
          className={`${reverse ? "lg:order-1 lg:col-span-7" : "lg:col-span-7"}`}
          delay={0.08}
        >
          <div
            className={`relative overflow-hidden py-6 ${
              project.featured ? "md:py-10" : "md:py-8"
            }`}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
            <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[rgba(201,162,74,0.78)] via-[rgba(201,162,74,0.22)] to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:3.75rem_3.75rem] opacity-[0.08] [mask-image:linear-gradient(180deg,transparent,black_18%,black_82%,transparent)]" />

            <div
              className={`relative grid gap-8 ${
                project.featured
                  ? "xl:grid-cols-[1.12fr_0.88fr]"
                  : "xl:grid-cols-[1fr_0.9fr]"
              }`}
            >
              <div>
                <p className="section-kicker">{project.systemTitle}</p>

                <div className="mt-5 space-y-6">
                  {project.systemLines.map((line) => (
                    <div key={line.label} className="border-t border-white/8 pt-4">
                      <p className="section-kicker">{line.label}</p>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted-strong)] md:text-[0.98rem]">
                        {line.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:gap-5">
                {project.traces.map((trace, index) => (
                  <div
                    key={trace}
                    className="border-l border-white/10 pl-5 md:pl-6"
                  >
                    <p className="section-kicker">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                      {trace}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
