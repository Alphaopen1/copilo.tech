'use client'
import { useState, useEffect, useRef, useCallback } from 'react'

/* ── Types ──────────────────────────────────────────────────────────── */
type Role  = 'user' | 'bot'
type Phase = 'idle' | 'listening' | 'thinking' | 'chat' | 'form' | 'success'
interface Msg { id: number; role: Role; text: string }

/* ── Translations ───────────────────────────────────────────────────── */
const T = {
  fr: {
    tag: '// VOCAL · TELEGRAM · IA EMBARQUÉE',
    h1a: 'TON IA',
    h1b: 'EMBARQUÉE.',
    sub: 'Push-to-talk. Zéro écoute passive. Courses, CA CPAM, calendrier — tout géré pendant que tu conduis.',
    demo: 'Essaie la démo live ↓',
    micHint: 'Appuie et parle',
    orType: 'ou tape un message…',
    replies: [
      "Bonjour ! Je suis Copilo 🚗 Je gère tes courses, ton CA CPAM, les péages, les doublets et ton calendrier — tout en vocal, tout en sécurité. Qu'est-ce que je peux faire pour toi ?",
      "Super ! Pour débloquer la version complète — 3 mois gratuits sur Telegram — j'ai juste besoin de ton prénom et ton numéro 👇",
    ],
    suggestions: [
      '🎙 Ajoute une course demain 9h',
      '📊 Mon CA cette semaine ?',
      '👥 Cherche des doublets',
    ],
    formTitle: '🚀 Accès prioritaire',
    formSub:   'Pour continuer avec Copilo sur Telegram',
    lName:     'Ton prénom',
    lPhone:    'Ton numéro',
    lCap:      (a: number, b: number) => `Anti-robot : ${a} + ${b} = ?`,
    phName:    'Marc',
    phPhone:   '06 12 34 56 78',
    phCap:     '…',
    submit:    'Ouvrir Copilo sur Telegram →',
    errName:   'Prénom requis (min. 2 car.)',
    errPhone:  'Format invalide — ex: 06 12 34 56 78',
    errCap:    'Réponse incorrecte',
    success:   'Redirection vers Telegram…',
    metrics: [
      { val: '0€',   label: 'pour démarrer' },
      { val: '< 30s',label: 'setup'          },
      { val: '100%', label: 'européen'        },
    ],
  },
  en: {
    tag: '// VOICE · TELEGRAM · ON-BOARD AI',
    h1a: 'YOUR ON-BOARD',
    h1b: 'AI COPILOT.',
    sub: 'Push-to-talk. Zero passive listening. Rides, CPAM revenue, calendar — all managed while you drive.',
    demo: 'Try the live demo ↓',
    micHint: 'Press and speak',
    orType: 'or type a message…',
    replies: [
      "Hi! I'm Copilo 🚗 I handle your rides, CPAM revenue, tolls, shared trips and calendar — all by voice, fully encrypted. What can I do for you?",
      "Great! To unlock the full version — 3 months free on Telegram — I just need your name and phone 👇",
    ],
    suggestions: [
      '🎙 Add a ride tomorrow 9am',
      '📊 My revenue this week?',
      '👥 Find shared rides',
    ],
    formTitle: '🚀 Priority access',
    formSub:   'To continue with Copilo on Telegram',
    lName:     'Your first name',
    lPhone:    'Your phone',
    lCap:      (a: number, b: number) => `Anti-bot: ${a} + ${b} = ?`,
    phName:    'Marc',
    phPhone:   '+33 6 12 34 56 78',
    phCap:     '…',
    submit:    'Open Copilo on Telegram →',
    errName:   'Name required (min 2 chars)',
    errPhone:  'Invalid format — e.g. +33 6 12 34 56 78',
    errCap:    'Wrong answer',
    success:   'Redirecting to Telegram…',
    metrics: [
      { val: '0€',   label: 'to start'   },
      { val: '< 30s',label: 'setup'       },
      { val: '100%', label: 'European'    },
    ],
  },
}

