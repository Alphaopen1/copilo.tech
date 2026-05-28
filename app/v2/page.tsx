'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Instagram, Twitter, Globe, Mic, Menu, X, Play } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────
   LIQUID GLASS STYLES
───────────────────────────────────────────────────────────────────── */
const GLASS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

  .lg {
    background: rgba(255,255,255,0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255,255,255,0.10);
    position: relative;
    overflow: hidden;
  }
  .lg::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255,255,255,0.45) 0%,
      rgba(255,255,255,0.15) 20%,
      rgba(255,255,255,0.00) 40%,
      rgba(255,255,255,0.00) 60%,
      rgba(255,255,255,0.15) 80%,
      rgba(255,255,255,0.45) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  .nav-link {
    color: rgba(255,255,255,0.75);
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-link:hover { color: #fff; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.7s cubic-bezier(.22,.68,0,1.2) both; }
  .fade-up-1 { animation-delay: 0.1s; }
  .fade-up-2 { animation-delay: 0.22s; }
  .fade-up-3 { animation-delay: 0.34s; }
`

/* ─────────────────────────────────────────────────────────────────────
   VIDEO HOOK  — RAF fade, no CSS transitions
───────────────────────────────────────────────────────────────────── */
function useVideoFade(ref: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.style.opacity = '0'

    let raf: number | null = null
    const fadingOut = { current: false }

    const cancel = () => { if (raf !== null) { cancelAnimationFrame(raf); raf = null } }

    const fadeIn = () => {
      cancel()
      fadingOut.current = false
      const from = parseFloat(v.style.opacity) || 0
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 500, 1)
        v.style.opacity = String(from + (1 - from) * p)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const fadeOut = () => {
      if (fadingOut.current) return
      fadingOut.current = true
      cancel()
      const from = parseFloat(v.style.opacity) || 1
      const t0 = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - t0) / 500, 1)
        v.style.opacity = String(from * (1 - p))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    const onCanPlay   = () => fadeIn()
    const onTimeUpdate = () => { if (v.duration - v.currentTime <= 0.55) fadeOut() }
    const onEnded     = () => {
      v.style.opacity = '0'
      setTimeout(() => { v.currentTime = 0; v.play().then(fadeIn).catch(() => {}) }, 100)
    }

    v.addEventListener('canplay',    onCanPlay)
    v.addEventListener('timeupdate', onTimeUpdate)
    v.addEventListener('ended',      onEnded)
    return () => {
      cancel()
      v.removeEventListener('canplay',    onCanPlay)
      v.removeEventListener('timeupdate', onTimeUpdate)
      v.removeEventListener('ended',      onEnded)
    }
  }, [ref])
}

const VIDEO_SRC = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

/* ─────────────────────────────────────────────────────────────────────
   NAV LINKS
───────────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Fonctionnalités', href: '#fonctionnalites' },
  { label: 'Démo',            href: '#demo' },
  { label: 'Tarifs',          href: '#tarifs' },
]

/* ─────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────── */
export default function HeroV2() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const demoVideoRef = useRef<HTMLVideoElement>(null)
  useVideoFade(videoRef)

  const [menuOpen, setMenuOpen] = useState(false)
  const [demoPlaying, setDemoPlaying] = useState(false)

  const toggleDemo = () => {
    const v = demoVideoRef.current
    if (!v) return
    if (demoPlaying) { v.pause(); setDemoPlaying(false) }
    else { v.play().catch(() => {}); setDemoPlaying(true) }
  }

  return (
    <>
      <style>{GLASS_CSS}</style>

      <div className="min-h-screen bg-black overflow-x-hidden flex flex-col" style={{ position: 'relative' }}>

        {/* ── Background video ──────────────────────────────────────── */}
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          style={{ opacity: 0, position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: 'translateY(17%)', pointerEvents: 'none' }}
        />

        {/* Cinematic gradient overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.70) 100%)', zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(29,92,255,0.12) 0%, transparent 70%)', zIndex: 1, pointerEvents: 'none' }} />

        {/* ── Navigation ────────────────────────────────────────────── */}
        <nav style={{ position: 'relative', zIndex: 20, padding: '24px 24px' }}>
          <div className="lg" style={{ borderRadius: 9999, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 900, margin: '0 auto' }}>

            {/* Left — logo cliquable + liens desktop */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#1d5cff,#00cfff)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mic size={14} color="#fff" />
                </div>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 17, letterSpacing: '0.04em', fontFamily: "'Barlow Condensed', sans-serif", textTransform: 'uppercase' }}>
                  COPILO
                </span>
              </a>
              <div className="hidden md:flex" style={{ gap: 28 }}>
                {NAV_LINKS.map(({ label, href }) => (
                  <a key={label} href={href} className="nav-link">{label}</a>
                ))}
              </div>
            </div>

            {/* Right — CTA + hamburger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <a href="/onboard" className="hidden md:block" style={{ color: '#fff', fontSize: 13, fontWeight: 500, textDecoration: 'none', opacity: 0.85 }}>
                Connexion
              </a>
              <a href="/onboard?type=bot" className="lg hidden md:flex" style={{ borderRadius: 9999, padding: '8px 22px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', background: 'transparent', textDecoration: 'none', alignItems: 'center' }}>
                Créer mon Copilo
              </a>
              {/* Hamburger mobile */}
              <button
                className="flex md:hidden"
                onClick={() => setMenuOpen(o => !o)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }}
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile menu — slide down */}
          {menuOpen && (
            <div className="lg md:hidden" style={{
              maxWidth: 900, margin: '8px auto 0', borderRadius: 20,
              padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16,
            }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className="nav-link" onClick={() => setMenuOpen(false)}
                  style={{ fontSize: 15, fontWeight: 500 }}>
                  {label}
                </a>
              ))}
              <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />
              <a href="/onboard" className="nav-link" onClick={() => setMenuOpen(false)} style={{ fontSize: 15 }}>
                Connexion
              </a>
              <a href="/onboard?type=bot" onClick={() => setMenuOpen(false)}
                style={{ padding: '10px 0', textAlign: 'center', borderRadius: 12, background: 'linear-gradient(135deg,#1d5cff,#0e40c0)', color: '#fff', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                Créer mon Copilo — gratuit
              </a>
            </div>
          )}
        </nav>

        {/* ── Hero content ──────────────────────────────────────────── */}
        <div style={{ position: 'relative', zIndex: 10, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px 80px', textAlign: 'center' }}>

          {/* Badge */}
          <div className="lg fade-up fade-up-1" style={{ borderRadius: 9999, padding: '6px 18px', marginBottom: 28, display: 'inline-flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00cfff', boxShadow: '0 0 8px #00cfff' }} />
            <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
              Assistant vocal · Telegram · RGPD
            </span>
          </div>

          {/* Heading */}
          <h1 className="fade-up fade-up-2"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(44px, 8vw, 88px)', color: '#fff', marginBottom: 36, letterSpacing: '-0.01em', lineHeight: 1 }}
          >
            Built for the drivers
          </h1>

          {/* Input + subtitle + CTA */}
          <div className="fade-up fade-up-3" style={{ maxWidth: 520, width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Email input */}
            <div className="lg" style={{ borderRadius: 9999, padding: '8px 8px 8px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <input
                type="email"
                placeholder="Ton adresse email"
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 15, fontFamily: "'Barlow', sans-serif" }}
                onFocus={e => e.currentTarget.setAttribute('placeholder', '')}
                onBlur={e => e.currentTarget.setAttribute('placeholder', 'Ton adresse email')}
              />
              <button style={{ background: '#fff', borderRadius: '50%', width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
                <ArrowRight size={20} color="#000" />
              </button>
            </div>

            {/* Subtitle */}
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13.5, lineHeight: 1.65, padding: '0 16px', fontFamily: "'Barlow', sans-serif" }}>
              Rejoins la liste d&apos;attente — accès prioritaire à l&apos;assistant vocal
              pour chauffeurs de taxi et VTC. 100 % européen, zéro écoute passive.
            </p>

            {/* Démo CTA */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a href="#demo" className="lg" style={{ borderRadius: 9999, padding: '12px 32px', color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', background: 'transparent', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <Play size={14} />
                Voir la démo
              </a>
            </div>
          </div>
        </div>

        {/* ── Section vidéo de présentation ────────────────────────── */}
        <section id="demo" style={{ position: 'relative', zIndex: 10, padding: '0 24px 100px' }}>
          {/* Dégradé de transition depuis le hero */}
          <div style={{ position: 'absolute', top: -120, left: 0, right: 0, height: 120, background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))', pointerEvents: 'none' }} />

          <div style={{ maxWidth: 820, margin: '0 auto' }}>

            {/* Header section */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(0,207,255,0.7)', marginBottom: 14 }}>
                // DÉMO
              </div>
              <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', lineHeight: 1.1, marginBottom: 14 }}>
                Copilo en action
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14, fontFamily: "'Barlow', sans-serif", lineHeight: 1.6, maxWidth: 480, margin: '0 auto' }}>
                Parle en push-to-talk depuis la route. Copilo enregistre, planifie et répond — sans jamais écouter passivement.
              </p>
            </div>

            {/* Video card */}
            <div className="lg" style={{ borderRadius: 24, overflow: 'hidden', position: 'relative', aspectRatio: '16/9', background: 'rgba(0,0,0,0.4)', cursor: 'pointer' }}
              onClick={toggleDemo}>

              <video
                ref={demoVideoRef}
                src={VIDEO_SRC}
                muted
                playsInline
                loop
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />

              {/* Overlay play/pause */}
              {!demoPlaying && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.35)',
                  gap: 16,
                }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'transform 0.15s, background 0.15s',
                  }}>
                    <Play size={28} color="#fff" style={{ marginLeft: 4 }} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Lancer la démo
                  </span>
                </div>
              )}

              {/* Playing indicator */}
              {demoPlaying && (
                <div style={{
                  position: 'absolute', bottom: 16, right: 16,
                  background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                  borderRadius: 20, padding: '4px 12px',
                  fontSize: 10, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00cfff', boxShadow: '0 0 6px #00cfff' }} />
                  En lecture
                </div>
              )}
            </div>

            {/* Sous le player — pills de features */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: 28 }}>
              {['Push-to-talk', 'Zéro écoute passive', 'RGPD européen', 'Telegram natif', '100% IA embarquée'].map(tag => (
                <div key={tag} className="lg" style={{ borderRadius: 9999, padding: '5px 16px', fontSize: 11, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace', letterSpacing: '0.08em' }}>
                  {tag}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Social footer ─────────────────────────────────────────── */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', gap: 12, paddingBottom: 40 }}>
          {[
            { icon: <Instagram size={20} />, label: 'Instagram' },
            { icon: <Twitter size={20} />,   label: 'Twitter' },
            { icon: <Globe size={20} />,     label: 'Site web' },
          ].map(({ icon, label }) => (
            <button
              key={label}
              aria-label={label}
              className="lg"
              style={{ borderRadius: '50%', padding: 16, color: 'rgba(255,255,255,0.75)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.background = 'transparent' }}
            >
              {icon}
            </button>
          ))}
        </div>

      </div>
    </>
  )
}
