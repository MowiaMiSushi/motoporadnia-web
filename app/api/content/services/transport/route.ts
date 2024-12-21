import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const contentDirectory = path.join(process.cwd(), 'content');
const filePath = path.join(contentDirectory, 'services', 'transport.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    // Jeśli plik nie istnieje, zwróć domyślną strukturę
    const defaultContent = {
      hero: {
        title: 'Transport motocykli',
        description: 'Profesjonalny i bezpieczny transport motocykli na terenie całego kraju. Gwarantujemy bezpieczeństwo i terminowość.',
        images: [
          '/images/transport_1.jpg',
          '/images/transport_2.jpg',
          '/images/transport_3.jpg'
        ]
      },
      mainSections: [
        {
          title: 'Bezpieczny transport',
          content: 'Zapewniamy profesjonalny transport motocykli z wykorzystaniem specjalistycznej przyczepy i systemu mocowań. Każdy motocykl jest odpowiednio zabezpieczony na czas transportu.',
          image: '/images/transport_1.jpg'
        },
        {
          title: 'Doświadczeni kierowcy',
          content: 'Nasi kierowcy posiadają wieloletnie doświadczenie w transporcie motocykli i dbają o bezpieczeństwo powierzonych im pojazdów.',
          image: '/images/transport_2.jpg'
        }
      ],
      services: [
        {
          title: 'Transport lokalny',
          description: 'Transport na terenie miasta i okolic.',
          price: 'od 150 zł'
        },
        {
          title: 'Transport krajowy',
          description: 'Transport na terenie całego kraju.',
          price: 'od 2 zł/km'
        },
        {
          title: 'Transport ekspresowy',
          description: 'Pilny transport w trybie ekspresowym.',
          price: 'wycena indywidualna'
        }
      ],
      features: {
        title: 'Co wyróżnia nasz transport?',
        items: [
          'Specjalistyczna przyczepa transportowa',
          'System profesjonalnych mocowań',
          'Doświadczeni kierowcy',
          'Ubezpieczenie ładunku',
          'Transport door-to-door',
          'Możliwość transportu kilku motocykli jednocześnie'
        ]
      },
      additionalInfo: {
        title: 'Informacje dodatkowe',
        description: 'Przed transportem zawsze:',
        items: [
          'Sprawdzamy stan techniczny motocykla',
          'Dokumentujemy fotograficznie stan pojazdu',
          'Zabezpieczamy wrażliwe elementy',
          'Ustalamy dokładny termin odbioru i dostawy',
          'Potwierdzamy trasę i koszty'
        ]
      },
      coverage: {
        title: 'Obszar działania',
        description: 'Świadczymy usługi transportowe na terenie całej Polski. Główne obszary działania to:',
        regions: [
          'Warszawa i okolice',
          'Cała Polska centralna',
          'Województwo mazowieckie',
          'Możliwość transportu w całym kraju',
          'Transport międzywojewódzki'
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