import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation des champs requis
    if (!data.nom || !data.email || !data.telephone) {
      return NextResponse.json(
        { success: false, error: 'Les champs nom, email et téléphone sont requis' },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Construction du contenu HTML de l'email
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #003A5D; color: white; padding: 20px; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #003A5D; }
            .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #F59E0B; }
            .footer { margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📋 Nouvelle demande de devis</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Nom complet :</div>
                <div class="value">${data.nom} ${data.prenom || ''}</div>
              </div>
              <div class="field">
                <div class="label">Email :</div>
                <div class="value">${data.email}</div>
              </div>
              <div class="field">
                <div class="label">Téléphone :</div>
                <div class="value">${data.telephone}</div>
              </div>
              <div class="field">
                <div class="label">Entreprise :</div>
                <div class="value">${data.entreprise || 'Non renseigné'}</div>
              </div>
              <div class="field">
                <div class="label">Type de stand :</div>
                <div class="value">${data.typeStand || 'Non renseigné'}</div>
              </div>
              <div class="field">
                <div class="label">Période :</div>
                <div class="value">
                  ${data.dateDebut ? `Du ${new Date(data.dateDebut).toLocaleDateString('fr-FR')}` : 'Non renseigné'}
                  ${data.dateFin ? ` au ${new Date(data.dateFin).toLocaleDateString('fr-FR')}` : ''}
                </div>
              </div>
              <div class="field">
                <div class="label">Lieu :</div>
                <div class="value">${data.lieu || 'Non renseigné'}</div>
              </div>
              ${data.optionsSupplementaires && data.optionsSupplementaires.length > 0 ? `
              <div class="field">
                <div class="label">Options supplémentaires :</div>
                <div class="value">${data.optionsSupplementaires.join(', ')}</div>
              </div>
              ` : ''}
              ${data.message ? `
              <div class="field">
                <div class="label">Message :</div>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p>Cette demande a été envoyée depuis le site web MediStand Africa</p>
              <p>Date : ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Sauvegarde en base de données
    try {
      await query(
        `INSERT INTO devis (
          nom, prenom, email, telephone, entreprise, type_stand,
          date_debut, date_fin, lieu, options_supplementaires, message
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [
          data.nom,
          data.prenom || null,
          data.email,
          data.telephone,
          data.entreprise || null,
          data.typeStand || null,
          data.dateDebut || null,
          data.dateFin || null,
          data.lieu || null,
          data.optionsSupplementaires && data.optionsSupplementaires.length > 0 
            ? data.optionsSupplementaires 
            : null,
          data.message || null,
        ]
      );
      console.log('✅ Devis sauvegardé en base de données');
    } catch (dbError) {
      console.error('❌ Erreur sauvegarde DB devis:', dbError);
      // On continue quand même l'envoi de l'email même si la DB échoue
    }

    // Envoi de l'email à la gestionnaire
    const result = await sendEmail({
      to: process.env.EMAIL_TO || 'gestionnaire@medistandafrica.com',
      subject: `Nouvelle demande de devis - ${data.nom} ${data.prenom || ''}`,
      html: emailHtml,
    });

    if (!result.success) {
      console.error('Erreur envoi email devis:', result.error);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Votre demande de devis a été envoyée avec succès' 
    });
  } catch (error) {
    console.error('Erreur API send-devis:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors du traitement de la demande' },
      { status: 500 }
    );
  }
}