let _id = 0

/* ══════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════ */
export default function Hero({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]

  /* ── Chat state ─────────────────────────────────────────────────── */
  const [msgs,     setMsgs]     = useState<Msg[]>([])
  const [phase,    setPhase]    = useState<Phase>('idle')
  const [botCount, setBotCount] = useState(0)
  const [textIn,   setTextIn]   = useState('')
  const [typing,   setTyping]   = useState(false)

  /* ── Form state ─────────────────────────────────────────────────── */
  const [name,       setName]       = useState('')
  const [phone,      setPhone]      = useState('')
  const [capA]  = useState(() => Math.floor(Math.random() * 8) + 1)
  const [capB]  = useState(() => Math.floor(Math.random() * 8) + 1)
  const [capVal,     setCapVal]     = useState('')
  const [errs,       setErrs]       = useState<Record<string,string>>({})

  const recogRef = useRef<any>(null)
  const chatRef  = useRef<HTMLDivElement>(null)
  const txtRef   = useRef<HTMLInputElement>(null)

  /* Reset on lang change */
  useEffect(() => {
    setMsgs([]); setPhase('idle'); setBotCount(0)
    setTextIn(''); setTyping(false)
  }, [lang])

  const scrollBottom = () =>
    setTimeout(() => { if (chatRef.current) chatRef.current.scrollTop = 9999 }, 60)

  const push = useCallback((role: Role, text: string) => {
    setMsgs(p => [...p, { id: ++_id, role, text }])
    scrollBottom()
  }, [])

  /* ── Bot respond ───────────────────────────────────────────────── */
  const botRespond = useCallback(async () => {
    setTyping(true); setPhase('thinking')
    await new Promise(r => setTimeout(r, 1000 + Math.random() * 700))
    setTyping(false)
    const idx = Math.min(botCount, tr.replies.length - 1)
    push('bot', tr.replies[idx])
    const next = botCount + 1
    setBotCount(next)
    if (next >= 2) { await new Promise(r => setTimeout(r, 400)); setPhase('form') }
    else setPhase('chat')
  }, [botCount, tr.replies, push])

  /* ── Send message ──────────────────────────────────────────────── */
  const send = useCallback(async (text: string) => {
    if (!text.trim() || phase === 'thinking') return
    push('user', text.trim())
    setTextIn('')
    await botRespond()
  }, [phase, push, botRespond])

  /* ── Voice ─────────────────────────────────────────────────────── */
  const toggleVoice = useCallback(() => {
    if (phase === 'listening') {
      recogRef.current?.stop(); setPhase(msgs.length ? 'chat' : 'idle'); return
    }
    const SR = typeof window !== 'undefined'
      ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      : null
    if (!SR) { setPhase('chat'); setTimeout(() => txtRef.current?.focus(), 80); return }

    const r = new SR()
    r.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    r.continuous = false; r.interimResults = false
    r.onstart  = () => setPhase('listening')
    r.onresult = (e: any) => {
      const t = e.results?.[0]?.[0]?.transcript
      if (t) send(t); else setPhase(msgs.length ? 'chat' : 'idle')
    }
    r.onerror = () => setPhase(msgs.length ? 'chat' : 'idle')
    r.onend   = () => { /* phase is stale in closure — rely on onresult/onerror */ }
    r.start(); recogRef.current = r
  }, [phase, lang, msgs.length, send])

  /* ── Form submit ────────────────────────────────────────────────── */
  const validatePhone = (p: string) => {
    const c = p.replace(/[\s\-\.]/g, '')
    return /^(\+33|0033)[67]\d{8}$/.test(c) || /^0[67]\d{8}$/.test(c)
  }

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault()
    const e2: Record<string,string> = {}
    if (name.trim().length < 2)                     e2.name  = tr.errName
    if (!validatePhone(phone))                       e2.phone = tr.errPhone
    if (parseInt(capVal) !== capA + capB)            e2.cap   = tr.errCap
    if (Object.keys(e2).length) { setErrs(e2); return }
    setErrs({}); setPhase('success')
    setTimeout(() => window.open(`https://t.me/Copilo_tech?start=web_${encodeURIComponent(name.trim())}`, '_blank'), 500)
  }

  const listening = phase === 'listening'
  const busy      = phase === 'thinking'
  const showMic   = ['idle','listening','thinking','chat'].includes(phase)

  /* ──────────────────────────────────────────────────────────────────
     RENDER
  ────────────────────────────────────────────────────────────────── */
  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: '80px 0 60px' }}>

      {/* Top glow */}
      <div style={{ position:'absolute', top:'-8%', left:'50%', transform:'translateX(-50%)', width:900, height:500, background:'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(29,92,255,0.42) 0%, rgba(0,207,255,0.1) 40%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:1200, width:'100%', margin:'0 auto', padding:'0 clamp(20px,5vw,60px)', display:'flex', alignItems:'center', gap:'clamp(32px,5vw,72px)', position:'relative', zIndex:1, flexWrap:'wrap' }}>

        {/* ── LEFT: copy ───────────────────────────────────────── */}
        <div style={{ flex:'1 1 300px', minWidth:260 }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:'0.14em', color:'rgba(0,207,255,0.7)', marginBottom:20, textTransform:'uppercase' }}>
            {tr.tag}
          </div>

          <h1 style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, lineHeight:0.92, letterSpacing:'-0.01em', textTransform:'uppercase', fontSize:'clamp(46px,6vw,80px)', marginBottom:20, color:'#f0f4ff' }}>
            {tr.h1a}<br />
            <span style={{ background:'linear-gradient(120deg,#fff 0%,#60a5fa 55%,#00cfff 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              {tr.h1b}
            </span>
          </h1>

          <p style={{ fontSize:15, color:'rgba(180,200,255,0.55)', lineHeight:1.75, fontFamily:"'Barlow',sans-serif", maxWidth:400, marginBottom:32 }}>
            {tr.sub}
          </p>

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

        {/* ── RIGHT: iPhone 17 Pro Max + floating mic ─────────── */}
        <div style={{ flexShrink:0, position:'relative', display:'flex', flexDirection:'column', alignItems:'center', paddingBottom:40 }}>

          {/* Ambient glow behind phone */}
          <div style={{ position:'absolute', inset:-30, background:'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(29,92,255,0.18) 0%, transparent 70%)', borderRadius:'50%', pointerEvents:'none' }} />

          {/* ── iPhone 17 Pro Max shell ── */}
          <div style={{ position:'relative', width:310, height:660, flexShrink:0 }}>

            {/* Black Titanium frame */}
            <div style={{
              position:'absolute', inset:0, borderRadius:52,
              background:'linear-gradient(160deg, #2f2f2f 0%, #1a1a1a 30%, #3c3c3c 50%, #1c1c1c 70%, #2d2d2d 100%)',
              boxShadow:'0 0 0 0.5px rgba(255,255,255,0.09) inset, 0 0 0 1px rgba(0,0,0,0.8), 0 48px 90px rgba(0,0,0,0.65), 0 0 40px rgba(29,92,255,0.12)',
            }}>
              {/* Side buttons */}
              {[{s:'left',  t:100, h:18, label:'action'},
                {s:'left',  t:134, h:34, label:'vol+'},
                {s:'left',  t:178, h:34, label:'vol-'},
                {s:'right', t:152, h:52, label:'power'},
              ].map(b => (
                <div key={b.label} style={{
                  position:'absolute',
                  [b.s === 'left' ? 'left' : 'right']: -3,
                  top: b.t, width:3, height: b.h,
                  borderRadius: b.s === 'left' ? '2px 0 0 2px' : '0 2px 2px 0',
                  background:'#2e2e2e',
                  boxShadow: b.s === 'left' ? '-1px 0 2px rgba(255,255,255,0.04)' : '1px 0 2px rgba(255,255,255,0.04)',
                }} />
              ))}
            </div>

            {/* Screen area */}
            <div style={{ position:'absolute', inset:8, borderRadius:46, background:'#040d17', overflow:'hidden', display:'flex', flexDirection:'column' }}>

              {/* Status bar */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 20px 0', flexShrink:0 }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10.5, fontWeight:600, color:'rgba(255,255,255,0.85)' }}>9:41</span>
                <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <SignalIcon /><WifiIcon /><BatteryIcon />
                </div>
              </div>

              {/* Dynamic Island */}
              <div style={{ width:122, height:34, borderRadius:20, background:'#000', margin:'3px auto 6px', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', gap:10, boxShadow:'0 0 0 0.5px rgba(255,255,255,0.03)' }}>
                <div style={{ width:10, height:10, borderRadius:'50%', background:'#0c0c0c', border:'1px solid rgba(255,255,255,0.07)', boxShadow:'0 0 0 2px rgba(29,92,255,0.15) inset' }} />
                <div style={{ width:3, height:3, borderRadius:'50%', background:'rgba(29,92,255,0.85)' }} />
              </div>

              {/* Chat header */}
              <div style={{ display:'flex', alignItems:'center', gap:10, padding:'6px 14px 10px', borderBottom:'1px solid rgba(255,255,255,0.05)', flexShrink:0 }}>
                <div style={{ width:36, height:36, borderRadius:11, flexShrink:0, background:'linear-gradient(135deg,#1d5cff 0%,#00cfff 100%)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:18, color:'#fff', boxShadow:'0 0 16px rgba(29,92,255,0.5)' }}>C</div>
                <div>
                  <div style={{ fontFamily:"'Barlow',sans-serif", fontWeight:700, fontSize:13, color:'#f0f4ff' }}>Copilo</div>
                  <div style={{ display:'flex', alignItems:'center', gap:4, marginTop:1 }}>
                    <div style={{ width:5, height:5, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 5px #22c55e' }} />
                    <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'rgba(0,207,255,0.65)', letterSpacing:'0.06em' }}>EN LIGNE</span>
                  </div>
                </div>
              </div>

              {/* ── Screen content ── */}
              {phase !== 'form' && phase !== 'success' ? (

                /* CHAT */
                <>
                  <div ref={chatRef} style={{ flex:1, overflowY:'auto', padding:'10px 12px', display:'flex', flexDirection:'column', gap:7, scrollbarWidth:'none' }}>

                    {/* Idle: suggestions */}
                    {msgs.length === 0 && phase === 'idle' && (
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%', gap:14, padding:'0 8px' }}>
                        <div style={{ fontSize:30 }}>🎙️</div>
                        <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12, color:'rgba(180,200,255,0.45)', textAlign:'center', lineHeight:1.6 }}>
                          {tr.micHint}
                        </div>
                        <div style={{ width:'100%', display:'flex', flexDirection:'column', gap:5 }}>
                          {tr.suggestions.map(s => (
                            <button key={s} onClick={() => send(s)} style={{ padding:'7px 10px', borderRadius:10, textAlign:'left', background:'rgba(29,92,255,0.07)', border:'1px solid rgba(29,92,255,0.18)', color:'rgba(180,200,255,0.65)', fontFamily:"'Barlow',sans-serif", fontSize:10.5, cursor:'pointer' }}
                              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(29,92,255,0.16)')}
                              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(29,92,255,0.07)')}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Messages */}
                    {msgs.map(m => (
                      <div key={m.id} style={{ display:'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', animation:'msgIn 0.28s ease forwards' }}>
                        <div style={{ maxWidth:'87%', padding:'8px 12px', borderRadius: m.role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px', background: m.role === 'user' ? 'linear-gradient(135deg,#1d5cff,#1040c0)' : 'rgba(255,255,255,0.06)', border: m.role === 'bot' ? '1px solid rgba(255,255,255,0.06)' : 'none', color:'#f0f4ff', fontSize:11.5, lineHeight:1.6, fontFamily:"'Barlow',sans-serif", boxShadow: m.role === 'user' ? '0 2px 14px rgba(29,92,255,0.25)' : 'none', whiteSpace:'pre-wrap' }}>
                          {m.text}
                        </div>
                      </div>
                    ))}

                    {/* Typing dots */}
                    {typing && (
                      <div style={{ display:'flex', justifyContent:'flex-start' }}>
                        <div style={{ padding:'10px 14px', borderRadius:'4px 14px 14px 14px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.06)', display:'flex', gap:4, alignItems:'center' }}>
                          {[0, 0.2, 0.4].map((d,i) => <span key={i} style={{ width:5, height:5, borderRadius:'50%', background:'rgba(29,92,255,0.8)', display:'inline-block', animation:`blink 1.2s ${d}s ease-in-out infinite` }} />)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Bottom input bar */}
                  <div style={{ display:'flex', alignItems:'center', gap:7, padding:'7px 10px', borderTop:'1px solid rgba(255,255,255,0.05)', background:'rgba(4,8,15,0.92)', flexShrink:0 }}>
                    <input ref={txtRef} type="text" value={textIn} onChange={e => setTextIn(e.target.value)} onKeyDown={e => e.key === 'Enter' && send(textIn)} placeholder={tr.orType} disabled={busy || listening}
                      style={{ flex:1, height:32, borderRadius:16, background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)', padding:'0 11px', color:'#f0f4ff', fontFamily:"'Barlow',sans-serif", fontSize:10.5, outline:'none' }} />
                    {textIn.trim() && (
                      <button onClick={() => send(textIn)} style={{ width:30, height:30, borderRadius:'50%', border:'none', background:'#1d5cff', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexShrink:0 }}>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
                      </button>
                    )}
                  </div>
                </>

              ) : phase === 'form' ? (

                /* FORM */
                <form onSubmit={submitForm} style={{ flex:1, overflowY:'auto', padding:'14px', display:'flex', flexDirection:'column', gap:10, scrollbarWidth:'none', animation:'fadeUp 0.4s ease forwards' }}>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:17, color:'#f0f4ff', textTransform:'uppercase', letterSpacing:'0.03em' }}>{tr.formTitle}</div>
                  <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:11, color:'rgba(180,200,255,0.5)', marginBottom:2 }}>{tr.formSub}</div>

                  {/* Name */}
                  <FormField label={tr.lName} error={errs.name}>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={tr.phName}
                      style={fieldStyle(!!errs.name)} />
                  </FormField>

                  {/* Phone */}
                  <FormField label={tr.lPhone} error={errs.phone}>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder={tr.phPhone}
                      style={fieldStyle(!!errs.phone)} />
                  </FormField>

                  {/* CAPTCHA */}
                  <FormField label={tr.lCap(capA, capB)} error={errs.cap}>
                    <input type="number" value={capVal} onChange={e => setCapVal(e.target.value)} placeholder={tr.phCap}
                      style={{ ...fieldStyle(!!errs.cap), fontFamily:"'DM Mono',monospace" }} />
                  </FormField>

                  {/* Submit */}
                  <button type="submit" style={{ width:'100%', padding:'10px 14px', borderRadius:12, border:'none', background:'#1d5cff', boxShadow:'0 0 0 1px rgba(29,92,255,0.4), 0 0 22px rgba(29,92,255,0.28)', color:'#fff', fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:14, letterSpacing:'0.05em', textTransform:'uppercase', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                    <TgIcon /> {tr.submit}
                  </button>

                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'rgba(180,200,255,0.3)', textAlign:'center', letterSpacing:'0.06em' }}>
                    🔒 Aucune CB · RGPD · Données chiffrées
                  </div>
                </form>

              ) : (

                /* SUCCESS */
                <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:12, animation:'fadeUp 0.4s ease forwards' }}>
                  <div style={{ fontSize:38 }}>🚀</div>
                  <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:16, color:'#f0f4ff', textTransform:'uppercase', textAlign:'center' }}>{tr.success}</div>
                </div>

              )}
            </div>
          </div>

          {/* ── Floating microphone ── */}
          {showMic && (
            <button
              onClick={toggleVoice}
              disabled={busy}
              aria-label={lang === 'fr' ? 'Parler à Copilo' : 'Talk to Copilo'}
              style={{
                position:'absolute', bottom:-26, left:'50%', transform:'translateX(-50%)',
                width:68, height:68, borderRadius:'50%', border:'none',
                background: listening
                  ? 'linear-gradient(135deg,#f97316,#dc2626)'
                  : 'linear-gradient(135deg,#1d5cff,#00cfff)',
                boxShadow: listening
                  ? '0 0 0 1px rgba(249,115,22,0.5), 0 0 40px rgba(249,115,22,0.45)'
                  : '0 0 0 1px rgba(29,92,255,0.5), 0 0 40px rgba(29,92,255,0.4)',
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor: busy ? 'not-allowed' : 'pointer',
                opacity: busy ? 0.45 : 1,
                transition:'background 0.3s, box-shadow 0.3s, transform 0.15s',
                zIndex:10,
              }}
              onMouseEnter={e => { if (!busy) e.currentTarget.style.transform = 'translateX(-50%) scale(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateX(-50%) scale(1)' }}
            >
              {/* Pulse rings */}
              {(listening ? [0,0.4,0.8] : [0,0.7,1.4]).map((d,i) => (
                <span key={i} style={{ position:'absolute', inset:0, borderRadius:'50%', border: `1.5px solid ${listening ? 'rgba(249,115,22,0.45)' : 'rgba(29,92,255,0.38)'}`, animation:`ring 2s ease-out ${d}s infinite` }} />
              ))}
              {/* Mic icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ position:'relative', zIndex:1 }}>
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                <line x1="12" x2="12" y1="19" y2="22"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute', bottom:24, right:'clamp(16px,4vw,40px)', display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
        <div style={{ width:1, height:36, background:'linear-gradient(to bottom, rgba(29,92,255,0.5), transparent)' }} />
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'rgba(180,200,255,0.28)', letterSpacing:'0.12em', writingMode:'vertical-rl' }}>SCROLL</span>
      </div>
    </section>
  )
}

/* ── Helpers ──────────────────────────────────────────────────────── */
function fieldStyle(hasError: boolean): React.CSSProperties {
  return {
    width:'100%', padding:'8px 10px', borderRadius:10,
    background:'rgba(255,255,255,0.05)',
    border:`1px solid ${hasError ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
    color:'#f0f4ff', fontFamily:"'Barlow',sans-serif", fontSize:12,
    outline:'none', boxSizing:'border-box',
  }
}

function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:'rgba(0,207,255,0.7)', letterSpacing:'0.1em', textTransform:'uppercase', display:'block', marginBottom:4 }}>
        {label}
      </label>
      {children}
      {error && <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:10, color:'#ef4444', marginTop:3 }}>{error}</div>}
    </div>
  )
}

/* ── Status bar icons ─────────────────────────────────────────────── */
function SignalIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="rgba(255,255,255,0.75)">
      <rect x="0"   y="7"   width="2.5" height="4"  rx="0.5"/>
      <rect x="3.5" y="4.5" width="2.5" height="6.5"rx="0.5"/>
      <rect x="7"   y="2"   width="2.5" height="9"  rx="0.5"/>
      <rect x="10.5"y="0"   width="2.5" height="11" rx="0.5"/>
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
function TgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}
