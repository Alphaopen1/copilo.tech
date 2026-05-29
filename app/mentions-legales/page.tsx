import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de Copilo — assistant vocal pour chauffeurs taxi & VTC.',
  alternates: { canonical: 'https://copilo.tech/mentions-legales' },
}

export default function MentionsLegales() {
  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: '120px clamp(16px,5vw,40px) 80px', color: '#f0f4ff', fontFamily: "'Barlow', sans-serif" }}>
      <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 48, textTransform: 'uppercase', marginBottom: 8, color: '#f0f4ff' }}>
        Mentions légales
      </h1>
      <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: 'rgba(0,207,255,0.6)', letterSpacing: '0.1em', marginBottom: 40 }}>
        Dernière mise à jour : mai 2026
      </p>

      <Section title="Éditeur">
        <p>Copilo — Service numérique d'assistance vocale pour professionnels de la route.</p>
        <p>Contact : <a href="mailto:contact@copilo.tech" style={{ color: '#00cfff' }}>contact@copilo.tech</a></p>
      </Section>

      <Section title="Hébergement">
        <p>Ce site est hébergé par <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA) et déployé sur des serveurs européens conformément à la politique d'hébergement de Vercel.</p>
        <p>Les données utilisateurs sont stockées sur des serveurs certifiés RGPD situés dans l'Union européenne (Hetzner / Scaleway).</p>
      </Section>

      <Section title="Propriété intellectuelle">
        <p>L'ensemble du contenu de ce site (textes, visuels, code) est la propriété exclusive de Copilo. Toute reproduction est interdite sans autorisation écrite préalable.</p>
      </Section>

      <Section title="Limitation de responsabilité">
        <p>Copilo s'efforce de maintenir les informations de ce site à jour. Copilo ne peut être tenu responsable des dommages directs ou indirects liés à l'utilisation du service.</p>
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
