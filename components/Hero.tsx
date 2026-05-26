'use client'
import { useState, useEffect, useRef } from 'react'

/* ── Translations ─────────────────────────────────────────────────── */
const T = {
  fr: {
    tag: '// PROPULSÉ PAR IA · CHIFFREMENT EU · RGPD',
    h1a: 'TON COPILOTE',
    h1b: 'VOCAL DE ROUTE.',
    cta: 'Rejoindre sur Telegram',
    hint: 'ou dis simplement',
    voice: '"Salut Copilo"',
    messages: [
      { role: 'u', text: '🎙️ Ajoute une course demain 9h, Nice → Cannes, Mme Dupont' },
      { role: 'c', text: '📅 Course #42\n• 15/06 à 09:00 — Mme Dupont\n• Nice → Cannes · ⏱ 40 min\n• 💰 CA CPAM 46.20 € + 🛣️ 3.70 €' },
      { role: 'u', text: '✅ Confirme' },
      { role: 'c', text: '✅ Course créée · 📅 Google Calendar mis à jour' },
    ],
  },
  en: {
    tag: '// POWERED BY AI · EU ENCRYPTION · GDPR',
    h1a: 'YOUR INTELLIGENT',
    h1b: 'VOICE COPILOT.',
    cta: 'Join on Telegram',
    hint: 'or simply say',
    voice: '"Hey Copilo"',
    messages: [
      { role: 'u', text: '🎙️ Add a ride tomorrow 9am, Nice → Cannes, Ms Dupont' },
      { role: 'c', text: '📅 Ride #42\n• Jun 15 at 09:00 — Ms Dupont\n• Nice → Cannes · ⏱ 40 min\n• 💰 Revenue €46.20 + 🛣️ €3.70' },
      { role: 'u', text: '✅ Confirm' },
      { role: 'c', text: '✅ Ride created · 📅 Google Calendar updated' },
    ],
  },
}

/* ── Typing messages hook ─────────────────────────────────────────── */
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

