import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'services-service' });
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
      { type: 'services-service' },
      { $set: { type: 'services-service', data } },
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
    title: "Serwis motocyklowy",
    description: "Profesjonalny serwis motocyklowy z wieloletnim doświadczeniem. Zajmujemy się naprawą i konserwacją motocykli wszystkich marek.",
    images: [
      "/images/serwis_1.webp",
      "/images/serwis_2.webp",
      "/images/serwis_3.webp"
    ]
  },
  services: [
    {
      icon: "faWrench",
      title: "Przeglądy okresowe",
      description: "Regularne przeglądy zgodne z książką serwisową, zapewniające długą żywotność motocykla."
    },
    {
      icon: "faLaptop",
      title: "Diagnostyka komputerowa",
      description: "Profesjonalny sprzęt diagnostyczny do wykrywania i analizy usterek elektronicznych."
    },
    {
      icon: "faTools",
      title: "Naprawy mechaniczne",
      description: "Kompleksowe naprawy silnika, skrzyni biegów i innych podzespołów mechanicznych."
    },
    {
      icon: "faOilCan",
      title: "Wymiana płynów i filtrów",
      description: "Wymiana oleju silnikowego, płynu hamulcowego i innych płynów eksploatacyjnych."
    },
    {
      icon: "faRing",
      title: "Wymiana opon",
      description: "Profesjonalna wymiana opon, wyważanie kół i doradztwo w doborze ogumienia."
    },
    {
      icon: "faSun",
      title: "Przygotowanie do sezonu",
      description: "Kompleksowe przygotowanie motocykla do sezonu lub zimowania."
    }
  ],
  brands: [
    { name: "Honda", image: "/images/brands/honda.webp" },
    { name: "Yamaha", image: "/images/brands/yamaha.webp" },
    { name: "Suzuki", image: "/images/brands/suzuki.webp" },
    { name: "Ducati", image: "/images/brands/ducati.webp" },
    { name: "Kawasaki", image: "/images/brands/kawasaki.webp" },
    { name: "BMW", image: "/images/brands/bmw.webp" },
    { name: "KTM", image: "/images/brands/ktm.webp" },
    { name: "Harley Davidson", image: "/images/brands/harley.webp" },
    { name: "Husqvarna", image: "/images/brands/husqvarna.webp" },
    { name: "Piaggio", image: "/images/brands/piaggio.webp" },
    { name: "Triumph", image: "/images/brands/triumph.webp" },
    { name: "Indian", image: "/images/brands/indian.webp" },
    { name: "MV Agusta", image: "/images/brands/mv_agusta.webp" },
    { name: "Benelli", image: "/images/brands/benelli.webp" },
    { name: "Aprilia", image: "/images/brands/aprilia.webp" },
    { name: "Moto Guzzi", image: "/images/brands/moto_guzzi.webp" }
  ],
  cta: {
    title: "Jak umówić się na serwis?",
    description: "Skontaktuj się z nami telefonicznie lub napisz do nas, aby umówić termin wizyty w serwisie. Doradzimy i pomożemy w wyborze odpowiedniego zakresu usług.",
    phoneNumber: "789059578"
  }
}; 