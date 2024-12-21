import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import path from 'path';
import fs from 'fs/promises';

const contentFilePath = path.join(process.cwd(), 'content/services/szkolenia.json');

const defaultContent = {
  hero: {
    title: 'Szkolenia motocyklowe',
    description: 'Profesjonalne szkolenia z techniki jazdy motocyklem. Popraw swoje umiejętności pod okiem doświadczonych instruktorów.',
    images: [
      '/images/szkolenia_1.jpg',
      '/images/szkolenia_2.jpg',
      '/images/szkolenia_3.jpg'
    ]
  },
  mainSections: [
    {
      title: 'Doświadczeni instruktorzy',
      content: 'Nasi instruktorzy to doświadczeni motocykliści z wieloletnim stażem w szkoleniu. Posiadają niezbędne uprawnienia i certyfikaty.',
      image: '/images/szkolenia_1.jpg'
    },
    {
      title: 'Indywidualne podejście',
      content: 'Każde szkolenie dostosowujemy do poziomu i potrzeb kursanta. Skupiamy się na praktycznych umiejętnościach i bezpieczeństwie.',
      image: '/images/szkolenia_2.jpg'
    }
  ],
  courses: [
    {
      title: 'Kurs podstawowy',
      description: 'Podstawy techniki jazdy dla początkujących motocyklistów.',
      price: 'od 500 zł',
      duration: '1 dzień'
    },
    {
      title: 'Kurs zaawansowany',
      description: 'Zaawansowane techniki jazdy dla doświadczonych motocyklistów.',
      price: 'od 800 zł',
      duration: '2 dni'
    },
    {
      title: 'Szkolenie indywidualne',
      description: 'Indywidualne szkolenie dostosowane do potrzeb kursanta.',
      price: 'od 300 zł',
      duration: '4 godziny'
    }
  ],
  features: {
    title: 'Co wyróżnia nasze szkolenia?',
    items: [
      'Doświadczeni instruktorzy',
      'Indywidualne podejście',
      'Małe grupy szkoleniowe',
      'Nowoczesny sprzęt szkoleniowy',
      'Bezpieczny plac manewrowy',
      'Certyfikat ukończenia szkolenia'
    ]
  },
  additionalInfo: {
    title: 'Informacje dodatkowe',
    description: 'Co zapewniamy w ramach szkolenia:',
    items: [
      'Materiały szkoleniowe',
      'Napoje i przekąski',
      'Ubezpieczenie NNW',
      'Certyfikat ukończenia',
      'Możliwość wypożyczenia motocykla'
    ]
  },
  requirements: {
    title: 'Wymagania',
    description: 'Co jest potrzebne do udziału w szkoleniu:',
    items: [
      'Prawo jazdy kategorii A (odpowiedniej do typu motocykla)',
      'Własny motocykl lub możliwość wypożyczenia',
      'Kompletny strój motocyklowy',
      'Dobry stan zdrowia',
      'Chęć do nauki i doskonalenia umiejętności'
    ]
  }
};

export async function GET() {
  try {
    const content = await fs.readFile(contentFilePath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    // If file doesn't exist, return default content
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const content = await request.json();
    
    // Ensure the content directory exists
    const contentDir = path.dirname(contentFilePath);
    await fs.mkdir(contentDir, { recursive: true });
    
    // Save the content
    await fs.writeFile(contentFilePath, JSON.stringify(content, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return new NextResponse('Error saving content', { status: 500 });
  }
} 