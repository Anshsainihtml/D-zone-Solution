import Link from "next/link"
import { notes } from "@/lib/notes"

export default function NotesPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Study Notes</h1>
          <p className="text-xl text-gray-200">
            Access comprehensive study notes for all our courses - Coming Soon
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Course Notes</h2>
          <p className="text-xl text-gray-600 mb-12 text-center">
            Access comprehensive study notes for all our courses - Coming Soon
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div key={note.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-200">
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
    </main>
  )
}
