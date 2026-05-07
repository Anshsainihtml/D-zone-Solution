"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = (await response.json()) as { courses: Course[] };
        setCourses(data.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">All Courses</h1>
            <p className="text-xl text-gray-200">Loading courses...</p>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">All Courses</h1>
          <p className="text-xl text-gray-200">
            DFA, DCA, ADCA, CCC, O Level, Tally और सभी courses
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-200"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <span className="text-sm bg-zinc-100 text-black px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <h3 className="text-xl font-bold mt-4 mb-2">{course.title}</h3>
                <p className="text-gray-700 mb-4 text-sm">{course.description}</p>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p>⏱️ Duration: {course.duration}</p>
                  <p>👥 Students: {course.studentsCount}+</p>
                  <p>👨‍🏫 Instructor: {course.instructor}</p>
                  <p>📚 Modules: {course.modules.length}</p>
                </div>

                <div className="flex flex-col gap-3">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="w-full text-center bg-black text-white py-2 rounded-lg font-semibold hover:bg-zinc-900 transition"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full text-center border border-black text-black py-2 rounded-lg font-semibold hover:bg-black hover:text-white transition"
                  >
                    Enroll Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-zinc-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">अपनी सीखने की यात्रा शुरू करें</h2>
          <p className="text-gray-700 mb-8">
            निकट भविष्य में नामांकन शुरू होगा। अभी संपर्क करें।
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition">
            Contact Us for Enrollment
          </button>
        </div>
      </section>
    </main>
  );
}
