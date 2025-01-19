import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const contentPath = path.join(process.cwd(), 'content', 'services', 'transport.json');

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('GET Session:', session);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const content = await readFile(contentPath, 'utf-8')
      .then(data => JSON.parse(data))
      .catch(() => {
        console.log('No content file found, returning empty object');
        return {};
      });

    return NextResponse.json(content, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error reading transport content:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('POST Session:', session);

    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const content = await request.json();
    console.log('Saving content:', content);

    await writeFile(contentPath, JSON.stringify(content, null, 2));
    console.log('Content saved successfully');

    return NextResponse.json({ success: true }, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error saving transport content:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 