"use client";

import React from "react";
import SubscriptionGuard from "@/components/SubscriptionGuard";

// Next.js 15 layout component with correct typing
export default function TestLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Readonly<{ id: string }>;
}>) {
  return <SubscriptionGuard testId={params.id}>{children}</SubscriptionGuard>;
}
