import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generuj bezpieczną nazwę pliku
    const timestamp = Date.now();
    const originalName = file.name.toLowerCase();
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension)
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const fileName = `${baseName}-${timestamp}${extension}`;

    // Zapisz plik
    const publicDir = path.join(process.cwd(), 'public', 'images');
    const filePath = path.join(publicDir, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({ 
      url: `/images/${fileName}`,
      message: 'File uploaded successfully' 
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
} 