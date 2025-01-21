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
        <AdminNav />
        <main>
          {children}
        </main>
      </div>
    </AdminAuthCheck>
  );
} 