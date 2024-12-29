'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Session } from 'next-auth';

interface NavigationProps {
  children: ReactNode;
  session: Session | null;
}

export default function Navigation({ children, session }: NavigationProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-[176px] sm:pt-[160px] lg:pt-[176px]">{children}</main>
      <Footer />
    </div>
  );
}
