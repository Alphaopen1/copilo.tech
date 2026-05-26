import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Copilo — Ton copilote vocal de route',
  description: 'L\'assistant vocal intelligent, chiffré et RGPD pour les professionnels de la route. Propulsé par l\'IA, conçu en Europe.',
  keywords: ['copilo', 'assistant vocal', 'taxi', 'VTC', 'RGPD', 'IA', 'voice assistant'],
  openGraph: {
    title: 'Copilo — Ton copilote vocal de route',
    description: 'L\'assistant vocal IA pour les pros de la route. Chiffré, RGPD EU, vocal.',
    url: 'https://copilo.tech',
    siteName: 'Copilo',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Copilo — Ton copilote vocal de route',
    description: 'L\'assistant vocal IA pour les pros de la route.',
  },
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://copilo.tech'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
