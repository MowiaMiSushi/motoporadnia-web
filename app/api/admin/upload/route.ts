import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Sprawdź uprawnienia
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Sprawdź typ pliku
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }

    // Generuj bezpieczną nazwę pliku
    const timestamp = Date.now();
    const originalName = file.name.toLowerCase().replace(/[^a-z0-9.]/g, '-');
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);
    const fileName = `${baseName}-${timestamp}${extension}`;

    // Przygotuj ścieżkę do zapisu
    const uploadDir = path.join(process.cwd(), 'public', 'images', 'brands');
    const filePath = path.join(uploadDir, fileName);

    // Konwertuj File na Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Zapisz plik
    await writeFile(filePath, buffer);

    // Zwróć URL do zapisanego pliku
    return NextResponse.json({ url: `/images/brands/${fileName}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
} 