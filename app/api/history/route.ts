import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { connectToDatabase } from '@/app/lib/mongodb';

const DATA_FILE_PATH = path.join(process.cwd(), 'data/history.json');

export async function GET() {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const changes = JSON.parse(fileContent);
    return NextResponse.json(changes);
  } catch (error) {
    console.error('Error reading history:', error);
    return NextResponse.json([], { status: 200 }); // Zwracamy pustą tablicę jeśli plik nie istnieje
  }
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();
    const { action, details } = await request.json();

    const historyEntry = {
      action,
      details,
      timestamp: new Date(),
    };

    await db.collection('history').insertOne(historyEntry);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: 'Wystąpił błąd podczas zapisywania historii' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
} 