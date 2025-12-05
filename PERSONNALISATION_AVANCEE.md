# 🎨 Personnalisation Avancée - MediStand Africa

## Ajouter de nouveaux stands

### 1. Éditer `src/constants/stands.ts`

```typescript
{
  id: 'stand-nouveau-id',
  nom: 'Nom du Stand',
  description: 'Description complète du stand',
  dimensions: {
    largeur: '3m',
    profondeur: '3m',
    hauteur: '2.5m',
  },
  materiaux: [
    'Matériau 1',
    'Matériau 2',
  ],
  accessoires: [
    'Accessoire 1',
    'Accessoire 2',
  ],
  avantages: [
    'Avantage 1',
    'Avantage 2',
  ],
  prix: 950000, // En FCFA
  image: '/stands/nouveau-stand.jpg',
  caracteristiques: [
    'Surface: 9m²',
    'Capacité: 4-6 personnes',
  ],
}
```

### 2. Ajouter la photo

Placer l'image dans `public/stands/nouveau-stand.jpg`

## Ajouter de nouveaux services

### Éditer `src/constants/services.ts`

```typescript
{
  id: 'nouveau-service',
  nom: 'Nom du Service',
  description: 'Description courte',
  icone: 'NomIcone', // Nom d'une icone Lucide React
  details: [
    'Détail 1',
    'Détail 2',
    'Détail 3',
  ],
}
```

## Personnaliser les animations

### Modifier les animations dans `tailwind.config.ts`

```typescript
animation: {
  'mon-animation': 'maKeyframe 1s ease-in-out',
},
keyframes: {
  maKeyframe: {
    '0%': { opacity: '0', transform: 'scale(0.95)' },
    '100%': { opacity: '1', transform: 'scale(1)' },
  },
}
```

### Utiliser dans un composant

```typescript
<div className="animate-mon-animation">
  Contenu animé
</div>
```

## Ajouter Google Analytics

### 1. Créer un compte Google Analytics

Obtenir votre ID de mesure (format: G-XXXXXXXXXX)

### 2. Créer `src/app/analytics.tsx`

```typescript
'use client';

import Script from 'next/script';

export const Analytics = () => {
  const GA_ID = 'G-XXXXXXXXXX'; // ⬅️ Votre ID

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
};
```

### 3. Ajouter dans `src/app/layout.tsx`

```typescript
import { Analytics } from './analytics';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## Créer une API Route pour les formulaires

### 1. Créer `src/app/api/contact/route.ts`

```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Ici : Logique d'envoi d'email
    // Exemple avec Nodemailer, Resend, etc.
    
    console.log('Données reçues:', data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message reçu' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Erreur serveur' 
    }, { status: 500 });
  }
}
```

### 2. Modifier le formulaire pour utiliser l'API

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    
    if (result.success) {
      setIsSuccess(true);
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
  
  setIsSubmitting(false);
};
```

## Ajouter un Blog

### 1. Créer `src/app/blog/page.tsx`

```typescript
export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-primary mb-8">
        Blog MediStand Africa
      </h1>
      {/* Liste des articles */}
    </div>
  );
}
```

### 2. Ajouter dans la navigation

Éditer `src/constants/navigation.ts` :

```typescript
export const navigationItems: NavigationItem[] = [
  // ... autres items
  { nom: 'Blog', href: '/blog' },
];
```

## Optimiser les images

### 1. Utiliser le composant Image de Next.js

```typescript
import Image from 'next/image';

<Image
  src="/stands/premium-3x3.jpg"
  alt="Stand Premium 3x3"
  width={600}
  height={400}
  className="rounded-lg"
  priority
/>
```

### 2. Configurer `next.config.js` pour images externes

```javascript
module.exports = {
  images: {
    domains: ['votre-cdn.com'],
    formats: ['image/avif', 'image/webp'],
  },
}
```

## Ajouter un chatbot

### Utiliser Tawk.to (Gratuit)

1. Créer un compte sur [tawk.to](https://www.tawk.to/)
2. Obtenir le code d'intégration
3. Créer `src/components/TawkChat.tsx`

```typescript
'use client';

import { useEffect } from 'react';

export const TawkChat = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/VOTRE_ID/default';
    document.body.appendChild(script);
  }, []);

  return null;
};
```

4. Ajouter dans le layout

## Multilingue (Français/Anglais)

### 1. Installer next-intl

```bash
npm install next-intl
```

### 2. Configurer selon la documentation

[Guide next-intl](https://next-intl-docs.vercel.app/)

## SEO Avancé

### 1. Créer `public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://votre-site.com/sitemap.xml
```

### 2. Créer `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://votre-site.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://votre-site.com/stands',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // ... autres pages
  ];
}
```

### 3. Ajouter Schema.org JSON-LD

Dans `src/app/layout.tsx` :

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'MediStand Africa',
      description: 'Location de stands pour congrès médicaux',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CI',
        addressLocality: 'Abidjan',
      },
      telephone: '+225 0789886013',
    }),
  }}
/>
```

## Performance

### Lazy Loading des composants

```typescript
import dynamic from 'next/dynamic';

const ComponentLourd = dynamic(() => import('./ComponentLourd'), {
  loading: () => <p>Chargement...</p>,
});
```

### Optimiser les fonts

Dans `src/app/layout.tsx`, les fonts Geist sont déjà optimisées avec Next.js

## Variables d'environnement

Créer `.env.local` :

```env
NEXT_PUBLIC_API_URL=https://api.example.com
EMAIL_API_KEY=votre_cle_secrete
```

Utiliser dans le code :

```typescript
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

⚠️ **Important** : Préfixer par `NEXT_PUBLIC_` pour les variables accessibles côté client.

## Monitoring et Analytics

### Ajouter Vercel Analytics

```bash
npm install @vercel/analytics
```

Dans `src/app/layout.tsx` :

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

**Pour toute question, consultez la documentation officielle ou contactez le support technique.**

