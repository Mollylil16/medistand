'use client';

import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SectionTitle } from '@/components/ui/SectionTitle';

interface Avis {
  id: number;
  nom: string;
  prenom?: string;
  email?: string;
  note: number;
  commentaire: string;
  stand_id?: string;
  created_at: string;
}

export default function AvisPage() {
  const [avisClients, setAvisClients] = useState<Avis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    entreprise: '',
    email: '',
    note: 5,
    commentaire: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Charger les avis depuis la base de données
  useEffect(() => {
    const fetchAvis = async () => {
      try {
        const response = await fetch('/api/avis');
        const result = await response.json();
        
        if (result.success) {
          setAvisClients(result.avis || []);
        } else {
          console.error('Erreur chargement avis:', result.error);
        }
      } catch (error) {
        console.error('Erreur fetch avis:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvis();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/avis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: formData.nom,
          prenom: formData.prenom || null,
          email: formData.email || null,
          note: formData.note,
          commentaire: formData.commentaire,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        // Recharger les avis après soumission
        const refreshResponse = await fetch('/api/avis');
        const refreshResult = await refreshResponse.json();
        if (refreshResult.success) {
          setAvisClients(refreshResult.avis || []);
        }
      } else {
        alert(result.error || 'Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSuccess(false);
        setShowForm(false);
        setFormData({ nom: '', prenom: '', entreprise: '', email: '', note: 5, commentaire: '' });
      }, 3000);
    }
  };

  // Calculer la moyenne des notes
  const moyenneNotes = avisClients.length > 0
    ? avisClients.reduce((acc, avis) => acc + avis.note, 0) / avisClients.length
    : 0;

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Obtenir le nom complet
  const getNomComplet = (avis: Avis) => {
    return avis.prenom ? `${avis.nom} ${avis.prenom}` : avis.nom;
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Avis <span className="text-accent">Clients</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200">
              Ce que nos clients disent de nous
            </p>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 md:gap-8 justify-center pt-4 sm:pt-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1 sm:mb-2">
                  <span className="text-3xl sm:text-4xl font-bold text-accent">{moyenneNotes.toFixed(1)}</span>
                  <Star size={24} className="sm:w-8 sm:h-8 text-accent fill-accent" />
                </div>
                <div className="text-sm sm:text-base text-gray-300">Moyenne des notes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-1 sm:mb-2">{avisClients.length}</div>
                <div className="text-sm sm:text-base text-gray-300">Avis clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-accent mb-1 sm:mb-2">100%</div>
                <div className="text-sm sm:text-base text-gray-300">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avis List */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            {/* Button to add review */}
            <div className="text-center mb-8 sm:mb-12">
              <Button size="lg" onClick={() => setShowForm(!showForm)} className="min-h-[44px]">
                <MessageCircle size={18} className="sm:w-5 sm:h-5 mr-2" />
                Laisser un avis
              </Button>
            </div>

            {/* Form */}
            {showForm && (
              <Card className="p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 animate-fade-in-up">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">Merci pour votre avis !</h3>
                    <p className="text-gray-600">Votre témoignage sera publié après modération.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <h3 className="text-2xl font-bold text-primary mb-6">Votre Avis</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                          className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={formData.prenom}
                          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                          className="w-full px-4 py-3 min-h-[44px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent"
                        placeholder="optionnel"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Note *
                      </label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((note) => (
                          <button
                            key={note}
                            type="button"
                            onClick={() => setFormData({ ...formData, note })}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              size={40}
                              className={note <= formData.note ? 'text-accent fill-accent' : 'text-gray-300'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Votre commentaire *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.commentaire}
                        onChange={(e) => setFormData({ ...formData, commentaire: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent resize-none"
                        placeholder="Partagez votre expérience avec MediStand Africa..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                        Annuler
                      </Button>
                      <Button type="submit" disabled={isSubmitting} className="flex-1">
                        {isSubmitting ? 'Envoi...' : 'Publier mon avis'}
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            )}

            {/* Reviews List */}
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 className="animate-spin text-primary mx-auto mb-4" size={48} />
                <p className="text-gray-600">Chargement des avis...</p>
              </div>
            ) : avisClients.length === 0 ? (
              <Card className="p-12 text-center">
                <MessageCircle size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">Aucun avis pour le moment</h3>
                <p className="text-gray-600">Soyez le premier à laisser un avis !</p>
              </Card>
            ) : (
              <div className="space-y-6">
                {avisClients.map((avis, index) => (
                  <Card
                    key={avis.id}
                    className="p-8 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        {getNomComplet(avis).charAt(0).toUpperCase()}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-bold text-lg text-primary">{getNomComplet(avis)}</div>
                            {avis.stand_id && (
                              <div className="text-sm text-gray-600">Stand: {avis.stand_id}</div>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{formatDate(avis.created_at)}</div>
                        </div>

                        <div className="flex space-x-1 mb-4">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className={i < avis.note ? 'text-accent fill-accent' : 'text-gray-300'}
                            />
                          ))}
                        </div>

                        <p className="text-gray-700 leading-relaxed">{avis.commentaire}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

