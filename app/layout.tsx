import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Copilo — Ton copilote vocal de route',
  description: 'L\'assistant vocal intelligent, chiffré, RGPD EU pour les professionnels de la route.',
  keywords: ['copilo', 'assistant vocal', 'taxi', 'VTC', 'RGPD', 'IA'],
  openGraph: {
    title: 'Copilo — Ton copilote vocal de route',
    description: 'Assistant vocal IA · Chiffré EU · RGPD',
    url: 'https://copilo.tech',
    siteName: 'Copilo',
    type: 'website',
  },
  metadataBase: new URL('https://copilo.tech'),
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
      </head>
      <body>{children}</body>
    </html>
  )
}
