import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import path from 'path';

const contentPath = path.join(process.cwd(), 'content', 'services', 'transport.json');

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const content = await readFile(contentPath, 'utf-8');
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error('Error reading transport content:', error);
    return NextResponse.json({}, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
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