import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Copilo — Tu conduis, Copilo gère le reste'
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
          background: 'radial-gradient(ellipse at center, rgba(29,92,255,0.4) 0%, rgba(0,207,255,0.1) 45%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo : orbe iridescente statique avec yeux verticaux + sourcils */}
        <div style={{
          position: 'relative',
          width: 96, height: 96,
          marginBottom: 32,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Halo néon bleu derrière */}
          <div style={{
            position: 'absolute',
            inset: -16,
            borderRadius: '50%',
            background: 'conic-gradient(from 0deg, #1d5cff, #00cfff, #60a5fa, #00cfff, #1d5cff, #0e40c0, #1d5cff)',
            filter: 'blur(28px)',
            opacity: 0.75,
            display: 'flex',
          }} />
          {/* Corps de l'orbe iridescente (radial + conic) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%),' +
              'conic-gradient(from 220deg at 50% 50%, #4a86ff, #00cfff, #b388ff, #00cfff, #1d5cff, #4a86ff)',
            border: '1.5px solid rgba(255,255,255,0.18)',
            boxShadow: 'inset 0 0 24px rgba(0,0,0,0.4)',
            display: 'flex',
          }} />
          {/* Yeux + sourcils blancs lumineux */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14,
          }}>
            {[0, 1].map((i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              }}>
                {/* Sourcil */}
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#fff',
                              boxShadow: '0 0 6px rgba(255,255,255,0.9)', display: 'flex' }} />
                {/* Œil (barre verticale) */}
                <div style={{ width: 6, height: 24, borderRadius: 3, background: '#fff',
                              boxShadow: '0 0 8px rgba(255,255,255,0.9), 0 0 16px rgba(0,207,255,0.6)',
                              display: 'flex' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: 70, fontWeight: 900, color: '#f0f4ff',
          textTransform: 'uppercase', letterSpacing: '-1px',
          lineHeight: 1, marginBottom: 8, display: 'flex',
        }}>
          TU CONDUIS.
        </div>
        <div style={{
          fontSize: 70, fontWeight: 900,
          background: 'linear-gradient(90deg, #f0f4ff 0%, #00cfff 60%, #4a86ff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textTransform: 'uppercase', letterSpacing: '-1px',
          lineHeight: 1, marginBottom: 18, display: 'flex',
        }}>
          COPILO GÈRE LE RESTE.
        </div>

        {/* Sub */}
        <div style={{
          fontSize: 26, color: 'rgba(180,200,255,0.7)',
          maxWidth: 900, textAlign: 'center', lineHeight: 1.4, display: 'flex',
        }}>
          Secrétariat téléphonique IA pour taxi & VTC · sur Telegram
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
          {['0€ pour démarrer', '< 30s setup', '100% Européen', 'Telegram'].map(t => (
            <div key={t} style={{
              padding: '8px 16px', borderRadius: 8, display: 'flex',
              background: 'rgba(0,207,255,0.12)',
              border: '1px solid rgba(0,207,255,0.32)',
              color: 'rgba(0,207,255,0.9)', fontSize: 18, fontWeight: 600,
            }}>{t}</div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          position: 'absolute', bottom: 32, right: 48,
          fontFamily: 'monospace', fontSize: 20, color: 'rgba(180,200,255,0.35)',
          display: 'flex',
        }}>
          copilo.tech
        </div>
      </div>
    ),
    { ...size }
  )
}
