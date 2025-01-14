import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'services-purchase' });
    return NextResponse.json(content?.data || defaultContent);
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();
    const data = await request.json();

    if (!data) {
      return new NextResponse('Invalid content', { status: 400 });
    }

    await db.collection('content').updateOne(
      { type: 'services-purchase' },
      { $set: { type: 'services-purchase', data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

const defaultContent = {
  hero: {
    title: 'Pomoc w zakupie motocykla',
    description: 'Profesjonalne wsparcie i doradztwo przy zakupie motocykla. Sprawdzimy stan techniczny i historię pojazdu.',
    images: [
      '/images/usluga_sprawdzanie_1.webp',
      '/images/usluga_sprawdzanie_2.webp',
      '/images/serwis_2.webp'
    ]
  },
  mainSections: [
    {
      title: 'Profesjonalne doradztwo przy zakupie',
      content: [
        'Główną dziedziną naszej działalności jest doradztwo i pomoc w zakupie motocykla. Wykorzystując nasze wieloletnie doświadczenie w mechanice motocyklowej oraz korzystając z wielu profesjonalnych narzędzi, staramy się w jak najbardziej rzetelny sposób ocenić rzeczywisty stan techniczny oglądanego motocykla.',
        'Oglądając motocykl bazujemy na stworzonym przez nas raporcie weryfikacyjnym, aby nie pominąć istotnych i newralgicznych punktów w motocyklu.'
      ],
      image: '/images/usluga_sprawdzanie_1.webp'
    },
    {
      title: 'Profesjonalne narzędzia diagnostyczne',
      content: [
        'Podczas oględzin, wykorzystujemy takie narzędzia jak wskaźnik osiowości tylnego koła, profesjonalny miernik lakieru, tester akumulatorów czy tester jakości płynu hamulcowego i chłodniczego.',
        'Pomoc w zakupie motocykla jako usługa jest dostępna także w formie zdalnej, klient otrzymuje od nas raport z dokonanych oględzin wraz z pakietem zdjęć i filmików ukazujących stan faktyczny oglądanego motocykla poprzez aplikacje WhatsApp niezwłocznie po dokonanych oględzinach.'
      ],
      image: '/images/usluga_sprawdzanie_2.webp'
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
}; 