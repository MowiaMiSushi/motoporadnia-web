import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'transport' });
    
    if (!content) {
      return NextResponse.json({});
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching transport content:', error);
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const data = await request.json();

    await db.collection('content').updateOne(
      { type: 'transport' },
      { $set: { type: 'transport', content: data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving transport content:', error);
    return NextResponse.error();
  }
} 