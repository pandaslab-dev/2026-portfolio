import { AsciiPandaHero } from "@/components/ascii-panda-hero";
import { RotatingWord } from "@/components/rotating-word";
import { Starfield } from "@/components/starfield";
import { contact, projects } from "@/data/portfolio";

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
                that <RotatingWord /> great
              </span>
            </p>
          </div>

          <a className="work-prompt" href="#work">
            <span className="prompt-mark" aria-hidden="true">
              -&gt;
            </span>
            <span>see my work...</span>
          </a>
        </section>

        <section className="work-section" id="work" aria-label="Selected work">
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className="project-card" id={project.id} key={project.id}>
                <div>
                  <span className="project-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{project.title}</h3>
                  <p className="project-kicker">{project.kicker}</p>
                  <p className="project-summary">{project.summary}</p>
                </div>

                <p className="project-detail">{project.detail}</p>

                <div className="project-bottom">
                  <ul aria-label={`${project.title} stack`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <a href={project.href} rel="noreferrer" target="_blank">
                    {project.label}
                  </a>
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
              <a href={`mailto:${contact.primaryEmail}`}>{contact.primaryEmail}</a>
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
