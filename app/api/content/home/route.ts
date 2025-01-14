import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'home' });
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
      { type: 'home' },
      { $set: { type: 'home', data } },
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
    title: 'MotoPoradnia',
    description: 'Fachowa pomoc przy zakupie, transporcie i serwisie motocykli jest to firma, stworzona przez ludzi, którzy nie wyobrażają sobie otaczającego ich świata bez jednośladów.',
    buttonText: 'Dowiedz się więcej o nas',
    buttonLink: '/o-nas',
    images: ['/images/hero-bg_1.webp', '/images/hero-bg_2.webp', '/images/hero-bg_3.webp']
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
}; 