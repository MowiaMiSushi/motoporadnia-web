'use client';

import { useSession, signIn } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminAuthCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (status === 'loading') return;

    if (!session && !isLoginPage) {
      signIn();
    }
  }, [session, status, isLoginPage]);

  // Podczas ładowania pokaż loader
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Ładowanie...</div>
      </div>
    );
  }

  // Na stronie logowania zawsze renderuj zawartość
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Na innych stronach sprawdź uprawnienia
  if (!session?.user?.role || session.user.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
} 