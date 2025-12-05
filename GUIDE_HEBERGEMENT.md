# 🌐 Guide d'Hébergement - MediStand Africa

Ce guide vous aide à déployer le site MediStand Africa sur un hébergement web standard.

## 📋 Prérequis

Avant de commencer, assurez-vous que votre hébergeur supporte :

- ✅ **Node.js** (version 20 ou supérieure)
- ✅ **npm** ou **yarn**
- ✅ **HTTPS/SSL** (obligatoire pour la sécurité)
- ✅ Accès SSH ou FTP
- ✅ Support des applications Node.js

## 🏢 Hébergeurs Recommandés en Côte d'Ivoire et Afrique

### Hébergeurs Locaux (Côte d'Ivoire)
1. **AFNET** - https://afnet.ci
   - Hébergement web professionnel
   - Support local en français
   - Prix compétitifs en FCFA

2. **ALINK Telecom** - https://alink.ci
   - Solutions d'hébergement robustes
   - Data centers en Côte d'Ivoire

3. **Orange Business Services**
   - Solutions cloud pour entreprises
   - Infrastructure locale

### Hébergeurs Internationaux avec Support Africain
1. **Hostinger** - https://hostinger.com
   - Prix abordables (à partir de 5000 FCFA/mois)
   - Support Node.js
   - SSL gratuit inclus

2. **DigitalOcean** - https://digitalocean.com
   - VPS performants
   - Documentation excellente
   - À partir de 6$/mois

3. **Heroku** - https://heroku.com
   - Déploiement simplifié
   - Plan gratuit disponible pour tests

4. **AWS** ou **Azure**
   - Solutions professionnelles
   - Évolutives selon vos besoins

## 🚀 Étapes de Déploiement

### Option 1 : Hébergement avec Support Node.js (Recommandé)

#### 1. Préparer le projet pour la production

```bash
# Installer les dépendances
npm install

# Créer le build de production
npm run build

# Tester localement le build
npm run start
```

#### 2. Fichiers à transférer sur le serveur

Transférez les dossiers/fichiers suivants :
- `.next/` (dossier généré après le build)
- `public/` (images et assets)
- `node_modules/` (ou lancez `npm install` sur le serveur)
- `package.json`
- `package-lock.json`
- `next.config.js`

#### 3. Configuration sur le serveur

```bash
# Connectez-vous en SSH au serveur
ssh votre-utilisateur@votre-serveur.com

# Naviguez vers le dossier du site
cd /chemin/vers/votre/site

# Installez les dépendances (si node_modules non transféré)
npm install --production

# Démarrez l'application
npm run start

# Ou utilisez PM2 pour maintenir l'app en ligne
npm install -g pm2
pm2 start npm --name "medistand" -- start
pm2 save
pm2 startup
```

#### 4. Configuration du domaine

Configurez votre domaine pour pointer vers votre serveur :
- **A Record** : Pointez vers l'IP de votre serveur
- **CNAME Record** : Si vous utilisez un sous-domaine

#### 5. Configuration HTTPS/SSL

**Avec Let's Encrypt (Gratuit) :**

```bash
# Installer Certbot
sudo apt install certbot

# Obtenir un certificat SSL
sudo certbot certonly --standalone -d votre-domaine.com -d www.votre-domaine.com
```

### Option 2 : Hébergement avec Serveur Web (Nginx)

#### 1. Build du projet en mode static (si possible)

```bash
npm run build
```

#### 2. Configuration Nginx

Créez un fichier de configuration nginx :

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name votre-domaine.com www.votre-domaine.com;

    # Redirection HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name votre-domaine.com www.votre-domaine.com;

    # Certificats SSL
    ssl_certificate /chemin/vers/fullchain.pem;
    ssl_certificate_key /chemin/vers/privkey.pem;

    # Configuration SSL moderne
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache des assets statiques
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }

    # Images
    location /images {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 7d;
        add_header Cache-Control "public, max-age=604800";
    }
}
```

Redémarrez Nginx :
```bash
sudo nginx -t
sudo systemctl restart nginx
```

## 🔧 Variables d'Environnement

Créez un fichier `.env.local` sur le serveur :

```env
# Production
NODE_ENV=production

# Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email (si vous configurez l'envoi d'emails)
SMTP_HOST=smtp.votre-hebergeur.com
SMTP_PORT=587
SMTP_USER=contact@medistand-africa.com
SMTP_PASS=votre-mot-de-passe

