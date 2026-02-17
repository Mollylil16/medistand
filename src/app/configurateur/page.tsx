'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Ruler, Plus, Minus, Download, Share2, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { formatPrice } from '@/lib/utils';

interface Configuration {
  largeur: number;
  profondeur: number;
  hauteur: number;
  comptoir: boolean;
  ecran: '43' | '55' | 'aucun';
  spots: number;
  mobilier: 'standard' | 'premium' | 'vip';
  moquette: boolean;
  stockage: boolean;
  branding: boolean;
}

export default function ConfigurateurPage() {
  // Restaurer la configuration depuis l'URL si elle existe (partage)
  const getConfigFromURL = (): Configuration | null => {
    if (typeof window === 'undefined') return null;
    const params = new URLSearchParams(window.location.search);
    if (params.size === 0) return null;

    try {
      return {
        largeur: parseInt(params.get('l') || '3'),
        profondeur: parseInt(params.get('p') || '3'),
        hauteur: parseFloat(params.get('h') || '2.4'),
        comptoir: params.get('c') === '1',
        ecran: (params.get('e') || 'aucun') as '43' | '55' | 'aucun',
        spots: parseInt(params.get('s') || '2'),
        mobilier: (params.get('m') || 'standard') as 'standard' | 'premium' | 'vip',
        moquette: params.get('moq') === '1',
        stockage: params.get('st') === '1',
        branding: params.get('b') === '1',
      };
    } catch {
      return null;
    }
  };

  const urlConfig = getConfigFromURL();
  const [config, setConfig] = useState<Configuration>(
    urlConfig || {
      largeur: 3,
      profondeur: 3,
      hauteur: 2.4,
      comptoir: true,
      ecran: 'aucun',
      spots: 2,
      mobilier: 'standard',
      moquette: true,
      stockage: false,
      branding: false,
    }
  );

  // Afficher un message si la configuration vient d'un partage
  React.useEffect(() => {
    if (urlConfig) {
      setTimeout(() => {
        alert('✅ Configuration partagée chargée !\n\nVous pouvez modifier les paramètres et voir le prix mis à jour.');
      }, 500);
    }
  }, []);

  // Calcul du prix dynamique
  const prixCalcule = useMemo(() => {
    let prix = 0;

    // Base : surface à 12005 FCFA/m²/jour
    const surface = config.largeur * config.profondeur;
    prix += surface * 12005; // 12005 FCFA par m²/jour

    // Hauteur supplémentaire (si > 2.4m)
    if (config.hauteur > 2.4) prix += 100000;

    // Options supplémentaires
    if (config.comptoir) prix += 75000;
    // TV 43 pouces : ~300 000 FCFA
    if (config.ecran === '43') prix += 300000;
    // TV 55 pouces : ~500 000 FCFA
    if (config.ecran === '55') prix += 500000;
    // Spots LED : ~20 000 FCFA par spot
    prix += config.spots * 20000;
    if (config.mobilier === 'premium') prix += 150000;
    if (config.mobilier === 'vip') prix += 300000;
    if (config.moquette) prix += 50000;
    if (config.stockage) prix += 100000;
    if (config.branding) prix += 200000;

    return prix;
  }, [config]);

  const handleDownloadPDF = () => {
    // Générer un PDF avec les détails de la configuration
    const surface = config.largeur * config.profondeur;
    const prixBase = surface * 12005;

    // Créer le contenu du PDF en HTML avec un design professionnel
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Configuration Stand - MediStand Africa</title>
          <style>
            @media print {
              body { margin: 0; padding: 0; }
              .no-print { display: none; }
            }
            * { box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              padding: 30px; 
              margin: 0;
              background: #ffffff;
              color: #1f2937;
              line-height: 1.6;
            }
            .header { 
              background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
              color: white;
              padding: 30px;
              border-radius: 12px;
              margin-bottom: 30px;
              text-align: center;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .logo { 
              font-size: 32px; 
              font-weight: bold; 
              margin-bottom: 8px;
              letter-spacing: 1px;
            }
            .tagline {
              font-size: 14px;
              opacity: 0.9;
              font-style: italic;
            }
            .title { 
              font-size: 24px; 
              font-weight: bold;
              margin: 30px 0 20px 0;
              color: #1e40af;
              border-bottom: 3px solid #f59e0b;
              padding-bottom: 10px;
            }
            .section { 
              background: #f9fafb;
              margin: 20px 0; 
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #1e40af;
              box-shadow: 0 2px 4px rgba(0,0,0,0.05);
            }
            .section-title { 
              font-weight: bold; 
              font-size: 18px; 
              margin-bottom: 15px; 
              color: #1e40af;
              display: flex;
              align-items: center;
            }
            .section-title::before {
              content: "▸";
              margin-right: 8px;
              color: #f59e0b;
              font-size: 20px;
            }
            .detail { 
              margin: 8px 0;
              padding: 8px 0;
              border-bottom: 1px solid #e5e7eb;
            }
            .detail:last-child {
              border-bottom: none;
            }
            .detail-label {
              font-weight: 600;
              color: #374151;
              display: inline-block;
              width: 200px;
            }
            .detail-value {
              color: #6b7280;
            }
            .price-box {
              background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
              color: white;
              padding: 25px;
              border-radius: 12px;
              margin: 30px 0;
              text-align: center;
              box-shadow: 0 4px 6px rgba(0,0,0,0.15);
            }
            .price-label {
              font-size: 14px;
              opacity: 0.9;
              margin-bottom: 8px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .price-value { 
              font-size: 36px; 
              font-weight: bold;
              margin: 10px 0;
            }
            .options-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
              margin-top: 15px;
            }
            .option-item {
              background: white;
              padding: 12px;
              border-radius: 6px;
              border: 1px solid #e5e7eb;
            }
            .option-item::before {
              content: "✓";
              color: #10b981;
              font-weight: bold;
              margin-right: 8px;
            }
            .price-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 15px;
              background: white;
              border-radius: 8px;
              overflow: hidden;
            }
            .price-table th {
              background: #1e40af;
              color: white;
              padding: 12px;
              text-align: left;
              font-weight: 600;
            }
            .price-table td {
              padding: 10px 12px;
              border-bottom: 1px solid #e5e7eb;
            }
            .price-table tr:last-child td {
              border-bottom: none;
            }
            .price-table tr:nth-child(even) {
              background: #f9fafb;
            }
            .price-table .total-row {
              background: #fef3c7;
              font-weight: bold;
              font-size: 16px;
            }
            .note-box {
              background: #eff6ff;
              border: 2px solid #3b82f6;
              padding: 20px;
              border-radius: 8px;
              margin-top: 30px;
              border-left: 6px solid #3b82f6;
            }
            .note-box strong {
              color: #1e40af;
              display: block;
              margin-bottom: 8px;
              font-size: 16px;
            }
            .footer { 
              margin-top: 50px; 
              padding-top: 20px; 
              border-top: 3px solid #e5e7eb; 
              font-size: 12px; 
              color: #6b7280;
              text-align: center;
            }
            .footer strong {
              color: #1e40af;
              font-size: 14px;
            }
            .footer div {
              margin: 5px 0;
            }
            .dimensions-box {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              margin-top: 15px;
            }
            .dimension-item {
              background: white;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
              border: 2px solid #e5e7eb;
            }
            .dimension-value {
              font-size: 24px;
              font-weight: bold;
              color: #1e40af;
              margin: 5px 0;
            }
            .dimension-label {
              font-size: 12px;
              color: #6b7280;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">🏥 MediStand Africa</div>
            <div class="tagline">La structure qui valorise votre visibilité</div>
          </div>
          
          <div class="title">📋 Récapitulatif de votre Configuration de Stand</div>
          
          <div class="section">
            <div class="section-title">📐 Dimensions du Stand</div>
            <div class="dimensions-box">
              <div class="dimension-item">
                <div class="dimension-label">Largeur</div>
                <div class="dimension-value">${config.largeur}m</div>
              </div>
              <div class="dimension-item">
                <div class="dimension-label">Profondeur</div>
                <div class="dimension-value">${config.profondeur}m</div>
              </div>
              <div class="dimension-item">
                <div class="dimension-label">Hauteur</div>
                <div class="dimension-value">${config.hauteur}m</div>
              </div>
              <div class="dimension-item">
                <div class="dimension-label">Surface Totale</div>
                <div class="dimension-value">${surface}m²</div>
              </div>
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">✨ Options Sélectionnées</div>
            <div class="options-grid">
              ${config.comptoir ? '<div class="option-item">Comptoir d\'accueil (+75 000 FCFA)</div>' : ''}
              ${config.ecran !== 'aucun' ? `<div class="option-item">Écran TV ${config.ecran}" (${config.ecran === '43' ? '+300 000' : '+500 000'} FCFA)</div>` : ''}
              ${config.spots > 0 ? `<div class="option-item">${config.spots} Spot(s) LED (+${config.spots * 20000} FCFA)</div>` : ''}
              <div class="option-item">Mobilier ${config.mobilier === 'standard' ? 'Standard (Inclus)' : config.mobilier === 'premium' ? 'Premium (+150 000 FCFA)' : 'VIP (+300 000 FCFA)'}</div>
              ${config.moquette ? '<div class="option-item">Revêtement moquette (+50 000 FCFA)</div>' : ''}
              ${config.stockage ? '<div class="option-item">Espace stockage fermé (+100 000 FCFA)</div>' : ''}
              ${config.branding ? '<div class="option-item">Personnalisation branding (+200 000 FCFA)</div>' : ''}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title">💰 Détail du Calcul du Prix</div>
            <table class="price-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th style="text-align: right;">Montant</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Base : ${surface}m² × 12 005 FCFA/m²/jour</td>
                  <td style="text-align: right;">${formatPrice(prixBase)}</td>
                </tr>
                ${config.hauteur > 2.4 ? '<tr><td>Hauteur supplémentaire</td><td style="text-align: right;">+100 000 FCFA</td></tr>' : ''}
                ${config.comptoir ? '<tr><td>Comptoir d\'accueil</td><td style="text-align: right;">+75 000 FCFA</td></tr>' : ''}
                ${config.ecran === '43' ? '<tr><td>Écran TV 43"</td><td style="text-align: right;">+300 000 FCFA</td></tr>' : ''}
                ${config.ecran === '55' ? '<tr><td>Écran TV 55"</td><td style="text-align: right;">+500 000 FCFA</td></tr>' : ''}
                ${config.spots > 0 ? `<tr><td>Spots LED (${config.spots})</td><td style="text-align: right;">+${config.spots * 20000} FCFA</td></tr>` : ''}
                ${config.mobilier === 'premium' ? '<tr><td>Mobilier Premium</td><td style="text-align: right;">+150 000 FCFA</td></tr>' : ''}
                ${config.mobilier === 'vip' ? '<tr><td>Mobilier VIP</td><td style="text-align: right;">+300 000 FCFA</td></tr>' : ''}
                ${config.moquette ? '<tr><td>Revêtement moquette</td><td style="text-align: right;">+50 000 FCFA</td></tr>' : ''}
                ${config.stockage ? '<tr><td>Espace stockage fermé</td><td style="text-align: right;">+100 000 FCFA</td></tr>' : ''}
                ${config.branding ? '<tr><td>Personnalisation branding</td><td style="text-align: right;">+200 000 FCFA</td></tr>' : ''}
                <tr class="total-row">
                  <td><strong>PRIX TOTAL ESTIMÉ</strong></td>
                  <td style="text-align: right;"><strong>${formatPrice(prixCalcule)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="price-box">
            <div class="price-label">Prix Total Estimé</div>
            <div class="price-value">${formatPrice(prixCalcule)}</div>
            <div style="font-size: 12px; opacity: 0.9; margin-top: 5px;">Base : ${surface}m² × 12 005 FCFA/m²/jour</div>
          </div>
          
          <div class="note-box">
            <strong>ℹ️ Note importante</strong>
            Ce prix est indicatif. Une proforma personnalisée vous sera envoyée par notre gestionnaire après validation de votre demande de devis.
          </div>
          
          <div class="footer">
            <div><strong>MediStand Africa</strong></div>
            <div>📍 Abidjan, Côte d'Ivoire</div>
            <div>📞 Téléphone : +225 0758184732 / +225 0709343667</div>
            <div>✉️ Email : info@medistandafrica.com</div>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb;">
              Document généré le ${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </body>
      </html>
    `;

    // Ouvrir une nouvelle fenêtre pour imprimer en PDF
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
        }, 250);
      };
    } else {
      // Fallback : copier les détails dans le presse-papier
      const text = `Configuration Stand MediStand Africa\n\nDimensions: ${config.largeur}m x ${config.profondeur}m (${surface}m²)\nHauteur: ${config.hauteur}m\nPrix estimé: ${formatPrice(prixCalcule)}\n\nContact: info@medistandafrica.com`;
      navigator.clipboard.writeText(text);
      alert('Les détails ont été copiés dans le presse-papier. Utilisez Ctrl+P pour imprimer en PDF.');
    }
  };

  const handleShare = () => {
    const surface = config.largeur * config.profondeur;

    // Créer un lien avec les paramètres de configuration encodés
    const params = new URLSearchParams({
      l: config.largeur.toString(),
      p: config.profondeur.toString(),
      h: config.hauteur.toString(),
      c: config.comptoir ? '1' : '0',
      e: config.ecran,
      s: config.spots.toString(),
      m: config.mobilier,
      moq: config.moquette ? '1' : '0',
      st: config.stockage ? '1' : '0',
      b: config.branding ? '1' : '0',
    });

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;

    // Texte détaillé pour le partage
    const shareText = `🏥 Ma configuration de stand MediStand Africa

📐 Dimensions : ${config.largeur}m × ${config.profondeur}m (${surface}m²)
📏 Hauteur : ${config.hauteur}m
💰 Prix estimé : ${formatPrice(prixCalcule)}

${config.comptoir ? '✓ Comptoir d\'accueil\n' : ''}${config.ecran !== 'aucun' ? `✓ Écran TV ${config.ecran}"\n` : ''}${config.spots > 0 ? `✓ ${config.spots} Spot(s) LED\n` : ''}✓ Mobilier ${config.mobilier === 'standard' ? 'Standard' : config.mobilier === 'premium' ? 'Premium' : 'VIP'}\n${config.moquette ? '✓ Revêtement moquette\n' : ''}${config.stockage ? '✓ Espace stockage\n' : ''}${config.branding ? '✓ Personnalisation branding\n' : ''}
🔗 Voir ma configuration : ${shareUrl}

MediStand Africa - La structure qui valorise votre visibilité`;

    // Utiliser l'API Web Share si disponible (mobile)
    if (navigator.share) {
      navigator.share({
        title: 'Ma configuration de stand MediStand Africa',
        text: shareText,
        url: shareUrl,
      }).catch((error) => {
        // Si l'utilisateur annule ou erreur, copier dans le presse-papier
        if (error.name !== 'AbortError') {
          navigator.clipboard.writeText(shareText);
          alert('✅ Configuration copiée dans le presse-papier !\n\nVous pouvez maintenant la partager via WhatsApp, Email, etc.');
        }
      });
    } else {
      // Sur desktop, copier dans le presse-papier avec un meilleur message
      navigator.clipboard.writeText(shareText).then(() => {
        alert(`✅ Configuration copiée dans le presse-papier !

Vous pouvez maintenant :
• Coller dans WhatsApp, Email, ou tout autre message
• Partager avec vos collègues
• Sauvegarder pour référence

Le lien contient votre configuration complète.`);
      }).catch(() => {
        // Fallback si clipboard ne fonctionne pas
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          alert('✅ Configuration copiée ! Vous pouvez maintenant la partager.');
        } catch (err) {
          alert('Impossible de copier automatiquement. Veuillez sélectionner et copier manuellement le texte affiché.');
          prompt('Copiez ce texte :', shareText);
        }
        document.body.removeChild(textArea);
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
              <Sparkles size={14} className="sm:w-4 sm:h-4 text-accent" />
              <span>Outil Interactif</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Configurateur de <span className="text-accent">Stand</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200">
              Créez votre stand idéal et obtenez un devis instantané
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Dimensions */}
              <Card className="p-4 sm:p-6 md:p-8 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-3">
                  <Ruler className="text-accent" />
                  <span>Dimensions du Stand</span>
                </h2>

                <div className="space-y-6">
                  {/* Largeur */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-semibold text-gray-700">Largeur</label>
                      <span className="text-2xl font-bold text-primary">{config.largeur}m</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfig({ ...config, largeur: Math.max(2, config.largeur - 1) })}
                        disabled={config.largeur <= 2}
                        className="min-w-[44px] min-h-[44px]"
                      >
                        <Minus size={18} className="sm:w-4 sm:h-4" />
                      </Button>
                      <input
                        type="range"
                        min="2"
                        max="6"
                        value={config.largeur}
                        onChange={(e) => setConfig({ ...config, largeur: Number(e.target.value) })}
                        className="flex-1 h-3 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfig({ ...config, largeur: Math.min(6, config.largeur + 1) })}
                        disabled={config.largeur >= 6}
                        className="min-w-[44px] min-h-[44px]"
                      >
                        <Plus size={18} className="sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Profondeur */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-semibold text-gray-700">Profondeur</label>
                      <span className="text-2xl font-bold text-primary">{config.profondeur}m</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfig({ ...config, profondeur: Math.max(2, config.profondeur - 1) })}
                        disabled={config.profondeur <= 2}
                        className="min-w-[44px] min-h-[44px]"
                      >
                        <Minus size={18} className="sm:w-4 sm:h-4" />
                      </Button>
                      <input
                        type="range"
                        min="2"
                        max="6"
                        value={config.profondeur}
                        onChange={(e) => setConfig({ ...config, profondeur: Number(e.target.value) })}
                        className="flex-1 h-3 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfig({ ...config, profondeur: Math.min(6, config.profondeur + 1) })}
                        disabled={config.profondeur >= 6}
                        className="min-w-[44px] min-h-[44px]"
                      >
                        <Plus size={18} className="sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Surface calculée */}
                  <div className="bg-accent/10 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-700">Surface totale</span>
                      <span className="text-3xl font-bold text-accent">{config.largeur * config.profondeur}m²</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Options */}
              <Card className="p-4 sm:p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">Options & Équipements</h2>

                <div className="space-y-4 sm:space-y-6">
                  {/* Comptoir */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <div className="font-semibold text-gray-700 group-hover:text-primary transition-colors">
                        Comptoir d'accueil
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">+ 75 000 FCFA</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={config.comptoir}
                      onChange={(e) => setConfig({ ...config, comptoir: e.target.checked })}
                      className="w-6 h-6 text-accent border-gray-300 rounded focus:ring-accent"
                    />
                  </label>

                  {/* Écran */}
                  <div>
                    <label className="font-semibold text-gray-700 block mb-3">Écran TV</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['aucun', '43', '55'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setConfig({ ...config, ecran: size })}
                          className={`p-3 sm:p-4 rounded-lg border-2 transition-all min-h-[44px] ${config.ecran === size
                            ? 'border-accent bg-accent/10 font-semibold'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                          <div className="font-semibold text-sm sm:text-base">{size === 'aucun' ? 'Sans écran' : `${size}"`}</div>
                          {size !== 'aucun' && (
                            <div className="text-xs text-gray-600 mt-1">
                              +{size === '43' ? '300 000' : '500 000'} FCFA
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Spots LED */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="font-semibold text-gray-700">Spots LED</label>
                      <span className="text-lg font-bold text-primary">{config.spots} spots</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfig({ ...config, spots: Math.max(0, config.spots - 1) })}
                        disabled={config.spots <= 0}
                        className="min-w-[44px] min-h-[44px]"
                      >
                        <Minus size={18} className="sm:w-4 sm:h-4" />
                      </Button>
                      <input
                        type="range"
                        min="0"
                        max="8"
                        value={config.spots}
                        onChange={(e) => setConfig({ ...config, spots: Number(e.target.value) })}
                        className="flex-1 h-3 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfig({ ...config, spots: Math.min(8, config.spots + 1) })}
                        disabled={config.spots >= 8}
                        className="min-w-[44px] min-h-[44px]"
                      >
                        <Plus size={18} className="sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-2">20 000 FCFA par spot</div>
                  </div>

                  {/* Mobilier */}
                  <div>
                    <label className="font-semibold text-gray-700 block mb-3">Pack Mobilier</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['standard', 'premium', 'vip'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setConfig({ ...config, mobilier: type })}
                          className={`p-3 sm:p-4 rounded-lg border-2 transition-all min-h-[44px] ${config.mobilier === type
                            ? 'border-accent bg-accent/10 font-semibold'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                          <div className="font-semibold capitalize text-sm sm:text-base">{type}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {type === 'standard' ? 'Inclus' : type === 'premium' ? '+150 000 FCFA' : '+300 000 FCFA'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Autres options */}
                  <div className="space-y-3 pt-4 border-t">
                    <label className="flex items-center justify-between cursor-pointer group min-h-[44px]">
                      <div>
                        <div className="font-semibold text-sm sm:text-base text-gray-700 group-hover:text-primary transition-colors">
                          Revêtement moquette
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">+ 50 000 FCFA</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.moquette}
                        onChange={(e) => setConfig({ ...config, moquette: e.target.checked })}
                        className="w-5 h-5 sm:w-6 sm:h-6 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group min-h-[44px]">
                      <div>
                        <div className="font-semibold text-sm sm:text-base text-gray-700 group-hover:text-primary transition-colors">
                          Espace stockage fermé
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">+ 100 000 FCFA</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.stockage}
                        onChange={(e) => setConfig({ ...config, stockage: e.target.checked })}
                        className="w-5 h-5 sm:w-6 sm:h-6 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group min-h-[44px]">
                      <div>
                        <div className="font-semibold text-sm sm:text-base text-gray-700 group-hover:text-primary transition-colors">
                          Personnalisation branding
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">+ 200 000 FCFA</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.branding}
                        onChange={(e) => setConfig({ ...config, branding: e.target.checked })}
                        className="w-5 h-5 sm:w-6 sm:h-6 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Summary & Price */}
            <div className="lg:col-span-1">
              <Card className="p-4 sm:p-6 md:p-8 lg:sticky lg:top-24 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h2 className="text-2xl font-bold text-primary mb-6">Votre Configuration</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Dimensions</span>
                    <span className="font-semibold">{config.largeur}m × {config.profondeur}m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Surface</span>
                    <span className="font-semibold">{config.largeur * config.profondeur}m²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Hauteur</span>
                    <span className="font-semibold">{config.hauteur}m</span>
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    {config.comptoir && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Comptoir</span>
                        <span className="text-accent">✓</span>
                      </div>
                    )}
                    {config.ecran !== 'aucun' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Écran {config.ecran}"</span>
                        <span className="text-accent">✓</span>
                      </div>
                    )}
                    {config.spots > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">{config.spots} Spots LED</span>
                        <span className="text-accent">✓</span>
                      </div>
                    )}
                    {config.moquette && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Moquette</span>
                        <span className="text-accent">✓</span>
                      </div>
                    )}
                    {config.stockage && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Stockage</span>
                        <span className="text-accent">✓</span>
                      </div>
                    )}
                    {config.branding && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Branding</span>
                        <span className="text-accent">✓</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-4 sm:p-6 rounded-xl mb-4 sm:mb-6">
                  <div className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Prix estimé</div>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">
                    {formatPrice(prixCalcule)}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    Base : {config.largeur * config.profondeur}m² × 12 005 FCFA/m²/jour
                  </div>
                  <div className="text-xs text-accent font-semibold">
                    Une proforma personnalisée vous sera envoyée après validation
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" onClick={() => window.location.href = '/reservation'}>
                    Réserver ce stand
                  </Button>
                  <Button variant="secondary" className="w-full" onClick={handleDownloadPDF}>
                    <Download size={18} className="mr-2" />
                    Télécharger PDF
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleShare}>
                    <Share2 size={18} className="mr-2" />
                    Partager
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4 sm:mt-6">
                  Prix indicatif. Une proforma personnalisée vous sera envoyée par notre gestionnaire après validation de votre demande.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

