import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { unlink } from 'fs/promises';
import path from 'path';

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { path: imagePath } = await request.json();
    
    if (!imagePath) {
      return NextResponse.json({ error: 'No image path provided' }, { status: 400 });
    }

    // Usuń /images/ z początku ścieżki
    const filename = imagePath.replace('/images/', '');
    const publicPath = path.join(process.cwd(), 'public', 'images', filename);

    await unlink(publicPath);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Error deleting file' }, { status: 500 });
  }
} 