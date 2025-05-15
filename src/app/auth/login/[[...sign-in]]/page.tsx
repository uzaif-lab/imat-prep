'use client';

import { SignIn } from "@clerk/nextjs";
import { clerkAppearance } from "@/app/clerk";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <SignIn 
          appearance={clerkAppearance}
          path="/auth/login"
          routing="path"
          signUpUrl="/auth/register"
          redirectUrl="/"
          afterSignInUrl="/"
        />
      </div>
    </div>
  );
} 