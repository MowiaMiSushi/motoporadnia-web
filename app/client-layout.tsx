'use client';

import { usePathname } from 'next/navigation';
import Navigation from './components/layout/Navigation';
import { useSession } from 'next-auth/react';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoginPage = pathname === '/admin/login';

  // Nie renderuj nawigacji na stronie logowania
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navigation session={session}>{children}</Navigation>
    </>
  );
} 