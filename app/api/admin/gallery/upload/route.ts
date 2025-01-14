import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generuj unikalną nazwę pliku
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const publicPath = path.join(process.cwd(), 'public', 'images', filename);

    // Zapisz plik
    await writeFile(publicPath, buffer);

    return NextResponse.json({ 
      url: `/images/${filename}`,
      success: true 
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
} 