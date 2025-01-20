import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

const defaultContent = {
    hero: {
        title: "Transport motocykli Poznań i Europa",
        description: "Profesjonalny transport motocykli na terenie Poznania, całej Polski i Europy. Bezpieczny przewóz jednośladów z pełnym ubezpieczeniem.",
        images: [
            "/images/transport_1.webp",
            "/images/transport_2.webp",
            "/images/transport_3.webp"
        ]
    },
    mainSections: [
        {
            title: "Profesjonalny transport motocykli na terenie Poznania i Europy",
            description: "Transport motocykli wykonujemy w sposób w pełni profesjonalny, z najwyższą dbałością o bezpieczeństwo Twojego jednośladu. Specjalizujemy się w bezpiecznym i sprawnym transporcie motocykli zarówno lokalnie, jak i na długich dystansach międzynarodowych.",
            image: "/images/transport_3.webp"
        },
        {
            title: "Największa gwarancja bezpieczeństwa",
            description: "Dla maksymalnego bezpieczeństwa podczas załadunku i rozładunku, korzystamy z wytrzymałego najazdu aluminiowego o udźwigu do 400kg. Transportowany motocykl jest zamocowany w specjalnym doku pod przednie koło, które uniemożliwia jego przechylenie na boki.",
            image: "/images/transport_1.webp"
        },
        {
            title: "Najlepsze zabezpieczenie motocykla",
            description: "Każdy motocykl zabezpieczamy profesjonalnymi pasami transportowymi w 2 lub 4 punktach, w zależności od typu i gabarytów jednośladu. Oferujemy możliwość przewozu do 2 motocykli jednocześnie, co pozwala zoptymalizować koszty transportu.",
            image: "/images/transport_2.webp"
        }
    ],
    operatingArea: {
        title: "Obszar działania",
        description: "Świadczymy kompleksowe usługi transportowe na trzech poziomach:",
        areas: [
            {
                icon: "faTruck",
                text: "Transport lokalny - Poznań i okolice (do 50 km)"
            },
            {
                icon: "faTruckArrowRight",
                text: "Transport krajowy - cała Polska"
            },
            {
                icon: "faRoadBarrier",
                text: "Transport międzynarodowy - kraje Unii Europejskiej"
            }
        ],
        additionalInfo: "Ceny ustalamy indywidualnie w zależności od odległości, ilości motocykli i specyfiki transportu. Zapewniamy konkurencyjne stawki i pełne ubezpieczenie podczas transportu."
    },
    cta: {
        title: "Potrzebujesz transportu motocykla?",
        description: "Skontaktuj się z nami, aby ustalić szczegóły transportu i otrzymać wycenę.",
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
        return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
    }
} 