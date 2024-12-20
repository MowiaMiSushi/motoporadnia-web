import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
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

async function initAdmin() {
  let client: MongoClient | null = null;

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    
    const db = client.db(MONGODB_DB);

    // Dane administratora
    const adminUser = {
      username: 'admin-adrian',
      password: await bcrypt.hash('Administrator25!', 10),
      email: 'admin@motoporadnia.pl',
      role: 'admin',
      createdAt: new Date(),
    };

    // Sprawdź czy użytkownik już istnieje
    const existingUser = await db.collection('users').findOne({ username: adminUser.username });

    if (existingUser) {
      console.log('Użytkownik admin już istnieje');
    } else {
      // Utwórz nowego użytkownika
      await db.collection('users').insertOne(adminUser);
      console.log('Utworzono nowego użytkownika admin');
    }
  } catch (error) {
    console.error('Błąd podczas tworzenia użytkownika:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Uruchom inicjalizację
initAdmin()
  .catch((error) => {
    console.error('Błąd podczas inicjalizacji:', error);
    process.exit(1);
  }); 