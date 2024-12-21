import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs/promises';
import path from 'path';

const contentPath = path.join(process.cwd(), 'content');
const aboutContentPath = path.join(contentPath, 'about.json');

export async function GET() {
  try {
    await fs.access(contentPath);
  } catch {
    await fs.mkdir(contentPath, { recursive: true });
  }

  try {
    const content = await fs.readFile(aboutContentPath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch {
    return NextResponse.json({
      hero: {
        title: 'O nas',
        subtitle: 'Poznaj naszą historię i pasję do motocykli',
        backgroundImages: [
          '/images/hero-bg_1.jpg',
          '/images/hero-bg_2.jpg',
          '/images/hero-bg_3.png'
        ]
      },
      history: {
        sections: [
          {
            text: [
              'Motoporadnia – Fachowa pomoc przy zakupie, transporcie i serwisie motocykli jest to firma, stworzona przez ludzi, którzy nie wyobrażają sobie otaczającego ich świata bez jednośladów.',
              'Początek działalności miał miejsce już w najmłodszych latach założyciela. Adrian, zaraz po stawianiu pierwszych kroków wsiadł na elektrycznie napędzanego Repsola aby pokonywać pierwsze metry na dwóch (wtedy jeszcze czterech) kółkach.'
            ],
            image: '/images/o-nas_3.jpg'
          },
          {
            text: [
              'Proces rozwojowy naszej pasji i nauki wszystkiego co motocyklowe szedł swoim naturalnym trybem. Pierwsze motocykle z czasów radzieckich, ujeżdżanie wszystkiego co ma silnik i koła w czasach szkolnych, siedzenie do późnych nocy w garażu usprawniając i modyfikując swoje motocykle, praca w warsztatach.',
              'Kolejne lata doświadczenie jak należycie obsługiwać motocykl zachowując najwyższą jakość bezpieczeństwa, serwisu i estetyki nabieraliśmy na torach wyścigowych jako mechanicy znanych zawodników oraz sami biorąc czynny udział na linii startu.'
            ],
            image: '/images/o-nas_2.jpg'
          },
          {
            text: [
              'Efektem tego czego nauczyliśmy się przez te wszystkie motocyklowe lata, setki godzin pracy i tysiące pokonanych kilometrów na drogach oraz torach jest Motoporadnia. Firma, gdzie każdy motocyklista niezależnie od doświadczenia znajdzie odpowiedź na swoje motocyklowe pytania oraz potrzeby przy pomocy specjalistów i profesjonalistów.',
              'Zapraszamy do zapoznania się z zakresem naszych usług, który z czasem na pewno będzie się powiększał!'
            ],
            image: '/images/o-nas_1.jpg'
          }
        ]
      },
      team: {
        title: 'Nasz Zespół',
        members: [
          {
            name: 'Aleksandra',
            position: 'Przedstawicielka',
            image: '/images/pracownik_1.png'
          },
          {
            name: 'Adrian',
            position: 'Kierownik',
            image: '/images/pracownik_2.png'
          },
          {
            name: 'Bartosz',
            position: 'Mechanik',
            image: '/images/pracownik_3.png'
          }
        ]
      },
      socialMedia: {
        title: 'Śledź nas w social mediach',
        socials: [
          {
            platform: 'Facebook',
            url: 'https://www.facebook.com/motoporadnia',
            description: 'Dołącz do naszej społeczności na Facebooku'
          },
          {
            platform: 'Instagram',
            url: 'https://www.instagram.com/motoporadnia',
            description: 'Zobacz nasze najnowsze zdjęcia'
          },
          {
            platform: 'YouTube',
            url: 'https://www.youtube.com/@motoporadnia',
            description: 'Obejrzyj nasze filmy i poradniki'
          }
        ]
      }
    });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  let content;
  try {
    content = await request.json();
    await fs.access(contentPath);
  } catch {
    await fs.mkdir(contentPath, { recursive: true });
  }

  if (!content) {
    return new NextResponse('Invalid content', { status: 400 });
  }

  await fs.writeFile(aboutContentPath, JSON.stringify(content, null, 2));

  return NextResponse.json({ success: true });
} 