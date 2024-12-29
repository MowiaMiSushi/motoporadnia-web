'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faInfoCircle, faTools, faEnvelope, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function PagesAdmin() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-gray-800">Zarządzanie stronami</h1>
        <p className="text-gray-600 mb-8 text-lg">Wybierz stronę, którą chcesz edytować</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Strona główna */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faHome} className="w-6 h-6 text-[#C62400] mr-3" />
              <h2 className="text-xl font-bold text-gray-800">Strona główna</h2>
            </div>
            <p className="text-gray-600 mb-6 min-h-[48px]">Zarządzaj zawartością strony głównej</p>
            <Link 
              href="/admin/pages/home"
              className="inline-flex items-center justify-center w-full bg-[#C62400] hover:bg-[#A01D00] text-white px-4 py-3 rounded-lg transition-colors font-medium"
            >
              Edytuj stronę
            </Link>
          </div>

          {/* O nas */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faInfoCircle} className="w-6 h-6 text-[#C62400] mr-3" />
              <h2 className="text-xl font-bold text-gray-800">O nas</h2>
            </div>
            <p className="text-gray-600 mb-6 min-h-[48px]">Strona do edycji strony O nas.</p>
            <Link 
              href="/admin/pages/about"
              className="inline-flex items-center justify-center w-full bg-[#C62400] hover:bg-[#A01D00] text-white px-4 py-3 rounded-lg transition-colors font-medium"
            >
              Edytuj stronę
            </Link>
          </div>

          {/* Usługi */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faTools} className="w-6 h-6 text-[#C62400] mr-3" />
              <h2 className="text-xl font-bold text-gray-800">Usługi</h2>
            </div>
            <p className="text-gray-600 mb-6">Zarządzaj stroną usług</p>
            <div className="space-y-3">
              <Link 
                href="/admin/pages/services"
                className="inline-flex items-center justify-center w-full bg-[#C62400] hover:bg-[#A01D00] text-white px-4 py-3 rounded-lg transition-colors font-medium"
              >
                Edytuj stronę usług
              </Link>
              <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Podstrony usług:</h3>
                <div className="space-y-2.5">
                  <Link 
                    href="/admin/services/pomoc-w-zakupie"
                    className="text-gray-600 hover:text-[#C62400] text-sm flex items-center group transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 mr-2 text-gray-400 group-hover:text-[#C62400] transition-colors" />
                    Pomoc w zakupie motocykla
                  </Link>
                  <Link 
                    href="/admin/services/serwis"
                    className="text-gray-600 hover:text-[#C62400] text-sm flex items-center group transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 mr-2 text-gray-400 group-hover:text-[#C62400] transition-colors" />
                    Serwis motocyklowy
                  </Link>
                  <Link 
                    href="/admin/services/transport"
                    className="text-gray-600 hover:text-[#C62400] text-sm flex items-center group transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 mr-2 text-gray-400 group-hover:text-[#C62400] transition-colors" />
                    Transport motocykli
                  </Link>
                  <Link 
                    href="/admin/services/szkolenia"
                    className="text-gray-600 hover:text-[#C62400] text-sm flex items-center group transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 mr-2 text-gray-400 group-hover:text-[#C62400] transition-colors" />
                    Szkolenia motocyklowe
                  </Link>
                  <Link 
                    href="/admin/services/komis"
                    className="text-gray-600 hover:text-[#C62400] text-sm flex items-center group transition-colors"
                  >
                    <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 mr-2 text-gray-400 group-hover:text-[#C62400] transition-colors" />
                    Komis motocyklowy
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Kontakt */}
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
            <div className="flex items-center mb-4">
              <FontAwesomeIcon icon={faEnvelope} className="w-6 h-6 text-[#C62400] mr-3" />
              <h2 className="text-xl font-bold text-gray-800">Kontakt</h2>
            </div>
            <p className="text-gray-600 mb-6 min-h-[48px]">Aktualizuj dane kontaktowe</p>
            <Link 
              href="/admin/pages/contact"
              className="inline-flex items-center justify-center w-full bg-[#C62400] hover:bg-[#A01D00] text-white px-4 py-3 rounded-lg transition-colors font-medium"
            >
              Edytuj stronę
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 