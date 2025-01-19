import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'pricing-purchase' });
    console.log('Dane z bazy:', content);
    
    // Jeśli nie ma danych lub brak wymaganych pól, zwróć pusty obiekt
    if (!content?.data?.hero || !content?.data?.priceList || !content?.data?.disclaimer) {
      console.log('Brak wymaganych pól w bazie, zwracam pusty obiekt');
      return NextResponse.json({});
    }
    
    return NextResponse.json(content?.data || {});
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Otrzymane dane do zapisu:', data);
    
    const { db } = await connectToDatabase();
    
    await db.collection('content').updateOne(
      { type: 'pricing-purchase' },
      { 
        $set: { 
          data,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Content updated successfully' });
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
} 