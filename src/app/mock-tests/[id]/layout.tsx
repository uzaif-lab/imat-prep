'use client';

import { ReactNode } from 'react';
import SubscriptionGuard from '@/components/SubscriptionGuard';

interface TestLayoutProps {
  children: ReactNode;
  params: {
    id: string;
  };
}

export default function TestLayout({ children, params }: TestLayoutProps) {
  return (
    <SubscriptionGuard testId={params.id}>
      {children}
    </SubscriptionGuard>
  );
} 