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

export default function Home() {
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

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="w-full max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Best Computer Institute in Noorpur
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200">
              D-Zone Solutions - पिछले 5+ वर्षों से सबसे trusted computer institute
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/courses">
                <button className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                  View Courses
                </button>
              </Link>
              <Link href="/contact">
                <button className="w-full sm:w-auto border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-black">8+</h3>
              <p className="text-gray-600 mt-2">Premium Courses</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-black">3000+</h3>
              <p className="text-gray-600 mt-2">Active Students</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-black">98%</h3>
              <p className="text-gray-600 mt-2">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About D-Zone Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 mb-4">
                D-Zone Solutions पिछले 5+ वर्षों से और अब Noorpur का सबसे
                trusted, experienced और best computer institute है। हमने अब तक
                हजारों students को computer education, accounting skills और
                digital training देकर उनका career strong बनाया है।
              </p>
              <p className="text-gray-700">
                हमारे institute का focus सिर्फ computer सिखाना नहीं, बल्कि
                students को real-world में काम करने लायक बनाना है। Practical
                classes, expert guidance और industry-level curriculum की मदद से
                students में master बन जाते हैं।
              </p>
            </div>
            <div className="bg-zinc-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Experienced instructors with 5+ years</li>
                <li>✓ Practical, hands-on training</li>
                <li>✓ Industry-level curriculum</li>
                <li>✓ Affordable fees</li>
                <li>✓ Certificate programs</li>
                <li>✓ Placement assistance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Popular Courses</h2>
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.slice(0, 3).map((course) => (
                  <div key={course.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-500 text-center">No image available</span>
                      </div>
                    )}
                    <span className="text-sm bg-zinc-100 text-black px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                    <h3 className="text-xl font-bold mt-4 mb-2">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{course.duration}</p>
                    <p className="text-gray-700 mb-4">{course.studentsCount}+ Students</p>
                    <Link href={`/courses/${course.slug}`}>
                      <button className="text-black font-semibold hover:text-black">
                        Learn More →
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/courses">
                  <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition">
                    View All Courses
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Practice Tests & MCQs Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Practice Tests & MCQs</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            8300+ MCQs के साथ chapter-wise practice करें। DFA, DCA, ADCA, CCC, O Level, Tally और सभी courses के लिए test questions।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Diploma in Computer Applications",
                chapters: "6 Chapters",
                questions: "50 MCQs",
                slug: "dca",
                description: "MS Office, Windows & Internet MCQs"
              },
              {
                title: "IT Tools and Business Systems",
                chapters: "19 Chapters",
                questions: "2,180 MCQs",
                slug: "o-level-m1",
                description: "Module 1 (M1-R5) MCQ practice"
              },
              {
                title: "Web Design and Development",
                chapters: "28 Chapters",
                questions: "1,120 MCQs",
                slug: "o-level-m2",
                description: "Module 2 (M2-R5) MCQ practice"
              },
              {
                title: "Introduction to Programming",
                chapters: "39 Chapters",
                questions: "850 MCQs",
                slug: "o-level-m3",
                description: "Module 3 (M3-R5) MCQ practice"
              },
              {
                title: "Introduction to IoT",
                chapters: "46 Chapters",
                questions: "1,168 MCQs",
                slug: "o-level-m4",
                description: "Module 4 (M4-R5) MCQ practice"
              },
              {
                title: "Diploma in Financial Accounting",
                chapters: "12 Chapters",
                questions: "600 MCQs",
                slug: "dfa",
                description: "Tally Prime, GST, TDS & Accounting MCQs",
                comingSoon: true
              },
            ].map((test, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-200">
                <h3 className="text-xl font-bold mb-2">{test.title}</h3>
                <p className="text-gray-600 mb-4">{test.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{test.chapters}</span>
                  <span className="text-sm font-semibold text-black">{test.questions}</span>
                </div>
                {test.comingSoon ? (
                  <button className="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
                    Coming Soon
                  </button>
                ) : (
                  <Link href={`/tests/${test.slug}`}>
                    <button className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition">
                      Start Practice
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/tests">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition">
                View All Tests
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Course Notes Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Course Notes</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Access comprehensive study notes for all our courses - Coming Soon
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "DFA – Financial Accounting Notes",
                topics: "12 Topics",
                description: "Complete notes covering Tally Prime, GST, TDS, accounting fundamentals, voucher entries, and financial reporting",
                comingSoon: true
              },
              {
                title: "DCA – Computer Applications Notes",
                topics: "9 Topics",
                description: "Comprehensive guide to MS Office, Windows OS, Internet basics, Email, typing, and essential computer skills",
                comingSoon: true
              },
              {
                title: "ADCA – Advanced Computer Applications",
                topics: "14 Topics",
                description: "Advanced MS Office, Excel automation, Tally basics, CorelDraw, Photoshop, and professional DTP fundamentals",
                comingSoon: true
              },
              {
                title: "CCC – Computer Concepts Notes",
                topics: "11 Topics",
                description: "Complete CCC syllabus notes including LibreOffice, Internet tools, cyber security, and digital financial tools",
                comingSoon: true
              },
              {
                title: "O Level – NIELIT Certification Notes",
                topics: "8 Topics",
                description: "IT tools, HTML/CSS web development, Python programming, database basics, and complete O Level study material",
                comingSoon: true
              },
              {
                title: "Tally Prime with GST Notes",
                topics: "8 Topics",
                description: "Accounting fundamentals, GST configuration, inventory management, payroll, bank reconciliation, and P/L reports",
                comingSoon: true
              },
            ].map((note, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-200">
                <h3 className="text-xl font-bold mb-2">{note.title}</h3>
                <p className="text-gray-600 mb-4">{note.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-black">{note.topics}</span>
                  <span className="text-sm text-gray-500">{note.comingSoon ? "Coming Soon" : "Available"}</span>
                </div>
                {note.comingSoon ? (
                  <button className="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed">
                    Coming Soon
                  </button>
                ) : (
                  <Link href="/notes">
                    <button className="w-full bg-black text-white px-4 py-2 rounded-lg hover:bg-black transition">
                      View Notes
                    </button>
                  </Link>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/notes">
              <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition">
                View All Notes
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Computer Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Noorpur के हज़ारों students पहले से D-Zone Solutions में सीख रहे हैं
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/courses">
              <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                View All Courses
              </button>
            </Link>
            <Link href="/contact">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
