'use client'
import { useState } from 'react'
import { Bot, Users, ShieldCheck } from 'lucide-react'

/* ── Icônes Lucide (alias pour conserver les usages existants) ── */
function IconBot({ size = 28 }: { size?: number }) {
  return <Bot size={size} strokeWidth={1.6} aria-hidden />
}
function IconGroup({ size = 28 }: { size?: number }) {
  return <Users size={size} strokeWidth={1.6} aria-hidden />
}
function IconAdmin({ size = 28 }: { size?: number }) {
  return <ShieldCheck size={size} strokeWidth={1.6} aria-hidden />
}

const T = {
  fr: {
    label: '// ONBOARDING',
    titleA: 'CRÉE TON COPILO',
    titleB: 'EN 2',
    titleC: 'MINUTES.',
    sub: 'Choisis comment tu veux utiliser Copilo dans ton activité.',
    cards: [
      {
        id: 'bot',
        Icon: IconBot,
        color: '#1d5cff',
        glow: 'rgba(29,92,255,0.12)',
        border: 'rgba(29,92,255,0.28)',
        title: 'MON COPILO PERSO',
        tag: '@Copilo_de_PRÉNOM',
        desc: 'Bot dédié à toi. Parle-lui en push-to-talk depuis la route — courses, recettes, calendrier.',
        time: '2 min',
      },
      {
        id: 'group',
        Icon: IconGroup,
        color: '#00cfff',
        glow: 'rgba(0,207,255,0.1)',
        border: 'rgba(0,207,255,0.25)',
        title: 'GROUPE / CANAL',
        tag: '@Copilo_Dispatcher',
        desc: 'Copilo dispatche les courses dans ton groupe. Attribution automatique en 15 secondes.',
        time: '3 min',
      },
      {
        id: 'admin',
        Icon: IconAdmin,
        color: '#f97316',
        glow: 'rgba(249,115,22,0.1)',
        border: 'rgba(249,115,22,0.25)',
        title: 'REJOINDRE EN ADMIN',
        tag: '+Copilo dans un groupe',
        desc: 'Invite @Copilo_TaxiBot dans un groupe existant, vérifie les droits admin en un clic.',
        time: '1 min',
      },
    ],
    cta: 'Configurer maintenant',
    ctaSub: 'Gratuit · Aucune CB',
  },
  en: {
    label: '// ONBOARDING',
    titleA: 'CREATE YOUR COPILO',
    titleB: 'IN 2',
    titleC: 'MINUTES.',
    sub: 'Choose how you want to use Copilo in your activity.',
    cards: [
      {
        id: 'bot',
        Icon: IconBot,
        color: '#1d5cff',
        glow: 'rgba(29,92,255,0.12)',
        border: 'rgba(29,92,255,0.28)',
        title: 'MY PERSONAL COPILO',
        tag: '@Copilo_de_NAME',
        desc: 'Bot dedicated to you. Talk to it push-to-talk on the road — rides, revenue, calendar.',
        time: '2 min',
      },
      {
        id: 'group',
        Icon: IconGroup,
        color: '#00cfff',
        glow: 'rgba(0,207,255,0.1)',
        border: 'rgba(0,207,255,0.25)',
        title: 'GROUP / CHANNEL',
        tag: '@Copilo_Dispatcher',
        desc: 'Copilo dispatches rides in your group. Automatic assignment in 15 seconds.',
        time: '3 min',
      },
      {
        id: 'admin',
        Icon: IconAdmin,
        color: '#f97316',
        glow: 'rgba(249,115,22,0.1)',
        border: 'rgba(249,115,22,0.25)',
        title: 'JOIN AS ADMIN',
        tag: '+Copilo in a group',
        desc: 'Invite @Copilo_TaxiBot into an existing group and verify admin rights in one click.',
        time: '1 min',
      },
    ],
    cta: 'Configure now',
    ctaSub: 'Free · No CC required',
  },
}

