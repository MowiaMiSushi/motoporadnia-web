'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ServicesRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/services');
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl">Przekierowywanie...</div>
    </div>
  );
} 