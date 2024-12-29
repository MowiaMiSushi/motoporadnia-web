'use client';

import AdminAuthCheck from './components/AdminAuthCheck';
import AdminNav from '@/app/components/admin/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style jsx global>{`
        header {
          display: none !important;
        }
      `}</style>
      <AdminAuthCheck>
        <div className="min-h-screen bg-gray-100">
          <AdminNav />
          <main className="pt-16 px-4">
            {children}
          </main>
        </div>
      </AdminAuthCheck>
    </>
  );
} 