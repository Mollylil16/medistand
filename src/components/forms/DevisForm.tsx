'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { stands } from '@/constants/stands';
import type { FormDevisData } from '@/types';

export const DevisForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDevisData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    entreprise: '',
    typeStand: '',
    dateDebut: '',
    dateFin: '',
    lieu: '',
    optionsSupplementaires: [],
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      optionsSupplementaires: prev.optionsSupplementaires.includes(option)
        ? prev.optionsSupplementaires.filter(o => o !== option)
        : [...prev.optionsSupplementaires, option],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send-devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
          setFormData({
            nom: '',
            prenom: '',
            email: '',
            telephone: '',
            entreprise: '',
            typeStand: '',
            dateDebut: '',
            dateFin: '',
            lieu: '',
            optionsSupplementaires: [],
            message: '',
          });
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

  if (isSuccess) {
    return (
      <Card className="p-6 sm:p-8 md:p-12 text-center animate-scale-in">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <CheckCircle size={32} className="sm:w-10 sm:h-10 text-green-600" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">Demande envoyée avec succès !</h3>
        <p className="text-gray-600 mb-6">
          Nous avons bien reçu votre demande de devis. Notre équipe vous contactera dans les plus brefs délais.
        </p>
        <p className="text-sm text-gray-500">
          Vous recevrez une réponse sous 24 heures ouvrées.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-4 sm:p-6 md:p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informations Personnelles */}
        <div>
          <h3 className="text-xl font-bold text-primary mb-4">Vos informations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-2">
                Prénom *
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                required
                value={formData.prenom}
                onChange={handleChange}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                placeholder="Votre prénom"
              />
            </div>

            <div>
              <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2">
                Nom *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                required
                value={formData.nom}
                onChange={handleChange}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                placeholder="Votre nom"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                placeholder="votre@email.com"
              />
            </div>

            <div>
              <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                Téléphone *
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                required
                value={formData.telephone}
                onChange={handleChange}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                placeholder="+225 XX XX XX XX XX"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="entreprise" className="block text-sm font-semibold text-gray-700 mb-2">
                Entreprise / Organisation *
              </label>
              <input
                type="text"
                id="entreprise"
                name="entreprise"
                required
                value={formData.entreprise}
                onChange={handleChange}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                placeholder="Nom de votre entreprise"
              />
            </div>
          </div>
        </div>

        {/* Détails de l'Événement */}
        <div className="pt-6 border-t">
          <h3 className="text-xl font-bold text-primary mb-4">Détails de l'événement</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="typeStand" className="block text-sm font-semibold text-gray-700 mb-2">
                Type de stand souhaité *
              </label>
              <select
                id="typeStand"
                name="typeStand"
                required
                value={formData.typeStand}
                onChange={handleChange}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              >
                <option value="">Sélectionnez un stand</option>
                {stands.map(stand => (
                  <option key={stand.id} value={stand.id}>
                    {stand.nom} - {stand.dimensions.largeur} × {stand.dimensions.profondeur}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dateDebut" className="block text-sm font-semibold text-gray-700 mb-2">
                Date de début *
              </label>
              <input
                type="date"
                id="dateDebut"
                name="dateDebut"
                required
                value={formData.dateDebut}
                onChange={handleChange}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label htmlFor="dateFin" className="block text-sm font-semibold text-gray-700 mb-2">
                Date de fin *
              </label>
              <input
                type="date"
                id="dateFin"
                name="dateFin"
                required
                value={formData.dateFin}
                onChange={handleChange}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="lieu" className="block text-sm font-semibold text-gray-700 mb-2">
                Lieu de l'événement *
              </label>
              <input
                type="text"
                id="lieu"
                name="lieu"
                required
                value={formData.lieu}
                onChange={handleChange}
                className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors"
                placeholder="Ex: Sofitel Ivoire, Abidjan"
              />
            </div>
          </div>
        </div>

        {/* Options Supplémentaires */}
        <div className="pt-6 border-t">
          <h3 className="text-xl font-bold text-primary mb-4">Options supplémentaires</h3>
          <div className="space-y-3">
            {[
              'Personnalisation graphique (branding)',
              'Équipements audiovisuels supplémentaires',
              'Mobilier additionnel',
              'Assistance technique pendant l\'événement',
              'Service de stockage avant/après événement',
            ].map(option => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.optionsSupplementaires.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="w-5 h-5 text-accent border-gray-300 rounded focus:ring-accent"
                />
                <span className="text-gray-700 group-hover:text-primary transition-colors">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message */}
        <div className="pt-6 border-t">
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            Message / Besoins spécifiques
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition-colors resize-none"
            placeholder="Décrivez vos besoins spécifiques, questions ou demandes particulières..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full group"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              <>
                Envoyer ma demande
                <Send size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>

          <div className="bg-primary/5 border-l-4 border-primary p-3 sm:p-4 rounded-r-lg mt-4">
            <p className="text-xs sm:text-sm text-gray-700">
              <span className="font-semibold text-primary">Note :</span> Une proforma vous sera envoyée par email après validation de votre demande. 
              Tarification de base : <span className="font-bold text-accent">9 000 FCFA/m²</span>.
            </p>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 text-center mt-3 sm:mt-4">
            En soumettant ce formulaire, vous acceptez d'être contacté par MediStand Africa concernant votre demande.
          </p>
        </div>
      </form>
    </Card>
  );
};