# URL du site
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
```

## 📊 Monitoring et Maintenance

### Avec PM2

```bash
# Voir les logs
pm2 logs medistand

# Redémarrer l'application
pm2 restart medistand

# Voir les statistiques
pm2 monit

# Sauvegarder la configuration
pm2 save
```

### Mises à jour

```bash
# 1. Arrêter l'application
pm2 stop medistand

# 2. Pull les nouvelles modifications (si Git)
git pull origin main

# 3. Installer les dépendances
npm install

# 4. Rebuild
npm run build

# 5. Redémarrer
pm2 restart medistand
```

## 🔒 Sécurité

### Checklist de sécurité

- ✅ **SSL/HTTPS activé** (obligatoire)
- ✅ **Firewall configuré** (ports 80, 443, 22 uniquement)
- ✅ **Mot de passe SSH fort** ou authentification par clé
- ✅ **Mises à jour système régulières**
- ✅ **Backups automatiques configurés**
- ✅ **Variables d'environnement sécurisées** (pas de commit dans Git)

### Configuration du firewall (UFW)

```bash
# Autoriser SSH
sudo ufw allow 22

# Autoriser HTTP et HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Activer le firewall
sudo ufw enable
```

## 💾 Backups

### Backup automatique avec cron

```bash
# Éditer les tâches cron
crontab -e

# Ajouter un backup quotidien à 2h du matin
0 2 * * * /chemin/vers/backup-script.sh
```

Exemple de script de backup :

```bash
#!/bin/bash
# backup-script.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/medistand"
PROJECT_DIR="/var/www/medistand"

# Créer le dossier de backup
mkdir -p $BACKUP_DIR

# Archiver le projet
tar -czf $BACKUP_DIR/medistand_$DATE.tar.gz $PROJECT_DIR

# Garder seulement les 7 derniers backups
cd $BACKUP_DIR
ls -t | tail -n +8 | xargs rm -f
```

## 📈 Performance

### Optimisations recommandées

1. **CDN** : Utilisez Cloudflare (gratuit) pour :
   - Cache global
   - Protection DDoS
   - SSL automatique
   - Compression automatique

2. **Compression Nginx** :

```nginx
# Ajouter dans nginx.conf
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml application/json application/javascript application/xml+rss text/javascript;
```

3. **Cache** : Les images et assets sont déjà optimisés via Next.js

## 📞 Support

Une fois l'hébergement choisi, mettez à jour :

1. **Mentions légales** (`src/app/mentions-legales/page.tsx`)
   - Nom de l'hébergeur
   - Adresse de l'hébergeur
   - Contact de l'hébergeur

2. **DNS** : Configurez vos enregistrements DNS chez votre registrar de domaine

## 🎯 Checklist de Déploiement Final

Avant la mise en production :

- [ ] Build de production testé localement
- [ ] Variables d'environnement configurées
- [ ] SSL/HTTPS activé et testé
- [ ] Domaine configuré et fonctionnel
- [ ] Emails de formulaires testés
- [ ] Mentions légales complétées avec info hébergeur
- [ ] Google Analytics configuré (optionnel)
- [ ] Backups automatiques configurés
- [ ] Monitoring en place (PM2 ou similaire)
- [ ] Test sur mobile et desktop
- [ ] Test de tous les formulaires
- [ ] Vérification des images

## 💰 Coûts Estimés (Mensuel)

| Service | Coût (FCFA) | Coût ($) |
|---------|-------------|----------|
| Hébergement web basique | 5 000 - 15 000 | 10 - 25 |
| VPS performance | 15 000 - 50 000 | 25 - 85 |
| Nom de domaine (.com) | 6 000/an | 10/an |
| SSL (si non inclus) | Gratuit (Let's Encrypt) | Gratuit |
| **Total mensuel** | **7 000 - 20 000** | **12 - 35** |

## ✨ Recommandation Finale

Pour MediStand Africa, nous recommandons :

**Budget Startup (Test)** :
- Hostinger Business (support Node.js)
- ~8 000 FCFA/mois
- Inclus : SSL, backups, support 24/7

**Budget Professionnel (Production)** :
- DigitalOcean Droplet (VPS)
- ~12 000 FCFA/mois (25$/mois)
- Plus de contrôle et performance garantie

**Budget Entreprise** :
- VPS Premium ou Cloud local (AFNET, ALINK)
- 30 000 - 100 000 FCFA/mois
- Support local, SLA garanti

---

**Besoin d'aide ?** Contactez votre développeur pour l'assistance au déploiement.

✨ **Bon déploiement !**

