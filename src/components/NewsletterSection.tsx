'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setEmail('');
        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(result.error || 'Erreur lors de l\'inscription. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'inscription. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white relative overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Restez informé de nos actualités
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Recevez nos offres exclusives, conseils pour événements et actualités du secteur médical
          </p>

          {isSuccess ? (
            <div className="bg-accent/20 backdrop-blur-sm p-6 rounded-lg animate-scale-in flex items-center justify-center space-x-3 border border-accent/30">
              <CheckCircle size={24} className="text-accent" />
              <span className="font-semibold">Merci ! Vous êtes inscrit à notre newsletter.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:outline-none"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent hover:bg-accent-dark text-white px-8"
                size="lg"
              >
                {isSubmitting ? 'Envoi...' : (
                  <>
                    S'inscrire
                    <Send size={18} className="ml-2" />
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="text-xs text-gray-400 mt-4">
            Pas de spam. Désinscription possible à tout moment.
          </p>
        </div>
      </div>
    </section>
  );
};

