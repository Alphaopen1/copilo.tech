import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://copilo.tech'),
  title: {
    default: 'Copilo — Assistant vocal IA pour chauffeurs taxi & VTC',
    template: '%s | Copilo',
  },
  description:
    'Copilo est l\'assistant vocal Telegram pour chauffeurs de taxi et VTC. Gérez vos courses CPAM, calculez votre CA, synchronisez votre calendrier — en push-to-talk, 100 % chiffré, hébergé en Europe.',
  keywords: [
    'assistant vocal taxi', 'VTC IA', 'Copilo', 'bot Telegram taxi',
    'CA CPAM chauffeur', 'gestion courses taxi', 'assistant IA chauffeur',
    'vocal push-to-talk', 'RGPD taxi', 'Telegram bot VTC',
  ],
  authors: [{ name: 'Copilo', url: 'https://copilo.tech' }],
  creator: 'Copilo',
  openGraph: {
    title: 'Copilo — Assistant vocal IA pour chauffeurs taxi & VTC',
    description:
      'Push-to-talk. Zéro écoute passive. Courses CPAM, calendrier, CA calculé automatiquement. 100 % européen, chiffré de bout en bout.',
    url: 'https://copilo.tech',
    siteName: 'Copilo',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Copilo — Assistant vocal taxi & VTC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copilo — Assistant vocal IA pour chauffeurs taxi & VTC',
    description: 'Push-to-talk. Courses CPAM, calendrier, CA auto. 100 % chiffré EU.',
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
      description: 'Assistant vocal IA pour professionnels de la route',
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
        'Assistant vocal IA pour chauffeurs de taxi et VTC. Gestion des courses CPAM, calcul du CA, calendrier synchronisé, dispatch de courses en groupe Telegram.',
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
