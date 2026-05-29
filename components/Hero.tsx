'use client'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

/* ─── Types ─────────────────────────────────────────────────────────── */
type Lang    = 'fr' | 'en'
type MsgRole = 'u' | 'c'
interface ScenarioMsg { role: MsgRole; text: string; delay: number }
interface Scenario    { id: string; label: string; icon: string; messages: ScenarioMsg[] }

/* ─── Scenario data ──────────────────────────────────────────────────── */
const SCENARIOS: Record<Lang, Scenario[]> = {
  fr: [
    {
      id: 'course', label: 'Course', icon: '🚗',
      messages: [
        { role: 'u', text: 'Course demain 14h30 Nice → CHU Pasteur, M. Bernard', delay: 0 },
        { role: 'c', text: 'Voici la course :\n• 28/05 à 14:30 — M. Bernard\n• Nice → CHU Pasteur · 22 min\n• CA CPAM 18,40 €\n\nConfirmer ?', delay: 1800 },
        { role: 'u', text: 'Oui confirmer', delay: 3400 },
        { role: 'c', text: 'Course #87 créée ✓\nGoogle Calendar mis à jour\nRappel dans 13h30', delay: 5200 },
      ],
    },
    {
      id: 'brief', label: 'Brief', icon: '☀️',
      messages: [
        { role: 'c', text: 'Bonjour ! Brief du 28/05 :\n\n• 3 courses planifiées\n• 09:00 Mme Dupont → Cannes\n• 11:30 M. Karim → Aéroport NCE\n• 15:00 Mme Leroy → Clinique\n\nCA estimé : 142,80 €\nPéages : 8,40 €', delay: 0 },
        { role: 'u', text: "C'est noté, merci Copilo", delay: 2200 },
        { role: 'c', text: 'Bonne route ! Je te préviens 15 min avant chaque course.', delay: 3800 },
      ],
    },
    {
      id: 'doublet', label: 'Doublet', icon: '👥',
      messages: [
        { role: 'u', text: 'Course 9h Nice → Cannes, M. Hajj', delay: 0 },
        { role: 'c', text: 'Doublet possible !\n\nMme Dupont part aussi Nice → Cannes demain 09:00.\n\nFusionner ? 1 péage · CA × 2 patients', delay: 2000 },
        { role: 'u', text: 'Oui, fusionner', delay: 3800 },
        { role: 'c', text: 'Doublet #88 créé ✓\n• Mme Dupont + M. Hajj\n• 46,20 € × 2 patients\nCalendrier en orange', delay: 5600 },
      ],
    },
    {
      id: 'peage', label: 'Péage', icon: '🛣️',
      messages: [
        { role: 'u', text: 'Péage A8 ce matin, 4,80 €', delay: 0 },
        { role: 'c', text: 'Péage mémorisé ✓\n• A8 · 4,80 € · 28/05 09:14\n\nIl sera auto-associé aux courses Nice → Cannes.', delay: 1800 },
        { role: 'u', text: 'Parfait merci', delay: 3200 },
        { role: 'c', text: "Dans 2 semaines, je m'en souviendrai automatiquement.", delay: 4600 },
      ],
    },
  ],
  en: [
    {
      id: 'course', label: 'Ride', icon: '🚗',
      messages: [
        { role: 'u', text: 'Ride tomorrow 2:30pm Nice → Pasteur Hospital, Mr Bernard', delay: 0 },
        { role: 'c', text: 'Ride details:\n• May 28 at 14:30 — Mr Bernard\n• Nice → Pasteur · 22 min\n• Revenue €18.40\n\nConfirm?', delay: 1800 },
        { role: 'u', text: 'Yes confirm', delay: 3400 },
        { role: 'c', text: 'Ride #87 created ✓\nGoogle Calendar updated\nReminder in 13h30', delay: 5200 },
      ],
    },
    {
      id: 'brief', label: 'Brief', icon: '☀️',
      messages: [
        { role: 'c', text: 'Good morning! Brief May 28:\n\n• 3 rides scheduled\n• 09:00 Ms Dupont → Cannes\n• 11:30 Mr Karim → NCE Airport\n• 15:00 Ms Leroy → Clinic\n\nEst. revenue: €142.80\nTolls: €8.40', delay: 0 },
        { role: 'u', text: 'Got it, thanks Copilo', delay: 2200 },
        { role: 'c', text: "Safe drive! I'll alert you 15 min before each ride.", delay: 3800 },
      ],
    },
    {
      id: 'doublet', label: 'Shared', icon: '👥',
      messages: [
        { role: 'u', text: 'Ride 9am Nice → Cannes, Mr Hajj', delay: 0 },
        { role: 'c', text: 'Shared ride detected!\n\nMs Dupont also goes Nice → Cannes tomorrow 09:00.\n\nMerge? 1 toll · revenue × 2 patients', delay: 2000 },
        { role: 'u', text: 'Yes merge', delay: 3800 },
        { role: 'c', text: 'Shared #88 created ✓\n• Ms Dupont + Mr Hajj\n• €46.20 × 2 patients\nCalendar in orange', delay: 5600 },
      ],
    },
    {
      id: 'peage', label: 'Toll', icon: '🛣️',
      messages: [
        { role: 'u', text: 'A8 toll this morning, €4.80', delay: 0 },
        { role: 'c', text: 'Toll saved ✓\n• A8 · €4.80 · May 28 09:14\n\nAuto-linked to Nice → Cannes rides.', delay: 1800 },
        { role: 'u', text: 'Perfect thanks', delay: 3200 },
        { role: 'c', text: "In 2 weeks, I'll remember it automatically.", delay: 4600 },
      ],
    },
  ],
}

