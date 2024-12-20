'use client';

import React from 'react';
import { Providers } from './providers';
import Navigation from './components/layout/Navigation';
import { Session } from 'next-auth';

interface ClientLayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

export function ClientLayout({ children, session }: ClientLayoutProps) {
  return (
    <Navigation>{children}</Navigation>
  );
} 