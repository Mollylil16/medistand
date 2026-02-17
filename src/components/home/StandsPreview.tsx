'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { stands } from '@/constants/stands';
import { formatPrice } from '@/lib/utils';

export const StandsPreview: React.FC = () => {
  // Show only first 3 stands
  const featuredStands = stands.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionTitle
          title="Nos Stands Professionnels"
          subtitle="Des solutions adaptées à tous vos besoins d'exposition"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {featuredStands.map((stand, index) => (
            <Card 
              key={stand.id}
              className="group overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-[200px] sm:h-[240px] md:h-[280px] lg:h-64 rounded-lg mb-4 sm:mb-6 overflow-hidden">
                <Image
                  src={stand.image}
                  alt={stand.nom}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg z-10">
                  Populaire
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                  {stand.nom}
                </h3>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {stand.description}
                </p>

                {/* Dimensions */}
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold text-primary">{stand.dimensions.largeur}</span> × 
                    <span className="font-semibold text-primary"> {stand.dimensions.profondeur}</span>
                  </div>
                  <div className="w-px h-4 bg-gray-300" />
                  <div>
                    Surface: <span className="font-semibold text-primary">
                      {parseInt(stand.dimensions.largeur) * parseInt(stand.dimensions.profondeur)}m²
                    </span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-2">
                  {stand.avantages.slice(0, 3).map((avantage, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm">
                      <CheckCircle size={16} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{avantage}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="pt-4 border-t">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <div className="text-xs sm:text-sm text-gray-600">Tarif location</div>
                      <div className="text-2xl sm:text-3xl font-bold text-primary">
                        12 005 FCFA / m²/jour
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {parseInt(stand.dimensions.largeur) * parseInt(stand.dimensions.profondeur)}m² - Transport inclus
                      </div>
                    </div>
                  </div>

                  <Link href={`/stands#${stand.id}`}>
                    <Button className="w-full group/btn">
                      Voir les détails
                      <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/stands">
            <Button size="lg" variant="secondary" className="group">
              Voir tous nos stands
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

