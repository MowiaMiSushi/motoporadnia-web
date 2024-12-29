'use client';

import ChangeHistory from '@/app/components/admin/ChangeHistory';

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Historia zmian</h1>
      <ChangeHistory />
    </div>
  );
} 