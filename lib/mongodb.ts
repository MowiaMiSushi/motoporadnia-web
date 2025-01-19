/* eslint-disable no-var */
import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Brak zmiennej środowiskowej MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {};

class MongoConnection {
  private static instance: MongoConnection;
  private client: MongoClient | null = null;
  private clientPromise: Promise<MongoClient> | null = null;

  private constructor() {}

  public static getInstance(): MongoConnection {
    if (!MongoConnection.instance) {
      MongoConnection.instance = new MongoConnection();
    }
    return MongoConnection.instance;
  }

  public async connect() {
    if (this.client) {
      return {
        client: this.client,
        db: this.client.db('motoporadnia'),
      };
    }

    if (!this.clientPromise) {
      const client = new MongoClient(uri, options);
      this.clientPromise = client.connect();
    }

    this.client = await this.clientPromise;
    return {
      client: this.client,
      db: this.client.db('motoporadnia'),
    };
  }
}

export async function connectToDatabase() {
  try {
    const connection = MongoConnection.getInstance();
    return await connection.connect();
  } catch (error) {
    console.error('Błąd połączenia z bazą danych:', error);
    throw error;
  }
}

export default connectToDatabase; 