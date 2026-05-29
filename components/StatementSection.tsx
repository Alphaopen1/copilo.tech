'use client'
import FloatingOrbs from './FloatingOrbs'

/* ── FacilPay-style massive statement interstitial ────────────────────
   Pure deep-space moment: one huge sentence, one accented phrase in cyan,
   floating glowing orbs drifting in the dark. Breaks the page rhythm.   */

const T = {
  fr: { line1: 'Ta journée, gérée à la voix.', accent: 'Sans les mains.', kicker: '// ZÉRO PAPERASSE' },
  en: { line1: 'Your whole day, by voice.',     accent: 'Hands free.',     kicker: '// ZERO PAPERWORK' },
}

export default function StatementSection({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '78vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center',
        padding: '120px clamp(16px,5vw,40px)',
        overflow: 'hidden',
      }}
    >
      {/* Sunrise-blue burst behind the text (FacilPay horizon light) */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
          width: 'min(1100px, 120vw)', height: 560, zIndex: 0, pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(29,92,255,0.28) 0%, rgba(0,207,255,0.08) 38%, transparent 70%)',
        }}
      />

      <FloatingOrbs />

      <div data-reveal className="mono" style={{ position: 'relative', zIndex: 1, fontSize: 12, letterSpacing: '0.16em', color: 'rgba(0,207,255,0.7)', marginBottom: 28 }}>
        {tr.kicker}
      </div>

      <h2
        data-reveal data-delay="1"
        style={{
          position: 'relative', zIndex: 1,
          fontFamily: "'Barlow', sans-serif", fontWeight: 600,
          fontSize: 'clamp(40px, 8.5vw, 116px)', lineHeight: 1.02,
          letterSpacing: '-0.02em', color: 'rgba(180,200,255,0.5)',
          maxWidth: 1000, margin: 0,
        }}
      >
        {tr.line1}{' '}
        <span
          style={{
            background: 'linear-gradient(120deg,#fff 0%,#60a5fa 55%,#00cfff 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}
        >
          {tr.accent}
        </span>
      </h2>
    </section>
  )
}
