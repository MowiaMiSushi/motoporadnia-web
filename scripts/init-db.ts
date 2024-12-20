import { config } from 'dotenv';
import { resolve } from 'path';
import { MongoClient } from 'mongodb';
import { defaultPages } from '../app/admin/pages/data';

// Wczytaj zmienne środowiskowe z .env.local
const envPath = resolve(process.cwd(), '.env.local');
config({ path: envPath });

console.log('Ścieżka do pliku .env.local:', envPath);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Zdefiniowane' : 'Niezdefiniowane');

async function initializeDatabase() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI nie jest zdefiniowane w pliku .env.local');
    }

    console.log('Łączenie z bazą danych...');
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db();

    // Sprawdź czy kolekcja pages istnieje
    const collections = await db.listCollections().toArray();
    const pagesExists = collections.some((col: { name: string }) => col.name === 'pages');

    if (!pagesExists) {
      console.log('Tworzenie kolekcji pages...');
      await db.createCollection('pages');
    }

    // Sprawdź czy są już jakieś strony w bazie
    const existingPages = await db.collection('pages').find({}).toArray();

    if (existingPages.length === 0) {
      console.log('Dodawanie początkowych stron...');
      await db.collection('pages').insertMany(defaultPages.map(page => ({
        ...page,
        content: `<h1>${page.title}</h1><p>Treść strony ${page.title}</p>`,
        lastModified: new Date()
      })));
      console.log('Dodano początkowe strony.');
    } else {
      console.log('Strony już istnieją w bazie danych.');
    }

    await client.close();
    console.log('Inicjalizacja bazy danych zakończona pomyślnie.');
    process.exit(0);
  } catch (error) {
    console.error('Błąd podczas inicjalizacji bazy danych:', error);
    process.exit(1);
  }
}

initializeDatabase(); 