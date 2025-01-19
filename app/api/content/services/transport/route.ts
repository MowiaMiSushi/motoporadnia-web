import { NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import path from 'path';
import { existsSync } from 'fs';

const contentDir = path.join(process.cwd(), 'content', 'services');
const contentPath = path.join(contentDir, 'transport.json');

// Upewnij się, że katalog istnieje
async function ensureDirectoryExists() {
  if (!existsSync(contentDir)) {
    await mkdir(contentDir, { recursive: true });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.log('Transport GET: Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ensureDirectoryExists();

    let content;
    try {
      const fileContent = await readFile(contentPath, 'utf-8');
      content = JSON.parse(fileContent);
      console.log('Transport GET: Successfully read content');
    } catch (error) {
      console.log('Transport GET: File not found or invalid, returning empty content');
      content = {};
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Transport GET: Error:', error);
    return NextResponse.json({}, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      console.log('Transport POST: Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ensureDirectoryExists();

    const content = await request.json();
    console.log('Transport POST: Saving content:', JSON.stringify(content, null, 2));

    await writeFile(contentPath, JSON.stringify(content, null, 2), 'utf-8');
    console.log('Transport POST: Content saved successfully');
    
    // Weryfikacja zapisu
    const savedContent = await readFile(contentPath, 'utf-8');
    const parsedContent = JSON.parse(savedContent);
    console.log('Transport POST: Verification - content read back:', JSON.stringify(parsedContent, null, 2));

    return NextResponse.json({ 
      success: true,
      message: 'Content saved successfully'
    });
  } catch (error) {
    console.error('Transport POST: Error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 