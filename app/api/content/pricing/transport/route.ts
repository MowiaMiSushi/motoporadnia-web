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
  console.log('API GET: Rozpoczynam pobieranie danych');
  
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('pricing').findOne({ identifier: 'transport' });
    
    console.log('API GET: Pobrane dane z bazy:', JSON.stringify(content, null, 2));
    
    if (!content || !content.hero || !content.pricingCategories) {
      console.log('API GET: Brak danych w bazie lub niepełne dane, zwracam domyślną zawartość');
      return NextResponse.json(defaultContent);
    }

    const { _id, identifier, updatedAt, ...rest } = content;
    console.log('API GET: Zwracam dane:', JSON.stringify(rest, null, 2));
    
    return NextResponse.json(rest);
  } catch (error) {
    console.error('API GET: Error fetching content:', error);
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  console.log('API POST: Rozpoczynam zapisywanie danych');
  
  try {
    const content = await request.json();
    console.log('API POST: Otrzymane dane:', JSON.stringify(content, null, 2));

    if (!content.hero || !content.pricingCategories) {
      console.error('API POST: Nieprawidłowe dane wejściowe');
      return new NextResponse('Nieprawidłowe dane', { status: 400 });
    }

    const { db } = await connectToDatabase();
    
    // Usuń stary dokument
    await db.collection('pricing').deleteOne({ identifier: 'transport' });
    
    // Zapisz nowy dokument
    const result = await db.collection('pricing').insertOne({
      identifier: 'transport',
      ...content,
      updatedAt: new Date()
    });

    console.log('API POST: Wynik operacji zapisu:', JSON.stringify(result, null, 2));

    if (result.acknowledged) {
      // Odśwież stronę kliencką
      revalidatePath('/uslugi/transport/cennik');
      console.log('API POST: Strona kliencka odświeżona');
      
      return NextResponse.json({ success: true });
    } else {
      console.error('API POST: Operacja nie została potwierdzona przez bazę danych');
      return new NextResponse('Błąd zapisu w bazie danych', { status: 500 });
    }
  } catch (error) {
    console.error('API POST: Error saving content:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 