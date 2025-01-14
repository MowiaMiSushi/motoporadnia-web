# MotoPoradnia Web

Strona internetowa dla firmy MotoPoradnia, oferującej profesjonalne usługi motocyklowe.

## Funkcje

- Strona główna z prezentacją usług
- Panel administracyjny do zarządzania treścią
- Responsywny design
- Optymalizacja SEO
- System zarządzania treścią (CMS)

## Technologie

- Next.js 14
- TypeScript
- Tailwind CSS
- NextAuth.js
- React
- Framer Motion

## Wymagania

- Node.js 18+
- npm 9+

## Instalacja

1. Sklonuj repozytorium:
```bash
git clone https://github.com/MowiaMiSushi/motoporadnia-web.git
```

2. Przejdź do katalogu projektu:
```bash
cd motoporadnia-web
```

3. Zainstaluj zależności:
```bash
npm install
```

4. Skopiuj plik `.env.example` do `.env.local` i uzupełnij wymagane zmienne środowiskowe:
```bash
cp .env.example .env.local
```

5. Uruchom serwer deweloperski:
```bash
npm run dev
```

## Struktura projektu

```
motoporadnia-web/
├── app/                    # Główny katalog aplikacji
│   ├── admin/             # Panel administracyjny
│   ├── api/               # Endpointy API
│   ├── components/        # Komponenty React
│   └── ...
├── content/               # Pliki z treścią
├── public/               # Statyczne pliki
└── ...
```

## Deployment

Aplikacja jest hostowana (wstawie potem nazwe hosta). Każdy push do gałęzi `main` automatycznie wyzwala nowy deployment.

## Licencja

Ten projekt jest własnością firmy MotoPoradnia. Wszelkie prawa zastrzeżone.