const T = {
  fr: {
    tag: '// VOCAL · TELEGRAM · IA EMBARQUÉE',
    h1a: 'TON IA',
    h1b: 'EMBARQUÉE.',
    sub: 'Push-to-talk. Zéro écoute passive. Courses, CA CPAM, calendrier — tout géré pendant que tu conduis.',
    demo: '4 scénarios réels, en direct ↓',
    metrics: [
      { val: '0€',    label: 'pour démarrer' },
      { val: '< 30s', label: 'setup'          },
      { val: '100%',  label: 'européen'        },
    ],
    online: 'EN LIGNE',
    ctaInChat: 'Essayer sur Telegram →',
    expand: 'Voir en plein écran',
  },
  en: {
    tag: '// VOICE · TELEGRAM · ON-BOARD AI',
    h1a: 'YOUR ON-BOARD',
    h1b: 'AI COPILOT.',
    sub: 'Push-to-talk. Zero passive listening. Rides, CPAM revenue, calendar — all managed while you drive.',
    demo: '4 real scenarios, live ↓',
    metrics: [
      { val: '0€',    label: 'to start'  },
      { val: '< 30s', label: 'setup'      },
      { val: '100%',  label: 'European'   },
    ],
    online: 'ONLINE',
    ctaInChat: 'Try on Telegram →',
    expand: 'View fullscreen',
  },
}

/* ─── PhoneScreen ────────────────────────────────────────────────────── */
interface PhoneScreenProps {
  scenarios: Scenario[]
  activeIdx: number
  setActiveIdx: (i: number) => void
  visibleN: number
  typing: boolean
  showCta: boolean
  fadeOut: boolean
  progKey: number
  scenarioDuration: number
  chatRef: React.RefObject<HTMLDivElement | null>
  online: string
  ctaInChat: string
  /** large = zoomed overlay version */
  large?: boolean
}

