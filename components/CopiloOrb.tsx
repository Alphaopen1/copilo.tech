'use client'
import { useEffect, useState } from 'react'

/* ─── CopiloOrb ─────────────────────────────────────────────────────
   Visage de Copilo : orbe iridescente avec halo rainbow rotatif et
   deux yeux blancs animés. Le composant tourne en boucle dans un
   cycle d'expressions naturelles, ou peut être verrouillé sur un mood.

   États possibles :
     - idle        : yeux centrés, respiration calme (défaut)
     - looking     : yeux qui bougent à droite, gauche, haut, bas
     - blinking    : clin d'œil rapide
     - smiling     : yeux qui se plissent (arcs inversés)
     - thinking    : yeux qui regardent vers le haut
     - sleeping    : yeux fermés (deux traits horizontaux)
     - cycle       : enchaîne automatiquement (défaut)
   ───────────────────────────────────────────────────────────────────── */

export type OrbMood =
  | 'idle'
  | 'looking-right' | 'looking-left' | 'looking-up' | 'looking-down'
  | 'blinking'
  | 'smiling'
  | 'thinking'
  | 'sleeping'
  | 'cycle'

export interface CopiloOrbProps {
  size?: number          // taille en px (défaut 200)
  mood?: OrbMood         // verrouille sur un mood précis (sinon cycle)
  pause?: boolean        // met l'animation en pause
}

/** Séquence du cycle automatique (s'enchaîne en boucle) */
const CYCLE: Array<{ mood: OrbMood; durationMs: number }> = [
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

export default function CopiloOrb({
  size = 200,
  mood = 'cycle',
  pause = false,
}: CopiloOrbProps) {
  const [step, setStep] = useState(0)
  const activeMood: OrbMood = mood === 'cycle' ? CYCLE[step].mood : mood

  // Avance dans le cycle quand mood === 'cycle' et pas en pause
  useEffect(() => {
    if (mood !== 'cycle' || pause) return
    const ms = CYCLE[step].durationMs
    const t = setTimeout(() => setStep((s) => (s + 1) % CYCLE.length), ms)
    return () => clearTimeout(t)
  }, [step, mood, pause])

  // Calcul des positions des yeux selon le mood
  const eyeShift = getEyeShift(activeMood)
  const isClosed = activeMood === 'sleeping' || activeMood === 'blinking'
  const isSmile  = activeMood === 'smiling'
  const isThink  = activeMood === 'thinking'

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
      {/* Halo rainbow rotatif (derrière l'orbe) */}
      <div
        className="copilo-orb-halo"
        style={{
          position: 'absolute',
          inset: '-12%',
          borderRadius: '50%',
          background: `conic-gradient(
            from 0deg,
            #ff3d8c,
            #ffb73d,
            #6bff8c,
            #3dc4ff,
            #9b3dff,
            #ff3d8c
          )`,
          filter: 'blur(18px)',
          opacity: 0.55,
          animationPlayState: pause ? 'paused' : 'running',
        }}
      />

      {/* Bordure iridescente de la bulle (un anneau fin) */}
      <div
        className="copilo-orb-rim"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          padding: '2px',
          background: `conic-gradient(
            from 0deg,
            rgba(255,61,140,0.9),
            rgba(255,183,61,0.7),
            rgba(107,255,140,0.9),
            rgba(61,196,255,1),
            rgba(155,61,255,0.9),
            rgba(255,61,140,0.9)
          )`,
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          animationPlayState: pause ? 'paused' : 'running',
        }}
      />

      {/* Corps de la bulle (intérieur sombre + reflet subtil) */}
      <div
        style={{
          position: 'absolute',
          inset: '4%',
          borderRadius: '50%',
          background: `
            radial-gradient(circle at 30% 28%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%),
            radial-gradient(circle at 65% 70%, rgba(155,61,255,0.18) 0%, rgba(0,0,0,0) 55%),
            radial-gradient(circle at center, #0a1828 0%, #04080f 80%)
          `,
          overflow: 'hidden',
        }}
      >
        {/* SVG avec les yeux */}
        <svg
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            display: 'block',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Œil gauche */}
          <Eye
            cx={78 + eyeShift.x}
            cy={100 + eyeShift.y}
            closed={isClosed}
            smile={isSmile}
            thinking={isThink}
            side="left"
          />
          {/* Œil droit */}
          <Eye
            cx={122 + eyeShift.x}
            cy={100 + eyeShift.y}
            closed={isClosed}
            smile={isSmile}
            thinking={isThink}
            side="right"
          />
        </svg>
      </div>

      <style jsx>{`
        .copilo-orb-halo {
          animation: orb-halo-spin 8s linear infinite,
                     orb-halo-breath 4.5s ease-in-out infinite;
        }
        .copilo-orb-rim {
          animation: orb-rim-spin 12s linear infinite reverse;
        }

        @keyframes orb-halo-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orb-rim-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orb-halo-breath {
          0%, 100% { opacity: 0.45; filter: blur(18px); }
          50%      { opacity: 0.75; filter: blur(24px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .copilo-orb-halo, .copilo-orb-rim { animation: none !important; }
        }
      `}</style>
    </div>
  )
}

/* ─── Sous-composant Eye ──────────────────────────────────────────── */

function Eye({
  cx, cy, closed, smile, thinking, side,
}: {
  cx: number; cy: number
  closed: boolean
  smile: boolean
  thinking: boolean
  side: 'left' | 'right'
}) {
  // Taille des yeux : plus petits si pensif, plissés si sourire
  const eyeWidth = smile ? 16 : 11
  const eyeHeight = closed ? 2 : (smile ? 6 : (thinking ? 14 : 18))
  // Si "smiling" : arc inversé (yeux souriants en U)
  if (smile) {
    return (
      <path
        d={`M ${cx - 10} ${cy + 2} Q ${cx} ${cy + 8} ${cx + 10} ${cy + 2}`}
        stroke="#ffffff"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.6))' }}
      />
    )
  }

  // Si "sleeping" ou "blinking" : trait horizontal
  if (closed) {
    return (
      <line
        x1={cx - 8} y1={cy}
        x2={cx + 8} y2={cy}
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.6))' }}
      />
    )
  }

  // Œil par défaut : capsule verticale arrondie blanche
  return (
    <rect
      x={cx - eyeWidth / 2}
      y={cy - eyeHeight / 2}
      width={eyeWidth}
      height={eyeHeight}
      rx={eyeWidth / 2}
      ry={eyeWidth / 2}
      fill="#ffffff"
      style={{
        filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.8))',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    />
  )
}

/* ─── Calcul du déplacement des yeux ──────────────────────────────── */

function getEyeShift(mood: OrbMood): { x: number; y: number } {
  switch (mood) {
    case 'looking-right': return { x:  10, y:  0  }
    case 'looking-left':  return { x: -10, y:  0  }
    case 'looking-up':    return { x:  0,  y: -10 }
    case 'looking-down':  return { x:  0,  y:  10 }
    case 'thinking':      return { x:  8,  y: -8  }
    default:              return { x:  0,  y:  0  }
  }
}
