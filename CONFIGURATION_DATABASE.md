# 🗄️ CONFIGURATION BASE DE DONNÉES - MediStand Africa

## ✅ CE QUI A ÉTÉ FAIT

### 1. Configuration PostgreSQL
- ✅ Fichier de connexion créé : `src/lib/db.ts`
- ✅ Pool de connexions configuré
- ✅ Gestion d'erreurs implémentée

### 2. Schéma de base de données
- ✅ Script SQL créé : `database/schema.sql`
- ✅ 6 tables créées :
  - `devis` - Demandes de devis
  - `contacts` - Messages de contact
  - `newsletter` - Inscriptions newsletter
  - `reservations` - Réservations de stands
  - `rendez_vous` - Rendez-vous clients/fournisseurs
  - `avis_clients` - Avis et témoignages
  - `configurateur_sessions` - Configurations de stands
- ✅ Index créés pour optimiser les performances
- ✅ Triggers pour `updated_at` automatique
- ✅ Vues pour statistiques

### 3. Routes API modifiées
- ✅ `/api/send-devis` → Sauvegarde en DB
- ✅ `/api/send-contact` → Sauvegarde en DB
- ✅ `/api/newsletter` → Sauvegarde en DB
- ✅ `/api/send-reservation` → Sauvegarde en DB
- ✅ `/api/send-rdv` → Sauvegarde en DB
- ✅ `/api/avis` → GET (récupérer) et POST (créer)

---

## 📋 INSTRUCTIONS D'INSTALLATION

### 1. Installer le package PostgreSQL

```bash
npm install pg @types/pg
```

### 2. Créer la base de données dans pgAdmin

1. Ouvrez pgAdmin
2. Connectez-vous à votre serveur PostgreSQL
3. Créez une nouvelle base de données :
   - Nom : `medistand_site`
   - Propriétaire : `medistand_user`

### 3. Exécuter le script SQL

1. Dans pgAdmin, ouvrez l'éditeur de requêtes SQL
2. Ouvrez le fichier `database/schema.sql`
3. Exécutez le script complet (F5 ou bouton Exécuter)
4. Vérifiez que toutes les tables sont créées

### 4. Configurer les variables d'environnement

Ajoutez dans votre fichier `.env.local` :

```env
# Configuration Base de Données PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=medistand_site
DB_USER=medistand_user
DB_PASSWORD=medistand225
DB_SSL=false
```

**Pour la production** (si votre serveur DB est distant) :
```env
DB_HOST=votre-serveur-db.com
DB_PORT=5432
DB_NAME=medistand_site
DB_USER=medistand_user
DB_PASSWORD=medistand225
DB_SSL=true
```

---

## 🧪 TESTER LA CONNEXION

### 1. Test rapide

Créez un fichier `test-db.js` à la racine :

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'medistand_site',
  user: 'medistand_user',
  password: 'medistand225',
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Erreur:', err);
  } else {
    console.log('✅ Connexion réussie !', res.rows[0]);
  }
  pool.end();
});
```

Exécutez : `node test-db.js`

### 2. Test depuis l'application

1. Démarrez le serveur : `npm run dev`
2. Remplissez un formulaire (devis, contact, etc.)
3. Vérifiez dans pgAdmin que les données sont bien sauvegardées

---

## 📊 STRUCTURE DES TABLES

### Table `devis`
- Stocke toutes les demandes de devis
- Champs : nom, email, téléphone, type_stand, dates, options, etc.
- Statut : en_attente, traite, accepte, refuse

### Table `contacts`
- Stocke tous les messages de contact
- Champs : nom, email, sujet, message
- Flags : lu, repondu

### Table `newsletter`
- Stocke les inscriptions newsletter
- Email unique (pas de doublons)
- Flag : actif, unsubscribed_at

### Table `reservations`
- Stocke toutes les réservations
- Champs : client, stand, dates, prix_total
- Statut : en_attente, confirme, annule, termine

### Table `rendez_vous`
- Stocke tous les rendez-vous
- Champs : type_visite, client, date_rdv, heure_rdv
- Statut : confirme, annule, termine

### Table `avis_clients`
- Stocke les avis clients
- Champs : nom, note (1-5), commentaire
- Flag : approuve (pour modération)

---

## 🔍 REQUÊTES UTILES

### Voir toutes les réservations
```sql
SELECT * FROM reservations ORDER BY created_at DESC;
```

### Voir les devis en attente
```sql
SELECT * FROM devis WHERE statut = 'en_attente' ORDER BY created_at DESC;
```

### Voir les messages non lus
```sql
SELECT * FROM contacts WHERE lu = FALSE ORDER BY created_at DESC;
```

### Voir les avis approuvés
```sql
SELECT * FROM avis_clients WHERE approuve = TRUE ORDER BY created_at DESC;
```

### Statistiques des réservations
```sql
SELECT * FROM v_reservations_stats;
```

---

## ⚠️ NOTES IMPORTANTES

1. **Sauvegarde automatique** : Toutes les données sont sauvegardées en DB même si l'email échoue
2. **Gestion d'erreurs** : Si la DB échoue, l'email est quand même envoyé (pas de perte de données)
3. **Modération des avis** : Les avis sont créés avec `approuve = FALSE` par défaut
4. **Newsletter** : Les emails déjà inscrits sont réactivés si réinscription

---

## 🚀 PROCHAINES ÉTAPES

1. ✅ Installer `pg` et `@types/pg`
2. ✅ Exécuter le script SQL dans pgAdmin
3. ✅ Configurer `.env.local` avec les infos DB
4. ✅ Tester la connexion
5. ✅ Tester un formulaire et vérifier en DB

---

**La base de données est maintenant intégrée ! 🎉**

