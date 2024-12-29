import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  const { db } = await connectToDatabase();
  const content = await db.collection('content').findOne({ type: 'pricing-transport' });
  return NextResponse.json(content?.data || defaultContent);
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
      { type: 'pricing-transport' },
      { $set: { type: 'pricing-transport', data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

const defaultContent = {
  hero: {
    title: "Cennik Transportu Motocykli",
    description: "Profesjonalny transport motocykli na terenie całej Polski. Bezpiecznie dostarczymy Twój motocykl pod wskazany adres.",
    images: [
      "/images/transport_1.webp",
      "/images/transport_3.webp",
      "/images/hero-bg_1.webp",
      "/images/hero-bg_2.webp",
      "/images/hero-bg_3.webp"
    ]
  },
  pricingCategories: [
    {
      title: "Transport Lokalny",
      icon: "faTruck",
      description: "Transport motocykli na terenie Poznania i okolic",
      items: [
        {
          name: "Transport w granicach Poznania",
          price: "od 150 zł"
        },
        {
          name: "Transport do 30 km od Poznania",
          price: "od 200 zł"
        },
        {
          name: "Transport od 50km od Poznania",
          price: "od 250 zł"
        }
      ]
    },
    {
      title: "Transport Krajowy",
      icon: "faRoute",
      description: "Transport motocykli na terenie całej Polski",
      items: [
        {
          name: "Transport do 100 km",
          price: "od 350 zł"
        },
        {
          name: "Transport do 200 km",
          price: "od 500 zł"
        },
        {
          name: "Transport powyżej 200 km",
          price: "2,5 zł/km"
        }
      ]
    },
    {
      title: "Usługi Dodatkowe",
      icon: "faHandshake",
      description: "Dodatkowe usługi związane z transportem",
      items: [
        {
          name: "Pomoc przy załadunku/rozładunku",
          price: "od 50 zł"
        },
        {
          name: "Zabezpieczenie motocykla",
          price: "w cenie"
        },
        {
          name: "Ubezpieczenie transportu",
          price: "w cenie"
        }
      ]
    }
  ]
}; 