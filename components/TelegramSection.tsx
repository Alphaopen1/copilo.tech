'use client'
import { useState, useEffect } from 'react'

/* ── Scenarios ─────────────────────────────────────────────────────── */
const SCENARIOS = {
  fr: [
    {
      id: 'course',
      label: 'Ajouter une course',
      icon: '🚖',
      messages: [
        { role: 'u', text: '🎙️ Course demain 14h30 Nice → CHU Pasteur, M. Bernard', delay: 0 },
        { role: 'c', text: '📋 Voici la course :\n• 28/05 à 14:30 — M. Bernard\n• Nice → CHU Pasteur · ⏱ 22 min\n• 💰 CA CPAM 18.40 €\n\nConfirmer ?', delay: 1600 },
        { role: 'u', text: '✅', delay: 3200 },
        { role: 'c', text: '✅ Course #87 créée\n📅 Google Calendar mis à jour\n🔔 Rappel dans 13h30', delay: 4800 },
      ],
    },
    {
      id: 'brief',
      label: 'Brief du matin',
      icon: '🌅',
      messages: [
        { role: 'c', text: '🌅 Bonjour ! Voici ton brief du 28/05 :\n\n• 3 courses planifiées\n• 09:00 – Mme Dupont → Cannes\n• 11:30 – M. Karim → Aéroport NCE\n• 15:00 – Mme Leroy → Clinique\n\n💰 CA estimé : 142.80 €\n🛣️ Péages estimés : 8.40 €', delay: 0 },
        { role: 'u', text: "C'est noté, merci Copilo 👍", delay: 2000 },
        { role: 'c', text: '💪 Bonne route ! Je te contacte 15 min avant chaque course.', delay: 3600 },
      ],
    },
    {
      id: 'doublet',
      label: 'Doublet détecté',
      icon: '👥',
      messages: [
        { role: 'u', text: '🎙️ Course demain 9h Nice → Cannes, M. Hajj', delay: 0 },
        { role: 'c', text: "🔍 Doublet possible détecté !\n\nMme Dupont part aussi de Nice → Cannes demain 09:00.\n\nFusionner en course partagée ?\n• 1 seul péage\n• CA CPAM par patient (abatement -23%)", delay: 1800 },
        { role: 'u', text: '✅ Fusionner', delay: 3400 },
        { role: 'c', text: '✅ Course doublet #88 créée\n• Mme Dupont + M. Hajj\n• 💰 46.20 € × 2 patients\n📅 Calendrier mis à jour en orange', delay: 5000 },
      ],
    },
    {
      id: 'peage',
      label: 'Note de péage',
      icon: '🛣️',
      messages: [
        { role: 'u', text: '🎙️ Péage A8 ce matin, 4.80 €', delay: 0 },
        { role: 'c', text: '🛣️ Péage mémorisé :\n• A8 · 4.80 € · 28/05 09:14\n\nCe péage sera automatiquement associé aux courses Nice → Cannes.', delay: 1600 },
        { role: 'u', text: 'Parfait 🙏', delay: 3000 },
        { role: 'c', text: "✅ Dans 2 semaines, je m'en souviendrai automatiquement.", delay: 4400 },
      ],
    },
  ],
  en: [
    {
      id: 'course',
      label: 'Add a ride',
      icon: '🚖',
      messages: [
        { role: 'u', text: '🎙️ Ride tomorrow 2:30pm Nice → Pasteur Hospital, Mr Bernard', delay: 0 },
        { role: 'c', text: '📋 Ride details:\n• May 28 at 14:30 — Mr Bernard\n• Nice → Pasteur Hospital · ⏱ 22 min\n• 💰 Revenue €18.40\n\nConfirm?', delay: 1600 },
        { role: 'u', text: '✅', delay: 3200 },
        { role: 'c', text: '✅ Ride #87 created\n📅 Google Calendar updated\n🔔 Reminder in 13h30', delay: 4800 },
      ],
    },
    {
      id: 'brief',
      label: 'Morning brief',
      icon: '🌅',
      messages: [
        { role: 'c', text: '🌅 Good morning! Here is your brief for May 28:\n\n• 3 rides scheduled\n• 09:00 – Ms Dupont → Cannes\n• 11:30 – Mr Karim → NCE Airport\n• 15:00 – Ms Leroy → Clinic\n\n💰 Estimated revenue: €142.80\n🛣️ Estimated tolls: €8.40', delay: 0 },
        { role: 'u', text: 'Got it, thanks Copilo 👍', delay: 2000 },
        { role: 'c', text: '💪 Safe drive! I\'ll contact you 15 min before each ride.', delay: 3600 },
      ],
    },
    {
      id: 'doublet',
      label: 'Shared ride detected',
      icon: '👥',
      messages: [
        { role: 'u', text: '🎙️ Ride tomorrow 9am Nice → Cannes, Mr Hajj', delay: 0 },
        { role: 'c', text: '🔍 Possible shared ride detected!\n\nMs Dupont also departs Nice → Cannes tomorrow 09:00.\n\nMerge into a shared ride?\n• 1 toll only\n• Revenue per patient (−23% abatement)', delay: 1800 },
        { role: 'u', text: '✅ Merge', delay: 3400 },
        { role: 'c', text: '✅ Shared ride #88 created\n• Ms Dupont + Mr Hajj\n• 💰 €46.20 × 2 patients\n📅 Calendar updated in orange', delay: 5000 },
      ],
    },
    {
      id: 'peage',
      label: 'Toll note',
      icon: '🛣️',
      messages: [
        { role: 'u', text: '🎙️ A8 toll this morning, €4.80', delay: 0 },
        { role: 'c', text: '🛣️ Toll memorized:\n• A8 · €4.80 · May 28 09:14\n\nThis toll will be auto-linked to Nice → Cannes rides.', delay: 1600 },
        { role: 'u', text: 'Perfect 🙏', delay: 3000 },
        { role: 'c', text: "✅ In 2 weeks, I'll remember it automatically.", delay: 4400 },
      ],
    },
  ],
}

