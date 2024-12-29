'use client';

import AdminAuthCheck from './components/AdminAuthCheck';
import AdminNav from '@/app/components/admin/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-100">
        <div className="pt-[176px]"> {/* Wysokość top-bara (44px) + headera (132px) */}
          <AdminNav />
          <main className="pt-16 px-4">
            {children}
          </main>
        </div>
      </div>
    </AdminAuthCheck>
  );
} 