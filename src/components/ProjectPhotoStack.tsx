"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  image: string;
  location: string;
  year: string | null;
  description: string;
};

const fanPositions = [
  { left: "1%", top: "12%", rotate: "-9deg" },
  { left: "14%", top: "3%", rotate: "-1deg" },
  { left: "27%", top: "13%", rotate: "8deg" },
];

export function ProjectPhotoStack({ projects }: { projects: Project[] }) {
  const photoProjects = projects.slice(0, 3);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveringStack, setHoveringStack] = useState(false);
  const activeProject = photoProjects[activeIndex];

  useEffect(() => {
    if (!hoveringStack || photoProjects.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photoProjects.length);
    }, 1300);
    return () => window.clearInterval(timer);
  }, [hoveringStack, photoProjects.length]);

  if (!activeProject) return null;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <div
          className="relative mx-auto h-[19rem] w-full max-w-xl sm:h-[23rem] lg:h-[26rem]"
          role="group"
          aria-label="Project photo stack. Hover to browse photos, or select one to bring it forward."
          onMouseEnter={() => setHoveringStack(true)}
          onMouseLeave={() => setHoveringStack(false)}
        >
          {photoProjects.map((project, index) => {
            const active = index === activeIndex;
            const fan = fanPositions[index];
            return (
              <button
                key={project.id}
                type="button"
                aria-label={`Bring ${project.name} photo to the front`}
                aria-pressed={active}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className="absolute rounded-sm bg-white p-2 pb-9 text-left shadow-xl outline-offset-4 transition-[left,top,width,transform,box-shadow] duration-500 ease-out focus-visible:outline-2 focus-visible:outline-brand-gold motion-reduce:transition-none sm:p-3 sm:pb-10"
                style={{
                  left: active ? "11%" : fan.left,
                  top: active ? "4%" : fan.top,
                  width: active ? "78%" : "70%",
                  zIndex: active ? 20 : index + 1,
                  transform: `rotate(${active ? "0deg" : fan.rotate}) scale(${active ? 1.025 : 0.97})`,
                }}
              >
                <Image
                  src={project.image}
                  alt={`Photo from ${project.name}`}
                  className="aspect-[4/3] w-full rounded-[2px] object-cover object-[center_20%]"
                  width={1200}
                  height={900}
                  sizes="(min-width: 1024px) 38vw, 78vw"
                  loading="lazy"
                />
                <span className="absolute inset-x-3 bottom-2 truncate text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-black sm:bottom-3 sm:text-xs">
                  {project.name}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-1 text-center text-sm text-brand-gold-light">
          {activeProject.name} · {activeIndex + 1} / {photoProjects.length}
        </p>
      </div>

      <div className="space-y-3" aria-label="Projects and matching photos">
        {photoProjects.map((project, index) => {
          const active = index === activeIndex;
          return (
            <article
              key={project.id}
              onMouseEnter={() => setActiveIndex(index)}
              className={`rounded-xl border p-5 transition-colors motion-reduce:transition-none ${active ? "border-brand-gold bg-brand-black text-brand-gold-light shadow-lg" : "border-brand-gold/35 bg-brand-black/85 text-brand-gold-light hover:border-brand-gold/70"}`}
            >
              <button
                type="button"
                aria-pressed={active}
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className="w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
              >
                <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-display text-2xl font-bold leading-tight">{project.name}</span>
                  <span className="text-sm text-brand-gold-muted">{project.location}{project.year ? ` · ${project.year}` : ""}</span>
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-white">{project.description}</span>
              </button>
              <Link
                href={`/projects#${project.id}`}
                className="mt-3 inline-block text-sm font-semibold text-brand-gold underline underline-offset-4 hover:text-brand-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
              >
                Explore project <span aria-hidden="true">→</span>
              </Link>
            </article>
          );
        })}
        {projects.slice(3).map((project) => (
          <Link key={project.id} href={`/projects#${project.id}`} className="block rounded-xl border border-brand-gold/35 bg-brand-black/85 p-5 text-brand-gold-light transition-colors hover:border-brand-gold/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold">
            <h3 className="text-xl font-bold">{project.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white">{project.description}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-brand-gold underline underline-offset-4">Explore project <span aria-hidden="true">→</span></span>
          </Link>
        ))}
      </div>
    </div>
  );
}
