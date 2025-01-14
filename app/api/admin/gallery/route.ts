import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { readdir } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const files = await readdir(imagesDir);
    
    // Filtrujemy tylko pliki obrazów
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
    );

    // Tworzymy pełne ścieżki URL dla każdego obrazu
    const images = imageFiles.map(file => `/images/${file}`);

    return NextResponse.json({ images });

  } catch (error) {
    console.error('Error reading gallery directory:', error);
    return NextResponse.json({ error: 'Error reading gallery' }, { status: 500 });
  }
} 