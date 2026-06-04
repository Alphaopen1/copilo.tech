'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── CopiloIntro ────────────────────────────────────────────────────
   Boucle d'intro 5s :

   • 0.0s → 1.7s : "Copilo.tech" race-in (lettres qui arrivent de gauche,
                    dépassent leur position, se mettent en place).
   • 1.7s → 2.3s : hold
   • 2.3s → 2.6s : clin d'œil — les yeux (barres verticales) se ferment
                    en scaleY depuis le HAUT. Les sourcils (points)
                    restent immobiles à leur place.
   • 2.6s → 4.7s : hold idle
   • 4.7s → 5.0s : fade out smooth du texte
   • 5.0s        : ↻ loop

   L'orbe : PNG "vide" (sans yeux), yeux + sourcils dessinés en SVG
   PAR-DESSUS → on contrôle 100% des animations.
   ──────────────────────────────────────────────────────────────────── */

const TEXT = 'Copilo.tech'
const LOOP_MS = 5000

const RACE_STAGGER_MS = 70
const RACE_CHAR_ANIM_MS = 900
const RACE_TOTAL_MS = RACE_STAGGER_MS * TEXT.length + RACE_CHAR_ANIM_MS
const HOLD_BEFORE_BLINK_MS = 600
const BLINK_START_MS = RACE_TOTAL_MS + HOLD_BEFORE_BLINK_MS
const BLINK_MS = 320
const FADE_OUT_START_MS = 4700

export interface CopiloIntroProps {
  /** Image de l'orbe SANS yeux (defaut /copilo-orb-blank.png). */
  src?: string
  /** Diamètre de l'orbe en px. */
  size?: number
  /** Texte à animer (defaut "Copilo.tech"). */
  text?: string
}

