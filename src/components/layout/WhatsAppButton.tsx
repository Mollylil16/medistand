'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { contactInfo } from '@/constants/navigation';

export const WhatsAppButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      'Bonjour MediStand Africa, je souhaite obtenir plus d\'informations sur vos stands pour congrès médicaux.'
    );
    window.open(`https://wa.me/${contactInfo.whatsapp}?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-4 bg-white rounded-lg shadow-2xl p-4 w-64 animate-fade-in-up">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h4 className="font-bold text-primary">Besoin d'aide ?</h4>
              <p className="text-sm text-gray-600">Nous sommes là pour vous</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            Discutons de votre projet d'exposition sur WhatsApp
          </p>
          <button
            onClick={openWhatsApp}
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-2 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <MessageCircle size={18} />
            <span>Démarrer la discussion</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse-slow"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

