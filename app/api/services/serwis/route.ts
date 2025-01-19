import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('services').findOne({ identifier: 'serwis' });
    
    console.log('GET: Pobrane dane z bazy:', content);
    
    if (!content) {
      console.log('GET: Brak danych w bazie, zwracam domyślną zawartość');
      return NextResponse.json(defaultContent);
    }

    return NextResponse.json(content.data || defaultContent);
  } catch (error) {
    console.error('GET: Error fetching content:', error);
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const data = await request.json();
    console.log('POST: Otrzymane dane:', data);

    const { db } = await connectToDatabase();
    
    const result = await db.collection('services').updateOne(
      { identifier: 'serwis' },
      { 
        $set: { 
          identifier: 'serwis',
          data,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    console.log('POST: Wynik operacji zapisu:', result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST: Error saving content:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

const defaultContent = {
  services: [
    {
      id: 'przeglady',
      title: 'Przeglądy okresowe',
      description: 'Regularne przeglądy zgodne z książką serwisową',
      price: 'od 200 zł'
    },
    {
      id: 'diagnostyka',
      title: 'Diagnostyka komputerowa',
      description: 'Profesjonalny sprzęt diagnostyczny',
      price: 'od 150 zł'
    },
    {
      id: 'naprawy',
      title: 'Naprawy mechaniczne',
      description: 'Kompleksowe naprawy silnika i innych podzespołów',
      price: 'wycena indywidualna'
    }
  ]
}; 