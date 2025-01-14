import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  const { db } = await connectToDatabase();
  const content = await db.collection('content').findOne({ type: 'services' });
  return NextResponse.json(content?.data || defaultContent);
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { db } = await connectToDatabase();
    const data = await request.json();

    await db.collection('content').updateOne(
      { type: 'services' },
      { $set: { type: 'services', data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

const defaultContent = {
  title: 'Nasze Usługi',
  description: 'Oferujemy kompleksową obsługę motocykli',
  services: [
    {
      id: 'serwis',
      title: 'Serwis Motocykli',
      description: 'Profesjonalny serwis i naprawa motocykli wszystkich marek',
      image: '/images/serwis_1.webp',
      link: '/uslugi/serwis'
    },
    {
      id: 'transport',
      title: 'Transport Motocykli',
      description: 'Bezpieczny transport motocykli na terenie całego kraju',
      image: '/images/transport_3.webp',
      link: '/uslugi/transport'
    },
    {
      id: 'pomoc-w-zakupie',
      title: 'Pomoc w Zakupie',
      description: 'Profesjonalne doradztwo przy zakupie motocykla',
      image: '/images/usluga_sprawdzanie_1.webp',
      link: '/uslugi/pomoc-w-zakupie'
    },
    {
      id: 'szkolenia',
      title: 'Szkolenia',
      description: 'Szkolenia dla początkujących i zaawansowanych motocyklistów',
      image: '/images/szkolenia_2.webp',
      link: '/uslugi/szkolenia'
    },
    {
      id: 'komis',
      title: 'Komis',
      description: 'Sprzedaż i skup motocykli używanych',
      image: '/images/komis_1.webp',
      link: '/uslugi/komis'
    }
  ]
}; 