'use client';

import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface NavigationProps {
  children: ReactNode;
}

export default function Navigation({ children }: NavigationProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-[176px] sm:pt-[160px] lg:pt-[176px]">{children}</main>
      <Footer />
    </div>
  );
}
