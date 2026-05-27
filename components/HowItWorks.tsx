'use client'

const T = {
  fr: {
    label: '// PROTOCOLE',
    title: '3 ÉTAPES.\nC\'EST TOUT.',
    steps: [
      { n: '01', color: '#1d5cff', title: 'Lance @Copilo_bot', desc: 'Sur Telegram. Présente-toi en 30 secondes. Aucun formulaire, aucune carte.' },
      { n: '02', color: '#00cfff', title: 'Parle naturellement', desc: '"Ajoute une course demain 9h Nice → Cannes pour Mme Dupont." C\'est tout.' },
      { n: '03', color: '#f97316', title: 'Copilo gère tout', desc: 'CA CPAM, péages, calendrier, co-passagers, retours. Tu conduis, il s\'occupe du reste.' },
    ],
  },
  en: {
    label: '// PROTOCOL',
    title: '3 STEPS.\nTHAT\'S IT.',
    steps: [
      { n: '01', color: '#1d5cff', title: 'Launch @Copilo_bot', desc: 'On Telegram. Introduce yourself in 30 seconds. No form, no card.' },
      { n: '02', color: '#00cfff', title: 'Speak naturally', desc: '"Add a ride tomorrow 9am Nice → Cannes for Ms Dupont." That\'s it.' },
      { n: '03', color: '#f97316', title: 'Copilo handles all', desc: 'Revenue, tolls, calendar, shared rides, returns. You drive, it does the rest.' },
    ],
  },
}

export default function HowItWorks({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  return (
    <section id="how" style={{ padding: '100px 0', background: 'rgba(255,255,255,0.012)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'flex-start' }}>

          {/* Left: title */}
          <div style={{ flex: '0 0 260px' }}>
            <div data-reveal="left" className="mono" style={{ fontSize: 12, letterSpacing: '0.12em', color: 'rgba(0,207,255,0.7)', marginBottom: 16 }}>
              {tr.label}
            </div>
            <h2 data-reveal="left" data-delay="1" className="display" style={{ fontSize: 'clamp(40px,5vw,64px)', color: '#f0f4ff', whiteSpace: 'pre-line' }}>
              {tr.title}
            </h2>
          </div>

          {/* Right: steps */}
          <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {tr.steps.map((s, i) => (
              <div key={s.n} data-reveal data-delay={String(i + 1)} style={{ display: 'flex', gap: 24, paddingBottom: i < 2 ? 40 : 0, position: 'relative' }}>
                {/* Vertical line */}
                {i < 2 && (
                  <div style={{
                    position: 'absolute', left: 20, top: 52, bottom: 0, width: 1,
                    background: `linear-gradient(to bottom, ${s.color}44, transparent)`,
                  }} />
                )}

                {/* Number badge */}
                <div style={{
                  width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                  background: `${s.color}18`,
                  border: `1px solid ${s.color}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'DM Mono', monospace", fontWeight: 500, fontSize: 14,
                  color: s.color,
                }}>
                  {s.n}
                </div>

                <div style={{ paddingTop: 8 }}>
                  <h3 style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: 22, textTransform: 'uppercase',
                    letterSpacing: '0.02em', color: '#f0f4ff', marginBottom: 8,
                  }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'rgba(180,200,255,0.5)', lineHeight: 1.7 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
