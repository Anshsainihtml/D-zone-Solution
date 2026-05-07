import { NextResponse } from 'next/server'

// Sample test questions
const testQuestions = {
  dfa: [
    {
      id: '1',
      question: 'What is the accounting equation?',
      options: [
        'Assets = Liabilities + Equity',
        'Assets = Liabilities - Equity',
        'Assets + Liabilities = Equity',
        'Assets - Liabilities = Equity'
      ],
      correctAnswer: 'Assets = Liabilities + Equity',
      explanation: 'The fundamental accounting equation states that Assets = Liabilities + Owner\'s Equity'
    },
    {
      id: '2',
      question: 'Which of the following is a current asset?',
      options: [
        'Building',
        'Accounts Receivable',
        'Land',
        'Equipment'
      ],
      correctAnswer: 'Accounts Receivable',
      explanation: 'Accounts Receivable is money owed to the business and is expected to be collected within one year'
    },
    {
      id: '3',
      question: 'What does GAAP stand for?',
      options: [
        'Generally Accepted Accounting Principles',
        'General Accounting and Auditing Procedures',
        'Government Accounting and Auditing Principles',
        'Global Accounting and Auditing Practices'
      ],
      correctAnswer: 'Generally Accepted Accounting Principles',
      explanation: 'GAAP refers to the standard framework of guidelines for financial accounting'
    }
  ],
  dca: [
    {
      id: '1',
      question: 'What does MS Excel primarily use for calculations?',
      options: [
        'Formulas and Functions',
        'Charts only',
        'Text formatting',
        'Database management'
      ],
      correctAnswer: 'Formulas and Functions',
      explanation: 'MS Excel uses formulas and functions to perform calculations on data'
    },
    {
      id: '2',
      question: 'Which key combination is used to save a document in MS Word?',
      options: [
        'Ctrl + S',
        'Ctrl + P',
        'Ctrl + C',
        'Ctrl + V'
      ],
      correctAnswer: 'Ctrl + S',
      explanation: 'Ctrl + S is the keyboard shortcut to save a document in MS Word'
    }
  ],
  ccc: [
    {
      id: '1',
      question: 'What is the main function of an operating system?',
      options: [
        'Create documents',
        'Manage computer hardware and software',
        'Browse the internet',
        'Play games'
      ],
      correctAnswer: 'Manage computer hardware and software',
      explanation: 'The operating system manages computer resources and provides services to programs'
    },
    {
      id: '2',
      question: 'Which device is used for data input?',
      options: [
        'Monitor',
        'Printer',
        'Keyboard',
        'Speaker'
      ],
      correctAnswer: 'Keyboard',
      explanation: 'A keyboard is an input device used to enter data into a computer'
    }
  ],
  'o-level-m1': [
    {
      id: '1',
      question: 'What is the full form of IT?',
      options: [
        'Information Technology',
        'Internet Technology',
        'International Technology',
        'Integrated Technology'
      ],
      correctAnswer: 'Information Technology',
      explanation: 'IT stands for Information Technology'
    },
    {
      id: '2',
      question: 'Which of the following is an input device?',
      options: [
        'Monitor',
        'Printer',
        'Keyboard',
        'Speaker'
      ],
      correctAnswer: 'Keyboard',
      explanation: 'Keyboard is used to input data into the computer'
    }
  ],
  'o-level-m2': [
    {
      id: '1',
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'High Tech Modern Language',
        'Home Tool Markup Language',
        'Hyperlink and Text Markup Language'
      ],
      correctAnswer: 'Hyper Text Markup Language',
      explanation: 'HTML stands for Hyper Text Markup Language'
    },
    {
      id: '2',
      question: 'Which tag is used to create a hyperlink in HTML?',
      options: [
        '<link>',
        '<a>',
        '<href>',
        '<url>'
      ],
      correctAnswer: '<a>',
      explanation: 'The <a> tag is used to create hyperlinks in HTML'
    }
  ],
  'o-level-m3': [
    {
      id: '1',
      question: 'What is a variable in programming?',
      options: [
        'A fixed value',
        'A container for storing data',
        'A type of loop',
        'A function name'
      ],
      correctAnswer: 'A container for storing data',
      explanation: 'Variables are containers for storing data values'
    },
    {
      id: '2',
      question: 'Which of the following is a programming language?',
      options: [
        'HTML',
        'CSS',
        'JavaScript',
        'All of the above'
      ],
      correctAnswer: 'All of the above',
      explanation: 'HTML, CSS, and JavaScript are all programming languages'
    }
  ],
  'o-level-m4': [
    {
      id: '1',
      question: 'What does IoT stand for?',
      options: [
        'Internet of Things',
        'Internet of Technology',
        'Integrated Online Technology',
        'Intelligent Operating Technology'
      ],
      correctAnswer: 'Internet of Things',
      explanation: 'IoT stands for Internet of Things'
    },
    {
      id: '2',
      question: 'Which protocol is commonly used in IoT devices?',
      options: [
        'HTTP',
        'MQTT',
        'FTP',
        'SMTP'
      ],
      correctAnswer: 'MQTT',
      explanation: 'MQTT is a lightweight messaging protocol commonly used in IoT'
    }
  ]
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const course = searchParams.get('course')

    if (!course || !testQuestions[course as keyof typeof testQuestions]) {
      return NextResponse.json({
        error: 'Invalid course specified'
      }, { status: 400 })
    }

    const questions = testQuestions[course as keyof typeof testQuestions]

    return NextResponse.json({
      course,
      questions: questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
      })),
      totalQuestions: questions.length
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch test questions' },
      { status: 500 }
    )
  }
}

interface AnswerItem {
  questionId: string;
  answer: string;
}

interface TestRequestBody {
  course: keyof typeof testQuestions;
  answers: AnswerItem[];
}

interface TestResultItem {
  questionId: string;
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export async function POST(request: Request) {
  try {
    const { course, answers } = (await request.json()) as TestRequestBody

    if (!course || !testQuestions[course]) {
      return NextResponse.json({
        error: 'Invalid course specified'
      }, { status: 400 })
    }

    const questions = testQuestions[course]
    let correct = 0
    const results: TestResultItem[] = []

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i]
      const userAnswer = answers[i]?.answer ?? ''
      const isCorrect = userAnswer === question.correctAnswer

      if (isCorrect) correct++

      results.push({
        questionId: question.id,
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      })
    }

    const score = Math.round((correct / questions.length) * 100)

    return NextResponse.json({
      course,
      score,
      correct,
      total: questions.length,
      results,
      passed: score >= 60 // 60% passing criteria
    })

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit test' },
      { status: 500 }
    )
  }
}