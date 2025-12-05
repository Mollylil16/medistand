# 🚀 PLAN D'ACTION - RENDRE LE SITE PRÊT POUR PRODUCTION

## 📌 RÉSUMÉ EXÉCUTIF

**État actuel :** Frontend 100% prêt ✅ | Backend 0% ❌

**Action requise :** Implémenter le backend complet avant mise en production

**Temps estimé :** 16-24 heures

---

## 🎯 PHASE 1 : ENVOI D'EMAILS (PRIORITÉ ABSOLUE)

### Étape 1.1 : Installer les dépendances

```bash
npm install nodemailer @types/nodemailer
```

### Étape 1.2 : Créer le fichier de configuration email

**Fichier : `src/lib/email.ts`**

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true pour 465, false pour le port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Pour Gmail
  },
});

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"MediStand Africa" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return { success: false, error: String(error) };
  }
}
```

### Étape 1.3 : Créer la route API pour les devis

**Fichier : `src/app/api/send-devis/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation basique
    if (!data.nom || !data.email || !data.telephone) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Email à la gestionnaire
    const emailHtml = `
      <h2>Nouvelle demande de devis</h2>
      <p><strong>Nom :</strong> ${data.nom} ${data.prenom}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.telephone}</p>
      <p><strong>Entreprise :</strong> ${data.entreprise || 'Non renseigné'}</p>
      <p><strong>Type de stand :</strong> ${data.typeStand || 'Non renseigné'}</p>
      <p><strong>Date début :</strong> ${data.dateDebut || 'Non renseigné'}</p>
      <p><strong>Date fin :</strong> ${data.dateFin || 'Non renseigné'}</p>
      <p><strong>Lieu :</strong> ${data.lieu || 'Non renseigné'}</p>
      <p><strong>Options :</strong> ${data.optionsSupplementaires?.join(', ') || 'Aucune'}</p>
      <p><strong>Message :</strong></p>
      <p>${data.message || 'Aucun message'}</p>
    `;

    const result = await sendEmail({
      to: process.env.EMAIL_TO || 'gestionnaire@medistandafrica.com',
      subject: `Nouvelle demande de devis - ${data.nom} ${data.prenom}`,
      html: emailHtml,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API send-devis:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
```

### Étape 1.4 : Créer la route API pour le contact

**Fichier : `src/app/api/send-contact/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.nom || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const emailHtml = `
      <h2>Nouveau message de contact</h2>
      <p><strong>Nom :</strong> ${data.nom} ${data.prenom}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.telephone || 'Non renseigné'}</p>
      <p><strong>Sujet :</strong> ${data.sujet || 'Non renseigné'}</p>
      <p><strong>Message :</strong></p>
      <p>${data.message}</p>
    `;

    const result = await sendEmail({
      to: process.env.EMAIL_TO || 'contact@medistandafrica.com',
      subject: `Contact - ${data.sujet || 'Sans sujet'}`,
      html: emailHtml,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API send-contact:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
```

### Étape 1.5 : Créer la route API pour la newsletter

**Fichier : `src/app/api/newsletter/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Email invalide' },
        { status: 400 }
      );
    }

    // Email de confirmation à l'utilisateur
    await sendEmail({
      to: email,
      subject: 'Bienvenue à la newsletter MediStand Africa',
      html: `
        <h2>Merci pour votre inscription !</h2>
        <p>Vous recevrez désormais nos actualités, offres exclusives et conseils pour vos événements médicaux.</p>
        <p>L'équipe MediStand Africa</p>
      `,
    });

    // Notification à la gestionnaire
    await sendEmail({
      to: process.env.EMAIL_TO || 'gestionnaire@medistandafrica.com',
      subject: 'Nouvelle inscription newsletter',
      html: `<p>Nouvel email inscrit : ${email}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
```

### Étape 1.6 : Créer la route API pour les réservations

**Fichier : `src/app/api/send-reservation/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.nom || !data.email || !data.telephone || !data.selectedStand) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const emailHtml = `
      <h2>Nouvelle réservation de stand</h2>
      <p><strong>Client :</strong> ${data.nom} ${data.prenom}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.telephone}</p>
      <p><strong>Entreprise :</strong> ${data.entreprise || 'Non renseigné'}</p>
      <p><strong>Stand :</strong> ${data.selectedStand.nom}</p>
      <p><strong>Dimensions :</strong> ${data.selectedStand.dimensions.largeur} × ${data.selectedStand.dimensions.profondeur}</p>
      <p><strong>Prix :</strong> ${data.selectedStand.prix.toLocaleString('fr-FR')} FCFA</p>
      <p><strong>Date début :</strong> ${data.dateDebut}</p>
      <p><strong>Date fin :</strong> ${data.dateFin}</p>
      <p><strong>Lieu :</strong> ${data.lieu || 'Non renseigné'}</p>
      <p><strong>Message :</strong> ${data.message || 'Aucun message'}</p>
    `;

    // Email à la gestionnaire
    await sendEmail({
      to: process.env.EMAIL_TO || 'gestionnaire@medistandafrica.com',
      subject: `Nouvelle réservation - ${data.nom} ${data.prenom}`,
      html: emailHtml,
    });

    // Email de confirmation au client
    await sendEmail({
      to: data.email,
      subject: 'Confirmation de votre réservation - MediStand Africa',
      html: `
        <h2>Votre réservation a été reçue !</h2>
        <p>Bonjour ${data.nom},</p>
        <p>Nous avons bien reçu votre demande de réservation pour le stand <strong>${data.selectedStand.nom}</strong>.</p>
        <p>Notre équipe va traiter votre demande et vous contactera dans les plus brefs délais.</p>
        <p>Cordialement,<br>L'équipe MediStand Africa</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API send-reservation:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
```

### Étape 1.7 : Modifier les formulaires pour utiliser les API

**Modifier `src/components/forms/DevisForm.tsx` :**

Remplacer la fonction `handleSubmit` :

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch('/api/send-devis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      setIsSuccess(true);
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          entreprise: '',
          typeStand: '',
          dateDebut: '',
          dateFin: '',
          lieu: '',
          optionsSupplementaires: [],
          message: '',
        });
      }, 5000);
    } else {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    }
  } catch (error) {
    console.error('Erreur:', error);
    alert('Erreur lors de l\'envoi. Veuillez réessayer.');
  }

  setIsSubmitting(false);
};
```

**Faire de même pour :**
- `src/components/forms/ContactForm.tsx` → `/api/send-contact`
- `src/components/NewsletterSection.tsx` → `/api/newsletter`
- `src/app/reservation/page.tsx` → `/api/send-reservation`

### Étape 1.8 : Créer le fichier `.env.local`

**Fichier : `.env.local`** (à créer à la racine)

```env
# Configuration Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application-gmail
EMAIL_TO=gestionnaire@medistandafrica.com

# URL du site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ IMPORTANT :** Ne pas commiter ce fichier ! Il doit être dans `.gitignore`

### Étape 1.9 : Créer `.env.example`

**Fichier : `.env.example`** (sans valeurs sensibles)

```env
# Configuration Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-application-gmail
EMAIL_TO=gestionnaire@medistandafrica.com

# URL du site
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

---

## 🎯 PHASE 2 : SYSTÈME DE RENDEZ-VOUS

### Étape 2.1 : Créer la page rendez-vous

**Fichier : `src/app/rendez-vous/page.tsx`**

(Voir le prompt précédent pour le design complet)

### Étape 2.2 : Créer la route API pour les rendez-vous

**Fichier : `src/app/api/send-rdv/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data.nom || !data.email || !data.telephone || !data.date || !data.heure) {
      return NextResponse.json(
        { success: false, error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const emailHtml = `
      <h2>Nouveau rendez-vous</h2>
      <p><strong>Type :</strong> ${data.typeVisite}</p>
      <p><strong>Nom :</strong> ${data.nom} ${data.prenom}</p>
      <p><strong>Email :</strong> ${data.email}</p>
      <p><strong>Téléphone :</strong> ${data.telephone}</p>
      <p><strong>Entreprise :</strong> ${data.entreprise || 'Non renseigné'}</p>
      <p><strong>Date :</strong> ${data.date}</p>
      <p><strong>Heure :</strong> ${data.heure}</p>
      <p><strong>Motif :</strong> ${data.motif || 'Non renseigné'}</p>
      <p><strong>Message :</strong> ${data.message || 'Aucun message'}</p>
    `;

    // Email à la gestionnaire
    await sendEmail({
      to: process.env.EMAIL_TO || 'gestionnaire@medistandafrica.com',
      subject: `Nouveau rendez-vous - ${data.typeVisite} - ${data.date} ${data.heure}`,
      html: emailHtml,
    });

    // Email de confirmation au client
    await sendEmail({
      to: data.email,
      subject: 'Confirmation de votre rendez-vous - MediStand Africa',
      html: `
        <h2>Votre rendez-vous est confirmé !</h2>
        <p>Bonjour ${data.nom},</p>
        <p>Votre rendez-vous est confirmé pour le <strong>${data.date}</strong> à <strong>${data.heure}</strong>.</p>
        <p>Nous vous attendons à notre bureau.</p>
        <p>Cordialement,<br>L'équipe MediStand Africa</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur API send-rdv:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
```

---

## 🎯 PHASE 3 : SEO & FINALISATION

### Étape 3.1 : Créer `robots.txt`

**Fichier : `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://votre-domaine.com/sitemap.xml
```

### Étape 3.2 : Créer `sitemap.ts`

**Fichier : `src/app/sitemap.ts`**

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://medistandafrica.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/stands`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tarifs`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}
```

### Étape 3.3 : Créer page 404

**Fichier : `src/app/not-found.tsx`**

```typescript
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">Page non trouvée</h2>
        <p className="text-gray-600 mt-4 mb-8">
          La page que vous recherchez n'existe pas.
        </p>
        <Link href="/">
          <Button>
            <Home size={20} className="mr-2" />
            Retour à l'accueil
          </Button>
        </Link>
      </div>
    </div>
  );
}
```

### Étape 3.4 : Créer page erreur globale

**Fichier : `src/app/error.tsx`**

```typescript
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Une erreur est survenue
        </h2>
        <p className="text-gray-600 mb-8">
          Désolé, une erreur inattendue s'est produite.
        </p>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Réessayer</Button>
          <Button variant="secondary" href="/">
            <Home size={20} className="mr-2" />
            Accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## ✅ CHECKLIST FINALE

### Avant déploiement
- [ ] Tous les formulaires connectés aux API
- [ ] `.env.local` configuré avec vraies valeurs
- [ ] Tester l'envoi d'emails en local
- [ ] `robots.txt` créé
- [ ] `sitemap.ts` créé
- [ ] Page 404 créée
- [ ] Page erreur créée
- [ ] Build de production réussi (`npm run build`)
- [ ] Aucune erreur dans la console

### Après déploiement
- [ ] Tester tous les formulaires en production
- [ ] Vérifier la réception des emails
- [ ] Tester sur mobile/tablette/desktop
- [ ] Vérifier le SSL/HTTPS
- [ ] Configurer Google Analytics
- [ ] Soumettre le sitemap à Google Search Console

---

## 🎯 PROCHAINES ÉTAPES

1. **MAINTENANT** : Implémenter la Phase 1 (Envoi d'emails)
2. **Ensuite** : Implémenter la Phase 2 (Rendez-vous)
3. **Enfin** : Finaliser la Phase 3 (SEO)

Une fois ces 3 phases complétées, le site sera **100% prêt pour la production** ! 🚀

