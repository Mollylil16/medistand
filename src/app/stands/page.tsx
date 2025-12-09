'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle, 
  ArrowRight, 
  Ruler, 
  Box, 
  Zap,
  Info
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { stands } from '@/constants/stands';
import { formatPrice } from '@/lib/utils';

export default function StandsPage() {
  const [selectedStand, setSelectedStand] = useState<string | null>(null);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Nos <span className="text-accent">Stands Professionnels</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
              Des solutions adaptées à tous vos besoins d'exposition
            </p>
          </div>
        </div>
      </section>

      {/* Stands Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {stands.map((stand, index) => (
              <div 
                key={stand.id} 
                id={stand.id}
                className="scroll-mt-20"
              >
                <Card className="overflow-hidden animate-fade-in-up max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                    {/* Image */}
                    <div className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-auto overflow-hidden">
                      <Image
                        src={stand.image}
                        alt={stand.nom}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {index === 0 && (
                        <div className="absolute top-6 right-6 bg-accent text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl animate-pulse-slow z-10">
                          ⭐ Plus Populaire
                        </div>
                      )}

                      {stand.prix === 0 && (
                        <div className="absolute top-6 left-6 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-xl z-10">
                          Sur Mesure
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                      <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3 sm:mb-4">
                          {stand.nom}
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                          {stand.description}
                        </p>
                      </div>

                      {/* Prix */}
                      <div className="bg-accent/10 border-l-4 border-accent p-4 sm:p-6 rounded-r-lg">
                        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-xs sm:text-sm text-gray-600 mb-1">Tarif location</div>
                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                              À partir de 9 000 FCFA/m²
                            </div>
                            <div className="text-xs sm:text-sm text-gray-600 mt-1">
                              Proforma personnalisée sur demande
                            </div>
                            <div className="text-xs text-accent font-semibold mt-2">
                              Surface : {parseInt(stand.dimensions.largeur) * parseInt(stand.dimensions.profondeur)}m²
                            </div>
                          </div>
                          <Link href="/tarifs" className="w-full sm:w-auto">
                            <Button className="group w-full sm:w-auto min-h-[44px]">
                              Demander un devis
                              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </div>

                      {/* Caractéristiques */}
                      <div className="space-y-4">
                        {/* Dimensions */}
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Ruler size={20} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-primary mb-1">Dimensions</div>
                            <div className="text-gray-600">
                              {stand.dimensions.largeur} × {stand.dimensions.profondeur} × {stand.dimensions.hauteur}
                            </div>
                          </div>
                        </div>

                        {/* Matériaux */}
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Box size={20} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-primary mb-1">Matériaux</div>
                            <ul className="space-y-1">
                              {stand.materiaux.map((materiau, idx) => (
                                <li key={idx} className="text-gray-600 text-sm flex items-center space-x-2">
                                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                                  <span>{materiau}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Caractéristiques */}
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Info size={20} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold text-primary mb-2">Caractéristiques</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {stand.caracteristiques.map((caract, idx) => (
                                <div key={idx} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                                  {caract}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Accordion Sections */}
                      <div className="space-y-3 pt-4">
                        {/* Accessoires */}
                        <details className="group">
                          <summary className="flex items-center justify-between cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                            <span className="font-semibold text-primary flex items-center space-x-2">
                              <Zap size={18} />
                              <span>Accessoires inclus ({stand.accessoires.length})</span>
                            </span>
                            <svg className="w-5 h-5 text-primary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="mt-3 space-y-2 px-4">
                            {stand.accessoires.map((accessoire, idx) => (
                              <div key={idx} className="flex items-center space-x-3 py-2">
                                <CheckCircle size={18} className="text-accent flex-shrink-0" />
                                <span className="text-gray-700">{accessoire}</span>
                              </div>
                            ))}
                          </div>
                        </details>

                        {/* Avantages */}
                        <details className="group">
                          <summary className="flex items-center justify-between cursor-pointer bg-gray-50 hover:bg-gray-100 p-4 rounded-lg transition-colors">
                            <span className="font-semibold text-primary flex items-center space-x-2">
                              <CheckCircle size={18} />
                              <span>Avantages ({stand.avantages.length})</span>
                            </span>
                            <svg className="w-5 h-5 text-primary group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </summary>
                          <div className="mt-3 space-y-2 px-4">
                            {stand.avantages.map((avantage, idx) => (
                              <div key={idx} className="flex items-center space-x-3 py-2">
                                <CheckCircle size={18} className="text-accent flex-shrink-0" />
                                <span className="text-gray-700">{avantage}</span>
                              </div>
                            ))}
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Trouvé le stand idéal ?
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-200">
              Contactez-nous pour obtenir un devis personnalisé et réserver votre stand
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
              <Link href="/tarifs">
                <Button size="lg" className="group">
                  Demander un devis
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

