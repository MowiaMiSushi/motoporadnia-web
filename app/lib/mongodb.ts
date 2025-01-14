import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Brak zmiennej środowiskowej MONGODB_URI');
}

if (!process.env.MONGODB_DB) {
  throw new Error('Brak zmiennej środowiskowej MONGODB_DB');
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return {
    client: cachedClient,
    db: cachedDb,
  };
}

export default cachedClient; 