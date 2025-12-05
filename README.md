# MediStand Africa - Site Web Officiel

Site web professionnel pour **MediStand Africa**, spécialiste de la location de stands pour congrès médicaux et événements scientifiques en Côte d'Ivoire.

## 🎯 À propos du projet

MediStand Africa propose des stands professionnels, modernes et conformes aux standards internationaux pour :
- Laboratoires pharmaceutiques
- Organisateurs de congrès médicaux
- Sociétés savantes
- Entreprises du secteur santé

**Slogan** : *La structure qui valorise votre visibilité*

## 🚀 Technologies utilisées

- **Framework** : [Next.js 15](https://nextjs.org/) (App Router)
- **Language** : TypeScript
- **Styling** : Tailwind CSS v4
- **Animations** : Framer Motion
- **Icons** : Lucide React
- **Déploiement** : Hébergement web standard (voir [Guide d'hébergement](./GUIDE_HEBERGEMENT.md))

## 📁 Structure du projet

```
medistand/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── layout.tsx          # Layout global
│   │   ├── page.tsx            # Page d'accueil
│   │   ├── a-propos/           # Page À propos
│   │   ├── stands/             # Page Nos Stands
│   │   ├── services/           # Page Services
│   │   ├── tarifs/             # Page Tarifs & Devis
│   │   ├── portfolio/          # Page Portfolio
│   │   └── contact/            # Page Contact
│   ├── components/             # Composants réutilisables
│   │   ├── layout/             # Header, Footer, WhatsApp
│   │   ├── home/               # Composants page d'accueil
│   │   ├── forms/              # Formulaires
│   │   └── ui/                 # Composants UI de base
│   ├── constants/              # Données et configuration
│   │   ├── stands.ts           # Liste des stands
│   │   ├── services.ts         # Liste des services
│   │   ├── avantages.ts        # Avantages MediStand
│   │   └── navigation.ts       # Menu & coordonnées
│   ├── types/                  # Types TypeScript
│   │   └── index.ts
│   └── lib/                    # Utilitaires
│       └── utils.ts
└── package.json
```

## 🎨 Charte graphique

### Couleurs principales
- **Bleu profond** : `#003A5D` (couleur primaire - professionnalisme médical)
- **Bleu secondaire** : `#0056A3`
- **Orange** : `#F59E0B` (appels à l'action - innovation)
- **Blanc** : `#FFFFFF` (propreté - secteur médical)
- **Gris clair** : `#F7FAFC` (backgrounds)

### Typographie
- Police principale : Geist Sans
- Police secondaire : Geist Mono

## 🛠️ Installation et développement

### Prérequis
- Node.js 20+ installé
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install
```

### Lancer en mode développement

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Build de production

```bash
npm run build
npm start
```

## 📄 Pages du site

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Hero, avantages, aperçu des stands |
| À propos | `/a-propos` | Histoire, vision, mission, pourquoi nous choisir |
| Nos Stands | `/stands` | Liste détaillée des stands avec fiches techniques |
| Services | `/services` | Description complète des services et processus |
| Tarifs & Devis | `/tarifs` | Grille tarifaire + formulaire de demande de devis |
| Portfolio | `/portfolio` | Réalisations et témoignages clients |
| Contact | `/contact` | Coordonnées + formulaire de contact |

## 📝 Personnalisation

### Modifier les coordonnées de contact

Éditer le fichier `src/constants/navigation.ts` :

```typescript
export const contactInfo = {
  telephone: '+225 0789886013',
  whatsapp: '+2250789886013',
  email: 'contact@medistandafrica.com',
  adresse: 'Abidjan, Côte d\'Ivoire',
};
```

### Ajouter ou modifier les stands

Éditer le fichier `src/constants/stands.ts`

### Configurer l'envoi des formulaires

Les formulaires utilisent actuellement une simulation. Pour les connecter à un service d'email :

**Option 1 : Service tiers (recommandé)**
- [Formspree](https://formspree.io/)
- [Resend](https://resend.com/)
- [EmailJS](https://www.emailjs.com/)

**Option 2 : API Route Next.js**
Créer des routes API dans `src/app/api/`

## 🔍 SEO

Chaque page dispose de métadonnées optimisées. Pour améliorer le SEO :
1. Configurer un `sitemap.xml`
2. Ajouter un `robots.txt`
3. Intégrer Google Analytics
4. Configurer Google Search Console

## 📱 Responsive

Le site est entièrement responsive et testé sur :
- Mobile (320px+)
- Tablette (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🚀 Déploiement

Le site sera hébergé sur un hébergement web professionnel.

📘 **Consultez le [Guide d'Hébergement complet](./GUIDE_HEBERGEMENT.md)** pour :
- Choix d'hébergeurs (locaux et internationaux)
- Instructions de déploiement détaillées
- Configuration serveur (Node.js, Nginx)
- Sécurité et SSL
- Backups automatiques
- Estimations de coûts

### Hébergeurs recommandés
- **Locaux (CI)** : AFNET, ALINK, Orange Business
- **Internationaux** : Hostinger, DigitalOcean, Heroku
- **Budget estimé** : 7 000 - 20 000 FCFA/mois

## 📞 Support & Contact

Pour toute question technique sur ce projet :
- Développeur : Brunell Omepieu
- Email technique : brunellomepieu01@gmail.com

Pour les questions commerciales MediStand Africa :
- Email : contact@medistandafrica.com
- Téléphone : +225 0789886013

## 📋 Checklist avant mise en ligne

- [ ] Remplacer les numéros de téléphone et emails de démonstration
- [ ] Ajouter le vrai numéro WhatsApp
- [ ] Vérifier et ajuster les prix des stands
- [ ] Ajouter des photos réelles de stands
- [ ] Configurer l'envoi des formulaires (emails)
- [ ] Tester tous les liens de navigation
- [ ] Vérifier l'affichage sur mobile
- [ ] Configurer Google Analytics (optionnel)
- [ ] Ajouter le domaine personnalisé
- [ ] Tester les formulaires de contact et devis

## ✨ Fonctionnalités

- ✅ Design moderne et professionnel
- ✅ Animations fluides
- ✅ Responsive sur tous appareils
- ✅ Formulaires de contact et devis
- ✅ Bouton WhatsApp flottant
- ✅ Navigation sticky
- ✅ SEO optimisé
- ✅ Performance optimisée
- ✅ Accessibilité
- ✅ TypeScript pour la sécurité du code

## 📄 Licence

© 2024 MediStand Africa. Tous droits réservés.

---

**Version** : 1.0.0  
**Dernière mise à jour** : Novembre 2024

