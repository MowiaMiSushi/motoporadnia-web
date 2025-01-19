import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { existsSync } from 'fs';

export async function POST(request: Request) {
  try {
    // Sprawdź autoryzację
    const session = await getServerSession(authOptions);
    console.log('Upload: Status sesji:', session ? 'aktywna' : 'brak');
    
    if (!session?.user?.email) {
      console.log('Upload: Brak autoryzacji');
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Pobierz plik z formularza
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.log('Upload: Brak pliku');
      return new NextResponse('No file uploaded', { status: 400 });
    }

    // Sprawdź typ pliku
    if (!file.type.startsWith('image/')) {
      console.log('Upload: Nieprawidłowy typ pliku:', file.type);
      return new NextResponse('Invalid file type', { status: 400 });
    }

    // Generuj bezpieczną nazwę pliku
    const timestamp = Date.now();
    const originalName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const fileName = `${timestamp}-${originalName}`;
    
    console.log('Upload: Przygotowuję plik:', {
      originalName,
      fileName,
      type: file.type,
      size: file.size
    });

    // Przygotuj ścieżkę do zapisu
    const publicDir = join(process.cwd(), 'public');
    const imagesDir = join(publicDir, 'images');

    // Sprawdź czy katalog images istnieje, jeśli nie - utwórz go
    if (!existsSync(imagesDir)) {
      console.log('Upload: Tworzę katalog images');
      await mkdir(imagesDir, { recursive: true });
    }

    const filePath = join(imagesDir, fileName);

    // Konwertuj File na Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Zapisz plik
    console.log('Upload: Zapisuję plik:', filePath);
    await writeFile(filePath, buffer);
    console.log('Upload: Plik zapisany pomyślnie');

    // Zwróć URL do zapisanego pliku
    const fileUrl = `/images/${fileName}`;
    return NextResponse.json({ 
      success: true,
      url: fileUrl,
      message: 'Plik został pomyślnie przesłany'
    });

  } catch (error) {
    console.error('Upload: Błąd podczas przetwarzania pliku:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Wystąpił błąd podczas przesyłania pliku'
    }, { status: 500 });
  }
} 