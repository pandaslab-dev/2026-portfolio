import { AsciiPandaHero } from "@/components/ascii-panda-hero";
import { RotatingWord } from "@/components/rotating-word";
import { Starfield } from "@/components/starfield";
import { contact, projects } from "@/data/portfolio";
import Image from "next/image";

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.53.1.72-.23.72-.51v-2c-2.95.64-3.57-1.25-3.57-1.25-.48-1.22-1.18-1.55-1.18-1.55-.97-.66.07-.65.07-.65 1.07.08 1.63 1.1 1.63 1.1.96 1.63 2.5 1.16 3.1.88.1-.69.38-1.16.68-1.43-2.35-.27-4.83-1.18-4.83-5.24 0-1.16.42-2.11 1.1-2.85-.11-.27-.48-1.37.1-2.85 0 0 .91-.29 2.98 1.09a10.33 10.33 0 0 1 5.43 0c2.07-1.38 2.98-1.09 2.98-1.09.58 1.48.21 2.58.1 2.85.68.74 1.1 1.69 1.1 2.85 0 4.07-2.49 4.96-4.86 5.22.39.34.73 1 .73 2.03v3.01c0 .28.19.62.73.51A10.5 10.5 0 0 0 12 1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path
        d="M3.75 5.25h16.5A2.25 2.25 0 0 1 22.5 7.5v9A2.25 2.25 0 0 1 20.25 18.75H3.75A2.25 2.25 0 0 1 1.5 16.5v-9a2.25 2.25 0 0 1 2.25-2.25Zm-.5 2.02v.23l8.75 6.2 8.75-6.2v-.23a.5.5 0 0 0-.5-.52H3.75a.5.5 0 0 0-.5.52Zm17.5 2.06-8.24 5.84a.88.88 0 0 1-1.02 0L3.25 9.33v7.17c0 .29.22.52.5.52h16.5c.28 0 .5-.23.5-.52V9.33Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Starfield />

      <main className="site-shell" id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="panda-stage">
            <AsciiPandaHero />
          </div>

          <div className="hero-copy">
            <h1 id="hero-title">
              <span className="name-first">Andy</span>{" "}
              <span className="name-last">Mills</span>
            </h1>
            <p className="role-line">software engineer / {contact.location}</p>
            <p className="hero-claim">
              <span className="claim-line claim-line-one">I build things</span>{" "}
              <span className="claim-line claim-line-two">
                <span className="claim-motion-part">that</span> <RotatingWord />{" "}
                <span className="claim-motion-part">great</span>
              </span>
            </p>
            <div className="hero-links" aria-label="Primary social links">
              <a
                aria-label="Open Andy Mills on GitHub"
                href="https://github.com/pandaslab-dev"
                rel="noreferrer"
                target="_blank"
              >
                <GitHubIcon />
              </a>
              <a
                aria-label="Email Andy Mills"
                href="mailto:andymills.dev@gmail.com"
              >
                <MailIcon />
              </a>
            </div>
          </div>

          <a className="work-prompt" href="#work">
            <span className="prompt-mark" aria-hidden="true" />
            <span>see my work...</span>
          </a>
        </section>

        <section className="work-section" id="work" aria-label="Selected work">
          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className="project-card"
                data-project-id={project.id}
                id={project.id}
                key={project.id}
              >
                <div>
                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{project.title}</h3>
                  <p className="project-kicker">{project.kicker}</p>
                  <figure className="project-media">
                    <Image
                      alt={project.image.alt}
                      className="project-image"
                      height={project.image.height}
                      priority={index === 0}
                      sizes="(max-width: 980px) calc(100vw - 4rem), 30vw"
                      src={project.image.src}
                      unoptimized
                      width={project.image.width}
                    />
                  </figure>
                  <p className="project-summary">{project.summary}</p>
                </div>

                <p className="project-detail">{project.detail}</p>

                <div className="project-bottom">
                  <ul aria-label={`${project.title} stack`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className="project-links" aria-label={`${project.title} links`}>
                    {project.links.map((link) => (
                      <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="contact-inner">
            <p>contact</p>
            <h2 id="contact-title">Have something that should work great?</h2>
            <div className="contact-links" aria-label="Contact links">
              <a href={`mailto:${contact.directEmail}`}>{contact.directEmail}</a>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <span>pandaslab.dev</span>
          <a href="#top">back to top</a>
        </footer>
      </main>
    </>
  );
}
