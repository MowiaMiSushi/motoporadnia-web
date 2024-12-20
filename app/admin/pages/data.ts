export interface Page {
  _id?: string;
  pageId: string;
  title: string;
  content: string;
  lastModified?: Date;
}

export const defaultPages = [
  { pageId: 'o-nas', title: 'O nas' },
  { pageId: 'uslugi', title: 'Usługi' },
  { pageId: 'szkolenia', title: 'Szkolenia' },
  { pageId: 'kontakt', title: 'Kontakt' },
  { pageId: 'uslugi/serwis', title: 'Serwis' },
  { pageId: 'uslugi/transport', title: 'Transport' },
  { pageId: 'uslugi/pomoc-w-zakupie', title: 'Pomoc w zakupie' },
  { pageId: 'uslugi/komis', title: 'Komis' },
  { pageId: 'uslugi/szkolenia', title: 'Szkolenia' },
  { pageId: 'uslugi/serwis/cennik', title: 'Cennik serwisu' }
]; 