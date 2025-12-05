import React from 'react';
import Link from 'next/link';
import { 
  Building2,
  Wrench,
  Truck,
  Lightbulb,
  Headphones,
  Palette,
  CheckCircle,
  ArrowRight,
  Clock,
  Shield,
  Star
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { services } from '@/constants/services';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Building2,
  Wrench,
  Truck,
  Lightbulb,
  Headphones,
  Palette,
};

export const metadata = {
  title: 'Services - MediStand Africa | Solutions Complètes pour Événements',
  description: 'Découvrez nos services : location de stands, installation, logistique, assistance technique et personnalisation pour vos congrès médicaux.',
};

export default function ServicesPage() {
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
              Nos <span className="text-accent">Services</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Des solutions complètes pour la réussite de vos événements
            </p>

            <div className="flex flex-wrap gap-6 justify-center pt-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock size={20} className="text-accent" />
                <span>Service rapide</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={20} className="text-accent" />
                <span>Qualité garantie</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={20} className="text-accent" />
                <span>Équipe expérimentée</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Details */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Notre Gamme de Services"
            subtitle="Un accompagnement complet de A à Z pour vos événements médicaux"
          />

          <div className="space-y-12 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icone];
              const isEven = index % 2 === 0;

              return (
                <Card 
                  key={service.id}
                  className="overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${!isEven ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Icon & Title Section */}
                    <div className={`bg-gradient-to-br from-primary/5 to-secondary/5 p-10 flex flex-col justify-center ${!isEven ? 'lg:col-start-2' : ''}`}>
                      <div className="space-y-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white">
                          {IconComponent && <IconComponent size={40} />}
                        </div>

                        <div>
                          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                            {service.nom}
                          </h2>
                          <p className="text-lg text-gray-700 leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        <div className="pt-4">
                          <Link href="/tarifs">
                            <Button className="group">
                              Demander un devis
                              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className={`p-10 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <h3 className="text-xl font-bold text-primary mb-6 flex items-center space-x-2">
                        <CheckCircle size={24} className="text-accent" />
                        <span>Ce qui est inclus</span>
                      </h3>

                      <ul className="space-y-4">
                        {service.details.map((detail, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-start space-x-3 group animate-slide-in-left"
                            style={{ animationDelay: `${(index * 100) + (idx * 30)}ms` }}
                          >
                            <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-accent/20 transition-colors">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                            </div>
                            <span className="text-gray-700 leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Notre Processus"
            subtitle="Une méthode éprouvée pour garantir le succès de votre événement"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                numero: '01',
                titre: 'Consultation',
                description: 'Analyse de vos besoins et recommandations personnalisées',
                color: 'from-blue-500 to-blue-600',
              },
              {
                numero: '02',
                titre: 'Planification',
                description: 'Élaboration d\'un plan détaillé et validation avec vous',
                color: 'from-purple-500 to-purple-600',
              },
              {
                numero: '03',
                titre: 'Installation',
                description: 'Mise en place professionnelle et rapide sur site',
                color: 'from-orange-500 to-orange-600',
              },
              {
                numero: '04',
                titre: 'Support',
                description: 'Assistance pendant l\'événement et démontage',
                color: 'from-green-500 to-green-600',
              },
            ].map((etape, index) => (
              <Card 
                key={index}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${etape.color} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  {etape.numero}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{etape.titre}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{etape.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Nos Garanties"
            subtitle="Des engagements que nous respectons à chaque projet"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Clock,
                titre: 'Ponctualité Garantie',
                description: 'Installation terminée avant l\'ouverture de votre événement, sans exception.',
              },
              {
                icon: Shield,
                titre: 'Qualité Certifiée',
                description: 'Matériel conforme aux normes internationales, testé et vérifié.',
              },
              {
                icon: Star,
                titre: 'Satisfaction 100%',
                description: 'Nous nous engageons à répondre à toutes vos attentes et plus encore.',
              },
            ].map((garantie, index) => (
              <Card 
                key={index}
                className="text-center p-8 animate-scale-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                  <garantie.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{garantie.titre}</h3>
                <p className="text-gray-600 leading-relaxed">{garantie.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold">
              Prêt à Démarrer ?
            </h2>
            
            <p className="text-xl text-gray-200 leading-relaxed">
              Discutons de votre projet et créons ensemble l'événement parfait
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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

            <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-accent mb-2">24/7</div>
                <div className="text-gray-300">Support disponible</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">&lt; 24h</div>
                <div className="text-gray-300">Temps de réponse</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">100%</div>
                <div className="text-gray-300">Satisfaction client</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

