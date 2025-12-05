import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation des champs requis
    if (!data.nom || !data.email || !data.telephone || !data.selectedStand) {
      return NextResponse.json(
        { success: false, error: 'Les champs nom, email, téléphone et stand sont requis' },
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

    // Validation des dates
    if (!data.dateDebut || !data.dateFin) {
      return NextResponse.json(
        { success: false, error: 'Les dates de début et de fin sont requises' },
        { status: 400 }
      );
    }

    const dateDebut = new Date(data.dateDebut);
    const dateFin = new Date(data.dateFin);

    if (dateFin < dateDebut) {
      return NextResponse.json(
        { success: false, error: 'La date de fin doit être après la date de début' },
        { status: 400 }
      );
    }

    // Calcul du nombre de jours
    const jours = Math.ceil((dateFin.getTime() - dateDebut.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const prixTotal = data.selectedStand.prix * jours;

    // Sauvegarde en base de données
    try {
      await query(
        `INSERT INTO reservations (
          nom, prenom, email, telephone, entreprise,
          stand_id, stand_nom, stand_dimensions, stand_prix,
          date_debut, date_fin, nombre_jours, lieu, message, prix_total
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
        [
          data.nom,
          data.prenom || null,
          data.email,
          data.telephone,
          data.entreprise || null,
          data.selectedStand.id,
          data.selectedStand.nom,
          `${data.selectedStand.dimensions.largeur} × ${data.selectedStand.dimensions.profondeur}`,
          data.selectedStand.prix,
          data.dateDebut,
          data.dateFin,
          jours,
          data.lieu || null,
          data.message || null,
          prixTotal,
        ]
      );
      console.log('✅ Réservation sauvegardée en base de données');
    } catch (dbError) {
      console.error('❌ Erreur sauvegarde DB réservation:', dbError);
      // On continue quand même l'envoi de l'email même si la DB échoue
    }

    // Email à la gestionnaire
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
            .stand-info { background: #003A5D; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .price { font-size: 24px; font-weight: bold; color: #F59E0B; text-align: center; padding: 15px; background: white; border-radius: 5px; margin-top: 15px; }
            .footer { margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📅 Nouvelle réservation de stand</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Client :</div>
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
              ${data.entreprise ? `
              <div class="field">
                <div class="label">Entreprise :</div>
                <div class="value">${data.entreprise}</div>
              </div>
              ` : ''}
              <div class="stand-info">
                <h2 style="margin-top: 0;">Stand réservé</h2>
                <p><strong>${data.selectedStand.nom}</strong></p>
                <p>Dimensions : ${data.selectedStand.dimensions.largeur} × ${data.selectedStand.dimensions.profondeur}</p>
                <p>Prix/jour : ${data.selectedStand.prix.toLocaleString('fr-FR')} FCFA</p>
              </div>
              <div class="field">
                <div class="label">Période :</div>
                <div class="value">
                  Du ${dateDebut.toLocaleDateString('fr-FR')} au ${dateFin.toLocaleDateString('fr-FR')}
                  <br><strong>Durée : ${jours} jour${jours > 1 ? 's' : ''}</strong>
                </div>
              </div>
              ${data.lieu ? `
              <div class="field">
                <div class="label">Lieu :</div>
                <div class="value">${data.lieu}</div>
              </div>
              ` : ''}
              ${data.message ? `
              <div class="field">
                <div class="label">Message :</div>
                <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
              ` : ''}
              <div class="price">
                Prix total : ${prixTotal.toLocaleString('fr-FR')} FCFA
              </div>
            </div>
            <div class="footer">
              <p>Cette réservation a été envoyée depuis le site web MediStand Africa</p>
              <p>Date : ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Envoi à la gestionnaire
    const resultGestionnaire = await sendEmail({
      to: process.env.EMAIL_TO || 'gestionnaire@medistandafrica.com',
      subject: `Nouvelle réservation - ${data.nom} ${data.prenom || ''} - ${data.selectedStand.nom}`,
      html: emailHtml,
    });

    if (!resultGestionnaire.success) {
      console.error('Erreur envoi email gestionnaire:', resultGestionnaire.error);
    }

    // Email de confirmation au client
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #003A5D; color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; }
            .success-box { background: #10B981; color: white; padding: 20px; border-radius: 5px; text-align: center; margin-bottom: 20px; }
            .stand-info { background: white; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 3px solid #F59E0B; }
            .price { font-size: 20px; font-weight: bold; color: #F59E0B; text-align: center; padding: 15px; background: white; border-radius: 5px; margin-top: 15px; }
            .footer { margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Votre réservation a été reçue !</h1>
            </div>
            <div class="content">
              <div class="success-box">
                <p style="font-size: 18px; margin: 0;">Merci pour votre confiance !</p>
              </div>
              <p>Bonjour ${data.nom},</p>
              <p>Nous avons bien reçu votre demande de réservation pour le stand <strong>${data.selectedStand.nom}</strong>.</p>
              <div class="stand-info">
                <p><strong>Période :</strong> Du ${dateDebut.toLocaleDateString('fr-FR')} au ${dateFin.toLocaleDateString('fr-FR')}</p>
                <p><strong>Durée :</strong> ${jours} jour${jours > 1 ? 's' : ''}</p>
                ${data.lieu ? `<p><strong>Lieu :</strong> ${data.lieu}</p>` : ''}
              </div>
              <div class="price">
                Montant total : ${prixTotal.toLocaleString('fr-FR')} FCFA
              </div>
              <p style="margin-top: 20px;">Notre équipe va traiter votre demande et vous contactera dans les plus brefs délais pour confirmer votre réservation.</p>
              <p style="margin-top: 20px;">Cordialement,<br><strong>L'équipe MediStand Africa</strong></p>
            </div>
            <div class="footer">
              <p>MediStand Africa - Location de stands pour congrès médicaux</p>
              <p>Pour toute question, contactez-nous : contact@medistandafrica.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail({
      to: data.email,
      subject: 'Confirmation de votre réservation - MediStand Africa',
      html: confirmationHtml,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Votre réservation a été envoyée avec succès. Vous recevrez un email de confirmation.' 
    });
  } catch (error) {
    console.error('Erreur API send-reservation:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors du traitement de la réservation' },
      { status: 500 }
    );
  }
}

