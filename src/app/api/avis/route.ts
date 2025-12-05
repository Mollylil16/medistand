import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET : Récupérer tous les avis approuvés
export async function GET() {
  try {
    const result = await query(
      `SELECT id, nom, prenom, email, note, commentaire, stand_id, created_at
       FROM avis_clients
       WHERE approuve = TRUE
       ORDER BY created_at DESC`
    );

    return NextResponse.json({
      success: true,
      avis: result.rows,
    });
  } catch (error) {
    console.error('Erreur API GET avis:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST : Créer un nouvel avis
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation
    if (!data.nom || !data.note || !data.commentaire) {
      return NextResponse.json(
        { success: false, error: 'Les champs nom, note et commentaire sont requis' },
        { status: 400 }
      );
    }

    if (data.note < 1 || data.note > 5) {
      return NextResponse.json(
        { success: false, error: 'La note doit être entre 1 et 5' },
        { status: 400 }
      );
    }

    // Sauvegarde en base de données
    const result = await query(
      `INSERT INTO avis_clients (nom, prenom, email, note, commentaire, stand_id, approuve)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, nom, prenom, note, commentaire, stand_id, created_at`,
      [
        data.nom,
        data.prenom || null,
        data.email || null,
        data.note,
        data.commentaire,
        data.standId || null,
        false, // Par défaut, l'avis n'est pas approuvé (modération)
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Votre avis a été soumis avec succès. Il sera publié après modération.',
      avis: result.rows[0],
    });
  } catch (error) {
    console.error('Erreur API POST avis:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors de la sauvegarde de l\'avis' },
      { status: 500 }
    );
  }
}

