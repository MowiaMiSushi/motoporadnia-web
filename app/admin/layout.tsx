'use client';

import AdminAuthCheck from './components/AdminAuthCheck';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthCheck>
      <div className="min-h-screen bg-gray-50">
        <main>{children}</main>
      </div>
    </AdminAuthCheck>
  );
} 