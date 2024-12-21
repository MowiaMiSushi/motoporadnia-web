import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs/promises';
import path from 'path';

const contentPath = path.join(process.cwd(), 'content');
const servicesContentPath = path.join(contentPath, 'services.json');

export async function GET() {
  try {
    await fs.access(contentPath);
  } catch {
    await fs.mkdir(contentPath, { recursive: true });
  }

  try {
    const content = await fs.readFile(servicesContentPath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({
      hero: {
        title: 'Nasze Usługi',
        subtitle: 'Profesjonalna obsługa i wsparcie dla motocyklistów',
        backgroundImages: [
          '/images/hero-bg_1.jpg',
          '/images/hero-bg_2.jpg',
          '/images/hero-bg_3.png'
        ]
      },
      services: [
        {
          id: 'purchase-help',
          title: 'Pomoc w zakupie motocykla',
          shortDescription: 'Profesjonalne wsparcie przy wyborze i zakupie motocykla',
          description: [
            'Kompleksowa pomoc przy zakupie motocykla',
            'Sprawdzenie stanu technicznego',
            'Weryfikacja dokumentacji',
            'Negocjacje cenowe',
            'Transport motocykla'
          ],
          image: '/images/services/purchase-help.jpg',
          link: '/uslugi/pomoc-w-zakupie',
          features: [
            {
              title: 'Oględziny motocykla',
              description: 'Dokładne sprawdzenie stanu technicznego i wizualnego'
            },
            {
              title: 'Dokumentacja',
              description: 'Weryfikacja historii i dokumentów pojazdu'
            },
            {
              title: 'Wycena',
              description: 'Profesjonalna wycena wartości motocykla'
            }
          ]
        },
        {
          id: 'service',
          title: 'Serwis motocykli',
          shortDescription: 'Kompleksowy serwis i naprawy motocykli',
          description: [
            'Przeglądy okresowe',
            'Naprawy mechaniczne',
            'Diagnostyka komputerowa',
            'Wymiana płynów i materiałów eksploatacyjnych',
            'Przygotowanie do sezonu'
          ],
          image: '/images/services/service.jpg',
          link: '/uslugi/serwis',
          features: [
            {
              title: 'Przeglądy',
              description: 'Regularne przeglądy i konserwacja'
            },
            {
              title: 'Naprawy',
              description: 'Profesjonalne naprawy mechaniczne'
            },
            {
              title: 'Diagnostyka',
              description: 'Nowoczesna diagnostyka komputerowa'
            }
          ]
        },
        {
          id: 'transport',
          title: 'Transport motocykli',
          shortDescription: 'Bezpieczny transport motocykli',
          description: [
            'Transport motocykli na terenie całego kraju',
            'Specjalistyczna laweta',
            'Ubezpieczenie podczas transportu',
            'Transport na zawody i zloty',
            'Pomoc w przypadku awarii'
          ],
          image: '/images/services/transport.jpg',
          link: '/uslugi/transport',
          features: [
            {
              title: 'Laweta',
              description: 'Specjalistyczna laweta do transportu motocykli'
            },
            {
              title: 'Zasięg',
              description: 'Transport na terenie całego kraju'
            },
            {
              title: 'Bezpieczeństwo',
              description: 'Pełne ubezpieczenie podczas transportu'
            }
          ]
        },
        {
          id: 'training',
          title: 'Szkolenia motocyklowe',
          shortDescription: 'Profesjonalne szkolenia dla motocyklistów',
          description: [
            'Szkolenia dla początkujących',
            'Doskonalenie techniki jazdy',
            'Jazda torowa',
            'Szkolenia indywidualne',
            'Szkolenia grupowe'
          ],
          image: '/images/services/training.jpg',
          link: '/uslugi/szkolenia',
          features: [
            {
              title: 'Poziomy',
              description: 'Szkolenia dla początkujących i zaawansowanych'
            },
            {
              title: 'Technika',
              description: 'Doskonalenie techniki jazdy'
            },
            {
              title: 'Tor',
              description: 'Szkolenia na torze wyścigowym'
            }
          ]
        },
        {
          id: 'commission',
          title: 'Komis motocyklowy',
          shortDescription: 'Sprzedaż i skup motocykli',
          description: [
            'Sprzedaż motocykli',
            'Skup motocykli',
            'Wycena motocykli',
            'Pomoc w sprzedaży',
            'Przygotowanie do sprzedaży'
          ],
          image: '/images/services/commission.jpg',
          link: '/uslugi/komis',
          features: [
            {
              title: 'Sprzedaż',
              description: 'Szeroki wybór sprawdzonych motocykli'
            },
            {
              title: 'Skup',
              description: 'Uczciwa wycena i szybka realizacja'
            },
            {
              title: 'Przygotowanie',
              description: 'Profesjonalne przygotowanie do sprzedaży'
            }
          ]
        }
      ]
    });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  let content;
  try {
    content = await request.json();
    await fs.access(contentPath);
  } catch {
    await fs.mkdir(contentPath, { recursive: true });
  }

  if (!content) {
    return new NextResponse('Invalid content', { status: 400 });
  }

  await fs.writeFile(servicesContentPath, JSON.stringify(content, null, 2));

  return NextResponse.json({ success: true });
} 