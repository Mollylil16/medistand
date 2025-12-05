import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validation de l'email
    if (!email) {
      return NextResponse.json(
        { success: false, error: 'L\'adresse email est requise' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    // Sauvegarde en base de données (ou mise à jour si existe déjà)
    try {
      await query(
        `INSERT INTO newsletter (email, source, actif)
         VALUES ($1, $2, $3)
         ON CONFLICT (email) 
         DO UPDATE SET actif = TRUE, unsubscribed_at = NULL`,
        [email, 'page_accueil', true]
      );
      console.log('✅ Newsletter sauvegardée en base de données');
    } catch (dbError) {
      console.error('❌ Erreur sauvegarde DB newsletter:', dbError);
      // On continue quand même l'envoi de l'email même si la DB échoue
    }

    // Email de confirmation à l'utilisateur
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #003A5D; color: white; padding: 30px; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 5px; margin-top: 20px; text-align: center; }
            .button { display: inline-block; padding: 12px 30px; background: #F59E0B; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { margin-top: 20px; padding: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Bienvenue à la newsletter MediStand Africa !</h1>
            </div>
            <div class="content">
              <p style="font-size: 18px; margin-bottom: 20px;">
                Merci pour votre inscription !
              </p>
              <p>
                Vous recevrez désormais nos actualités, offres exclusives et conseils pour vos événements médicaux.
              </p>
              <p style="margin-top: 30px;">
                L'équipe MediStand Africa
              </p>
            </div>
            <div class="footer">
              <p>MediStand Africa - Location de stands pour congrès médicaux</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail({
      to: email,
      subject: 'Bienvenue à la newsletter MediStand Africa',
      html: confirmationHtml,
    });

    // Notification à la gestionnaire
    const notificationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 5px; }
            .email { font-size: 18px; font-weight: bold; color: #003A5D; padding: 10px; background: white; border-left: 3px solid #F59E0B; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="content">
              <h2>Nouvelle inscription à la newsletter</h2>
              <p>Un nouvel email s'est inscrit à la newsletter :</p>
              <div class="email">${email}</div>
              <p style="margin-top: 20px; color: #666; font-size: 12px;">
                Date : ${new Date().toLocaleString('fr-FR')}
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    await sendEmail({
      to: process.env.EMAIL_TO || 'gestionnaire@medistandafrica.com',
      subject: 'Nouvelle inscription newsletter',
      html: notificationHtml,
    });

    return NextResponse.json({ 
      success: true,
      message: 'Vous êtes maintenant inscrit à notre newsletter' 
    });
  } catch (error) {
    console.error('Erreur API newsletter:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur lors de l\'inscription' },
      { status: 500 }
    );
  }
}

