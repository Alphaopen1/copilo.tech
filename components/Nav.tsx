'use client'
import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const T = {
  fr: { links: [['#features','Fonctionnalités'],['#how','Comment'],['/simulateur','Simulateur'],['#waitlist','Accès'],['/onboard','Créer mon Copilo']], cta: 'Démarrer' },
  en: { links: [['#features','Features'],['#how','How'],['/simulateur','Simulateur'],['#waitlist','Access'],['/onboard','Create my Copilo']], cta: 'Get Started' },
}

export default function Nav({ lang, setLang, linkPrefix = '' }: { lang: 'fr' | 'en'; setLang: (l: 'fr' | 'en') => void; linkPrefix?: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const tr = T[lang]
  /* On sub-pages (e.g. /onboard) prefix hash links so they resolve to the homepage section */
  const resolve = (h: string) => (h.startsWith('#') ? linkPrefix + h : h)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        padding: '0 clamp(16px, 4vw, 40px)',
        height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(4,8,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
      }}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2.5" style={{ textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: 'linear-gradient(135deg, #1d5cff 0%, #00cfff 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: 18, color: '#fff',
          boxShadow: '0 0 20px rgba(29,92,255,0.4)',
        }}>C</div>
        <span style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: 20, color: '#f0f4ff',
          letterSpacing: '0.02em',
        }}>
          COPILO<span style={{ color: '#00cfff' }}>.</span>TECH
        </span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {tr.links.map(([href, label]) => (
          <a key={href} href={resolve(href)} style={{
            fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
            color: 'rgba(180,200,255,0.55)', textDecoration: 'none',
            transition: 'color 0.2s', textTransform: 'uppercase',
            fontFamily: "'Barlow Condensed', sans-serif",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#f0f4ff')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(180,200,255,0.55)')}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Lang */}
        <div className="hidden md:flex items-center gap-1 mono" style={{ fontSize: 12 }}>
          {(['fr','en'] as const).map((l, i) => (
            <React.Fragment key={l}>
              {i > 0 && <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>}
              <button onClick={() => setLang(l)} style={{
                padding: '2px 6px', background: 'none', border: 'none', cursor: 'pointer',
                color: lang === l ? '#f0f4ff' : 'rgba(255,255,255,0.3)',
                fontFamily: "'DM Mono', monospace", fontSize: 12,
                transition: 'color 0.2s', textTransform: 'uppercase',
              }}>
                {l}
              </button>
            </React.Fragment>
          ))}
        </div>

        <a href={resolve('#waitlist')} className="hidden md:block btn-primary px-5 py-2 rounded-xl text-white"
           style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: '0.05em', textDecoration: 'none', textTransform: 'uppercase' }}>
          {tr.cta}
        </a>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f0f4ff', display: 'flex', alignItems: 'center', padding: 4 }}>
          {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 flex flex-col gap-4 p-6 md:hidden"
          style={{ background: 'rgba(4,8,15,0.97)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          {tr.links.map(([href, label]) => (
            <a key={href} href={resolve(href)} onClick={() => setOpen(false)}
               style={{ color: 'rgba(180,200,255,0.7)', fontSize: 16, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none' }}>
              {label}
            </a>
          ))}
          <div className="flex gap-2">
            {(['fr','en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: lang === l ? '#fff' : 'rgba(255,255,255,0.3)', fontFamily: "'DM Mono', monospace", fontSize: 13, textTransform: 'uppercase' }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
