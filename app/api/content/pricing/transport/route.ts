import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { revalidatePath } from 'next/cache';

const defaultContent = {
  hero: {
    title: "Cennik transportu motocykli",
    description: "Oferujemy profesjonalny transport motocykli. Ceny są orientacyjne i mogą się różnić w zależności od odległości i specyfiki zlecenia.",
    images: ['/images/transport_1.jpg', '/images/transport_2.jpg']
  },
  pricingCategories: [
    {
      title: "Transport lokalny",
      icon: "faTruck",
      description: "Transport motocykli w obrębie miasta i okolic",
      items: [
        { name: "Transport w granicach miasta", price: "od 100 zł" },
        { name: "Transport do 50 km", price: "od 200 zł" },
        { name: "Transport powyżej 50 km", price: "2 zł/km" }
      ]
    },
    {
      title: "Transport krajowy",
      icon: "faRoute",
      description: "Transport motocykli na terenie całej Polski",
      items: [
        { name: "Transport do 100 km", price: "od 350 zł" },
        { name: "Transport do 200 km", price: "od 500 zł" },
        { name: "Transport powyżej 200 km", price: "2,5 zł/km" }
      ]
    },
    {
      title: "Usługi dodatkowe",
      icon: "faHandshake",
      description: "Dodatkowe usługi związane z transportem",
      items: [
        { name: "Załadunek/rozładunek", price: "w cenie" },
        { name: "Zabezpieczenie motocykla", price: "w cenie" },
        { name: "Transport ekspresowy", price: "wycena indywidualna" }
      ]
    }
  ]
};

export async function GET() {
  try {
    console.log('GET: Rozpoczynam pobieranie danych');
    const client = await connectToDatabase();
    const db = client.db();

    const content = await db.collection('content').findOne({ identifier: 'transport-pricing' });
    console.log('GET: Pobrane dane z bazy:', JSON.stringify(content, null, 2));

    // Jeśli nie ma danych w bazie, zwróć domyślną zawartość
    if (!content) {
      console.log('GET: Brak danych w bazie, zwracam domyślną zawartość');
      return NextResponse.json(defaultContent);
    }

    // Usuń pole identifier i updatedAt z odpowiedzi
    const { identifier, updatedAt, _id, ...rest } = content;
    console.log('GET: Zwracam dane:', JSON.stringify(rest, null, 2));
    return NextResponse.json(rest);
  } catch (error) {
    console.error('GET: Error fetching content:', error);
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  try {
    console.log('POST: Rozpoczynam zapisywanie danych');
    let content;
    try {
      const rawData = await request.text();
      console.log('POST: Otrzymane surowe dane:', rawData);
      content = JSON.parse(rawData);
    } catch (e) {
      console.error('POST: Błąd parsowania JSON:', e);
      return NextResponse.json({ error: 'Invalid JSON data' }, { status: 400 });
    }

    console.log('POST: Otrzymane dane do zapisania:', JSON.stringify(content, null, 2));

    // Sprawdź czy dane zawierają wymagane pola
    if (!content.hero || !content.pricingCategories) {
      console.error('POST: Brak wymaganych pól w danych');
      return NextResponse.json({ error: 'Missing required fields: hero or pricingCategories' }, { status: 400 });
    }

    const client = await connectToDatabase();
    const db = client.db();

    try {
      // Najpierw usuń stary dokument
      await db.collection('content').deleteOne({ identifier: 'transport-pricing' });
      console.log('POST: Usunięto stary dokument');

      // Następnie zapisz nowy dokument
      const result = await db.collection('content').insertOne({
        ...content,
        identifier: 'transport-pricing',
        updatedAt: new Date()
      });

      console.log('POST: Wynik operacji zapisu:', JSON.stringify(result, null, 2));

      // Odśwież stronę kliencką
      revalidatePath('/uslugi/transport/cennik');
      console.log('POST: Strona kliencka odświeżona');

      // Pobierz i zwróć zapisane dane
      const savedContent = await db.collection('content').findOne({ identifier: 'transport-pricing' });
      console.log('POST: Zapisane dane:', JSON.stringify(savedContent, null, 2));

      return NextResponse.json({ success: true, content: savedContent });
    } catch (dbError) {
      console.error('POST: Błąd bazy danych:', dbError);
      return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
    }
  } catch (error) {
    console.error('POST: Error saving content:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 