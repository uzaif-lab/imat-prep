import { prisma } from './prisma';

// User related functions
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(data: { name?: string; email: string; password: string }) {
  return prisma.user.create({
    data,
  });
}

// Mock Test related functions
export async function getAllMockTests() {
  return prisma.mockTest.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function getMockTestById(id: string) {
  return prisma.mockTest.findUnique({
    where: { id },
  });
}

// Question related functions
export async function getQuestionsForTest() {
  // For MVP, we'll just get random questions from each category
  // In a real app, you'd have a relation between mock tests and questions
  
  // Get the correct distribution of questions according to IMAT format
  const readingQuestions = await prisma.question.findMany({
    where: { category: 'reading' },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });
  
  const logicalQuestions = await prisma.question.findMany({
    where: { category: 'logical_reasoning' },
    take: 5,
    orderBy: { createdAt: 'desc' },
  });
  
  const biologyQuestions = await prisma.question.findMany({
    where: { category: 'biology' },
    take: 23,
    orderBy: { createdAt: 'desc' },
  });
  
  const chemistryQuestions = await prisma.question.findMany({
    where: { category: 'chemistry' },
    take: 15,
    orderBy: { createdAt: 'desc' },
  });
  
  const physicsQuestions = await prisma.question.findMany({
    where: { category: 'physics_math' },
    take: 13,
    orderBy: { createdAt: 'desc' },
  });
  
  return [
    ...readingQuestions,
    ...logicalQuestions,
    ...biologyQuestions,
    ...chemistryQuestions,
    ...physicsQuestions,
  ];
}

// Test Attempt related functions
export async function createTestAttempt(data: { userId: string; mockTestId: string }) {
  return prisma.testAttempt.create({
    data,
  });
}

export async function getTestAttemptById(id: string) {
  return prisma.testAttempt.findUnique({
    where: { id },
    include: {
      mockTest: true,
      responses: {
        include: {
          question: true,
        },
      },
    },
  });
}

export async function completeTestAttempt(id: string, endTime: Date, totalScore: number) {
  return prisma.testAttempt.update({
    where: { id },
    data: {
      endTime,
      totalScore,
      completed: true,
    },
  });
}

// Response related functions
export async function createResponse(data: {
  testAttemptId: string;
  questionId: string;
  selectedOption?: string;
  isCorrect?: boolean;
  pointsEarned?: number;
}) {
  return prisma.response.create({
    data,
  });
}

export async function updateResponse(
  id: string,
  data: {
    selectedOption?: string;
    isCorrect?: boolean;
    pointsEarned?: number;
  }
) {
  return prisma.response.update({
    where: { id },
    data,
  });
}

// Scoring function
export function calculateScore(responses: { isCorrect: boolean | null; selectedOption: string | null }[]) {
  let totalScore = 0;
  
  responses.forEach(response => {
    if (response.isCorrect === true) {
      totalScore += 1.5; // Correct answer
    } else if (response.isCorrect === false && response.selectedOption) {
      totalScore -= 0.4; // Incorrect answer
    }
    // Unanswered questions (selectedOption === null) get 0 points
  });
  
  return Math.max(0, totalScore); // Ensure score is not negative
} 