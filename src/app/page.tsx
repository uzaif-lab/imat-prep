import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="relative w-full h-screen">
        {/* Hero section with background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-90" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Prepare for IMAT with Confidence
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
            Practice with mock tests based on real IMAT exams. No account needed - start right away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/mock-tests" 
              className="px-8 py-3 text-base font-medium text-blue-700 bg-white hover:bg-gray-100 rounded-md shadow-md"
            >
              Start Mock Tests Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Features designed for IMAT success</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Realistic Mock Tests</h3>
              <p className="text-gray-600">Practice with tests that follow the exact IMAT format with appropriate question distribution.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Your Progress</h3>
              <p className="text-gray-600">Monitor your improvement over time with detailed analytics, performance metrics, and personalized insights.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">New Tests Every Week</h3>
              <p className="text-gray-600">Fresh content added every Saturday to help you practice with diverse questions and stay ahead of the competition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* IMAT Overview section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Understanding the IMAT Exam</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Exam Structure</h3>
            <p className="text-gray-600 mb-4">
              The IMAT comprises 60 multiple-choice questions to be completed within 100 minutes. Each question offers five options, with only one correct answer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Question Distribution:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Reading Skills and Knowledge: 4 questions</li>
                  <li>Logical Reasoning and Problem-Solving: 5 questions</li>
                  <li>Biology: 23 questions</li>
                  <li>Chemistry: 15 questions</li>
                  <li>Physics and Mathematics: 13 questions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Scoring System:</h4>
                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                  <li>Correct answer: +1.5 points</li>
                  <li>Incorrect answer: -0.4 points</li>
                  <li>Unanswered question: 0 points</li>
                  <li>Maximum possible score: 90 points</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Our Mock Tests Stand Out</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Expertly Crafted Questions</h4>
                <p className="text-gray-600">Every question is carefully developed by professionals with expertise in IMAT exam patterns. Our content is unique - you won't find repeated or recycled questions from other platforms.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Specialized Focus</h4>
                <p className="text-gray-600">Unlike general platforms, we focus exclusively on IMAT preparation. Our specialized approach ensures you're practicing with the most relevant and accurate mock tests available.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Quality Over Quantity</h4>
                <p className="text-gray-600">Each question undergoes rigorous review to ensure accuracy, relevance, and appropriate difficulty. We prioritize high-quality content that truly prepares you for the actual exam.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Real Exam Simulation</h4>
                <p className="text-gray-600">Our tests mimic the exact format, timing, and pressure of the real IMAT examination, giving you the most authentic practice experience possible.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600 w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to practice for your IMAT exam?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Start taking mock tests immediately - no registration required!
          </p>
          <Link 
            href="/mock-tests" 
            className="inline-block px-8 py-3 text-base font-medium text-blue-600 bg-white hover:bg-gray-100 rounded-md shadow-md"
          >
            Start Mock Tests Now
          </Link>
        </div>
      </section>
      </main>
  );
}
