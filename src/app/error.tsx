'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur pour le débogage
    console.error('Erreur application:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8 animate-scale-in">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={48} className="text-red-600" />
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
          Une erreur est survenue
        </h2>
        <p className="text-xl text-gray-600 mb-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Désolé, une erreur inattendue s'est produite.
        </p>
        <p className="text-gray-500 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Notre équipe a été notifiée et travaille à résoudre le problème.
        </p>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-sm font-semibold text-red-800 mb-2">Détails de l'erreur (mode développement) :</p>
            <p className="text-sm text-red-600 font-mono">{error.message}</p>
            {error.digest && (
              <p className="text-xs text-red-500 mt-2">Digest: {error.digest}</p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" onClick={reset}>
            <RefreshCw size={20} className="mr-2" />
            Réessayer
          </Button>
          <Button variant="secondary" size="lg" href="/">
            <Home size={20} className="mr-2" />
            Retour à l'accueil
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Besoin d'aide ?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/contact" className="text-primary hover:text-accent transition-colors">
              Contactez-nous
            </a>
            <a href="tel:+2250789886013" className="text-primary hover:text-accent transition-colors">
              +225 0789886013
            </a>
            <a href="mailto:contact@medistandafrica.com" className="text-primary hover:text-accent transition-colors">
              contact@medistandafrica.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

