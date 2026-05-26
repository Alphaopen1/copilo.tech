'use client'
import { useState, useEffect } from 'react'

/* ── Translations ───────────────────────────────────────────────────── */
const T = {
  fr: {
    tag: 'Propulsé par l\'IA · Chiffrement EU · RGPD',
    h1a: 'Ton copilote',
    h1b: 'vocal de route.',
    cta1: 'Rejoindre sur Telegram',
    cta2: 'Liste d\'attente',
    hint: 'ou dis simplement',
    voice: '"Salut Copilo"',
    messages: [
      { role: 'u', text: '🎙️ Ajoute une course demain 9h, Nice → Cannes, Mme Dupont' },
      { role: 'c', text: '📅 Course #42\n• 15/06 à 09:00 — Mme Dupont\n• Nice → Cannes · ⏱ 35 min\n• 💰 CA CPAM 46.20 € + 🛣️ 3.70 €' },
      { role: 'u', text: '✅ Confirme' },
      { role: 'c', text: '✅ Course #42 créée\n📅 Ajouté à Google Calendar' },
    ],
  },
  en: {
    tag: 'Powered by AI · EU Encryption · GDPR',
    h1a: 'Your intelligent',
    h1b: 'voice copilot.',
    cta1: 'Join on Telegram',
    cta2: 'Join Waitlist',
    hint: 'or simply say',
    voice: '"Hey Copilo"',
    messages: [
      { role: 'u', text: '🎙️ Add a ride tomorrow 9am, Nice → Cannes, Ms Dupont' },
      { role: 'c', text: '📅 Ride #42\n• Jun 15 at 09:00 — Ms Dupont\n• Nice → Cannes · ⏱ 35 min\n• 💰 Revenue €46.20 + 🛣️ €3.70' },
      { role: 'u', text: '✅ Confirm' },
      { role: 'c', text: '✅ Ride #42 created\n📅 Added to Google Calendar' },
    ],
  },
}

/* ── Helper ─────────────────────────────────────────────────────────── */
function useTypingMessages(messages: { role: string; text: string }[]) {
  const [visible, setVisible] = useState(1)
  useEffect(() => {
    if (visible >= messages.length) return
    const t = setTimeout(() => setVisible(v => v + 1), 1800)
    return () => clearTimeout(t)
  }, [visible, messages.length])
  useEffect(() => { setVisible(1) }, [messages])
  return visible
}

