import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Repair Services',
  description: 'Full-service auto repair in Santa Cruz, CA. Engine diagnostics, brake repair, transmission service, AC & heating, oil changes. European, domestic & foreign vehicles. 12-month warranty. Call (831) 429-2096.',
  keywords: [
    'auto repair services Santa Cruz', 'brake repair Santa Cruz CA', 'engine diagnostics Santa Cruz',
    'transmission repair Santa Cruz', 'oil change Santa Cruz', 'AC repair car Santa Cruz',
    'European car repair Santa Cruz', 'foreign car mechanic Santa Cruz',
  ],
  alternates: {
    canonical: 'https://rpmautomotivesc.com/servicios',
  },
  openGraph: {
    title: 'Auto Repair Services | RPM Automotive Santa Cruz',
    description: 'Engine diagnostics, brake repair, transmission service & more. 12-month warranty on parts & labor. Santa Cruz, CA.',
    url: 'https://rpmautomotivesc.com/servicios',
    type: 'website',
  },
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
