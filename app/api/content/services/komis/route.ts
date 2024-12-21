import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const contentDirectory = path.join(process.cwd(), 'content');
const filePath = path.join(contentDirectory, 'services', 'komis.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    // Jeśli plik nie istnieje, zwróć domyślną strukturę
    const defaultContent = {
      hero: {
        title: 'Komis motocyklowy',
        description: 'Profesjonalny skup i sprzedaż motocykli używanych. Gwarantujemy uczciwą wycenę i bezpieczne transakcje.',
        images: [
          '/images/komis_1.jpg',
          '/images/komis_2.jpg',
          '/images/komis_3.jpg'
        ]
      },
      mainSections: [
        {
          title: 'Skup motocykli',
          content: 'Oferujemy uczciwe ceny za motocykle wszystkich marek. Przed wyceną przeprowadzamy dokładne oględziny i weryfikację stanu technicznego.',
          image: '/images/komis_1.jpg'
        },
        {
          title: 'Sprzedaż motocykli',
          content: 'W naszej ofercie znajdziesz szeroki wybór sprawdzonych motocykli używanych. Każdy pojazd przechodzi dokładną weryfikację techniczną.',
          image: '/images/komis_2.jpg'
        }
      ],
      services: [
        {
          title: 'Wycena motocykla',
          description: 'Profesjonalna wycena twojego motocykla.',
          price: 'bezpłatnie'
        },
        {
          title: 'Pośrednictwo w sprzedaży',
          description: 'Kompleksowa obsługa sprzedaży twojego motocykla.',
          price: 'prowizja od sprzedaży'
        },
        {
          title: 'Skup motocykli',
          description: 'Natychmiastowy skup motocykli za gotówkę.',
          price: 'wycena indywidualna'
        }
      ],
      features: {
        title: 'Co wyróżnia nasz komis?',
        items: [
          'Uczciwa wycena motocykli',
          'Profesjonalna weryfikacja techniczna',
          'Bezpieczne transakcje',
          'Pomoc w formalnościach',
          'Możliwość pozostawienia motocykla w rozliczeniu',
          'Gwarancja na zakupione motocykle'
        ]
      },
      additionalInfo: {
        title: 'Informacje dodatkowe',
        description: 'Przed skupem lub przyjęciem do komisu:',
        items: [
          'Sprawdzamy stan techniczny motocykla',
          'Weryfikujemy historię pojazdu',
          'Sprawdzamy dokumentację',
          'Przeprowadzamy jazdę próbną',
          'Przygotowujemy szczegółową dokumentację fotograficzną'
        ]
      },
      commission: {
        title: 'Jak działa nasz komis?',
        description: 'Proces sprzedaży motocykla w naszym komisie jest prosty i przejrzysty:',
        steps: [
          {
            title: 'Wycena',
            description: 'Przeprowadzamy dokładne oględziny i wycenę motocykla.'
          },
          {
            title: 'Umowa',
            description: 'Podpisujemy umowę komisową z ustalonymi warunkami sprzedaży.'
          },
          {
            title: 'Przygotowanie',
            description: 'Przygotowujemy motocykl do sprzedaży, wykonujemy profesjonalne zdjęcia i opis.'
          },
          {
            title: 'Promocja',
            description: 'Promujemy motocykl na różnych platformach sprzedażowych.'
          },
          {
            title: 'Sprzedaż',
            description: 'Zajmujemy się całym procesem sprzedaży, włącznie z formalnościami.'
          }
        ]
      }
    };

    // Zapisz domyślną zawartość do pliku
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(defaultContent, null, 2));
    
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const content = await request.json();
    
    // Upewnij się, że katalog istnieje
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    
    // Zapisz zawartość do pliku
    await fs.writeFile(filePath, JSON.stringify(content, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return new NextResponse('Error saving content', { status: 500 });
  }
} 