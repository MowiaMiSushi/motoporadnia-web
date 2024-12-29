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

    if (!session && !isLoginPage) {
      router.push('/admin/login');
    } else if (session?.user?.role === 'admin' && isLoginPage) {
      router.push('/admin/dashboard');
    }
  }, [session, status, router, isLoginPage]);

  // Podczas ładowania pokaż loader
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Ładowanie...</div>
      </div>
    );
  }

  // Jeśli to nie jest strona logowania i użytkownik nie jest zalogowany, nie renderuj nic
  if (!isLoginPage && !session?.user?.role) {
    return null;
  }

  return <>{children}</>;
} 