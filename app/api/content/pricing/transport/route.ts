import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    console.log('GET: Rozpoczynam pobieranie danych');
    const client = await connectToDatabase();
    const db = client.db();

    const content = await db.collection('content').findOne({ identifier: 'transport-pricing' });
    console.log('GET: Pobrane dane z bazy:', JSON.stringify(content, null, 2));

    // Jeśli nie ma danych w bazie, zwróć pusty obiekt
    if (!content) {
      console.log('GET: Brak danych w bazie, zwracam pusty obiekt');
      return NextResponse.json({});
    }

    // Usuń pole identifier i updatedAt z odpowiedzi
    const { identifier, updatedAt, _id, ...rest } = content;
    console.log('GET: Zwracam dane:', JSON.stringify(rest, null, 2));
    return NextResponse.json(rest);
  } catch (error) {
    console.error('GET: Error fetching content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    console.log('POST: Rozpoczynam zapisywanie danych');
    const content = await request.json();
    console.log('POST: Otrzymane dane do zapisania:', JSON.stringify(content, null, 2));

    const client = await connectToDatabase();
    const db = client.db();

    const result = await db.collection('content').updateOne(
      { identifier: 'transport-pricing' },
      { 
        $set: { 
          ...content,
          identifier: 'transport-pricing',
          updatedAt: new Date()
        } 
      },
      { upsert: true }
    );

    console.log('POST: Wynik operacji zapisu:', JSON.stringify(result, null, 2));

    // Odśwież stronę kliencką
    revalidatePath('/uslugi/transport/cennik');
    console.log('POST: Strona kliencka odświeżona');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST: Error saving content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 