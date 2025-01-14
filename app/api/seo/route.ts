import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data/seo.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    console.error('Error reading SEO data:', error);
    return NextResponse.json(
      { error: 'Failed to read SEO data' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();

    // Ensure the data directory exists
    const dataDir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dataDir, { recursive: true });

    // Save to JSON file
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(content, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving SEO data:', error);
    return NextResponse.json(
      { error: 'Failed to save SEO data' },
      { status: 500 }
    );
  }
} 