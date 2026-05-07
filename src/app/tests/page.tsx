"use client";

import { useState, useEffect } from "react";

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

export default function TestsPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(false);

  const courses = [
    { id: "dfa", name: "DFA - Diploma in Financial Accounting", questions: 3 },
    { id: "dca", name: "DCA - Diploma in Computer Applications", questions: 2 },
    { id: "ccc", name: "CCC - Course on Computer Concepts", questions: 2 }
  ];

  const startTest = async (courseId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tests?course=${courseId}`);
      const data = await response.json() as { questions: Question[] };
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(""));
      setSelectedCourse(courseId);
      setCurrentQuestion(0);
      setShowResults(false);
      setResult(null);
    } catch (error) {
      console.error("Failed to load test:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitTest = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course: selectedCourse,
          answers
        }),
      });
      const data = (await response.json()) as TestResult;
      setResult(data);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to submit test:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetTest = () => {
    setSelectedCourse("");
    setQuestions([]);
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResults(false);
    setResult(null);
  };

  if (showResults && result) {
    return (
      <main className="min-h-screen bg-white">
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Test Results</h1>
            <p className="text-xl text-gray-200">Your performance summary</p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-8">
                <div className={`text-6xl mb-4 ${result.passed ? 'text-green-500' : 'text-red-500'}`}>
                  {result.passed ? '✓' : '✗'}
                </div>
                <h2 className="text-3xl font-bold mb-2">
                  {result.passed ? 'Congratulations!' : 'Keep Practicing!'}
                </h2>
                <p className="text-gray-600">
                  You scored {result.score}% ({result.correct}/{result.total} correct)
                </p>
              </div>

              <div className="space-y-4 mb-8">
                {result.results.map((item, index) => (
                  <div key={item.questionId} className={`p-4 rounded-lg border ${
                    item.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <h3 className="font-semibold mb-2">Question {index + 1}: {item.question}</h3>
                    <p className="text-sm">
                      <strong>Your Answer:</strong> {item.userAnswer}
                    </p>
                    <p className="text-sm">
                      <strong>Correct Answer:</strong> {item.correctAnswer}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{item.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={resetTest}
                  className="flex-1 bg-black text-white py-3 rounded-lg font-semibold hover:bg-black transition"
                >
                  Take Another Test
                </button>
                <button
                  onClick={() => window.location.href = '/courses'}
                  className="flex-1 bg-gray-600 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  View Courses
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (selectedCourse && questions.length > 0) {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <main className="min-h-screen bg-white">
        <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Practice Test</h1>
            <p className="text-xl text-gray-200">
              {courses.find(c => c.id === selectedCourse)?.name}
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-2xl">
            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">{question.question}</h2>
                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <label key={index} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="answer"
                        value={option}
                        checked={answers[currentQuestion] === option}
                        onChange={(e) => handleAnswer(e.target.value)}
                        className="mr-3"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestion === 0}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  Previous
                </button>

                {currentQuestion === questions.length - 1 ? (
                  <button
                    onClick={submitTest}
                    disabled={!answers[currentQuestion] || loading}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                  >
                    {loading ? 'Submitting...' : 'Submit Test'}
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    disabled={!answers[currentQuestion]}
                    className="px-6 py-2 bg-black text-white rounded-lg font-semibold hover:bg-black disabled:bg-gray-300 disabled:cursor-not-allowed transition"
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

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Practice Tests & MCQs</h1>
          <p className="text-xl text-gray-200">
            Choose a course and start practicing with MCQs
          </p>
        </div>
      </section>

      {/* Course Selection */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border border-gray-200"
              >
                <h3 className="text-xl font-bold mt-4 mb-2">{course.name}</h3>
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p>❓ Questions: {course.questions}</p>
                  <p>⏱️ Duration: 10-15 minutes</p>
                </div>

                <button
                  onClick={() => startTest(course.id)}
                  disabled={loading}
                  className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-black disabled:bg-gray-400 transition"
                >
                  {loading ? 'Loading...' : 'Start Practice Test'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-zinc-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-black">100+</h3>
              <p className="text-gray-600 mt-2">Practice Questions</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-black">3</h3>
              <p className="text-gray-600 mt-2">Course Tests</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-black">24/7</h3>
              <p className="text-gray-600 mt-2">Access Available</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
