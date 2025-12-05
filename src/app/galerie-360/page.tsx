'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Eye, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image: string;
  event: string;
  date: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    title: 'Stand Premium 18m² - Congrès SIMGF',
    description: 'Stand modulaire grand format installé lors du congrès national de médecine générale',
    image: '/stand1.jpg',
    event: 'SIMGF 2024',
    date: 'Mars 2024',
  },
  {
    id: '2',
    title: 'Stand Compact 6m² - Salon Pharmaceutique',
    description: 'Configuration optimisée pour exposition pharmaceutique',
    image: '/stand 2.png',
    event: 'Salon Pharma CI',
    date: 'Février 2024',
  },
  {
    id: '3',
    title: 'Stand Premium 9m² - Symposium Cardiologie',
    description: 'Stand intermédiaire avec équipements premium',
    image: '/stand 3.jpg',
    event: 'Cardio Summit',
    date: 'Janvier 2024',
  },
  {
    id: '4',
    title: 'Configuration Modulaire - Congrès GO',
    description: 'Stand personnalisé pour le congrès de gynécologie-obstétrique',
    image: '/stand4.jpg',
    event: 'SAGO 2023',
    date: 'Décembre 2023',
  },
  {
    id: '5',
    title: 'Stand Executive - Forum Santé',
    description: 'Stand haut de gamme avec espace VIP',
    image: '/stand5.jpg',
    event: 'Forum Santé Publique',
    date: 'Novembre 2023',
  },
  {
    id: '6',
    title: 'Stand Premium - Journées Pédiatrie',
    description: 'Configuration adaptée aux équipements pédiatriques',
    image: '/stand6.jpg',
    event: 'SIPCI 2023',
    date: 'Octobre 2023',
  },
  {
    id: '7',
    title: 'Stand Modulaire - Congrès Dentaire',
    description: 'Espace d\'exposition optimisé pour matériel dentaire',
    image: '/stand7.jpg',
    event: 'Congrès Dentaire CI',
    date: 'Septembre 2023',
  },
  {
    id: '8',
    title: 'Stand Premium - Salon Innovation',
    description: 'Stand moderne pour exposition de technologies médicales',
    image: '/stand8.jpg',
    event: 'Innovation Santé',
    date: 'Août 2023',
  },
  {
    id: '9',
    title: 'Configuration VIP - Congrès International',
    description: 'Stand prestige pour événement international',
    image: '/stand9.jpg',
    event: 'Congrès WAEMU Health',
    date: 'Juillet 2023',
  },
  {
    id: '10',
    title: 'Stand Executive - Symposium Médical',
    description: 'Configuration executive avec technologie intégrée',
    image: '/stand10.jpg',
    event: 'Symposium Médical',
    date: 'Juin 2023',
  },
];

export default function Galerie360Page() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % galleryImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              <Camera size={16} className="text-accent" />
              <span>Galerie Photos</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              Galerie <span className="text-accent">Virtuelle</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Découvrez nos stands installés lors de divers événements médicaux
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Nos Réalisations"
            subtitle="Parcourez notre galerie de stands professionnels"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {galleryImages.map((item, index) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item, index)}
              >
                <Card
                  className="group cursor-pointer overflow-hidden animate-fade-in-up hover:shadow-2xl"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                          <Eye size={16} />
                          <span className="text-sm font-semibold">Voir en grand</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold z-10">
                      {item.event}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-primary mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <span>{item.date}</span>
                      <Maximize2 size={14} className="group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors z-50 bg-black/50 rounded-full p-2"
            aria-label="Fermer"
          >
            <X size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 text-white hover:text-accent transition-colors z-50 bg-black/50 rounded-full p-2"
            aria-label="Précédent"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 text-white hover:text-accent transition-colors z-50 bg-black/50 rounded-full p-2"
            aria-label="Suivant"
          >
            <ChevronRight size={48} />
          </button>

          <div 
            className="container mx-auto px-4 h-full flex flex-col justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[70vh] mb-6">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            <div className="text-white text-center space-y-2">
              <div className="text-xs text-accent font-semibold">
                {selectedImage.event} • {selectedImage.date}
              </div>
              <h2 className="text-2xl font-bold">{selectedImage.title}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">{selectedImage.description}</p>
              <div className="text-sm text-gray-500 pt-2">
                {currentIndex + 1} / {galleryImages.length}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Impressionné par nos réalisations ?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Contactez-nous pour créer un stand exceptionnel pour votre prochain événement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => window.location.href = '/reservation'}>
                Réserver un stand
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary" onClick={() => window.location.href = '/contact'}>
                Nous contacter
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

