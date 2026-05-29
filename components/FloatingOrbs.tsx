'use client'

/* ── FacilPay-style floating glowing orbs ─────────────────────────────
   Decorative coin-orbs with electric-blue rim glow that drift slowly.
   Purely cosmetic: pointer-events none, aria-hidden.                    */

type Orb = {
  top?: string; bottom?: string; left?: string; right?: string
  size: number; delay: number; dur: number; icon: 'tg' | 'mic' | 'c'
}

const ORBS: Orb[] = [
  { left: '6%',  top: '22%',    size: 64, delay: 0,   dur: 7,  icon: 'tg'  },
  { right: '8%', top: '34%',    size: 52, delay: 1.2, dur: 8,  icon: 'mic' },
  { left: '14%', bottom: '14%', size: 44, delay: 0.6, dur: 6.5, icon: 'c'  },
  { right: '13%', bottom: '20%', size: 72, delay: 1.8, dur: 9, icon: 'c'   },
]

function OrbGlyph({ icon, s }: { icon: Orb['icon']; s: number }) {
  const c = '#bfe3ff'
  if (icon === 'tg')
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    )
  if (icon === 'mic')
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    )
  return (
    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: s, color: c, lineHeight: 1 }}>C</span>
  )
}

export default function FloatingOrbs() {
  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {ORBS.map((o, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: o.top, bottom: o.bottom, left: o.left, right: o.right,
            width: o.size, height: o.size, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'radial-gradient(circle at 35% 30%, rgba(40,80,160,0.55), rgba(6,14,30,0.9) 70%)',
            border: '1px solid rgba(120,180,255,0.35)',
            boxShadow:
              '0 0 0 1px rgba(0,180,255,0.25), 0 0 28px rgba(0,160,255,0.45), inset 0 0 18px rgba(0,160,255,0.25)',
            animation: `orbDrift ${o.dur}s ease-in-out ${o.delay}s infinite`,
          }}
        >
          <OrbGlyph icon={o.icon} s={Math.round(o.size * 0.4)} />
        </div>
      ))}
    </div>
  )
}
