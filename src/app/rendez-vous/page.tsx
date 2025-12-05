'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, Building, Mail, Phone, CheckCircle, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { contactInfo } from '@/constants/navigation';

interface RendezVousData {
  typeVisite: 'client' | 'fournisseur';
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  entreprise: string;
  date: string;
  heure: string;
  motif: string;
  message: string;
}

// Créneaux horaires disponibles
const creneaux = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30',
];

// Jours de la semaine
const joursSemaine = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

export default function RendezVousPage() {
  const [formData, setFormData] = useState<Partial<RendezVousData>>({
    typeVisite: 'client',
  });
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHeure, setSelectedHeure] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Générer les dates disponibles (30 prochains jours)
  const getAvailableDates = () => {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Exclure les dimanches (jour 0)
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setFormData({ ...formData, date });
  };

  const handleHeureSelect = (heure: string) => {
    setSelectedHeure(heure);
    setFormData({ ...formData, heure });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedHeure) {
      alert('Veuillez sélectionner une date et une heure');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-rdv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: selectedDate,
          heure: selectedHeure,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({ typeVisite: 'client' });
          setSelectedDate('');
          setSelectedHeure('');
        }, 5000);
      } else {
        alert(result.error || 'Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  if (isSuccess) {
    return (
      <div className="bg-white min-h-screen">
        <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold">
                Rendez-vous <span className="text-accent">Confirmé</span>
              </h1>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="p-12 text-center animate-scale-in">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Rendez-vous confirmé !</h3>
                <p className="text-gray-600 mb-6">
                  Votre demande de rendez-vous a été envoyée avec succès.
                  <br />
                  Vous recevrez un email de confirmation dans quelques instants.
                </p>
                <Button href="/">
                  Retour à l'accueil
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold">
              Prendre un <span className="text-accent">Rendez-vous</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              Visitez notre entreprise ou rencontrons-nous pour discuter de vos besoins
            </p>
          </div>
        </div>
      </section>

      {/* Formulaire */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionTitle
              title="Sélectionnez votre créneau"
              subtitle="Choisissez une date et une heure qui vous conviennent"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendrier */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center space-x-2">
                  <Calendar className="text-accent" />
                  <span>Date</span>
                </h3>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {joursSemaine.map((jour) => (
                    <div key={jour} className="text-center text-sm font-semibold text-gray-600 py-2">
                      {jour}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2 max-h-96 overflow-y-auto">
                  {availableDates.map((date) => {
                    const dateObj = new Date(date);
                    const jour = dateObj.getDate();
                    const jourSemaine = dateObj.getDay();
                    const isSelected = selectedDate === date;
                    const isToday = date === new Date().toISOString().split('T')[0];

                    return (
                      <button
                        key={date}
                        type="button"
                        onClick={() => handleDateSelect(date)}
                        className={`p-3 rounded-lg transition-all ${
                          isSelected
                            ? 'bg-accent text-white font-bold'
                            : isToday
                            ? 'bg-primary/20 text-primary font-semibold'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {jour}
                      </button>
                    );
                  })}
                </div>
                {selectedDate && (
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Date sélectionnée :</p>
                    <p className="font-semibold text-primary">{formatDate(selectedDate)}</p>
                  </div>
                )}
              </Card>

              {/* Créneaux horaires */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center space-x-2">
                  <Clock className="text-accent" />
                  <span>Heure</span>
                </h3>
                {!selectedDate ? (
                  <div className="text-center py-12 text-gray-500">
                    <p>Veuillez d'abord sélectionner une date</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {creneaux.map((heure) => {
                      const isSelected = selectedHeure === heure;
                      return (
                        <button
                          key={heure}
                          type="button"
                          onClick={() => handleHeureSelect(heure)}
                          className={`p-3 rounded-lg transition-all ${
                            isSelected
                              ? 'bg-accent text-white font-bold'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {heure}
                        </button>
                      );
                    })}
                  </div>
                )}
                {selectedHeure && (
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Heure sélectionnée :</p>
                    <p className="font-semibold text-primary">{selectedHeure}</p>
                  </div>
                )}
              </Card>
            </div>

            {/* Formulaire de contact */}
            <Card className="p-8 mt-8">
              <h3 className="text-2xl font-bold text-primary mb-6">Vos informations</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type de visite */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Type de visite *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, typeVisite: 'client' })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.typeVisite === 'client'
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <User className="mx-auto mb-2 text-primary" size={24} />
                      <div className="font-semibold">Client</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, typeVisite: 'fournisseur' })}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.typeVisite === 'fournisseur'
                          ? 'border-accent bg-accent/10'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Building className="mx-auto mb-2 text-primary" size={24} />
                      <div className="font-semibold">Fournisseur</div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      required
                      value={formData.nom || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      required
                      value={formData.prenom || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Mail className="inline mr-2" size={16} />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Phone className="inline mr-2" size={16} />
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      required
                      value={formData.telephone || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Building className="inline mr-2" size={16} />
                    Entreprise
                  </label>
                  <input
                    type="text"
                    name="entreprise"
                    value={formData.entreprise || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Motif du rendez-vous
                  </label>
                  <input
                    type="text"
                    name="motif"
                    value={formData.motif || ''}
                    onChange={handleChange}
                    placeholder="Ex: Visite des locaux, Présentation produits, etc."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Message (optionnel)
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                  />
                </div>

                <div className="bg-primary/5 p-4 rounded-lg flex items-start space-x-3">
                  <MapPin className="text-primary mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-primary mb-1">Notre adresse</p>
                    <p className="text-sm text-gray-600">{contactInfo.adresse}</p>
                    <p className="text-sm text-gray-600 mt-1">{contactInfo.horaires}</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting || !selectedDate || !selectedHeure}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Confirmer le rendez-vous'}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

