import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const seoData = await db.collection('seo').findOne({ type: 'seo-settings' });
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

    await db.collection('seo').updateOne(
      { type: 'seo-settings' },
      { $set: { type: 'seo-settings', data } },
      { upsert: true }
    );

    return NextResponse.json({ message: 'SEO data updated successfully' });
  } catch (error) {
    console.error('Error updating SEO data:', error);
    return NextResponse.json({ error: 'Failed to update SEO data' }, { status: 500 });
  }
} 