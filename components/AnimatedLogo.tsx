'use client'
import React from 'react'

/* ─── AnimatedLogo ─────────────────────────────────────────────────
   Logo Copilo dynamique : C calligraphique + point central pulsant
   + 3 satellites qui s'illuminent en séquence.
   Reproduit l'animation de référence : 5s loop, glow violet/cyan.
   ─────────────────────────────────────────────────────────────────── */

export interface AnimatedLogoProps {
  size?: number            // taille du symbole en px (défaut 80)
  showText?: boolean       // affiche "Copilo" à côté
  textSize?: number        // taille du wordmark en px (défaut 24)
  pause?: boolean          // met l'animation en pause
}

export default function AnimatedLogo({
  size = 80,
  showText = false,
  textSize = 24,
  pause = false,
}: AnimatedLogoProps) {
  // viewBox 100x100 — proportions conservées
  // Le C calligraphique est dessiné à la main, courbé et expressif
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: showText ? Math.round(size * 0.35) : 0,
        lineHeight: 1,
      }}
      aria-label="Copilo"
    >
      <span
        style={{
          position: 'relative',
          display: 'inline-block',
          width: size,
          height: size,
          animationPlayState: pause ? 'paused' : 'running',
        }}
      >
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
          role="img"
        >
          <defs>
            {/* Dégradé du C : blanc vers gris clair, avec un soupçon de cyan
                pour reprendre la palette copilo.tech */}
            <linearGradient id="copilo-c-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e6edff" />
              <stop offset="100%" stopColor="#9fb4d6" />
            </linearGradient>

            {/* Dégradé du point central : violet → cyan */}
            <radialGradient id="copilo-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%"  stopColor="#e0c3ff" />
              <stop offset="40%" stopColor="#a78bff" />
              <stop offset="80%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
            </radialGradient>

            {/* Halo doux */}
            <filter id="copilo-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── C calligraphique (path dessiné à la main) ───────────── */}
          {/* Forme expressive : l'épaisseur varie, courbure ouverte à droite,
              petites terminaisons "manuscrites" en haut et en bas. */}
          <path
            d="
              M 78 18
              C 60 8, 36 10, 22 26
              C 8 42, 8 66, 24 80
              C 40 94, 64 92, 80 80
              L 80 86
              C 62 98, 36 98, 20 84
              C 0 66, 2 38, 22 22
              C 40 6, 64 4, 82 14
              Z
            "
            fill="url(#copilo-c-grad)"
            filter="url(#copilo-glow)"
          />

          {/* Petits points d'engrenage intégrés au C — discrets, signature */}
          <circle cx="22" cy="50" r="1.4" fill="rgba(255,255,255,0.55)" />
          <circle cx="78" cy="50" r="1.4" fill="rgba(255,255,255,0.55)" />

          {/* ── Point central pulsant (le "cerveau" du C) ───────────── */}
          <g style={{ transformOrigin: '50px 50px' }}>
            <circle
              cx="50" cy="50" r="9"
              fill="url(#copilo-core)"
              className="copilo-core"
              filter="url(#copilo-glow)"
            />
            {/* Petit highlight blanc au centre */}
            <circle cx="50" cy="50" r="2" fill="#fff" opacity="0.9" />
          </g>

          {/* ── 3 satellites en séquence ─────────────────────────────
              Positions (autour du C, dans la zone de glow) :
              - sat-1 : bas-gauche  (45° sud-ouest)
              - sat-2 : haut-droite (45° nord-est)
              - sat-3 : bas-droite  (45° sud-est)
              Ils s'allument les uns après les autres en boucle de 5s. */}
          <g>
            {/* Satellite 1 — cyan, bas-gauche */}
            <circle
              cx="20" cy="82" r="3"
              fill="#06b6d4"
              className="copilo-sat copilo-sat-1"
            />
            {/* Satellite 2 — violet, haut-droite */}
            <circle
              cx="86" cy="22" r="3"
              fill="#a78bff"
              className="copilo-sat copilo-sat-2"
            />
            {/* Satellite 3 — cyan-violet, bas-droite */}
            <circle
              cx="84" cy="78" r="3"
              fill="#7c3aed"
              className="copilo-sat copilo-sat-3"
            />
          </g>
        </svg>
      </span>

      {showText && (
        <span
          style={{
            fontFamily: "'Barlow Condensed', 'Inter', sans-serif",
            fontWeight: 700,
            fontSize: textSize,
            color: '#f0f4ff',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          Copilo<span style={{ color: '#00cfff' }}>.</span>
        </span>
      )}

      <style jsx>{`
        /* ── Le cœur du logo respire en permanence (2.4s) ─────── */
        :global(.copilo-core) {
          transform-origin: 50px 50px;
          transform-box: fill-box;
          animation: copilo-core-breath 2.4s ease-in-out infinite;
        }
        @keyframes copilo-core-breath {
          0%, 100% {
            transform: scale(0.92);
            filter: drop-shadow(0 0 4px rgba(167, 139, 255, 0.5));
          }
          50% {
            transform: scale(1.12);
            filter: drop-shadow(0 0 14px rgba(167, 139, 255, 0.95));
          }
        }

        /* ── Satellites : opacité + glow, en séquence 5s ──────── */
        :global(.copilo-sat) {
          opacity: 0.18;
          transform-origin: center;
          transform-box: fill-box;
          transition: filter 0.3s ease;
        }
        :global(.copilo-sat-1) {
          animation: copilo-pulse 5s ease-in-out infinite;
          animation-delay: 0s;
        }
        :global(.copilo-sat-2) {
          animation: copilo-pulse 5s ease-in-out infinite;
          animation-delay: 1.2s;
        }
        :global(.copilo-sat-3) {
          animation: copilo-pulse 5s ease-in-out infinite;
          animation-delay: 2.4s;
        }
        @keyframes copilo-pulse {
          0%, 8%      { opacity: 0.18; transform: scale(0.7); }
          18%, 32%    { opacity: 1;    transform: scale(1.6); }
          50%, 100%   { opacity: 0.18; transform: scale(0.7); }
        }

        /* Halo des satellites quand ils brillent — synced via filter */
        :global(.copilo-sat-1) { filter: drop-shadow(0 0 0 transparent); }
        :global(.copilo-sat-1) { animation-name: copilo-pulse-cyan; }
        :global(.copilo-sat-2) { animation-name: copilo-pulse-violet; }
        :global(.copilo-sat-3) { animation-name: copilo-pulse-mix; }

        @keyframes copilo-pulse-cyan {
          0%, 8%      { opacity: 0.18; transform: scale(0.7); filter: drop-shadow(0 0 0 transparent); }
          18%, 32%    { opacity: 1;    transform: scale(1.6); filter: drop-shadow(0 0 8px #06b6d4) drop-shadow(0 0 16px rgba(6,182,212,0.6)); }
          50%, 100%   { opacity: 0.18; transform: scale(0.7); filter: drop-shadow(0 0 0 transparent); }
        }
        @keyframes copilo-pulse-violet {
          0%, 8%      { opacity: 0.18; transform: scale(0.7); filter: drop-shadow(0 0 0 transparent); }
          18%, 32%    { opacity: 1;    transform: scale(1.6); filter: drop-shadow(0 0 8px #a78bff) drop-shadow(0 0 16px rgba(167,139,255,0.6)); }
          50%, 100%   { opacity: 0.18; transform: scale(0.7); filter: drop-shadow(0 0 0 transparent); }
        }
        @keyframes copilo-pulse-mix {
          0%, 8%      { opacity: 0.18; transform: scale(0.7); filter: drop-shadow(0 0 0 transparent); }
          18%, 32%    { opacity: 1;    transform: scale(1.6); filter: drop-shadow(0 0 8px #7c3aed) drop-shadow(0 0 16px rgba(124,58,237,0.6)); }
          50%, 100%   { opacity: 0.18; transform: scale(0.7); filter: drop-shadow(0 0 0 transparent); }
        }

        @media (prefers-reduced-motion: reduce) {
          :global(.copilo-core),
          :global(.copilo-sat) {
            animation: none !important;
            opacity: 0.9;
          }
        }
      `}</style>
    </span>
  )
}