export default function HowItWorks({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="how" style={{ padding: '100px 0 120px', position: 'relative', background: 'rgba(255,255,255,0.012)' }}>

      {/* Background grid */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(29,92,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(29,92,255,0.025) 1px, transparent 1px)', backgroundSize:'80px 80px', pointerEvents:'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,5vw,56px)', position: 'relative' }}>

        {/* Header */}
        <div data-reveal style={{ marginBottom: 56, textAlign:'center' }}>
          <div style={{ fontFamily:"'DM Mono', monospace", fontSize: 11, letterSpacing: '0.14em', color: 'rgba(0,207,255,0.7)', marginBottom: 16, textTransform: 'uppercase' }}>
            {tr.label}
          </div>
          <h2 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(44px,6vw,80px)', lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#f0f4ff', marginBottom: 8 }}>
            {tr.titleA}<br />
            {tr.titleB}{' '}
            <span style={{ background: 'linear-gradient(120deg, #60a5fa 0%, #00cfff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {tr.titleC}
            </span>
          </h2>
          <p style={{ fontFamily:"'Barlow', sans-serif", fontSize: 16, color: 'rgba(180,200,255,0.45)', marginTop: 16 }}>
            {tr.sub}
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 48 }}>
          {tr.cards.map((c, i) => {
            const { Icon } = c
            const isHov = hovered === c.id
            return (
              <a key={c.id} href={`/onboard?type=${c.id}`} data-reveal data-delay={String(i + 1)}
                style={{
                  display:'block', textDecoration:'none',
                  padding: '28px 24px',
                  borderRadius: 20,
                  background: isHov ? c.glow : 'rgba(255,255,255,0.025)',
                  border: `1px solid ${isHov ? c.border : 'rgba(255,255,255,0.06)'}`,
                  transition: 'background 0.25s, border-color 0.25s, transform 0.2s',
                  transform: isHov ? 'translateY(-4px)' : 'translateY(0)',
                  position: 'relative', overflow: 'hidden',
                }}
                onMouseEnter={() => setHovered(c.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Top accent */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${c.color}, transparent)`, opacity: isHov ? 1 : 0.4, transition:'opacity 0.25s' }} />

                {/* Icon */}
                <div style={{ width: 52, height: 52, borderRadius: 14, background: c.glow, border: `1px solid ${c.border}`, display:'flex', alignItems:'center', justifyContent:'center', color: c.color, marginBottom: 20 }}>
                  <Icon size={24} />
                </div>

                {/* Time badge */}
                <div style={{ position:'absolute', top:20, right:20, padding:'3px 10px', borderRadius:20, background: c.glow, border: `1px solid ${c.border}`, fontFamily:"'DM Mono', monospace", fontSize:9, color: c.color, letterSpacing:'0.08em' }}>
                  {c.time}
                </div>

                {/* Title */}
                <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 20, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#f0f4ff', marginBottom: 6 }}>
                  {c.title}
                </div>

                {/* Tag */}
                <div style={{ fontFamily:"'DM Mono', monospace", fontSize: 10, color: c.color, letterSpacing: '0.04em', marginBottom: 14 }}>
                  {c.tag}
                </div>

                {/* Description */}
                <p style={{ fontFamily:"'Barlow', sans-serif", fontSize: 13.5, color: 'rgba(180,200,255,0.5)', lineHeight: 1.7, margin: 0 }}>
                  {c.desc}
                </p>
              </a>
            )
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign:'center' }}>
          <a href="/onboard?type=bot" style={{
            display:'inline-flex', alignItems:'center', gap:10,
            padding:'14px 32px', borderRadius:14,
            background:'linear-gradient(135deg, #1d5cff, #0e40c0)',
            boxShadow:'0 0 0 1px rgba(29,92,255,0.4), 0 0 36px rgba(29,92,255,0.3)',
            fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:16,
            letterSpacing:'0.06em', textTransform:'uppercase',
            color:'#fff', textDecoration:'none',
            transition:'transform 0.15s, box-shadow 0.15s',
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translateY(-2px)'
              el.style.boxShadow = '0 0 0 1px rgba(29,92,255,0.5), 0 0 48px rgba(29,92,255,0.45)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.transform = 'translateY(0)'
              el.style.boxShadow = '0 0 0 1px rgba(29,92,255,0.4), 0 0 36px rgba(29,92,255,0.3)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
            {tr.cta}
          </a>
          <div style={{ fontFamily:"'DM Mono', monospace", fontSize:10, color:'rgba(180,200,255,0.25)', letterSpacing:'0.1em', marginTop:10 }}>
            {tr.ctaSub}
          </div>
        </div>

      </div>
    </section>
  )
}
