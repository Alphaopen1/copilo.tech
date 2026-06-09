import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions générales d\'utilisation',
  description: 'Conditions générales d\'utilisation du service Copilo — édité par Human Transtech.',
  alternates: { canonical: 'https://copilo.tech/cgu' },
}

export default function Cgu() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '120px clamp(16px,5vw,40px) 80px', color: '#f0f4ff', fontFamily: "'Barlow', sans-serif" }}>
      <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 48, textTransform: 'uppercase', marginBottom: 8, color: '#f0f4ff' }}>
        Conditions générales d&apos;utilisation
      </h1>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'rgba(0,207,255,0.6)', letterSpacing: '0.1em', marginBottom: 40 }}>
        Dernière mise à jour : juin 2026
      </p>

      <Section title="Préambule">
        <p>
          Les présentes conditions générales d&apos;utilisation (ci-après « CGU ») régissent l&apos;accès et
          l&apos;utilisation du service Copilo, édité par la société Human Transtech.
        </p>
        <p>
          En utilisant le service, vous reconnaissez avoir pris connaissance des présentes CGU et les
          accepter sans réserve. Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser le service.
        </p>
      </Section>

      <Section title="Éditeur">
        <p>
          <strong>Human Transtech</strong>, Société par actions simplifiée à associé unique (SASU)
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li>Capital social : 1 000 €</li>
          <li>Siège social : 47 rue Vivienne, 75002 Paris</li>
          <li>Contact : <a href="mailto:contact@copilo.tech" style={{ color: '#00cfff' }}>contact@copilo.tech</a></li>
        </ul>
      </Section>

      <Section title="Description du service">
        <p>
          Copilo est un service numérique d&apos;assistance vocale pour chauffeurs de taxi et VTC, accessible
          via Telegram. Il permet la gestion des appels, réservations, bons de transport CPAM, calendrier
          et exports comptables — dans les limites décrites sur le site copilo.tech.
        </p>
      </Section>

      <Section title="Accès au service">
        <p>
          L&apos;accès au service est gratuit pendant une période d&apos;essai de 3 mois. Au-delà, des frais
          d&apos;abonnement peuvent s&apos;appliquer selon les conditions tarifaires en vigueur, communiquées
          préalablement à l&apos;utilisateur.
        </p>
        <p>
          L&apos;utilisateur s&apos;engage à fournir des informations exactes lors de son inscription et à
          ne pas utiliser le service à des fins frauduleuses ou contraires à la réglementation en vigueur.
        </p>
      </Section>

      <Section title="Protection des données">
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), les données personnelles
          collectées sont traitées de manière sécurisée et confidentielle. Pour plus d&apos;informations,
          consultez notre <a href="/confidentialite" style={{ color: '#00cfff' }}>Politique de confidentialité</a>.
        </p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>
          L&apos;ensemble du contenu du site Copilo et du service (textes, visuels, code, marques) est la
          propriété exclusive de Human Transtech. Toute reproduction, distribution ou modification sans
          autorisation écrite préalable est interdite.
        </p>
      </Section>

      <Section title="Responsabilité">
        <p>
          Le service Copilo est fourni « en l&apos;état ». Human Transtech s&apos;efforce d&apos;assurer la
          disponibilité et la fiabilité du service, sans garantir une absence totale d&apos;interruptions ou
          d&apos;erreurs. La responsabilité de l&apos;éditeur ne saurait être engagée pour les dommages indirects
          résultant de l&apos;utilisation du service.
        </p>
        <p>
          Les montants calculés par le simulateur de tarif et le service Copilo sont fournis à titre
          indicatif. Les tarifs réels peuvent varier selon les accords locaux conclus entre les entreprises
          de taxi et les caisses d&apos;Assurance Maladie.
        </p>
      </Section>

      <Section title="Modification des CGU">
        <p>
          Human Transtech se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs
          en seront informés par tout moyen approprié. L&apos;utilisation continue du service après
          modification vaut acceptation des nouvelles conditions.
        </p>
      </Section>

      <Section title="Droit applicable et juridiction">
        <p>
          Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation
          ou exécution relève de la compétence des tribunaux français.
        </p>
      </Section>

      <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="/" style={{ color: 'rgba(0,207,255,0.7)', textDecoration: 'none', fontFamily: "'DM Mono', monospace", fontSize: 12 }}>
          ← Retour à l'accueil
        </a>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 24, textTransform: 'uppercase', color: '#f0f4ff', marginBottom: 12, letterSpacing: '0.04em' }}>
        {title}
      </h2>
      <div style={{ fontSize: 15, lineHeight: 1.75, color: 'rgba(180,200,255,0.65)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
    </section>
  )
}