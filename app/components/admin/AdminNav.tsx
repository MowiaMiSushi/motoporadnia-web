'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFile, faImages, faMoneyBill, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'next-auth/react';

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between h-14">
          <Link
            href="/admin/dashboard"
            className={`text-lg flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
              pathname === '/admin/dashboard' ? 'text-[#C62400] font-semibold' : 'text-gray-600'
            }`}
          >
            <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/pages"
              className={`text-lg flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                pathname === '/admin/pages' ? 'text-[#C62400] font-semibold' : 'text-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={faFile} className="w-5 h-5" />
              <span>Strony</span>
            </Link>
            
            <Link
              href="/admin/pages/pricing"
              className={`text-lg flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                pathname === '/admin/pages/pricing' ? 'text-[#C62400] font-semibold' : 'text-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={faMoneyBill} className="w-5 h-5" />
              <span>Cennik</span>
            </Link>
            
            <Link
              href="/admin/seo"
              className={`text-lg flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                pathname === '/admin/seo' ? 'text-[#C62400] font-semibold' : 'text-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
              <span>SEO</span>
            </Link>
            
            <Link
              href="/admin/gallery"
              className={`text-lg flex items-center space-x-2 p-2 rounded hover:bg-gray-100 ${
                pathname === '/admin/gallery' ? 'text-[#C62400] font-semibold' : 'text-gray-600'
              }`}
            >
              <FontAwesomeIcon icon={faImages} className="w-5 h-5" />
              <span>Galeria</span>
            </Link>
            
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="text-lg flex items-center space-x-2 p-2 rounded hover:bg-gray-100 text-gray-600"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />
              <span>Wyloguj</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 