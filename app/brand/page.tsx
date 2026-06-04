'use client'

import { useState } from 'react'
import CopiloOrb, { OrbMood } from '@/components/CopiloOrb'
import CopiloOrbHero, { HeroOrbMood } from '@/components/CopiloOrbHero'
import CopiloWordmark from '@/components/CopiloWordmark'
import CopiloIntro from '@/components/CopiloIntro'

const MOODS: { id: OrbMood; label: string; desc: string }[] = [
  { id: 'cycle',         label: '🔄 Cycle auto',  desc: 'Enchaîne automatiquement (defaut)' },
  { id: 'idle',          label: '😐 Idle',         desc: 'Calme, yeux centrés' },
  { id: 'looking-right', label: '👉 Look →',       desc: 'Regarde à droite' },
  { id: 'looking-left',  label: '👈 Look ←',       desc: 'Regarde à gauche' },
  { id: 'looking-up',    label: '👆 Look ↑',       desc: 'Regarde en haut' },
  { id: 'looking-down',  label: '👇 Look ↓',       desc: 'Regarde en bas' },
  { id: 'blinking',      label: '😉 Blink',        desc: 'Clin d\'œil (les yeux ferment)' },
  { id: 'smiling',       label: '😊 Smile',        desc: 'Sourit (yeux plissés en U)' },
  { id: 'thinking',      label: '🤔 Thinking',     desc: 'Réfléchit (regarde haut-droite)' },
  { id: 'sleeping',      label: '😴 Sleep',        desc: 'En veille (yeux fermés)' },
]

