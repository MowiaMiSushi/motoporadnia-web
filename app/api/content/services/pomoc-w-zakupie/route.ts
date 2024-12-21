import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const contentDirectory = path.join(process.cwd(), 'content');
const filePath = path.join(contentDirectory, 'services', 'pomoc-w-zakupie.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    // Jeśli plik nie istnieje, zwróć domyślną strukturę
    const defaultContent = {
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
          content: 'Główną dziedziną naszej działalności jest doradztwo i pomoc w zakupie motocykla. Wykorzystując nasze wieloletnie doświadczenie w mechanice motocyklowej oraz korzystając z wielu profesjonalnych narzędzi, staramy się w jak najbardziej rzetelny sposób ocenić rzeczywisty stan techniczny oglądanego motocykla.',
          image: '/images/usluga_sprawdzanie_1.jpg'
        },
        {
          title: 'Profesjonalne narzędzia diagnostyczne',
          content: 'Podczas oględzin, wykorzystujemy takie narzędzia jak wskaźnik osiowości tylnego koła, profesjonalny miernik lakieru, tester akumulatorów czy tester jakości płynu hamulcowego i chłodniczego.',
          image: '/images/usluga_sprawdzanie_2.jpg'
        }
      ],
      features: {
        title: 'Co zawiera usługa pomocy w zakupie motocykla?',
        items: [
          'Ocena stanu technicznego motocykla',
          'Weryfikacja historii pojazdu',
          'Jazda próbna',
          'Wstępny kosztorys ewentualnych napraw',
          'Negocjacja ceny zakupu w oparciu o konkretne argumenty',
          'Możliwość przetransportowania motocykla',
          'Zniżkę na dokonanie podstawowych czynności serwisowych w naszym warsztacie'
        ]
      },
      additionalInfo: {
        firstBike: {
          title: 'Pierwszy motocykl - co przygotować?',
          description: 'Jeśli zgłaszasz się do nas w celu poszukiwania swojego pierwszego motocykla, przygotuj dla nas takie informacje jak:',
          items: [
            'Jaki planujesz przeznaczyć budżet na zakup motocykla?',
            'Czy masz zakupioną kompletną odzież motocyklową?',
            'Jakie są Twoje preferencje dotyczące motocykla? Sport, Naked a może coś z klasy Adventure?',
            'Czy masz jakieś doświadczenie motocyklowe poza kursem prawa jazdy?',
            'Jakie są Twoje predyspozycje, to znaczy waga i wzrost'
          ]
        },
        selectedBike: {
          title: 'Masz wybrany motocykl?',
          description: 'Natomiast jeśli przychodzisz z konkretnym egzemplarzem, prosimy o uzyskanie takich informacji jak:',
          items: [
            'numer VIN',
            'data pierwszej rejestracji (za granicą)',
            'numer rejestracyjny'
          ],
          additionalInfo: 'Wszystkie wyżej wymienione informacje znajdują się na pierwszej stronie dowodu rejestracyjnego, te dane pozwolą nam na sprawdzenie historii pojazdu i weryfikacje historii kolizyjnej.'
        }
      },
      remoteService: {
        title: 'Zakup w pełni zdalny!',
        description: [
          'Świadczymy również usługę zakupu w pełni zdalnego!',
          'Jeśli nie masz czasu aby wybrać się wspólnie z nami na miejsce oględzin i chcesz zaufać naszemu profesjonalizmowi oferujemy zakup zdalny motocykla! Jedziemy, weryfikujemy, kupujemy i dostarczamy Twój motocykl pod dom bez Twojej obecności!'
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