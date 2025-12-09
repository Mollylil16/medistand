'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { contactInfo } from '@/constants/navigation';

export const CTASection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-accent rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold animate-fade-in-up">
            Prêt à valoriser votre présence ?
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Contactez-nous dès aujourd'hui pour obtenir un devis personnalisé et discuter de votre prochain événement.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in-up pt-2 sm:pt-4" style={{ animationDelay: '200ms' }}>
            <Link href="/tarifs" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full sm:w-auto min-h-[44px]">
                Demander un devis gratuit
                <ArrowRight size={18} className="sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <a href={`tel:${contactInfo.telephone}`} className="w-full sm:w-auto">
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white hover:text-primary w-full sm:w-auto min-h-[44px]">
                <Phone size={18} className="sm:w-5 sm:h-5 mr-2" />
                Appelez-nous
              </Button>
            </a>
          </div>

          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center items-center text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Réponse rapide sous 24h</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Devis personnalisé gratuit</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Sans engagement</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

