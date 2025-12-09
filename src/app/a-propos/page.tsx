import React from 'react';
import { 
  Target, 
  Eye, 
  Heart, 
  Award, 
  Users, 
  TrendingUp,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { avantages } from '@/constants/avantages';

export const metadata = {
  title: 'À propos - MediStand Africa | Notre Histoire et Mission',
  description: 'Découvrez l\'histoire de MediStand Africa, notre vision et notre mission. Une entreprise ivoirienne au service des événements médicaux en Afrique de l\'Ouest.',
};

export default function AProposPage() {
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
            <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
              <Sparkles size={14} className="sm:w-4 sm:h-4 text-accent" />
              <span>Notre Histoire</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              À propos de <span className="text-accent">MediStand Africa</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
              Une vision locale, des standards internationaux
            </p>
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Notre Histoire"
              subtitle="Comment tout a commencé"
            />

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <Card className="p-8">
                <p className="text-lg mb-6">
                  MediStand Africa est née d'une <span className="font-semibold text-primary">observation simple mais déterminante</span> : lors des congrès médicaux en Côte d'Ivoire, les laboratoires et organisations professionnelles manquaient de stands modernes, fiables et adaptés aux exigences actuelles de visibilité.
                </p>

                <p className="text-lg mb-6">
                  Les organisateurs de congrès, dont la <span className="font-semibold text-primary">SIMGF</span>, dépendaient souvent de prestataires extérieurs, avec des <span className="font-semibold text-accent">coûts élevés</span>, des délais imprévisibles et une qualité parfois inconstante.
                </p>

                <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg my-8">
                  <p className="text-lg italic text-primary font-medium">
                    "En tant que médecin engagé dans la vie scientifique et organisationnelle, j'ai vu une opportunité claire : créer une structure locale capable d'offrir des stands professionnels de haute qualité, équivalents aux standards internationaux, mais accessibles et disponibles immédiatement pour les acteurs de la santé."
                  </p>
                  <p className="text-sm text-gray-600 mt-4">
                    — Fondateur de MediStand Africa
                  </p>
                </div>

                <p className="text-lg mb-6">
                  C'est ainsi qu'est née <span className="font-bold text-primary">MediStand Africa</span>, une entreprise pensée pour <span className="font-semibold text-accent">simplifier, moderniser et professionnaliser</span> l'expérience d'exposition lors des événements médicaux et scientifiques.
                </p>

                <p className="text-lg mb-6">
                  Le projet a commencé avec l'importation du tout premier stand depuis la Chine — un investissement initial pensé comme un test. Rapidement, l'efficacité du matériel, son esthétique et sa solidité ont confirmé la vision : <span className="font-semibold text-primary">il fallait aller plus loin</span>.
                </p>

                <p className="text-lg">
                  Aujourd'hui, MediStand Africa se positionne comme la <span className="font-bold text-accent">référence émergente</span> dans la location de stands d'exposition médicaux en Afrique de l'Ouest. MediStand Africa incarne une nouvelle dynamique : celle d'un <span className="font-semibold text-primary">secteur santé plus structuré, plus moderne, et plus autonome</span> dans l'organisation de ses événements.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {/* Vision */}
            <Card className="p-10 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white">
                  <Eye size={32} />
                </div>
                <h2 className="text-3xl font-bold text-primary">Notre Vision</h2>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Devenir la <span className="font-semibold text-accent">référence africaine</span> en solutions d'exposition médicales et scientifiques, en offrant aux laboratoires, institutions de santé et organisateurs de congrès des stands professionnels, élégants et performants, qui renforcent leur impact visuel et la qualité de leurs événements.
              </p>
            </Card>

            {/* Mission */}
            <Card className="p-10 bg-gradient-to-br from-accent/5 to-accent/10 border-2 border-accent/20">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center text-white">
                  <Target size={32} />
                </div>
                <h2 className="text-3xl font-bold text-primary">Notre Mission</h2>
              </div>
              
              <ul className="space-y-4">
                {[
                  'Fournir des stands modernes, modulaires et fiables pour tous les congrès médicaux et scientifiques',
                  'Garantir une installation rapide, professionnelle et conforme aux exigences des organisateurs',
                  'Offrir aux laboratoires une visibilité optimale qui valorise leur image et leurs innovations',
                  'Accompagner les événements de santé avec une expertise logistique et technique adaptée',
                  'Contribuer à renforcer la qualité et la structuration des congrès médicaux en Afrique de l\'Ouest',
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle size={20} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Nos Valeurs"
            subtitle="Les principes qui guident notre action au quotidien"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Award,
                titre: 'Excellence',
                description: 'Nous recherchons la perfection dans chaque détail, du choix des matériaux à l\'installation finale.',
              },
              {
                icon: Heart,
                titre: 'Engagement',
                description: 'Votre succès est notre priorité. Nous nous investissons pleinement dans chaque projet.',
              },
              {
                icon: Users,
                titre: 'Proximité',
                description: 'Une écoute attentive et un accompagnement personnalisé tout au long de votre événement.',
              },
              {
                icon: TrendingUp,
                titre: 'Innovation',
                description: 'Des solutions modernes et évolutives qui s\'adaptent aux nouvelles tendances du secteur.',
              },
              {
                icon: CheckCircle,
                titre: 'Fiabilité',
                description: 'Des engagements respectés, des délais tenus, une qualité constante.',
              },
              {
                icon: Sparkles,
                titre: 'Professionnalisme',
                description: 'Une expertise reconnue et un service irréprochable à chaque étape.',
              },
            ].map((valeur, index) => (
              <Card 
                key={index}
                className="p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <valeur.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{valeur.titre}</h3>
                <p className="text-gray-600 leading-relaxed">{valeur.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi Nous Choisir */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionTitle
            title="Pourquoi Choisir MediStand Africa ?"
            subtitle="Des avantages concurrentiels qui font la différence"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {avantages.map((avantage, index) => (
              <Card 
                key={avantage.id}
                className="p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary mb-2">{avantage.titre}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{avantage.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Qualité */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Award size={32} className="sm:w-10 sm:h-10" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Notre Engagement Qualité</h2>
            
            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed px-2">
              Chez MediStand Africa, nous nous engageons à fournir des stands conformes aux <span className="font-semibold text-accent">standards internationaux</span>, avec une <span className="font-semibold text-accent">installation professionnelle</span> et un <span className="font-semibold text-accent">support technique</span> pendant toute la durée de vos événements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-6 sm:pt-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-accent mb-1 sm:mb-2">100%</div>
                <div className="text-sm sm:text-base md:text-lg">Satisfaction client</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-accent mb-1 sm:mb-2">24/7</div>
                <div className="text-sm sm:text-base md:text-lg">Support disponible</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-accent mb-1 sm:mb-2">0</div>
                <div className="text-sm sm:text-base md:text-lg">Compromis sur la qualité</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

