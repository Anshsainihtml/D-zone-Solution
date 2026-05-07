"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  question: string;
  options: string[];
}

interface TestResult {
  course: string;
  score: number;
  correct: number;
  total: number;
  results: Array<{
    questionId: string;
    question: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    explanation: string;
  }>;
  passed: boolean;
}

const testInfo = {
  'dca': { name: 'Diploma in Computer Applications', description: 'MS Office, Windows & Internet MCQs' },
  'o-level-m1': { name: 'IT Tools and Business Systems', description: 'Module 1 (M1-R5) MCQ practice' },
  'o-level-m2': { name: 'Web Design and Development', description: 'Module 2 (M2-R5) MCQ practice' },
  'o-level-m3': { name: 'Introduction to Programming', description: 'Module 3 (M3-R5) MCQ practice' },
  'o-level-m4': { name: 'Introduction to IoT', description: 'Module 4 (M4-R5) MCQ practice' },
  'dfa': { name: 'Diploma in Financial Accounting', description: 'Tally Prime, GST, TDS & Accounting MCQs' }
};

type TestPageProps = {
  params?: Promise<{ slug: string }>
  searchParams?: Promise<any>
}

export default function TestPage({ params }: TestPageProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [testSlug, setTestSlug] = useState<string>("");
  const router = useRouter();

  const testData = testInfo[testSlug as keyof typeof testInfo];

  useEffect(() => {
    if (!params) {
      return;
    }

    params
      .then((resolved) => {
        setTestSlug(resolved.slug ?? '');
      })
      .catch(() => {
        setTestSlug('');
      });
  }, [params]);

  useEffect(() => {
    if (!testSlug) return;

    const fetchQuestions = async () => {
      try {
        // Map slug to course parameter
        const courseMap: { [key: string]: string } = {
          'dca': 'dca',
          'o-level-m1': 'o-level-m1',
          'o-level-m2': 'o-level-m2',
          'o-level-m3': 'o-level-m3',
          'o-level-m4': 'o-level-m4',
          'dfa': 'dfa'
        };

        const course = courseMap[testSlug];
        if (!course) {
          router.push('/tests');
          return;
        }

        const response = await fetch(`/api/tests?course=${course}`);
        const data = await response.json();
        setQuestions(data.questions);
        setAnswers(new Array(data.questions.length).fill(""));
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      } finally {
        setLoading(false);
      }
    };

    if (testSlug) {
      fetchQuestions();
    }
  }, [testSlug, router]);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course: testSlug,
          answers: answers.map((answer, index) => ({
            questionId: questions[index].id,
            answer
          }))
        }),
      });

      const data = await response.json();
      setResult(data);
      setShowResults(true);
    } catch (error) {
      console.error('Failed to submit test:', error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Loading Test...</h1>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          </div>
        </section>
      </main>
    );
  }

  if (!testData) {
    return (
      <main className="min-h-screen bg-white">
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Test Not Found</h1>
            <p className="text-xl text-gray-200">The requested test could not be found.</p>
          </div>
        </section>
      </main>
    );
  }

  if (showResults && result) {
    return (
      <main className="min-h-screen bg-white">
        {/* Header */}
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Test Results</h1>
            <p className="text-xl text-gray-200">{testData.name}</p>
          </div>
        </section>

        {/* Results */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Your Score</h2>
                <div className="text-6xl font-bold text-black mb-2">
                  {result.score}%
                </div>
                <p className="text-gray-600">
                  {result.correct} out of {result.total} questions correct
                </p>
                <div className={`mt-4 text-lg font-semibold ${result.passed ? 'text-green-600' : 'text-red-600'}`}>
                  {result.passed ? '✅ Passed' : '❌ Failed'}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Question Review</h3>
              {result.results.map((item, index) => (
                <div key={item.questionId} className={`p-6 rounded-lg border ${item.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm ${item.isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{item.question}</h4>
                      <div className="text-sm space-y-1">
                        <p><span className="font-medium">Your answer:</span> {item.userAnswer}</p>
                        <p><span className="font-medium">Correct answer:</span> {item.correctAnswer}</p>
                        <p className="text-gray-600 mt-2">{item.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => router.push('/tests')}
                className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-black transition mr-4"
              >
                Take Another Test
              </button>
              <button
                onClick={() => window.location.reload()}
                className="border border-black text-black px-8 py-3 rounded-lg font-semibold hover:bg-zinc-100 transition"
              >
                Retake This Test
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Test Not Available</h1>
            <p className="text-xl text-gray-200">This test is coming soon.</p>
          </div>
        </section>
      </main>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{testData.name}</h1>
          <p className="text-xl text-gray-200 mb-4">{testData.description}</p>
          <div className="w-full bg-black rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2">Question {currentQuestion + 1} of {questions.length}</p>
        </div>
      </section>

      {/* Test Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">{currentQ.question}</h2>

            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, index) => (
                <label key={index} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={answers[currentQuestion] === option}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                    className="mr-3"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="px-6 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
              >
                Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!answers[currentQuestion]}
                  className="px-6 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition"
                >
                  Submit Test
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!answers[currentQuestion]}
                  className="px-6 py-2 bg-black text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
