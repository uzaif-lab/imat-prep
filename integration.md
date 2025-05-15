import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import ScoreAnalysis from '@/app/components/ScoreAnalysis';

CHANGES NEEDED:

1. Import the ScoreAnalysis component at the top of the file:

```typescript
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ScoreAnalysis from "@/app/components/ScoreAnalysis";
```

2. Add the ScoreAnalysis component right after the Summary section and before the Download button in the test completion section:

Find:

```tsx
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-blue-800">Time Taken</p>
                    <p className="text-xl font-medium text-blue-900 mt-1">
                      {formatTime((currentTest.timeLimit * 60) - timeRemaining)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 flex justify-end">
```

Add right before the `</div>` and `<div className="mb-6 flex justify-end">`:

```tsx
{
  /* Score Analysis Component */
}
<ScoreAnalysis
  correctAnswers={correctAnswers}
  incorrectAnswers={incorrectAnswers}
  unansweredQuestions={unansweredQuestions}
  rawScore={rawScore}
/>;
```

So the complete section will look like:

```tsx
                  <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-sm font-medium text-blue-800">Time Taken</p>
                    <p className="text-xl font-medium text-blue-900 mt-1">
                      {formatTime((currentTest.timeLimit * 60) - timeRemaining)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Score Analysis Component */}
              <ScoreAnalysis
                correctAnswers={correctAnswers}
                incorrectAnswers={incorrectAnswers}
                unansweredQuestions={unansweredQuestions}
                rawScore={rawScore}
              />
            </div>

            <div className="mb-6 flex justify-end">
```

# Supabase and Razorpay Integration

## Supabase Setup

1. Log in to your Supabase account at https://bizrdfyfnlehcgcbevvo.supabase.co
2. Go to the SQL Editor in the Supabase Dashboard
3. Create the necessary database tables by running the following SQL commands:

```sql
-- Create schema for IMAT Prep application
-- Tables for users, subscriptions, and payment status

-- User Subscriptions Table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL, -- Clerk user ID
  user_email TEXT NOT NULL,
  subscription_status TEXT NOT NULL DEFAULT 'free', -- 'free', 'premium'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  expiry_date TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id)
);

-- Payment Records Table
CREATE TABLE IF NOT EXISTS payment_records (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL, -- Clerk user ID
  order_id TEXT NOT NULL,
  payment_id TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  status TEXT NOT NULL, -- 'created', 'attempted', 'paid', 'failed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_user_id ON payment_records(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_records_order_id ON payment_records(order_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to automatically update updated_at
CREATE TRIGGER update_user_subscriptions_updated_at
BEFORE UPDATE ON user_subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payment_records_updated_at
BEFORE UPDATE ON payment_records
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://bizrdfyfnlehcgcbevvo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpenJkZnlmbmxlaGNnY2JldnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MjExNTcsImV4cCI6MjA2MjI5NzE1N30.AErqkjAcKRiYa4SIx137zZf8Wg-yHpUVWUuYW5onvhA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpenJkZnlmbmxlaGNnY2JldnZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjcyMTE1NywiZXhwIjoyMDYyMjk3MTU3fQ.lAYwEOGlLpqr4PhZ0g3f1WktlW64_8GTCk1Tco8QlRA

# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_xYoPxFSDH3Wd5w
RAZORPAY_KEY_SECRET=cZuJbtf3KHbevCH0mWyEO6XX
```

## Understanding the Integration

The payment and subscription system works as follows:

1. **Free Access**: Tests 1-3 are free for all users.
2. **Premium Access**: Tests 4 and above require a premium subscription.
3. **Payment Process**:
   - When a user attempts to access a premium test, they're directed to the premium pricing page.
   - They pay €49 as a one-time payment using Razorpay.
   - Once payment is successful, their subscription status is updated in Supabase.
   - They can now access all premium tests for 1 year.

## Testing the Payment Integration

For testing Razorpay payments, use the following test card:

- Card Number: 4111 1111 1111 1111
- Expiry Date: Any future date
- CVV: Any 3 digits
- Name: Any name
- OTP: 1234
