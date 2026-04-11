import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact RPM Automotive in Santa Cruz, CA. Call (831) 429-2096 or visit us at 110 Stanford Ave, Santa Cruz CA 95062. Mon-Fri 8AM-5PM, Sat 8AM-1PM.',
  keywords: [
    'contact RPM Automotive', 'auto repair phone number Santa Cruz', 'mechanic near me Santa Cruz',
    'auto shop address Santa Cruz CA', '110 Stanford Ave Santa Cruz',
  ],
  alternates: {
    canonical: 'https://rpmautomotivesc.com/contacto',
  },
  openGraph: {
    title: 'Contact RPM Automotive | Santa Cruz, CA',
    description: 'Call (831) 429-2096 or visit 110 Stanford Ave, Santa Cruz CA 95062. Mon-Fri 8AM-5PM, Sat 8AM-1PM.',
    url: 'https://rpmautomotivesc.com/contacto',
    type: 'website',
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
