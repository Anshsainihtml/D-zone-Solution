import Link from "next/link";
import { notFound } from "next/navigation";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  about: string;
  category: string;
  duration: string;
  level: string;
  price: string;
  studentsCount: number;
  instructor: string;
  image: string;
  whatYouLearn: string[];
  features: string[];
  modules: Array<{ id: string; title: string; description: string; order: number }>;
}

async function getCourse(slug: string): Promise<Course | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/courses`, {
      cache: 'no-store'
    });
    const data = await response.json() as { courses: Course[] };
    return data.courses.find(course => course.slug === slug) || null;
  } catch (error) {
    console.error('Failed to fetch course:', error);
    return null;
  }
}

type CoursePageProps = {
  params?: Promise<{ slug: string }>
  searchParams?: Promise<any>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug ?? ''
  const course = await getCourse(slug);

  if (!course) {
    notFound();
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
              <img src={course.image} alt={course.title} className="h-105 w-full object-cover" />
              <div className="bg-linear-to-t from-black/90 via-black/40 to-transparent p-8 text-white">
                <span className="inline-flex rounded-full bg-black/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                  {course.category}
                </span>
                <h1 className="mt-6 text-4xl font-bold leading-tight">{course.title}</h1>
                <p className="mt-4 max-w-2xl text-base text-zinc-200">{course.description}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-zinc-200">
                  <span className="rounded-full bg-white/10 px-3 py-2">{course.duration}</span>
                  <span className="rounded-full bg-white/10 px-3 py-2">{course.level}</span>
                  <span className="rounded-full bg-white/10 px-3 py-2">{course.studentsCount}+ Students</span>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-zinc-200 bg-white p-8 shadow-xl">
              <div className="flex items-center justify-between gap-4">
                <span className="rounded-full border border-zinc-300 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-700">
                  {course.category}
                </span>
                <span className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white">
                  {course.price}
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-bold text-black">{course.title}</h2>
              <p className="mt-4 text-zinc-600 leading-relaxed">{course.about}</p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Duration</p>
                  <p className="mt-2 text-lg font-semibold text-black">{course.duration}</p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Level</p>
                  <p className="mt-2 text-lg font-semibold text-black">{course.level}</p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
                  <p className="text-sm uppercase tracking-[0.24em] text-zinc-500">Instructor</p>
                  <p className="mt-2 text-lg font-semibold text-black">{course.instructor}</p>
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

              <div className="mt-8 rounded-[30px] border border-zinc-200 bg-zinc-50 p-6">
                <h3 className="text-xl font-bold text-black">Course Features</h3>
                <div className="mt-5 grid gap-3">
                  {course.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 rounded-3xl border border-zinc-200 bg-white p-4">
                      <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">✓</span>
                      <p className="text-sm text-zinc-600">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1.5fr_0.9fr]">
            <div>
              <h3 className="text-3xl font-bold text-black">About This Course</h3>
              <p className="mt-6 text-zinc-700 leading-relaxed">{course.about}</p>

              <div className="mt-10 grid gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                  <h4 className="text-xl font-semibold text-black">Who Should Enroll?</h4>
                  <p className="mt-3 text-zinc-600">Students, job seekers, office staff, and government exam aspirants who want strong computer basics and digital literacy.</p>
                </div>
                <div className="rounded-3xl border border-zinc-200 bg-white p-6">
                  <h4 className="text-xl font-semibold text-black">Why Choose This Course?</h4>
                  <p className="mt-3 text-zinc-600">Get practical computer training, certificate support, typing practice, and job-ready skills from Nice Academy.</p>
                </div>
              </div>

              <h3 className="mt-12 text-3xl font-bold text-black">What You'll Learn</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {course.whatYouLearn.map((item) => (
                  <div key={item} className="flex gap-3 rounded-3xl border border-zinc-200 bg-white p-5">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-black text-white">✓</span>
                    <p className="text-zinc-700">{item}</p>
                  </div>
                ))}
              </div>
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
                    <span>Level</span>
                    <strong>{course.level}</strong>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 pb-3">
                    <span>Students</span>
                    <strong>{course.studentsCount}+</strong>
                  </div>
                  <div className="flex justify-between border-b border-zinc-200 pb-3">
                    <span>Instructor</span>
                    <strong>{course.instructor}</strong>
                  </div>
                  <div className="flex justify-between pt-3 text-lg font-semibold text-black">
                    <span>Course Fee</span>
                    <span>{course.price}</span>
                  </div>
                </div>
                <Link href="/contact">
                  <button className="mt-8 w-full rounded-3xl bg-black px-6 py-4 text-base font-semibold text-white transition hover:bg-zinc-900">
                    Enroll Now - {course.price}
                  </button>
                </Link>
              </div>

              <div className="mt-8 rounded-[30px] border border-zinc-200 bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-bold text-black">Our Facilities</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    'Free WiFi',
                    'Safe Parking',
                    'RO Drinking Water',
                    'Separate Computers',
                    'Free Printed Notes',
                    'Digital Board Study',
                    'Job Placement Support',
                    'Mock Tests'
                  ].map((facility) => (
                    <div key={facility} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-700">
                      {facility}
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Explore More Courses</h2>
          <Link href="/courses">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition">
              View All Courses
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
