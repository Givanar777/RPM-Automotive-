import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - 24+ Years Serving Santa Cruz',
  description: 'Meet the team behind RPM Automotive. Founded in 1999 by Jose Trinidad Rios, we have over 24 years of trusted auto repair experience in Santa Cruz, CA. Honest service, fair prices.',
  keywords: [
    'about RPM Automotive', 'Jose Trinidad Rios mechanic', 'auto repair history Santa Cruz',
    'trusted mechanic Santa Cruz CA', 'family owned auto shop Santa Cruz',
  ],
  alternates: {
    canonical: 'https://rpmautomotivesc.com/nosotros',
  },
  openGraph: {
    title: 'About RPM Automotive | 24+ Years in Santa Cruz',
    description: 'Founded in 1999 by Jose Trinidad Rios. Over 24 years of honest, reliable auto repair in Santa Cruz, CA.',
    url: 'https://rpmautomotivesc.com/nosotros',
    type: 'website',
    images: [{ url: 'https://rpmautomotivesc.com/founder.jpg', alt: 'Jose Trinidad Rios - Founder of RPM Automotive' }],
  },
};

export default function NosotrosLayout({ children }: { children: React.ReactNode }) {
  return children;
}
