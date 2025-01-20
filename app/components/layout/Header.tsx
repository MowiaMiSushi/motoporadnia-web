'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';

const navigation = [
  { name: 'Strona główna', href: '/' },
  { name: 'O nas', href: '/o-nas' },
  {
    name: 'Usługi',
    items: [
      { name: 'Pomoc w zakupie motocykla', href: '/uslugi/pomoc-w-zakupie' },
      { name: 'Serwis motocykli', href: '/uslugi/serwis' },
      { name: 'Transport motocykli', href: '/uslugi/transport' },
      { name: 'Szkolenia motocyklowe', href: '/uslugi/szkolenia' },
      { name: 'Komis motocykli', href: '/uslugi/komis' },
    ],
  },
  {
    name: 'Cennik',
    items: [
      { name: 'Cennik pomocy przy zakupie motocykla', href: '/uslugi/pomoc-w-zakupie/cennik' },
      { name: 'Cennik serwisu', href: '/uslugi/serwis/cennik' },
      { name: 'Cennik transportu motocykla', href: '/uslugi/transport/cennik' },
    ],
  },
  { name: 'Kontakt', href: '/kontakt' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  useSession();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-100" style={{ height: '60px' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-1 sm:space-y-0 items-center">
              <a 
                href="mailto:kontakt@motoporadnia.pl" 
                className="text-sm sm:text-base text-gray-600 hover:text-[#C62400] flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-[#C62400] text-base sm:text-lg" />
                kontakt@motoporadnia.pl
              </a>
              <a 
                href="tel:789059578" 
                className="text-sm sm:text-base text-gray-600 hover:text-[#C62400] flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPhone} className="text-[#C62400] text-base sm:text-lg" />
                789 059 578
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm fixed top-[60px] left-0 right-0 z-40 font-Roboto Condensed">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24 sm:h-36 lg:h-36 border-b-0">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
              <div className="w-[130px] sm:w-[200px] lg:w-[220px] mt-2 sm:mt-2 lg:mt-2">
                <Image
                  src="/images/logo.webp"
                  alt="Motoporadnia"
                  width={500}
                  height={250}
                  priority
                  className="w-full h-auto"
                />
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#C62400] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#C62400] transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Otwórz menu</span>
              <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} className="h-6 w-6" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href || '#'}
                    className={`text-xl font-medium hover:text-[#C62400] transition-colors duration-200 ${
                      pathname === item.href ? 'text-[#C62400] drop-shadow-[0_0_1px_rgba(198,36,0,0.3)]' : 'text-gray-700 hover:drop-shadow-[0_0_1px_rgba(198,36,0,0.3)]'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.items && (
                    <div className="absolute left-0 top-[80%] mt-2 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:top-full transition-all duration-300 ease-in-out z-50">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden transform origin-top-left scale-95 opacity-0 -translate-y-2 group-hover:scale-100 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                        <div className="relative grid gap-4 bg-white px-5 py-6">
                          {item.items.map((subItem, index) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href || '#'}
                              className={`text-base hover:text-[#C62400] transition-all duration-200 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${
                                pathname === subItem.href ? 'text-[#C62400] drop-shadow-[0_0_1px_rgba(198,36,0,0.3)]' : 'text-gray-700 hover:drop-shadow-[0_0_1px_rgba(198,36,0,0.3)]'
                              }`}
                              style={{ transitionDelay: `${index * 75}ms` }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Navigation Overlay */}
            {mobileMenuOpen && (
              <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setMobileMenuOpen(false)}
              />
            )}

            {/* Mobile Navigation */}
            <div
              className={`lg:hidden fixed left-0 right-0 top-[84px] transform ${
                mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
              } transition-all duration-300 ease-in-out z-50`}
            >
              <div className="bg-white shadow-xl">
                <nav className="container mx-auto px-4 py-4">
                  <div className="flex flex-col">
                    {navigation.map((item) => (
                      <div key={item.name} className="py-3 border-b border-gray-100 last:border-b-0">
                        <Link
                          href={item.href || '#'}
                          className={`block text-lg font-medium hover:text-[#C62400] transition-all duration-200 ${
                            pathname === item.href 
                              ? 'text-[#C62400] drop-shadow-[0_0_1px_rgba(198,36,0,0.3)] border-b-2 border-[#C62400] inline-block'
                              : 'text-gray-700 hover:drop-shadow-[0_0_1px_rgba(198,36,0,0.3)] hover:border-b-2 hover:border-[#C62400] inline-block'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                        {item.items && (
                          <div className="ml-4 mt-3 space-y-3">
                            {item.items.map((subItem) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href || '#'}
                                className={`block text-base hover:text-[#C62400] transition-all duration-200 ${
                                  pathname === subItem.href 
                                    ? 'text-[#C62400] drop-shadow-[0_0_1px_rgba(198,36,0,0.3)] border-b border-[#C62400] inline-block'
                                    : 'text-gray-600 hover:drop-shadow-[0_0_1px_rgba(198,36,0,0.3)] hover:border-b hover:border-[#C62400] inline-block'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
