import Image from "next/image";
import { BaseLayout } from "@/components/BaseLayout";
import { getPublicContent } from "@/lib/public-content";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const { projects, stories } = await getPublicContent();

  return (
    <BaseLayout>
      <section className="py-16 sm:py-20 lg:py-24 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-be-900 mb-4">Projects / Where Hope Is Taking Root</h2>
            <p className="text-be-600 dark:text-zinc-400">
              Visual stories of what Beard & Diapers is actually doing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <a
                key={project.id}
                href={`/projects#${project.id}`}
                className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative group-hover:translate-y-2 transition-transform">
                  <Image
                    src={project.image}
                    alt={project.name}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                    width={800}
                    height={400}
                    unoptimized
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-be-900/80 backdrop-blur-sm text-white p-4">
                    {project.featured && <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-brand-gold-light">Featured project</span>}
                    <h3 className="font-bold">{project.name}</h3>
                    <p className="text-sm mt-1">{project.location}{project.year ? ` · ${project.year}` : ""}</p>
                  </div>
                </div>
              </a>
              ))}
          </div>
        </div>
      </section>

      {projects.map((project) => {
        const relatedStories = stories.filter((story) => story.tags.includes(`project:${project.id}`));
        return (
        <section key={project.id} id={project.id} className="scroll-mt-24 bg-be-50 py-16 sm:py-20 lg:py-24 dark:bg-be-900">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="mb-4 text-4xl font-bold text-be-900">{project.name}</h2>
                <p className="mb-6 text-be-600 dark:text-zinc-400">{project.description}</p>
                <dl className="space-y-4 text-be-700 dark:text-zinc-400">
                  <div>
                    <dt className="font-medium">Location</dt>
                    <dd>{project.location}</dd>
                  </div>
                  {project.year && (
                    <div>
                      <dt className="font-medium">Year</dt>
                      <dd>{project.year}</dd>
                    </div>
                  )}
                  {project.why && (
                    <div>
                      <dt className="font-medium">Why It Matters</dt>
                      <dd>{project.why}</dd>
                    </div>
                  )}
                  {project.people?.length ? (
                    <div>
                      <dt className="font-medium">People involved</dt>
                      <dd>{project.people.join(", ")}</dd>
                    </div>
                  ) : null}
                  {project.outcomes && (
                    <div>
                      <dt className="font-medium">Outcomes and impact</dt>
                      <dd>{project.outcomes}</dd>
                    </div>
                  )}
                </dl>
                {project.story && (
                  <div className="mt-8 border-l-4 border-brand-gold pl-5 text-be-700 dark:text-zinc-300">
                    <h3 className="mb-2 font-semibold text-be-900 dark:text-white">The story behind the project</h3>
                    <p>{project.story}</p>
                  </div>
                )}
                <a href={`/contact?subject=${encodeURIComponent(`Support ${project.name}`)}&type=support_project#contact-form`} className="mt-8 inline-flex rounded-full bg-be-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-be-900">
                  Ask about supporting this project
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(project.photos?.length ? project.photos : [project.image]).map((photo, index) => (
                  <div key={photo} className={`relative overflow-hidden rounded-2xl ${index === 0 ? "col-span-2" : ""}`}>
                    <Image
                      src={photo}
                      alt={`${project.name}${index ? `, photo ${index + 1}` : ""}`}
                      className={`${index === 0 ? "h-[300px] sm:h-[400px]" : "h-40 sm:h-52"} w-full object-cover`}
                      width={800}
                      height={500}
                      loading="lazy"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
            {relatedStories.length > 0 && (
              <div className="mt-12 border-t border-[#d9c8a3] pt-8">
                <h3 className="mb-5 text-2xl font-bold text-be-900 dark:text-white">Related stories</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedStories.map((story) => (
                    <Link key={story.id} href={`/stories/${story.id}`} className="rounded-xl border border-[#e8ddc9] bg-white p-5 transition-colors hover:border-[#c9a96a] dark:border-[#6b4b3a] dark:bg-be-800">
                      <span className="text-xs font-semibold uppercase tracking-wide text-be-600 dark:text-be-300">{story.category}</span>
                      <h4 className="mt-2 text-lg font-bold text-be-900 dark:text-white">{story.title}</h4>
                      <p className="mt-2 line-clamp-3 text-sm text-be-700 dark:text-zinc-300">{story.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        );
      })}
    </BaseLayout>
  );
}
