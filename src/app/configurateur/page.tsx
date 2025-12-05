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
  const [config, setConfig] = useState<Configuration>({
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
  });

  // Calcul du prix dynamique
  const prixCalcule = useMemo(() => {
    let prix = 0;
    
    // Base : surface
    const surface = config.largeur * config.profondeur;
    prix += surface * 50000; // 50k FCFA par m²
    
    // Hauteur
    if (config.hauteur > 2.4) prix += 100000;
    
    // Options
    if (config.comptoir) prix += 75000;
    if (config.ecran === '43') prix += 150000;
    if (config.ecran === '55') prix += 250000;
    prix += config.spots * 25000;
    if (config.mobilier === 'premium') prix += 150000;
    if (config.mobilier === 'vip') prix += 300000;
    if (config.moquette) prix += 50000;
    if (config.stockage) prix += 100000;
    if (config.branding) prix += 200000;
    
    return prix;
  }, [config]);

  const handleDownloadPDF = () => {
    // Simulation de téléchargement
    alert('Fonctionnalité de téléchargement PDF à venir. Votre configuration a été sauvegardée !');
    console.log('Configuration:', config, 'Prix:', prixCalcule);
  };

  const handleShare = () => {
    const text = `Ma configuration MediStand: ${config.largeur}m x ${config.profondeur}m - ${formatPrice(prixCalcule)}`;
    if (navigator.share) {
      navigator.share({
        title: 'Ma configuration de stand',
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Lien copié dans le presse-papier !');
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              <Sparkles size={16} className="text-accent" />
              <span>Outil Interactif</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold">
              Configurateur de <span className="text-accent">Stand</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Créez votre stand idéal et obtenez un devis instantané
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Configuration Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Dimensions */}
              <Card className="p-8 animate-fade-in-up">
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
                      >
                        <Minus size={16} />
                      </Button>
                      <input
                        type="range"
                        min="2"
                        max="6"
                        value={config.largeur}
                        onChange={(e) => setConfig({ ...config, largeur: Number(e.target.value) })}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfig({ ...config, largeur: Math.min(6, config.largeur + 1) })}
                        disabled={config.largeur >= 6}
                      >
                        <Plus size={16} />
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
                      >
                        <Minus size={16} />
                      </Button>
                      <input
                        type="range"
                        min="2"
                        max="6"
                        value={config.profondeur}
                        onChange={(e) => setConfig({ ...config, profondeur: Number(e.target.value) })}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfig({ ...config, profondeur: Math.min(6, config.profondeur + 1) })}
                        disabled={config.profondeur >= 6}
                      >
                        <Plus size={16} />
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
              <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h2 className="text-2xl font-bold text-primary mb-6">Options & Équipements</h2>

                <div className="space-y-6">
                  {/* Comptoir */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <div className="font-semibold text-gray-700 group-hover:text-primary transition-colors">
                        Comptoir d'accueil
                      </div>
                      <div className="text-sm text-gray-600">+ 75 000 FCFA</div>
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
                    <div className="grid grid-cols-3 gap-3">
                      {(['aucun', '43', '55'] as const).map((size) => (
                        <button
                          key={size}
                          onClick={() => setConfig({ ...config, ecran: size })}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            config.ecran === size
                              ? 'border-accent bg-accent/10 font-semibold'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-semibold">{size === 'aucun' ? 'Sans écran' : `${size}"`}</div>
                          {size !== 'aucun' && (
                            <div className="text-xs text-gray-600 mt-1">
                              +{size === '43' ? '150k' : '250k'}
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
                      >
                        <Minus size={16} />
                      </Button>
                      <input
                        type="range"
                        min="0"
                        max="8"
                        value={config.spots}
                        onChange={(e) => setConfig({ ...config, spots: Number(e.target.value) })}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setConfig({ ...config, spots: Math.min(8, config.spots + 1) })}
                        disabled={config.spots >= 8}
                      >
                        <Plus size={16} />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">25 000 FCFA par spot</div>
                  </div>

                  {/* Mobilier */}
                  <div>
                    <label className="font-semibold text-gray-700 block mb-3">Pack Mobilier</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['standard', 'premium', 'vip'] as const).map((type) => (
                        <button
                          key={type}
                          onClick={() => setConfig({ ...config, mobilier: type })}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            config.mobilier === type
                              ? 'border-accent bg-accent/10 font-semibold'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-semibold capitalize">{type}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {type === 'standard' ? 'Inclus' : type === 'premium' ? '+150k' : '+300k'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Autres options */}
                  <div className="space-y-3 pt-4 border-t">
                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <div className="font-semibold text-gray-700 group-hover:text-primary transition-colors">
                          Revêtement moquette
                        </div>
                        <div className="text-sm text-gray-600">+ 50 000 FCFA</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.moquette}
                        onChange={(e) => setConfig({ ...config, moquette: e.target.checked })}
                        className="w-6 h-6 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <div className="font-semibold text-gray-700 group-hover:text-primary transition-colors">
                          Espace stockage fermé
                        </div>
                        <div className="text-sm text-gray-600">+ 100 000 FCFA</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.stockage}
                        onChange={(e) => setConfig({ ...config, stockage: e.target.checked })}
                        className="w-6 h-6 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                    </label>

                    <label className="flex items-center justify-between cursor-pointer group">
                      <div>
                        <div className="font-semibold text-gray-700 group-hover:text-primary transition-colors">
                          Personnalisation branding
                        </div>
                        <div className="text-sm text-gray-600">+ 200 000 FCFA</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={config.branding}
                        onChange={(e) => setConfig({ ...config, branding: e.target.checked })}
                        className="w-6 h-6 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                    </label>
                  </div>
                </div>
              </Card>
            </div>

            {/* Summary & Price */}
            <div className="lg:col-span-1">
              <Card className="p-8 sticky top-24 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
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

                <div className="bg-gradient-to-br from-accent/20 to-accent/10 p-6 rounded-xl mb-6">
                  <div className="text-sm text-gray-600 mb-2">Prix estimé</div>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {formatPrice(prixCalcule)}
                  </div>
                  <div className="text-xs text-gray-600">par événement (TVA incluse)</div>
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

                <p className="text-xs text-gray-500 text-center mt-6">
                  Prix indicatif. Devis final après validation.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

