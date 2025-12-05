import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation des champs requis
    if (!data.nom || !data.email || !data.telephone || !data.date || !data.heure) {
      return NextResponse.json(
        { success: false, error: 'Les champs nom, email, téléphone, date et heure sont requis' },
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

    // Validation de la date (ne doit pas être dans le passé)
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return NextResponse.json(
        { success: false, error: 'La date ne peut pas être dans le passé' },
        { status: 400 }
      );
    }

    const typeVisiteLabel = data.typeVisite === 'client' ? 'Client' : 'Fournisseur';
    const dateFormatted = new Date(data.date).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

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
            .rdv-box { background: #F59E0B; color: white; padding: 20px; border-radius: 5px; text-align: center; margin: 20px 0; }
            .footer { margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📅 Nouveau rendez-vous</h1>
            </div>
            <div class="content">
              <div class="rdv-box">
                <h2 style="margin: 0; font-size: 24px;">${dateFormatted}</h2>
                <p style="margin: 10px 0 0 0; font-size: 18px;">${data.heure}</p>
              </div>
              <div class="field">
                <div class="label">Type de visite :</div>
                <div class="value">${typeVisiteLabel}</div>
              </div>
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
              ${data.entreprise ? `
              <div class="field">
                <div class="label">Entreprise :</div>
                <div class="value">${data.entreprise}</div>
              </div>
              ` : ''}
              ${data.motif ? `
              <div class="field">
                <div class="label">Motif :</div>
                <div class="value">${data.motif}</div>
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
              <p>Ce rendez-vous a été réservé depuis le site web MediStand Africa</p>
              <p>Date de réservation : ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Sauvegarde en base de données
    try {
      await query(
        `INSERT INTO rendez_vous (
          type_visite, nom, prenom, email, telephone, entreprise,
          date_rdv, heure_rdv, motif, message
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          data.typeVisite,
          data.nom,
          data.prenom || null,
          data.email,
          data.telephone,
          data.entreprise || null,
          data.date,
          data.heure,
          data.motif || null,
          data.message || null,
        ]
      );
      console.log('✅ Rendez-vous sauvegardé en base de données');
    } catch (dbError) {
      console.error('❌ Erreur sauvegarde DB rendez-vous:', dbError);
      // On continue quand même l'envoi de l'email même si la DB échoue
    }

    // Envoi à la gestionnaire
    const resultGestionnaire = await sendEmail({
      to: process.env.EMAIL_TO || 'gestionnaire@medistandafrica.com',
      subject: `Nouveau rendez-vous - ${typeVisiteLabel} - ${dateFormatted} ${data.heure}`,
      html: emailHtml,
    });

    if (!resultGestionnaire.success) {
      console.error('Erreur envoi email gestionnaire:', resultGestionnaire.error);
    }

    // Email de confirmation au client/fournisseur
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
            .rdv-box { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #F59E0B; }
            .info-box { background: #E6F0F5; padding: 15px; border-radius: 5px; margin-top: 20px; }
            .footer { margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Votre rendez-vous est confirmé !</h1>
            </div>
            <div class="content">
              <div class="success-box">
                <p style="font-size: 18px; margin: 0;">Merci pour votre confiance !</p>
              </div>
              <p>Bonjour ${data.nom},</p>
              <p>Votre rendez-vous est confirmé :</p>
              <div class="rdv-box">
                <p style="margin: 0; font-size: 20px; font-weight: bold; color: #003A5D;">
                  ${dateFormatted}
                </p>
                <p style="margin: 10px 0 0 0; font-size: 18px; color: #F59E0B;">
                  ${data.heure}
                </p>
              </div>
              <div class="info-box">
                <p style="margin: 0; font-weight: bold; color: #003A5D;">Notre adresse :</p>
                <p style="margin: 5px 0 0 0;">Abidjan, Côte d'Ivoire</p>
                <p style="margin: 10px 0 0 0; font-weight: bold; color: #003A5D;">Horaires :</p>
                <p style="margin: 5px 0 0 0;">Lun - Ven: 8h00 - 18h00 | Sam: 9h00 - 13h00</p>
              </div>
              <p style="margin-top: 20px;">Nous vous attendons à notre bureau.</p>
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
      subject: 'Confirmation de votre rendez-vous - MediStand Africa',
      html: confirmationHtml,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Votre rendez-vous a été confirmé. Vous recevrez un email de confirmation.' 
    });
  } catch (error) {
    console.error('Erreur API send-rdv:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors du traitement du rendez-vous' },
      { status: 500 }
    );
  }
}

