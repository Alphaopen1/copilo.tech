'use client'

/* ── SVG icon components — Material Icons (Apache 2.0) ── */

/** Sedan / Taxi car */
function IconTaxi({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H16V4c0-.55-.45-1-1-1h-2c-.55 0-1 .45-1 1v1H9c-.66 0-1.21.42-1.42 1.01L5.5 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM7.5 16c-.83 0-1.5-.67-1.5-1.5S6.67 13 7.5 13s1.5.67 1.5 1.5S8.33 16 7.5 16zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l2-6h10l2 6H5zm6-5h2l-.25 2h-1.5L11 6z" />
    </svg>
  )
}

/** Sedan / VTC (same base, clean) */
function IconVTC({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    </svg>
  )
}

/** Minivan / shuttle — medical transport */
function IconVan({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <path d="M17 5H3c-1.1 0-2 .89-2 2v9h2c0 1.65 1.34 3 3 3s3-1.35 3-3h5.5c0 1.65 1.34 3 3 3s3-1.35 3-3H23v-5l-6-6zM3 11V7h4v4H3zm3 6.5c-.83 0-1.5-.68-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7-6.5H9V7h4v4zm3.5 6.5c-.83 0-1.5-.68-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM17 11V7l3.5 4H17z" />
    </svg>
  )
}

