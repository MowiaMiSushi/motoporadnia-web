import { MongoClient } from 'mongodb';
import { contactData } from '../app/kontakt/data';
import dotenv from 'dotenv';
import path from 'path';

// Załaduj zmienne środowiskowe
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

if (!process.env.MONGODB_URI) {
  console.error('Brak zmiennej środowiskowej MONGODB_URI');
  process.exit(1);
}

if (!process.env.MONGODB_DB) {
  console.error('Brak zmiennej środowiskowej MONGODB_DB');
  process.exit(1);
}

const MONGODB_URI: string = process.env.MONGODB_URI;
const MONGODB_DB: string = process.env.MONGODB_DB;

async function initContact() {
  let client: MongoClient | null = null;

  try {
    console.log('Łączenie z bazą danych...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(MONGODB_DB);

    // Usuń istniejącą zawartość
    console.log('Usuwanie istniejącej zawartości...');
    await db.collection('content').deleteMany({ type: 'contact' });

    // Przygotuj dane do zapisania
    const contentData = {
      type: 'contact',
      content: contactData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Zapisz nową zawartość
    console.log('Zapisywanie nowej zawartości...');
    await db.collection('content').insertOne(contentData);
    console.log('Zawartość została zapisana pomyślnie');

  } catch (error) {
    console.error('Błąd podczas inicjalizacji zawartości:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Uruchom inicjalizację
initContact()
  .catch((error) => {
    console.error('Błąd podczas inicjalizacji:', error);
    process.exit(1);
  }); 