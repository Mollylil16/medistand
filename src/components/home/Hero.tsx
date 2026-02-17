'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full blur-2xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold animate-scale-in">
              <Sparkles size={14} className="sm:w-4 sm:h-4 text-accent" />
              <span className="whitespace-nowrap">Solution professionnelle pour événements médicaux</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Des stands qui
              <span className="block text-accent mt-1 sm:mt-2">valorisent votre visibilité</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
              Nous fournissons des stands professionnels pour congrès médicaux, événements scientifiques et expositions pharmaceutiques en Côte d'Ivoire.
            </p>

            <div className="space-y-2 sm:space-y-3">
              {[
                'Standards internationaux de qualité',
                'Installation rapide et fiable',
                'Accompagnement personnalisé',
              ].map((text, index) => (
                <div key={index} className="flex items-center space-x-2 sm:space-x-3 animate-slide-in-left" style={{ animationDelay: `${index * 100}ms` }}>
                  <CheckCircle size={20} className="sm:w-6 sm:h-6 text-accent flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Link href="/stands" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto group min-h-[44px]">
                  Découvrir nos stands
                  <ArrowRight size={18} className="sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/tarifs" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto min-h-[44px]">
                  Demander un devis
                </Button>
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 md:gap-8 pt-4 sm:pt-6 text-xs sm:text-sm">
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-accent">50+</div>
                <div className="text-gray-300">Événements réalisés</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20" />
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-accent">30+</div>
                <div className="text-gray-300">Clients satisfaits</div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-white/20" />
              <div className="text-center sm:text-left">
                <div className="text-2xl sm:text-3xl font-bold text-accent">100%</div>
                <div className="text-gray-300">Fiabilité</div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative lg:block animate-fade-in mt-8 lg:mt-0">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
              {/* Main Video */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-white/20 shadow-2xl overflow-hidden">
                <video
                  src="/Stands.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="Stand Professionnel MediStand Africa"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              </div>

              {/* Floating Cards - Hidden on mobile, visible on tablet+ */}
              <div className="hidden md:block absolute -right-4 top-20 bg-white text-primary p-3 sm:p-4 rounded-xl shadow-2xl animate-float max-w-[180px] sm:max-w-[200px]">
                <div className="text-2xl sm:text-3xl font-bold text-accent">2h</div>
                <div className="text-xs sm:text-sm">Installation rapide</div>
              </div>

              <div className="hidden md:block absolute -left-4 bottom-32 bg-white text-primary p-3 sm:p-4 rounded-xl shadow-2xl animate-float max-w-[180px] sm:max-w-[200px]" style={{ animationDelay: '0.5s' }}>
                <div className="text-2xl sm:text-3xl font-bold text-accent">24/7</div>
                <div className="text-xs sm:text-sm">Support technique</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F7FAFC"/>
        </svg>
      </div>
    </section>
  );
};

