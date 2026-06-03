'use client'
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

/* ─── Types ─────────────────────────────────────────────────────────── */
type Lang    = 'fr' | 'en'
type MsgRole = 'u' | 'c'
interface ScenarioMsg { role: MsgRole; text: string; delay: number; voice?: boolean; call?: boolean }
interface Scenario    { id: string; label: string; icon: string; messages: ScenarioMsg[] }

/* ─── Scenario data ──────────────────────────────────────────────────── */
const SCENARIOS: Record<Lang, Scenario[]> = {
  fr: [
    {
      id: 'course', label: 'Course', icon: '🚗',
      messages: [
        { role: 'u', text: 'Course demain 14h30 Nice → Aéroport NCE, M. Bernard', delay: 0, voice: true },
        { role: 'c', text: 'Voici la course :\n• 28/05 à 14:30 — M. Bernard\n• Nice → Aéroport NCE · 22 min\n• Montant 32 €\n\nConfirmer ?', delay: 1800 },
        { role: 'u', text: 'Oui confirmer', delay: 3400 },
        { role: 'c', text: 'Course #87 créée ✓\nGoogle Calendar mis à jour\nRappel dans 13h30', delay: 5200 },
      ],
    },
    {
      id: 'appel', label: 'Appel', icon: '📞',
      messages: [
        { role: 'c', text: 'Bonjour, il me faut un taxi demain 8h, 12 rue de Paris → hôpital.', delay: 0, call: true },
        { role: 'c', text: 'Course détectée depuis l\'appel :\n• Demain 08:00\n• 12 rue de Paris → Hôpital\n\nConfirmer et rappeler le client ?', delay: 2200 },
        { role: 'u', text: 'Oui, confirme', delay: 4000, voice: true },
        { role: 'c', text: 'Course créée ✓\nSMS de confirmation envoyé au client\nAjoutée au Google Calendar', delay: 5600 },
      ],
    },
    {
      id: 'brief', label: 'Brief', icon: '☀️',
      messages: [
        { role: 'c', text: 'Bonjour ! Brief du 28/05 :\n\n• 3 courses planifiées\n• 09:00 Mme Dupont → Cannes\n• 11:30 M. Karim → Aéroport NCE\n• 15:00 Mme Leroy → Gare Nice\n\nCA estimé : 142,80 €\nPéages : 8,40 €', delay: 0 },
        { role: 'u', text: "C'est noté, merci Copilo", delay: 2200 },
        { role: 'c', text: 'Bonne route ! Je te préviens 15 min avant chaque course.', delay: 3800 },
      ],
    },
    {
      id: 'tarif', label: 'Tarif', icon: '💶',
      messages: [
        { role: 'u', text: 'Tarif CPAM Nice → Cagnes-sur-Mer, 12 km, péage 1,70 €', delay: 0, voice: true },
        { role: 'c', text: '💰 Estimation CA CPAM\n📍 Nice → Cagnes-sur-Mer (Alpes-Maritimes)\n📏 8 km facturables (sur 12)\n💶 1,27 €/km · 🏙️ Grande ville +15 €\n\n🧾 Course : 38,16 €\n🛣️ Péage : +1,70 €\n✅ Total : 39,86 €', delay: 1800 },
        { role: 'u', text: 'Parfait, crée la course', delay: 3800, voice: true },
        { role: 'c', text: 'Course créée ✓\nAjoutée au Google Calendar (en jaune)\nRappel 15 min avant', delay: 5400 },
      ],
    },
    {
      id: 'bilan', label: 'Bilan', icon: '📊',
      messages: [
        { role: 'u', text: 'Fais le bilan de ma journée', delay: 0 },
        { role: 'c', text: 'Bilan du 28/05 :\n• 7 courses · 312,40 € CA\n• Péages 14,20 €\n• Net : 298,20 €\n\nGénérer l\'export compta ?', delay: 1800 },
        { role: 'u', text: 'Oui, envoie-le', delay: 3400 },
        { role: 'c', text: 'Export PDF + CSV générés ✓\nEnvoyés sur ton email\nCompta à jour', delay: 5200 },
      ],
    },
  ],
  en: [
    {
      id: 'course', label: 'Ride', icon: '🚗',
      messages: [
        { role: 'u', text: 'Ride tomorrow 2:30pm Nice → NCE Airport, Mr Bernard', delay: 0, voice: true },
        { role: 'c', text: 'Ride details:\n• May 28 at 14:30 — Mr Bernard\n• Nice → NCE Airport · 22 min\n• Fare €32\n\nConfirm?', delay: 1800 },
        { role: 'u', text: 'Yes confirm', delay: 3400 },
        { role: 'c', text: 'Ride #87 created ✓\nGoogle Calendar updated\nReminder in 13h30', delay: 5200 },
      ],
    },
    {
      id: 'appel', label: 'Call', icon: '📞',
      messages: [
        { role: 'c', text: 'Hi, I need a taxi tomorrow 8am, 12 Paris St → hospital.', delay: 0, call: true },
        { role: 'c', text: 'Ride detected from the call:\n• Tomorrow 08:00\n• 12 Paris St → Hospital\n\nConfirm and call the client back?', delay: 2200 },
        { role: 'u', text: 'Yes, confirm', delay: 4000, voice: true },
        { role: 'c', text: 'Ride created ✓\nConfirmation SMS sent to client\nAdded to Google Calendar', delay: 5600 },
      ],
    },
    {
      id: 'brief', label: 'Brief', icon: '☀️',
      messages: [
        { role: 'c', text: 'Good morning! Brief May 28:\n\n• 3 rides scheduled\n• 09:00 Ms Dupont → Cannes\n• 11:30 Mr Karim → NCE Airport\n• 15:00 Ms Leroy → Nice Station\n\nEst. revenue: €142.80\nTolls: €8.40', delay: 0 },
        { role: 'u', text: 'Got it, thanks Copilo', delay: 2200 },
        { role: 'c', text: "Safe drive! I'll alert you 15 min before each ride.", delay: 3800 },
      ],
    },
    {
      id: 'tarif', label: 'Fare', icon: '💶',
      messages: [
        { role: 'u', text: 'CPAM fare Nice → Cagnes-sur-Mer, 12 km, €1.70 toll', delay: 0, voice: true },
        { role: 'c', text: '💰 CPAM fare estimate\n📍 Nice → Cagnes-sur-Mer (Alpes-Maritimes)\n📏 8 billable km (of 12)\n💶 €1.27/km · 🏙️ Big city +€15\n\n🧾 Ride: €38.16\n🛣️ Toll: +€1.70\n✅ Total: €39.86', delay: 1800 },
        { role: 'u', text: 'Perfect, create the ride', delay: 3800, voice: true },
        { role: 'c', text: 'Ride created ✓\nAdded to Google Calendar (yellow)\nReminder 15 min before', delay: 5400 },
      ],
    },
    {
      id: 'bilan', label: 'Summary', icon: '📊',
      messages: [
        { role: 'u', text: 'Wrap up my day', delay: 0 },
        { role: 'c', text: 'Today May 28:\n• 7 rides · €312.40 revenue\n• Tolls €14.20\n• Net: €298.20\n\nGenerate the accounting export?', delay: 1800 },
        { role: 'u', text: 'Yes, send it', delay: 3400 },
        { role: 'c', text: 'PDF + CSV export generated ✓\nSent to your email\nBookkeeping up to date', delay: 5200 },
      ],
    },
  ],
}

