export default function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'RPM Automotive',
    description: 'Trusted auto repair and diagnostics shop in Santa Cruz, CA. Over 24 years of experience serving the community with honest, reliable service.',
    url: 'https://rpmautomotivesc.com',
    telephone: '+1-831-429-2096',
    email: 'contact@rpmautomotivesc.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '110 Stanford Ave.',
      addressLocality: 'Santa Cruz',
      addressRegion: 'CA',
      postalCode: '95062',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.9741,
      longitude: -122.0308,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '13:00',
      },
    ],
    image: 'https://rpmautomotivesc.com/founder.jpg',
    logo: 'https://rpmautomotivesc.com/logo.webp',
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
    areaServed: [
      { '@type': 'City', name: 'Santa Cruz' },
      { '@type': 'City', name: 'Capitola' },
      { '@type': 'City', name: 'Scotts Valley' },
      { '@type': 'City', name: 'Watsonville' },
      { '@type': 'City', name: 'Salinas' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Auto Repair Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Engine Diagnostics' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brake Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transmission Service' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'AC & Heating Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Oil Change' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'European Car Repair' } },
      ],
    },
    founder: {
      '@type': 'Person',
      name: 'Jose Trinidad Rios',
      jobTitle: 'Founder & Master Mechanic',
    },
    foundingDate: '1999',
    slogan: 'Expert Automotive Care You Can Trust',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
