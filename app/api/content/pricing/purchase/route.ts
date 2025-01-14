import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  const { db } = await connectToDatabase();
  const content = await db.collection('content').findOne({ type: 'pricing-purchase' });
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
      { type: 'pricing-purchase' },
      { $set: { type: 'pricing-purchase', data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

const defaultContent = {
  hero: {
    title: "Cennik Pomocy w Zakupie",
    description: "Profesjonalne wsparcie przy zakupie motocykla. Sprawdzimy stan techniczny, historię i dokumentację, aby pomóc Ci podjąć najlepszą decyzję.",
    images: [
      "/images/usluga_sprawdzanie_1.webp",
      "/images/hero-bg_1.webp",
      "/images/hero-bg_2.webp"
    ]
  },
  pricingCategories: [
    {
      title: "Oględziny Motocykla",
      icon: "faSearch",
      description: "Szczegółowa inspekcja stanu technicznego i wizualnego motocykla",
      items: [
        {
          name: "Oględziny w Poznaniu",
          price: "od 200 zł"
        },
        {
          name: "Oględziny poza Poznaniem",
          price: "od 300 zł"
        },
        {
          name: "Dojazd poza Poznań",
          price: "2 zł/km"
        }
      ]
    },
    {
      title: "Kompleksowa Pomoc",
      icon: "faClipboardCheck",
      description: "Pełne wsparcie w procesie zakupu motocykla",
      items: [
        {
          name: "Weryfikacja dokumentów",
          price: "w cenie"
        },
        {
          name: "Sprawdzenie historii",
          price: "w cenie"
        },
        {
          name: "Negocjacje z sprzedającym",
          price: "w cenie"
        }
      ]
    },
    {
      title: "Dodatkowe Usługi",
      icon: "faHandshake",
      description: "Wsparcie w formalnościach i transporcie",
      items: [
        {
          name: "Pomoc w formalnościach",
          price: "od 200 zł"
        },
        {
          name: "Transport motocykla",
          price: "indywidualnie"
        },
        {
          name: "Konsultacja telefoniczna",
          price: "100 zł/h"
        }
      ]
    }
  ]
}; 