import { NextResponse } from 'next/server';
import { getPage, updatePage } from '../../lib/pages';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    return NextResponse.json({ error: 'Brak identyfikatora strony' }, { status: 400 });
  }

  try {
    const page = await getPage(pageId);
    return NextResponse.json(page);
  } catch (error) {
    console.error('Błąd podczas pobierania strony:', error);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageId, title, content } = body;

    if (!pageId || !content) {
      return NextResponse.json({ error: 'Brak wymaganych danych' }, { status: 400 });
    }

    const success = await updatePage(pageId, { pageId, title, content });

    if (success) {
      return NextResponse.json({ message: 'Strona została zaktualizowana' });
    } else {
      return NextResponse.json({ error: 'Nie udało się zaktualizować strony' }, { status: 500 });
    }
  } catch (error) {
    console.error('Błąd podczas aktualizacji strony:', error);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}