import React from 'react';
import { Calendar, MapPin, Star, Quote } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const metadata = {
  title: 'Portfolio & Réalisations - MediStand Africa | Nos Événements',
  description: 'Découvrez nos réalisations : stands installés lors de congrès médicaux et événements scientifiques en Côte d\'Ivoire.',
};

// Données de réalisations
const realisations = [
  {
    id: '1',
    titre: 'Congrès National de Médecine Générale',
    evenement: 'SIMGF 2024',
    date: 'Mars 2024',
    lieu: 'Sofitel Hôtel Ivoire, Abidjan',
    stands: 8,
    description: 'Installation de 8 stands professionnels pour les laboratoires pharmaceutiques partenaires du congrès.',
  },
  {
    id: '2',
    titre: 'Symposium International de Cardiologie',
    evenement: 'Cardio Summit CI',
    date: 'Janvier 2024',
    lieu: 'Radisson Blu, Abidjan',
    stands: 12,
    description: 'Équipement complet de l\'espace exposition avec stands modulaires et espace VIP.',
  },
  {
    id: '3',
    titre: 'Journées Pharmaceutiques Ivoiriennes',
    evenement: 'JPI 2023',
    date: 'Novembre 2023',
    lieu: 'Palais de la Culture, Abidjan',
    stands: 15,
    description: 'Plus grande exposition pharmaceutique de l\'année avec stands premium et executive.',
  },
  {
    id: '4',
    titre: 'Congrès de Gynécologie Obstétrique',
    evenement: 'SAGO 2023',
    date: 'Septembre 2023',
    lieu: 'Hôtel Pullman, Abidjan',
    stands: 6,
    description: 'Stands modulaires personnalisés pour les exposants du congrès de gynécologie.',
  },
  {
    id: '5',
    titre: 'Forum Santé Publique Afrique de l\'Ouest',
    evenement: 'FSPAO 2023',
    date: 'Juin 2023',
    lieu: 'Centre de Conférences d\'Abidjan',
    stands: 10,
    description: 'Installation d\'un village exposition avec stands interconnectés et espaces de démonstration.',
  },
  {
    id: '6',
    titre: 'Colloque National de Pédiatrie',
    evenement: 'SIPCI 2023',
    date: 'Mai 2023',
    lieu: 'Azalaï Hôtel, Abidjan',
    stands: 5,
    description: 'Stands compacts et modulaires pour l\'exposition des équipements pédiatriques.',
  },
];

// Témoignages clients
const temoignages = [
  {
    id: '1',
    nom: 'Dr. Kouassi Jean',
    poste: 'Président',
    entreprise: 'SIMGF',
    texte: 'MediStand Africa a transformé notre congrès ! Les stands étaient magnifiques, l\'installation impeccable et le service professionnel. Nous recommandons vivement.',
    note: 5,
  },
  {
    id: '2',
    nom: 'Mme Diabaté Fatoumata',
    poste: 'Directrice Marketing',
    entreprise: 'Laboratoire PharmaCare',
    texte: 'Excellente prestation ! Notre stand nous a permis d\'attirer beaucoup de visiteurs. L\'équipe de MediStand est réactive et à l\'écoute.',
    note: 5,
  },
  {
    id: '3',
    nom: 'M. Traoré Ibrahim',
    poste: 'Responsable Événementiel',
    entreprise: 'Association Médicale CI',
    texte: 'Rapport qualité-prix imbattable. Les stands sont modernes et robustes. Installation rapide et démontage efficace. Parfait pour nos événements.',
    note: 5,
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold">
              Portfolio & <span className="text-accent">Réalisations</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Découvrez nos stands installés lors des plus grands événements médicaux
            </p>

            <div className="flex flex-wrap gap-8 justify-center pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">50+</div>
                <div className="text-gray-300">Événements réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">100+</div>
                <div className="text-gray-300">Stands installés</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">30+</div>
                <div className="text-gray-300">Clients satisfaits</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Réalisations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Nos Réalisations"
            subtitle="Des événements médicaux majeurs équipés par MediStand Africa"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {realisations.map((realisation, index) => (
              <Card 
                key={realisation.id}
                className="overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-50">🏥</div>
                  </div>
                  <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {realisation.stands} stands
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2 line-clamp-2">
                      {realisation.titre}
                    </h3>
                    <div className="text-lg text-accent font-semibold">
                      {realisation.evenement}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {realisation.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar size={16} className="text-primary" />
                      <span>{realisation.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin size={16} className="text-primary" />
                      <span>{realisation.lieu}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Témoignages Clients"
            subtitle="Ce que nos clients disent de nous"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {temoignages.map((temoignage, index) => (
              <Card 
                key={temoignage.id}
                className="p-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Quote size={40} className="text-accent/20 mb-4" />

                <div className="flex mb-4">
                  {[...Array(temoignage.note)].map((_, i) => (
                    <Star key={i} size={18} className="text-accent fill-accent" />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{temoignage.texte}"
                </p>

                <div className="border-t pt-4">
                  <div className="font-bold text-primary">{temoignage.nom}</div>
                  <div className="text-sm text-gray-600">{temoignage.poste}</div>
                  <div className="text-sm text-accent font-semibold">{temoignage.entreprise}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie Photos Placeholder */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Galerie Photos"
            subtitle="Quelques images de nos installations"
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="text-5xl opacity-50">🏥</div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Photos réelles à venir. Contactez-nous pour voir nos réalisations en détail.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Votre événement sera le prochain ?
            </h2>
            
            <p className="text-xl text-gray-200">
              Rejoignez nos clients satisfaits et faites de votre événement un succès
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/tarifs"
                className="px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl inline-block text-center"
              >
                Demander un devis
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary font-semibold rounded-lg transition-all duration-300 shadow-lg inline-block text-center"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

