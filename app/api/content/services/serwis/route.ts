import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const contentDirectory = path.join(process.cwd(), 'content');
const filePath = path.join(contentDirectory, 'services', 'serwis.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    // Jeśli plik nie istnieje, zwróć domyślną strukturę
    const defaultContent = {
      hero: {
        title: 'Serwis motocykli',
        description: 'Profesjonalny serwis motocykli wszystkich marek. Naprawy, przeglądy i diagnostyka.',
        images: [
          '/images/serwis_1.jpg',
          '/images/serwis_2.jpg',
          '/images/serwis_3.jpg'
        ]
      },
      mainSections: [
        {
          title: 'Kompleksowa obsługa serwisowa',
          content: 'Nasz serwis oferuje pełen zakres usług serwisowych dla motocykli wszystkich marek. Dysponujemy profesjonalnym sprzętem diagnostycznym i doświadczoną kadrą mechaników.',
          image: '/images/serwis_1.jpg'
        },
        {
          title: 'Nowoczesne wyposażenie',
          content: 'Korzystamy z najnowocześniejszego sprzętu diagnostycznego i narzędzi, co pozwala nam na precyzyjną diagnostykę i skuteczne naprawy.',
          image: '/images/serwis_2.jpg'
        }
      ],
      services: [
        {
          title: 'Przegląd okresowy',
          description: 'Kompleksowy przegląd techniczny motocykla zgodnie z zaleceniami producenta.',
          price: 'od 200 zł'
        },
        {
          title: 'Wymiana oleju',
          description: 'Wymiana oleju silnikowego wraz z filtrem.',
          price: 'od 150 zł'
        },
        {
          title: 'Diagnostyka komputerowa',
          description: 'Pełna diagnostyka elektroniki motocykla.',
          price: 'od 100 zł'
        }
      ],
      features: {
        title: 'Co wyróżnia nasz serwis?',
        items: [
          'Profesjonalny sprzęt diagnostyczny',
          'Doświadczeni mechanicy',
          'Szybka realizacja napraw',
          'Konkurencyjne ceny',
          'Gwarancja na wykonane usługi',
          'Możliwość transportu motocykla'
        ]
      },
      additionalInfo: {
        title: 'Informacje dodatkowe',
        description: 'Przed rozpoczęciem prac serwisowych zawsze:',
        items: [
          'Przeprowadzamy dokładną diagnostykę',
          'Konsultujemy z klientem zakres prac',
          'Przedstawiamy szczegółowy kosztorys',
          'Ustalamy termin realizacji',
          'Informujemy o postępach prac'
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