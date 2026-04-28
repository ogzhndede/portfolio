"use client";

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { projectCategories, projects, type ProjectItem } from "@/data/projects";
import { publicAssetPath } from "@/lib/paths";

function resolveProjectImage(project: ProjectItem) {
  return project.image ?? project.logo ?? null;
}

function resolveProjectDescription(project: ProjectItem) {
  return project.description ?? project.desc ?? "Project details will be added soon.";
}

function resolveProjectLinks(project: ProjectItem) {
  if (project.links?.length) return project.links;
  if (project.itchUrl) return [{ label: "Itch.io", url: project.itchUrl }];
  return [];
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const image = resolveProjectImage(project);
  const links = resolveProjectLinks(project);
  const primaryLink = links[0];
  const cardClasses = "group relative flex flex-col overflow-hidden rounded-2xl border border-white/5 bg-black/40 transition-all duration-300 focus-within:border-[#8b8aef]/40 focus-within:bg-[#8b8aef]/5";
  const linkedCardClasses = "hover:-translate-y-1 hover:border-[#8b8aef]/40 hover:bg-[#8b8aef]/5 hover:shadow-[0_0_30px_rgba(139,138,239,0.08)] focus:outline-none focus:ring-1 focus:ring-[#8b8aef]/50";
  const cardContent = (
    <>
      <div className="relative w-full aspect-video overflow-hidden bg-white/5">
        {image ? (
          <Image
            src={publicAssetPath(image)}
            alt={`${project.title} thumbnail`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-black/40 px-4 text-center text-xs font-bold uppercase tracking-widest text-white/25">
            <svg className="h-8 w-8 text-white/15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16l4-4a2 2 0 012.8 0l.7.7a2 2 0 002.8 0L15 11a2 2 0 012.8 0L21 14m-18 5h18M5 5h14v14H5z" />
            </svg>
            Image coming soon
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-sm font-extrabold text-white leading-tight group-hover:text-[#8b8aef] transition-colors duration-200">
            {project.title}
          </h2>
          <span className="w-4 h-4 shrink-0 text-white/20 group-hover:text-[#8b8aef] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 mt-0.5">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </span>
        </div>

        <p className="text-[11px] text-white/40 leading-relaxed line-clamp-3">
          {resolveProjectDescription(project)}
        </p>
      </div>

      <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#8b8aef]/0 via-[#8b8aef]/60 to-[#8b8aef]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </>
  );

  if (primaryLink) {
    return (
      <a
        href={primaryLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cardClasses} ${linkedCardClasses}`}
        aria-label={`Open ${project.title}`}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <article className={cardClasses}>
      {cardContent}
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white font-mono flex flex-col md:flex-row">
      <Sidebar />

      <div className="flex-1 min-w-0 md:ml-80">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
          <div className="border-b border-white/10 pb-6 mb-10">
            <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-[#8b8aef]">
              Games
            </h1>
            <p className="mt-2 text-lg text-white/50">
              Released titles & experiments
            </p>
          </div>

          <div className="space-y-12">
            {projectCategories.map((category) => {
              const categoryProjects = projects.filter((project) => project.category === category);

              return (
                <section key={category} className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4">
                    <h2 className="text-base font-bold uppercase tracking-wider text-[#8b8aef] md:text-lg">
                      {category}
                    </h2>
                    <div className="hidden h-px flex-1 bg-white/10 sm:block" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/25">
                      {categoryProjects.length} project{categoryProjects.length === 1 ? "" : "s"}
                    </span>
                  </div>

                  {categoryProjects.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                      {categoryProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-black/30 p-8 text-center">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/35">
                        No projects in this category yet.
                      </div>
                      <p className="mt-2 text-sm text-white/25">
                        New work can be added from the projects data file.
                      </p>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
