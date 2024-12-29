import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import { connectToDatabase } from '@/app/lib/mongodb';

export async function GET() {
  const { db } = await connectToDatabase();
  const content = await db.collection('content').findOne({ type: 'pricing-service' });
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
      { type: 'pricing-service' },
      { $set: { type: 'pricing-service', data } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

const defaultContent = {
  hero: {
    title: "Cennik Serwisu Motocyklowego",
    description: "Profesjonalny serwis motocyklowy w Poznaniu. Sprawdź nasze ceny i umów się na wizytę.",
    images: [
      "/images/serwis_1.webp",
      "/images/serwis_2.webp"
    ]
  },
  priceList: [
    {
      title: "Usługi podstawowe",
      items: [
        {
          service: "Przegląd podstawowy",
          price: "od 200 zł",
          description: "Kontrola podstawowych układów, płynów i oświetlenia"
        },
        {
          service: "Przegląd rozszerzony",
          price: "od 300 zł",
          description: "Dokładna kontrola wszystkich układów, diagnostyka komputerowa"
        },
        {
          service: "Diagnostyka komputerowa",
          price: "od 150 zł",
          description: "Odczyt błędów, parametrów pracy silnika"
        }
      ]
    },
    {
      title: "Układ hamulcowy",
      items: [
        {
          service: "Wymiana klocków hamulcowych (przód/tył)",
          price: "od 100 zł",
          description: "Cena za jedną oś, nie zawiera części"
        },
        {
          service: "Wymiana płynu hamulcowego",
          price: "od 150 zł",
          description: "Cena zawiera płyn DOT4"
        },
        {
          service: "Odpowietrzenie układu hamulcowego",
          price: "od 100 zł"
        }
      ]
    },
    {
      title: "Zawieszenie/Nadwozie",
      items: [
        {
          service: "Serwis zawieszenia przedniego",
          price: "od 300 zł",
          description: "Wymiana oleju, uszczelniaczy, czyszczenie i regulacja"
        },
        {
          service: "Serwis amortyzatora tylnego",
          price: "od 250 zł",
          description: "Przegląd, czyszczenie i regulacja"
        },
        {
          service: "Wymiana łożysk wahacza",
          price: "od 200 zł",
          description: "Cena nie zawiera części"
        }
      ]
    },
    {
      title: "Podstawowa obsługa silnika/skrzyni biegów",
      items: [
        {
          service: "Wymiana oleju i filtra",
          price: "od 150 zł",
          description: "Cena nie zawiera materiałów"
        },
        {
          service: "Regulacja zaworów",
          price: "od 200 zł",
          description: "Cena zależna od modelu motocykla"
        },
        {
          service: "Wymiana świec zapłonowych",
          price: "od 100 zł",
          description: "Cena nie zawiera świec"
        }
      ]
    },
    {
      title: "Układ napędowy",
      items: [
        {
          service: "Wymiana łańcucha i zębatek",
          price: "od 200 zł",
          description: "Cena nie zawiera części"
        },
        {
          service: "Czyszczenie i smarowanie łańcucha",
          price: "od 50 zł",
          description: "Zawiera czyszczenie i smarowanie specjalistycznymi środkami"
        },
        {
          service: "Regulacja napięcia łańcucha",
          price: "od 50 zł"
        }
      ]
    },
    {
      title: "Koła i ogumienie",
      items: [
        {
          service: "Wymiana opony",
          price: "od 80 zł",
          description: "Cena za jedno koło, nie zawiera opony"
        },
        {
          service: "Wyważanie koła",
          price: "od 50 zł",
          description: "Cena za jedno koło"
        },
        {
          service: "Naprawa przebitej opony",
          price: "od 70 zł",
          description: "Cena zależna od rodzaju i miejsca uszkodzenia"
        }
      ]
    },
    {
      title: "Układ rozrządu",
      items: [
        {
          service: "Regulacja rozrządu",
          price: "od 250 zł",
          description: "Cena zależna od modelu motocykla"
        },
        {
          service: "Wymiana łańcucha rozrządu",
          price: "od 500 zł",
          description: "Cena nie zawiera części"
        },
        {
          service: "Kontrola luzów zaworowych",
          price: "od 150 zł",
          description: "Pomiar i diagnostyka"
        }
      ]
    },
    {
      title: "Układ Paliwowy",
      items: [
        {
          service: "Czyszczenie i regulacja gaźników",
          price: "od 300 zł",
          description: "Cena za komplet"
        },
        {
          service: "Synchronizacja gaźników",
          price: "od 200 zł",
          description: "Precyzyjna regulacja"
        },
        {
          service: "Diagnostyka układu wtryskowego",
          price: "od 150 zł",
          description: "Kompleksowa diagnostyka komputerowa"
        }
      ]
    },
    {
      title: "Elektryka",
      items: [
        {
          service: "Diagnostyka instalacji elektrycznej",
          price: "od 150 zł",
          description: "Lokalizacja usterek i pomiary"
        },
        {
          service: "Naprawa wiązki elektrycznej",
          price: "od 200 zł",
          description: "Cena zależna od zakresu prac"
        },
        {
          service: "Wymiana akumulatora",
          price: "od 50 zł",
          description: "Cena nie zawiera akumulatora"
        }
      ]
    }
  ],
  disclaimer: {
    top: [
      "Poniższy cennik powstał na bazie naszego doświadczenia związanego z należytą i profesjonalną obsługą motocykli.",
      "Ceny bazują na roboczogodzinach, które trzeba poświęć aby zgodnie ze sztuką dokonać serwisu Waszych motocykli.",
      "Przewidują one też wszelkie utrudnienia w trakcie wykonywanych prac wynikających najczęściej z wieku motocykla czy wcześniejszych nieodpowiednio przeprowadzanych napraw oraz czas poświęcony na poszukiwanie trudniej dostępnych części.",
      "Podana cena może ulec zmianie w trakcie wykonywanych prac stosunkowo w jedną jak i drugą stronę.",
      "Powyższe ceny nie zawierają cen części zamiennych."
    ],
    bottom: [
      "Wszystkie inne nie wymienione czynności, usługi, prace są wyceniane indywidualnie zawsze na początku zlecenia przed przystąpieniem do pracy.",
      "Powyższy cennik nie stanowi oferty dla klienta a zawarte w nim ceny są poglądowe w rozumieniu prawa cywilnego, art. 71 kodeksu cywilnego i stanowią zaproszenie do zawarcia umowy/zlecenia wykonania usługi.",
      "Wszystkie ceny zawarte w cenniku są cenami brutto i zawierają podatek VAT 23%. Na usługę wystawiamy paragon bądź fakturę VAT."
    ]
  }
}; 