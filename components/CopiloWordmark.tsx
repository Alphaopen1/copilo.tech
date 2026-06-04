'use client'

import CopiloOrb, { OrbMood } from './CopiloOrb'

/* ─── CopiloWordmark ─────────────────────────────────────────────────
   Le wordmark "Copilo" complet où le "O" final est l'orbe animée.
   Variante B + A fusionnées.
   ──────────────────────────────────────────────────────────────────── */

export interface CopiloWordmarkProps {
  /** Hauteur globale du wordmark (px). Le orb suit la hauteur des lettres. */
  size?: number
  /** Mood de l'orbe — défaut 'cycle' (enchaînement automatique). */
  mood?: OrbMood
  /** Pause les animations. */
  pause?: boolean
  /** Force le texte (sinon affiche "Copil"). */
  text?: string
}

export default function CopiloWordmark({
  size = 80,
  mood = 'cycle',
  pause = false,
  text = 'Copil',
}: CopiloWordmarkProps) {
  // Taille de l'orbe : à peu près la cap-height de la typo
  const orbSize = Math.round(size * 0.86)
  // Marge négative pour rapprocher le orbe du "l"
  const gap = -Math.round(size * 0.04)

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap,
        lineHeight: 1,
        verticalAlign: 'middle',
      }}
      aria-label="Copilo"
    >
      <span
        style={{
          fontFamily: "'Barlow Condensed', 'Inter', sans-serif",
          fontWeight: 800,
          fontSize: size,
          letterSpacing: '-0.005em',
          background: 'linear-gradient(180deg, #ffffff 0%, #c5d6ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'inline-block',
        }}
      >
        {text}
      </span>
      <span
        style={{
          display: 'inline-block',
          // Léger ajustement vertical pour que le orbe s'aligne avec la x-height
          transform: 'translateY(2%)',
        }}
      >
        <CopiloOrb size={orbSize} mood={mood} pause={pause} />
      </span>
    </span>
  )
}
