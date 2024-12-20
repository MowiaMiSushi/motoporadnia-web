'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faClipboardCheck, faSearch, faHandshake, faTools, faMotorcycle, faMoneyBill, faTruckArrowRight, faTruck, faTag } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const heroImages = [
  '/images/usluga_sprawdzanie_1.jpg',
  '/images/usluga_sprawdzanie_2.jpg',
];

export default function PurchaseAssistance() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000); // 10 sekund

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-black/50 z-0" />
        {heroImages.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${image}')`,
              opacity: currentImageIndex === index ? 1 : 0
            }}
          />
        ))}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm py-8 rounded-lg max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Pomoc w zakupie motocykla Poznań
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Profesjonalne wsparcie i doradztwo przy zakupie motocykla.
            Sprawdzimy stan techniczny i historię pojazdu.
          </p>
          <Link
            href="/uslugi/pomoc-w-zakupie/cennik"
            className="inline-flex items-center bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors mt-6"
          >
            Sprawdź cennik
          </Link>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#C62400]">Profesjonalne doradztwo przy zakupie</h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Główną dziedziną naszej działalności jest doradztwo i pomoc w zakupie motocykla. Wykorzystując nasze wieloletnie doświadczenie w mechanice motocyklowej oraz korzystając z wielu profesjonalnych narzędzi, staramy się w jak najbardziej rzetelny sposób ocenić rzeczywisty stan techniczny oglądanego motocykla.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Oglądając motocykl bazujemy na stworzonym przez nas raporcie weryfikacyjnym, aby nie pominąć istotnych i newralgicznych punktów w motocyklu.
                  </p>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/images/usluga_sprawdzanie_1.jpg"
                    alt="Sprawdzanie motocykla"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#C62400]">Profesjonalne narzędzia diagnostyczne</h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Podczas oględzin, wykorzystujemy takie narzędzia jak wskaźnik osiowości tylnego koła, profesjonalny miernik lakieru, tester akumulatorów czy tester jakości płynu hamulcowego i chłodniczego.
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Pomoc w zakupie motocykla jako usługa jest dostępna także w formie zdalnej, klient otrzymuje od nas raport z dokonanych oględzin wraz z pakietem zdjęć i filmików ukazujących stan faktyczny oglądanego motocykla poprzez aplikacje WhatsApp niezwłocznie po dokonanych oględzinach.
                  </p>
                </div>
                <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg md:order-1">
                  <Image
                    src="/images/usluga_sprawdzanie_2.jpg"
                    alt="Profesjonalne narzędzia diagnostyczne"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>


            {/* Co zawiera usługa */}
            <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
              <h2 className="text-2xl font-bold mb-6">Co zawiera usługa pomocy w zakupie motocykla?</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faClipboardCheck} className="text-[#C62400] w-5 h-5 mr-3" />
                  Ocena stanu technicznego motocykla
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faSearch} className="text-[#C62400] w-5 h-5 mr-3" />
                  Weryfikacja historii pojazdu
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faMotorcycle} className="text-[#C62400] w-5 h-5 mr-3" />
                  Jazda próbna
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faMoneyBill} className="text-[#C62400] w-5 h-5 mr-3" />
                  Wstępny kosztorys ewentualnych napraw
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faHandshake} className="text-[#C62400] w-5 h-5 mr-3" />
                  Negocjacja ceny zakupu w oparciu o konkretne argumenty
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faTruckArrowRight} className="text-[#C62400] w-5 h-5 mr-3" />
                  Możliwość przetransportowania motocykla
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faTag} className="text-[#C62400] w-5 h-5 mr-3" />
                  Zniżkę na dokonanie podstawowych czynności serwisowych w naszym warsztacie
                </li>
              </ul>
            </div>

            {/* Informacje dla klientów */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
                <h2 className="text-2xl font-bold mb-6">Pierwszy motocykl - co przygotować?</h2>
                <p className="text-gray-700 mb-4">Jeśli zgłaszasz się do nas w celu poszukiwania swojego pierwszego motocykla, przygotuj dla nas takie informacje jak:</p>
                <ul className="space-y-3 text-gray-700">
                  <li>– Jaki planujesz przeznaczyć budżet na zakup motocykla?</li>
                  <li>– Czy masz zakupioną kompletną odzież motocyklową?</li>
                  <li>– Jakie są Twoje preferencje dotyczące motocykla? Sport, Naked a może coś z klasy Adventure?</li>
                  <li>– Czy masz jakieś doświadczenie motocyklowe poza kursem prawa jazdy?</li>
                  <li>– Jakie są Twoje predyspozycje, to znaczy waga i wzrost 😉</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16">
                <h2 className="text-2xl font-bold mb-6">Masz wybrany motocykl?</h2>
                <p className="text-gray-700 mb-4">Natomiast jeśli przychodzisz z konkretnym egzemplarzem, prosimy o uzyskanie takich informacji jak:</p>
                <ul className="space-y-3 text-gray-700">
                  <li>– numer VIN</li>
                  <li>– data pierwszej rejestracji (za granicą)</li>
                  <li>– numer rejestracyjny</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  Wszystkie wyżej wymienione informacje znajdują się na pierwszej stronie dowodu rejestracyjnego, te dane pozwolą nam na sprawdzenie historii pojazdu i weryfikacje historii kolizyjnej.
                </p>
              </div>
            </div>
            {/* Sekcja zakupu zdalnego */}
            <div className="text-center">
            <div className="bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] rounded-lg shadow-lg p-8 mb-16 ">
              <div className="grid gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-[#C62400]">Zakup w pełni zdalny!</h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Świadczymy również usługę zakupu w pełni zdalnego!
                  </p>
                  <p className="text-lg leading-relaxed text-gray-700">
                    Jeśli nie masz czasu aby wybrać się wspólnie z nami na miejsce oględzin i chcesz zaufać naszemu profesjonalizmowi oferujemy zakup zdalny motocykla! Jedziemy, weryfikujemy, kupujemy i dostarczamy Twój motocykl pod dom bez Twojej obecności!
                  </p>
                    <Link
                      href="/uslugi/pomoc-w-zakupie/cennik"
                      className="inline-block bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors"
                    >
                      Sprawdź cennik
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Potrzebujesz pomocy w zakupie?</h2>
            <p className="text-xl mb-8 text-gray-600">
              Skontaktuj się z nami, aby omówić szczegóły i umówić oględziny motocykla.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:789059578"
                className="bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Zadzwoń teraz
              </a>
              <Link
                href="/uslugi/pomoc-w-zakupie/cennik"
                className="bg-white text-gray-900 px-8 py-3 rounded-lg transition-colors inline-flex items-center justify-center hover:bg-gray-50 border border-gray-200"
              >
                <FontAwesomeIcon icon={faMoneyBill} className="mr-2" />
                Zobacz cennik
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 