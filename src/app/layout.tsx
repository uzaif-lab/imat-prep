import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkAppearance } from "./clerk";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IMAT Prep - Medical College Entrance Exam Preparation",
  description:
    "Practice with mock IMAT exams to prepare for your medical college entrance test in Italy",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body className={inter.className}>
        <ClerkProvider
          appearance={clerkAppearance}
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
          signInUrl="/auth/login"
          signUpUrl="/auth/register"
          afterSignInUrl="/"
          afterSignUpUrl="/"
        >
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
