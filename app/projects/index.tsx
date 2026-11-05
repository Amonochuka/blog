import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BaseLayout } from "@/components/BaseLayout";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <BaseLayout>
      <section className="py-24 md:py-32 bg-white dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-be-900 mb-4">Projects / Where Hope Is Taking Root</h2>
            <p className="text-be-600 dark:text-zinc-400">
              Visual stories of what Beard & Diapers is actually doing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/projects/hospital-reading-corner"
              className="group hover:text-be-900 transition-colors rounded-xl bg-white dark:bg-be-900 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative group-hover:translate-y-2 transition-transform">
                <Image
                  src="/images/project-1.jpg"
                  alt="Hospital Reading Corners"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-be-900/80 backdrop-blur-sm text-white p-4">
                  <h3 className="font-bold">Hospital Reading Corners</h3>
                  <p className="text-sm mt-1">Small reading corners in hospital wards</p>
                </div>
              </div>
            </Link>

            {/* More project cards can be added */}
          </div>
        </div>
      </section>

      {/* Project detail section */}
      <section className="py-24 md:py-32 bg-be-50 dark:bg-be-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-be-900 mb-4">Hospital Reading Corners</h2>
              <p className="text-be-600 dark:text-zinc-400 mb-6">
                Small reading corners in hospital wards where volunteers read with patients and families.
              </p>
              <dl className="space-y-4 text-be-700 dark:text-zinc-400">
                <div>
                  <dt className="font-medium">Location</dt>
                  <dd>Nairobi, Kenya</dd>
                </div>
                <div>
                  <dt className="font-medium">Year</dt>
                  <dd>2024</dd>
                </div>
                <div>
                  <dt className="font-medium">Why It Matters</dt>
                  <dd>
                    Healing is not only medical. Stories and presence restore dignity.
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative">
              <Image
                src="/images/project-hospital.jpg"
                alt="Hospital reading corner in use"
                className="rounded-2xl w-full h-[400px] object-cover"
                width={800}
                height={500}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
}