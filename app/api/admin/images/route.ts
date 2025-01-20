import { NextResponse } from 'next/server';
import { readdirSync, statSync } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Funkcja rekurencyjnie przeszukująca katalogi
function getAllImages(dir: string, baseDir: string): string[] {
  const files = readdirSync(dir);
  let images: string[] = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      // Rekurencyjnie przeszukuj podkatalogi
      images = images.concat(getAllImages(filePath, baseDir));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      // Twórz względną ścieżkę od katalogu bazowego
      const relativePath = path.relative(baseDir, filePath);
      images.push(`/images/${relativePath.replace(/\\/g, '/')}`);
    }
  }

  return images;
}

export async function GET() {
  try {
    // Sprawdź uprawnienia
    const session = await getServerSession(authOptions);
    console.log('Session status:', session ? 'active' : 'none');
    
    if (!session?.user?.email) {
      console.log('Unauthorized access attempt');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Ścieżka do katalogu z obrazami
    const imagesDirectory = path.join(process.cwd(), 'public', 'images');
    console.log('Reading directory:', imagesDirectory);
    
    // Pobierz wszystkie obrazy rekurencyjnie
    const images = getAllImages(imagesDirectory, path.join(process.cwd(), 'public'));

    console.log('Found images:', images);

    // Zwróć listę ścieżek do obrazów
    return NextResponse.json({ 
      success: true,
      images,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in /api/admin/images:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
      images: [] 
    }, { status: 500 });
  }
} 