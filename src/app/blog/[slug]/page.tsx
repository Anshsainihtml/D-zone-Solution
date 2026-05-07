type BlogPostPageProps = {
  params?: Promise<{ slug: string }>
  searchParams?: Promise<any>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const slug = resolvedParams?.slug ?? ''
  const posts = [
    {
      id: 1,
      title: "What is CCA Course? Complete Guide for Beginners by Nice Academy Bilari",
      slug: "what-is-cca-course-complete-guide-for-beginners-by-nice-academy-bilari",
      category: "cca",
      date: "Dec 18, 2025",
      content: `
        <h2>Introduction to CCA Course</h2>
        <p>Nice Academy Bilari में CCA (Certificate in Computer Applications) course computer learning का perfect starting point है। यह course उन students के लिए ideal है जो computer से शुरुआत करना चाहते हैं।</p>

        <h3>What You'll Learn</h3>
        <ul>
          <li>Computer Fundamentals</li>
          <li>MS Office (Word, Excel, PowerPoint)</li>
          <li>Internet & Email</li>
          <li>Typing Skills</li>
          <li>Basic Digital Literacy</li>
        </ul>

        <h3>Course Duration</h3>
        <p>CCA course typically takes 2-3 months to complete, depending on the student's learning pace.</p>

        <h3>Career Opportunities</h3>
        <p>After completing CCA, students can pursue higher courses like DCA, ADCA, or directly enter the job market for basic computer operator roles.</p>
      `,
      excerpt: "Bilari, Kundarki और आसपास के students के लिए computer learning का perfect first step"
    },
    {
      id: 2,
      title: "What is NIELIT CCC Course? Complete Guide for Beginners by Nice Academy Bilari",
      slug: "what-is-nielit-ccc-course-complete-guide-for-beginners-by-nice-academy-bilari",
      category: "ccc",
      date: "Dec 18, 2025",
      content: `
        <h2>Understanding NIELIT CCC Course</h2>
        <p>CCC (Course on Computer Concepts) एक government recognized certification है जो computer literacy के लिए essential है। Nice Academy Bilari में हम इस course को practical तरीके से सिखाते हैं।</p>

        <h3>Course Syllabus</h3>
        <ul>
          <li>Introduction to Computer</li>
          <li>Introduction to GUI Based Operating System</li>
          <li>Elements of Word Processing</li>
          <li>Spreadsheets</li>
          <li>Introduction to Internet</li>
          <li>WWW and Web Browsers</li>
          <li>Communication and Collaboration</li>
          <li>Making Small Presentations</li>
        </ul>

        <h3>Examination Pattern</h3>
        <p>CCC exam consists of 100 multiple choice questions to be answered in 90 minutes. Passing marks are 50 out of 100.</p>

        <h3>Benefits</h3>
        <p>CCC certification is recognized by government departments and many private organizations for computer literacy requirements.</p>
      `,
      excerpt: "Bilari, Kundarki और आसपास के students के लिए basic computer knowledge का best starting point"
    },
    {
      id: 3,
      title: "What is DFA Course? Complete Guide for Beginners by Nice Academy Bilari",
      slug: "what-is-dfa-course-complete-guide-for-beginners-by-nice-academy-bilari",
      category: "dfa",
      date: "Dec 18, 2025",
      content: `
        <h2>Diploma in Financial Accounting (DFA) Course</h2>
        <p>DFA course accounting और finance के क्षेत्र में career बनाने के लिए perfect foundation प्रदान करता है। Nice Academy Bilari में हम Tally, GST, और practical accounting skills सिखाते हैं।</p>

        <h3>Course Modules</h3>
        <ul>
          <li>Accounting Fundamentals</li>
          <li>Tally Prime Software</li>
          <li>GST (Goods and Services Tax)</li>
          <li>TDS (Tax Deducted at Source)</li>
          <li>Financial Statements</li>
          <li>Bank Reconciliation</li>
          <li>Payroll Management</li>
        </ul>

        <h3>Practical Training</h3>
        <p>हमारे institute में 100% practical training दी जाती है। Students real business scenarios पर काम करते हैं।</p>

        <h3>Career Prospects</h3>
        <p>DFA pass करने के बाद students accountant, tax consultant, या business executive के रूप में career बना सकते हैं।</p>
      `,
      excerpt: "Bilari, Kundarki और आसपास के students के लिए DFA करके accounting career का practical roadmap"
    }
  ];

  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen bg-white">
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
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
          <div className="max-w-4xl">
            <span className="text-sm bg-zinc-900 text-white px-3 py-1 rounded-full mb-4 inline-block uppercase">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-xl text-gray-200 mb-4">{post.excerpt}</p>
            <p className="text-sm text-gray-300">Published on {post.date}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Read More Articles</h2>
          <a href="/blog">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition">
              View All Blogs
            </button>
          </a>
        </div>
      </section>
    </main>
  );
}
