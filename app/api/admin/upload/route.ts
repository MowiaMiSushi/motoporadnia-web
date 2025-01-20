import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  console.log('Rozpoczynam obsługę żądania upload');
  
  try {
    // Sprawdź uprawnienia
    const session = await getServerSession(authOptions);
    console.log('Status sesji:', session?.user?.email || 'brak sesji');
    
    if (!session?.user?.email) {
      console.log('Nieautoryzowany dostęp');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.log('Brak pliku w żądaniu');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Sprawdź typ pliku
    console.log('Typ pliku:', file.type);
    if (!file.type.startsWith('image/')) {
      console.log('Nieprawidłowy typ pliku:', file.type);
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Generuj bezpieczną nazwę pliku
    const timestamp = Date.now();
    const originalName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    const fileName = `${baseName}-${timestamp}${extension}`;

    // Przygotuj ścieżkę do zapisu
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads');
    console.log('Katalog docelowy:', uploadDir);

    // Upewnij się, że katalog istnieje
    if (!existsSync(uploadDir)) {
      console.log('Tworzę katalog uploads');
      await mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);
    console.log('Ścieżka pliku:', filePath);

    // Konwertuj File na Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Zapisz plik
    console.log('Zapisuję plik...');
    await writeFile(filePath, buffer);
    console.log('Plik zapisany pomyślnie');

    // Zwróć URL do zapisanego pliku
    const fileUrl = `/images/uploads/${fileName}`;
    console.log('URL pliku:', fileUrl);
    
    return NextResponse.json({ 
      success: true,
      url: fileUrl 
    });
  } catch (error) {
    console.error('Błąd podczas uploadowania pliku:', error);
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error during upload'
    }, { 
      status: 500 
    });
  }
} 