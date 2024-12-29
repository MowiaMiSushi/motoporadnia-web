'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faImages, faMoneyBill, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'next-auth/react';

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-row space-x-2 py-4">
          <Link
            href="/admin/pages"
            className={`text-lg sm:text-xl flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
              pathname === '/admin/pages' ? 'text-[#C62400] font-semibold' : 'text-gray-600'
            }`}
          >
            <FontAwesomeIcon icon={faFile} className="w-5 h-5" />
            <span>Strony</span>
          </Link>
          <Link
            href="/admin/pages/pricing"
            className={`text-lg sm:text-xl flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
              pathname === '/admin/pages/pricing' ? 'text-[#C62400] font-semibold' : 'text-gray-600'
            }`}
          >
            <FontAwesomeIcon icon={faMoneyBill} className="w-5 h-5" />
            <span>Cennik</span>
          </Link>
          <Link
            href="/admin/seo"
            className={`text-lg sm:text-xl flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
              pathname === '/admin/seo' ? 'text-[#C62400] font-semibold' : 'text-gray-600'
            }`}
          >
            <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
            <span>SEO</span>
          </Link>
          <Link
            href="/admin/gallery"
            className={`text-lg sm:text-xl flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
              pathname === '/admin/gallery' ? 'text-[#C62400] font-semibold' : 'text-gray-600'
            }`}
          >
            <FontAwesomeIcon icon={faImages} className="w-5 h-5" />
            <span>Galeria</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="text-lg sm:text-xl flex items-center space-x-2 p-2 rounded hover:bg-gray-100 text-gray-600 ml-auto"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
            <span>Wyloguj</span>
          </button>
        </div>
      </div>
    </nav>
  );
} 