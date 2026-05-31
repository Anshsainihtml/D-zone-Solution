"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  duration: string;
  studentsCount: number;
  instructor: string;
  image: string;
  modules: Array<{ id: string; title: string; description: string; order: number }>;
}

export default function CoursePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = (await response.json()) as { courses: Course[] };
        const foundCourse = data.courses.find(c => c.slug === slug);
        
        if (!foundCourse) {
          setError('Course not found');
        } else {
          setCourse(foundCourse);
        }
      } catch (error) {
        console.error('Failed to fetch course:', error);
        setError('Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCourse();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading course...</p>
          </div>
        </section>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="min-h-screen bg-white">
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-black mb-4">Course Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The course you are looking for does not exist.'}</p>
            <Link href="/courses">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-zinc-900 transition">
                Back to Courses
              </button>
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-zinc-100 py-10">
        <div className="container mx-auto px-4">
          <Link href="/courses" className="mb-6 inline-block text-sm font-medium uppercase tracking-[0.25em] text-zinc-600 hover:text-black">
            ← Back to Courses
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
            <div className="rounded-[30px] overflow-hidden border border-zinc-200 bg-white shadow-xl">
              {course.image ? (
                <img src={course.image} alt={course.title} className="h-105 w-full object-cover" />
              ) : (
                <div className="h-48 w-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              <div className="bg-linear-to-t from-black/90 via-black/40 to-transparent p-8 text-white">
                <span className="inline-flex rounded-full bg-black/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                  {course.category}
                </span>
                <h1 className="mt-6 text-4xl font-bold leading-tight">{course.title}</h1>
                <p className="mt-4 max-w-2xl text-base text-zinc-200">{course.description}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-200">
                  <span className="rounded-full bg-white/10 px-3 py-2">{course.duration}</span>
                  <span className="rounded-full bg-white/10 px-3 py-2">{course.studentsCount}+ Students</span>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-zinc-200 bg-white p-8 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-700">
                  {course.category}
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-bold text-black">{course.title}</h2>
              <p className="mt-4 text-zinc-600 leading-relaxed">{course.description}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Duration</p>
                  <p className="mt-2 text-lg font-semibold text-black">{course.duration}</p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Instructor</p>
                  <p className="mt-2 text-lg font-semibold text-black">{course.instructor}</p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Modules</p>
                  <p className="mt-2 text-lg font-semibold text-black">{course.modules.length}</p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Students</p>
                  <p className="mt-2 text-lg font-semibold text-black">{course.studentsCount}+</p>
                </div>
              </div>

              <Link href="/contact">
                <button className="mt-8 w-full rounded-3xl bg-black px-6 py-4 text-base font-semibold text-white transition hover:bg-zinc-900">
                  Enroll Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_0.9fr]">
            <div>
              <h3 className="text-3xl font-bold text-black">Course Details</h3>
              <p className="mt-6 text-zinc-700 leading-relaxed">{course.description}</p>

              <h3 className="mt-12 text-3xl font-bold text-black">Course Modules</h3>
              {course.modules && course.modules.length > 0 ? (
                <div className="mt-6 grid gap-4">
                  {course.modules.map((module) => (
                    <div key={module.id} className="flex gap-3 rounded-3xl border border-zinc-200 bg-white p-5">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-black text-white font-semibold">
                        {module.order}
                      </span>
                      <div>
                        <p className="font-semibold text-black">{module.title}</p>
                        {module.description && (
                          <p className="text-sm text-zinc-600 mt-1">{module.description}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-zinc-600">No modules available yet.</p>
              )}
            </div>

            <aside>
              <div className="rounded-[30px] border border-zinc-200 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-black">Course Summary</h3>
                <div className="mt-6 space-y-4 text-zinc-700">
                  <div className="flex justify-between border-b border-zinc-200 pb-3">
                    <span>Duration</span>
                    <strong>{course.duration}</strong>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 pb-3">
                    <span>Modules</span>
                    <strong>{course.modules.length}</strong>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 pb-3">
                    <span>Students</span>
                    <strong>{course.studentsCount}+</strong>
                  </div>
                  <div className="flex justify-between pt-3 text-lg font-semibold text-black">
                    <span>Instructor</span>
                    <span>{course.instructor}</span>
                  </div>
                </div>
                <Link href="/contact">
                  <button className="mt-8 w-full rounded-3xl bg-black px-6 py-4 text-base font-semibold text-white transition hover:bg-zinc-900">
                    Enroll Now
                  </button>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
