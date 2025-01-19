/* eslint-disable no-var */
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Brak zmiennej środowiskowej MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(uri, options);

const clientPromise = global._mongoClientPromise || client.connect();

if (process.env.NODE_ENV === 'development') {
  global._mongoClientPromise = clientPromise;
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db('motoporadnia');
    return { client, db };
  } catch (error) {
    console.error('Błąd połączenia z bazą danych:', error);
    throw error;
  }
}

export default clientPromise; 