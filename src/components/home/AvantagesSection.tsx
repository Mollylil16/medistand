'use client';

import React from 'react';
import { 
  Stethoscope, 
  Award, 
  Clock, 
  Eye, 
  Settings, 
  DollarSign, 
  Users, 
  MapPin 
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { avantages } from '@/constants/avantages';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Stethoscope,
  Award,
  Clock,
  Eye,
  Settings,
  DollarSign,
  Users,
  MapPin,
};

export const AvantagesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Pourquoi choisir MediStand Africa ?"
          subtitle="Des avantages concurrentiels qui font la différence pour vos événements"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {avantages.map((avantage, index) => {
            const IconComponent = iconMap[avantage.icone];
            
            return (
              <Card 
                key={avantage.id} 
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    {IconComponent && <IconComponent size={32} />}
                  </div>
                  
                  <h3 className="text-lg font-bold text-primary">
                    {avantage.titre}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {avantage.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

