import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://copilo.tech'),
  title: {
    default: 'Copilo — Secrétariat téléphonique IA pour taxi & VTC',
    template: '%s | Copilo',
  },
  description:
    'Copilo répond au téléphone à votre place quand vous conduisez. Ne perdez plus une réservation. Courses, bons de transport et exports CPAM gérés automatiquement sur Telegram — 100 % européen, chiffré de bout en bout.',
  keywords: [
    'secrétariat téléphonique taxi', 'répondre aux appels en conduisant', 'ne plus manquer un appel taxi',
    'assistant téléphonique VTC', 'Copilo', 'bot Telegram taxi', 'réservation automatique taxi',
    'gestion bons de transport', 'export CPAM taxi', 'RGPD taxi', 'Telegram bot VTC',
  ],
  authors: [{ name: 'Copilo', url: 'https://copilo.tech' }],
  creator: 'Copilo',
  openGraph: {
    title: 'Copilo — Secrétariat téléphonique IA pour taxi & VTC',
    description:
      'Ne perdez plus une course parce que vous conduisiez. Copilo décroche à votre place, prend les réservations et gère vos bons de transport — 24h/24, sur Telegram.',
    url: 'https://copilo.tech',
    siteName: 'Copilo',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Copilo — Secrétariat téléphonique taxi & VTC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copilo — Secrétariat téléphonique IA pour taxi & VTC',
    description: 'Copilo décroche. Tu conduis. Réservations automatiques, bons de transport, export CPAM — sur Telegram.',
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
      description: 'Secrétariat téléphonique IA pour chauffeurs de taxi et VTC',
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
        'Secrétariat téléphonique IA pour chauffeurs de taxi et VTC. Répond aux appels, prend les réservations, gère les bons de transport et les exports CPAM — 24h/24 sur Telegram.',
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
