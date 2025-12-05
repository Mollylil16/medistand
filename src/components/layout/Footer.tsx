import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';
import { contactInfo, navigationItems, socialLinks } from '@/constants/navigation';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary via-primary-700 to-primary-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-white rounded-lg p-1">
                <Image
                  src="/logo.jpg"
                  alt="MediStand Africa Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-bold">MediStand Africa</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Votre partenaire de confiance pour des stands professionnels aux congrès médicaux et événements scientifiques en Côte d'Ivoire.
            </p>
            <div className="text-accent font-semibold italic text-sm">
              "La structure qui valorise votre visibilité"
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">Navigation Rapide</h3>
            <ul className="space-y-3">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-accent transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-accent transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {item.nom}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm">
                <Phone size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href={`tel:${contactInfo.telephone}`} className="hover:text-accent transition-colors">
                    {contactInfo.telephone}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Mail size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-accent transition-colors break-all">
                    {contactInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <MapPin size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  {contactInfo.adresse}
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Clock size={18} className="text-accent mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  {contactInfo.horaires}
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-accent">Restez Connecté</h3>
            <p className="text-gray-300 text-sm mb-4">
              Suivez-nous sur les réseaux sociaux pour nos dernières actualités.
            </p>
            <div className="flex space-x-3 mb-6">
              <a
                href={socialLinks.facebook}
                className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={socialLinks.linkedin}
                className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={socialLinks.twitter}
                className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href={socialLinks.instagram}
                className="w-10 h-10 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
            <Link
              href="/contact"
              className="inline-block w-full px-6 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg text-center transition-all duration-300 hover:shadow-xl text-sm"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
            <div className="mb-4 md:mb-0">
              © {currentYear} MediStand Africa. Tous droits réservés.
            </div>
            <div className="flex space-x-6">
              <Link href="/mentions-legales" className="hover:text-accent transition-colors">
                Mentions légales
              </Link>
              <Link href="/politique-confidentialite" className="hover:text-accent transition-colors">
                Confidentialité
              </Link>
              <Link href="/cgv" className="hover:text-accent transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

