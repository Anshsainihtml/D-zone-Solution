export default function NotesPage() {
  const notes = [
    {
      id: 1,
      title: "DFA – Financial Accounting Notes",
      course: "DFA",
      topics: 12,
      description: "Tally Prime, GST, TDS, accounting fundamentals, voucher entries",
    },
    {
      id: 2,
      title: "DCA – Computer Applications Notes",
      course: "DCA",
      topics: 9,
      description: "MS Office, Windows OS, Internet basics, Email, typing",
    },
    {
      id: 3,
      title: "ADCA – Advanced Computer Applications",
      course: "ADCA",
      topics: 14,
      description: "Advanced MS Office, Excel automation, Tally basics, CorelDraw",
    },
    {
      id: 4,
      title: "CCC – Computer Concepts Notes",
      course: "CCC",
      topics: 11,
      description: "LibreOffice, Internet tools, cyber security, digital financial tools",
    },
    {
      id: 5,
      title: "O Level – NIELIT Certification Notes",
      course: "O Level",
      topics: 8,
      description: "IT tools, HTML/CSS, Python programming, database basics",
    },
    {
      id: 6,
      title: "Tally Prime with GST Notes",
      course: "Tally",
      topics: 8,
      description: "Accounting fundamentals, GST configuration, payroll management",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Study Notes</h1>
          <p className="text-xl text-gray-200">
            Access comprehensive study notes for all our courses
          </p>
        </div>
      </section>

      {/* Notes */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-200"
              >
                <span className="text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">
                  {note.course}
                </span>
                <h3 className="text-xl font-bold mt-4 mb-2">{note.title}</h3>
                <p className="text-gray-700 mb-4 text-sm">{note.description}</p>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p>📖 Topics: {note.topics}</p>
                </div>

                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition">
                  View Notes
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Notice */}
      <section className="bg-yellow-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700">
            ⏳ अधिक विस्तृत नोट्स शीघ्र जोड़े जाएंगे
          </p>
        </div>
      </section>
    </main>
  );
}
