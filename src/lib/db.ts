import { Pool } from 'pg';

// Configuration de la connexion PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'medistand_site',
  user: process.env.DB_USER || 'medistand_user',
  password: process.env.DB_PASSWORD || 'medistand225',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20, // Nombre maximum de connexions dans le pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test de connexion
pool.on('connect', () => {
  console.log('✅ Connexion à PostgreSQL établie');
});

pool.on('error', (err) => {
  console.error('❌ Erreur de connexion PostgreSQL:', err);
});

/**
 * Exécute une requête SQL
 */
export async function query(text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Erreur requête SQL:', error);
    throw error;
  }
}

/**
 * Obtient une connexion du pool
 */
export function getPool() {
  return pool;
}

/**
 * Ferme toutes les connexions du pool
 */
export async function closePool() {
  await pool.end();
}

export default pool;

