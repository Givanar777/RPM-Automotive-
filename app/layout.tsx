import type {Metadata} from 'next';
import { Inter, Arimo, Public_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const arimo = Arimo({
  subsets: ['latin'],
  variable: '--font-arimo',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-public-sans',
});

export const metadata: Metadata = {
  title: 'RPM Automotive | Reliable Automotive Repair & Diagnostics in Milpitas, CA',
  description: 'Expert service you can trust. ASE-certified mechanics, same-day diagnostics, and a 24-month warranty on parts and labor.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${arimo.variable} ${publicSans.variable}`}>
      <body suppressHydrationWarning className="bg-[#fcf9f8] text-[#1c1b1b] font-inter">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
