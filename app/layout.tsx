import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://copilo.tech'),
  title: {
    default: 'Copilo — Tu conduis, Copilo gère l\'administratif de A à Z',
    template: '%s | Copilo',
  },
  description:
    'Copilo décroche au téléphone, prend les réservations, gère les bons de transport, le calendrier et les exports CPAM pour les chauffeurs de taxi et VTC. Tu conduis, Copilo gère le reste — 100 % européen, chiffré de bout en bout, sur Telegram.',
  keywords: [
    'assistant administratif taxi', 'secrétariat téléphonique taxi', 'gestion administrative VTC',
    'répondre aux appels en conduisant', 'Copilo', 'bot Telegram taxi', 'réservation automatique taxi',
    'gestion bons de transport', 'export CPAM taxi', 'RGPD taxi', 'paperasse chauffeur',
  ],
  authors: [{ name: 'Copilo', url: 'https://copilo.tech' }],
  creator: 'Copilo',
  openGraph: {
    title: 'Copilo — Tu conduis, Copilo gère l\'administratif de A à Z',
    description:
      'Copilo décroche au téléphone, prend les réservations, gère tes bons de transport, ton calendrier et tes exports CPAM. Tu conduis, Copilo gère le reste — sur Telegram.',
    url: 'https://copilo.tech',
    siteName: 'Copilo',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Copilo — Tu conduis, Copilo gère l\'administratif' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copilo — Tu conduis, Copilo gère l\'administratif de A à Z',
    description: 'Téléphone, réservations, bons de transport, calendrier, exports CPAM. Tu conduis, Copilo gère le reste — sur Telegram.',
    images: ['/og-image.png'],
    creator: '@CopiloBotFR',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large', 'max-video-preview': -1 },
  },
  alternates: { canonical: 'https://copilo.tech' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://copilo.tech/#website',
      url: 'https://copilo.tech',
      name: 'Copilo',
      description: 'Tu conduis, Copilo gère l\'administratif de A à Z pour les chauffeurs de taxi et VTC',
      inLanguage: 'fr-FR',
    },
    {
      '@type': 'Organization',
      '@id': 'https://copilo.tech/#org',
      name: 'Copilo',
      url: 'https://copilo.tech',
      logo: 'https://copilo.tech/images/logo.png',
      sameAs: ['https://t.me/Copilo_TaxiBot'],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://copilo.tech/#app',
      name: 'Copilo',
      operatingSystem: 'Telegram',
      applicationCategory: 'BusinessApplication',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR', description: '3 mois gratuits' },
      description:
        'Assistant administratif IA pour chauffeurs de taxi et VTC. Répond aux appels, prend les réservations, gère les bons de transport, le calendrier et les exports CPAM — 24h/24 sur Telegram.',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
