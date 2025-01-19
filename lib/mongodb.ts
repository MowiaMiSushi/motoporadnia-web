/* eslint-disable no-var */
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Brak zmiennej środowiskowej MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {};

interface MongoConnection {
  conn: Promise<MongoClient> | null;
  promise: Promise<MongoClient> | null;
}

const globalForMongo = global as typeof globalThis & {
  mongo: MongoConnection;
};

// Inicjalizacja połączenia
if (!globalForMongo.mongo) {
  globalForMongo.mongo = {
    conn: null,
    promise: null,
  };
}

export async function connectToDatabase() {
  try {
    if (globalForMongo.mongo.conn) {
      const client = await globalForMongo.mongo.conn;
      return {
        client,
        db: client.db('motoporadnia'),
      };
    }

    if (!globalForMongo.mongo.promise) {
      const client = new MongoClient(uri, options);
      globalForMongo.mongo.promise = client.connect();
    }

    globalForMongo.mongo.conn = globalForMongo.mongo.promise;
    const client = await globalForMongo.mongo.conn;
    const db = client.db('motoporadnia');

    return { client, db };
  } catch (error) {
    console.error('Błąd połączenia z bazą danych:', error);
    throw error;
  }
}

export default connectToDatabase; 