import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function initializeContent() {
  try {
    console.log('Łączenie z bazą danych...');
    const client = await MongoClient.connect(MONGODB_URI as string);
    const db = client.db();

    const collections = [
      {
        type: 'home',
        data: {
          hero: {
            title: 'MotoPoradnia',
            description: 'Fachowa pomoc przy zakupie, transporcie i serwisie motocykli jest to firma, stworzona przez ludzi, którzy nie wyobrażają sobie otaczającego ich świata bez jednośladów.',
            buttonText: 'Dowiedz się więcej o nas',
            buttonLink: '/o-nas',
            images: ['/images/hero-bg_1.jpg', '/images/hero-bg_2.jpg', '/images/hero-bg_3.png']
          },
          services: {
            title: 'Nasze Usługi',
            services: [
              {
                icon: 'faHandshake',
                title: 'Pomoc w Zakupie',
                description: 'Profesjonalne doradztwo przy zakupie motocykla',
                link: '/uslugi/pomoc-w-zakupie',
                linkText: 'Zobacz jak pomagamy'
              },
              {
                icon: 'faWrench',
                title: 'Serwis Motocykli',
                description: 'Profesjonalny serwis i naprawa motocykli wszystkich marek',
                link: '/uslugi/serwis',
                linkText: 'Dowiedz się więcej'
              },
              {
                icon: 'faTruck',
                title: 'Transport Motocykli',
                description: 'Bezpieczny transport motocykli na terenie całego kraju',
                link: '/uslugi/transport',
                linkText: 'Sprawdź szczegóły'
              }
            ]
          },
          additional: {
            title: 'Dodatkowe Usługi',
            services: [
              {
                icon: 'faMotorcycle',
                title: 'Komis',
                description: 'Sprzedaż i skup motocykli używanych',
                link: '/uslugi/komis',
                linkText: 'Zobacz ofertę'
              },
              {
                icon: 'faGraduationCap',
                title: 'Szkolenia',
                description: 'Szkolenia dla początkujących i zaawansowanych motocyklistów',
                link: '/uslugi/szkolenia',
                linkText: 'Zapisz się'
              }
            ]
          },
          promo: {
            title: 'Zobacz nas w akcji',
            videoUrl: 'https://www.youtube.com/watch?v=6KlCvhyna94'
          },
          cta: {
            title: 'Skontaktuj się z nami',
            description: 'Jesteśmy do Twojej dyspozycji. Zadzwoń lub napisz!',
            primaryButton: {
              text: 'Zadzwoń teraz',
              link: 'tel:789059578'
            },
            secondaryButton: {
              text: 'Napisz do nas',
              link: '/kontakt'
            }
          }
        }
      },
      {
        type: 'about',
        data: {
          hero: {
            title: "O nas",
            description: "Poznaj naszą historię i zespół pasjonatów motocykli",
            images: [
              "/images/o-nas_1.jpg",
              "/images/o-nas_2.jpg",
              "/images/o-nas_3.jpg"
            ]
          },
          history: {
            title: "Nasza Historia",
            sections: [
              {
                content: [
                  "Motoporadnia – Fachowa pomoc przy zakupie, transporcie i serwisie motocykli jest to firma, stworzona przez ludzi, którzy nie wyobrażają sobie otaczającego ich świata bez jednośladów..",
                  "Początek działalności miał miejsce już w najmłodszych latach założyciela. Adrian, zaraz po stawianiu pierwszych kroków wsiadł na elektrycznie napędzanego Repsola aby pokonywać pierwsze metry na dwóch (wtedy jeszcze czterech) kółkach.."
                ],
                image: "/images/o-nas_3.jpg"
              },
              {
                content: [
                  "Proces rozwojowy naszej pasji i nauki wszystkiego co motocyklowe szedł swoim naturalnym trybem. Pierwsze motocykle z czasów radzieckich, ujeżdżanie wszystkiego co ma silnik i koła w czasach szkolnych, siedzenie do późnych nocy w garażu usprawniając i modyfikując swoje motocykle, praca w warsztatach.",
                  "Kolejne lata doświadczenie jak należycie obsługiwać motocykl zachowując najwyższą jakość bezpieczeństwa, serwisu i estetyki nabieraliśmy na torach wyścigowych jako mechanicy znanych zawodników oraz sami biorąc czynny udział na linii startu."
                ],
                image: "/images/o-nas_2.jpg"
              },
              {
                content: [
                  "Efektem tego czego nauczyliśmy się przez te wszystkie motocyklowe lata, setki godzin pracy i tysiące pokonanych kilometrów na drogach oraz torach jest Motoporadnia. Firma, gdzie każdy motocyklista niezależnie od doświadczenia znajdzie odpowiedź na swoje motocyklowe pytania oraz potrzeby przy pomocy specjalistów i profesjonalistów.",
                  "Zapraszamy do zapoznania się z zakresem naszych usług, który z czasem na pewno będzie się powiększał!"
                ],
                image: "/images/o-nas_1.jpg"
              }
            ]
          },
          team: {
            title: "Nasz Zespół",
            members: [
              {
                name: "Adrian",
                position: "Założyciel",
                image: "/images/pracownik_2.png"
              },
              {
                name: "Aleksnadra",
                position: "Przedstawicielka",
                image: "/images/pracownik_1.png"
              },
              {
                name: "Bartosz",
                position: "Mechanik",
                image: "/images/pracownik_3.png"
              }
            ]
          },
          socialMedia: {
            title: "Znajdź nas w Social Media",
            platforms: [
              {
                name: "Facebook",
                icon: "faFacebook",
                url: "https://facebook.com/motoporadnia",
                description: "Bądź na bieżąco z naszymi aktualnościami"
              },
              {
                name: "Instagram",
                icon: "faInstagram",
                url: "https://instagram.com/motoporadnia",
                description: "Zobacz nasze najnowsze realizacje"
              },
              {
                name: "YouTube",
                icon: "faYoutube",
                url: "https://youtube.com/motoporadnia",
                description: "Oglądaj nasze poradniki i testy"
              }
            ]
          }
        }
      },
      {
        type: 'services-szkolenia',
        data: {
          hero: {
            title: "Szkolenia Motocyklowe na torze",
            description: "Szkolimy na najlepszych torach w Polsce",
            images: ["/images/szkolenia_1.jpg", "/images/szkolenia_2.jpeg", "/images/szkolenia_3.jpg"]
          },
          trainings: [
            {
              id: "tor-bydgoszcz",
              name: "Szkolenie na torze Bydgoszcz",
              description: "Profesjonalne szkolenie na jednym z najlepszych torów w Polsce. Poznaj techniki jazdy torowej i popraw swoje umiejętności pod okiem doświadczonych instruktorów.",
              includes: ["Teoria jazdy torowej", "Techniki pokonywania zakrętów", "Pozycja na motocyklu", "Analiza telemetrii", "Materiały szkoleniowe"]
            },
            {
              id: "tor-stary-kisielin",
              name: "Szkolenie na torze Stary Kisielin",
              description: "Szkolenie na technicznym torze w Starym Kisielinie. Idealne miejsce do nauki precyzyjnej jazdy i doskonalenia techniki.",
              includes: ["Teoria jazdy torowej", "Dobór linii przejazdu", "Techniki hamowania", "Praca z gazem", "Analiza przejazdów"]
            }
          ],
          events: [
            {
              id: 1,
              title: "Szkolenie Bydgoszcz - Kwiecień 2025",
              date: "12-13.04.2025",
              location: "Tor Bydgoszcz",
              fbEvent: "https://facebook.com/events/motoporadnia-szkolenie-1",
              description: "Dwudniowe szkolenie na torze w Bydgoszczy. Grupa początkująca i średniozaawansowana."
            },
            {
              id: 2,
              title: "Szkolenie Stary Kisielin - Maj 2025",
              date: "18-19.05.2025",
              location: "Tor Stary Kisielin",
              fbEvent: "https://facebook.com/events/motoporadnia-szkolenie-2",
              description: "Intensywne szkolenie dla wszystkich poziomów zaawansowania."
            },
            {
              id: 3,
              title: "Szkolenie Bydgoszcz - Czerwiec 2025",
              date: "15-16.06.2025",
              location: "Tor Bydgoszcz",
              fbEvent: "https://facebook.com/events/motoporadnia-szkolenie-3",
              description: "Szkolenie zaawansowane z analizą telemetrii."
            },
            {
              id: 4,
              title: "Szkolenie Stary Kisielin - Lipiec 2025",
              date: "20-21.07.2025",
              location: "Tor Stary Kisielin",
              fbEvent: "https://facebook.com/events/motoporadnia-szkolenie-4",
              description: "Szkolenie dla początkujących i średniozaawansowanych."
            },
            {
              id: 5,
              title: "Szkolenie Bydgoszcz - Sierpień 2025",
              date: "17-18.08.2025",
              location: "Tor Bydgoszcz",
              fbEvent: "https://facebook.com/events/motoporadnia-szkolenie-5",
              description: "Ostatnie letnie szkolenie na torze w Bydgoszczy."
            }
          ],
          schedule: {
            title: "Harmonogram szkoleń 2025",
            subtitle: "Zapisz się na najbliższy termin"
          },
          cta: {
            title: "Gotowy na nowe wyzwania?",
            description: "Skontaktuj się z nami i rozpocznij swoją przygodę z jazdą torową",
            phoneNumber: "789059578"
          }
        }
      },
      {
        type: 'services-komis',
        data: {
          hero: {
            title: 'Komis Motocyklowy',
            description: 'Profesjonalny skup i sprzedaż motocykli używanych. Oferujemy uczciwe wyceny i bezpieczne transakcje.',
            images: ['/images/komis_1.jpg', '/images/hero-bg_2.jpg', '/images/hero-bg_3.png', '/images/hero-bg_1.jpg']
          },
          steps: [
            {
              title: 'Wstępna Wycena',
              description: 'Przygotujemy wstępną wycenę na podstawie przesłanych zdjęć i opisu',
              icon: 'faSearch'
            },
            {
              title: 'Oględziny',
              description: 'Umówimy się na dokładne oględziny motocykla',
              icon: 'faHandshake'
            },
            {
              title: 'Dokumenty',
              description: 'Sprawdzimy wszystkie dokumenty i historię pojazdu',
              icon: 'faFileContract'
            },
            {
              title: 'Finalizacja',
              description: 'Sfinalizujemy transakcję i zajmiemy się formalnościami',
              icon: 'faMoneyBillWave'
            },
            {
              title: 'Przygotowanie',
              description: 'Przygotujemy profesjonalne zdjęcia i opis',
              icon: 'faCamera'
            },
            {
              title: 'Sprzedaż',
              description: 'Zajmiemy się sprzedażą i wszystkimi formalnościami',
              icon: 'faListCheck'
            }
          ],
          platforms: [
            {
              name: 'OLX',
              description: 'Sprawdź nasze ogłoszenia na OLX',
              url: 'https://olx.pl/motoporadnia',
              icon: 'faMotorcycle'
            },
            {
              name: 'Otomoto',
              description: 'Zobacz naszą ofertę na Otomoto',
              url: 'https://otomoto.pl/motoporadnia',
              icon: 'faMotorcycle'
            },
            {
              name: 'Facebook',
              description: 'Śledź nas na Facebooku',
              url: 'https://facebook.com/motoporadnia',
              icon: 'faFacebook'
            },
            {
              name: 'Instagram',
              description: 'Zobacz nasze zdjęcia na Instagramie',
              url: 'https://instagram.com/motoporadnia',
              icon: 'faInstagram'
            }
          ],
          cta: {
            title: 'Chcesz sprzedać motocykl?',
            description: 'Skontaktuj się z nami i umów się na wycenę. Oferujemy uczciwe warunki i szybką realizację.',
            phoneNumber: '789059578'
          }
        }
      },
      {
        type: 'services-transport',
        data: {
          hero: {
            title: "Transport motocykli Poznań i Europa",
            description: "Profesjonalny transport motocykli na terenie Poznania, całej Polski i Europy. Bezpieczny przewóz jednośladów z pełnym ubezpieczeniem.",
            images: [
              "/images/transport_1.jpg",
              "/images/transport_2.jpg",
              "/images/transport_3.jpg"
            ]
          },
          mainSections: [],
          operatingArea: {
            title: "Obszar działania",
            description: "Świadczymy kompleksowe usługi transportowe na trzech poziomach:",
            areas: [],
            additionalInfo: ""
          },
          cta: {
            title: "Potrzebujesz transportu motocykla?",
            description: "Skontaktuj się z nami, aby ustalić szczegóły transportu i otrzymać wycenę.",
            phoneNumber: "789059578"
          }
        }
      },
      {
        type: 'services-purchase',
        data: {
          hero: {
            title: 'Pomoc w zakupie motocykla',
            description: 'Profesjonalne wsparcie i doradztwo przy zakupie motocykla. Sprawdzimy stan techniczny i historię pojazdu.',
            images: [
              '/images/usluga_sprawdzanie_1.jpg',
              '/images/usluga_sprawdzanie_2.jpg',
              '/images/serwis_2.jpg'
            ]
          },
          mainSections: [
            {
              title: 'Profesjonalne doradztwo przy zakupie',
              content: [
                'Główną dziedziną naszej działalności jest doradztwo i pomoc w zakupie motocykla. Wykorzystując nasze wieloletnie doświadczenie w mechanice motocyklowej oraz korzystając z wielu profesjonalnych narzędzi, staramy się w jak najbardziej rzetelny sposób ocenić rzeczywisty stan techniczny oglądanego motocykla.',
                'Oglądając motocykl bazujemy na stworzonym przez nas raporcie weryfikacyjnym, aby nie pominąć istotnych i newralgicznych punktów w motocyklu.'
              ],
              image: '/images/usluga_sprawdzanie_1.jpg'
            },
            {
              title: 'Profesjonalne narzędzia diagnostyczne',
              content: [
                'Podczas oględzin, wykorzystujemy takie narzędzia jak wskaźnik osiowości tylnego koła, profesjonalny miernik lakieru, tester akumulatorów czy tester jakości płynu hamulcowego i chłodniczego.',
                'Pomoc w zakupie motocykla jako usługa jest dostępna także w formie zdalnej, klient otrzymuje od nas raport z dokonanych oględzin wraz z pakietem zdjęć i filmików ukazujących stan faktyczny oglądanego motocykla poprzez aplikacje WhatsApp niezwłocznie po dokonanych oględzinach.'
              ],
              image: '/images/usluga_sprawdzanie_2.jpg'
            }
          ],
          serviceFeatures: {
            title: 'Co zawiera usługa pomocy w zakupie motocykla?',
            features: [
              {
                icon: 'faClipboardCheck',
                text: 'Ocena stanu technicznego motocykla'
              },
              {
                icon: 'faSearch',
                text: 'Weryfikacja historii pojazdu'
              },
              {
                icon: 'faMotorcycle',
                text: 'Jazda próbna'
              },
              {
                icon: 'faMoneyBill',
                text: 'Wstępny kosztorys ewentualnych napraw'
              },
              {
                icon: 'faHandshake',
                text: 'Negocjacja ceny zakupu w oparciu o konkretne argumenty'
              },
              {
                icon: 'faTruckArrowRight',
                text: 'Możliwość przetransportowania motocykla'
              },
              {
                icon: 'faTag',
                text: 'Zniżkę na dokonanie podstawowych czynności serwisowych w naszym warsztacie'
              }
            ]
          },
          infoSections: [
            {
              title: 'Pierwszy motocykl - co przygotować?',
              introduction: 'Jeśli zgłaszasz się do nas w celu poszukiwania swojego pierwszego motocykla, przygotuj dla nas takie informacje jak:',
              items: [
                'Jaki planujesz przeznaczyć budżet na zakup motocykla?',
                'Czy masz zakupioną kompletną odzież motocyklową?',
                'Jakie są Twoje preferencje dotyczące motocykla? Sport, Naked a może coś z klasy Adventure?',
                'Czy masz jakieś doświadczenie motocyklowe poza kursem prawa jazdy?',
                'Jakie są Twoje predyspozycje, to znaczy waga i wzrost 😉'
              ]
            },
            {
              title: 'Masz wybrany motocykl?',
              introduction: 'Natomiast jeśli przychodzisz z konkretnym egzemplarzem, prosimy o uzyskanie takich informacji jak:',
              items: [
                'numer VIN',
                'data pierwszej rejestracji (za granicą)',
                'numer rejestracyjny'
              ],
              conclusion: 'Wszystkie wyżej wymienione informacje znajdują się na pierwszej stronie dowodu rejestracyjnego, te dane pozwolą nam na sprawdzenie historii pojazdu i weryfikacje historii kolizyjnej.'
            }
          ],
          remoteSection: {
            title: 'Zakup w pełni zdalny!',
            content: [
              'Świadczymy również usługę zakupu w pełni zdalnego!',
              'Jeśli nie masz czasu aby wybrać się wspólnie z nami na miejsce oględzin i chcesz zaufać naszemu profesjonalizmowi oferujemy zakup zdalny motocykla! Jedziemy, weryfikujemy, kupujemy i dostarczamy Twój motocykl pod dom bez Twojej obecności!'
            ]
          },
          cta: {
            title: 'Potrzebujesz pomocy w zakupie?',
            description: 'Skontaktuj się z nami, aby omówić szczegóły i umówić oględziny motocykla.',
            phoneNumber: '789059578'
          }
        }
      }
    ];

    for (const collection of collections) {
      console.log(`Aktualizacja kolekcji ${collection.type}...`);
      await db.collection('content').updateOne(
        { type: collection.type },
        { $set: collection },
      { upsert: true }
    );
      console.log(`Kolekcja ${collection.type} zaktualizowana`);
    }

    console.log('Wszystkie kolekcje zostały zaktualizowane!');
    await client.close();
  } catch (error) {
    console.error('Błąd podczas aktualizacji danych:', error);
  }
}

initializeContent(); 