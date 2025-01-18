import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const pricing = await db.collection('pricing').findOne({ type: 'service' });
    return NextResponse.json(pricing?.sections || []);
  } catch (error) {
    console.error('Error fetching pricing data:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const sections = await request.json();
    const { db } = await connectToDatabase();
    
    await db.collection('pricing').updateOne(
      { type: 'service' },
      { 
        $set: { 
          sections,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Pricing sections updated successfully' });
  } catch (error) {
    console.error('Error updating pricing sections:', error);
    return NextResponse.json({ error: 'Failed to update pricing sections' }, { status: 500 });
  }
} 