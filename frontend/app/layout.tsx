import type {Metadata} from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'RPM Automotive | Reliable Automotive Repair & Diagnostics in Santa Cruz, CA',
  description: 'Expert service you can trust. Experienced mechanics, same-day diagnostics, and a 12-month warranty on parts and labor. Call (831) 429-2096.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning className="bg-white text-zinc-900 font-dm-sans antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
