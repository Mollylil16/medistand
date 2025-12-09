import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MediStand Africa - Location de Stands pour Congrès Médicaux',
  description: 'MediStand Africa propose des stands professionnels pour congrès médicaux, salons et événements scientifiques en Côte d\'Ivoire. La structure qui valorise votre visibilité.',
  keywords: 'stand médical, stand exposition, stand congrès, location stand Abidjan, congrès médical Côte d\'Ivoire, exposition pharmaceutique',
  authors: [{ name: 'MediStand Africa' }],
  icons: {
    icon: '/logo.jpg',
    shortcut: '/logo.jpg',
    apple: '/logo.jpg',
  },
  openGraph: {
    title: 'MediStand Africa - Location de Stands pour Congrès Médicaux',
    description: 'Solutions professionnelles pour vos événements médicaux et scientifiques',
    type: 'website',
    locale: 'fr_CI',
    siteName: 'MediStand Africa',
    images: [
      {
        url: '/logo.jpg',
        width: 512,
        height: 512,
        alt: 'MediStand Africa Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-gray-50`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

