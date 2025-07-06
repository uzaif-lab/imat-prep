"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// Mock test data for MVP
const mockTests = [
  {
    id: "1",
    title: "IMAT 2023 Mock Test",
    description:
      "Full-length mock test with 60 realistic questions covering all IMAT test categories.",
    questionCount: 60,
    timeLimit: 100, // in minutes
    createdAt: "2023-12-10",
    isComplete: true,
  },
  {
    id: "2",
    title: "IMAT 2022 Mock Test",
    description:
      "Practice with questions similar to the 2022 IMAT exam pattern.",
    questionCount: 60,
    timeLimit: 100,
    createdAt: "2023-11-05",
    isComplete: true,
  },
  {
    id: "3",
    title: "Biology Focus Test",
    description:
      "Focus on biology questions to improve your understanding of key concepts.",
    questionCount: 30,
    timeLimit: 50,
    createdAt: "2023-10-15",
    isComplete: true,
  },
  {
    id: "8",
    title: "Custom IMAT Practice Test 1",
    description:
      "Custom practice test with all-new questions matching the real IMAT exam difficulty and format.",
    questionCount: 60,
    timeLimit: 100,
    createdAt: "2024-01-05",
    isComplete: true,
  },
  {
    id: "9",
    title: "Custom IMAT Practice Test 2",
    description:
      "Second original practice test following the official IMAT blueprint and difficulty.",
    questionCount: 60,
    timeLimit: 100,
    createdAt: "2024-02-15",
    isComplete: true,
  },
  {
    id: "4",
    title: "Advanced Biology Test",
    description:
      "In-depth biology test covering cellular biology, genetics, physiology, and more.",
    questionCount: 30,
    timeLimit: 50,
    createdAt: "2023-09-20",
    isComplete: true,
  },
  {
    id: "5",
    title: "Chemistry Focus Test",
    description:
      "Comprehensive chemistry test covering organic, inorganic, and biochemistry.",
    questionCount: 30,
    timeLimit: 50,
    createdAt: "2023-09-15",
    isComplete: true,
  },
  {
    id: "6",
    title: "Physics & Mathematics Focus Test",
    description:
      "Specialized test for physics and mathematical concepts relevant to IMAT.",
    questionCount: 30,
    timeLimit: 50,
    createdAt: "2023-09-10",
    isComplete: true,
  },
  {
    id: "7",
    title: "Reading & Logical Reasoning Focus Test",
    description:
      "Specialized test on reading comprehension, critical thinking, and logical reasoning.",
    questionCount: 20,
    timeLimit: 40,
    createdAt: "2023-09-05",
    isComplete: true,
  },
];

export default function MockTests() {
  const { isSignedIn } = useUser();

  // Redirect if not signed in
  if (!isSignedIn) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Available Mock Tests
          </h1>
          <p className="mt-2 text-gray-700">
            Choose a mock test to practice your IMAT skills. Each test follows
            the official exam format.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTests.map((test) => (
            <div
              key={test.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {test.title}
                  </h2>
                  {test.isComplete && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Ready
                    </span>
                  )}
                  {!test.isComplete && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{test.description}</p>
                <div className="flex justify-between text-sm text-gray-700 mb-4">
                  <span>{test.questionCount} questions</span>
                  <span>{test.timeLimit} minutes</span>
                </div>
                <Link
                  href={`/mock-tests/${test.id}`}
                  className={`block w-full py-2 px-4 text-center font-medium rounded-md ${
                    test.isComplete
                      ? "text-white bg-blue-600 hover:bg-blue-700"
                      : "text-gray-500 bg-gray-200 cursor-not-allowed"
                  }`}
                  onClick={(e) => !test.isComplete && e.preventDefault()}
                >
                  {test.isComplete ? "Start Test" : "Coming Soon"}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Information about tests */}
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            About Our Mock Tests
          </h2>
          <div className="prose max-w-none text-gray-700">
            <p>
              Our mock tests are designed to simulate the real IMAT exam
              experience. Each full mock test includes:
            </p>
            <ul className="list-disc pl-5 mt-2 mb-4">
              <li>
                60 multiple-choice questions following the official distribution
              </li>
              <li>100-minute time limit</li>
              <li>
                Scoring system matching the official IMAT scoring (+1.5 for
                correct, -0.4 for incorrect)
              </li>
              <li>Detailed explanations for all answers</li>
            </ul>
            <p>
              Taking regular practice tests is one of the most effective ways to
              prepare for the IMAT exam. It helps you become familiar with the
              exam format, improve your time management, and identify your weak
              areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
