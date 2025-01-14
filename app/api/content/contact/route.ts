import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { contactData as defaultContent } from '@/app/kontakt/data';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'contact' });
    return NextResponse.json(content?.data || defaultContent);
  } catch (error) {
    console.error('Error fetching contact content:', error);
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const data = await request.json();

    await db.collection('content').updateOne(
      { type: 'contact' },
      { $set: { type: 'contact', data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating contact content:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
} 