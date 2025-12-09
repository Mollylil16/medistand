import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from '@/components/forms/ContactForm';
import { contactInfo } from '@/constants/navigation';

export const metadata = {
  title: 'Contact - MediStand Africa | Nous Contacter',
  description: 'Contactez MediStand Africa pour vos besoins en location de stands. Téléphone, email, WhatsApp. Réponse rapide garantie.',
};

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 animate-fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Contactez-<span className="text-accent">nous</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed">
              Notre équipe est à votre écoute pour répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto mb-8 sm:mb-12">
            <Card className="p-6 text-center animate-fade-in-up group">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Phone size={28} />
              </div>
              <h3 className="font-bold text-primary mb-2">Téléphone</h3>
              <a href={`tel:${contactInfo.telephone}`} className="text-gray-700 hover:text-accent transition-colors">
                {contactInfo.telephone}
              </a>
            </Card>

            <Card className="p-6 text-center animate-fade-in-up group" style={{ animationDelay: '100ms' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle size={28} />
              </div>
              <h3 className="font-bold text-primary mb-2">WhatsApp</h3>
              <a 
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-accent transition-colors"
              >
                {contactInfo.telephone}
              </a>
            </Card>

            <Card className="p-6 text-center animate-fade-in-up group" style={{ animationDelay: '200ms' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Mail size={28} />
              </div>
              <h3 className="font-bold text-primary mb-2">Email</h3>
              <a href={`mailto:${contactInfo.email}`} className="text-gray-700 hover:text-accent transition-colors break-all">
                {contactInfo.email}
              </a>
            </Card>

            <Card className="p-6 text-center animate-fade-in-up group" style={{ animationDelay: '300ms' }}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={28} />
              </div>
              <h3 className="font-bold text-primary mb-2">Adresse</h3>
              <p className="text-gray-700">
                {contactInfo.adresse}
              </p>
            </Card>
          </div>

          {/* Contacts Gestionnaire */}
          {contactInfo.gestionnaire && (
            <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
              <Card className="p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2">Contact Gestionnaire</h3>
                  <p className="text-sm sm:text-base text-gray-600">
                    Pour vos demandes de devis, proformas et questions commerciales
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <a
                    href={`tel:${contactInfo.gestionnaire.telephone1}`}
                    className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Phone size={24} className="text-accent group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-gray-600">Gestionnaire</div>
                      <div className="font-bold text-primary">{contactInfo.gestionnaire.telephone1}</div>
                    </div>
                  </a>
                  <a
                    href={`tel:${contactInfo.gestionnaire.telephone2}`}
                    className="flex items-center justify-center space-x-3 p-4 bg-white rounded-lg hover:bg-primary/10 transition-colors group"
                  >
                    <Phone size={24} className="text-accent group-hover:scale-110 transition-transform" />
                    <div className="text-left">
                      <div className="text-xs text-gray-600">Gestionnaire</div>
                      <div className="font-bold text-primary">{contactInfo.gestionnaire.telephone2}</div>
                    </div>
                  </a>
                </div>
              </Card>
            </div>
          )}

          {/* Horaires */}
          <Card className="p-8 max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Clock size={32} className="text-accent" />
              <h3 className="text-2xl font-bold text-primary">Nos Horaires</h3>
            </div>
            <p className="text-lg text-gray-700">
              {contactInfo.horaires}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Support d'urgence disponible 24/7 pendant vos événements
            </p>
          </Card>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <SectionTitle
              title="Envoyez-nous un message"
              subtitle="Remplissez le formulaire ci-dessous, nous vous répondrons rapidement"
            />
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Notre Localisation"
            subtitle="Nous sommes basés à Abidjan, Côte d'Ivoire"
          />

          <div className="max-w-5xl mx-auto">
            <Card className="p-0 overflow-hidden">
              <div className="relative h-96 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin size={64} className="text-primary mx-auto" />
                  <div className="text-2xl font-bold text-primary">Abidjan, Côte d'Ivoire</div>
                  <p className="text-gray-600">
                    Carte interactive bientôt disponible
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Rapide */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionTitle
            title="Questions Fréquentes"
            subtitle="Réponses rapides aux questions les plus courantes"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              {
                question: 'Quel est votre délai de réponse ?',
                reponse: 'Nous répondons à toutes les demandes dans les 24 heures ouvrées. Pour les urgences, contactez-nous directement par téléphone.',
              },
              {
                question: 'Livrez-vous dans toute la Côte d\'Ivoire ?',
                reponse: 'Oui, nous livrons et installons nos stands dans toutes les villes de Côte d\'Ivoire. Des frais de déplacement peuvent s\'appliquer hors Abidjan.',
              },
              {
                question: 'Puis-je voir les stands avant de réserver ?',
                reponse: 'Absolument ! Contactez-nous pour prendre rendez-vous et voir nos stands en démonstration.',
              },
              {
                question: 'Proposez-vous des réductions pour plusieurs stands ?',
                reponse: 'Oui, nous offrons des tarifs dégressifs pour la location de plusieurs stands. Contactez-nous pour un devis personnalisé.',
              },
            ].map((faq, index) => (
              <Card 
                key={index}
                className="p-6 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="text-lg font-bold text-primary mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.reponse}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

