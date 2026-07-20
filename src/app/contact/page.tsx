import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-200">
            Get in touch with D-Zone Solutions Noorpur
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Course Interest
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black">
                    <option>Select a course</option>
                    <option>DFA</option>
                    <option>DCA</option>
                    <option>ADCA</option>
                    <option>CCC</option>
                    <option>O Level</option>
                    <option>Tally Prime</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black h-32"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black transition">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    📍 Location
                  </h3>
                  <p className="text-gray-700">
                    Noorpur Bijnor 
                    <br />
                    Uttar Pradesh, India
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    📞 Phone
                  </h3>
                  <p className="text-gray-700">
                    +91-9690285688, +91-8171553911
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    📧 Email
                  </h3>
                  <p className="text-gray-700">
                    info@dzonesolutions.in
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-black mb-2">
                    🕒 Working Hours
                  </h3>
                  <p className="text-gray-700">
                    Monday - Saturday: 9:00 AM - 6:00 PM

                    <br />
                    Sunday: Closed
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-black mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black"
                    >
                      YouTube
                    </a>
                    <a
                      href="#"
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                    >
                      Instagram
                    </a>
                    <a
                      href="#"
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-zinc-950"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
