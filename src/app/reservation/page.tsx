'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Check, X, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { stands } from '@/constants/stands';
import { formatPrice } from '@/lib/utils';

interface ReservationData {
  standId: string;
  dateDebut: string;
  dateFin: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  evenement: string;
  lieu: string;
}

export default function ReservationPage() {
  const [step, setStep] = useState(1);
  const [reservation, setReservation] = useState<Partial<ReservationData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleStandSelect = (standId: string) => {
    setReservation({ ...reservation, standId });
    setStep(2);
  };

  const handleDateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(3);
  };

  const handleFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!selectedStand) {
        alert('Veuillez sélectionner un stand');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/send-reservation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...reservation,
          selectedStand: {
            id: selectedStand.id,
            nom: selectedStand.nom,
            dimensions: selectedStand.dimensions,
            prix: selectedStand.prix,
          },
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
      } else {
        alert(result.error || 'Erreur lors de l\'envoi de la réservation. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi de la réservation. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedStand = stands.find(s => s.id === reservation.standId);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-12 text-center animate-scale-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">Réservation Confirmée !</h2>
            <p className="text-gray-600 mb-6">
              Votre demande de réservation a été envoyée avec succès. Nous vous contacterons dans les 24 heures pour confirmer les détails.
            </p>
            <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg text-left mb-6">
              <h3 className="font-bold text-primary mb-3">Récapitulatif</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Stand:</strong> {selectedStand?.nom}</p>
                <p><strong>Du:</strong> {reservation.dateDebut}</p>
                <p><strong>Au:</strong> {reservation.dateFin}</p>
                <p><strong>Événement:</strong> {reservation.evenement}</p>
                <p><strong>Lieu:</strong> {reservation.lieu}</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => window.location.href = '/'}>
                Retour à l'accueil
              </Button>
              <Button variant="outline" onClick={() => {
                setIsSuccess(false);
                setStep(1);
                setReservation({});
              }}>
                Nouvelle réservation
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Réservez Votre <span className="text-accent">Stand</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200">
              Processus simple en 3 étapes
            </p>
          </div>
        </div>
      </section>

      {/* Steps Indicator */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            {[
              { num: 1, label: 'Choisir un stand' },
              { num: 2, label: 'Dates & Lieu' },
              { num: 3, label: 'Vos informations' }
            ].map((s, idx) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center space-x-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all min-w-[40px] min-h-[40px] ${
                    step >= s.num ? 'bg-accent text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s.num ? <Check size={20} /> : s.num}
                  </div>
                  <span className={`text-xs sm:text-sm ${step >= s.num ? 'text-primary font-semibold' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`hidden sm:block h-1 w-12 md:w-24 transition-all ${step > s.num ? 'bg-accent' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Step 1: Choose Stand */}
      {step === 1 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionTitle
              title="Choisissez votre stand"
              subtitle="Sélectionnez le stand qui correspond à vos besoins"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {stands.filter(s => s.prix > 0).map((stand, index) => (
                <Card
                  key={stand.id}
                  className="hover:shadow-2xl transition-all animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-[180px] sm:h-[200px] md:h-[220px] lg:h-48 overflow-hidden rounded-t-lg cursor-pointer" onClick={() => handleStandSelect(stand.id)}>
                    <Image
                      src={stand.image}
                      alt={stand.nom}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    <h3 className="text-lg sm:text-xl font-bold text-primary">{stand.nom}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{stand.description}</p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between pt-2 border-t gap-3">
                      <div className="flex-1">
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                          À partir de 9 000 FCFA/m²
                        </div>
                        <div className="text-xs text-gray-600">
                          {parseInt(stand.dimensions.largeur) * parseInt(stand.dimensions.profondeur)}m² - Proforma sur demande
                        </div>
                      </div>
                      <Button size="sm" onClick={() => handleStandSelect(stand.id)} className="min-h-[44px] text-xs sm:text-sm w-full sm:w-auto">
                        Sélectionner
                        <ArrowRight size={14} className="sm:w-4 sm:h-4 ml-1 sm:ml-2" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Step 2: Dates & Location */}
      {step === 2 && selectedStand && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <Card className="p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl font-bold text-primary mb-6 flex items-center space-x-3">
                  <Calendar className="text-accent" />
                  <span>Dates et Lieu de l'événement</span>
                </h2>

                <div className="bg-accent/10 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                      <Image
                        src={selectedStand.image}
                        alt={selectedStand.nom}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm sm:text-base text-primary">{selectedStand.nom}</div>
                      <div className="text-xs sm:text-sm text-gray-600">{selectedStand.dimensions.largeur} × {selectedStand.dimensions.profondeur}</div>
                      <div className="text-sm sm:text-base md:text-lg font-bold text-accent">
                        À partir de 9 000 FCFA/m²
                      </div>
                      <div className="text-xs text-gray-500">
                        Proforma personnalisée sur demande
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleDateSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date de début *
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={reservation.dateDebut || ''}
                        onChange={(e) => setReservation({ ...reservation, dateDebut: e.target.value })}
                        className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Date de fin *
                      </label>
                      <input
                        type="date"
                        required
                        min={reservation.dateDebut || new Date().toISOString().split('T')[0]}
                        value={reservation.dateFin || ''}
                        onChange={(e) => setReservation({ ...reservation, dateFin: e.target.value })}
                        className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom de l'événement *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Congrès SIMGF 2024"
                      value={reservation.evenement || ''}
                      onChange={(e) => setReservation({ ...reservation, evenement: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Lieu de l'événement *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Sofitel Hôtel Ivoire, Abidjan"
                      value={reservation.lieu || ''}
                      onChange={(e) => setReservation({ ...reservation, lieu: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-full sm:w-auto min-h-[44px]">
                      Retour
                    </Button>
                    <Button type="submit" className="flex-1 w-full sm:w-auto min-h-[44px]">
                      Continuer
                      <ArrowRight size={20} className="ml-2" />
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Step 3: Personal Information */}
      {step === 3 && (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl mx-auto">
              <Card className="p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Vos informations
                </h2>

                <form onSubmit={handleFinalSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={reservation.prenom || ''}
                        onChange={(e) => setReservation({ ...reservation, prenom: e.target.value })}
                        className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nom *
                      </label>
                      <input
                        type="text"
                        required
                        value={reservation.nom || ''}
                        onChange={(e) => setReservation({ ...reservation, nom: e.target.value })}
                        className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                      <input
                        type="email"
                        required
                        value={reservation.email || ''}
                        onChange={(e) => setReservation({ ...reservation, email: e.target.value })}
                        className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone *
                    </label>
                      <input
                        type="tel"
                        required
                        placeholder="+225 XX XX XX XX XX"
                        value={reservation.telephone || ''}
                        onChange={(e) => setReservation({ ...reservation, telephone: e.target.value })}
                        className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                      />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                    <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-full sm:w-auto min-h-[44px]">
                      Retour
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="flex-1 w-full sm:w-auto min-h-[44px]">
                      {isSubmitting ? 'Envoi en cours...' : 'Confirmer la réservation'}
                      {!isSubmitting && <Check size={20} className="ml-2" />}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