export default function CopiloIntro({
  src = '/copilo-orb-blank.png',
  size = 320,
  text = TEXT,
}: CopiloIntroProps) {
  const [blink, setBlink] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const [raceKey, setRaceKey] = useState(0)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    let cancelled = false

    const runCycle = () => {
      if (cancelled) return
      setBlink(false)
      setFadeOut(false)
      setRaceKey((k) => k + 1)

      timersRef.current.forEach(clearTimeout)
      timersRef.current = [
        setTimeout(() => { if (!cancelled) setBlink(true) },  BLINK_START_MS),
        setTimeout(() => { if (!cancelled) setBlink(false) }, BLINK_START_MS + BLINK_MS),
        setTimeout(() => { if (!cancelled) setFadeOut(true) }, FADE_OUT_START_MS),
        setTimeout(runCycle, LOOP_MS),
      ]
    }

    runCycle()
    return () => {
      cancelled = true
      timersRef.current.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const textFontSize = Math.round(size * 0.30)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: Math.round(size * 0.144),
        userSelect: 'none',
      }}
    >
      {/* ── Orbe : PNG vide + yeux/sourcils SVG par-dessus ──── */}
      <div
        style={{
          position: 'relative',
          width: size,
          height: size,
        }}
      >
        {/* Halo derrière qui respire */}
        <div className="orb-halo" />

        {/* Image PNG (orbe SANS yeux) */}
        <img
          src={src}
          alt="Copilo"
          className="orb-img"
          draggable={false}
        />

        {/* Yeux + sourcils dessinés en SVG — contrôle 100% des animations */}
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          className={`copilo-svg-eyes${blink ? ' blinking' : ''}`}
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
            <filter id="copilo-eye-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="0.8" result="b1" />
              <feMerge>
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ─── Sourcil GAUCHE (le point du "i") — IMMOBILE ─── */}
          <circle
            cx="42" cy="40"
            r="1.6"
            fill="#ffffff"
            filter="url(#copilo-eye-glow)"
          />
          {/* ─── Œil GAUCHE (la barre du "i") — paupière animée ─── */}
          <rect
            className="copilo-eye"
            x="40.5" y="46"
            width="3" height="13"
            rx="1.5" ry="1.5"
            fill="#ffffff"
            filter="url(#copilo-eye-glow)"
          />

          {/* ─── Sourcil DROIT — IMMOBILE ─── */}
          <circle
            cx="58" cy="40"
            r="1.6"
            fill="#ffffff"
            filter="url(#copilo-eye-glow)"
          />
          {/* ─── Œil DROIT — paupière animée ─── */}
          <rect
            className="copilo-eye"
            x="56.5" y="46"
            width="3" height="13"
            rx="1.5" ry="1.5"
            fill="#ffffff"
            filter="url(#copilo-eye-glow)"
          />
        </svg>
      </div>

      {/* ── "Copilo.tech" — race-in stagger ─────────────────── */}
      <div
        key={raceKey}
        className={`copilo-intro-text ${fadeOut ? 'fade-out' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 0,
          minHeight: Math.round(textFontSize * 1.1),
          fontFamily: "'Barlow Condensed', 'Inter', sans-serif",
          fontWeight: 800,
          fontSize: textFontSize,
          letterSpacing: '-0.005em',
        }}
      >
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="race-char"
            style={{
              display: 'inline-block',
              animationDelay: `${i * RACE_STAGGER_MS}ms`,
              whiteSpace: 'pre',
              // Couleur calculée par lettre :
              //  - "Co" (i=0,1)        → blanc Ice
              //  - "pilo.tech" (i≥2)   → interpolation Ice → Cyan → Blue
              // Le gradient global est reconstitué visuellement par
              // la suite de couleurs uniques sur chaque lettre adjacente.
              color: getCharColor(i, text.length),
              filter:
                'drop-shadow(0 0 10px rgba(0, 207, 255, 0.35))',
            }}
          >
            {char === ' ' ? ' ' : char}
          </span>
        ))}
      </div>

      <style jsx>{`
        /* ── Halo néon bleu rotatif (palette site copilo.tech) ──── */
        .orb-halo {
          position: absolute;
          inset: -12%;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            #1d5cff,
            #00cfff,
            #60a5fa,
            #00cfff,
            #1d5cff,
            #0e40c0,
            #1d5cff
          );
          filter: blur(32px);
          opacity: 0.7;
          animation:
            orb-halo-spin 8s linear infinite,
            orb-halo-breath 4.5s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes orb-halo-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orb-halo-breath {
          0%, 100% { opacity: 0.55; filter: blur(32px); }
          50%      { opacity: 0.9;  filter: blur(40px); }
        }

        /* ── Image PNG : juste un léger float ──────────────────── */
        /* mix-blend-mode: screen → les pixels noirs du PNG deviennent
           transparents (carré noir invisible), l'iridescence reste. */
        .orb-img {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          z-index: 1;
          mix-blend-mode: screen;
          animation: orb-float 6s ease-in-out infinite;
        }
        @keyframes orb-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3%); }
        }

        /* ── Yeux : paupière descend depuis le haut ────────────
           transform-origin: center top → scaleY rétrécit depuis le
           HAUT, comme une vraie paupière qui se ferme. Les sourcils
           (les <circle>) ne portent PAS la classe .copilo-eye →
           ils restent fixes. */
        :global(.copilo-svg-eyes .copilo-eye) {
          transform-box: fill-box;
          transform-origin: center top;
          transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
        }
        :global(.copilo-svg-eyes.blinking .copilo-eye) {
          transform: scaleY(0.07);
        }

        /* ── Animation "course automobile" ────────────────────────
           Chaque lettre part de gauche, dépasse, settle. */
        .race-char {
          opacity: 0;
          transform: translateX(-220%) scale(1.4) skewX(-12deg);
          animation:
            race-in ${RACE_CHAR_ANIM_MS}ms cubic-bezier(0.16, 1.02, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
        @keyframes race-in {
          0% {
            opacity: 0;
            transform: translateX(-220%) scale(1.4) skewX(-12deg);
          }
          50% {
            opacity: 1;
            transform: translateX(8%) scale(1.05) skewX(-2deg);
          }
          70% {
            transform: translateX(-3%) scale(0.98) skewX(0deg);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1) skewX(0deg);
          }
        }

        /* ── Fade out fin de loop ──────────────────────────────── */
        .copilo-intro-text {
          opacity: 1;
          transition: opacity 280ms ease;
        }
        .copilo-intro-text.fade-out {
          opacity: 0;
        }

        /* ── Accessibilité ─────────────────────────────────────── */
        @media (prefers-reduced-motion: reduce) {
          .orb-halo, .orb-img, .race-char, .copilo-intro-text {
            animation: none !important;
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  )
}

/* ─── Helpers : interpolation de couleur par lettre ──────────────────
   "Co" reste blanc Ice. À partir de "p" (index 2), gradient smooth
   Ice → Cyan → Blue jusqu'au dernier caractère. La progression t
   distribuée uniformément donne un effet de gradient horizontal
   reconstitué par les couleurs uniques de chaque lettre adjacente.
   ──────────────────────────────────────────────────────────────────── */

const WHITE_PREFIX_LEN = 2  // "Co" → blanc

const COLOR_ICE  = { r: 240, g: 244, b: 255 }   // #f0f4ff
const COLOR_CYAN = { r:   0, g: 207, b: 255 }   // #00cfff
const COLOR_BLUE = { r:  29, g:  92, b: 255 }   // #1d5cff

function getCharColor(index: number, total: number): string {
  if (index < WHITE_PREFIX_LEN) return 'rgb(240, 244, 255)'  // Ice

  // Progression normalisée 0 → 1 entre "p" et la dernière lettre
  const span = Math.max(1, total - 1 - WHITE_PREFIX_LEN)
  const t = (index - WHITE_PREFIX_LEN) / span

  // 3-stops : Ice (0) → Cyan (0.5) → Blue (1)
  if (t <= 0.5) return mix(COLOR_ICE, COLOR_CYAN, t * 2)
  return mix(COLOR_CYAN, COLOR_BLUE, (t - 0.5) * 2)
}

function mix(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number,
): string {
  const r = Math.round(a.r + (b.r - a.r) * t)
  const g = Math.round(a.g + (b.g - a.g) * t)
  const bl = Math.round(a.b + (b.b - a.b) * t)
  return `rgb(${r}, ${g}, ${bl})`
}
