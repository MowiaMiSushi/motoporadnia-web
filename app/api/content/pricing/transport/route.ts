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

    // Jeśli nie ma danych w bazie, zwróć domyślną zawartość
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
    let content;
    try {
      content = await request.json();
    } catch (e) {
      console.error('POST: Błąd parsowania JSON:', e);
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
    }

    console.log('POST: Otrzymane dane do zapisania:', JSON.stringify(content, null, 2));

    // Sprawdź czy dane zawierają wymagane pola
    if (!content.hero || !content.pricingCategories) {
      console.error('POST: Brak wymaganych pól w danych');
      return NextResponse.json({ error: 'Missing required fields: hero or pricingCategories' }, { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db();

    try {
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

      return NextResponse.json({ success: true, result });
    } catch (dbError) {
      console.error('POST: Błąd bazy danych:', dbError);
      return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('POST: Error saving content:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 