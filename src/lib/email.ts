import nodemailer from 'nodemailer';

// Configuration du transporteur email (Gmail)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true pour le port 465, false pour le port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Pour Gmail
  },
});

/**
 * Envoie un email via le transporteur configuré
 * @param to - Adresse email du destinataire
 * @param subject - Sujet de l'email
 * @param html - Contenu HTML de l'email
 * @param text - Contenu texte alternatif (optionnel)
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}) {
  try {
    // Vérifier que les variables d'environnement sont configurées
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Configuration SMTP manquante. Vérifiez vos variables d\'environnement.');
      return { success: false, error: 'Configuration email manquante' };
    }

    const info = await transporter.sendMail({
      from: `"MediStand Africa" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text: text || html.replace(/<[^>]*>/g, ''), // Extraire le texte si pas fourni
      html,
    });

    console.log('Email envoyé avec succès:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}

/**
 * Vérifie la configuration du transporteur email
 */
export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('Configuration email valide');
    return { success: true };
  } catch (error) {
    console.error('Erreur de configuration email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : String(error) 
    };
  }
}

