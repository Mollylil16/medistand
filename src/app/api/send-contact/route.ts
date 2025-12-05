import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation des champs requis
    if (!data.nom || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, error: 'Les champs nom, email et message sont requis' },
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
            .message-box { margin-top: 15px; padding: 15px; background: white; border-left: 3px solid #F59E0B; white-space: pre-wrap; }
            .footer { margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✉️ Nouveau message de contact</h1>
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
              ${data.telephone ? `
              <div class="field">
                <div class="label">Téléphone :</div>
                <div class="value">${data.telephone}</div>
              </div>
              ` : ''}
              ${data.sujet ? `
              <div class="field">
                <div class="label">Sujet :</div>
                <div class="value">${data.sujet}</div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Message :</div>
                <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              <p>Ce message a été envoyé depuis le site web MediStand Africa</p>
              <p>Date : ${new Date().toLocaleString('fr-FR')}</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Sauvegarde en base de données
    try {
      await query(
        `INSERT INTO contacts (nom, prenom, email, telephone, sujet, message)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          data.nom,
          data.prenom || null,
          data.email,
          data.telephone || null,
          data.sujet || null,
          data.message,
        ]
      );
      console.log('✅ Contact sauvegardé en base de données');
    } catch (dbError) {
      console.error('❌ Erreur sauvegarde DB contact:', dbError);
      // On continue quand même l'envoi de l'email même si la DB échoue
    }

    // Envoi de l'email à la gestionnaire
    const result = await sendEmail({
      to: process.env.EMAIL_TO || 'contact@medistandafrica.com',
      subject: `Contact - ${data.sujet || 'Sans sujet'} - ${data.nom}`,
      html: emailHtml,
    });

    if (!result.success) {
      console.error('Erreur envoi email contact:', result.error);
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi de l\'email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: 'Votre message a été envoyé avec succès' 
    });
  } catch (error) {
    console.error('Erreur API send-contact:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors du traitement du message' },
      { status: 500 }
    );
  }
}

