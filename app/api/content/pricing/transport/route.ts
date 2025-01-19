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
  let mongoClient;
  try {
    console.log('GET: Rozpoczynam pobieranie danych');
    const { client, db } = await connectToDatabase();
    mongoClient = client;

    const content = await db.collection('content').findOne({ identifier: 'transport-pricing' });
    console.log('GET: Pobrane dane z bazy:', JSON.stringify(content, null, 2));

    // Jeśli nie ma danych w bazie, zwróć domyślną zawartość
    if (!content) {
      console.log('GET: Brak danych w bazie, zwracam domyślną zawartość');
      return new NextResponse(JSON.stringify(defaultContent), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      });
    }

    // Usuń pole identifier i updatedAt z odpowiedzi
    const { identifier, updatedAt, _id, ...rest } = content;
    console.log('GET: Zwracam dane:', JSON.stringify(rest, null, 2));
    
    return new NextResponse(JSON.stringify(rest), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error('GET: Error fetching content:', error);
    return new NextResponse(JSON.stringify(defaultContent), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } finally {
    if (mongoClient) {
      console.log('GET: Zamykanie połączenia z bazą danych');
      await mongoClient.close();
    }
  }
}

export async function POST(request: Request) {
  let mongoClient;
  try {
    console.log('POST: Rozpoczynam zapisywanie danych');
    let content;
    
    try {
      const rawData = await request.text();
      console.log('POST: Otrzymane surowe dane:', rawData);
      content = JSON.parse(rawData);
    } catch (e) {
      console.error('POST: Błąd parsowania JSON:', e);
      return new NextResponse(
        JSON.stringify({ error: 'Invalid JSON data', details: e instanceof Error ? e.message : 'Unknown error' }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        }
      );
    }

    console.log('POST: Otrzymane dane do zapisania:', JSON.stringify(content, null, 2));

    // Sprawdź czy dane zawierają wymagane pola
    if (!content.hero || !content.pricingCategories) {
      console.error('POST: Brak wymaganych pól w danych');
      return new NextResponse(
        JSON.stringify({ error: 'Missing required fields: hero or pricingCategories' }), 
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        }
      );
    }

    try {
      console.log('POST: Próba połączenia z bazą danych');
      const { client, db } = await connectToDatabase();
      mongoClient = client;
      console.log('POST: Połączenie z bazą danych ustanowione');

      // Najpierw usuń stary dokument
      console.log('POST: Usuwanie starego dokumentu...');
      const deleteResult = await db.collection('content').deleteOne({ identifier: 'transport-pricing' });
      console.log('POST: Wynik usuwania starego dokumentu:', JSON.stringify(deleteResult, null, 2));

      // Przygotuj nowy dokument
      const documentToSave = {
        ...content,
        identifier: 'transport-pricing',
        updatedAt: new Date()
      };
      console.log('POST: Przygotowany dokument do zapisu:', JSON.stringify(documentToSave, null, 2));

      // Zapisz nowy dokument
      console.log('POST: Zapisywanie nowego dokumentu...');
      const insertResult = await db.collection('content').insertOne(documentToSave);
      console.log('POST: Wynik operacji zapisu:', JSON.stringify(insertResult, null, 2));

      if (!insertResult.acknowledged) {
        throw new Error('Operacja zapisu nie została potwierdzona przez bazę danych');
      }

      // Pobierz zapisany dokument dla weryfikacji
      console.log('POST: Pobieranie zapisanego dokumentu dla weryfikacji...');
      const savedContent = await db.collection('content').findOne({ identifier: 'transport-pricing' });
      
      if (!savedContent) {
        throw new Error('Nie można potwierdzić zapisu - dokument nie został odnaleziony');
      }
      
      console.log('POST: Zapisane dane:', JSON.stringify(savedContent, null, 2));

      // Odśwież stronę kliencką
      console.log('POST: Odświeżanie ścieżki /uslugi/transport/cennik');
      try {
        await revalidatePath('/uslugi/transport/cennik');
        console.log('POST: Ścieżka odświeżona pomyślnie');
      } catch (revalidateError) {
        console.error('POST: Błąd podczas odświeżania ścieżki:', revalidateError);
        // Kontynuuj mimo błędu odświeżania
      }

      // Zwróć odpowiedź
      const response = new NextResponse(
        JSON.stringify({ 
          success: true, 
          content: savedContent 
        }), 
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        }
      );

      console.log('POST: Zwracam odpowiedź:', {
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
        body: await response.clone().text()
      });

      return response;
    } catch (dbError) {
      console.error('POST: Błąd operacji bazodanowej:', dbError);
      return new NextResponse(
        JSON.stringify({ 
          error: 'Database operation failed', 
          details: dbError instanceof Error ? dbError.message : 'Unknown database error',
          stack: dbError instanceof Error ? dbError.stack : undefined
        }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        }
      );
    } finally {
      if (mongoClient) {
        console.log('POST: Zamykanie połączenia z bazą danych');
        try {
          await mongoClient.close();
          console.log('POST: Połączenie z bazą danych zamknięte pomyślnie');
        } catch (closeError) {
          console.error('POST: Błąd podczas zamykania połączenia:', closeError);
        }
      }
    }
  } catch (error) {
    console.error('POST: Nieoczekiwany błąd:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    );
  }
} 