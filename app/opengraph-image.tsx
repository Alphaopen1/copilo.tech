import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Copilo — Assistant vocal IA pour chauffeurs taxi & VTC'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #04080f 0%, #061228 50%, #04080f 100%)',
        fontFamily: 'sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
          width: 900, height: 500,
          background: 'radial-gradient(ellipse at center, rgba(29,92,255,0.35) 0%, rgba(0,207,255,0.08) 45%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo mark */}
        <div style={{
          width: 72, height: 72, borderRadius: 20,
          background: 'linear-gradient(135deg, #1d5cff 0%, #00cfff 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, fontWeight: 900, color: '#fff',
          marginBottom: 28,
          boxShadow: '0 0 40px rgba(29,92,255,0.5)',
        }}>C</div>

        {/* Headline */}
        <div style={{
          fontSize: 72, fontWeight: 900, color: '#f0f4ff',
          textTransform: 'uppercase', letterSpacing: '-1px',
          lineHeight: 1, marginBottom: 12, display: 'flex',
        }}>
          TON IA EMBARQUÉE.
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 28, color: 'rgba(180,200,255,0.65)',
          maxWidth: 800, textAlign: 'center', lineHeight: 1.4, display: 'flex',
        }}>
          Push-to-talk · Courses CPAM · Calendrier · CA automatique
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
          {['0€ pour démarrer', '< 30s setup', '100% Européen', 'Telegram'].map(t => (
            <div key={t} style={{
              padding: '8px 16px', borderRadius: 8, display: 'flex',
              background: 'rgba(29,92,255,0.15)',
              border: '1px solid rgba(29,92,255,0.35)',
              color: 'rgba(0,207,255,0.85)', fontSize: 18, fontWeight: 600,
            }}>{t}</div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          position: 'absolute', bottom: 32, right: 48,
          fontFamily: 'monospace', fontSize: 20, color: 'rgba(180,200,255,0.3)',
          display: 'flex',
        }}>
          copilo.tech
        </div>
      </div>
    ),
    { ...size }
  )
}