const T = {
  fr: {
    tag: '// ASSISTANT TAXI & VTC · TÉLÉPHONE 24H/24',
    h1a: 'TU CONDUIS.',
    h1b: 'COPILO GÈRE LE RESTE.',
    sub: 'Secrétariat téléphonique IA pour taxis conventionnés CPAM et VTC indépendants : appels, réservations, bons de transport, calendrier et exports comptables — sur Telegram.',
    demo: '4 scénarios réels, en direct ↓',
    metrics: [
      { val: '0€',    label: 'pour démarrer' },
      { val: '< 30s', label: 'setup'          },
      { val: '100%',  label: 'européen'        },
    ],
    online: 'EN LIGNE',
    ctaInChat: 'Essayer Copilo →',
    expand: 'Voir en plein écran',
  },
  en: {
    tag: '// TAXI & PHV ASSISTANT · 24/7 PHONE',
    h1a: 'YOU DRIVE.',
    h1b: 'COPILO HANDLES THE REST.',
    sub: 'AI phone secretary for independent taxi and PHV drivers: calls, bookings, transport receipts, calendar and accounting exports — on Telegram.',
    demo: '4 real scenarios, live ↓',
    metrics: [
      { val: '0€',    label: 'to start'  },
      { val: '< 30s', label: 'setup'      },
      { val: '100%',  label: 'European'   },
    ],
    online: 'ONLINE',
    ctaInChat: 'Try Copilo →',
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
  // Police responsive : sur mobile le téléphone est moins rétréci (kEnd 0.84)
  // → on baisse `s` pour éviter une police trop grosse à l'écran.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 640)
    fn(); window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  const s  = large ? (isMobile ? 1.3 : 1.7) : 1   // scale factor for text/avatar sizes
  const fs = (n: number) => n * s                  // font scale helper
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
              {m.voice && (
                <div style={{ display:'flex', alignItems:'center', gap:fs(3), marginBottom:fs(5) }}>
                  <MicIcon />
                  {[6,11,7,13,8,5,10,7].map((h,bi)=>(
                    <span key={bi} style={{ width:fs(2), height:fs(h), borderRadius:2, background:'rgba(255,255,255,0.72)' }} />
                  ))}
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:fs(8), color:'rgba(255,255,255,0.78)', marginLeft:fs(3) }}>0:0{(i%5)+3}</span>
                </div>
              )}
              {m.call && (
                <div style={{ display:'inline-flex', alignItems:'center', gap:fs(4), marginBottom:fs(5),
                  padding:`${fs(2)}px ${fs(7)}px`, borderRadius:6, background:'rgba(0,207,255,0.12)',
                  border:'1px solid rgba(0,207,255,0.25)', fontFamily:"'DM Mono',monospace", fontSize:fs(8),
                  letterSpacing:'0.06em', color:'rgba(0,207,255,0.9)', textTransform:'uppercase' }}>
                  📞 Appel transcrit
                </div>
              )}
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

      </div>

      {/* Scenario pills */}
      <div style={{ display:'flex', justifyContent:'center', gap:4, padding:'5px 10px',
        background:'rgba(4,8,15,0.85)', borderTop:'1px solid rgba(255,255,255,0.04)', flexShrink:0 }}>
        {scenarios.map((sc, i) => (
          <button key={sc.id} onClick={(e) => { e.stopPropagation(); setActiveIdx(i) }} style={{
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

  /* ── Scroll-driven zoom on the Hero simulation phone (FacilPay) ────── */
  const heroRef      = useRef<HTMLElement | null>(null)
  const copyRef      = useRef<HTMLDivElement>(null)
  const glowRef      = useRef<HTMLDivElement>(null)
  const phoneZoomRef = useRef<HTMLDivElement>(null)
  const hintRef      = useRef<HTMLDivElement>(null)
  const ctaRef       = useRef<HTMLAnchorElement>(null)
  const [zoomEnabled, setZoomEnabled] = useState(false)

  /* Enable the effect only when motion is allowed (avoids SSR/hydration issues) */
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    setZoomEnabled(!reduce)
  }, [])

  useEffect(() => {
    if (!zoomEnabled) return
    let raf = 0
    const update = () => {
      raf = 0
      const el = heroRef.current
      if (!el) return
      const vh = window.innerHeight
      const total = el.offsetHeight - vh
      const top = el.getBoundingClientRect().top
      const p = total > 0 ? Math.min(Math.max(-top / total, 0), 1) : 0   // 0 → 1
      // p=0 : on ne voit que le HAUT d'un grand iPhone (façade FacilPay), posé
      // dans la moitié basse. En scrollant il remonte et rétrécit → le téléphone
      // entier + la simulation se révèlent. Net partout (scale ≤ 1, DOM natif = 4K).
      // Mobile-first : sur petit écran le téléphone reste plus grand une fois
      // révélé (texte lisible) ; sur desktop il rétrécit un peu plus.
      const kEnd = window.innerWidth < 640 ? 0.84 : 0.66
      const k  = 1.0 - p * (1.0 - kEnd)  // 1.0 (haut géant) → kEnd (tél entier visible)
      // Anti-chevauchement : le titre s'efface D'ABORD (p < 0.34), PUIS le
      // téléphone remonte et se révèle (p 0.34 → 1). Transition fluide, le
      // texte et l'iPhone ne se croisent jamais.
      const reveal = Math.max(0, (p - 0.34) / 0.66)
      const ty = 56 - reveal * 53        // vh : 56vh (sous le titre) → 3vh (centré)
      if (phoneZoomRef.current) {
        phoneZoomRef.current.style.top = `${ty}vh`
        phoneZoomRef.current.style.transform = `translateX(-50%) translateZ(0) scale(${k})`
      }
      if (copyRef.current) {
        copyRef.current.style.opacity   = String(Math.max(0, 1 - p * 3.6))
        copyRef.current.style.transform = `translateY(${-p * 80}px)`
      }
      if (glowRef.current) glowRef.current.style.opacity = String(0.95 - p * 0.2)
      if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - p * 4))
      // Le CTA apparaît à mesure que le téléphone se révèle (à la fin de l'iPhone)
      if (ctaRef.current) ctaRef.current.style.opacity = String(Math.min(1, Math.max(0, (p - 0.3) * 3)))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [zoomEnabled])

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
      <section ref={heroRef} style={{ position:'relative', height: zoomEnabled ? '220vh' : undefined, minHeight: zoomEnabled ? undefined : '100vh' }}>
       <div style={{ position: zoomEnabled ? 'sticky' : 'relative', top:0,
         height: zoomEnabled ? '100vh' : 'auto', minHeight: zoomEnabled ? undefined : '100vh',
         display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>

        {/* ── Neon-blue sunrise glow (behind the phone's upper edge, ~mid-screen) ── */}
        <div ref={glowRef} aria-hidden style={{ position:'absolute', top:'8%', left:'50%', transform:'translateX(-50%)',
          width:'min(1300px,135vw)', height:'72vh', opacity:0.95, transition:'opacity 0.15s linear', zIndex:0,
          background:'radial-gradient(ellipse 55% 50% at 50% 62%, rgba(0,225,255,0.55) 0%, rgba(29,110,255,0.42) 26%, rgba(20,60,200,0.14) 50%, transparent 72%)',
          filter:'blur(6px)', pointerEvents:'none' }} />
        {/* thin neon horizon line */}
        <div aria-hidden style={{ position:'absolute', top:'49%', left:'50%', transform:'translateX(-50%)',
          width:'min(900px,82vw)', height:2, zIndex:0,
          background:'linear-gradient(90deg, transparent, rgba(140,230,255,0.85), transparent)',
          filter:'blur(1px)', pointerEvents:'none' }} />

        {/* ══ TOP HALF : title zone (under the fixed header), fades on scroll ══ */}
        <div ref={copyRef} style={{ position:'absolute', top:0, left:0, right:0, height:'50vh',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          textAlign:'center', zIndex:2, padding:'56px clamp(16px,5vw,24px) 0', pointerEvents:'none',
          willChange:'opacity, transform' }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:'0.14em',
            color:'rgba(0,207,255,0.7)', marginBottom:16, textTransform:'uppercase' }}>
            {tr.tag}
          </div>
          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, lineHeight:0.92,
            letterSpacing:'-0.01em', textTransform:'uppercase',
            fontSize:'clamp(36px,6.6vw,74px)', margin:'0 auto 14px', maxWidth:760, color:'#f0f4ff' }}>
            {tr.h1a}{' '}
            <span style={{ background:'linear-gradient(120deg,#fff 0%,#60a5fa 55%,#00cfff 100%)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              {tr.h1b}
            </span>
          </h1>
          <p style={{ fontSize:15, color:'rgba(180,200,255,0.78)', lineHeight:1.7,
            fontFamily:"'Barlow',sans-serif", maxWidth:430, margin:'0 auto 20px' }}>{tr.sub}</p>
          <div style={{ display:'flex', gap:'clamp(20px,5vw,32px)', justifyContent:'center', flexWrap:'wrap' }}>
            {tr.metrics.map(m => (
              <div key={m.label}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:26, color:'#00cfff', textTransform:'uppercase' }}>{m.val}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'rgba(180,200,255,0.4)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:2 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ BOTTOM HALF : the big clickable iPhone, anchored to the bottom,
            rendered at native size (4K-crisp DOM) and scaled ≤1 — fills the
            lower half on arrival, grows to ~fullscreen on scroll. ══════════ */}
        <div
          ref={phoneZoomRef}
          onClick={() => setZoomed(true)}
          title={tr.expand}
          style={{ position:'absolute', left:'50%', top: zoomEnabled ? '56vh' : '6vh', zIndex:1,
            width:'min(520px, 78vw)', aspectRatio:'310 / 660', height:'auto', cursor:'pointer',
            transformOrigin:'top center', willChange:'transform, top', backfaceVisibility:'hidden',
            transform: zoomEnabled ? 'translateX(-50%) translateZ(0) scale(1)' : 'translateX(-50%) scale(0.66)' }}
        >
          {/* Expand hint — top-right corner */}
          <div style={{ position:'absolute', top:16, right:16, zIndex:20,
            width:28, height:28, borderRadius:8, background:'rgba(4,8,15,0.7)',
            backdropFilter:'blur(8px)', border:'1px solid rgba(29,92,255,0.35)',
            display:'flex', alignItems:'center', justifyContent:'center',
            opacity:0.65, pointerEvents:'none' }}>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="rgba(0,207,255,0.9)" strokeWidth="1.8" strokeLinecap="round">
              <path d="M9 1h4v4M5 13H1V9M14 1l-5 5M1 13l5-5"/>
            </svg>
          </div>

          {/* Titanium frame (proportional buttons so it stays right at any size) */}
          <div style={{ position:'absolute', inset:0, borderRadius:'clamp(44px,6vh,56px)',
            background:'linear-gradient(160deg,#2f2f2f 0%,#1a1a1a 30%,#3c3c3c 50%,#1c1c1c 70%,#2d2d2d 100%)',
            boxShadow:'0 0 0 0.5px rgba(255,255,255,0.09) inset, 0 0 0 1px rgba(0,0,0,0.8), 0 48px 90px rgba(0,0,0,0.65), 0 0 40px rgba(29,92,255,0.18)' }}>
            {([
              { s:'left',  t:'15%', h:'3%',   k:'act' },
              { s:'left',  t:'20%', h:'5.5%', k:'vp'  },
              { s:'left',  t:'27%', h:'5.5%', k:'vm'  },
              { s:'right', t:'23%', h:'8%',   k:'pwr' },
            ] as const).map(b => (
              <div key={b.k} style={{ position:'absolute', ...(b.s==='left'?{left:-3}:{right:-3}),
                top:b.t, width:3, height:b.h,
                borderRadius:b.s==='left'?'2px 0 0 2px':'0 2px 2px 0', background:'#2e2e2e' }} />
            ))}
          </div>

          <PhoneScreen {...phoneProps} chatRef={smallChatRef} large />
        </div>

        {/* CTA Telegram — hors du téléphone, apparaît à la fin de l'iPhone (au scroll) */}
        <a
          ref={ctaRef}
          href="https://t.me/Copilo_TaxiBot"
          target="_blank" rel="noopener noreferrer"
          style={{ position:'absolute', bottom:'clamp(20px,4.5vh,40px)', left:'50%', transform:'translateX(-50%)',
            opacity: zoomEnabled ? 0 : 1, transition:'opacity 0.2s linear',
            zIndex:3, display:'inline-flex', alignItems:'center', justifyContent:'center', gap:'clamp(9px,2vw,13px)',
            padding:'clamp(15px,2.2vh,19px) clamp(24px,5vw,40px)', borderRadius:999, whiteSpace:'nowrap', maxWidth:'92vw',
            background:'linear-gradient(135deg,#1d5cff,#00cfff)',
            boxShadow:'0 0 30px rgba(29,92,255,0.6), 0 14px 34px rgba(0,0,0,0.45)',
            color:'#fff', textDecoration:'none',
            fontFamily:"'Barlow Condensed',sans-serif",
            fontWeight:800, fontSize:'clamp(16px,4.4vw,22px)', letterSpacing:'0.06em', textTransform:'uppercase',
            animation:'phoneCtaPulse 2s ease-in-out infinite' }}>
          <TgIcon size={44} /> {tr.ctaInChat}
        </a>

        {/* Scroll hint (fades as you zoom in) */}
        <div ref={hintRef} style={{ position:'absolute', bottom:'clamp(80px,11vh,110px)', left:0, right:0,
          textAlign:'center', zIndex:2, transition:'opacity 0.15s linear', pointerEvents:'none' }}>
          <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:'rgba(180,200,255,0.45)',
            letterSpacing:'0.14em' }}>
            {lang === 'fr' ? 'DÉFILE POUR ZOOMER ↓' : 'SCROLL TO ZOOM ↓'}
          </span>
        </div>
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
function TgIcon({ size = 24 }: { size?: number } = {}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
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
