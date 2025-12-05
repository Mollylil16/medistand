import React from 'react';
import { Hero } from '@/components/home/Hero';
import { AvantagesSection } from '@/components/home/AvantagesSection';
import { StandsPreview } from '@/components/home/StandsPreview';
import { CTASection } from '@/components/home/CTASection';
import { NewsletterSection } from '@/components/NewsletterSection';

export const metadata = {
  title: 'MediStand Africa - Location de Stands pour Congrès Médicaux | Abidjan',
  description: 'Location de stands professionnels pour congrès médicaux et événements scientifiques en Côte d\'Ivoire. Solutions modernes, installation rapide, tarifs compétitifs.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AvantagesSection />
      <StandsPreview />
      <NewsletterSection />
      <CTASection />
    </>
  );
}

