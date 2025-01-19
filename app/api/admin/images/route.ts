import { NextResponse } from 'next/server';
import { readdirSync } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
    
    // Pobierz listę plików
    const files = readdirSync(imagesDirectory, { withFileTypes: true });
    
    // Filtruj tylko pliki obrazów i twórz ścieżki względne
    const images = files
      .filter(file => file.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(file.name))
      .map(file => `/images/${file.name}`);

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