import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Sprawdzamy czy użytkownik jest zalogowany i ma rolę admin
    if (!session?.user?.email || session?.user?.role !== 'admin') {
      console.log('Unauthorized access attempt:', {
        email: session?.user?.email,
        role: session?.user?.role
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'transport' });

    if (!content) {
      console.log('No content found, returning empty object');
      return NextResponse.json({});
    }

    return NextResponse.json(content.data);
  } catch (error) {
    console.error('Error reading transport content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Sprawdzamy czy użytkownik jest zalogowany i ma rolę admin
    if (!session?.user?.email || session?.user?.role !== 'admin') {
      console.log('Unauthorized access attempt:', {
        email: session?.user?.email,
        role: session?.user?.role
      });
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const content = await request.json();
    const { db } = await connectToDatabase();

    await db.collection('content').updateOne(
      { type: 'transport' },
      { 
        $set: { 
          type: 'transport',
          data: content,
          updatedAt: new Date(),
          updatedBy: session.user.email
        }
      },
      { upsert: true }
    );

    console.log('Content saved successfully by:', session.user.email);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving transport content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 