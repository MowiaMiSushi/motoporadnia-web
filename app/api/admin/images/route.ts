import { NextResponse } from 'next/server';
import { readdirSync } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    // Sprawdź uprawnienia
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Ścieżka do katalogu z obrazami
    const imagesDirectory = path.join(process.cwd(), 'public', 'images');
    
    // Pobierz listę plików
    const files = readdirSync(imagesDirectory, { withFileTypes: true });
    
    // Filtruj tylko pliki obrazów i twórz ścieżki względne
    const images = files
      .filter(file => file.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(file.name))
      .map(file => `/images/${file.name}`);

    // Zwróć listę ścieżek do obrazów
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error reading images directory:', error);
    return NextResponse.json({ images: [] });
  }
} 