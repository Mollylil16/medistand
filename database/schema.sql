-- ============================================
-- SCHÉMA BASE DE DONNÉES - MediStand Africa
-- PostgreSQL
-- ============================================

-- Table: devis
-- Stocke toutes les demandes de devis
CREATE TABLE IF NOT EXISTS devis (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    entreprise VARCHAR(255),
    type_stand VARCHAR(100),
    date_debut DATE,
    date_fin DATE,
    lieu VARCHAR(255),
    options_supplementaires TEXT[], -- Array PostgreSQL
    message TEXT,
    statut VARCHAR(50) DEFAULT 'en_attente', -- en_attente, traite, accepte, refuse
    prix_estime DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: contacts
-- Stocke tous les messages de contact
CREATE TABLE IF NOT EXISTS contacts (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    sujet VARCHAR(255),
    message TEXT NOT NULL,
    lu BOOLEAN DEFAULT FALSE,
    repondu BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: newsletter
-- Stocke les inscriptions à la newsletter
CREATE TABLE IF NOT EXISTS newsletter (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    actif BOOLEAN DEFAULT TRUE,
    source VARCHAR(100), -- page_accueil, popup, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP
);

-- Table: reservations
-- Stocke toutes les réservations de stands
CREATE TABLE IF NOT EXISTS reservations (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    entreprise VARCHAR(255),
    stand_id VARCHAR(50) NOT NULL,
    stand_nom VARCHAR(255) NOT NULL,
    stand_dimensions VARCHAR(100), -- Ex: "3m × 2m"
    stand_prix DECIMAL(10, 2) NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    nombre_jours INTEGER NOT NULL,
    lieu VARCHAR(255),
    message TEXT,
    prix_total DECIMAL(10, 2) NOT NULL,
    statut VARCHAR(50) DEFAULT 'en_attente', -- en_attente, confirme, annule, termine
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: rendez_vous
-- Stocke tous les rendez-vous
CREATE TABLE IF NOT EXISTS rendez_vous (
    id SERIAL PRIMARY KEY,
    type_visite VARCHAR(20) NOT NULL, -- client, fournisseur
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    entreprise VARCHAR(255),
    date_rdv DATE NOT NULL,
    heure_rdv TIME NOT NULL,
    motif VARCHAR(255),
    message TEXT,
    statut VARCHAR(50) DEFAULT 'confirme', -- confirme, annule, termine
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: avis_clients
-- Stocke les avis et témoignages des clients
CREATE TABLE IF NOT EXISTS avis_clients (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100),
    email VARCHAR(255),
    note INTEGER NOT NULL CHECK (note >= 1 AND note <= 5),
    commentaire TEXT NOT NULL,
    approuve BOOLEAN DEFAULT FALSE, -- Pour modération
    stand_id VARCHAR(50), -- ID du stand concerné (optionnel)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: configurateur_sessions
-- Stocke les configurations de stands créées via le configurateur
CREATE TABLE IF NOT EXISTS configurateur_sessions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) UNIQUE, -- ID de session unique
    largeur DECIMAL(5, 2) NOT NULL,
    profondeur DECIMAL(5, 2) NOT NULL,
    comptoir BOOLEAN DEFAULT FALSE,
    ecran VARCHAR(10), -- aucun, 43, 55
    spots INTEGER DEFAULT 0,
    prix_total DECIMAL(10, 2) NOT NULL,
    email VARCHAR(255), -- Si l'utilisateur a laissé son email
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEX pour améliorer les performances
-- ============================================

CREATE INDEX IF NOT EXISTS idx_devis_email ON devis(email);
CREATE INDEX IF NOT EXISTS idx_devis_created_at ON devis(created_at);
CREATE INDEX IF NOT EXISTS idx_devis_statut ON devis(statut);

CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_lu ON contacts(lu);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_actif ON newsletter(actif);

CREATE INDEX IF NOT EXISTS idx_reservations_email ON reservations(email);
CREATE INDEX IF NOT EXISTS idx_reservations_date_debut ON reservations(date_debut);
CREATE INDEX IF NOT EXISTS idx_reservations_statut ON reservations(statut);
CREATE INDEX IF NOT EXISTS idx_reservations_created_at ON reservations(created_at);

CREATE INDEX IF NOT EXISTS idx_rdv_date ON rendez_vous(date_rdv);
CREATE INDEX IF NOT EXISTS idx_rdv_statut ON rendez_vous(statut);
CREATE INDEX IF NOT EXISTS idx_rdv_created_at ON rendez_vous(created_at);

CREATE INDEX IF NOT EXISTS idx_avis_approuve ON avis_clients(approuve);
CREATE INDEX IF NOT EXISTS idx_avis_created_at ON avis_clients(created_at);

-- ============================================
-- TRIGGERS pour mettre à jour updated_at
-- ============================================

-- Fonction pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour les tables avec updated_at
CREATE TRIGGER update_devis_updated_at BEFORE UPDATE ON devis
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at BEFORE UPDATE ON reservations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rendez_vous_updated_at BEFORE UPDATE ON rendez_vous
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_avis_clients_updated_at BEFORE UPDATE ON avis_clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VUES UTILES (optionnel)
-- ============================================

-- Vue pour les statistiques des réservations
CREATE OR REPLACE VIEW v_reservations_stats AS
SELECT 
    COUNT(*) as total_reservations,
    COUNT(CASE WHEN statut = 'confirme' THEN 1 END) as confirmees,
    COUNT(CASE WHEN statut = 'en_attente' THEN 1 END) as en_attente,
    SUM(prix_total) as chiffre_affaires_total
FROM reservations;

-- Vue pour les avis approuvés
CREATE OR REPLACE VIEW v_avis_approuves AS
SELECT 
    id,
    nom,
    prenom,
    note,
    commentaire,
    stand_id,
    created_at
FROM avis_clients
WHERE approuve = TRUE
ORDER BY created_at DESC;

-- ============================================
-- FIN DU SCHÉMA
-- ============================================

