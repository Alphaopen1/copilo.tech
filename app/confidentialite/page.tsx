import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Comment Copilo collecte, utilise et protège vos données personnelles.',
  alternates: { canonical: 'https://copilo.tech/confidentialite' },
}

export default function Confidentialite() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '120px clamp(16px,5vw,40px) 80px', color: '#f0f4ff', fontFamily: "'Barlow', sans-serif" }}>
      <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 48, textTransform: 'uppercase', marginBottom: 8, color: '#f0f4ff' }}>
        Confidentialité
      </h1>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'rgba(0,207,255,0.6)', letterSpacing: '0.1em', marginBottom: 40 }}>
        Dernière mise à jour : mai 2026
      </p>

      <Section title="Données collectées">
        <p>Copilo collecte uniquement les données strictement nécessaires au fonctionnement du service :</p>
        <ul style={{ paddingLeft: 20 }}>
          <li>Adresse e-mail (inscription liste d'attente)</li>
          <li>Données de courses (chiffrées de bout en bout, pseudonymisées)</li>
          <li>Logs d'usage anonymisés (amélioration du service)</li>
        </ul>
      </Section>

      <Section title="Chiffrement & sécurité">
        <p>Toutes les données sensibles sont chiffrées via <strong>HKDF + Fernet</strong> avant stockage. Les informations de patient (nom, téléphone) ne sont jamais stockées en clair. Les audio vocaux sont traités à la volée et jamais persistés.</p>
      </Section>

      <Section title="Hébergement RGPD">
        <p>L'ensemble des données est hébergé sur des serveurs situés dans l'<strong>Union européenne</strong> (Hetzner DE / Scaleway FR). Copilo ne transfère aucune donnée personnelle vers des pays tiers.</p>
      </Section>

      <Section title="Vos droits">
        <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits : <a href="mailto:privacy@copilo.tech" style={{ color: '#00cfff' }}>privacy@copilo.tech</a></p>
      </Section>

      <Section title="Cookies">
        <p>Ce site n'utilise aucun cookie de tracking. Seuls des cookies techniques strictement nécessaires au fonctionnement du service peuvent être déposés.</p>
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
