export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "What is CCA Course? Complete Guide for Beginners by Nice Academy Bilari",
      category: "cca",
      date: "Dec 18, 2025",
      excerpt:
        "Bilari, Kundarki और आसपास के students के लिए computer learning का perfect first step",
    },
    {
      id: 2,
      title:
        "What is NIELIT CCC Course? Complete Guide for Beginners by Nice Academy Bilari",
      category: "ccc",
      date: "Dec 18, 2025",
      excerpt:
        "Bilari, Kundarki और आसपास के students के लिए basic computer knowledge का best starting point",
    },
    {
      id: 3,
      title: "What is DFA Course? Complete Guide for Beginners by Nice Academy Bilari",
      category: "dfa",
      date: "Dec 18, 2025",
      excerpt:
        "Bilari, Kundarki और आसपास के students के लिए DFA करके accounting career का practical roadmap",
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Latest Blogs</h1>
          <p className="text-xl text-gray-200">
            Stay updated with the latest insights, tips, and trends in education
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-200"
              >
                <div className="bg-black h-40"></div>
                <div className="p-6">
                  <span className="text-sm bg-zinc-100 text-black px-3 py-1 rounded-full">
                    {post.category.toUpperCase()}
                  </span>
                  <h3 className="text-xl font-bold mt-4 mb-2">{post.title}</h3>
                  <p className="text-gray-700 mb-4 text-sm">{post.excerpt}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <button className="text-black font-semibold hover:text-black">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition">
              View All Blogs
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
