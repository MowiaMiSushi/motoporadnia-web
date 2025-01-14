'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const uslugi = [
  { name: 'Pomoc przy zakupie motocykla', href: '/uslugi/pomoc-w-zakupie' },
  { name: 'Serwis motocykli', href: '/uslugi/serwis' },
  { name: 'Transport motocykli', href: '/uslugi/transport' },
  { name: 'Szkolenia motocyklowe', href: '/uslugi/szkolenia' },
  { name: 'Komis motocykli', href: '/uslugi/komis' },
];

const socialMedia = [
  { name: 'Facebook', icon: faFacebookF, href: 'https://facebook.com/motoporadnia' },
  { name: 'Instagram', icon: faInstagram, href: 'https://instagram.com/motoporadnia' },
  { name: 'YouTube', icon: faYoutube, href: 'https://youtube.com/motoporadnia' },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#000] to-[#340202] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Kontakt */}
          <div>
          <h2 className="text-white text-xl font-bold mb-4 pb-2 border-b-2 border-[#C62400] inline-block">
              Kontakt
            </h2>
            <ul className="space-y-4">
              <li>
                <a href="tel:789059578" className="flex items-center gap-2 hover:text-[#C62400] transition-colors">
                  <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                  789 059 578
                </a>
              </li>
              <li>
                <a href="mailto:kontakt@motoporadnia.pl" className="flex items-center gap-2 hover:text-[#C62400] transition-colors">
                  <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                  kontakt@motoporadnia.pl
                </a>
              </li>
              <li>
                <a href="https://www.google.com/maps/place/Motoporadnia/@52.3867987,16.8701257,15z/data=!4m6!3m5!1s0x6b3a30447fea247d:0xfebbfd65d6023f50!8m2!3d52.3816215!4d16.8719611!16s%2Fg%2F11rylcfqmv?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#C62400] transition-colors">
                  <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
                  ul. Węglowa 9/11, 60-122 Poznań
                </a>
              </li>
            </ul>
          </div>

          {/* Usługi */}
          <div>
          <h2 className="text-white text-xl font-bold mb-4 pb-2 border-b-2 border-[#C62400] inline-block">
              Usługi
            </h2>
            <ul className="space-y-4">
              {uslugi.map((usluga) => (
                <li key={usluga.name}>
                  <Link href={usluga.href} className="hover:text-[#C62400] transition-colors">
                    {usluga.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Godziny otwarcia */}
          <div>
          <h2 className="text-white text-xl font-bold mb-4 pb-2 border-b-2 border-[#C62400] inline-block">
              Godziny otwarcia
            </h2>
            <ul className="space-y-4">
              <li>Poniedziałek - Piątek: 8:30 - 16:30</li>
              <li>Sobota - Niedziela: Zamknięte</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
          <h2 className="text-white text-xl font-bold mb-4 pb-2 border-b-2 border-[#C62400] inline-block">
              Social Media
            </h2>
            <div className="flex gap-4">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C62400] transition-colors"
                >
                  <FontAwesomeIcon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center text-sm">
          © 2024 <Link href="/" className="hover:text-[#C62400] transition-colors border-b border-white/10">Motoporadnia</Link>. Wszelkie prawa zastrzeżone.
        </div>
        <div className="text-center text-sm ">Strona tworzona przez <Link href="https://www.linkedin.com/in/aleksander-wac%C5%82awik/" className="hover:text-[#C62400] border-b border-white/10">Aleksander Wacławik</Link></div>
      </div>
    </footer>
  );
}