/* ── Component ────────────────────────────────────────────────────── */
export default function Hero({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  const visibleMsgs = useTypingMessages(tr.messages)
  const phoneRef = useRef<HTMLDivElement>(null)

  /* Scroll zoom/dezoom ─────────────────────────────── */
  useEffect(() => {
    let raf: number
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!phoneRef.current) return
        const p = Math.min(window.scrollY / window.innerHeight, 1)
        // 0→0.4 : zoom in  (1.0 → 1.13)
        // 0.4→1 : dezoom   (1.13 → 0.88)
        const scale =
          p < 0.4
            ? 1 + (p / 0.4) * 0.13
            : 1.13 - ((p - 0.4) / 0.6) * 0.25
        phoneRef.current.style.transform = `scale(${scale.toFixed(4)})`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    /* ── Tall section gives scroll room ── */
    <section className="relative" style={{ height: '160vh' }}>

      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 overflow-hidden atmo-bg"
        style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* Stars */}
        <div className="stars" />

        {/* Horizon glow */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            top: '-60px', width: '1000px', height: '550px',
            background: 'radial-gradient(ellipse 65% 65% at 50% 0%, rgba(29,92,255,0.5) 0%, rgba(0,207,255,0.18) 40%, transparent 70%)',
            filter: 'blur(3px)',
          }}
        />

        {/* ── Phone container (scroll-zoomed) ── */}
        <div
          ref={phoneRef}
          style={{
            position: 'relative',
            width: 'min(460px, 90vw)',
            height: 'min(880px, 88vh)',
            transformOrigin: 'center center',
            willChange: 'transform',
            flexShrink: 0,
          }}
        >
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-[52px] pointer-events-none"
            style={{
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.07), 0 0 100px rgba(29,92,255,0.3), 0 60px 180px rgba(0,207,255,0.1)',
            }}
          />

          {/* Phone body */}
          <div
            style={{
              position: 'relative', width: '100%', height: '100%',
              borderRadius: '48px',
              background: 'linear-gradient(175deg, #0d1829 0%, #060c18 55%, #040810 100%)',
              border: '1px solid rgba(255,255,255,0.09)',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Scanline */}
            <div
              className="scanline"
              style={{
                position: 'absolute', left: 0, right: 0, height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(29,92,255,0.35), transparent)',
                zIndex: 10, top: 0, pointerEvents: 'none',
              }}
            />

            {/* ── Notch ── */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '14px 0 0' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '5px 14px',
                background: 'rgba(0,0,0,0.55)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 8px #22c55e',
                  display: 'inline-block',
                }} />
                <span className="mono" style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(0,207,255,0.85)' }}>
                  COPILO · EN LIGNE
                </span>
              </div>
            </div>

            {/* ── Chat header ── */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 20px 12px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                background: 'linear-gradient(135deg, #1d5cff 0%, #00cfff 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 900, fontSize: 18, color: '#fff',
                boxShadow: '0 0 18px rgba(29,92,255,0.55)',
              }}>C</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#f0f4ff' }}>Copilo</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                  <span className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.06em' }}>
                    vocal · actif
                  </span>
                </div>
              </div>
            </div>

            {/* ── Messages ── */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, padding: '14px 16px', overflowY: 'hidden' }}>
              {tr.messages.slice(0, visibleMsgs).map((m, i) => (
                <div
                  key={`${lang}-${i}`}
                  className="msg-in"
                  style={{
                    display: 'flex',
                    justifyContent: m.role === 'u' ? 'flex-end' : 'flex-start',
                    animationDelay: `${i * 0.06}s`,
                  }}
                >
                  <div style={{
                    maxWidth: '86%',
                    padding: '8px 12px',
                    borderRadius: m.role === 'u' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    fontSize: 11, lineHeight: 1.6, whiteSpace: 'pre-line',
                    fontFamily: "'Barlow', sans-serif",
                    ...(m.role === 'u'
                      ? { background: 'linear-gradient(135deg, #1d5cff, #1040c0)', color: '#fff', boxShadow: '0 2px 14px rgba(29,92,255,0.4)' }
                      : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(240,244,255,0.9)' }
                    ),
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}

              {/* Typing dots */}
              {visibleMsgs < tr.messages.length && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '9px 13px', borderRadius: '16px 16px 16px 4px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex', gap: 4, alignItems: 'center',
                  }}>
                    {[0, 0.2, 0.4].map((d, i) => (
                      <span key={i} style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: 'rgba(29,92,255,0.75)',
                        display: 'inline-block',
                        animation: `blink 1.2s ${d}s ease-in-out infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Headline & CTA — inside the phone ── */}
            <div style={{
              padding: '16px 22px 20px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              background: 'linear-gradient(to top, rgba(4,8,15,0.8), transparent)',
            }}>
              {/* Tag */}
              <div className="mono" style={{
                fontSize: 9, letterSpacing: '0.1em',
                color: 'rgba(0,207,255,0.65)', marginBottom: 10,
              }}>
                {tr.tag}
              </div>

              {/* H1 */}
              <h1 className="display" style={{
                fontSize: 'clamp(28px, 6vw, 40px)',
                color: '#f0f4ff',
                lineHeight: 0.95,
                marginBottom: 16,
              }}>
                {tr.h1a}<br />
                <span className="gt-blue">{tr.h1b}</span>
              </h1>

              {/* CTA */}
              <a
                href="https://t.me/copilo_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: 12, textDecoration: 'none',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: 15, letterSpacing: '0.05em',
                  textTransform: 'uppercase', color: '#fff',
                }}
              >
                <TgIcon />
                {tr.cta}
              </a>
            </div>

            {/* ── Bottom mic bar ── */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px',
              height: 58,
              borderTop: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(4,8,15,0.97)',
            }}>
              <div style={{
                flex: 1, height: 34, borderRadius: 17,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex', alignItems: 'center', paddingLeft: 12,
              }}>
                <span className="mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
                  Message...
                </span>
              </div>
              <MicButton />
            </div>
          </div>
        </div>

        {/* ── Voice hint — below the phone ── */}
        <div
          style={{
            position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
          }}
        >
          <MicIcon />
          <span style={{ fontSize: 12, color: 'rgba(180,200,255,0.38)' }}>{tr.hint}</span>
          <span className="mono" style={{ fontSize: 12, color: 'rgba(240,244,255,0.6)' }}>{tr.voice}</span>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          style={{
            position: 'absolute', bottom: 28, right: 'clamp(16px,4vw,40px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          }}
        >
          <div style={{
            width: 1, height: 40,
            background: 'linear-gradient(to bottom, rgba(29,92,255,0.5), transparent)',
            animation: 'scroll-line 2s ease-in-out infinite',
          }} />
          <span className="mono" style={{ fontSize: 9, color: 'rgba(180,200,255,0.3)', letterSpacing: '0.12em', writingMode: 'vertical-rl' }}>
            SCROLL
          </span>
        </div>
      </div>
    </section>
  )
}

/* ── Sub-components ──────────────────────────────────────────────── */
function MicButton() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, flexShrink: 0 }}>
      {[0, 0.7, 1.4].map((d, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1px solid rgba(29,92,255,0.5)',
          animation: `ring 2s ease-out ${d}s infinite`,
        }} />
      ))}
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: 'linear-gradient(135deg, #1d5cff, #00cfff)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 0 20px rgba(29,92,255,0.5)',
        position: 'relative', zIndex: 2,
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
          <line x1="12" x2="12" y1="19" y2="22"/>
        </svg>
      </div>
    </div>
  )
}

function TgIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(29,92,255,0.8)" strokeWidth="2">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  )
}