const STATS = {
  fr: [
    { n: '+240', label: 'pros inscrits' },
    { n: '100%', label: 'EU · RGPD' },
    { n: '0', label: 'app à installer' },
    { n: '24/7', label: 'disponible' },
  ],
  en: [
    { n: '+240', label: 'pros signed up' },
    { n: '100%', label: 'EU · GDPR' },
    { n: '0', label: 'app to install' },
    { n: '24/7', label: 'available' },
  ],
}

const T2 = {
  fr: {
    label: '// DÉMO EN DIRECT',
    title: 'ESSAIE COPILO',
    title2: 'EN VRAI.',
    sub: 'Voici de vraies conversations avec @Copilo_TaxiBot. Clique sur un scénario pour voir Copilo en action.',
    cta: 'Ouvrir @Copilo_TaxiBot',
    ctaSub: 'Gratuit · Aucune carte requise',
    tryLabel: 'Scénarios',
  },
  en: {
    label: '// LIVE DEMO',
    title: 'TRY COPILO',
    title2: 'FOR REAL.',
    sub: 'Real conversations with @Copilo_TaxiBot. Click a scenario to see Copilo in action.',
    cta: 'Open @Copilo_TaxiBot',
    ctaSub: 'Free · No card required',
    tryLabel: 'Scenarios',
  },
}

