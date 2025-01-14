import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const seoData = await db.collection('seo').findOne({ identifier: 'global' });
    return NextResponse.json(seoData?.data || {});
  } catch (error) {
    console.error('Error fetching SEO data:', error);
    return NextResponse.json({ error: 'Failed to fetch SEO data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { db } = await connectToDatabase();

    console.log('Zapisywanie danych SEO:', data);

    const result = await db.collection('seo').updateOne(
      { identifier: 'global' },
      { 
        $set: { 
          identifier: 'global',
          data: data,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    console.log('Wynik aktualizacji:', result);

    return NextResponse.json({ 
      message: 'SEO data updated successfully',
      result: result
    });
  } catch (error) {
    console.error('Error updating SEO data:', error);
    return NextResponse.json({ 
      error: 'Failed to update SEO data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 