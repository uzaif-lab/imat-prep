# IMAT Prep Platform

A preparation platform for the International Medical Admissions Test (IMAT), designed to help students practice and prepare for their medical college entrance exams in Italy.

## Features

- **Realistic Mock Tests**: Practice with tests that follow the exact IMAT format
- **Topic Distribution**: Questions follow the official distribution (4 Reading, 5 Logical, 23 Biology, 15 Chemistry, 13 Physics/Math)
- **Performance Analytics**: Track your progress and identify weak areas
- **Exam Simulation**: Experience the time pressure and scoring system of the real exam
- **Detailed Explanations**: Learn from your mistakes with comprehensive explanations

## Tech Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- MongoDB (local or cloud instance)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/uzaif-lab/imat-prep.git
   cd imat-prep
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Set up environment variables

   ```bash
   # Copy the example .env file
   cp .env.example .env
   # Edit .env with your MongoDB connection string and NextAuth secret
   ```

4. Push the Prisma schema to your database

   ```bash
   npx prisma db push
   ```

5. Seed the database with initial data

   ```bash
   npm run db:seed
   ```

6. Run the development server

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

### Test Account

You can use the following test account to login:

- Email: test@example.com
- Password: password123

## Deployment

The application can be deployed to Vercel, Netlify, or any other hosting platform that supports Next.js.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
