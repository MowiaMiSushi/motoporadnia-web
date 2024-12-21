import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import fs from 'fs/promises';
import path from 'path';

const contentPath = path.join(process.cwd(), 'content');
const homeContentPath = path.join(contentPath, 'home.json');

// Upewnij się, że folder content istnieje
async function ensureContentDirectory() {
  try {
    await fs.access(contentPath);
  } catch {
    await fs.mkdir(contentPath, { recursive: true });
  }
}

export async function GET() {
  try {
    await ensureContentDirectory();
    
    try {
      const content = await fs.readFile(homeContentPath, 'utf-8');
      return NextResponse.json(JSON.parse(content));
    } catch {
      // Jeśli plik nie istnieje, zwróć pusty obiekt
      return NextResponse.json({});
    }
  } catch (error) {
    console.error('Error reading home content:', error);
    return NextResponse.json({ error: 'Failed to read content' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.role || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const content = await request.json();
    await ensureContentDirectory();
    await fs.writeFile(homeContentPath, JSON.stringify(content, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving home content:', error);
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
} 