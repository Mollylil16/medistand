import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, FileText, Mail, Phone, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { contactInfo } from '@/constants/navigation';

export const metadata = {
  title: 'Politique de Confidentialité - MediStand Africa',
  description: 'Politique de confidentialité et protection des données personnelles de MediStand Africa.',
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4 animate-fade-in-up">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Politique de Confidentialité
            </h1>
            <p className="text-lg text-gray-200">
              Protection de vos données personnelles
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Introduction */}
            <Card className="p-8 animate-fade-in-up">
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Introduction</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-primary">MediStand Africa</strong> accorde une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons, stockons et protégeons vos informations personnelles.
                </p>
                <p>
                  En utilisant notre site web et nos services, vous acceptez les pratiques décrites dans cette politique de confidentialité.
                </p>
              </div>
            </Card>

            {/* Données collectées */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <Database className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Données collectées</h2>
              </div>
              
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-bold text-primary mb-3">1. Données d'identification</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Nom et prénom</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                    <li>Entreprise / Organisation</li>
                    <li>Fonction</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-primary mb-3">2. Données de réservation</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Dates de l'événement</li>
                    <li>Lieu de l'événement</li>
                    <li>Type de stand souhaité</li>
                    <li>Options et équipements sélectionnés</li>
                    <li>Messages et demandes spécifiques</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-primary mb-3">3. Données de navigation</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Adresse IP</li>
                    <li>Type de navigateur</li>
                    <li>Pages visitées</li>
                    <li>Durée de visite</li>
                    <li>Source de référence</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Utilisation des données */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Utilisation des données</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Vos données personnelles sont collectées et utilisées pour :</p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Traiter vos demandes</strong> de devis, réservations et demandes de contact</li>
                  <li><strong>Communiquer avec vous</strong> concernant nos services et vos réservations</li>
                  <li><strong>Améliorer nos services</strong> et l'expérience utilisateur</li>
                  <li><strong>Envoyer notre newsletter</strong> (avec votre consentement)</li>
                  <li><strong>Réaliser des statistiques</strong> de fréquentation et d'utilisation</li>
                  <li><strong>Respecter nos obligations légales</strong> et réglementaires</li>
                  <li><strong>Prévenir la fraude</strong> et assurer la sécurité de notre site</li>
                </ul>

                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg mt-6">
                  <p className="text-sm">
                    <strong className="text-primary">Important :</strong> Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins commerciales sans votre consentement explicite.
                  </p>
                </div>
              </div>
            </Card>

            {/* Durée de conservation */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Durée de conservation</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Vos données personnelles sont conservées pendant une durée qui n'excède pas celle nécessaire aux finalités pour lesquelles elles sont collectées et traitées :</p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
                  <li><strong>Données de réservation :</strong> Durée de la prestation + 5 ans (obligations comptables)</li>
                  <li><strong>Newsletter :</strong> Jusqu'à désinscription</li>
                  <li><strong>Cookies :</strong> 13 mois maximum</li>
                </ul>
              </div>
            </Card>

            {/* Vos droits */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <UserCheck className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Vos droits</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Conformément à la législation en vigueur, vous disposez des droits suivants :</p>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <strong className="text-primary">✓ Droit d'accès :</strong> Obtenir une copie de vos données personnelles
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <strong className="text-primary">✓ Droit de rectification :</strong> Corriger vos données inexactes ou incomplètes
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <strong className="text-primary">✓ Droit à l'effacement :</strong> Demander la suppression de vos données
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <strong className="text-primary">✓ Droit d'opposition :</strong> Vous opposer au traitement de vos données
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <strong className="text-primary">✓ Droit à la portabilité :</strong> Récupérer vos données dans un format structuré
                  </div>
                </div>

                <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg mt-6">
                  <p className="font-semibold text-primary mb-2">Pour exercer vos droits :</p>
                  <p>Contactez-nous par email à <a href={`mailto:${contactInfo.email}`} className="text-accent hover:underline font-semibold">{contactInfo.email}</a></p>
                  <p className="text-sm mt-2">Nous vous répondrons dans un délai maximum de 30 jours.</p>
                </div>
              </div>
            </Card>

            {/* Sécurité */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <Lock className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Sécurité des données</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  MediStand Africa met en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre :
                </p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>La perte accidentelle</li>
                  <li>L'utilisation non autorisée</li>
                  <li>L'accès non autorisé</li>
                  <li>La divulgation non autorisée</li>
                  <li>L'altération</li>
                </ul>

                <p>
                  Les données sont hébergées sur des serveurs sécurisés et transmises via des connexions cryptées (HTTPS/SSL).
                </p>
              </div>
            </Card>

            {/* Cookies */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6">Cookies</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Notre site utilise des cookies pour améliorer votre expérience de navigation et analyser l'utilisation du site.
                </p>
                
                <div>
                  <h3 className="font-bold text-primary mb-2">Types de cookies utilisés :</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site</li>
                    <li><strong>Cookies analytiques :</strong> Pour comprendre l'utilisation du site (Google Analytics)</li>
                    <li><strong>Cookies de préférence :</strong> Pour mémoriser vos choix</li>
                  </ul>
                </div>

                <p>
                  Vous pouvez à tout moment désactiver les cookies via les paramètres de votre navigateur. Toutefois, cela peut affecter certaines fonctionnalités du site.
                </p>
              </div>
            </Card>

            {/* Modifications */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6">Modifications de la politique</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  MediStand Africa se réserve le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour.
                </p>
                <p>
                  Nous vous encourageons à consulter régulièrement cette page pour rester informé de nos pratiques en matière de protection des données.
                </p>
              </div>
            </Card>

            {/* Contact */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/10 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <Mail className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Questions sur la confidentialité ?</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Si vous avez des questions concernant cette politique de confidentialité ou le traitement de vos données personnelles, n'hésitez pas à nous contacter :
                </p>
                
                <div className="bg-white p-6 rounded-lg space-y-3">
                  <div className="flex items-center space-x-3">
                    <Mail className="text-accent" size={20} />
                    <a href={`mailto:${contactInfo.email}`} className="text-accent hover:underline font-semibold">
                      {contactInfo.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="text-accent" size={20} />
                    <a href={`tel:${contactInfo.telephone}`} className="text-accent hover:underline font-semibold">
                      {contactInfo.telephone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Building2 className="text-accent" size={20} />
                    <span>{contactInfo.adresse}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Date de mise à jour */}
            <div className="text-center text-sm text-gray-500 pt-8">
              <p>Dernière mise à jour : Novembre 2024</p>
              <p className="mt-2">Version 1.0</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto p-12 text-center bg-gradient-to-br from-primary/5 to-secondary/5">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Vos données sont en sécurité
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              MediStand Africa s'engage à protéger votre vie privée et la confidentialité de vos informations.
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contactez-nous
            </a>
          </Card>
        </div>
      </section>
    </div>
  );
}

