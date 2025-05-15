# IMAT Prep Platform Setup Instructions

## Prerequisites

- Node.js (version 18 or higher)
- npm (included with Node.js)
- Supabase account
- Clerk account for authentication
- Razorpay test account

## Setup Process

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://bizrdfyfnlehcgcbevvo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpenJkZnlmbmxlaGNnY2JldnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MjExNTcsImV4cCI6MjA2MjI5NzE1N30.AErqkjAcKRiYa4SIx137zZf8Wg-yHpUVWUuYW5onvhA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpenJkZnlmbmxlaGNnY2JldnZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjcyMTE1NywiZXhwIjoyMDYyMjk3MTU3fQ.lAYwEOGlLpqr4PhZ0g3f1WktlW64_8GTCk1Tco8QlRA

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xYoPxFSDH3Wd5w
RAZORPAY_KEY_SECRET=cZuJbtf3KHbevCH0mWyEO6XX

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### 3. Supabase Setup

1. Log in to your Supabase account at https://bizrdfyfnlehcgcbevvo.supabase.co
2. Go to the SQL Editor in the Supabase Dashboard
3. Run the SQL script from `src/lib/supabase/schema.sql` to create the necessary tables

### 4. Clerk Authentication Setup

1. Create a Clerk application at https://dashboard.clerk.dev/
2. Set up your application with the following settings:
   - Enable email authentication
   - Configure redirect URLs for your development environment (http://localhost:3000)
3. Copy your Clerk publishable key and secret key to your `.env.local` file

### 5. Running the Application

```bash
npm run dev
```

The application will be available at http://localhost:3000.

## Troubleshooting

### Clerk Authentication Issues

If you encounter errors related to Clerk authentication like:

```
Attempted import error: 'authMiddleware' is not exported from '@clerk/nextjs/server'
```

The project is configured for Clerk version 6.x. Make sure you're using the correct import syntax:

```typescript
// For API routes (v6.x compatible)
import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs";

// In API route handlers
const { userId } = getAuth(req);

// For middleware (v6.x compatible)
import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware({ ... });
```

If you're using a newer version of Clerk (v7+), you'll need to modify the imports accordingly.

### Database Connection Issues

If you have trouble connecting to Supabase, verify:

1. Your Supabase URL and keys are correct in your `.env.local` file
2. The database tables have been created using the SQL script

### Payment Integration

For testing Razorpay payments, use the following test card:

- Card Number: 4111 1111 1111 1111
- Expiry Date: Any future date
- CVV: Any 3 digits
- OTP: 1234

## Application Structure

- `/src/app` - Next.js application routes
- `/src/components` - Reusable React components
- `/src/hooks` - Custom React hooks
- `/src/lib` - Utility functions and API clients
- `/src/lib/supabase` - Supabase client and database functions
- `/src/lib/razorpay` - Razorpay integration functions