/** Shield with checkmark — security / isolated data */
function IconShield({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 5.5V11c0 5.25 3.4 10.15 8 11.5 4.6-1.35 8-6.25 8-11.5V5.5L12 2z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

/** Game controller — custom style */
function IconController({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="4" />
      <path d="M6 12h4M8 10v4M15 12h.01M17 10h.01" />
    </svg>
  )
}

/** Phone with Telegram arrow — mobile/Telegram */
function IconTelegram({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
    </svg>
  )
}

/** User group / network */
function IconUsers({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

/* ── Data ── */
const T = {
  fr: {
    badge: 'Personnalisation',
    title: 'Ton Copilo,',
    title2: 'ta personnalité.',
    sub: 'Donne un nom unique à ton assistant. Chaque Copilo est chiffré, isolé et ne partage jamais tes données avec les autres chauffeurs.',
    avatars: [
      { name: 'Copilo_de_Marc',  Icon: IconTaxi, gradient: 'linear-gradient(135deg, #1d5cff 0%, #00cfff 100%)', role: 'Taxi Paris',            statusActive: true  },
      { name: 'Copilo_de_Layla', Icon: IconVTC,  gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)', role: 'VTC Lyon',              statusActive: false },
      { name: 'Copilo_de_Karim', Icon: IconVan,  gradient: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)', role: 'Transport médical',     statusActive: false },
    ],
    features: [
      { Icon: IconController, label: 'Style gaming unique' },
      { Icon: IconShield,     label: 'Données isolées'     },
      { Icon: IconTelegram,   label: 'Dispo sur Telegram'  },
      { Icon: IconUsers,      label: 'Groupes & canaux'    },
    ],
    invite: 'Créer mon Copilo',
  },
  en: {
    badge: 'Personalization',
    title: 'Your Copilo,',
    title2: 'your personality.',
    sub: 'Give your assistant a unique name. Each Copilo is encrypted, isolated, and never shares your data with other drivers.',
    avatars: [
      { name: 'Copilo_de_Marc',  Icon: IconTaxi, gradient: 'linear-gradient(135deg, #1d5cff 0%, #00cfff 100%)', role: 'Paris Taxi',            statusActive: true  },
      { name: 'Copilo_de_Layla', Icon: IconVTC,  gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)', role: 'Lyon VTC',              statusActive: false },
      { name: 'Copilo_de_Karim', Icon: IconVan,  gradient: 'linear-gradient(135deg, #f97316 0%, #f59e0b 100%)', role: 'Medical Transport',     statusActive: false },
    ],
    features: [
      { Icon: IconController, label: 'Unique gaming style'  },
      { Icon: IconShield,     label: 'Isolated data'        },
      { Icon: IconTelegram,   label: 'Available on Telegram'},
      { Icon: IconUsers,      label: 'Groups & channels'    },
    ],
    invite: 'Create my Copilo',
  },
}

export default function AvatarSection({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  return (
    <section style={{ position: 'relative', padding: '100px 0', overflow: 'hidden' }}>
      {/* Subtle right glow */}
      <div style={{ position:'absolute', right:'-5%', top:'50%', transform:'translateY(-50%)', width:500, height:500, background:'radial-gradient(circle, rgba(0,207,255,0.06) 0%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:1100, margin:'0 auto', padding:'0 clamp(16px,5vw,48px)', display:'flex', flexWrap:'wrap', alignItems:'center', gap:64 }}>

        {/* ── Left: avatar cards ── */}
        <div style={{ flex:'0 0 340px', display:'flex', flexDirection:'column', gap:10, maxWidth:380 }}>
          {tr.avatars.map((a, i) => {
            const { Icon } = a
            return (
              <div key={a.name} data-reveal data-delay={String(i + 1)} style={{
                display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
                borderRadius:16,
                background:'rgba(255,255,255,0.03)',
                border:'1px solid rgba(255,255,255,0.06)',
                transition:'transform 0.2s, border-color 0.2s',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(-2px)'
                  el.style.borderColor = 'rgba(255,255,255,0.12)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.transform = 'translateY(0)'
                  el.style.borderColor = 'rgba(255,255,255,0.06)'
                }}
              >
                {/* Avatar icon */}
                <div style={{ width:52, height:52, borderRadius:14, background: a.gradient, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:'0 8px 24px rgba(0,0,0,0.35)' }}>
                  <Icon size={26} />
                </div>

                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontFamily:"'DM Mono', monospace", fontSize:11.5, fontWeight:500, color:'#f0f4ff', letterSpacing:'0.02em', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {a.name}
                  </div>
                  <div style={{ fontFamily:"'Barlow', sans-serif", fontSize:12, color:'rgba(180,200,255,0.45)', marginTop:2 }}>
                    {a.role}
                  </div>
                </div>

                {/* Status indicator */}
                <div style={{ display:'flex', alignItems:'center', gap:5, flexShrink:0 }}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background: a.statusActive ? '#22c55e' : 'rgba(255,255,255,0.15)', boxShadow: a.statusActive ? '0 0 6px #22c55e' : 'none' }} />
                  <span style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:'0.06em', color: a.statusActive ? '#22c55e' : 'rgba(255,255,255,0.2)' }}>
                    {a.statusActive ? 'actif' : 'offline'}
                  </span>
                </div>
              </div>
            )
          })}

          {/* Add new card */}
          <a href="/onboard" style={{
            display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
            borderRadius:16,
            background:'rgba(29,92,255,0.04)',
            border:'1px dashed rgba(29,92,255,0.2)',
            textDecoration:'none',
            transition:'border-color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(29,92,255,0.4)'
              el.style.background = 'rgba(29,92,255,0.08)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(29,92,255,0.2)'
              el.style.background = 'rgba(29,92,255,0.04)'
            }}
          >
            <div style={{ width:52, height:52, borderRadius:14, border:'1.5px dashed rgba(29,92,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(29,92,255,0.6)" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow', sans-serif", fontWeight:600, fontSize:13, color:'rgba(180,200,255,0.55)' }}>Créer ton Copilo</div>
              <div style={{ fontFamily:"'Barlow', sans-serif", fontSize:11, color:'rgba(180,200,255,0.3)', marginTop:2 }}>Personnalise ton assistant</div>
            </div>
          </a>
        </div>

        {/* ── Right: copy ── */}
        <div style={{ flex:1, minWidth:280 }}>
          {/* Badge */}
          <div data-reveal style={{ display:'inline-block', padding:'5px 14px', borderRadius:20, border:'1px solid rgba(0,207,255,0.25)', background:'rgba(0,207,255,0.06)', fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:'0.12em', color:'rgba(0,207,255,0.8)', textTransform:'uppercase', marginBottom:20 }}>
            {tr.badge}
          </div>

          <h2 data-reveal data-delay="1" style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:800, fontSize:'clamp(38px,4.5vw,58px)', lineHeight:0.95, textTransform:'uppercase', letterSpacing:'-0.01em', color:'#f0f4ff', marginBottom:6 }}>
            {tr.title}
          </h2>
          <h2 data-reveal data-delay="1" style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:800, fontSize:'clamp(38px,4.5vw,58px)', lineHeight:0.95, textTransform:'uppercase', letterSpacing:'-0.01em', background:'linear-gradient(120deg, #60a5fa 0%, #00cfff 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', marginBottom:24 }}>
            {tr.title2}
          </h2>

          <p style={{ fontFamily:"'Barlow', sans-serif", fontSize:15, color:'rgba(180,200,255,0.5)', lineHeight:1.8, maxWidth:420, marginBottom:28 }}>
            {tr.sub}
          </p>

          {/* Feature pills — SVG icons */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:32 }}>
            {tr.features.map(f => {
              const { Icon } = f
              return (
                <div key={f.label} style={{
                  display:'flex', alignItems:'center', gap:7, padding:'7px 14px',
                  borderRadius:24,
                  background:'rgba(255,255,255,0.03)',
                  border:'1px solid rgba(255,255,255,0.07)',
                  fontFamily:"'Barlow', sans-serif", fontSize:13, color:'rgba(180,200,255,0.6)',
                }}>
                  <span style={{ color:'rgba(0,207,255,0.7)', display:'flex' }}>
                    <Icon size={15} />
                  </span>
                  {f.label}
                </div>
              )
            })}
          </div>

          <a href="/onboard" style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'11px 22px', borderRadius:12,
            border:'1px solid rgba(255,255,255,0.1)',
            background:'rgba(255,255,255,0.04)',
            fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:14,
            letterSpacing:'0.05em', textTransform:'uppercase',
            color:'#f0f4ff', textDecoration:'none',
            transition:'background 0.2s, border-color 0.2s',
          }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(255,255,255,0.08)'
              el.style.borderColor = 'rgba(255,255,255,0.18)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.background = 'rgba(255,255,255,0.04)'
              el.style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          >
            <IconUsers size={14} />
            {tr.invite}
          </a>
        </div>
      </div>
    </section>
  )
}
