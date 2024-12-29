import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'services-szkolenia' });
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
      { type: 'services-szkolenia' },
      { $set: { type: 'services-szkolenia', data } },
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
    title: "Szkolenia Motocyklowe na torze",
    description: "Szkolimy na najlepszych torach w Polsce",
    images: ["/images/szkolenia_1.webp", "/images/szkolenia_2.webp", "/images/szkolenia_3.webp"]
  },
  trainings: [
    {
      id: "tor-bydgoszcz",
      name: "Szkolenie na torze Bydgoszcz",
      description: "Profesjonalne szkolenie na jednym z najlepszych torów w Polsce. Poznaj techniki jazdy torowej i popraw swoje umiejętności pod okiem doświadczonych instruktorów.",
      includes: ["Teoria jazdy torowej", "Techniki pokonywania zakrętów", "Pozycja na motocyklu", "Analiza telemetrii", "Materiały szkoleniowe"]
    },
    {
      id: "tor-stary-kisielin",
      name: "Szkolenie na torze Stary Kisielin",
      description: "Szkolenie na technicznym torze w Starym Kisielinie. Idealne miejsce do nauki precyzyjnej jazdy i doskonalenia techniki.",
      includes: ["Teoria jazdy torowej", "Dobór linii przejazdu", "Techniki hamowania", "Praca z gazem", "Analiza przejazdów"]
    }
  ],
  events: [
    {
      id: 1,
      title: "Szkolenie Bydgoszcz - Kwiecień 2025",
      date: "12-13.04.2025",
      location: "Tor Bydgoszcz",
      fbEvent: "https://facebook.com/events/motoporadnia-szkolenie-1",
      description: "Dwudniowe szkolenie na torze w Bydgoszczy. Grupa początkująca i średniozaawansowana."
    },
    {
      id: 2,
      title: "Szkolenie Stary Kisielin - Maj 2025",
      date: "18-19.05.2025",
      location: "Tor Stary Kisielin",
      fbEvent: "https://facebook.com/events/motoporadnia-szkolenie-2",
      description: "Intensywne szkolenie dla wszystkich poziomów zaawansowania."
    },
    {
      id: 3,
      title: "Szkolenie Bydgoszcz - Czerwiec 2025",
      date: "15-16.06.2025",
      location: "Tor Bydgoszcz",
      fbEvent: "https://facebook.com/events/motoporadnia-szkolenie-3",
      description: "Szkolenie zaawansowane z analizą telemetrii."
    },
    {
      id: 4,
      title: "Szkolenie Stary Kisielin - Lipiec 2025",
      date: "20-21.07.2025",
      location: "Tor Stary Kisielin",
      fbEvent: "https://facebook.com/events/motoporadnia-szkolenie-4",
      description: "Szkolenie dla początkujących i średniozaawansowanych."
    },
    {
      id: 5,
      title: "Szkolenie Bydgoszcz - Sierpień 2025",
      date: "17-18.08.2025",
      location: "Tor Bydgoszcz",
      fbEvent: "https://facebook.com/events/motoporadnia-szkolenie-5",
      description: "Ostatnie letnie szkolenie na torze w Bydgoszczy."
    }
  ],
  schedule: {
    title: "Harmonogram szkoleń 2025",
    subtitle: "Zapisz się na najbliższy termin"
  },
  cta: {
    title: "Gotowy na nowe wyzwania?",
    description: "Skontaktuj się z nami i rozpocznij swoją przygodę z jazdą torową",
    phoneNumber: "789059578"
  }
}; 