function PhoneScreen({
  scenarios, activeIdx, setActiveIdx, visibleN, typing, showCta,
  fadeOut, progKey, scenarioDuration, chatRef, online, ctaInChat, large,
}: PhoneScreenProps) {
  const s  = large ? 1.25 : 1       // scale factor for text/avatar sizes
  const fs = (n: number) => n * s    // font scale helper
  const current = scenarios[activeIdx]

  return (
    <div style={{
      position:'absolute', inset:8, borderRadius: large ? 54 : 46,
      background:'#040d17', overflow:'hidden',
      display:'flex', flexDirection:'column',
      opacity: fadeOut ? 0 : 1, transition:'opacity 0.4s ease',
    }}>

      {/* ── Progress bar ── */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, zIndex:10, overflow:'hidden' }}>
        <div key={progKey} style={{
          height:'100%', width:'0%',
          background:'linear-gradient(90deg,#1d5cff,#00cfff)',
          animation:`phoneProgFill ${scenarioDuration}ms linear forwards`,
        }} />
      </div>

      {/* Status bar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:`${large?14:12}px ${large?24:20}px 0`, flexShrink:0 }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:fs(10.5), fontWeight:600, color:'rgba(255,255,255,0.85)' }}>9:41</span>
        <div style={{ display:'flex', alignItems:'center', gap:5 }}><SignalIcon /><WifiIcon /><BatteryIcon /></div>
      </div>

      {/* Dynamic Island */}
      <div style={{ width: large?148:122, height: large?38:34, borderRadius:20, background:'#000',
        margin:'3px auto 6px', flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center', gap:10,
        boxShadow:'0 0 0 0.5px rgba(255,255,255,0.03)' }}>
        <div style={{ width:10, height:10, borderRadius:'50%', background:'#0c0c0c',
          border:'1px solid rgba(255,255,255,0.07)', boxShadow:'0 0 0 2px rgba(29,92,255,0.15) inset' }} />
        <div style={{
          width:3, height:3, borderRadius:'50%',
          background: typing ? '#00cfff' : 'rgba(29,92,255,0.85)',
          boxShadow: typing ? '0 0 8px #00cfff' : 'none',
          transition:'background 0.3s, box-shadow 0.3s',
          animation: typing ? 'phoneDiBlink 0.5s ease-in-out infinite alternate' : 'none',
        }} />
      </div>

      {/* Chat header */}
      <div style={{ display:'flex', alignItems:'center', gap:10,
        padding:`6px ${large?18:14}px ${large?12:10}px`,
        borderBottom:'1px solid rgba(255,255,255,0.05)', flexShrink:0 }}>
        <div style={{ width:fs(36), height:fs(36), borderRadius:11, flexShrink:0,
          background:'linear-gradient(135deg,#1d5cff 0%,#00cfff 100%)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:fs(18), color:'#fff',
          boxShadow:'0 0 16px rgba(29,92,255,0.5)' }}>C</div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Barlow',sans-serif", fontWeight:700, fontSize:fs(13), color:'#f0f4ff' }}>
            @Copilo_TaxiBot
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:1 }}>
            <div style={{ width:5, height:5, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 5px #22c55e' }} />
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:fs(9), color:'rgba(0,207,255,0.65)', letterSpacing:'0.06em' }}>{online}</span>
          </div>
        </div>
        <div style={{ fontFamily:"'DM Mono',monospace", fontSize:fs(8.5), letterSpacing:'0.07em',
          color:'rgba(0,207,255,0.6)', textTransform:'uppercase',
          padding:'2px 7px', borderRadius:6,
          background:'rgba(0,207,255,0.07)', border:'1px solid rgba(0,207,255,0.14)',
          transition:'all 0.3s', whiteSpace:'nowrap' }}>
          {current.icon} {current.label}
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} style={{ flex:1, overflowY:'auto', padding:`10px ${large?16:12}px 12px`,
        display:'flex', flexDirection:'column', gap: large ? 10 : 8, scrollbarWidth:'none' }}>

        {current.messages.slice(0, visibleN).map((m, i) => (
          <div key={`${activeIdx}-${i}`}
            style={{ display:'flex', justifyContent:m.role==='u'?'flex-end':'flex-start',
              alignItems:'flex-end', gap:5, animation:'msgIn 0.26s ease forwards' }}>

            {m.role === 'c' && (
              <div style={{ width:fs(22), height:fs(22), borderRadius:7, flexShrink:0,
                background:'linear-gradient(135deg,#1d5cff 0%,#00cfff 100%)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:fs(11), color:'#fff' }}>C</div>
            )}

            <div style={{
              maxWidth:'80%', padding:`${large?9:7}px ${large?13:11}px`,
              borderRadius: m.role==='u' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
              background: m.role==='u' ? 'linear-gradient(135deg,#1d5cff,#1040c0)' : 'rgba(255,255,255,0.06)',
              border: m.role==='c' ? '1px solid rgba(255,255,255,0.07)' : 'none',
              color:'#f0f4ff', fontSize:fs(11), lineHeight:1.65,
              fontFamily:"'Barlow',sans-serif",
              boxShadow: m.role==='u' ? '0 2px 12px rgba(29,92,255,0.3)' : 'none',
              whiteSpace:'pre-wrap',
            }}>
              {m.text}
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:fs(7.5),
                color:'rgba(255,255,255,0.22)', marginTop:3,
                textAlign: m.role==='u' ? 'right' : 'left' }}>
                09:{String(41 + i).padStart(2, '0')}
              </div>
            </div>

            {m.role === 'u' && (
              <svg width="14" height="9" viewBox="0 0 18 10" style={{ flexShrink:0, marginBottom:8 }} fill="none">
                <path d="M1 5l3.5 3.5L10 1"  stroke="#00cfff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 5l3.5 3.5L16 1" stroke="#00cfff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        ))}

        {typing && (
          <div style={{ display:'flex', justifyContent:'flex-start', alignItems:'flex-end', gap:5, animation:'msgIn 0.26s ease forwards' }}>
            <div style={{ width:fs(22), height:fs(22), borderRadius:7, flexShrink:0,
              background:'linear-gradient(135deg,#1d5cff 0%,#00cfff 100%)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:fs(11), color:'#fff' }}>C</div>
            <div style={{ padding:'9px 12px', borderRadius:'4px 14px 14px 14px',
              background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.07)',
              display:'flex', gap:4, alignItems:'center' }}>
              {[0, 0.2, 0.4].map((d, i) => (
                <span key={i} style={{ width:5, height:5, borderRadius:'50%',
                  background:'rgba(29,92,255,0.8)', display:'inline-block',
                  animation:`blink 1.2s ${d}s ease-in-out infinite` }} />
              ))}
            </div>
          </div>
        )}

        {showCta && !typing && (
          <div style={{ display:'flex', justifyContent:'center', marginTop:8, animation:'msgIn 0.4s ease forwards' }}>
            <a href="/onboard?type=bot" style={{
              display:'inline-flex', alignItems:'center', gap:6,
              padding:`${large?10:8}px ${large?20:16}px`, borderRadius:20,
              background:'linear-gradient(135deg,#1d5cff,#00cfff)',
              boxShadow:'0 0 20px rgba(29,92,255,0.45)',
              color:'#fff', textDecoration:'none',
              fontFamily:"'Barlow Condensed',sans-serif",
              fontWeight:700, fontSize:fs(12), letterSpacing:'0.06em', textTransform:'uppercase',
              animation:'phoneCtaPulse 2s ease-in-out infinite',
            }}>
              <TgIcon />{ctaInChat}
            </a>
          </div>
        )}
      </div>

      {/* Scenario pills */}
      <div style={{ display:'flex', justifyContent:'center', gap:4, padding:'5px 10px',
        background:'rgba(4,8,15,0.85)', borderTop:'1px solid rgba(255,255,255,0.04)', flexShrink:0 }}>
        {scenarios.map((sc, i) => (
          <button key={sc.id} onClick={() => setActiveIdx(i)} style={{
            padding:`3px ${large?10:8}px`, borderRadius:10,
            background: activeIdx===i ? 'rgba(29,92,255,0.2)' : 'rgba(255,255,255,0.03)',
            border:`1px solid ${activeIdx===i ? 'rgba(29,92,255,0.45)' : 'rgba(255,255,255,0.06)'}`,
            color: activeIdx===i ? '#00cfff' : 'rgba(180,200,255,0.3)',
            fontFamily:"'Barlow Condensed',sans-serif",
            fontWeight: activeIdx===i ? 700 : 500,
            fontSize:fs(9), letterSpacing:'0.07em', textTransform:'uppercase',
            cursor:'pointer', transition:'all 0.2s', whiteSpace:'nowrap',
          }}>
            {sc.icon} {sc.label}
          </button>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 10px',
        borderTop:'1px solid rgba(255,255,255,0.05)', background:'rgba(4,8,15,0.95)', flexShrink:0 }}>
        <button
          onClick={() => window.open('https://t.me/Copilo_TaxiBot', '_blank', 'noopener,noreferrer')}
          aria-label="Ouvrir Copilo sur Telegram"
          style={{ width:fs(32), height:fs(32), borderRadius:'50%', border:'none', flexShrink:0,
            background:'linear-gradient(135deg,#1d5cff,#00cfff)',
            boxShadow: typing ? '0 0 22px rgba(29,92,255,0.75)' : '0 0 14px rgba(29,92,255,0.45)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', transition:'box-shadow 0.3s' }}>
          <MicIcon />
        </button>
        <div style={{ flex:1, height:30, borderRadius:15,
          background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)',
          display:'flex', alignItems:'center', paddingLeft:11 }}>
          <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:fs(10), color:'rgba(255,255,255,0.2)' }}>
            Message…
          </span>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════════════ */
export default function Hero({ lang }: { lang: Lang }) {
  const tr        = T[lang]
  const scenarios = SCENARIOS[lang]

  const [activeIdx, setActiveIdx] = useState(0)
  const [visibleN,  setVisibleN]  = useState(0)
  const [typing,    setTyping]    = useState(false)
  const [showCta,   setShowCta]   = useState(false)
  const [fadeOut,   setFadeOut]   = useState(false)
  const [progKey,   setProgKey]   = useState(0)
  const [zoomed,    setZoomed]    = useState(false)

  const smallChatRef = useRef<HTMLDivElement>(null)
  const largeChatRef = useRef<HTMLDivElement>(null)

  useEffect(() => { setActiveIdx(0) }, [lang])

  const scrollBot = useCallback(() => {
    setTimeout(() => {
      [smallChatRef, largeChatRef].forEach(r => {
        if (r.current) r.current.scrollTop = 9999
      })
    }, 80)
  }, [])

  const scenarioDuration = useMemo(() => {
    const msgs = scenarios[activeIdx].messages
    return msgs[msgs.length - 1].delay + 350 + 4400
  }, [activeIdx, scenarios])

  /* Auto-play */
  useEffect(() => {
    setVisibleN(0); setTyping(false); setShowCta(false)
    setFadeOut(false); setProgKey(k => k + 1)

    const timers: ReturnType<typeof setTimeout>[] = []
    const msgs = scenarios[activeIdx].messages

    msgs.forEach((m, i) => {
      if (m.role === 'c' && m.delay > 400)
        timers.push(setTimeout(() => { setTyping(true); scrollBot() }, m.delay - 750))
      timers.push(setTimeout(() => {
        setTyping(false); setVisibleN(i + 1); scrollBot()
      }, m.delay + 350))
    })

    const lastDelay = msgs[msgs.length - 1].delay + 350
    timers.push(setTimeout(() => setShowCta(true), lastDelay + 1000))
    timers.push(setTimeout(() => {
      setFadeOut(true)
      timers.push(setTimeout(() => setActiveIdx(i => (i + 1) % scenarios.length), 450))
    }, lastDelay + 4000))

    return () => timers.forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, lang])

  /* Escape closes zoom */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') setZoomed(false) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  /* Lock body scroll while zoomed */
  useEffect(() => {
    document.body.style.overflow = zoomed ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [zoomed])

  const phoneProps = {
    scenarios, activeIdx, setActiveIdx, visibleN, typing, showCta, fadeOut,
    progKey, scenarioDuration, online: tr.online, ctaInChat: tr.ctaInChat,
  }

  /* ── Zoomed overlay phone size ── */
  // 310:660 aspect ratio, height capped at 85vh or 820px
  const ZOOM_H = 820
  const ZOOM_W = Math.round(ZOOM_H * 310 / 660) // ≈ 385px

  return (
    <>
      <section style={{ position:'relative', minHeight:'100vh', display:'flex', alignItems:'center', padding:'80px 0 100px' }}>

        {/* Top glow */}
        <div style={{ position:'absolute', top:'-8%', left:'50%', transform:'translateX(-50%)', width:900, height:500,
          background:'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(29,92,255,0.42) 0%, rgba(0,207,255,0.1) 40%, transparent 70%)',
          pointerEvents:'none' }} />

        <div style={{ maxWidth:1200, width:'100%', margin:'0 auto', padding:'0 clamp(20px,5vw,60px)',
          display:'flex', alignItems:'center', gap:'clamp(32px,5vw,72px)',
          position:'relative', zIndex:1, flexWrap:'wrap' }}>

          {/* ══ LEFT: copy ══════════════════════════════════════════════ */}
          <div style={{ flex:'1 1 300px', minWidth:260 }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:'0.14em',
              color:'rgba(0,207,255,0.7)', marginBottom:20, textTransform:'uppercase' }}>
              {tr.tag}
            </div>
            <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, lineHeight:0.92,
              letterSpacing:'-0.01em', textTransform:'uppercase',
              fontSize:'clamp(46px,6vw,80px)', marginBottom:20, color:'#f0f4ff' }}>
              {tr.h1a}<br />
              <span style={{ background:'linear-gradient(120deg,#fff 0%,#60a5fa 55%,#00cfff 100%)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                {tr.h1b}
              </span>
            </h1>
            <p style={{ fontSize:15, color:'rgba(180,200,255,0.55)', lineHeight:1.75,
              fontFamily:"'Barlow',sans-serif", maxWidth:400, marginBottom:32, color:'rgba(180,200,255,0.78)' }}>{tr.sub}</p>
            <div style={{ display:'flex', gap:28, marginBottom:40, flexWrap:'wrap' }}>
              {tr.metrics.map(m => (
                <div key={m.label}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:26, color:'#00cfff', textTransform:'uppercase' }}>{m.val}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'rgba(180,200,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:2 }}>{m.label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:'rgba(29,92,255,0.75)', letterSpacing:'0.1em', textTransform:'uppercase' }}>
              {tr.demo}
            </div>
          </div>

          {/* ══ RIGHT: small iPhone (click to zoom) ══════════════════════ */}
          <div style={{ flexShrink:0, position:'relative', display:'flex', flexDirection:'column', alignItems:'center' }}>

            <div style={{ position:'absolute', top:-30, left:-30, right:-30, height:700,
              background:'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(29,92,255,0.18) 0%, transparent 70%)',
              borderRadius:'50%', pointerEvents:'none' }} />

            {/* Clickable phone wrapper */}
            <div
              onClick={() => setZoomed(true)}
              title={tr.expand}
              style={{ position:'relative', width:310, height:660, flexShrink:0, cursor:'pointer' }}
            >
              {/* Expand hint — top-right corner */}
              <div style={{
                position:'absolute', top:16, right:16, zIndex:20,
                width:28, height:28, borderRadius:8,
                background:'rgba(4,8,15,0.7)',
                backdropFilter:'blur(8px)',
                border:'1px solid rgba(29,92,255,0.35)',
                display:'flex', alignItems:'center', justifyContent:'center',
                opacity:0.65, transition:'opacity 0.2s',
                pointerEvents:'none',
              }}>
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="rgba(0,207,255,0.9)" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M9 1h4v4M5 13H1V9M14 1l-5 5M1 13l5-5"/>
                </svg>
              </div>

              {/* Titanium frame */}
              <div style={{ position:'absolute', inset:0, borderRadius:52,
                background:'linear-gradient(160deg,#2f2f2f 0%,#1a1a1a 30%,#3c3c3c 50%,#1c1c1c 70%,#2d2d2d 100%)',
                boxShadow:'0 0 0 0.5px rgba(255,255,255,0.09) inset, 0 0 0 1px rgba(0,0,0,0.8), 0 48px 90px rgba(0,0,0,0.65), 0 0 40px rgba(29,92,255,0.12)',
                transition:'box-shadow 0.3s',
              }}>
                {([
                  { s:'left',  t:100, h:18, k:'act' },
                  { s:'left',  t:134, h:34, k:'vp'  },
                  { s:'left',  t:178, h:34, k:'vm'  },
                  { s:'right', t:152, h:52, k:'pwr' },
                ] as const).map(b => (
                  <div key={b.k} style={{ position:'absolute', ...(b.s==='left'?{left:-3}:{right:-3}),
                    top:b.t, width:3, height:b.h,
                    borderRadius:b.s==='left'?'2px 0 0 2px':'0 2px 2px 0', background:'#2e2e2e' }} />
                ))}
              </div>

              <PhoneScreen {...phoneProps} chatRef={smallChatRef} />
            </div>

            {/* Navigation dots */}
            <div style={{ display:'flex', gap:5, marginTop:14 }}>
              {scenarios.map((_, i) => (
                <button key={i} onClick={() => setActiveIdx(i)} style={{
                  width: activeIdx===i ? 22 : 6, height:6, borderRadius:3, padding:0,
                  background: activeIdx===i ? '#1d5cff' : 'rgba(255,255,255,0.15)',
                  border:'none', cursor:'pointer', transition:'all 0.3s ease',
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:'absolute', bottom:24, right:'clamp(16px,4vw,40px)',
          display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
          <div style={{ width:1, height:36, background:'linear-gradient(to bottom,rgba(29,92,255,0.5),transparent)' }} />
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'rgba(180,200,255,0.28)',
            letterSpacing:'0.12em', writingMode:'vertical-rl' }}>SCROLL</span>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FULLSCREEN OVERLAY — FacilPay-inspired atmospheric phone
      ════════════════════════════════════════════════════════════════ */}
      {zoomed && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setZoomed(false) }}
          style={{
            position:'fixed', inset:0, zIndex:9999,
            display:'flex', alignItems:'center', justifyContent:'center',
            animation:'overlayFadeIn 0.35s ease forwards',
            /* Deep space + blue horizon burst */
            background:`
              radial-gradient(ellipse 110% 55% at 50% -8%, rgba(15,75,220,0.85) 0%, rgba(8,40,130,0.45) 28%, transparent 55%),
              radial-gradient(ellipse 80% 40% at 50% 0%, rgba(0,207,255,0.18) 0%, transparent 45%),
              #020510
            `,
          }}
        >
          {/* Stars layer */}
          <div className="stars-bg" style={{ position:'absolute', inset:0, opacity:0.6 }} />

          {/* Close button */}
          <button
            onClick={() => setZoomed(false)}
            style={{ position:'absolute', top:24, right:24, zIndex:10001,
              width:44, height:44, borderRadius:12,
              background:'rgba(4,8,15,0.7)', backdropFilter:'blur(12px)',
              border:'1px solid rgba(255,255,255,0.1)',
              display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer', color:'rgba(180,200,255,0.7)',
              transition:'background 0.2s, border-color 0.2s',
              fontFamily:'monospace', fontSize:16,
            }}
            onMouseEnter={e => { e.currentTarget.style.background='rgba(29,92,255,0.25)'; e.currentTarget.style.borderColor='rgba(29,92,255,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.background='rgba(4,8,15,0.7)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="1" y1="1" x2="13" y2="13"/><line x1="13" y1="1" x2="1" y2="13"/>
            </svg>
          </button>

          {/* Escape hint */}
          <div style={{ position:'absolute', top:32, left:'50%', transform:'translateX(-50%)',
            fontFamily:"'DM Mono',monospace", fontSize:10,
            color:'rgba(180,200,255,0.25)', letterSpacing:'0.1em', whiteSpace:'nowrap' }}>
            ESC — fermer
          </div>

          {/* Phone wrapper */}
          <div style={{ position:'relative', animation:'phoneZoomIn 0.42s cubic-bezier(0.25,0,0,1) forwards' }}>

            {/* Blue corona — atmospheric glow ABOVE the phone */}
            <div style={{
              position:'absolute', top:-50, left:'50%',
              transform:'translateX(-50%)',
              width:'130%', height:120,
              background:'radial-gradient(ellipse 85% 100% at 50% 100%, rgba(29,92,255,0.7) 0%, rgba(0,207,255,0.3) 35%, transparent 70%)',
              filter:'blur(18px)',
              pointerEvents:'none', zIndex:0,
              animation:'coronaFlare 3s ease-in-out infinite',
            }} />

            {/* Secondary softer halo */}
            <div style={{
              position:'absolute', top:-100, left:'50%', transform:'translateX(-50%)',
              width:'160%', height:200,
              background:'radial-gradient(ellipse 70% 80% at 50% 100%, rgba(0,207,255,0.12) 0%, transparent 65%)',
              filter:'blur(30px)',
              pointerEvents:'none', zIndex:0,
            }} />

            {/* Titanium frame — zoomed, with blue rim glow */}
            <div style={{
              position:'relative', zIndex:1,
              width:`min(${ZOOM_W}px, 56vw)`,
              height:`min(${ZOOM_H}px, 85vh)`,
              flexShrink:0,
            }}>
              <div style={{
                position:'absolute', inset:0, borderRadius:64,
                background:'linear-gradient(160deg,#1e2d4a 0%,#0d1828 25%,#1a2840 45%,#0a1220 70%,#1c2a40 100%)',
                boxShadow:`
                  0 0 0 1px rgba(29,92,255,0.4),
                  0 0 0 2px rgba(0,0,0,0.9),
                  inset 0 0 0 0.5px rgba(255,255,255,0.07),
                  0 0 40px rgba(29,92,255,0.55),
                  0 0 80px rgba(29,92,255,0.28),
                  0 0 140px rgba(0,207,255,0.12),
                  0 80px 140px rgba(0,0,0,0.85)
                `,
              }}>
                {/* Buttons */}
                {([
                  { s:'left',  t:120, h:22, k:'act' },
                  { s:'left',  t:162, h:42, k:'vp'  },
                  { s:'left',  t:216, h:42, k:'vm'  },
                  { s:'right', t:184, h:64, k:'pwr' },
                ] as const).map(b => (
                  <div key={b.k} style={{ position:'absolute', ...(b.s==='left'?{left:-4}:{right:-4}),
                    top:b.t, width:4, height:b.h,
                    borderRadius:b.s==='left'?'2px 0 0 2px':'0 2px 2px 0',
                    background:'#1e2d44',
                    boxShadow:b.s==='left'?'-1px 0 4px rgba(29,92,255,0.15)':'1px 0 4px rgba(29,92,255,0.15)' }} />
                ))}
              </div>

              {/* Screen */}
              <PhoneScreen
                {...phoneProps}
                chatRef={largeChatRef}
                large
              />
            </div>

            {/* Bottom atmospheric fade */}
            <div style={{
              position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)',
              width:'120%', height:80,
              background:'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(29,92,255,0.15) 0%, transparent 60%)',
              filter:'blur(15px)',
              pointerEvents:'none',
            }} />

            {/* Nav dots below zoomed phone */}
            <div style={{ display:'flex', justifyContent:'center', gap:6, marginTop:20 }}>
              {scenarios.map((_, i) => (
                <button key={i} onClick={() => setActiveIdx(i)} style={{
                  width: activeIdx===i ? 26 : 7, height:7, borderRadius:4, padding:0,
                  background: activeIdx===i ? '#1d5cff' : 'rgba(255,255,255,0.2)',
                  border:'none', cursor:'pointer', transition:'all 0.3s ease',
                }} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ── Icons ────────────────────────────────────────────────────────────── */
function MicIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  )
}
function TgIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}
function SignalIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="rgba(255,255,255,0.75)">
      <rect x="0" y="7" width="2.5" height="4" rx="0.5"/>
      <rect x="3.5" y="4.5" width="2.5" height="6.5" rx="0.5"/>
      <rect x="7" y="2" width="2.5" height="9" rx="0.5"/>
      <rect x="10.5" y="0" width="2.5" height="11" rx="0.5"/>
    </svg>
  )
}
function WifiIcon() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth="1.5" strokeLinecap="round">
      <path d="M1 3.5C3.6 1.2 10.4 1.2 13 3.5"/>
      <path d="M3 6C4.8 4.5 9.2 4.5 11 6"/>
      <circle cx="7" cy="9" r="0.8" fill="rgba(255,255,255,0.75)" stroke="none"/>
    </svg>
  )
}
function BatteryIcon() {
  return (
    <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
      <rect x="0.5" y="0.5" width="18" height="11" rx="3" stroke="rgba(255,255,255,0.5)"/>
      <rect x="2" y="2" width="12" height="8" rx="1.5" fill="rgba(255,255,255,0.7)"/>
      <path d="M19.5 4v4c1.2-.5 1.2-3.5 0-4z" fill="rgba(255,255,255,0.45)"/>
    </svg>
  )
}
