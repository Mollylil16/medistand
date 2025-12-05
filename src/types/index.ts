export interface Stand {
  id: string;
  nom: string;
  description: string;
  dimensions: {
    largeur: string;
    profondeur: string;
    hauteur: string;
  };
  materiaux: string[];
  accessoires: string[];
  avantages: string[];
  prix: number;
  image: string;
  caracteristiques: string[];
}

export interface Service {
  id: string;
  nom: string;
  description: string;
  icone: string;
  details: string[];
}

export interface Avantage {
  id: string;
  titre: string;
  description: string;
  icone: string;
}

export interface Realisation {
  id: string;
  titre: string;
  evenement: string;
  date: string;
  lieu: string;
  image: string;
  description: string;
}

export interface Temoignage {
  id: string;
  nom: string;
  poste: string;
  entreprise: string;
  texte: string;
  avatar?: string;
  note: number;
}

export interface ContactInfo {
  telephone: string;
  whatsapp: string;
  email: string;
  adresse: string;
  horaires: string;
}

export interface NavigationItem {
  nom: string;
  href: string;
}

export interface FormDevisData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise: string;
  typeStand: string;
  dateDebut: string;
  dateFin: string;
  lieu: string;
  optionsSupplementaires: string[];
  message: string;
}

export interface FormContactData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  sujet: string;
  message: string;
}

