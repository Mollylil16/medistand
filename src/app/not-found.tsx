import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary mb-4 animate-fade-in">404</h1>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in-up">
          Page non trouvée
        </h2>
        <p className="text-xl text-gray-600 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <Link href="/">
            <Button size="lg">
              <Home size={20} className="mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
          <Link href="/stands">
            <Button variant="secondary" size="lg">
              <Search size={20} className="mr-2" />
              Voir nos stands
            </Button>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Pages populaires :</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/stands" className="text-primary hover:text-accent transition-colors">
              Nos Stands
            </Link>
            <Link href="/services" className="text-primary hover:text-accent transition-colors">
              Services
            </Link>
            <Link href="/reservation" className="text-primary hover:text-accent transition-colors">
              Réservation
            </Link>
            <Link href="/contact" className="text-primary hover:text-accent transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

