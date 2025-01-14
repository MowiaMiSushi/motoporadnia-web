'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image';
import { aboutData } from './data';

interface PageContent {
  hero: {
    title: string;
    description: string;
    images: string[];
  };
  history: {
    title: string;
    sections: Array<{
      content: string[];
      image: string;
    }>;
  };
  team: {
    title: string;
    members: Array<{
      name: string;
      position: string;
      image: string;
    }>;
  };
  socialMedia: {
    title: string;
    platforms: Array<{
      name: string;
      icon: string;
      url: string;
      description: string;
    }>;
  };
}

export default function AboutUs() {
  const [content, setContent] = useState<PageContent>(aboutData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/content/about');
        if (response.ok) {
          const data = await response.json();
          setContent(data || aboutData);
        } else {
          setContent(aboutData);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
        setContent(aboutData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
    if (content?.hero.images) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === content.hero.images.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [content]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ładowanie...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-black" aria-label="Baner główny">
        {content?.hero?.images?.map((image, index) => (
          <div
            key={image}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: currentImageIndex === index ? 1 : 0
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={content.hero.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
                quality={100}
                style={{
                  objectFit: 'cover',
                  objectPosition: '50% 50%'
                }}
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-black/50 z-[1]" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm py-8 rounded-lg max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            {content.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto"
          >
            {content.hero.description}
          </motion.p>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">{content?.history?.title}</h2>
            {content?.history?.sections?.map((section, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-12 items-center mb-16">
                <div className="space-y-6 text-gray-700">
                  {section?.content?.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-lg leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <div className="rounded-lg overflow-hidden">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={section.image}
                      alt="Zdjęcie z historii Motoporadni"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Zespół Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">{content.team.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {content.team.members.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group hover:-translate-y-2 transform transition-all duration-300 cursor-pointer"
                >
                  <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden group-hover:shadow-xl transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={`Zdjęcie ${member.name}`}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-[#C62400] transition-colors duration-300">{member.name}</h3>
                  <p className="text-[#C62400] group-hover:text-[#A01D00] transition-colors duration-300">{member.position}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gradient-to-r from-[#FFFFFF] to-[#ECECEC]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-center mb-12">{content?.socialMedia?.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {content?.socialMedia?.platforms?.map((platform, index) => {
                const icon = platform?.name?.toLowerCase() === 'facebook' ? faFacebook :
                            platform?.name?.toLowerCase() === 'instagram' ? faInstagram :
                            platform?.name?.toLowerCase() === 'youtube' ? faYoutube : faFacebook;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index === 0 ? -20 : index === 2 ? 20 : 0, y: index === 1 ? 20 : 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center"
                  >
                    <a
                      href={platform?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <FontAwesomeIcon
                        icon={icon}
                        className={`h-12 w-12 ${
                          platform?.name === 'Facebook' ? 'text-[#1877F2]' :
                          platform?.name === 'Instagram' ? 'text-[#E4405F]' :
                          'text-[#FF0000]'
                        } group-hover:scale-110 transition-transform duration-300`}
                      />
                      <h3 className="text-xl font-bold mt-4 mb-2">{platform?.name}</h3>
                      <p className="text-gray-600">{platform?.description}</p>
                    </a>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 