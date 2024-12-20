import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Brak zmiennej środowiskowej MONGODB_URI');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // W środowisku deweloperskim używamy globalnej zmiennej, aby zachować połączenie
  // podczas hot-reloadingu
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // W produkcji najlepiej używać nowego połączenia
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise; 