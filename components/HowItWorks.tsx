'use client'

const T = {
  fr: {
    label: '// SYSTÈME',
    title: 'TES 3\nAGENTS.',
    sub: 'Trois intelligences déployées sur Telegram. Chacune a un rôle précis.',
    agents: [
      {
        code: 'AGENT_A',
        color: '#1d5cff',
        glow: 'rgba(29,92,255,0.15)',
        border: 'rgba(29,92,255,0.3)',
        icon: '🎙️',
        name: '@Copilo_de_[PRÉNOM]',
        role: 'Ton assistant vocal perso',
        desc: 'Gère tes courses, calcule ton CA CPAM en temps réel, synchronise ton Google Calendar. Parle-lui en push-to-talk depuis la route.',
        pills: ['Courses CPAM', 'CA auto', 'Calendrier', 'Péages', 'Doublets'],
        cta: { label: 'Créer mon bot →', href: '/onboard' },
      },
      {
        code: 'AGENT_C',
        color: '#f97316',
        glow: 'rgba(249,115,22,0.12)',
        border: 'rgba(249,115,22,0.3)',
        icon: '📡',
        name: '@Copilo_Dispatcher',
        role: 'Le dispatcheur de courses',
        desc: 'Détecte les courses postées dans ton groupe, lance une collecte de 15s, attribue au premier disponible et coordonne la confirmation entre chauffeurs.',
        pills: ['Attribution 15s', 'Relais privé', 'Calendar partagé', 'Fallback auto'],
        cta: { label: 'Créer mon groupe →', href: '/onboard' },
      },
      {
        code: 'AGENT_B',
        color: '#00cfff',
        glow: 'rgba(0,207,255,0.1)',
        border: 'rgba(0,207,255,0.25)',
        icon: '⚙️',
        name: '@Copilo_Connect',
        role: 'Le pont web → Telegram',
        desc: 'Crée ton bot personnalisé, monte ton groupe privé, vérifie les accès admin. Setup complet depuis le site en moins de 2 minutes.',
        pills: ['Création bot', 'Groupe privé', 'Vérif. admin', 'API sécurisée'],
        cta: { label: 'Configurer →', href: '/onboard' },
      },
    ],
  },
  en: {
    label: '// SYSTEM',
    title: 'YOUR 3\nAGENTS.',
    sub: 'Three intelligences deployed on Telegram. Each with a precise role.',
    agents: [
      {
        code: 'AGENT_A',
        color: '#1d5cff',
        glow: 'rgba(29,92,255,0.15)',
        border: 'rgba(29,92,255,0.3)',
        icon: '🎙️',
        name: '@Copilo_de_[NAME]',
        role: 'Your personal voice assistant',
        desc: 'Manages your rides, calculates your CPAM revenue in real-time, syncs your Google Calendar. Talk to it with push-to-talk on the road.',
        pills: ['CPAM Rides', 'Auto revenue', 'Calendar', 'Tolls', 'Shared rides'],
        cta: { label: 'Create my bot →', href: '/onboard' },
      },
      {
        code: 'AGENT_C',
        color: '#f97316',
        glow: 'rgba(249,115,22,0.12)',
        border: 'rgba(249,115,22,0.3)',
        icon: '📡',
        name: '@Copilo_Dispatcher',
        role: 'The ride dispatcher',
        desc: 'Detects rides posted in your group, runs a 15s collection window, assigns the first available driver and coordinates confirmation.',
        pills: ['15s assignment', 'Private relay', 'Shared calendar', 'Auto fallback'],
        cta: { label: 'Create my group →', href: '/onboard' },
      },
      {
        code: 'AGENT_B',
        color: '#00cfff',
        glow: 'rgba(0,207,255,0.1)',
        border: 'rgba(0,207,255,0.25)',
        icon: '⚙️',
        name: '@Copilo_Connect',
        role: 'The web → Telegram bridge',
        desc: 'Creates your custom bot, sets up your private group, verifies admin access. Full setup from the website in under 2 minutes.',
        pills: ['Bot creation', 'Private group', 'Admin verify', 'Secure API'],
        cta: { label: 'Configure →', href: '/onboard' },
      },
    ],
  },
}

export default function HowItWorks({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  return (
    <section id="how" style={{ padding: '100px 0 120px', position: 'relative' }}>

      {/* Background grid shimmer */}
      <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(29,92,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(29,92,255,0.03) 1px, transparent 1px)', backgroundSize:'80px 80px', pointerEvents:'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(16px,5vw,60px)', position:'relative' }}>

        {/* Header */}
        <div data-reveal style={{ marginBottom: 64, display:'flex', flexWrap:'wrap', alignItems:'flex-end', gap:24, justifyContent:'space-between' }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: 'rgba(0,207,255,0.7)', marginBottom: 14, textTransform:'uppercase' }}>
              {tr.label}
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(44px,5.5vw,72px)', color: '#f0f4ff', whiteSpace:'pre-line', lineHeight:0.9 }}>
              {tr.title}
            </h2>
          </div>
          <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:15, color:'rgba(180,200,255,0.45)', maxWidth:360, lineHeight:1.75 }}>
            {tr.sub}
          </p>
        </div>

        {/* Agent cards grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(300px, 1fr))', gap:2 }}>
          {tr.agents.map((a, i) => (
            <div key={a.code} data-reveal data-delay={String(i + 1)} style={{ position:'relative', padding:'32px 28px 28px', background:`rgba(4,8,15,${i % 2 === 0 ? '0.6' : '0.4'})`, border:'1px solid rgba(255,255,255,0.05)', overflow:'hidden' }}>

              {/* Top color accent */}
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:`linear-gradient(90deg, ${a.color}, transparent)` }} />

              {/* Corner glow */}
              <div style={{ position:'absolute', top:-60, left:-60, width:200, height:200, background:`radial-gradient(circle, ${a.glow} 0%, transparent 70%)`, pointerEvents:'none' }} />

              {/* Code tag */}
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, letterSpacing:'0.14em', color: a.color, marginBottom:20, textTransform:'uppercase', opacity:0.8 }}>
                // {a.code}
              </div>

              {/* Icon + name */}
              <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:16 }}>
                <div style={{ width:48, height:48, borderRadius:14, background: a.glow, border:`1px solid ${a.border}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, flexShrink:0 }}>
                  {a.icon}
                </div>
                <div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color: a.color, letterSpacing:'0.04em', marginBottom:3 }}>
                    {a.name}
                  </div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:17, textTransform:'uppercase', letterSpacing:'0.04em', color:'#f0f4ff' }}>
                    {a.role}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:13.5, color:'rgba(180,200,255,0.5)', lineHeight:1.75, marginBottom:20 }}>
                {a.desc}
              </p>

              {/* Pills */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:24 }}>
                {a.pills.map(p => (
                  <span key={p} style={{ padding:'4px 10px', borderRadius:20, background: a.glow, border:`1px solid ${a.border}`, fontFamily:"'DM Mono',monospace", fontSize:9, color: a.color, letterSpacing:'0.08em', textTransform:'uppercase' }}>
                    {p}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a href={a.cta.href} style={{ display:'inline-flex', alignItems:'center', fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:'0.08em', color: a.color, textDecoration:'none', borderBottom:`1px solid ${a.border}`, paddingBottom:1, textTransform:'uppercase' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}>
                {a.cta.label}
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
