import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'contact' });
    
    if (!content) {
      return NextResponse.json(defaultContent);
    }

    return NextResponse.json(content.content);
  } catch (error) {
    console.error('Błąd podczas pobierania zawartości:', error);
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { db } = await connectToDatabase();
    const data = await request.json();

    await db.collection('content').updateOne(
      { type: 'contact' },
      { 
        $set: { 
          type: 'contact',
          content: data,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Błąd podczas aktualizacji zawartości:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

const defaultContent = {
  hero: {
    title: "Kontakt",
    description: "Jesteśmy do Twojej dyspozycji. Skontaktuj się z nami w dogodny dla Ciebie sposób.",
    images: ["/images/hero-bg_1.webp", "/images/hero-bg_2.webp", "/images/hero-bg_3.webp"]
  },
  contactInfo: {
    address: {
      street: "ul. Węglowa 9/11",
      city: "Poznań",
      postalCode: "60-122",
      additionalInfo: "(Wjazd od ulicy Górniczej)",
      mapsUrl: "https://www.google.com/maps/place/Motoporadnia/@52.3820632,16.8732338,17z/data=!4m6!3m5!1s0x6b3a30447fea247d:0xfebbfd65d6023f50!8m2!3d52.3816215!4d16.8719611!16s%2Fg%2F11rylcfqmv",
      coordinates: {
        latitude: 52.381703007621105,
        longitude: 16.871871248563785
      }
    },
    phone: "+48 789 059 578",
    email: "kontakt@motoporadnia.pl",
    hours: {
      weekdays: "8:30 - 16:30",
      weekend: "zamknięte"
    }
  },
  social: {
    platforms: [
      {
        name: "Facebook",
        url: "https://facebook.com/motoporadnia",
        icon: "faFacebook"
      },
      {
        name: "Instagram",
        url: "https://instagram.com/motoporadnia",
        icon: "faInstagram"
      },
      {
        name: "YouTube",
        url: "https://youtube.com/@motoporadnia",
        icon: "faYoutube"
      }
    ]
  },
  seo: {
    type: "MotorcycleRepair",
    name: "MotoPoradnia",
    priceRange: "$$"
  }
}; 