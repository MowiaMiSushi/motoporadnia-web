import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'services-komis' });
    return NextResponse.json(content?.data || defaultContent);
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(defaultContent);
  }
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
      { type: 'services-komis' },
      { $set: { type: 'services-komis', data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

const defaultContent = {
  hero: {
    title: 'Komis Motocyklowy',
    description: 'Profesjonalny skup i sprzedaż motocykli używanych. Oferujemy uczciwe wyceny i bezpieczne transakcje.',
    images: ['/images/komis_1.webp', '/images/hero-bg_2.webp', '/images/hero-bg_3.webp', '/images/hero-bg_1.webp']
  },
  steps: [
    {
      title: 'Wstępna Wycena',
      description: 'Przygotujemy wstępną wycenę na podstawie przesłanych zdjęć i opisu',
      icon: 'faSearch'
    },
    {
      title: 'Oględziny',
      description: 'Umówimy się na dokładne oględziny motocykla',
      icon: 'faHandshake'
    },
    {
      title: 'Dokumenty',
      description: 'Sprawdzimy wszystkie dokumenty i historię pojazdu',
      icon: 'faFileContract'
    },
    {
      title: 'Finalizacja',
      description: 'Sfinalizujemy transakcję i zajmiemy się formalnościami',
      icon: 'faMoneyBillWave'
    },
    {
      title: 'Przygotowanie',
      description: 'Przygotujemy profesjonalne zdjęcia i opis',
      icon: 'faCamera'
    },
    {
      title: 'Sprzedaż',
      description: 'Zajmiemy się sprzedażą i wszystkimi formalnościami',
      icon: 'faListCheck'
    }
  ],
  platforms: [
    {
      name: 'OLX',
      description: 'Sprawdź nasze ogłoszenia na OLX',
      url: 'https://olx.pl/motoporadnia',
      icon: 'faMotorcycle'
    },
    {
      name: 'Otomoto',
      description: 'Zobacz naszą ofertę na Otomoto',
      url: 'https://otomoto.pl/motoporadnia',
      icon: 'faMotorcycle'
    },
    {
      name: 'Facebook',
      description: 'Śledź nas na Facebooku',
      url: 'https://facebook.com/motoporadnia',
      icon: 'faFacebook'
    },
    {
      name: 'Instagram',
      description: 'Zobacz nasze zdjęcia na Instagramie',
      url: 'https://instagram.com/motoporadnia',
      icon: 'faInstagram'
    }
  ],
  cta: {
    title: 'Chcesz sprzedać motocykl?',
    description: 'Skontaktuj się z nami i umów się na wycenę. Oferujemy uczciwe warunki i szybką realizację.',
    phoneNumber: '789059578'
  }
}; 