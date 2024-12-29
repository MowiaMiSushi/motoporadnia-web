'use client';

import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminAuthCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (status === 'loading') return;

    console.log('Status sesji:', status);
    console.log('Sesja:', session);
    console.log('Ścieżka:', pathname);

    if (!session && !isLoginPage) {
      console.log('Przekierowanie do logowania - brak sesji');
      router.replace('/admin/login');
    } else if (session?.user?.role === 'admin' && isLoginPage) {
      console.log('Przekierowanie do dashboardu - zalogowany admin');
      router.replace('/admin/dashboard');
    } else if (session && session.user?.role !== 'admin') {
      console.log('Przekierowanie do logowania - brak uprawnień admina');
      router.replace('/admin/login');
    }
  }, [session, status, router, isLoginPage, pathname]);

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