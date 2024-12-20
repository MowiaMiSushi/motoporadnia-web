import { connectToDatabase } from './db';

export interface Page {
  _id?: string;
  pageId: string;
  title: string;
  content: string;
  lastModified?: Date;
}

const defaultPages = [
  {
    pageId: 'o-nas',
    title: 'O nas',
    content: `
      <h1>O nas</h1>
      <p>Poznaj historię i zespół Motoporadni</p>
      
      <h2>Nasza Historia</h2>
      <p>Motoporadnia – Fachowa pomoc przy zakupie, transporcie i serwisie motocykli jest to firma, stworzona przez ludzi, którzy nie wyobrażają sobie otaczającego ich świata bez jednośladów.</p>
      <p>Początek działalności miał miejsce już w najmłodszych latach założyciela. Adrian, zaraz po stawianiu pierwszych kroków wsiadł na elektrycznie napędzanego Repsola aby pokonywać pierwsze metry na dwóch (wtedy jeszcze czterech) kółkach.</p>
      
      <h2>Nasze Wartości</h2>
      <ul>
        <li><strong>Pasja</strong> - Motocykle to nasza pasja, którą dzielimy się z klientami</li>
        <li><strong>Profesjonalizm</strong> - Zapewniamy najwyższą jakość usług i obsługi klienta</li>
        <li><strong>Doświadczenie</strong> - Lata praktyki w branży motocyklowej</li>
        <li><strong>Bezpieczeństwo</strong> - Dbamy o bezpieczeństwo naszych klientów</li>
      </ul>
      
      <h2>Nasz Zespół</h2>
      <ul>
        <li><strong>Adrian</strong> - Założyciel</li>
        <li><strong>Bartosz</strong> - Mechanik</li>
      </ul>
      
      <h2>Nasze Zalety</h2>
      <ul>
        <li><strong>Kompleksowa obsługa</strong> - Od zakupu po serwis - wszystko w jednym miejscu</li>
        <li><strong>Indywidualne podejście</strong> - Każdy klient jest dla nas wyjątkowy</li>
        <li><strong>Wieloletnie doświadczenie</strong> - Tysiące naprawionych motocykli i zadowolonych klientów</li>
      </ul>
    `
  },
  {
    pageId: 'uslugi',
    title: 'Usługi',
    content: '<h1>Usługi</h1><p>Nasze usługi</p>'
  },
  {
    pageId: 'szkolenia',
    title: 'Szkolenia',
    content: '<h1>Szkolenia</h1><p>Oferta szkoleń</p>'
  },
  {
    pageId: 'kontakt',
    title: 'Kontakt',
    content: '<h1>Kontakt</h1><p>Dane kontaktowe</p>'
  },
  {
    pageId: 'uslugi/serwis',
    title: 'Serwis',
    content: '<h1>Serwis</h1><p>Usługi serwisowe</p>'
  },
  {
    pageId: 'uslugi/transport',
    title: 'Transport',
    content: '<h1>Transport</h1><p>Usługi transportowe</p>'
  },
  {
    pageId: 'uslugi/pomoc-w-zakupie',
    title: 'Pomoc w zakupie',
    content: '<h1>Pomoc w zakupie</h1><p>Wsparcie przy zakupie motocykla</p>'
  },
  {
    pageId: 'uslugi/komis',
    title: 'Komis',
    content: '<h1>Komis</h1><p>Oferta komisowa</p>'
  },
  {
    pageId: 'uslugi/szkolenia',
    title: 'Szkolenia',
    content: '<h1>Szkolenia</h1><p>Oferta szkoleń</p>'
  },
  {
    pageId: 'uslugi/serwis/cennik',
    title: 'Cennik serwisu',
    content: '<h1>Cennik serwisu</h1><p>Cennik usług serwisowych</p>'
  }
];

export async function initializePages(): Promise<void> {
  const { db } = await connectToDatabase();
  const collection = db.collection('pages');

  console.log('Inicjalizacja stron w bazie danych...');

  for (const page of defaultPages) {
    const existingPage = await collection.findOne({ pageId: page.pageId });
    if (!existingPage) {
      console.log(`Dodawanie strony: ${page.pageId}`);
      await collection.insertOne({
        ...page,
        lastModified: new Date()
      });
    } else {
      console.log(`Strona ${page.pageId} już istnieje`);
    }
  }

  console.log('Inicjalizacja zakończona');
}

export async function getPages(): Promise<Page[]> {
  const { db } = await connectToDatabase();
  return db.collection('pages').find().toArray();
}

export async function getPage(pageId: string): Promise<Page | null> {
  console.log(`Pobieranie strony: ${pageId}`);
  const { db } = await connectToDatabase();
  const page = await db.collection('pages').findOne({ pageId });
  console.log('Znaleziona strona:', page);
  return page;
}

export async function updatePage(pageId: string, data: Partial<Page>): Promise<boolean> {
  console.log(`Aktualizacja strony: ${pageId}`);
  console.log('Nowe dane:', data);
  
  const { db } = await connectToDatabase();
  const result = await db.collection('pages').updateOne(
    { pageId },
    { 
      $set: {
        ...data,
        lastModified: new Date()
      }
    },
    { upsert: true }
  );

  console.log('Wynik aktualizacji:', result);
  return result.acknowledged;
}

export async function deletePage(pageId: string): Promise<boolean> {
  const { db } = await connectToDatabase();
  const result = await db.collection('pages').deleteOne({ pageId });
  return result.acknowledged;
} 