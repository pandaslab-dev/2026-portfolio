import { Footer } from "@/components/footer";
import { HeroInteractiveBackground } from "@/components/hero-interactive-background";
import { Navbar } from "@/components/navbar";
import { ProjectFeature } from "@/components/project-feature";
import { Reveal } from "@/components/reveal";
import { SectionWrapper } from "@/components/section-wrapper";
import {
  aboutParagraphs,
  contactLinks,
  heroNotes,
  projects,
} from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="top">
        <section className="relative isolate overflow-hidden">
          <HeroInteractiveBackground />

          <div className="mx-auto grid w-[min(100%-2rem,1200px)] gap-16 pb-24 pt-24 md:pb-32 md:pt-36 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-8">
              <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
                <span>Andy Mills</span>
                <span className="h-px flex-1 bg-white/10" />
                <span>Software Engineer</span>
                <span className="hidden sm:inline">Oklahoma City</span>
              </div>

              <h1 className="mt-8 max-w-5xl text-[clamp(3.5rem,11vw,8rem)] leading-[0.88] tracking-[-0.08em]">
                I build things{" "}
                <span className="font-editorial italic text-[var(--gold)]">
                  that work.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-[1.22rem]">
                Full-stack developer building AI-assisted tools, real-time
                systems, and production-ready web applications.
              </p>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
                <a className="gold-link" href="#oyler">
                  View Oyler
                  <span aria-hidden="true">01</span>
                </a>
                <a className="gold-link gold-link-muted" href="#contact">
                  Get in touch
                  <span aria-hidden="true">02</span>
                </a>
              </div>
            </Reveal>

            <Reveal className="lg:col-span-4" delay={0.12}>
              <div className="grid gap-8 border-l border-white/10 pl-6 md:pl-10">
                {heroNotes.map((note) => (
                  <div
                    key={note.label}
                    className="border-t border-white/8 pt-4 first:border-t-0 first:pt-0"
                  >
                    <p className="section-kicker">{note.label}</p>
                    <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--muted-strong)]">
                      {note.value}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <SectionWrapper
          id="work"
          kicker="Selected Work"
          title="Systems with strong edges, clear technical decisions, and room for people to actually use them."
          intro="A focused set of projects spanning SaaS, real-time interaction, and browser-native tooling. The common thread is practical software built for real behavior, not just screenshots."
        >
          <div className="space-y-14 md:space-y-18">
            {projects.map((project) => (
              <ProjectFeature key={project.id} project={project} />
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper
          id="about"
          kicker="About"
          title="Builder first, engineer by degree."
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-20">
            <Reveal>
              <div className="border-l border-[var(--line-strong)] pl-6 md:pl-8">
                <p className="section-kicker">Working Style</p>
                <p className="mt-5 text-2xl leading-tight tracking-[-0.05em] text-[var(--foreground)] md:text-4xl">
                  Practical systems, clear interfaces, and software shaped by
                  how people actually work.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="space-y-7">
                {aboutParagraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </SectionWrapper>

        <SectionWrapper
          id="contact"
          kicker="Contact"
          title="I’m currently looking for my first software engineering role."
          intro="If your team values strong product judgment, reliable execution, and engineers who can translate messy operational problems into usable software, I’d love to talk."
          className="pb-8"
        >
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:items-end">
            <Reveal>
              <a
                className="inline-block text-[clamp(2.25rem,7vw,5.5rem)] leading-[0.92] tracking-[-0.07em] transition-colors duration-200 hover:text-[var(--gold)]"
                href="mailto:hello@pandaslab.dev"
              >
                hello@pandaslab.dev
              </a>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-5 border-l border-white/10 pl-6 md:pl-8">
                {contactLinks.map((link) =>
                  link.href ? (
                    <a
                      key={link.label}
                      className="gold-link w-fit"
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span
                      key={link.label}
                      className="section-kicker text-[var(--muted)]"
                    >
                      {link.label}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
