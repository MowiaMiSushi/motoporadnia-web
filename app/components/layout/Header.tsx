'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
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
      <div className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-100" style={{ height: '40px' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center items-center h-auto sm:h-10 py-1 sm:py-0">
            <div className="flex flex-col sm:flex-row sm:space-x-8 space-y-1 sm:space-y-0 items-center">
              <a 
                href="mailto:kontakt@motoporadnia.pl" 
                className="text-base text-gray-600 hover:text-[#C62400] flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-[#C62400] text-lg" />
                kontakt@motoporadnia.pl
              </a>
              <a 
                href="tel:789059578" 
                className="text-base text-gray-600 hover:text-[#C62400] flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faPhone} className="text-[#C62400] text-lg" />
                789 059 578
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm fixed top-10 left-0 right-0 z-40 font-Roboto Condensed">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-start lg:items-center h-36 sm:h-36 lg:h-36 border-b-0">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300 pt-2 lg:pt-2">
              <div className="w-[180px] sm:w-[200px] lg:w-[220px]">
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
            <div className="flex items-center h-full lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-[#C62400] p-2"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex">
              <ul className="flex space-x-12">
                {navigation.map((item) => (
                  item.items ? (
                    <li key={item.name} className="relative group">
                      <button
                        className={`text-xl transition-all duration-300 font-serif transform hover:scale-105
                          ${pathname.startsWith('/' + item.name.toLowerCase())
                            ? 'text-[#C62400]'
                            : 'text-gray-700 hover:text-[#C62400]'
                          }`}
                      >
                        {item.name}
                      </button>
                      <ul className="absolute left-0 mt-2 w-64 bg-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        {item.items.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.href}
                              className="block px-4 py-2 text-base text-gray-700 hover:bg-gray-50 hover:text-[#C62400] transform hover:scale-105 transition-all duration-300"
                            >
                              {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`text-xl transition-all duration-300 font-serif transform hover:scale-105 inline-block
                          ${pathname === item.href
                            ? 'text-[#C62400]'
                            : 'text-gray-700 hover:text-[#C62400]'
                          }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
                ))}
              </ul>
            </nav>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-100">
              <ul className="space-y-4">
                {navigation.map((item) => (
                  <li key={item.name}>
                    {item.items ? (
                      <div className="space-y-2">
                        <div className="font-serif text-lg text-gray-700 px-2">
                          {item.name}
                        </div>
                        <ul className="pl-4 space-y-2">
                          {item.items.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block text-base text-gray-600 hover:text-[#C62400] ${
                                  pathname === subItem.href ? 'text-[#C62400]' : ''
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block font-serif text-lg hover:text-[#C62400] ${
                          pathname === item.href ? 'text-[#C62400]' : 'text-gray-700'
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
