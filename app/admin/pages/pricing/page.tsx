'use client';

import Link from 'next/link';

export default function PricingDashboard() {
  const pricingPages = [
    {
      title: 'Cennik serwisu',
      description: 'Edytuj cennik usług serwisowych',
      href: '/admin/pages/pricing/service',
      icon: '🔧'
    },
    {
      title: 'Cennik pomocy w zakupie',
      description: 'Edytuj cennik usług pomocy przy zakupie motocykla',
      href: '/admin/pages/pricing/purchase',
      icon: '🏍️'
    },
    {
      title: 'Cennik transportu',
      description: 'Edytuj cennik usług transportowych',
      href: '/admin/pages/pricing/transport',
      icon: '🚛'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Zarządzanie cennikami</h1>
        <p className="text-gray-600 mt-2">
          Wybierz cennik, który chcesz edytować
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricingPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="text-3xl mb-4">{page.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
            <p className="text-gray-600">{page.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 