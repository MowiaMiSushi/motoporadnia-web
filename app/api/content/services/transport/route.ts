import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

const defaultContent = {
  hero: {
    title: "Transport motocykli Poznań i Europa",
    description: "Profesjonalny transport motocykli na terenie Poznania, całej Polski i Europy. Bezpieczny przewóz jednośladów z pełnym ubezpieczeniem.",
    images: ['/images/transport_1.webp', '/images/transport_2.webp', '/images/transport_3.webp']
  },
  mainSections: [
    {
      title: "Obszar działania",
      content: [
        "Świadczymy usługi transportu motocykli na terenie całej Polski i Europy. Nasz zespół posiada wieloletnie doświadczenie w bezpiecznym przewozie jednośladów.",
        "Dysponujemy profesjonalnym sprzętem i lawetą przystosowaną do transportu motocykli."
      ]
    }
  ],
  services: [
    {
      icon: "faTruck",
      title: "Transport lokalny",
      description: "Transport motocykli w obrębie miasta i okolic"
    },
    {
      icon: "faRoute",
      title: "Transport krajowy",
      description: "Transport motocykli na terenie całej Polski"
    },
    {
      icon: "faGlobe",
      title: "Transport międzynarodowy",
      description: "Transport motocykli na terenie Europy"
    }
  ],
  features: [
    {
      icon: "faShieldAlt",
      text: "Pełne ubezpieczenie transportu"
    },
    {
      icon: "faTools",
      text: "Profesjonalny sprzęt do załadunku"
    },
    {
      icon: "faClock",
      text: "Elastyczne terminy"
    },
    {
      icon: "faHandshake",
      text: "Bezpieczny załadunek i rozładunek"
    }
  ],
  additionalInfo: {
    title: "Dlaczego warto wybrać nasz transport?",
    items: [
      "Wieloletnie doświadczenie w transporcie motocykli",
      "Pełne ubezpieczenie podczas transportu",
      "Profesjonalny sprzęt i zabezpieczenia",
      "Konkurencyjne ceny",
      "Elastyczne terminy realizacji"
    ]
  },
  cta: {
    title: "Zamów transport",
    description: "Skontaktuj się z nami, aby ustalić szczegóły transportu",
    phoneNumber: "789059578"
  }
};

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const content = await db.collection('content').findOne({ type: 'services-transport' });
    return NextResponse.json(content?.data || defaultContent);
  } catch (error) {
    console.error('Error reading content:', error);
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { db } = await connectToDatabase();
    const data = await request.json();

    if (!data) {
      return new NextResponse('Invalid content', { status: 400 });
    }

    await db.collection('content').updateOne(
      { type: 'services-transport' },
      { $set: { type: 'services-transport', data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
} 