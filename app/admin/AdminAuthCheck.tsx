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

    console.log('Status sesji:', status);
    console.log('Sesja:', session);
    console.log('Ścieżka:', pathname);
    console.log('Role:', session?.user?.role);

    if (!session && !isLoginPage) {
      console.log('Przekierowanie do logowania - brak sesji');
      signIn(undefined, { callbackUrl: '/admin/dashboard' });
    } else if (session?.user?.role === 'admin' && isLoginPage) {
      console.log('Przekierowanie do dashboardu - zalogowany admin');
      window.location.href = '/admin/dashboard';
    } else if (session && session.user?.role !== 'admin') {
      console.log('Przekierowanie do logowania - brak uprawnień admina');
      signIn(undefined, { callbackUrl: '/admin/dashboard' });
    }
  }, [session, status, isLoginPage, pathname]);

  // Podczas ładowania pokaż loader
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Ładowanie...</div>
      </div>
    );
  }

  // Jeśli to nie jest strona logowania i użytkownik nie jest zalogowany lub nie jest adminem, nie renderuj nic
  if (!isLoginPage && (!session?.user?.role || session.user.role !== 'admin')) {
    return null;
  }

  return <>{children}</>;
} 