/* ── AnimatedChat ────────────────────────────────────────────────── */
function AnimatedChat({ messages }: { messages: { role: string; text: string; delay: number }[] }) {
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    setVisible(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    messages.forEach((m, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), m.delay + 300))
    })
    return () => timers.forEach(clearTimeout)
  }, [messages])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {messages.slice(0, visible).map((m, i) => (
        <div
          key={i}
          className="msg-in"
          style={{
            display: 'flex',
            justifyContent: m.role === 'u' ? 'flex-end' : 'flex-start',
          }}
        >
          <div style={{
            maxWidth: '85%',
            padding: '9px 13px',
            borderRadius: m.role === 'u' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            fontSize: 12.5, lineHeight: 1.65, whiteSpace: 'pre-line',
            fontFamily: "'Barlow', sans-serif",
            ...(m.role === 'u'
              ? { background: 'linear-gradient(135deg, #1d5cff, #1040c0)', color: '#fff', boxShadow: '0 2px 14px rgba(29,92,255,0.35)' }
              : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(240,244,255,0.92)' }
            ),
          }}>
            {m.text}
          </div>
        </div>
      ))}
      {visible < messages.length && (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <div style={{
            padding: '9px 14px', borderRadius: '16px 16px 16px 4px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', gap: 4, alignItems: 'center',
          }}>
            {[0, 0.2, 0.4].map((d, i) => (
              <span key={i} style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'rgba(29,92,255,0.7)',
                display: 'inline-block',
                animation: `blink 1.2s ${d}s ease-in-out infinite`,
              }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Main section ─────────────────────────────────────────────────── */
export default function TelegramSection({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T2[lang]
  const scenarios = SCENARIOS[lang]
  const stats = STATS[lang]
  const [active, setActive] = useState(0)

  return (
    <section id="telegram" style={{ padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 800, height: 600,
        background: 'radial-gradient(ellipse at center, rgba(29,92,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>

        {/* Header */}
        <div style={{ marginBottom: 60 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.12em', color: 'rgba(0,207,255,0.7)', marginBottom: 16 }}>
            {tr.label}
          </div>
          <h2 className="display" style={{ fontSize: 'clamp(40px,6vw,72px)', color: '#f0f4ff', marginBottom: 12 }}>
            {tr.title} <span className="gt-blue">{tr.title2}</span>
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(180,200,255,0.5)', maxWidth: 560 }}>{tr.sub}</p>
        </div>

        <hr className="section-rule" style={{ marginBottom: 48 }} />

        {/* Main layout */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-start' }}>

          {/* LEFT: scenario tabs */}
          <div style={{ flex: '0 0 220px' }}>
            <p className="mono" style={{ fontSize: 10, letterSpacing: '0.12em', color: 'rgba(180,200,255,0.35)', marginBottom: 16, textTransform: 'uppercase' }}>
              {tr.tryLabel}
            </p>
            {scenarios.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                  padding: '10px 14px', borderRadius: 10, marginBottom: 8,
                  background: active === i ? 'rgba(29,92,255,0.12)' : 'rgba(255,255,255,0.02)',
                  border: '1px solid ' + (active === i ? 'rgba(29,92,255,0.4)' : 'rgba(255,255,255,0.06)'),
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                }}
              >
                <span style={{ fontSize: 18 }}>{s.icon}</span>
                <span style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600, fontSize: 13, letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  color: active === i ? '#f0f4ff' : 'rgba(180,200,255,0.5)',
                }}>
                  {s.label}
                </span>
              </button>
            ))}

            {/* CTA */}
            <div style={{ marginTop: 24 }}>
              <a
                href="https://t.me/Copilo_TaxiBot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 20px', borderRadius: 12, textDecoration: 'none',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: 14, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: '#fff', width: '100%',
                  justifyContent: 'center',
                }}
              >
                <TelegramIcon />
                {tr.cta}
              </a>
              <p className="mono" style={{ fontSize: 10, color: 'rgba(180,200,255,0.3)', marginTop: 8, textAlign: 'center', letterSpacing: '0.04em' }}>
                {tr.ctaSub}
              </p>
            </div>
          </div>

          {/* RIGHT: animated chat window */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <div style={{
              borderRadius: 20,
              background: 'linear-gradient(175deg, #0d1829 0%, #060c18 100%)',
              border: '1px solid rgba(255,255,255,0.07)',
              overflow: 'hidden',
            }}>
              {/* Chat header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(255,255,255,0.015)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 13,
                  background: 'linear-gradient(135deg, #1d5cff 0%, #00cfff 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900, fontSize: 20, color: '#fff',
                  boxShadow: '0 0 20px rgba(29,92,255,0.5)',
                }}>C</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#f0f4ff', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    @Copilo_TaxiBot
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e' }} />
                    <span className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>
                      {scenarios[active].icon} {scenarios[active].label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages area */}
              <div style={{ padding: '20px', minHeight: 280 }}>
                <AnimatedChat key={`${lang}-${active}`} messages={scenarios[active].messages} />
              </div>

              {/* Bottom bar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(4,8,15,0.8)',
              }}>
                <div style={{
                  flex: 1, height: 36, borderRadius: 18,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  display: 'flex', alignItems: 'center', paddingLeft: 14,
                }}>
                  <span className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)' }}>
                    Message...
                  </span>
                </div>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1d5cff, #00cfff)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 16px rgba(29,92,255,0.4)',
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                    <line x1="12" x2="12" y1="19" y2="22"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 1,
          marginTop: 60, borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              flex: 1, minWidth: 120, padding: '20px 24px',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.015)',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              textAlign: 'center',
            }}>
              <div className="display" style={{ fontSize: 32, color: '#f0f4ff', marginBottom: 4 }}>
                {s.n}
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'rgba(180,200,255,0.4)', letterSpacing: '0.06em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

function TelegramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}
