import type {Metadata} from 'next';
import { Outfit, DM_Sans } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import LocalBusinessJsonLd from '@/components/LocalBusinessJsonLd';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
});

const SITE_URL = 'https://rpmautomotivesc.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'RPM Automotive | Auto Repair & Diagnostics in Santa Cruz, CA',
    template: '%s | RPM Automotive Santa Cruz',
  },
  description: 'Trusted auto repair shop in Santa Cruz, CA. 24+ years experience, same-day diagnostics, 12-month warranty on parts & labor. European, domestic & foreign vehicles. Call (831) 429-2096.',
  keywords: [
    'auto repair Santa Cruz', 'car mechanic Santa Cruz CA', 'brake repair Santa Cruz',
    'oil change Santa Cruz', 'engine diagnostics Santa Cruz', 'transmission repair Santa Cruz',
    'European car repair Santa Cruz', 'RPM Automotive', 'mechanic near me Santa Cruz',
    'auto shop Santa Cruz CA', 'car service Santa Cruz', 'check engine light Santa Cruz',
  ],
  authors: [{ name: 'RPM Automotive' }],
  creator: 'RPM Automotive',
  publisher: 'RPM Automotive',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_US',
    url: SITE_URL,
    siteName: 'RPM Automotive',
    title: 'RPM Automotive | Trusted Auto Repair in Santa Cruz, CA',
    description: 'Expert auto repair & diagnostics in Santa Cruz. 24+ years experience, 12-month warranty, same-day service. Call (831) 429-2096.',
    images: [
      {
        url: `${SITE_URL}/logo.webp`,
        width: 400,
        height: 128,
        alt: 'RPM Automotive - Auto Repair Santa Cruz CA',
      },
      {
        url: `${SITE_URL}/founder.jpg`,
        width: 800,
        height: 600,
        alt: 'Jose Trinidad Rios - Founder of RPM Automotive, Santa Cruz CA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RPM Automotive | Auto Repair & Diagnostics Santa Cruz, CA',
    description: 'Trusted auto repair in Santa Cruz. 24+ years, 12-month warranty, same-day diagnostics. Call (831) 429-2096.',
    images: [`${SITE_URL}/founder.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {},
  icons: {
    icon: '/logo.webp',
    apple: '/logo.webp',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${outfit.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning className="bg-white text-zinc-900 font-dm-sans antialiased">
        <LocalBusinessJsonLd />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
