# 🚀 Démarrage Rapide - MediStand Africa

## Installation

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur de développement

```bash
npm run dev
```

Le site sera accessible sur **http://localhost:3000**

## 📋 Première configuration

### 1. Mettre à jour les coordonnées

Ouvrir `src/constants/navigation.ts` et modifier :

```typescript
export const contactInfo: ContactInfo = {
  telephone: '+225 0789886013',     // ⬅️ VOTRE NUMÉRO
  whatsapp: '+2250789886013',        // ⬅️ VOTRE WHATSAPP
  email: 'contact@medistandafrica.com',
  adresse: 'Abidjan, Côte d\'Ivoire',
  horaires: 'Lun - Ven: 8h00 - 18h00 | Sam: 9h00 - 13h00',
};
```

### 2. Ajuster les prix des stands (optionnel)

Ouvrir `src/constants/stands.ts` et modifier les prix :

```typescript
prix: 850000,  // ⬅️ Prix en FCFA
```

### 3. Configurer l'envoi des formulaires

Les formulaires affichent actuellement les données dans la console.

**Pour envoyer de vrais emails :**

#### Option A : Utiliser Formspree (Recommandé - Gratuit)

1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un nouveau formulaire
3. Copier l'endpoint URL
4. Modifier `src/components/forms/ContactForm.tsx` et `DevisForm.tsx` :

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('VOTRE_FORMSPREE_ENDPOINT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsSuccess(true);
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
  
  setIsSubmitting(false);
};
```

#### Option B : Utiliser EmailJS

1. Créer un compte sur [emailjs.com](https://www.emailjs.com/)
2. Suivre leur documentation
3. Installer : `npm install @emailjs/browser`
4. Intégrer dans les formulaires

## 🎨 Personnalisation

### Changer les couleurs

Éditer `tailwind.config.ts` :

```typescript
colors: {
  primary: {
    DEFAULT: '#003A5D',  // ⬅️ Votre couleur primaire
  },
  accent: {
    DEFAULT: '#F59E0B',  // ⬅️ Votre couleur d'accent
  },
}
```

### Ajouter des photos de stands

1. Placer vos photos dans `public/stands/`
2. Nommer : `premium-3x3.jpg`, `executive-3x4.jpg`, etc.
3. Les images seront automatiquement affichées

### Modifier le logo

Remplacer `public/logo.svg` par votre propre logo

## 📱 Pages disponibles

| URL | Description |
|-----|-------------|
| `/` | Page d'accueil |
| `/a-propos` | Histoire et mission |
| `/stands` | Catalogue des stands |
| `/services` | Nos services |
| `/tarifs` | Grille tarifaire + formulaire devis |
| `/portfolio` | Réalisations |
| `/contact` | Formulaire de contact |

## 🧪 Tester le site

1. Naviguer sur toutes les pages
2. Tester les formulaires
3. Cliquer sur le bouton WhatsApp
4. Vérifier sur mobile (mode responsive du navigateur)
5. Tester tous les liens

## 🚀 Déploiement sur Vercel

### Méthode 1 : Via GitHub (Recommandé)

1. Créer un repository GitHub
2. Pousser le code :
   ```bash
   git init
   git add .
   git commit -m "Premier commit MediStand Africa"
   git remote add origin VOTRE_REPO_URL
   git push -u origin main
   ```
3. Aller sur [vercel.com](https://vercel.com)
4. Cliquer sur "Import Project"
5. Sélectionner votre repository
6. Cliquer sur "Deploy"
7. ✅ Votre site est en ligne !

### Méthode 2 : Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

## 🔧 Commandes utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Démarrer en production
npm start

# Vérifier le code
npm run lint
```

## 📞 Support

Besoin d'aide ?
- **Email technique** : brunellomepieu01@gmail.com
- **Documentation Next.js** : https://nextjs.org/docs
- **Documentation Tailwind** : https://tailwindcss.com/docs

## ✅ Checklist avant mise en ligne

- [ ] Coordonnées mises à jour
- [ ] Prix des stands vérifiés
- [ ] Formulaires testés
- [ ] Photos ajoutées
- [ ] Logo personnalisé
- [ ] Site testé sur mobile
- [ ] Tous les liens fonctionnent
- [ ] Déployé sur Vercel
- [ ] Nom de domaine configuré (optionnel)

---

**Félicitations ! Votre site MediStand Africa est prêt ! 🎉**

