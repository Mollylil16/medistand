import { Stand } from '@/types';

export const stands: Stand[] = [
  {
    id: 'stand-type-18m2',
    nom: 'Stand de Type 18m²',
    description: 'Stand professionnel grand format pour une présence optimale. Configuration 6m x 3m avec cloisons personnalisables et signalétique intégrée.',
    dimensions: {
      largeur: '6m',
      profondeur: '3m',
      hauteur: '2.40m',
    },
    materiaux: [
      'Structure aluminium anodisé',
      'Cloisons modulables (H: 2,40m x L: 1m)',
      'Revêtement sol moquette professionnelle',
      'Panneaux d\'affichage blanc haute qualité',
    ],
    accessoires: [
      'Signalétique "EXPOSANT" (60cm x 20cm) - 1 face',
      'Surface imprimable par cloison (H: 2,301m x L: 0,956m)',
      'Éclairage LED professionnel',
      'Comptoir d\'accueil avec rangement',
      'Mobilier selon configuration',
      'Prises électriques',
    ],
    avantages: [
      'Grande surface d\'exposition (18m²)',
      'Cloisons imprimables pour branding',
      'Configuration flexible et modulaire',
      'Idéal pour laboratoires pharmaceutiques',
      'Installation professionnelle incluse',
      'Transport et démontage inclus',
    ],
    prix: 0, // Prix au m² : 12 105 FCFA/m²/jour - Transport et installation inclus partout à Abidjan
    image: '/stand 1.jpeg',
    caracteristiques: [
      'Surface totale: 18m²',
      'Hauteur aménagement: 2,40m',
      'Capacité: 8-12 personnes',
      'Signalétique: 1 face 60x20cm',
    ],
  },
  {
    id: 'stand-type-6m2',
    nom: 'Stand de Type 6m²',
    description: 'Stand compact et économique parfait pour une présence efficace. Configuration 2m x 3m avec cloisons personnalisables.',
    dimensions: {
      largeur: '2m',
      profondeur: '3m',
      hauteur: '2.40m',
    },
    materiaux: [
      'Structure aluminium léger',
      'Cloisons modulables (H: 2,40m x L: 1m)',
      'Revêtement sol moquette',
      'Panneaux d\'affichage blanc',
    ],
    accessoires: [
      'Signalétique "EXPOSANT" (60cm x 20cm) - 1 face',
      'Surface imprimable par cloison (H: 2,301m x L: 0,956m)',
      'Éclairage LED',
      'Comptoir d\'accueil compact',
      'Mobilier de base',
      'Prises électriques',
    ],
    avantages: [
      'Solution économique',
      'Configuration optimisée 6m²',
      'Cloisons personnalisables',
      'Installation rapide',
      'Parfait pour petits budgets',
      'Transport inclus',
    ],
    prix: 0, // Prix au m² : 12 105 FCFA/m²/jour - Transport et installation inclus partout à Abidjan
    image: '/stand 2 .jpeg',
    caracteristiques: [
      'Surface totale: 6m²',
      'Hauteur aménagement: 2,40m',
      'Capacité: 3-5 personnes',
      'Signalétique: 1 face 60x20cm',
    ],
  },
  {
    id: 'stand-premium-9m2',
    nom: 'Stand Premium 9m²',
    description: 'Stand intermédiaire offrant un excellent compromis entre espace et budget. Configuration 3m x 3m.',
    dimensions: {
      largeur: '3m',
      profondeur: '3m',
      hauteur: '2.40m',
    },
    materiaux: [
      'Structure aluminium renforcé',
      'Cloisons modulables premium',
      'Revêtement sol haute qualité',
      'Finitions soignées',
    ],
    accessoires: [
      'Signalétique personnalisée',
      'Surfaces imprimables multiples',
      'Éclairage LED orientable',
      'Comptoir d\'accueil design',
      'Mobilier confort',
      'Prises électriques multiples',
    ],
    avantages: [
      'Taille intermédiaire idéale',
      'Excellent rapport qualité-prix',
      'Personnalisation complète',
      'Visibilité optimale',
      'Installation professionnelle',
      'Support technique inclus',
    ],
    prix: 0, // Prix au m² : 12 105 FCFA/m²/jour - Transport et installation inclus partout à Abidjan
    image: '/stand 3.jpeg',
    caracteristiques: [
      'Surface totale: 9m²',
      'Hauteur aménagement: 2,40m',
      'Capacité: 5-8 personnes',
      'Configuration: Carrée 3x3m',
    ],
  },
  {
    id: 'stand-modulaire-personnalise',
    nom: 'Stand Modulaire Sur-Mesure',
    description: 'Configuration 100% personnalisée selon vos besoins spécifiques. Combinez plusieurs modules pour créer votre stand idéal.',
    dimensions: {
      largeur: 'Variable',
      profondeur: 'Variable',
      hauteur: 'Jusqu\'à 3m',
    },
    materiaux: [
      'Choix de matériaux selon projet',
      'Cloisons modulables personnalisées',
      'Finitions sur-mesure',
      'Branding complet intégré',
    ],
    accessoires: [
      'Signalétique personnalisée multiple faces',
      'Éclairage sur-mesure',
      'Mobilier sélectionné selon besoins',
      'Options audiovisuelles',
      'Équipements technologiques',
    ],
    avantages: [
      'Flexibilité totale',
      'Design unique et exclusif',
      'Adaptable à tout événement',
      'Conseil personnalisé inclus',
      'Service VIP',
      'Gestion de projet dédiée',
    ],
    prix: 0, // Sur devis
    image: '/stand 4.jpeg',
    caracteristiques: [
      'Surface: Sur demande',
      'Capacité: Variable',
      'Configuration: 100% personnalisée',
      'Délai: À définir selon projet',
    ],
  },
];

