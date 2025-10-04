import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  const featured = projects.filter((p) => p.featured);
  const regular = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="container py-12 md:py-20">
      {featured.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            Featured Project
          </h2>
          <div className="grid gap-8">
            {featured.map((project) => (
              <ProjectCard key={project.id} {...project} featured />
            ))}
          </div>
        </div>
      )}

      {regular.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            All Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regular.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
