export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">About D-Zone Solutions</h1>
          <p className="text-xl text-gray-200">
            Excellence in Computer Education Since 2021
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4">
              D-Zone Solutions पिछले 5+ वर्षों से Noorpur का सबसे
              trusted, experienced और best computer institute है। हमने अब तक
              हजारों students को computer education, accounting skills और
              digital training देकर उनका career strong बनाया है।
            </p>
            <p className="text-gray-700 mb-6">
              हमारे institute का focus सिर्फ computer सिखाना नहीं, बल्कि students
              को real-world में काम करने लायक बनाना है। Practical classes, expert
              guidance और industry-level curriculum की मदद से students Master
              बन जाते हैं।
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-12 bg-zinc-100 p-8 rounded-lg">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-black">5+</h3>
                <p className="text-gray-600 mt-2">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-black">3000+</h3>
                <p className="text-gray-600 mt-2">Students Trained</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-black">8+</h3>
                <p className="text-gray-600 mt-2">Courses Offered</p>
              </div>
              <div className="text-center">
                <h3 className="text-4xl font-bold text-black">98%</h3>
                <p className="text-gray-600 mt-2">Success Rate</p>
              </div>
            </div>

            {/* Why Choose Us */}
            <h2 className="text-3xl font-bold mb-6">Why Choose D-Zone Solutions?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-gradient-to-br from-zinc-100 to-zinc-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-black mb-3">
                  Expert Instructors
                </h3>
                <p className="text-gray-700">
                  Our instructors have 5+ years of experience in computer education
                  and industry.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-green-600 mb-3">
                  Practical Training
                </h3>
                <p className="text-gray-700">
                  We focus on hands-on learning with real-world projects and
                  scenarios.
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-yellow-600 mb-3">
                  Industry-Level Curriculum
                </h3>
                <p className="text-gray-700">
                  Updated curriculum aligned with industry standards and requirements.
                </p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-600 mb-3">
                  Affordable Fees
                </h3>
                <p className="text-gray-700">
                  Quality education at prices accessible to all sections of society.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-purple-600 mb-3">
                  Certificate Programs
                </h3>
                <p className="text-gray-700">
                  Recognized certificates that boost your career prospects.
                </p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-indigo-600 mb-3">
                  Placement Support
                </h3>
                <p className="text-gray-700">
                  Career guidance and placement assistance after course completion.
                </p>
              </div>
            </div>

            {/* Team */}
            <h2 className="text-3xl font-bold mb-6">Our Team</h2>
            <div id="team" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
                <div className="bg-zinc-200 w-24 h-24 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Zubair Sir</h3>
                <p className="text-black font-semibold">Director & Instructor</p>
                <p className="text-gray-600 text-sm mt-2">
                  3+ years of experience in computer education
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
                <div className="bg-green-200 w-24 h-24 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Team Member 2</h3>
                <p className="text-green-600 font-semibold">Senior Instructor</p>
                <p className="text-gray-600 text-sm mt-2">
                  Specialized in accounting and finance courses
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 text-center border border-gray-200">
                <div className="bg-zinc-300 w-24 h-24 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">Team Member 3</h3>
                <p className="text-black font-semibold">Instructor</p>
                <p className="text-gray-600 text-sm mt-2">
                  Expert in practical computer applications
                </p>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">Our Mission</h3>
                <p className="text-gray-700">
                  To provide quality, affordable computer education and accounting
                  training that empowers students to build successful careers in the
                  digital age.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-4">Our Vision</h3>
                <p className="text-gray-700">
                  To be the most trusted and leading computer institute in the region,
                  known for excellence in education, practical training, and student
                  success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
