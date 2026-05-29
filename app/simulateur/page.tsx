import SimulateurPage from '@/components/SimulateurPage'

export const metadata = {
  title: 'Simulateur Prix Taxi : Calcul Tarif Course Conventionnée 2025',
  description:
    'Calculez le tarif d\'une course de taxi conventionné CPAM selon la convention 2025 : forfait, tarif kilométrique par département, majorations nuit/week-end, transport partagé. Outil gratuit + simulation vocale sur Telegram.',
  alternates: { canonical: 'https://copilo.tech/simulateur' },
  openGraph: {
    title: 'Simulateur Prix Taxi : Calcul Tarif Course Conventionnée 2025',
    description: 'Estime le tarif d\'un transport assis conventionné (CPAM) selon la convention du 13 mai 2025. Gratuit.',
    url: 'https://copilo.tech/simulateur',
    type: 'website',
    locale: 'fr_FR',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Simulateur prix taxi conventionné',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url: 'https://copilo.tech/simulateur',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      description: 'Calcul du tarif d\'une course de taxi conventionné CPAM selon la convention nationale 2025.',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Comment est calculé le tarif d\'une course de taxi conventionné en 2025 ?',
          acceptedAnswer: { '@type': 'Answer', text: 'Forfait de prise en charge de 13 € (4 premiers km inclus), plus le tarif kilométrique départemental dès le 5e km, plus un forfait Grande ville de 15 € le cas échéant, avec majorations nuit/week-end (+50 %) et abattements en transport partagé.' },
        },
        {
          '@type': 'Question',
          name: 'Quel est le tarif kilométrique d\'un taxi conventionné ?',
          acceptedAnswer: { '@type': 'Answer', text: 'Il dépend du département de l\'ADS, avec un plancher national de 1,07 €/km fixé par la convention du 13 mai 2025.' },
        },
        {
          '@type': 'Question',
          name: 'Qu\'est-ce que l\'abattement transport partagé ?',
          acceptedAnswer: { '@type': 'Answer', text: 'Une réduction appliquée quand plusieurs patients partagent le véhicule : −23 % pour 2 patients, −35 % pour 3, −37 % pour 4 et plus.' },
        },
      ],
    },
  ],
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SimulateurPage />
    </>
  )
}
