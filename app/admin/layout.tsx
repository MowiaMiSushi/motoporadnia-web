'use client';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return children;
  }

  if (!session) {
    return null;
  }

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/pages', label: 'Strony' },
    { href: '/admin/services', label: 'Usługi' },
    { href: '/admin/settings', label: 'Ustawienia' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Panel Admina</h1>
            <p className="text-sm text-gray-600 mt-1">Zalogowany jako: {session.user?.name}</p>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded-lg ${
                      pathname === item.href
                        ? 'bg-indigo-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t mt-auto">
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
            >
              Wyloguj się
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
} 