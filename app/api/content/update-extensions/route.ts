import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Pobieramy wszystkie dokumenty z kolekcji content
    const documents = await db.collection('content').find({}).toArray();
    
    // Aktualizujemy każdy dokument
    for (const doc of documents) {
      // Sprawdzamy czy dokument używa klucza 'data' czy 'content'
      const originalData = doc.data || doc.content;
      if (!originalData) continue;

      // Funkcja do rekurencyjnej zamiany rozszerzeń w obiekcie
      const replaceExtensions = (obj: any): any => {
        if (!obj) return obj;
        
        if (typeof obj === 'string') {
          return obj.replace(/\.(jpg|png)$/, '.webp');
        }
        
        if (Array.isArray(obj)) {
          return obj.map(item => replaceExtensions(item));
        }
        
        if (typeof obj === 'object') {
          const newObj: any = {};
          for (const [key, value] of Object.entries(obj)) {
            newObj[key] = replaceExtensions(value);
          }
          return newObj;
        }
        
        return obj;
      };

      // Tworzymy nowy obiekt z zaktualizowanymi rozszerzeniami
      const updatedData = replaceExtensions(originalData);

      // Aktualizujemy dokument używając odpowiedniego klucza
      const updateField = doc.data ? 'data' : 'content';
      await db.collection('content').updateOne(
        { _id: doc._id },
        { $set: { [updateField]: updatedData } }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Wszystkie rozszerzenia plików zostały zaktualizowane na .webp' 
    });
  } catch (error) {
    console.error('Error updating file extensions:', error);
    return NextResponse.error();
  }
} 