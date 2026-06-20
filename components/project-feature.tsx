import type { Project } from "@/data/portfolio";

type ProjectFeatureProps = {
  index?: number;
  project: Project;
};

export function ProjectFeature({ index = 0, project }: ProjectFeatureProps) {
  return (
    <article className="project-row" id={project.id}>
      <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="project-main">
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="project-tags" aria-label={`${project.title} tags`}>
        {project.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <div className="project-links" aria-label={`${project.title} links`}>
        {project.links.map((link) => (
          <a className="project-link" href={link.href} key={link.href} rel="noreferrer" target="_blank">
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
