'use client'

import { useEffect, useState } from 'react'

/* ─── CopiloOrbHero ──────────────────────────────────────────────────
   Variante "visage de l'app native" de l'orbe :
   - Image PNG iridescente vide en background
   - Yeux + sourcils dessinés en SVG par-dessus
   - Supporte tous les moods (idle, look-*, blink, smile, thinking, sleep, cycle)

   Les sourcils (points circulaires) restent FIXES en toutes
   circonstances. Seuls les yeux (barres rectangulaires) sont animés.
   ──────────────────────────────────────────────────────────────────── */

export type HeroOrbMood =
  | 'idle'
  | 'looking-right'
  | 'looking-left'
  | 'looking-up'
  | 'looking-down'
  | 'blinking'
  | 'smiling'
  | 'thinking'
  | 'sleeping'
  | 'cycle'

export interface CopiloOrbHeroProps {
  size?: number
  mood?: HeroOrbMood
  src?: string
  pause?: boolean
}

/** Séquence du cycle automatique */
const CYCLE: Array<{ mood: HeroOrbMood; durationMs: number }> = [
  { mood: 'idle',          durationMs: 2200 },
  { mood: 'looking-right', durationMs: 1200 },
  { mood: 'idle',          durationMs: 800  },
  { mood: 'looking-left',  durationMs: 1200 },
  { mood: 'blinking',      durationMs: 350  },
  { mood: 'smiling',       durationMs: 1600 },
  { mood: 'thinking',      durationMs: 1500 },
  { mood: 'idle',          durationMs: 900  },
  { mood: 'looking-down',  durationMs: 1100 },
  { mood: 'blinking',      durationMs: 350  },
  { mood: 'idle',          durationMs: 1800 },
]

export default function CopiloOrbHero({
  size = 200,
  mood = 'cycle',
  src = '/copilo-orb-blank.png',
  pause = false,
}: CopiloOrbHeroProps) {
  const [step, setStep] = useState(0)
  const activeMood: HeroOrbMood =
    mood === 'cycle' ? CYCLE[step].mood : mood

  // Avance dans le cycle automatique
  useEffect(() => {
    if (mood !== 'cycle' || pause) return
    const ms = CYCLE[step].durationMs
    const t = setTimeout(() => setStep((s) => (s + 1) % CYCLE.length), ms)
    return () => clearTimeout(t)
  }, [step, mood, pause])

  // Position des yeux selon le mood (translation XY uniquement)
  const shift = getEyeShift(activeMood)

  // États
  const isClosed = activeMood === 'sleeping' || activeMood === 'blinking'
  const isSmile  = activeMood === 'smiling'

  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-block',
      }}
      aria-label="Copilo orb"
    >
      {/* Halo derrière */}
      <div className="hero-orb-halo" />

      {/* Orbe iridescente PNG (vide, sans yeux) */}
      <img
        src={src}
        alt="Copilo"
        className="hero-orb-img"
        draggable={false}
      />

      {/* Yeux + sourcils SVG */}
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}
        aria-hidden
      >
        <defs>
          <filter id="hero-eye-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.8" result="b1" />
            <feMerge>
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sourcils — TOUJOURS FIXES, jamais animés */}
        <circle cx="42" cy="40" r="1.6" fill="#ffffff" filter="url(#hero-eye-glow)" />
        <circle cx="58" cy="40" r="1.6" fill="#ffffff" filter="url(#hero-eye-glow)" />

        {/* Yeux — translation selon le mood + scaleY pour fermer */}
        <g
          className={`hero-eyes ${isClosed ? 'closed' : ''} ${isSmile ? 'smiling' : ''}`}
          style={{
            transform: `translate(${shift.x}px, ${shift.y}px)`,
            transition: 'transform 380ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {!isSmile && (
            <>
              {/* Œil gauche (barre verticale) */}
              <rect
                className="hero-eye"
                x="40.5" y="46"
                width="3" height="13"
                rx="1.5" ry="1.5"
                fill="#ffffff"
                filter="url(#hero-eye-glow)"
              />
              {/* Œil droit (barre verticale) */}
              <rect
                className="hero-eye"
                x="56.5" y="46"
                width="3" height="13"
                rx="1.5" ry="1.5"
                fill="#ffffff"
                filter="url(#hero-eye-glow)"
              />
            </>
          )}

          {isSmile && (
            <>
              {/* Sourire : arcs en U sous chaque sourcil */}
              <path
                d="M 39 50 Q 42 56 45 50"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                filter="url(#hero-eye-glow)"
              />
              <path
                d="M 55 50 Q 58 56 61 50"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                fill="none"
                filter="url(#hero-eye-glow)"
              />
            </>
          )}
        </g>
      </svg>

      <style jsx>{`
        /* ── Halo respirant ───────────────────────────────────── */
        .hero-orb-halo {
          position: absolute;
          inset: -8%;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(0, 207, 255, 0.18) 0%,
            rgba(155, 61, 255, 0.10) 30%,
            transparent 65%
          );
          filter: blur(28px);
          animation: hero-halo-breath 4.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes hero-halo-breath {
          0%, 100% { opacity: 0.55; transform: scale(0.96); }
          50%      { opacity: 1;    transform: scale(1.06); }
        }

        /* ── Image PNG : juste un léger float ─────────────────── */
        .hero-orb-img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          z-index: 1;
          animation: hero-orb-float 6s ease-in-out infinite;
        }
        @keyframes hero-orb-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3%); }
        }

        /* ── Yeux : paupière descend depuis le haut ───────────── */
        :global(.hero-eye) {
          transform-box: fill-box;
          transform-origin: center top;
          transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        :global(.hero-eyes.closed .hero-eye) {
          transform: scaleY(0.07);
        }

        /* ── Accessibilité ────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .hero-orb-halo, .hero-orb-img {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}

/* ─── Helper : translation des yeux selon le mood ─────────────────── */

function getEyeShift(mood: HeroOrbMood): { x: number; y: number } {
  // Translation en unités viewBox (sur 100×100)
  switch (mood) {
    case 'looking-right': return { x:  2.8, y:  0   }
    case 'looking-left':  return { x: -2.8, y:  0   }
    case 'looking-up':    return { x:  0,   y: -2.2 }
    case 'looking-down':  return { x:  0,   y:  2.2 }
    case 'thinking':      return { x:  2.0, y: -2.0 }
    default:              return { x:  0,   y:  0   }
  }
}
