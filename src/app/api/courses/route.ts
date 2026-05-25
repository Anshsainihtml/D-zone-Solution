import { NextResponse } from 'next/server'

// Sample course data
const courses = [
  {
    id: '1',
    title: 'Diploma in Financial Accounting (DFA)',
    slug: 'dfa-diploma-in-financial-accounting',
    description: 'Complete course on financial accounting principles and practices',
    about: 'DFA course provides practical accounting skills for students and working professionals who want to build a strong career in finance. Learn ledger posting, GST, TDS, financial reporting, and bookkeeping using real-world examples.',
    category: 'Finance & Accounting',
    duration: '6 months',
    level: 'Beginner',
    price: '₹4,500',
    studentsCount: 1250,
    instructor: 'CA Rajesh Kumar',
    image: '/images/courses/DFA.webp',
    whatYouLearn: [
      'Financial accounting fundamentals',
      'Balance sheet and profit-loss statement',
      'GST and taxation basics',
      'Bookkeeping and ledger entry',
      'Practical accounting for businesses'
    ],
    features: [
      'Certificate of completion',
      'Practical accounting projects',
      'Classroom and online support',
      'Job assistance guidance'
    ],
    modules: [
      { id: '1', title: 'Introduction to Accounting', description: 'Basic concepts and principles', order: 1 },
      { id: '2', title: 'Financial Statements', description: 'Balance Sheet, P&L Account', order: 2 },
      { id: '3', title: 'Advanced Accounting', description: 'Complex accounting scenarios', order: 3 }
    ]
  },
  {
    id: '2',
    title: 'Diploma in Computer Applications (DCA)',
    slug: 'dca-diploma-in-computer-applications',
    description: 'Comprehensive computer applications training',
    about: 'DCA covers Microsoft Office, internet, email, and database fundamentals for office work, government exams, and professional certification across Bilari, Kundarki, and Moradabad.',
    category: 'Computer Applications',
    duration: '6 months',
    level: 'Beginner',
    price: '₹7,000',
    studentsCount: 2100,
    instructor: 'Mr. Amit Sharma',
    image: '/images/courses/DCA.webp',
    whatYouLearn: [
      'MS Word, Excel, PowerPoint',
      'Internet and email skills',
      'Basic database management',
      'Typing and digital filing',
      'Office applications for jobs'
    ],
    features: [
      'Self-paced learning',
      'Practice material included',
      'Certificate with institute seal',
      'Qualified trainer support'
    ],
    modules: [
      { id: '1', title: 'MS Office Suite', description: 'Word, Excel, PowerPoint', order: 1 },
      { id: '2', title: 'Internet & Email', description: 'Web browsing and communication', order: 2 },
      { id: '3', title: 'Database Management', description: 'MS Access basics', order: 3 }
    ]
  },
  {
    id: '3',
    title: 'Advanced Diploma in Computer Applications (ADCA)',
    slug: 'adca-advanced-diploma-in-computer-applications',
    description: 'Advanced computer applications and programming',
    about: 'ADCA is designed for students who want deeper computer skills, programming basics, and office automation knowledge. It prepares learners for IT and business computing roles.',
    category: 'Computer Applications',
    duration: '12 months',
    level: 'Intermediate',
    price: '₹13000',
    studentsCount: 950,
    instructor: 'Ms. Priya Singh',
    image: '/images/courses/ADCA.webp',
    whatYouLearn: [
      'Advanced MS Office functions',
      'Programming fundamentals with C and C++',
      'Web design basics using HTML/CSS',
      'Database creation and queries',
      'Real-world project practice'
    ],
    features: [
      'Project-based learning',
      'Detailed study notes',
      'Exam preparation support',
      'Industry-relevant syllabus'
    ],
    modules: [
      { id: '1', title: 'Advanced MS Office', description: 'Macros, advanced Excel', order: 1 },
      { id: '2', title: 'Programming Fundamentals', description: 'C, C++, Java basics', order: 2 },
      { id: '3', title: 'Web Development', description: 'HTML, CSS, JavaScript', order: 3 },
      { id: '4', title: 'Database Design', description: 'SQL and database concepts', order: 4 }
    ]
  },
  {
    id: '4',
    title: 'Course on Computer Concepts (CCC)',
    slug: 'ccc-course-on-computer-concepts',
    description: 'Basic computer concepts and applications',
    about: 'CCC course is ideal for students, job-seekers, and professionals who need essential digital literacy. It covers MS Office, internet, typing, and computer fundamentals required for school, office, and government exam success.',
    category: 'Computer Basics',
    duration: '3 months',
    level: 'Beginner',
    price: '₹3,000',
    studentsCount: 3200,
    instructor: 'Mr. Vijay Kumar',
    image: '/images/courses/CCC.webp',
    whatYouLearn: [
      'Computer fundamentals and hardware basics',
      'Operating system functions',
      'MS Office applications',
      'Email, internet, and digital services',
      'Hindi and English typing skills'
    ],
    features: [
      'Beginner-friendly course',
      'Certificate on completion',
      'Practical lab sessions',
      'Job support guidance'
    ],
    modules: [
      { id: '1', title: 'Computer Fundamentals', description: 'Hardware and software basics', order: 1 },
      { id: '2', title: 'Operating Systems', description: 'Windows basics', order: 2 },
      { id: '3', title: 'Basic Applications', description: 'MS Office essentials', order: 3 }
    ]
  },
  {
    id: '5',
    title: 'O Level (DOEACC)',
    slug: 'o-level-nielit-certification-course',
    description: 'Government recognized computer course',
    about: 'O Level prepares learners for NIELIT certification with strong training in IT tools, programming, and practical application development. It suits students seeking a government-recognized computer qualification.',
    category: 'Government Certification',
    duration: '12 months',
    level: 'Beginner to Intermediate',
    price: '₹12000',
    studentsCount: 750,
    instructor: 'Dr. Rakesh Gupta',
    image: '/images/courses/OLevel.webp',
    whatYouLearn: [
      'IT tools and applications',
      'Programming and logic building',
      'Web and database development',
      'Project work and presentation skills',
      'Government exam readiness'
    ],
    features: [
      'NIELIT aligned syllabus',
      'Project and practical classes',
      'Certificate support',
      'Exam guidance sessions'
    ],
    modules: [
      { id: '1', title: 'IT Tools & Applications', description: 'MS Office and internet', order: 1 },
      { id: '2', title: 'Programming & Problem Solving', description: 'C programming', order: 2 },
      { id: '3', title: 'Application Development', description: 'Project work', order: 3 }
    ]
  },
  {
    id: '6',
    title: 'Tally ERP 9',
    slug: 'tally-prime-with-gst-complete-business-accounting-course',
    description: 'Complete accounting software training',
    about: 'Tally ERP 9 course teaches complete business accounting with GST and inventory management. Ideal for students and small business owners who want to manage accounts, taxation, and stock efficiently.',
    category: 'Accounting Software',
    duration: '3 months',
    level: 'Beginner',
    price: '₹4,500',
    studentsCount: 1800,
    instructor: 'CA Manoj Jain',
    image: '/images/courses/TallyPrime.webp',
    whatYouLearn: [
      'Tally installation and company creation',
      'Vouchers, ledgers, and entries',
      'Inventory and stock management',
      'GST and taxation processing',
      'Business accounting reports'
    ],
    features: [
      'Live Tally practice',
      'GST filing training',
      'Job readiness workshops',
      'Completion certificate'
    ],
    modules: [
      { id: '1', title: 'Tally Installation', description: 'Setup and configuration', order: 1 },
      { id: '2', title: 'Company Creation', description: 'Setting up business', order: 2 },
      { id: '3', title: 'Accounting Entries', description: 'Vouchers and transactions', order: 3 },
      { id: '4', title: 'Inventory Management', description: 'Stock and inventory', order: 4 },
      { id: '5', title: 'GST & Taxation', description: 'Tax compliance', order: 5 }
    ]
  }
]

export async function GET() {
  try {
    return NextResponse.json({ courses })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}