/* ── Component ───────────────────────────────────────────────────────── */
export default function Hero({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  const visibleMsgs = useTypingMessages(tr.messages)

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-end pb-0 overflow-hidden atmo-bg">

      {/* ── Stars ── */}
      <div className="stars" />

      {/* ── Horizon glow (comes from behind the phone top) ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          top: '-80px',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(29,92,255,0.45) 0%, rgba(0,207,255,0.15) 40%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />

      {/* ── Phone + overlay text container ── */}
      <div className="relative z-10 flex flex-col items-center w-full" style={{ minHeight: '100vh' }}>

        {/* Phone shell — takes up most of the screen like facilpay.io */}
        <div
          className="relative mx-auto float"
          style={{
            width: 'min(420px, 88vw)',
            height: 'min(820px, 88vh)',
            marginTop: 'clamp(70px, 10vh, 100px)',
          }}
        >
          {/* Outer ring glow */}
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none"
            style={{
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.06), 0 0 80px rgba(29,92,255,0.25), 0 40px 160px rgba(0,207,255,0.08)',
            }}
          />

          {/* Phone body */}
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              borderRadius: '48px',
              background: 'linear-gradient(175deg, #0d1829 0%, #060c18 50%, #040810 100%)',
              border: '1px solid rgba(255,255,255,0.09)',
            }}
          >
            {/* Scanline effect */}
            <div
              className="scanline absolute left-0 right-0 pointer-events-none"
              style={{
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(29,92,255,0.3), transparent)',
                zIndex: 10,
                top: 0,
              }}
            />

            {/* Top notch */}
            <div className="flex justify-center pt-4">
              <div
                className="flex items-center gap-2 px-4 py-1.5"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '20px',
                }}
              >
                <span className="ring-dot" />
                <span className="mono text-[10px]" style={{ color: 'rgba(0,207,255,0.8)' }}>COPILO · EN LIGNE</span>
              </div>
            </div>

            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 pt-4 pb-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div
                style={{
                  width: 36, height: 36, borderRadius: 12,
                  background: 'linear-gradient(135deg, #1d5cff 0%, #00cfff 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 16, color: '#fff',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  boxShadow: '0 0 16px rgba(29,92,255,0.5)',
                }}
              >
                C
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#f0f4ff' }}>Copilo</div>
                <div className="flex items-center gap-1.5">
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                  <span className="mono text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>vocal · actif</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col gap-3 px-4 py-4" style={{ height: 'calc(100% - 180px)', overflowY: 'hidden' }}>
              {tr.messages.slice(0, visibleMsgs).map((m, i) => (
                <div
                  key={`${lang}-${i}`}
                  className={`msg-in flex ${m.role === 'u' ? 'justify-end' : 'justify-start'}`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div
                    style={{
                      maxWidth: '88%',
                      padding: '9px 13px',
                      borderRadius: m.role === 'u' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                      fontSize: 11,
                      lineHeight: 1.6,
                      whiteSpace: 'pre-line',
                      fontFamily: "'Barlow', sans-serif",
                      ...(m.role === 'u'
                        ? {
                            background: 'linear-gradient(135deg, #1d5cff, #1040c0)',
                            color: '#fff',
                            boxShadow: '0 2px 12px rgba(29,92,255,0.35)',
                          }
                        : {
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.06)',
                            color: 'rgba(240,244,255,0.9)',
                          }),
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {visibleMsgs < tr.messages.length && (
                <div className="flex justify-start">
                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '18px 18px 18px 4px',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex', gap: 4, alignItems: 'center',
                    }}
                  >
                    {[0, 0.2, 0.4].map((d, i) => (
                      <span
                        key={i}
                        style={{
                          width: 6, height: 6, borderRadius: '50%',
                          background: 'rgba(29,92,255,0.7)',
                          display: 'inline-block',
                          animation: `blink 1.2s ${d}s ease-in-out infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom mic bar */}
            <div
              className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4"
              style={{
                height: 68,
                borderTop: '1px solid rgba(255,255,255,0.05)',
                background: 'rgba(4,8,15,0.97)',
              }}
            >
              <div
                style={{
                  flex: 1, height: 38, borderRadius: 19,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex', alignItems: 'center', paddingLeft: 14,
                }}
              >
                <span className="mono text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Message...
                </span>
              </div>
              <MicButton />
            </div>
          </div>
        </div>

        {/* ── Headline overlay — floats over / below phone ─────────────── */}
        <div
          className="relative z-20 flex flex-col items-center text-center w-full"
          style={{ marginTop: '-20px', paddingBottom: '60px' }}
        >
          {/* Tag */}
          <div
            className="mono fade-up delay-1 mb-5 px-4 py-2 rounded-full"
            style={{
              fontSize: 11,
              letterSpacing: '0.08em',
              color: 'rgba(0,207,255,0.75)',
              background: 'rgba(0,207,255,0.06)',
              border: '1px solid rgba(0,207,255,0.18)',
            }}
          >
            {tr.tag}
          </div>

          {/* H1 */}
          <h1
            className="display fade-up delay-2"
            style={{
              fontSize: 'clamp(52px, 9vw, 96px)',
              color: '#f0f4ff',
              textShadow: '0 0 80px rgba(29,92,255,0.2)',
              maxWidth: '700px',
              padding: '0 20px',
            }}
          >
            <span>{tr.h1a}</span>
            <br />
            <span className="gt-blue">{tr.h1b}</span>
          </h1>

          {/* CTAs */}
          <div className="fade-up delay-3 flex flex-col sm:flex-row gap-4 mt-8 px-6">
            <a
              href="https://t.me/copilo_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, letterSpacing: '0.03em' }}
            >
              <TgIcon />
              {tr.cta1}
            </a>
            <a
              href="#waitlist"
              className="btn-ghost flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-white"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 17, letterSpacing: '0.03em' }}
            >
              {tr.cta2}
            </a>
          </div>

          {/* Voice hint */}
          <div
            className="fade-up delay-4 flex items-center gap-3 mt-6"
            style={{ color: 'rgba(180,200,255,0.45)', fontSize: 13 }}
          >
            <MicIcon />
            <span>{tr.hint}</span>
            <span
              className="mono"
              style={{ color: 'rgba(240,244,255,0.75)', fontSize: 13 }}
            >
              {tr.voice}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Sub-components ──────────────────────────────────────────────────── */
function MicButton() {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 38, height: 38 }}>
      {/* Pulse rings */}
      {[1, 2, 3].map((_, i) => (
        <div
          key={i}
          className={`absolute inset-0 rounded-full`}
          style={{
            border: '1px solid rgba(29,92,255,0.5)',
            animation: `ring 2s ease-out ${i * 0.7}s infinite`,
          }}
        />
      ))}
      <div
        style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1d5cff, #00cfff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(29,92,255,0.5)',
          position: 'relative', zIndex: 2,
        }}
      >
        <MicIconSm />
      </div>
    </div>
  )
}

function TgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(29,92,255,0.9)" strokeWidth="2">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  )
}

function MicIconSm() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  )
}