export default function BrandPage() {
  const [mood, setMood] = useState<OrbMood>('cycle')

  return (
    <main style={{
      minHeight: '100vh',
      background: '#04080f',
      color: '#f0f4ff',
      fontFamily: "'Barlow', sans-serif",
      padding: '60px clamp(20px, 5vw, 80px)',
      position: 'relative',
    }}>
      <div aria-hidden style={{
        position: 'fixed', inset: 0,
        backgroundImage:
          'linear-gradient(rgba(29,92,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(29,92,255,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 12, letterSpacing: '0.14em',
          color: 'rgba(0,207,255,0.7)',
          textTransform: 'uppercase', marginBottom: 16,
        }}>
          // BRAND · IDENTITY KIT
        </div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 'clamp(36px, 5vw, 56px)',
          fontWeight: 800, textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Le visage de Copilo
        </h1>
        <p style={{ color: 'rgba(180,200,255,0.6)', marginBottom: 60, maxWidth: 640 }}>
          Variante B (wordmark) + Variante A (orbe) fusionnées : le "o" final est
          l'orbe iridescente animée. L'orbe seule sert de visage pour l'app native future
          (clin d'œil, sourire, réflexion, veille).
        </p>

        {/* === INTRO ANIMÉE — Orbe photo + typing Copilo.tech === */}
        <Section title="Intro animée · Orbe + Copilo.tech (loop 5s)" accent="#ec4899">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '50px 20px',
            background: '#000',
            borderRadius: 16,
            minHeight: 480,
          }}>
            <CopiloIntro size={340} />
          </div>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11, letterSpacing: '0.08em',
            color: 'rgba(180,200,255,0.45)',
            textAlign: 'center', textTransform: 'uppercase',
            marginTop: 16,
          }}>
            ↑ race-in 1.7s · hold 0.6s · clin d'œil 0.3s · hold 2.0s · fade 0.3s · loop 5s
          </p>
          <p style={{
            fontSize: 13,
            color: 'rgba(180,200,255,0.55)',
            textAlign: 'center',
            marginTop: 8,
            maxWidth: 540,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            💡 Pour remplacer l'orbe par ta version exacte : sauve l'image sous
            <code style={{ color: '#00cfff' }}> copilo.tech/public/copilo-orb-blank.png</code>
          </p>
        </Section>

        {/* === HERO — Wordmark animé en taille XL === */}
        <Section title="Wordmark — Copil + Orb-O fusionnés" accent>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 20px',
            minHeight: 320,
          }}>
            <CopiloWordmark size={140} mood={mood} />
          </div>
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11, letterSpacing: '0.08em',
            color: 'rgba(180,200,255,0.45)',
            textAlign: 'center', textTransform: 'uppercase',
            marginTop: 12,
          }}>
            ↑ Mood actif : {mood}
          </p>
        </Section>

        {/* === Tailles d'usage du wordmark === */}
        <Section title="Tailles d'usage" bg="rgba(255,255,255,0.02)">
          <div style={{
            display: 'flex', flexDirection: 'column',
            gap: 32, alignItems: 'flex-start',
          }}>
            <Row label="36px · Footer / mention discrète">
              <CopiloWordmark size={36} mood="idle" />
            </Row>
            <Row label="56px · Navigation header">
              <CopiloWordmark size={56} mood="cycle" />
            </Row>
            <Row label="80px · Hero (defaut)">
              <CopiloWordmark size={80} mood="cycle" />
            </Row>
            <Row label="120px · Splash / launch">
              <CopiloWordmark size={120} mood="cycle" />
            </Row>
          </div>
        </Section>

        {/* === Orbe seule — Le visage === */}
        <Section title="Orbe seule — Le visage de l'app native" bg="rgba(155,61,255,0.04)" accent="#9b3dff">
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '50px 20px 30px',
          }}>
            <CopiloOrbHero size={280} mood={mood as HeroOrbMood} />
          </div>

          {/* Contrôles de mood */}
          <div style={{ marginTop: 30 }}>
            <div style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11, letterSpacing: '0.1em',
              color: 'rgba(0,207,255,0.7)',
              textTransform: 'uppercase', marginBottom: 16, textAlign: 'center',
            }}>
              // CLIQUE POUR TESTER LES EXPRESSIONS
            </div>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 10,
              justifyContent: 'center',
            }}>
              {MOODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  title={m.desc}
                  style={{
                    background: mood === m.id
                      ? 'rgba(0,207,255,0.18)'
                      : 'rgba(255,255,255,0.04)',
                    border: mood === m.id
                      ? '1px solid rgba(0,207,255,0.55)'
                      : '1px solid rgba(255,255,255,0.08)',
                    color: mood === m.id ? '#00cfff' : 'rgba(210,224,255,0.7)',
                    fontFamily: "'DM Mono', monospace",
                    fontSize: 11,
                    padding: '8px 14px',
                    borderRadius: 10,
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (mood !== m.id) e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    if (mood !== m.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </Section>

        {/* === Showcase grille des moods === */}
        <Section title="Toutes les expressions" bg="rgba(255,255,255,0.02)">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 24,
          }}>
            {MOODS.slice(1).map((m) => (
              <div key={m.id} style={{
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 14,
                padding: 24,
                textAlign: 'center',
              }}>
                <div style={{ marginBottom: 14 }}>
                  <CopiloOrbHero size={120} mood={m.id as HeroOrbMood} />
                </div>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 12,
                  color: '#00cfff',
                  letterSpacing: '0.04em',
                  marginBottom: 4,
                }}>
                  {m.label}
                </div>
                <div style={{
                  fontSize: 11,
                  color: 'rgba(180,200,255,0.5)',
                }}>
                  {m.desc}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* === Tailles app icon === */}
        <Section title="App icon — Toutes les tailles" bg="rgba(0,207,255,0.04)" accent="#00cfff">
          <div style={{
            display: 'flex', gap: 40, justifyContent: 'center',
            alignItems: 'center', flexWrap: 'wrap',
          }}>
            {[40, 64, 100, 160, 220].map((s) => (
              <div key={s} style={{ textAlign: 'center' }}>
                <CopiloOrbHero size={s} mood="cycle" />
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  color: 'rgba(180,200,255,0.5)',
                  marginTop: 10,
                  letterSpacing: '0.06em',
                }}>
                  {s}×{s}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* === API / Usage === */}
        <Section title="API — comment l'utiliser" bg="rgba(255,255,255,0.02)">
          <pre style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 13,
            background: '#000',
            padding: 24,
            borderRadius: 12,
            color: '#9fb4d6',
            overflow: 'auto',
            lineHeight: 1.7,
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
{`import CopiloOrb from '@/components/CopiloOrb'
import CopiloWordmark from '@/components/CopiloWordmark'

// Visage seul (app native, hero, splash)
<CopiloOrb size={240} mood="cycle" />
<CopiloOrb size={120} mood="smiling" />
<CopiloOrb size={64}  mood="sleeping" />

// Wordmark complet (Nav, header, footer)
<CopiloWordmark size={56} mood="cycle" />
<CopiloWordmark size={80} mood="idle" />

// Mood disponibles :
//   'cycle' | 'idle' | 'blinking' | 'smiling' | 'thinking' | 'sleeping'
//   'looking-right' | 'looking-left' | 'looking-up' | 'looking-down'`}
          </pre>
        </Section>
      </div>
    </main>
  )
}

function Section({
  title, accent = false, bg = '#04080f', children,
}: {
  title: string
  accent?: boolean | string
  bg?: string
  children: React.ReactNode
}) {
  const accentColor = typeof accent === 'string' ? accent : (accent ? '#00cfff' : null)
  return (
    <section style={{
      background: bg,
      border: accentColor
        ? `1px solid ${accentColor}33`
        : '1px solid rgba(255,255,255,0.06)',
      borderRadius: 18,
      padding: 'clamp(28px, 4vw, 56px)',
      marginBottom: 32,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {accentColor && (
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        }} />
      )}
      <h2 style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        fontSize: 22, fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '0.04em',
        color: '#f0f4ff', marginBottom: 28,
      }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      gap: 24, width: '100%',
      paddingBottom: 24,
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ flex: '0 0 200px' }}>
        <span style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11, letterSpacing: '0.06em',
          color: 'rgba(180,200,255,0.45)',
          textTransform: 'uppercase',
        }}>
          {label}
        </span>
      </div>
      <div>{children}</div>
    </div>
  )
}
