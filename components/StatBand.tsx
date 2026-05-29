'use client'

/* ── FacilPay-style LIGHT stat band ───────────────────────────────────
   A bright section (white → sky-blue) with one giant italic number, used
   to break the all-dark rhythm of the page — exactly like FacilPay's
   "182 countries" moment. Dark navy text for contrast.                  */

const T = {
  fr: {
    kicker: '// 100 % EUROPÉEN',
    number: '100%',
    head: 'européen & chiffré.',
    body: 'Voix traitée par Mistral, hébergement en Europe, chiffrement HKDF + Fernet. Push-to-talk : zéro écoute passive. Tes données restent en UE.',
    chips: [
      ['0', 'écoute passive'],
      ['06:30', 'brief du matin auto'],
      ['3 mois', 'offerts en bêta'],
    ] as [string, string][],
  },
  en: {
    kicker: '// 100% EUROPEAN',
    number: '100%',
    head: 'European & encrypted.',
    body: 'Voice handled by Mistral, hosted in Europe, HKDF + Fernet encryption. Push-to-talk: zero passive listening. Your data stays in the EU.',
    chips: [
      ['0', 'passive listening'],
      ['06:30', 'auto morning brief'],
      ['3 mo.', 'free in beta'],
    ] as [string, string][],
  },
}

export default function StatBand({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  return (
    <section
      style={{
        position: 'relative',
        background: 'linear-gradient(170deg, #eef5ff 0%, #cfe2ff 55%, #b6d4ff 100%)',
        padding: 'clamp(80px,12vw,150px) clamp(16px,5vw,40px)',
        overflow: 'hidden',
      }}
    >
      {/* fades to the dark page above and below */}
      <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, #04080f, transparent)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, #04080f, transparent)', pointerEvents: 'none' }} />

      <div
        style={{
          maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1,
          display: 'flex', gap: 'clamp(24px,5vw,72px)', alignItems: 'center', flexWrap: 'wrap',
        }}
      >
        {/* Giant number */}
        <div data-reveal="left" style={{ flex: '1 1 320px', minWidth: 280 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.16em', color: 'rgba(29,92,255,0.7)', marginBottom: 18 }}>
            {tr.kicker}
          </div>
          <div
            style={{
              fontFamily: "'Barlow', sans-serif", fontStyle: 'italic', fontWeight: 700,
              fontSize: 'clamp(96px, 18vw, 240px)', lineHeight: 0.82,
              letterSpacing: '-0.04em', color: '#0a1730',
            }}
          >
            {tr.number}
          </div>
        </div>

        {/* Copy + chips */}
        <div data-reveal="right" data-delay="1" style={{ flex: '1 1 360px', minWidth: 300 }}>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800,
              fontSize: 'clamp(30px,4.5vw,52px)', lineHeight: 1, textTransform: 'uppercase',
              letterSpacing: '-0.01em', color: '#0a1730', marginBottom: 18,
            }}
          >
            {tr.head}
          </h2>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, lineHeight: 1.7, color: 'rgba(12,32,68,0.75)', marginBottom: 28, maxWidth: 460 }}>
            {tr.body}
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {tr.chips.map(([n, l]) => (
              <div
                key={l}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 2,
                  padding: '12px 18px', borderRadius: 14,
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(29,92,255,0.18)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 24, color: '#1d5cff', lineHeight: 1 }}>{n}</span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'rgba(12,32,68,0.6)', letterSpacing: '0.04em' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
