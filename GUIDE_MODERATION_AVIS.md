# 📝 GUIDE : MODÉRER LES AVIS DANS PGADMIN

## 🎯 OBJECTIF

Approuver un avis pour qu'il apparaisse sur le site web.

---

## 📋 ÉTAPES DÉTAILLÉES

### Étape 1 : Ouvrir pgAdmin

1. Lancez **pgAdmin** sur votre ordinateur
2. Connectez-vous à votre serveur PostgreSQL
3. Dans le panneau de gauche, développez :
   - **Servers** → Votre serveur → **Databases** → **medistand_site**

### Étape 2 : Ouvrir l'éditeur de requêtes SQL

1. Cliquez avec le bouton droit sur **medistand_site**
2. Dans le menu, sélectionnez **Query Tool** (ou **Outil de requête**)
   - Ou utilisez le raccourci : `Alt + Shift + Q`
3. Une nouvelle fenêtre s'ouvre avec un éditeur de texte

### Étape 3 : Voir tous les avis

Dans l'éditeur, tapez cette requête :

```sql
SELECT * FROM avis_clients ORDER BY created_at DESC;
```

**Comment exécuter :**
1. Cliquez sur le bouton **▶ Execute** (en haut à gauche)
   - Ou appuyez sur `F5`
   - Ou utilisez le raccourci clavier : `Alt + F5`

**Résultat :**
- Vous verrez un tableau avec tous les avis
- La colonne `approuve` montre `f` (false) pour les avis non approuvés
- La colonne `id` montre le numéro de l'avis

### Étape 4 : Approuver un avis

**Exemple :** Si vous voulez approuver l'avis avec `id = 1`

1. Dans l'éditeur, tapez :

```sql
UPDATE avis_clients 
SET approuve = TRUE 
WHERE id = 1;
```

2. Cliquez sur **▶ Execute** (ou `F5`)

3. Vous verrez un message : `UPDATE 1` (cela signifie qu'1 ligne a été modifiée)

**✅ L'avis est maintenant approuvé !**

### Étape 5 : Vérifier

Pour vérifier que l'avis est bien approuvé :

```sql
SELECT * FROM avis_clients WHERE id = 1;
```

La colonne `approuve` devrait maintenant afficher `t` (true)

---

## 🎨 EXEMPLE VISUEL

### Avant l'approbation :
```
id | nom              | note | approuve | created_at
---|------------------|------|----------|------------
1  | Dr. Kouassi      | 5    | f        | 2024-01-15
2  | Mme Diabaté      | 5    | f        | 2024-01-20
```

### Après `UPDATE avis_clients SET approuve = TRUE WHERE id = 1;` :
```
id | nom              | note | approuve | created_at
---|------------------|------|----------|------------
1  | Dr. Kouassi      | 5    | t        | 2024-01-15
2  | Mme Diabaté      | 5    | f        | 2024-01-20
```

---

## 🔧 AUTRES COMMANDES UTILES

### Approuver plusieurs avis à la fois

```sql
-- Approuver tous les avis avec une note de 5 étoiles
UPDATE avis_clients 
SET approuve = TRUE 
WHERE note = 5;
```

### Approuver tous les avis

```sql
UPDATE avis_clients 
SET approuve = TRUE;
```

### Désapprouver un avis

```sql
UPDATE avis_clients 
SET approuve = FALSE 
WHERE id = 1;
```

### Voir uniquement les avis approuvés

```sql
SELECT * FROM avis_clients 
WHERE approuve = TRUE 
ORDER BY created_at DESC;
```

### Voir uniquement les avis en attente de modération

```sql
SELECT * FROM avis_clients 
WHERE approuve = FALSE 
ORDER BY created_at DESC;
```

### Supprimer un avis

```sql
DELETE FROM avis_clients 
WHERE id = 1;
```

⚠️ **Attention** : Cette action est irréversible !

---

## 📸 CAPTURES D'ÉCRAN (Description)

### 1. Où trouver Query Tool
- Panneau gauche : Cliquez droit sur **medistand_site**
- Menu : **Query Tool** (ou **Outil de requête**)

### 2. L'éditeur SQL
- Zone de texte blanche en haut : pour taper vos requêtes
- Bouton **▶ Execute** : pour exécuter
- Zone de résultats en bas : affiche les résultats

### 3. Résultats d'une requête SELECT
- Tableau avec colonnes : id, nom, prenom, note, commentaire, approuve, etc.
- Lignes : chaque avis

---

## ⚠️ ERREURS COURANTES

### Erreur : "relation 'avis_clients' does not exist"

**Cause** : La table n'existe pas encore

**Solution** : Exécutez d'abord le script `database/schema.sql` dans pgAdmin

### Erreur : "permission denied"

**Cause** : L'utilisateur n'a pas les droits

**Solution** : Vérifiez que vous êtes connecté avec `medistand_user`

### Erreur : "syntax error"

**Cause** : Faute de frappe dans la requête SQL

**Solution** : Vérifiez que vous avez bien copié la requête exactement

---

## 🎯 WORKFLOW RECOMMANDÉ

1. **Voir les nouveaux avis** :
   ```sql
   SELECT * FROM avis_clients 
   WHERE approuve = FALSE 
   ORDER BY created_at DESC;
   ```

2. **Lire le commentaire** dans la colonne `commentaire`

3. **Décider** : Approuver ou non

4. **Approuver** :
   ```sql
   UPDATE avis_clients 
   SET approuve = TRUE 
   WHERE id = X;
   ```
   (Remplacez X par le numéro de l'avis)

5. **Vérifier sur le site** : Rechargez la page `/avis`

---

## 💡 ASTUCE

Vous pouvez créer une **vue** pour voir facilement les avis en attente :

```sql
CREATE OR REPLACE VIEW v_avis_en_attente AS
SELECT 
    id,
    nom,
    prenom,
    note,
    commentaire,
    created_at
FROM avis_clients
WHERE approuve = FALSE
ORDER BY created_at DESC;
```

Ensuite, pour voir les avis en attente, tapez simplement :

```sql
SELECT * FROM v_avis_en_attente;
```

---

## ✅ RÉSUMÉ

1. Ouvrez pgAdmin
2. Cliquez droit sur **medistand_site** → **Query Tool**
3. Tapez la requête SQL
4. Cliquez sur **▶ Execute** (ou `F5`)
5. Vérifiez le résultat

**C'est tout ! 🎉**

---

*Besoin d'aide ? Consultez la documentation PostgreSQL ou pgAdmin.*

