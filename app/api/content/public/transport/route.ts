import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'transport' });

    if (!content) {
      console.log('No transport content found');
      return NextResponse.json({});
    }

    return NextResponse.json(content.data);
  } catch (error) {
    console.error('Error fetching transport content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 