import type { Metadata } from "next";
import Link from "next/link";
import MobileMenu from "../components/MobileMenu";
import "./globals.css";

export const metadata: Metadata = {
  title: "D-Zone Solutions Noorpur - Best Computer Institute",
  description: "Computer courses, accounting training, and digital education in noorpur. Join D-Zone Solutions for quality education at affordable fees.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-black">
              D-Zone Solutions
            </Link>

            <div className="hidden md:flex gap-8">
              <Link href="/" className="text-gray-700 hover:text-black transition">
                Home
              </Link>
              <Link href="/courses" className="text-gray-700 hover:text-black transition">
                Courses
              </Link>
              <Link href="/certificate" className="text-gray-700 hover:text-black transition">
                Certificate
              </Link>
              <Link href="/tests" className="text-gray-700 hover:text-black transition">
                Practice Tests
              </Link>
              <Link href="/notes" className="text-gray-700 hover:text-black transition">
                Notes
              </Link>
             
              <Link href="/about" className="text-gray-700 hover:text-black transition">
                About
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-black transition">
                Contact
              </Link>
            </div>

            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">D-Zone Solutions Noorpur</h3>
                <p className="text-gray-400">
                  Noorpur का सबसे trusted computer institute - Quality education at
                  affordable fees
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/" className="hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/certificate" className="hover:text-white">
                      Certificate
                    </Link>
                  </li>
                  <li>
                    <Link href="/about#team" className="hover:text-white">
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link href="/courses" className="hover:text-white">
                      All Courses
                    </Link>
                  </li>
                  <li>
                    <Link href="/notes" className="hover:text-white">
                      Study Notes
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.youtube.com/@niceacademybynadeemsir"
                    target="_blank"
                    className="text-gray-400 hover:text-white"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://www.instagram.com/niceacademyknd"
                    target="_blank"
                    className="text-gray-400 hover:text-white"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/niceacademyknd"
                    target="_blank"
                    className="text-gray-400 hover:text-white"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>© 2026 D-zone Solution Noorpur. All rights reserved.</p>
              <p className="mt-2">
                Made with <span className="text-red-500">♥</span> by{" "}
                <a
                  href="https://www.linkedin.com/in/naseem-ansari-25474b269/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white"
                >
                  Zubair Khan
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
