'use client';

import { SignUp } from "@clerk/nextjs";
import { clerkAppearance } from "@/app/clerk";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <SignUp 
          appearance={clerkAppearance}
          path="/auth/register"
          routing="path"
          signInUrl="/auth/login"
          redirectUrl="/"
          afterSignUpUrl="/"
        />
      </div>
    </div>
  );
} 