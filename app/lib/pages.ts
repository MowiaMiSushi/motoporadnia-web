import { connectToDatabase } from './mongodb';
import { ObjectId } from 'mongodb';

interface Page {
  _id: ObjectId;
  pageId: string;
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

interface PageResponse {
  _id: string;
  pageId: string;
  title: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
}

export async function getPages(): Promise<PageResponse[]> {
  const { db } = await connectToDatabase();
  const pages = await db.collection('pages').find().toArray() as Page[];
  return pages.map((page: Page) => ({
    _id: page._id.toString(),
    pageId: page.pageId,
    title: page.title,
    content: page.content,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    createdAt: page.createdAt.toISOString(),
    updatedAt: page.updatedAt.toISOString()
  }));
}

export async function getPage(pageId: string): Promise<PageResponse | null> {
  console.log(`Pobieranie strony: ${pageId}`);
  const { db } = await connectToDatabase();
  const page = await db.collection('pages').findOne({ pageId }) as Page | null;
  if (!page) return null;
  
  return {
    _id: page._id.toString(),
    pageId: page.pageId,
    title: page.title,
    content: page.content,
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
    createdAt: page.createdAt.toISOString(),
    updatedAt: page.updatedAt.toISOString()
  };
}

export async function updatePage(pageId: string, data: Partial<Omit<Page, '_id'>>): Promise<boolean> {
  console.log(`Aktualizacja strony: ${pageId}`);
  console.log('Nowe dane:', data);
  
  const { db } = await connectToDatabase();
  const result = await db.collection('pages').updateOne(
    { pageId },
    { 
      $set: {
        ...data,
        updatedAt: new Date()
      }
    },
    { upsert: true }
  );

  console.log('Wynik aktualizacji:', result);
  return result.acknowledged;
}

export async function deletePage(pageId: string): Promise<boolean> {
  const { db } = await connectToDatabase();
  const result = await db.collection('pages').deleteOne({ pageId });
  return result.acknowledged;
} 