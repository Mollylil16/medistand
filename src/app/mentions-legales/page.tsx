import React from 'react';
import { Scale, Building2, Mail, Phone, FileText } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { contactInfo } from '@/constants/navigation';

export const metadata = {
  title: 'Mentions Légales - MediStand Africa',
  description: 'Mentions légales du site MediStand Africa - Informations légales et juridiques.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4 animate-fade-in-up">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Scale size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Mentions Légales
            </h1>
            <p className="text-lg text-gray-200">
              Informations légales et juridiques
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Éditeur du site */}
            <Card className="p-8 animate-fade-in-up">
              <div className="flex items-center space-x-3 mb-6">
                <Building2 className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Éditeur du site</h2>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <p><strong className="text-primary">Raison sociale :</strong> MediStand Africa</p>
                <p><strong className="text-primary">Forme juridique :</strong> Entreprise individuelle / SARL (à préciser)</p>
                <p><strong className="text-primary">Siège social :</strong> {contactInfo.adresse}</p>
                <p><strong className="text-primary">Email :</strong> <a href={`mailto:${contactInfo.email}`} className="text-accent hover:underline">{contactInfo.email}</a></p>
                <p><strong className="text-primary">Téléphone :</strong> <a href={`tel:${contactInfo.telephone}`} className="text-accent hover:underline">{contactInfo.telephone}</a></p>
                <p><strong className="text-primary">Numéro d'immatriculation :</strong> [À compléter - N° RC]</p>
                <p><strong className="text-primary">Activité :</strong> Location de stands professionnels pour congrès médicaux et événements scientifiques</p>
              </div>
            </Card>

            {/* Directeur de publication */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Directeur de publication</h2>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <p><strong className="text-primary">Nom :</strong> [À compléter - Nom du fondateur/directeur]</p>
                <p><strong className="text-primary">Qualité :</strong> Gérant / Directeur Général</p>
              </div>
            </Card>

            {/* Hébergement */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <Building2 className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Hébergement du site</h2>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <p><strong className="text-primary">Hébergeur :</strong> [Nom de l'hébergeur - à compléter]</p>
                <p><strong className="text-primary">Raison sociale :</strong> [À compléter]</p>
                <p><strong className="text-primary">Adresse :</strong> [Adresse de l'hébergeur - à compléter]</p>
                <p><strong className="text-primary">Téléphone :</strong> [Téléphone - à compléter]</p>
                <p><strong className="text-primary">Site web :</strong> [URL de l'hébergeur - à compléter]</p>
              </div>
              
              <div className="mt-6 bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  <strong className="text-primary">Note :</strong> Ces informations seront complétées dès la souscription de l'hébergement web.
                </p>
              </div>
            </Card>

            {/* Conception */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Conception et développement</h2>
              </div>
              
              <div className="space-y-3 text-gray-700">
                <p><strong className="text-primary">Développeur :</strong> Brunell Omepieu</p>
                <p><strong className="text-primary">Email technique :</strong> <a href="mailto:brunellomepieu01@gmail.com" className="text-accent hover:underline">brunellomepieu01@gmail.com</a></p>
              </div>
            </Card>

            {/* Propriété intellectuelle */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6">Propriété intellectuelle</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  L'ensemble du contenu de ce site (textes, images, logos, graphismes, photographies, vidéos, etc.) est la propriété exclusive de <strong className="text-primary">MediStand Africa</strong> ou de ses partenaires.
                </p>
                <p>
                  Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de MediStand Africa.
                </p>
                <p>
                  Le nom "MediStand Africa", le logo et la baseline "La structure qui valorise votre visibilité" sont des marques déposées.
                </p>
              </div>
            </Card>

            {/* Limitation de responsabilité */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6">Limitation de responsabilité</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  MediStand Africa s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, mais ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
                </p>
                <p>
                  MediStand Africa ne pourra être tenue responsable des dommages directs ou indirects résultant de l'accès au site ou de l'utilisation du site, y compris l'inaccessibilité, les pertes de données, détériorations, destructions ou virus qui pourraient affecter l'équipement informatique de l'utilisateur.
                </p>
                <p>
                  Les tarifs affichés sur le site sont donnés à titre indicatif et peuvent être modifiés sans préavis. Seul le devis écrit fait foi.
                </p>
              </div>
            </Card>

            {/* Liens hypertextes */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6">Liens hypertextes</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Le site peut contenir des liens hypertextes vers d'autres sites. MediStand Africa n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
                <p>
                  La création de liens hypertextes vers ce site est soumise à l'accord préalable de MediStand Africa.
                </p>
              </div>
            </Card>

            {/* Droit applicable */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6">Droit applicable et juridiction</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Les présentes mentions légales sont régies par le droit ivoirien.
                </p>
                <p>
                  En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux compétents de <strong className="text-primary">Abidjan, Côte d'Ivoire</strong>.
                </p>
              </div>
            </Card>

            {/* Date de mise à jour */}
            <div className="text-center text-sm text-gray-500 pt-8">
              <p>Dernière mise à jour : Novembre 2024</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

