'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hasAccepted, setHasAccepted] = useState(false);

  const handleOpenModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAccepted) {
      setShowModal(true);
    } else {
      handleSubmit(e);
    }
  };

  const handleAccept = async () => {
    setHasAccepted(true);
    setShowModal(false);
    
    // Submit after accepting
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
        setHasAccepted(false);
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert(result.error || 'Erreur lors de l\'inscription. Veuillez réessayer.');
        setHasAccepted(false);
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'inscription. Veuillez réessayer.');
      setHasAccepted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = () => {
    setShowModal(false);
    setEmail('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hasAccepted) {
      setShowModal(true);
      return;
    }

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
        setHasAccepted(false);
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
    <section className="py-12 sm:py-14 md:py-16 bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white relative overflow-hidden">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Restez informé de nos actualités
          </h2>
          <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8">
            Recevez nos offres exclusives, conseils pour événements et actualités du secteur médical
          </p>

          {isSuccess ? (
            <div className="bg-accent/20 backdrop-blur-sm p-4 sm:p-6 rounded-lg animate-scale-in flex items-center justify-center space-x-2 sm:space-x-3 border border-accent/30">
              <CheckCircle size={20} className="sm:w-6 sm:h-6 text-accent" />
              <span className="font-semibold text-sm sm:text-base">Merci ! Vous êtes inscrit à notre newsletter.</span>
            </div>
          ) : (
            <form onSubmit={handleOpenModal} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 min-h-[44px] rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-accent focus:outline-none text-sm sm:text-base"
              />
              <Button
                type="submit"
                disabled={isSubmitting || !email}
                className="bg-accent hover:bg-accent-dark text-white px-6 sm:px-8 min-h-[44px]"
                size="lg"
              >
                {isSubmitting ? 'Envoi...' : (
                  <>
                    S'inscrire
                    <Send size={16} className="sm:w-4.5 sm:h-4.5 ml-2" />
                  </>
                )}
              </Button>
            </form>
          )}

          <p className="text-xs text-gray-400 mt-4">
            Pas de spam. Désinscription possible à tout moment.
          </p>

          {/* Modal Conditions Générales */}
          <Modal
            isOpen={showModal}
            onClose={handleReject}
            title="Conditions Générales d'Abonnement"
            size="lg"
          >
            <div className="space-y-6 text-gray-700">
              {/* Introduction */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-4 sm:p-5 rounded-xl border-l-4 border-primary">
                <p className="font-semibold text-primary text-base sm:text-lg mb-1">
                  En vous abonnant à notre newsletter, vous acceptez les conditions suivantes :
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Veuillez lire attentivement ces conditions avant de vous abonner.
                </p>
              </div>

              {/* Conditions */}
              <div className="space-y-5 sm:space-y-6">
                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Objet de l'abonnement</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        En vous abonnant à la newsletter de MediStand Africa, vous acceptez de recevoir par email des informations concernant nos services, offres promotionnelles, actualités du secteur médical, conseils pour événements, et autres communications liées à nos activités.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Données personnelles</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        Les données personnelles collectées (adresse email) sont utilisées exclusivement pour l'envoi de la newsletter. Conformément à la loi sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Vos données ne seront jamais cédées à des tiers sans votre consentement explicite.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Fréquence des envois</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        La newsletter est envoyée de manière périodique, généralement une à deux fois par mois, sauf en cas d'offres spéciales ou d'actualités importantes. Nous nous engageons à ne pas saturer votre boîte mail.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      4
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Désinscription</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        Vous pouvez vous désinscrire à tout moment en cliquant sur le lien de désinscription présent dans chaque email, ou en nous contactant directement à l'adresse : <a href="mailto:info@medistandafrica.com" className="text-accent hover:underline font-semibold">info@medistandafrica.com</a>. La désinscription est immédiate et définitive.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      5
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Contenu de la newsletter</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        Le contenu de la newsletter peut inclure : informations sur nos stands et services, offres promotionnelles, actualités du secteur médical et pharmaceutique, conseils pour l'organisation d'événements, témoignages clients, et invitations à des événements.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      6
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Responsabilité</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        MediStand Africa s'engage à fournir des informations exactes et à jour. Cependant, nous ne pouvons être tenus responsables des erreurs ou omissions dans le contenu de la newsletter. Les offres promotionnelles sont valables dans les limites des stocks disponibles et selon les conditions spécifiques indiquées.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      7
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Modifications des conditions</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        MediStand Africa se réserve le droit de modifier ces conditions générales à tout moment. Les abonnés seront informés de toute modification importante par email.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      8
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-2 text-base sm:text-lg">Acceptation</h3>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                        En cliquant sur "J'accepte", vous confirmez avoir lu, compris et accepté l'ensemble de ces conditions générales d'abonnement à la newsletter.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions - Sticky en bas */}
              <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t-2 border-gray-200 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 mt-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button
                    onClick={handleAccept}
                    className="flex-1 bg-accent hover:bg-accent-dark text-white min-h-[48px] text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                    size="lg"
                  >
                    ✓ J'accepte et je m'abonne
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="outline"
                    className="flex-1 min-h-[48px] text-base font-semibold border-2 hover:bg-gray-50 transition-all"
                    size="lg"
                  >
                    ✗ Je refuse
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">
                  En cliquant sur "J'accepte", vous confirmez avoir lu et accepté ces conditions.
                </p>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </section>
  );
};

