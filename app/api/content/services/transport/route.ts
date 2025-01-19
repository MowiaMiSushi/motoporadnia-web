import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const contentPath = path.join(process.cwd(), 'content', 'services', 'transport.json');

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

    const content = await readFile(contentPath, 'utf-8')
      .then(data => JSON.parse(data))
      .catch(() => {
        console.log('No content file found, returning empty object');
        return {};
      });

    return NextResponse.json(content);
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
    await writeFile(contentPath, JSON.stringify(content, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving transport content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 