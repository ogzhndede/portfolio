"use client";

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import { PROJECTS } from "@/data/projects";

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white font-mono flex">
            <Sidebar title="Oğuz Han Dede" imageSrc="/portfolio/ben.png" />

            <div className="flex-1 md:ml-80">
                {/* max-w-5xl yerine max-w-6xl yapıldı, works/page.tsx ile aynı hizada olması için */}
                <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">

                    {/* Header */}
                    {/* Alt boşluk (pb-6 mb-10) works sayfası ile uyumlu hale getirilebilir (örn pb-6) ama senin orijinal mb-10'unu korudum */}
                    <div className="border-b border-white/10 pb-6 mb-10">
                        <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-white to-[#8b8aef]">
                            Games
                        </h1>
                        <p className="mt-2 text-lg text-white/50">
                            Released titles & experiment
                        </p>
                    </div>

                    {/* Project Grid */}
                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {PROJECTS.map((project) => (
                            <a
                                key={project.id}
                                href={project.itchUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="group relative flex flex-col rounded-2xl border border-white/5 bg-black/40 overflow-hidden transition-all duration-300 hover:border-[#8b8aef]/40 hover:bg-[#8b8aef]/5 hover:shadow-[0_0_30px_rgba(139,138,239,0.08)] hover:-translate-y-1"
                            >
                                {/* Logo / Thumbnail */}
                                <div className="relative w-full aspect-video overflow-hidden bg-white/5">
                                    <Image
                                        src={`/portfolio/${project.logo}`}
                                        alt={`${project.title} logo`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-1 p-4 gap-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <h2 className="text-sm font-extrabold text-white leading-tight group-hover:text-[#8b8aef] transition-colors duration-200">
                                            {project.title}
                                        </h2>
                                        {/* Arrow */}
                                        <svg
                                            className="w-4 h-4 shrink-0 text-white/20 group-hover:text-[#8b8aef] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 mt-0.5"
                                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                                        </svg>
                                    </div>

                                    <p className="text-xs text-white/40 leading-relaxed line-clamp-3">
                                        {project.desc}
                                    </p>
                                </div>

                                {/* Left accent bar on hover */}
                                <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#8b8aef]/0 via-[#8b8aef]/60 to-[#8b8aef]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    );
}