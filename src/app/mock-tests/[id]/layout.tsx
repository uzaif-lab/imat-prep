"use client";

import React from "react";
import { TestGuardClient } from "@/components/TestGuardClient";

// Using a proper Next.js 15 layout
export default function TestLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div>
      <TestGuardClient testId={params.id}>{children}</TestGuardClient>
    </div>
  );
}
