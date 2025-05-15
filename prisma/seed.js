const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');

  try {
    // Create a test user
    const testUserPassword = await hash('password123', 10);
    
    // First check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });
    
    if (!existingUser) {
      const testUser = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          password: testUserPassword,
        },
      });
      console.log(`Created test user with id: ${testUser.id}`);
    } else {
      console.log('Test user already exists, skipping creation');
    }

    // Create mock tests - check first, then create
    const existingTest1 = await prisma.mockTest.findUnique({
      where: { id: '1' },
    });
    
    if (!existingTest1) {
      const mockTest1 = await prisma.mockTest.create({
        data: {
          id: '1',
          title: 'IMAT 2023 Mock Test',
          description: 'Based on the 2023 IMAT exam pattern with similar difficulty level.',
        },
      });
      console.log(`Created mock test 1 with id: ${mockTest1.id}`);
    } else {
      console.log('Mock test 1 already exists, skipping creation');
    }

    const existingTest2 = await prisma.mockTest.findUnique({
      where: { id: '2' },
    });
    
    if (!existingTest2) {
      const mockTest2 = await prisma.mockTest.create({
        data: {
          id: '2',
          title: 'IMAT 2022 Mock Test',
          description: 'Practice with questions similar to the 2022 IMAT exam.',
        },
      });
      console.log(`Created mock test 2 with id: ${mockTest2.id}`);
    } else {
      console.log('Mock test 2 already exists, skipping creation');
    }

    const existingTest3 = await prisma.mockTest.findUnique({
      where: { id: '3' },
    });
    
    if (!existingTest3) {
      const mockTest3 = await prisma.mockTest.create({
        data: {
          id: '3',
          title: 'Biology Focus Test',
          description: 'Focus on biology questions to improve your understanding of key concepts.',
        },
      });
      console.log(`Created mock test 3 with id: ${mockTest3.id}`);
    } else {
      console.log('Mock test 3 already exists, skipping creation');
    }

    // Create sample questions for each category
    // This is just a small sample; in a real app, you would have many more questions
    const sampleQuestions = [
      // Reading Skills questions
      {
        category: 'reading',
        text: 'Based on the passage, which of the following best describes the author\'s attitude toward medical research?',
        optionA: 'Enthusiastic approval',
        optionB: 'Cautious optimism',
        optionC: 'Neutral observation',
        optionD: 'Mild skepticism',
        optionE: 'Strong criticism',
        correctOption: 'B',
        explanation: 'The author acknowledges the benefits of medical research while also expressing concerns about ethical considerations.',
        difficulty: 3,
      },
      
      // Logical Reasoning questions
      {
        category: 'logical_reasoning',
        text: 'If all doctors are smart and some smart people are wealthy, which of the following must be true?',
        optionA: 'All doctors are wealthy',
        optionB: 'Some doctors are wealthy',
        optionC: 'No doctors are wealthy',
        optionD: 'Some wealthy people are not doctors',
        optionE: 'None of the above',
        correctOption: 'D',
        explanation: 'Since some smart people are wealthy (but not all), and all doctors are smart, we can only conclude that some wealthy people are not doctors.',
        difficulty: 4,
      },
      
      // Biology questions
      {
        category: 'biology',
        text: 'Which of the following is NOT a function of the cell membrane?',
        optionA: 'Regulating what enters and exits the cell',
        optionB: 'Providing structural support',
        optionC: 'Facilitating cell-to-cell communication',
        optionD: 'Protein synthesis',
        optionE: 'Housing membrane proteins',
        correctOption: 'D',
        explanation: 'Protein synthesis occurs in the ribosomes, not in the cell membrane.',
        difficulty: 2,
      },
      
      // Chemistry questions
      {
        category: 'chemistry',
        text: 'What is the hybridization of the carbon atom in methane (CH₄)?',
        optionA: 'sp',
        optionB: 'sp²',
        optionC: 'sp³',
        optionD: 'sp³d',
        optionE: 'sp³d²',
        correctOption: 'C',
        explanation: 'In methane, the carbon atom forms four equivalent bonds with hydrogen atoms, resulting in sp³ hybridization.',
        difficulty: 3,
      },
      
      // Physics & Math questions
      {
        category: 'physics_math',
        text: 'A projectile is launched at an angle of 45° with an initial velocity of 10 m/s. Neglecting air resistance, what is its maximum height?',
        optionA: '1.25 m',
        optionB: '2.5 m',
        optionC: '5.0 m',
        optionD: '10.0 m',
        optionE: '12.5 m',
        correctOption: 'B',
        explanation: 'The maximum height can be calculated using the formula h = (v₀sin(θ))²/(2g), which gives 2.5 m.',
        difficulty: 4,
      },
    ];

    // Check if questions already exist (simple check, just count)
    const questionCount = await prisma.question.count();
    
    if (questionCount === 0) {
      // Only create questions if none exist
      for (const questionData of sampleQuestions) {
        const question = await prisma.question.create({
          data: questionData,
        });
        console.log(`Created question with id: ${question.id}`);
      }
    } else {
      console.log('Questions already exist, skipping creation');
    }

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 