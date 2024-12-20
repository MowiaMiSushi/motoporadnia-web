import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Brak zmiennej środowiskowej MONGODB_URI');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Brak zmiennej środowiskowej MONGODB_DB');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // W trybie development używamy globalnej zmiennej, aby zachować połączenie
  // między hot-reloadami
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // W produkcji tworzymy nowe połączenie
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error('Błąd połączenia z bazą danych:', error);
    throw error;
  }
} 