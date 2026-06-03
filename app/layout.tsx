import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://copilo.tech'),
  title: {
    default: 'Copilo — Secrétariat IA pour chauffeurs taxi & VTC',
    template: '%s | Copilo',
  },
  description:
    'Copilo répond au téléphone, prend les réservations, gère bons de transport et exports CPAM pour taxis & VTC indépendants. Tu conduis, Copilo gère le reste.',
  keywords: [
    'secrétariat téléphonique taxi', 'assistant taxi conventionné CPAM', 'logiciel taxi indépendant',
    'gestion bons de transport CPAM', 'assistant VTC indépendant', 'standard téléphonique taxi',
    'application taxi médical', 'Copilo', 'bot Telegram taxi', 'répondre aux appels en conduisant',
    'simulateur prix taxi conventionné', 'export comptable taxi',
  ],
  authors: [{ name: 'Copilo', url: 'https://copilo.tech' }],
  creator: 'Copilo',
  openGraph: {
    title: 'Copilo — Secrétariat IA pour chauffeurs taxi & VTC',
    description:
      'Tu conduis, Copilo gère le reste : appels, réservations, bons de transport CPAM, calendrier, exports comptables. 100 % européen, sur Telegram.',
    url: 'https://copilo.tech',
    siteName: 'Copilo',
    type: 'website',
    locale: 'fr_FR',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Copilo — Secrétariat IA taxi & VTC' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copilo — Secrétariat IA pour chauffeurs taxi & VTC',
    description: 'Tu conduis. Copilo gère le reste : appels, réservations, BT, CPAM, calendrier, exports — sur Telegram.',
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
        'Secrétariat téléphonique IA pour chauffeurs de taxi et VTC indépendants. Répond aux appels, prend les réservations, gère les bons de transport CPAM, le calendrier et les exports comptables — 24h/24 sur Telegram.',
      audience: {
        '@type': 'Audience',
        audienceType: 'Chauffeurs de taxi conventionné CPAM et VTC indépendants',
      },
      featureList: [
        'Secrétariat téléphonique 24h/24',
        'Prise automatique de réservation',
        'Gestion des bons de transport CPAM',
        'Synchronisation Google Calendar',
        'Calcul automatique du chiffre d\'affaires',
        'Export comptable hebdomadaire',
        'Push-to-talk vocal sur Telegram',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://copilo.tech/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Comment Copilo aide un chauffeur de taxi à ne pas perdre une course pendant qu\'il conduit ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Copilo décroche au téléphone à votre place quand vous conduisez. Il transcrit l\'appel, crée la course, envoie un SMS de confirmation au client et l\'ajoute à votre calendrier — vous ne perdez plus une réservation parce que vous étiez sur la route.',
          },
        },
        {
          '@type': 'Question',
          name: 'Comment Copilo gère-t-il les bons de transport CPAM ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Le chauffeur envoie une photo du bon dans la conversation Telegram. Copilo le rattache automatiquement à la course (par légende ou par fenêtre temporelle), renomme le fichier avec un tag structuré (BT_2026-06-03_DUPONT-MARIE_Nice-Aeroport_C87.jpg) et le renvoie au chauffeur. Aucun OCR, aucun fichier stocké côté serveur.',
          },
        },
        {
          '@type': 'Question',
          name: 'Copilo fonctionne-t-il pour les chauffeurs VTC indépendants ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui. Copilo gère le planning, l\'envoi de factures clients et la présence sur les réseaux sociaux pour les VTC indépendants. La gestion des bons de transport CPAM est réservée aux taxis conventionnés.',
          },
        },
        {
          '@type': 'Question',
          name: 'Combien coûte Copilo pour un chauffeur indépendant ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Copilo est gratuit les 3 premiers mois sans carte bancaire. Les coûts d\'usage LLM sont plafonnés à 5 € par chauffeur et par mois (hard cap) pour rester prévisible.',
          },
        },
        {
          '@type': 'Question',
          name: 'Mes données sont-elles protégées ?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Oui. Copilo est 100 % européen, chiffrement bout-en-bout par chauffeur (HKDF + Fernet), hébergement Europe, conformité RGPD native, effacement sur demande.',
          },
        },
      ],
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
