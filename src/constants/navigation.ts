import { NavigationItem, ContactInfo } from '@/types';

export const navigationItems: NavigationItem[] = [
  { nom: 'Accueil', href: '/' },
  { nom: 'À propos', href: '/a-propos' },
  { nom: 'Nos Stands', href: '/stands' },
  { nom: 'Configurateur', href: '/configurateur' },
  { nom: 'Réservation', href: '/reservation' },
  { nom: 'Rendez-vous', href: '/rendez-vous' },
  { nom: 'Galerie 360°', href: '/galerie-360' },
  { nom: 'Avis Clients', href: '/avis' },
  { nom: 'Contact', href: '/contact' },
];

export const contactInfo: ContactInfo = {
  telephone: '+225 0758184732',
  whatsapp: '+2250758184732',
  email: 'info@medistandafrica.com',
  adresse: 'Abidjan, Côte d\'Ivoire',
  horaires: 'Lun - Ven: 8h00 - 18h00 | Sam: 9h00 - 13h00',
  gestionnaire: {
    telephone1: '+225 0758184732',
    telephone2: '+225 0709343667',
  },
};

export const socialLinks = {
  facebook: '#',
  linkedin: '#',
  twitter: '#',
  instagram: '#',
};

