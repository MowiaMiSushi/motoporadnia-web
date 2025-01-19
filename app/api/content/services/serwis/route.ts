import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

const defaultContent = {
  hero: {
    title: "Profesjonalny serwis motocyklowy",
    description: "Oferujemy kompleksową obsługę serwisową motocykli wszystkich marek. Nasz zespół doświadczonych mechaników zadba o Twój jednoślad.",
    images: ['/images/serwis_1.webp', '/images/serwis_2.webp']
  },
  services: [
    {
      icon: "faWrench",
      title: "Przeglądy okresowe",
      description: "Regularne przeglądy zgodne z książką serwisową"
    },
    {
      icon: "faLaptop",
      title: "Diagnostyka komputerowa",
      description: "Profesjonalny sprzęt diagnostyczny"
    },
    {
      icon: "faTools",
      title: "Naprawy mechaniczne",
      description: "Kompleksowe naprawy silnika i innych podzespołów"
    },
    {
      icon: "faOilCan",
      title: "Wymiana płynów",
      description: "Wymiana oleju, płynu hamulcowego i chłodniczego"
    },
    {
      icon: "faMotorcycle",
      title: "Przygotowanie do sezonu",
      description: "Kompleksowe przygotowanie motocykla do sezonu"
    },
    {
      icon: "faCogs",
      title: "Modyfikacje",
      description: "Profesjonalne modyfikacje i tuning"
    }
  ],
  brands: [
    {
      name: "Honda",
      image: "/images/brands/honda.webp"
    },
    {
      name: "Yamaha",
      image: "/images/brands/yamaha.webp"
    },
    {
      name: "Suzuki",
      image: "/images/brands/suzuki.webp"
    },
    {
      name: "Kawasaki",
      image: "/images/brands/kawasaki.webp"
    },
    {
      name: "BMW",
      image: "/images/brands/bmw.webp"
    },
    {
      name: "KTM",
      image: "/images/brands/ktm.webp"
    },
    {
      name: "Ducati",
      image: "/images/brands/ducati.webp"
    },
    {
      name: "Triumph",
      image: "/images/brands/triumph.webp"
    }
  ],
  cta: {
    title: "Potrzebujesz serwisu?",
    description: "Skontaktuj się z nami i umów wizytę w dogodnym terminie.",
    phoneNumber: "789059578"
  }
};

export async function GET() {
  console.log('API GET: Rozpoczynam pobieranie danych');
  const { db } = await connectToDatabase();

  try {
    const content = await db.collection('content').findOne({ identifier: 'serwis' });
    console.log('API GET: Pobrane dane z bazy:', JSON.stringify(content, null, 2));

    if (!content || !content.hero || !content.services) {
      console.log('API GET: Brak danych w bazie lub niekompletne dane, zwracam domyślną zawartość');
      return NextResponse.json(defaultContent);
    }

    const { _id, identifier, updatedAt, ...rest } = content;
    console.log('API GET: Zwracam dane:', JSON.stringify(rest, null, 2));
    return NextResponse.json(rest);
  } catch (error) {
    console.error('API GET: Error fetching content:', error);
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  console.log('API POST: Rozpoczynam zapisywanie danych');
  const session = await getServerSession(authOptions);

  if (!session) {
    console.log('API POST: Brak autoryzacji');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();
    const content = await request.json();
    console.log('API POST: Otrzymane dane:', JSON.stringify(content, null, 2));

    if (!content || !content.hero || !content.services) {
      console.log('API POST: Nieprawidłowe dane');
      return new NextResponse('Invalid content data', { status: 400 });
    }

    const result = await db.collection('content').updateOne(
      { identifier: 'serwis' },
      {
        $set: {
          ...content,
          identifier: 'serwis',
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    console.log('API POST: Wynik operacji zapisu:', JSON.stringify(result, null, 2));

    // Odśwież stronę kliencką
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/revalidate?path=/uslugi/serwis`, {
        method: 'POST'
      });
      console.log('API POST: Strona kliencka odświeżona');
    } catch (error) {
      console.error('API POST: Błąd podczas odświeżania strony:', error);
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('API POST: Error saving content:', error);
    return new NextResponse('Error saving content', { status: 500 });
  }
} 