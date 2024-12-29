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
        body > header,
        body > div > header,
        body > div.top-bar,
        div[class*="top-bar"],
        div[class*="topBar"],
        nav.top-bar,
        .top-bar,
        #top-bar {
          display: none !important;
        }
        body {
          padding-top: 0 !important;
          margin-top: 0 !important;
        }
        #__next, 
        main,
        div[class*="main"],
        div[class*="content"] {
          padding-top: 0 !important;
          margin-top: 0 !important;
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