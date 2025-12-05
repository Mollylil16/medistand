import React from 'react';
import { CheckCircle, Clock, Shield, Star, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { DevisForm } from '@/components/forms/DevisForm';
import { stands } from '@/constants/stands';
import { formatPrice } from '@/lib/utils';

export const metadata = {
  title: 'Tarifs & Devis - MediStand Africa | Prix Location Stands',
  description: 'Découvrez nos tarifs de location de stands pour congrès médicaux. Demandez un devis personnalisé gratuit en ligne.',
};

export default function TarifsPage() {
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
              Tarifs & <span className="text-accent">Devis</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Des tarifs transparents et compétitifs pour tous vos événements
            </p>
          </div>
        </div>
      </section>

      {/* Grille Tarifaire */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Nos Tarifs"
            subtitle="Tarification claire et sans surprise"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12">
            {stands.filter(stand => stand.prix > 0).map((stand, index) => (
              <Card 
                key={stand.id}
                className={`p-8 animate-fade-in-up ${index === 1 ? 'border-2 border-accent shadow-2xl lg:scale-105' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {index === 1 && (
                  <div className="bg-accent text-white text-sm font-semibold px-4 py-1 rounded-full inline-block mb-4">
                    ⭐ Plus Populaire
                  </div>
                )}

                <h3 className="text-2xl font-bold text-primary mb-2">{stand.nom}</h3>
                <p className="text-gray-600 text-sm mb-6">{stand.description}</p>

                <div className="mb-6">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {formatPrice(stand.prix)}
                  </div>
                  <div className="text-sm text-gray-600">par événement</div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center space-x-2 text-sm">
                    <CheckCircle size={18} className="text-accent" />
                    <span className="text-gray-700">
                      Dimensions: {stand.dimensions.largeur} × {stand.dimensions.profondeur}
                    </span>
                  </div>
                  {stand.avantages.slice(0, 3).map((avantage, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <CheckCircle size={18} className="text-accent" />
                      <span className="text-gray-700">{avantage}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="#devis-form"
                  className="block w-full px-6 py-3 bg-primary hover:bg-primary-700 text-white font-semibold rounded-lg text-center transition-colors"
                >
                  Demander ce stand
                </a>
              </Card>
            ))}
          </div>

          {/* Stand Sur Mesure */}
          <Card className="p-10 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold text-primary">Stand Modulaire Sur-Mesure</h3>
              <p className="text-lg text-gray-700">
                Pour des besoins spécifiques ou des configurations personnalisées
              </p>
              <div className="text-2xl font-bold text-accent py-4">
                Tarif sur devis personnalisé
              </div>
              <p className="text-gray-600">
                Contactez-nous pour discuter de votre projet et obtenir une proposition adaptée
              </p>
              <a
                href="#devis-form"
                className="inline-block px-8 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl mt-4"
              >
                Demander un devis personnalisé
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Ce qui est inclus"
            subtitle="Tous nos tarifs comprennent"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: TrendingUp,
                titre: 'Installation',
                description: 'Montage professionnel et rapide sur site',
              },
              {
                icon: Shield,
                titre: 'Assurance',
                description: 'Matériel assuré pendant toute la durée',
              },
              {
                icon: Clock,
                titre: 'Support',
                description: 'Assistance technique disponible',
              },
              {
                icon: Star,
                titre: 'Démontage',
                description: 'Démontage et nettoyage inclus',
              },
            ].map((item, index) => (
              <Card 
                key={index}
                className="p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                  <item.icon size={28} />
                </div>
                <h3 className="font-bold text-primary mb-2">{item.titre}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de Devis */}
      <section id="devis-form" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Demander un Devis"
            subtitle="Remplissez le formulaire ci-dessous pour obtenir un devis personnalisé gratuit"
          />

          <div className="max-w-4xl mx-auto">
            <DevisForm />
          </div>
        </div>
      </section>

      {/* Avantages Tarifaires */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Pourquoi nos tarifs ?"
            subtitle="Un excellent rapport qualité-prix"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                titre: 'Tarifs Compétitifs',
                description: 'Des prix attractifs sans compromis sur la qualité. Nous proposons les meilleurs tarifs du marché ivoirien.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                titre: 'Transparence Totale',
                description: 'Pas de frais cachés. Le prix annoncé est le prix final, incluant installation et démontage.',
                color: 'from-purple-500 to-purple-600',
              },
              {
                titre: 'Flexibilité',
                description: 'Options de paiement flexibles et adaptées aux budgets des laboratoires et organisateurs.',
                color: 'from-orange-500 to-orange-600',
              },
            ].map((avantage, index) => (
              <Card 
                key={index}
                className="p-8 text-center animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${avantage.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6`}>
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{avantage.titre}</h3>
                <p className="text-gray-600 leading-relaxed">{avantage.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

