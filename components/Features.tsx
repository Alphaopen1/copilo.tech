'use client'

const T = {
  fr: {
    label: '// CAPACITÉS',
    title: 'TOUT CE DONT TU AS BESOIN.',
    sub: 'Rien de superflu. Tout pensé pour les pros de la route.',
    items: [
      { icon: '🎙️', color: '#1d5cff', glow: 'rgba(29,92,255,0.2)', title: 'Commande vocale', desc: 'Parle naturellement en conduisant. Copilo comprend le contexte, les corrections, et les nuances.' },
      { icon: '🔒', color: '#7c3aed', glow: 'rgba(124,58,237,0.2)', title: 'Chiffrement bout-en-bout', desc: 'HKDF + Fernet. Hébergé en Europe. Aucun tiers, aucune fuite. Effacement RGPD sur demande.' },
      { icon: '📅', color: '#0891b2', glow: 'rgba(8,145,178,0.2)', title: 'Google Calendar auto', desc: 'Chaque course planifiée dans ton calendrier. Orange pour les courses partagées.' },
      { icon: '💶', color: '#059669', glow: 'rgba(5,150,105,0.2)', title: 'CA CPAM automatique', desc: 'Calcul en temps réel selon la convention nationale. Péages appris automatiquement.' },
      { icon: '👥', color: '#d97706', glow: 'rgba(217,119,6,0.2)', title: 'Détection doublets', desc: 'Deux clients, même créneau, même direction ? Copilo propose la fusion avec abatement -23%.' },
      { icon: '🧠', color: '#dc2626', glow: 'rgba(220,38,38,0.2)', title: 'Mémoire adaptative', desc: 'Apprend tes habitudes : péages, clients réguliers, horaires préférés.' },
    ],
  },
  en: {
    label: '// CAPABILITIES',
    title: 'EVERYTHING YOU NEED.',
    sub: 'No bloat. Built entirely for road professionals.',
    items: [
      { icon: '🎙️', color: '#1d5cff', glow: 'rgba(29,92,255,0.2)', title: 'Voice commands', desc: 'Speak naturally while driving. Copilo understands context, corrections, and nuance.' },
      { icon: '🔒', color: '#7c3aed', glow: 'rgba(124,58,237,0.2)', title: 'End-to-end encryption', desc: 'HKDF + Fernet. Hosted in Europe. No third parties, no leaks. GDPR erasure on request.' },
      { icon: '📅', color: '#0891b2', glow: 'rgba(8,145,178,0.2)', title: 'Auto Google Calendar', desc: 'Every scheduled ride in your calendar. Orange for shared rides.' },
      { icon: '💶', color: '#059669', glow: 'rgba(5,150,105,0.2)', title: 'Automatic revenue', desc: 'Real-time CPAM calculation per national convention. Tolls learned automatically.' },
      { icon: '👥', color: '#d97706', glow: 'rgba(217,119,6,0.2)', title: 'Ride sharing detection', desc: 'Two clients, same slot, same direction? Copilo proposes merge with -23% CPAM abatement.' },
      { icon: '🧠', color: '#dc2626', glow: 'rgba(220,38,38,0.2)', title: 'Adaptive memory', desc: 'Learns your habits: recurring tolls, regular clients, preferred schedules.' },
    ],
  },
}

export default function Features({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  return (
    <section id="features" style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 60 }}>
          <div data-reveal className="mono" style={{ fontSize: 12, letterSpacing: '0.12em', color: 'rgba(0,207,255,0.7)', marginBottom: 16 }}>
            {tr.label}
          </div>
          <h2 data-reveal data-delay="1" className="display" style={{ fontSize: 'clamp(40px,6vw,72px)', color: '#f0f4ff', marginBottom: 12 }}>
            {tr.title}
          </h2>
          <p data-reveal data-delay="2" style={{ fontSize: 17, color: 'rgba(180,200,255,0.55)', fontWeight: 300 }}>{tr.sub}</p>
        </div>

        <hr className="section-rule" style={{ marginBottom: 48 }} />

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1 }}>
          {tr.items.map((f, i) => (
            <div
              key={f.title}
              data-reveal
              data-delay={String((i % 3) + 1)}
              className="card-hover"
              style={{
                padding: '32px 28px',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: i === 0 ? '12px 0 0 0' : i === 1 ? '0 12px 0 0' : i === 4 ? '0 0 0 12px' : i === 5 ? '0 0 12px 0' : '0',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* background accent */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${f.color}55, transparent)`,
              }} />

              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: f.glow,
                border: `1px solid ${f.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, marginBottom: 20,
              }}>
                {f.icon}
              </div>

              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: 20,
                letterSpacing: '0.02em', color: '#f0f4ff',
                marginBottom: 10, textTransform: 'uppercase',
              }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 14, color: 'rgba(180,200,255,0.5)', lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
