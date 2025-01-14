import { connectToDatabase } from '../app/lib/mongodb';
import { serviceData } from '../app/uslugi/serwis/cennik/data';

async function updateServicePricing() {
  try {
    console.log('Łączenie z bazą danych...');
    const { db } = await connectToDatabase();

    console.log('Aktualizacja danych cennika serwisu...');
    await db.collection('pricing').updateOne(
      { type: 'service' },
      { $set: { type: 'service', data: serviceData } },
      { upsert: true }
    );

    console.log('Dane zostały zaktualizowane pomyślnie!');
    process.exit(0);
  } catch (error) {
    console.error('Wystąpił błąd podczas aktualizacji danych:', error);
    process.exit(1);
  }
}

updateServicePricing(); 