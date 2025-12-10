'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  className,
}) => {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  };

  const [mounted, setMounted] = React.useState(false);

  // Empêcher le scroll du body quand le modal est ouvert
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (isOpen) {
      // Sauvegarder la position du scroll
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      // Bloquer le scroll de manière plus agressive
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = `-${scrollX}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.top = `-${scrollY}px`;
      document.documentElement.style.left = `-${scrollX}px`;
      document.documentElement.style.width = '100%';
      
      // Empêcher le scroll avec les touches
      const preventScroll = (e: WheelEvent | TouchEvent) => {
        e.preventDefault();
      };
      
      window.addEventListener('wheel', preventScroll, { passive: false });
      window.addEventListener('touchmove', preventScroll, { passive: false });
      
      return () => {
        // Restaurer le scroll
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.position = '';
        document.documentElement.style.top = '';
        document.documentElement.style.left = '';
        document.documentElement.style.width = '';
        
        window.removeEventListener('wheel', preventScroll);
        window.removeEventListener('touchmove', preventScroll);
        
        window.scrollTo(scrollX, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{ overscrollBehavior: 'contain' }}
    >
      <div
        className={cn(
          'bg-white rounded-2xl shadow-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col animate-scale-in',
          sizeClasses[size],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Sticky */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b-2 border-gray-200 bg-gradient-to-r from-primary/10 to-accent/10 sticky top-0 z-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-primary pr-4">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-all min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0 hover:scale-110"
            aria-label="Fermer"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Content - Scrollable avec scrollbar personnalisée */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8" style={{ scrollbarWidth: 'thin', scrollbarColor: '#1e40af #f3f4f6' }}>
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

