'use client';

import React from 'react';
import { Providers } from './providers';
import Navigation from './components/layout/Navigation';
import { useSession } from 'next-auth/react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export function ClientLayout({ children }: ClientLayoutProps) {
  const { data: session } = useSession();

  return (
    <Navigation session={session}>{children}</Navigation>
  );
} 