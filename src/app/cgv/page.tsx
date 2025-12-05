import React from 'react';
import { FileText, AlertCircle, CreditCard, Package, RefreshCcw, Scale } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { contactInfo } from '@/constants/navigation';

export const metadata = {
  title: 'Conditions Générales de Vente - MediStand Africa',
  description: 'Conditions générales de vente et de location de stands MediStand Africa.',
};

export default function CGVPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4 animate-fade-in-up">
            <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Conditions Générales de Vente
            </h1>
            <p className="text-lg text-gray-200">
              Conditions applicables à nos services de location
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
                <FileText className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Préambule</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre <strong className="text-primary">MediStand Africa</strong>, ci-après dénommée "le Prestataire", et toute personne physique ou morale, ci-après dénommée "le Client", souhaitant louer des stands pour congrès médicaux et événements scientifiques.
                </p>
                <p>
                  Toute commande de prestation implique l'acceptation sans réserve des présentes CGV.
                </p>
              </div>
            </Card>

            {/* Article 1 - Objet */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6">Article 1 - Objet</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la location de stands professionnels, ainsi que les services annexes proposés par MediStand Africa.
                </p>
                <p>Nos prestations comprennent notamment :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Location de stands modulaires</li>
                  <li>Transport et installation</li>
                  <li>Personnalisation selon les besoins du client</li>
                  <li>Maintenance technique pendant l'événement</li>
                  <li>Démontage et enlèvement</li>
                </ul>
              </div>
            </Card>

            {/* Article 2 - Devis et commande */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6">Article 2 - Devis et Commande</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="font-bold text-primary">2.1 - Devis</h3>
                <p>
                  Tout devis établi par MediStand Africa est valable <strong>30 jours</strong> à compter de sa date d'émission. Au-delà de ce délai, les tarifs sont susceptibles d'être révisés.
                </p>

                <h3 className="font-bold text-primary mt-6">2.2 - Commande</h3>
                <p>
                  La commande n'est définitive qu'après signature du devis par le Client et versement de l'acompte prévu à l'article 3.
                </p>

                <h3 className="font-bold text-primary mt-6">2.3 - Délai de réservation</h3>
                <p>
                  Toute réservation doit être effectuée au minimum <strong>15 jours avant la date de l'événement</strong> pour garantir la disponibilité et la qualité de la prestation.
                </p>
              </div>
            </Card>

            {/* Article 3 - Tarifs et modalités de paiement */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Article 3 - Tarifs et Modalités de Paiement</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="font-bold text-primary">3.1 - Tarifs</h3>
                <p>
                  Les tarifs sont exprimés en Francs CFA (FCFA) hors taxes. La TVA au taux en vigueur sera ajoutée le cas échéant.
                </p>

                <h3 className="font-bold text-primary mt-6">3.2 - Modalités de paiement</h3>
                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
                  <ul className="space-y-2">
                    <li><strong>• Acompte :</strong> 50% à la signature du devis</li>
                    <li><strong>• Solde :</strong> 50% avant la livraison du stand (48h minimum avant l'événement)</li>
                  </ul>
                </div>

                <h3 className="font-bold text-primary mt-6">3.3 - Moyens de paiement acceptés</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Virement bancaire</li>
                  <li>Mobile Money (Orange Money, MTN Money, Moov Money)</li>
                  <li>Chèque (sous réserve d'encaissement)</li>
                  <li>Espèces (pour les montants inférieurs à 500 000 FCFA)</li>
                </ul>

                <h3 className="font-bold text-primary mt-6">3.4 - Retard de paiement</h3>
                <p>
                  En cas de retard de paiement, des pénalités de <strong>1,5% par mois</strong> seront appliquées automatiquement. Une indemnité forfaitaire de <strong>10 000 FCFA</strong> pour frais de recouvrement sera également due.
                </p>
              </div>
            </Card>

            {/* Article 4 - Livraison et installation */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <Package className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Article 4 - Livraison et Installation</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="font-bold text-primary">4.1 - Délai de livraison</h3>
                <p>
                  Le stand sera livré et installé selon les dates convenues dans le devis. Le Client s'engage à fournir toutes les informations nécessaires (plan de l'événement, horaires d'accès, etc.).
                </p>

                <h3 className="font-bold text-primary mt-6">4.2 - Accès au lieu d'installation</h3>
                <p>
                  Le Client doit garantir l'accès libre au lieu d'installation et veiller à ce que les conditions d'installation soient conformes (électricité, espace suffisant, etc.).
                </p>

                <h3 className="font-bold text-primary mt-6">4.3 - Réception</h3>
                <p>
                  Le Client ou son représentant doit être présent lors de l'installation pour vérifier la conformité du stand. Toute réserve doit être formulée par écrit immédiatement.
                </p>
              </div>
            </Card>

            {/* Article 5 - Obligations du client */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Article 5 - Obligations du Client</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>Le Client s'engage à :</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Utiliser le stand conformément à sa destination</li>
                  <li>Ne pas modifier la structure sans autorisation</li>
                  <li>Maintenir le stand en bon état</li>
                  <li>Restituer le stand dans l'état initial</li>
                  <li>Souscrire une assurance couvrant les dommages éventuels</li>
                  <li>Respecter les consignes de sécurité</li>
                </ul>

                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mt-6">
                  <p className="text-red-800">
                    <strong>⚠️ Important :</strong> Toute dégradation, perte ou vol sera facturé au Client au prix de remplacement du matériel endommagé.
                  </p>
                </div>
              </div>
            </Card>

            {/* Article 6 - Assurance et responsabilité */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <AlertCircle className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Article 6 - Assurance et Responsabilité</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="font-bold text-primary">6.1 - Assurance du Prestataire</h3>
                <p>
                  MediStand Africa est assuré pour ses activités de location et d'installation de stands auprès d'une compagnie d'assurance agréée en Côte d'Ivoire.
                </p>

                <h3 className="font-bold text-primary mt-6">6.2 - Responsabilité du Client</h3>
                <p>
                  Le Client est responsable du matériel loué pendant toute la durée de la location. Il est fortement recommandé de souscrire une assurance couvrant :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Les dommages au stand</li>
                  <li>Le vol ou la perte d'équipements</li>
                  <li>Les dommages causés à des tiers</li>
                </ul>

                <h3 className="font-bold text-primary mt-6">6.3 - Limitation de responsabilité</h3>
                <p>
                  MediStand Africa ne peut être tenu responsable des pertes d'exploitation, manque à gagner ou tout autre préjudice indirect résultant d'un retard ou d'un défaut de prestation en cas de force majeure.
                </p>
              </div>
            </Card>

            {/* Article 7 - Annulation et modification */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '700ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <RefreshCcw className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Article 7 - Annulation et Modification</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="font-bold text-primary">7.1 - Annulation par le Client</h3>
                <div className="bg-accent/10 p-6 rounded-lg space-y-3">
                  <p><strong>• Plus de 30 jours avant :</strong> Remboursement de 80% de l'acompte</p>
                  <p><strong>• Entre 15 et 30 jours avant :</strong> Remboursement de 50% de l'acompte</p>
                  <p><strong>• Moins de 15 jours avant :</strong> Aucun remboursement</p>
                </div>

                <h3 className="font-bold text-primary mt-6">7.2 - Modification de commande</h3>
                <p>
                  Toute modification de commande doit être notifiée par écrit au moins <strong>10 jours avant</strong> l'événement. Des frais de modification peuvent s'appliquer.
                </p>

                <h3 className="font-bold text-primary mt-6">7.3 - Annulation par le Prestataire</h3>
                <p>
                  En cas d'annulation par MediStand Africa (force majeure, indisponibilité du matériel), le Client sera remboursé intégralement sans indemnité supplémentaire.
                </p>
              </div>
            </Card>

            {/* Article 8 - Force majeure */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6">Article 8 - Force Majeure</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Constituent des cas de force majeure, outre ceux habituellement retenus par la jurisprudence :
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Catastrophes naturelles</li>
                  <li>Incendie, inondation</li>
                  <li>Grèves affectant les transports</li>
                  <li>Décision gouvernementale (confinement, interdiction de rassemblement)</li>
                  <li>Guerre, émeutes</li>
                </ul>
                <p>
                  En cas de force majeure, les obligations des parties sont suspendues sans donner lieu à indemnisation.
                </p>
              </div>
            </Card>

            {/* Article 9 - Protection des données */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '900ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6">Article 9 - Protection des Données Personnelles</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Les données personnelles collectées sont nécessaires au traitement de votre commande et sont traitées conformément à notre <a href="/politique-confidentialite" className="text-accent hover:underline font-semibold">Politique de Confidentialité</a>.
                </p>
                <p>
                  Vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à : <a href={`mailto:${contactInfo.email}`} className="text-accent hover:underline">{contactInfo.email}</a>
                </p>
              </div>
            </Card>

            {/* Article 10 - Droit applicable */}
            <Card className="p-8 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
              <div className="flex items-center space-x-3 mb-6">
                <Scale className="text-accent" size={28} />
                <h2 className="text-2xl font-bold text-primary">Article 10 - Droit Applicable et Litiges</h2>
              </div>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <h3 className="font-bold text-primary">10.1 - Droit applicable</h3>
                <p>
                  Les présentes CGV sont régies par le droit ivoirien.
                </p>

                <h3 className="font-bold text-primary mt-6">10.2 - Règlement des litiges</h3>
                <p>
                  En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, le litige sera porté devant les tribunaux compétents d'<strong className="text-primary">Abidjan, Côte d'Ivoire</strong>.
                </p>
              </div>
            </Card>

            {/* Date et acceptation */}
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/10 animate-fade-in-up" style={{ animationDelay: '1100ms' }}>
              <h2 className="text-2xl font-bold text-primary mb-6 text-center">Acceptation des CGV</h2>
              
              <div className="space-y-4 text-gray-700 leading-relaxed text-center">
                <p>
                  En passant commande auprès de MediStand Africa, le Client reconnaît avoir pris connaissance des présentes Conditions Générales de Vente et les accepter sans réserve.
                </p>
                <div className="text-sm text-gray-500 pt-4">
                  <p>Version en vigueur au : <strong>Novembre 2024</strong></p>
                  <p className="mt-2">Dernière mise à jour : Novembre 2024</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary">
              Des questions sur nos CGV ?
            </h2>
            <p className="text-lg text-gray-700">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact">
                <Button size="lg">
                  Contactez-nous
                </Button>
              </a>
              <a href="/tarifs">
                <Button size="lg" variant="secondary">
                  Demander un devis
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

