'use client';

import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const contactInfo = {
  address: 'ul. Węglowa 9/11, 60-122 Poznań',
  mapsUrl: 'https://www.google.com/maps/place/Motoporadnia/@52.3820632,16.8732338,17z/data=!4m6!3m5!1s0x6b3a30447fea247d:0xfebbfd65d6023f50!8m2!3d52.3816215!4d16.8719611!16s%2Fg%2F11rylcfqmv',
  phone: '+48 789 059 578',
  email: 'kontakt@motoporadnia.pl',
  hours: {
    weekdays: '8:30 - 16:30',
    sunday: 'Zamknięte',
  },
  social: {
    facebook: 'https://facebook.com/motoporadnia',
    instagram: 'https://instagram.com/motoporadnia',
  },
};

export default function Contact() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/DSC_6428.jpg')"
          }}
        />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm py-8 rounded-lg max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Kontakt
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Jesteśmy do Twojej dyspozycji. Skontaktuj się z nami w dogodny dla Ciebie sposób.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg p-8"
              >
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Informacje kontaktowe</h2>
                <div className="space-y-8">
                  {/* Adres */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-2">Adres</h3>
                      <p className="text-gray-600">
                        {contactInfo.address}
                        <br />
                        <span className="text-sm">(Wjazd od ulicy Górniczej)</span>
                      </p>
                      <a 
                        href={contactInfo.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#C62400] hover:text-[#A01D00] mt-2 transition-colors"
                      >
                        Zobacz na mapie
                      </a>
                    </div>
                  </div>

                  {/* Telefon */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faPhone} className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-2">Telefon</h3>
                      <a 
                        href={`tel:${contactInfo.phone}`}
                        className="text-gray-600 hover:text-[#C62400] transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faEnvelope} className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-2">Email</h3>
                      <a 
                        href={`mailto:${contactInfo.email}`}
                        className="text-gray-600 hover:text-[#C62400] transition-colors"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>

                  {/* Godziny otwarcia */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faClock} className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-2">Godziny otwarcia</h3>
                      <div className="space-y-1 text-gray-600">
                        <p>Poniedziałek - Piątek: {contactInfo.hours.weekdays}</p>
                        <p>Sobota - Niedziela: {contactInfo.hours.sunday}</p>
                      </div>
                    </div>
                  </div>

                  {/* Media społecznościowe */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#2C3E50] rounded-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faFacebook} className="text-white text-xl" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold mb-2">Media społecznościowe</h3>
                      <div className="flex space-x-4">
                        <a
                          href={contactInfo.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-[#1877F2] transition-colors"
                        >
                          <FontAwesomeIcon icon={faFacebook} className="mr-2" />
                          Facebook
                        </a>
                        <a
                          href={contactInfo.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-[#E4405F] transition-colors"
                        >
                          <FontAwesomeIcon icon={faInstagram} className="mr-2" />
                          Instagram
                        </a>
                        <a
                          href="https://www.youtube.com/@motoporadnia"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-[#ff0000] transition-colors"
                        >
                          <FontAwesomeIcon icon={faYoutube} className="mr-2" />
                          Youtube
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.8734143191584!2d16.869772376940437!3d52.38206317978576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b3a30447fea247d%3A0xfebbfd65d6023f50!2sMotoporadnia!5e0!3m2!1spl!2spl!4v1704906411209!5m2!1spl!2spl"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC] text-black shadow-2xl border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Potrzebujesz pomocy?</h2>
            <div className="text-xl mb-8">
              Skontaktuj się z nami telefonicznie lub napisz do nas. <br />
              Doradzimy i pomożemy w doborze odpowiedniego zakresu usług.
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${contactInfo.phone}`}
                className="btn-primary bg-[#C62400] hover:bg-[#A01D00] text-white px-8 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                <FontAwesomeIcon icon={faPhone} className="mr-2" />
                Zadzwoń teraz
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="btn-secondary bg-white/10 hover:bg-white/20 text-black px-8 py-3 rounded-lg transition-colors hover:shadow-lg hover:bg-grey-100"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Napisz do nas
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 