# 📧 Guide de Configuration Gmail pour MediStand Africa

## 🎯 Configuration Rapide

### 1. Activer l'authentification à deux facteurs

1. Allez sur https://myaccount.google.com/security
2. Dans la section "Connexion à Google", cliquez sur **"Validation en deux étapes"**
3. Suivez les instructions pour activer la validation en deux étapes
4. ⚠️ **Important** : Vous devez absolument activer cette fonctionnalité pour pouvoir créer un mot de passe d'application

### 2. Créer un mot de passe d'application

1. Allez sur https://myaccount.google.com/apppasswords
   - Si vous ne voyez pas cette page, c'est que la validation en deux étapes n'est pas activée
2. Dans "Sélectionner une application", choisissez **"Courrier"**
3. Dans "Sélectionner un appareil", choisissez **"Autre (nom personnalisé)"**
4. Entrez : **"MediStand"** (ou un nom de votre choix)
5. Cliquez sur **"Générer"**
6. **Copiez le mot de passe à 16 caractères** qui s'affiche
   - Format : `xxxx xxxx xxxx xxxx` (sans les espaces)
   - ⚠️ **Important** : Ce mot de passe ne sera affiché qu'une seule fois, sauvegardez-le !

### 3. Créer le fichier `.env.local`

À la racine du projet, créez un fichier `.env.local` avec ce contenu :

```env
# Configuration Email (Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=votre-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx
EMAIL_TO=gestionnaire@medistandafrica.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Remplacez :**
- `votre-email@gmail.com` → Votre adresse Gmail complète
- `xxxx xxxx xxxx xxxx` → Le mot de passe d'application à 16 caractères (sans espaces)
- `gestionnaire@medistandafrica.com` → L'email où recevoir les notifications

### 4. Exemple complet

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=contact.medistand@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
EMAIL_TO=gestionnaire@medistandafrica.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

⚠️ **Note** : Dans `SMTP_PASS`, vous pouvez mettre le mot de passe avec ou sans espaces, les deux fonctionnent.

---

## ✅ Tester la Configuration

### 1. Démarrer le serveur

```bash
npm run dev
```

### 2. Tester un formulaire

1. Allez sur http://localhost:3000/contact
2. Remplissez le formulaire de contact
3. Soumettez
4. Vérifiez votre boîte email (celle dans `EMAIL_TO`)

### 3. Vérifier les logs

Si ça ne fonctionne pas, regardez la console du serveur pour voir les erreurs.

---

## 🔧 Problèmes Courants

### Erreur : "Invalid login"

**Cause** : Le mot de passe d'application est incorrect ou la validation en deux étapes n'est pas activée.

**Solution** :
1. Vérifiez que la validation en deux étapes est activée
2. Créez un nouveau mot de passe d'application
3. Copiez-le exactement (sans espaces ou avec espaces, les deux fonctionnent)

### Erreur : "Less secure app access"

**Cause** : Cette erreur n'apparaît plus avec les mots de passe d'application. Si vous la voyez, c'est que vous utilisez votre mot de passe Gmail normal au lieu du mot de passe d'application.

**Solution** : Utilisez un mot de passe d'application, pas votre mot de passe Gmail.

### Les emails partent mais arrivent en spam

**Solution** :
1. Vérifiez votre dossier spam
2. Ajoutez l'expéditeur à vos contacts
3. Configurez SPF/DKIM si vous utilisez un domaine personnalisé (avancé)

---

## 📝 Notes Importantes

1. **Ne jamais utiliser votre mot de passe Gmail normal** dans `SMTP_PASS`
   - Utilisez toujours un mot de passe d'application

2. **Le mot de passe d'application est à 16 caractères**
   - Format : `xxxx xxxx xxxx xxxx` ou `xxxxxxxxxxxxxxxx`
   - Les deux formats fonctionnent

3. **Un mot de passe d'application peut être révoqué**
   - Si vous révoquez un mot de passe d'application, créez-en un nouveau
   - Allez sur https://myaccount.google.com/apppasswords

4. **Pour la production**
   - Utilisez les mêmes valeurs mais avec votre URL de production
   - `NEXT_PUBLIC_SITE_URL=https://votre-domaine.com`

---

## 🆘 Besoin d'aide ?

Si vous avez des problèmes :
1. Vérifiez que la validation en deux étapes est activée
2. Vérifiez que vous utilisez un mot de passe d'application (pas votre mot de passe Gmail)
3. Vérifiez les logs du serveur pour voir les erreurs exactes
4. Consultez la documentation Google : https://support.google.com/accounts/answer/185833

---

**Configuration terminée ! 🎉**

Votre site peut maintenant envoyer des emails via Gmail.

