import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { revalidatePath } from 'next/cache';

export async function GET() {
  try {
    const client = await connectToDatabase();
    const db = client.db();

    const content = await db.collection('content').findOne({ identifier: 'transport-pricing' });
    console.log('Pobrane dane z bazy:', content);

    // Jeśli nie ma danych w bazie, zwróć pusty obiekt
    if (!content) {
      return NextResponse.json({});
    }

    // Usuń pole identifier i updatedAt z odpowiedzi
    const { identifier, updatedAt, _id, ...rest } = content;
    return NextResponse.json(rest);
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    console.log('Otrzymane dane do zapisania:', content);

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

    console.log('Wynik operacji zapisu:', result);

    // Odśwież stronę kliencką
    revalidatePath('/uslugi/transport/cennik');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 