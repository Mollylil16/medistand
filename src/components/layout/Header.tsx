'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { navigationItems, contactInfo } from '@/constants/navigation';
import { cn } from '@/lib/utils';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <a href={`tel:${contactInfo.telephone}`} className="flex items-center space-x-2 hover:text-accent transition-colors">
                <Phone size={16} />
                <span>{contactInfo.telephone}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center space-x-2 hover:text-accent transition-colors">
                <Mail size={16} />
                <span>{contactInfo.email}</span>
              </a>
            </div>
            <div className="text-gray-300">
              {contactInfo.horaires}
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white shadow-lg py-3'
            : 'bg-white/95 backdrop-blur-sm py-4'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-12 h-12 transition-transform group-hover:scale-110">
                <Image
                  src="/logo.jpg"
                  alt="MediStand Africa Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <div className="text-xl font-bold text-primary">MediStand Africa</div>
                <div className="text-xs text-gray-600">La structure qui valorise votre visibilité</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                    pathname === item.href
                      ? 'text-accent bg-accent/10'
                      : 'text-gray-700 hover:text-accent hover:bg-gray-50'
                  )}
                >
                  {item.nom}
                </Link>
              ))}
              <a
                href="/tarifs"
                className="ml-4 px-6 py-2 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Demander un Devis
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-primary hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg font-medium transition-all duration-300',
                    pathname === item.href
                      ? 'text-accent bg-accent/10'
                      : 'text-gray-700 hover:text-accent hover:bg-gray-50'
                  )}
                >
                  {item.nom}
                </Link>
              ))}
              <a
                href="/tarifs"
                className="px-4 py-3 bg-accent text-white font-semibold rounded-lg text-center transition-colors hover:bg-accent-dark"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demander un Devis
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

