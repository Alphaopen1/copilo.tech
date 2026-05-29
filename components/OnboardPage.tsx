'use client'
import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Nav from '@/components/Nav'
import VideoBanner from '@/components/VideoBanner'
import Footer from '@/components/Footer'

/* ── SVG icons ──────────────────────────────────────────────────────── */
function BotIcon({ color = '#60a5fa', size = 28 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="13" rx="3" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <circle cx="9" cy="14" r="1.5" fill={color} stroke="none" />
      <circle cx="15" cy="14" r="1.5" fill={color} stroke="none" />
      <path d="M12 1v3" />
    </svg>
  )
}
function GroupIcon({ color = '#a78bfa', size = 28 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function PlusCircleIcon({ color = '#34d399', size = 28 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}
function CheckCircleIcon({ color = '#34d399', size = 20 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}
function LockSmIcon({ color = '#94a3b8' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
function BroadcastIcon({ color = '#94a3b8' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8a6 6 0 0 1 0 8" /><path d="M6 8a6 6 0 0 0 0 8" /><circle cx="12" cy="12" r="2" />
      <path d="M21 5a10.5 10.5 0 0 1 0 14" /><path d="M3 5a10.5 10.5 0 0 0 0 14" />
    </svg>
  )
}
function PhoneIcon({ color = '#60a5fa' }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="17" r="1" fill={color} stroke="none" />
    </svg>
  )
}
function KeyIcon({ color = '#60a5fa' }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M21 2l-9.6 9.6" /><path d="M15.5 7.5L17 6l2 2 1.5-1.5" />
    </svg>
  )
}
function TagIcon({ color = '#60a5fa' }: { color?: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  )
}
function ChevronLeftIcon({ color = '#60a5fa' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

/* ── Types ─────────────────────────────────────────────────────────── */
type CardId = 'bot' | 'group' | 'admin'

interface BotForm   { firstName: string; alias: string; phone: string }
interface GroupForm  { groupName: string; type: 'private' | 'public'; description: string }
interface AdminForm  { groupHandle: string }

/* ── Helpers ────────────────────────────────────────────────────────── */
const fieldBase: React.CSSProperties = {
  width: '100%', padding: '13px 16px', borderRadius: 10,
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
  color: '#f0f4ff', fontFamily: "'Barlow', sans-serif", fontSize: 15,
  outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box',
}
const fieldError: React.CSSProperties = { ...fieldBase, border: '1px solid rgba(239,68,68,0.5)' }

function sanitizeSlug(str: string): string {
  return str.trim()
    .replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
}

function validatePhone(p: string) {
  const c = p.replace(/[\s\-.()]/g, '')
  return /^(\+33|0033)[1-9]\d{8}$/.test(c) || /^0[1-9]\d{8}$/.test(c)
}

function Field({ label, error, hint, children }: {
  label: string; error?: string; hint?: string; children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(0,207,255,0.7)' }}>
        {label}
      </label>
      {children}
      {hint && !error && (
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 11, color: 'rgba(180,200,255,0.35)', letterSpacing: '0.02em' }}>
          {hint}
        </span>
      )}
      {error && (
        <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: 12, color: '#ef4444' }}>
          {error}
        </span>
      )}
    </div>
  )
}

/* ── Card config ────────────────────────────────────────────────────── */
const CARDS: { id: CardId; color: string; glow: string; title: string; sub: string }[] = [
  { id: 'bot',   color: '#60a5fa', glow: 'rgba(96,165,250,0.18)',   title: 'Mon Copilo perso',  sub: 'Bot @Copilo_de_PRENOM dédié à toi' },
  { id: 'group', color: '#a78bfa', glow: 'rgba(167,139,250,0.18)',  title: 'Groupe / Canal',     sub: 'Dispatch dans ton groupe Telegram' },
  { id: 'admin', color: '#34d399', glow: 'rgba(52,211,153,0.18)',   title: 'Rejoindre en admin', sub: 'Invite Copilo dans un groupe existant' },
]

function CardIcon({ id, color, size = 28 }: { id: CardId; color: string; size?: number }) {
  if (id === 'bot')   return <BotIcon color={color} size={size} />
  if (id === 'group') return <GroupIcon color={color} size={size} />
  return <PlusCircleIcon color={color} size={size} />
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════ */
export default function OnboardPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const [selected, setSelected] = useState<CardId | null>(null)
  const [fromUrl, setFromUrl] = useState(false)

  /* Auto-select type from URL ?type=bot|group|admin */
  useEffect(() => {
    const t = searchParams.get('type') as CardId | null
    if (t && ['bot', 'group', 'admin'].includes(t)) {
      setSelected(t)
      setFromUrl(true)
    }
  }, [searchParams])

  /* ── Bot state ────────────────────────────────────────────────────── */
  const [bot, setBot]         = useState<BotForm>({ firstName: '', alias: '', phone: '' })
  const [botErrs, setBotErrs] = useState<Partial<BotForm>>({})
  const [botLoading, setBotLoading] = useState(false)
  const [botResult, setBotResult]   = useState<{ name: string; telegramUrl?: string; message?: string } | null>(null)
  const [botApiError] = useState(false)

  /* ── Group state ─────────────────────────────────────────────────── */
  const [group, setGroup]         = useState<GroupForm>({ groupName: '', type: 'private', description: '' })
  const [groupErrs, setGroupErrs] = useState<Partial<GroupForm>>({})
  const [groupLoading, setGroupLoading] = useState(false)
  const [groupResult, setGroupResult]   = useState<{ inviteLink: string } | null>(null)
  const [groupApiError] = useState(false)
  const [wizardStep, setWizardStep] = useState<1|2|3|4>(1)

  /* ── Admin state ─────────────────────────────────────────────────── */
  const [admin, setAdmin]         = useState<AdminForm>({ groupHandle: '' })
  const [adminErrs, setAdminErrs] = useState<Partial<AdminForm>>({})
  const [adminLoading, setAdminLoading] = useState(false)
  const [adminResult, setAdminResult]   = useState<{ steps?: string[]; addBotUrl?: string } | null>(null)
  const [adminApiError] = useState(false)

  /* ── Derived bot name ────────────────────────────────────────────── */
  const safeFirst = sanitizeSlug(bot.firstName)
  const safeAlias = sanitizeSlug(bot.alias)
  const botName   = `Copilo_de_${safeFirst || 'PRENOM'}${safeAlias ? '_' + safeAlias : ''}`
  const nameTooLong = botName.replace('PRENOM', safeFirst || '').length > 32

  /* ── Submits ─────────────────────────────────────────────────────── */
  const submitBot = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Partial<BotForm> = {}
    if (bot.firstName.trim().length < 2) errs.firstName = 'Prénom requis (min. 2 caractères)'
    if (!validatePhone(bot.phone))        errs.phone     = 'Format invalide — ex: +33 6 12 34 56 78'
    if (nameTooLong)                      errs.alias     = `Nom trop long (${botName.length} > 32 caractères) — raccourcis l'alias`
    if (Object.keys(errs).length) { setBotErrs(errs); return }
    setBotErrs({})
    setBotLoading(true)
    const payload = btoa(`${bot.firstName.trim()}|${bot.phone.replace(/[\s\-]/g, '')}`).slice(0, 60).replace(/=/g, '')
    setBotResult({
      name:        botName.replace('PRENOM', safeFirst),
      telegramUrl: `https://t.me/Copilo_TaxiBot?start=setup_${payload}`,
      message:     `Ouvre Telegram — @Copilo_TaxiBot va configurer ton bot @${botName.replace('PRENOM', safeFirst)} en 2 minutes.`,
    })
    setBotLoading(false)
  }

  const submitGroup = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Partial<GroupForm> = {}
    if (group.groupName.trim().length < 3) errs.groupName = 'Nom requis (min. 3 caractères)'
    if (Object.keys(errs).length) { setGroupErrs(errs); return }
    setGroupErrs({})
    setGroupLoading(true)
    const payload = btoa(`g:${group.groupName.trim()}`).slice(0, 60).replace(/=/g, '')
    setGroupResult({ inviteLink: `https://t.me/Copilo_TaxiBot?startgroup=${payload}` })
    setWizardStep(1)
    setGroupLoading(false)
  }

  const submitAdmin = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Partial<AdminForm> = {}
    if (!admin.groupHandle.trim()) errs.groupHandle = 'Renseigne le username ou lien du groupe'
    if (Object.keys(errs).length) { setAdminErrs(errs); return }
    setAdminErrs({})
    setAdminLoading(true)
    const handle  = admin.groupHandle.trim().replace(/^@/, '')
    const payload = btoa(`admin|${handle}`).slice(0, 60).replace(/=/g, '')
    setAdminResult({
      addBotUrl: `https://t.me/Copilo_TaxiBot?start=admin_${payload}`,
      steps: [
        `1. Ouvre ton groupe @${handle} dans Telegram`,
        '2. Paramètres → Administrateurs → Ajouter un admin',
        '3. Recherche @Copilo_TaxiBot et sélectionne-le',
        '4. Active : Gérer les messages + Épingler les messages',
        '5. Copilo est maintenant actif dans ton groupe',
      ],
    })
    setAdminLoading(false)
  }

  /* ── Change type ─────────────────────────────────────────────────── */
  const handleSelectCard = (id: CardId) => {
    if (id === selected) return
    setSelected(id)
    // Reset form states when switching
    setBotResult(null); setBotErrs({})
    setGroupResult(null); setGroupErrs({}); setWizardStep(1)
    setAdminResult(null); setAdminErrs({})
  }

  const handleBack = () => {
    setSelected(null)
    setFromUrl(false)
    router.push('/onboard')
  }

  /* ── NotReady banner ─────────────────────────────────────────────── */
  function NotReady() {
    return (
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'16px 20px', borderRadius:12, background:'rgba(249,115,22,0.07)', border:'1px solid rgba(249,115,22,0.25)', color:'rgba(249,115,22,0.9)', fontFamily:"'Barlow', sans-serif", fontSize:14, lineHeight:1.5 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(249,115,22,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        En cours de déploiement — reviens bientôt.
      </div>
    )
  }

  /* ═══════════════════════════════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════════════════════════════ */
  return (
    <>
      {/* Fixed stars background (FacilPay-style deep-space atmosphere) */}
      <div className="stars-bg" />

      {/* Menu (was missing on /onboard) — hash links resolve back to the homepage */}
      <Nav lang={lang} setLang={setLang} linkPrefix="/" />

      <main style={{ minHeight:'100vh', background:'transparent', padding:'104px clamp(16px,5vw,60px) 120px', position:'relative', overflow:'hidden', zIndex:1 }}>

      {/* Atmospheric glow */}
      <div style={{ position:'absolute', top:'-10%', left:'50%', transform:'translateX(-50%)', width:900, height:500, background:'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(29,92,255,0.35) 0%, rgba(0,207,255,0.08) 40%, transparent 70%)', pointerEvents:'none' }} />

      <div style={{ maxWidth:960, margin:'0 auto', position:'relative', zIndex:1 }}>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <div style={{ animation:'fadeUp 0.6s ease forwards', marginBottom: selected ? 40 : 64 }}>
          <div style={{ fontFamily:"'DM Mono', monospace", fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(0,207,255,0.7)', marginBottom:20 }}>
            // ONBOARDING
          </div>
          <h1 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:800, fontSize:'clamp(40px,6vw,72px)', lineHeight:0.95, letterSpacing:'-0.01em', textTransform:'uppercase', color:'#f0f4ff', marginBottom:16 }}>
            Crée ton Copilo{' '}
            <span style={{ background:'linear-gradient(120deg,#fff 0%,#60a5fa 55%,#00cfff 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              en 2 minutes.
            </span>
          </h1>
          {!selected && (
            <p style={{ fontFamily:"'Barlow', sans-serif", fontSize:16, color:'rgba(180,200,255,0.5)', lineHeight:1.7, maxWidth:480 }}>
              Choisis comment tu veux utiliser Copilo dans ton activité.
            </p>
          )}
        </div>

        {/* ── Type switcher tabs (compact, always visible once selected) */}
        {selected && (
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:36, flexWrap:'wrap' }}>
            {/* Back button */}
            <button
              onClick={handleBack}
              style={{ display:'flex', alignItems:'center', gap:4, padding:'7px 12px', borderRadius:10, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.03)', color:'rgba(180,200,255,0.5)', fontFamily:"'Barlow Condensed', sans-serif", fontSize:13, letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.15s' }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.2)';e.currentTarget.style.color='#f0f4ff'}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='rgba(180,200,255,0.5)'}}
            >
              <ChevronLeftIcon color="currentColor" /> Changer
            </button>

            {/* Type tabs */}
            {CARDS.map(c => (
              <button
                key={c.id}
                onClick={() => handleSelectCard(c.id)}
                style={{ display:'flex', alignItems:'center', gap:6, padding:'7px 14px', borderRadius:10, cursor:'pointer', transition:'all 0.15s', fontFamily:"'Barlow Condensed', sans-serif", fontSize:13, fontWeight:600, letterSpacing:'0.04em', textTransform:'uppercase', border: selected===c.id ? `1px solid ${c.color}55` : '1px solid rgba(255,255,255,0.08)', background: selected===c.id ? `${c.color}18` : 'rgba(255,255,255,0.02)', color: selected===c.id ? c.color : 'rgba(180,200,255,0.4)' }}
              >
                <CardIcon id={c.id} color={selected===c.id ? c.color : 'rgba(180,200,255,0.3)'} size={14} />
                {c.title}
              </button>
            ))}
          </div>
        )}

        {/* ── Full card picker (before any selection) ───────────────── */}
        {!selected && (
          <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:48, animation:'fadeUp 0.7s ease 0.1s forwards', opacity:0 }}>
            {CARDS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => handleSelectCard(c.id)}
                style={{ flex:'1 1 220px', minWidth:200, padding:'28px 22px', borderRadius:18, background:'rgba(255,255,255,0.03)', border:`1px solid rgba(255,255,255,0.07)`, cursor:'pointer', display:'flex', flexDirection:'column', gap:12, textAlign:'left', transition:'border-color 0.2s, transform 0.2s, box-shadow 0.2s', animationDelay:`${i*0.08}s` }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color+'55';e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow=`0 0 28px ${c.glow}`}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.07)';e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none'}}
              >
                <div style={{ width:52, height:52, borderRadius:14, background:c.glow, border:`1px solid ${c.color}33`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <CardIcon id={c.id} color={c.color} size={26} />
                </div>
                <div>
                  <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:18, color:'#f0f4ff', letterSpacing:'0.02em', textTransform:'uppercase', marginBottom:4 }}>
                    {c.title}
                  </div>
                  <div style={{ fontFamily:"'Barlow', sans-serif", fontSize:13, color:'rgba(180,200,255,0.5)', lineHeight:1.5 }}>
                    {c.sub}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── Forms ─────────────────────────────────────────────────── */}
        {selected && (
          <div style={{ animation:'fadeUp 0.35s ease forwards', maxWidth:560 }}>

            {/* ═══ CARTE A : Bot personnel ══════════════════════════ */}
            {selected === 'bot' && (
              <div style={{ padding:'36px 32px', borderRadius:20, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>

                {/* Live name preview */}
                <div style={{ fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(0,207,255,0.7)', marginBottom:8, display:'flex', alignItems:'center', gap:6 }}>
                  <BotIcon color="rgba(0,207,255,0.7)" size={13} /> // Bot personnel
                </div>
                <h2 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:800, fontSize:26, color: nameTooLong ? '#ef4444' : '#f0f4ff', textTransform:'uppercase', letterSpacing:'0.01em', marginBottom:4, wordBreak:'break-all' }}>
                  @{botName}
                </h2>
                <div style={{ fontFamily:"'DM Mono', monospace", fontSize:10, color: nameTooLong ? 'rgba(239,68,68,0.7)' : 'rgba(180,200,255,0.25)', marginBottom:24, letterSpacing:'0.04em' }}>
                  {botName.replace('PRENOM', safeFirst || 'PRENOM').length} / 32 caractères
                </div>

                {botResult ? (
                  <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'20px 24px', borderRadius:14, background:'rgba(5,150,105,0.08)', border:'1px solid rgba(5,150,105,0.3)', color:'#34d399', fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:18, letterSpacing:'0.03em' }}>
                      <CheckCircleIcon size={22} />
                      @{botResult.name} est prêt !
                    </div>
                    {botResult.message && (
                      <p style={{ fontFamily:"'Barlow', sans-serif", fontSize:14, color:'rgba(180,200,255,0.6)', lineHeight:1.6, margin:0 }}>{botResult.message}</p>
                    )}
                    <a href={botResult.telegramUrl ?? `https://t.me/${botResult.name}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, padding:'14px 28px', borderRadius:12, fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:17, letterSpacing:'0.06em', textTransform:'uppercase', color:'#fff', textDecoration:'none' }}>
                      <TgIcon /> Ouvrir sur Telegram →
                    </a>
                  </div>
                ) : botApiError ? <NotReady /> : (
                  <form onSubmit={submitBot} style={{ display:'flex', flexDirection:'column', gap:18 }}>

                    <Field label="Ton prénom" error={botErrs.firstName}>
                      <input type="text" value={bot.firstName} onChange={e=>setBot(p=>({...p,firstName:e.target.value}))} placeholder="Marc" style={botErrs.firstName?fieldError:fieldBase} onFocus={e=>{e.target.style.borderColor='rgba(29,92,255,0.5)'}} onBlur={e=>{e.target.style.borderColor=botErrs.firstName?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.09)'}} />
                    </Field>

                    <Field
                      label="Identifiant taxi (optionnel)"
                      error={botErrs.alias}
                      hint={safeAlias ? `→ @Copilo_de_${safeFirst||'PRENOM'}_${safeAlias}` : 'Ex: Taxi Nice 555 → @Copilo_de_Marc_Taxi_Nice_555'}
                    >
                      <div style={{ position:'relative' }}>
                        <div style={{ position:'absolute', left:14, top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }}>
                          <TagIcon color="rgba(0,207,255,0.4)" />
                        </div>
                        <input
                          type="text" value={bot.alias}
                          onChange={e=>setBot(p=>({...p,alias:e.target.value}))}
                          placeholder="Taxi Nice 555"
                          style={{ ...(botErrs.alias?fieldError:fieldBase), paddingLeft:36 }}
                          onFocus={e=>{e.target.style.borderColor='rgba(29,92,255,0.5)'}}
                          onBlur={e=>{e.target.style.borderColor=botErrs.alias?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.09)'}}
                        />
                      </div>
                    </Field>

                    <Field label="Numéro Telegram" error={botErrs.phone}>
                      <input type="tel" value={bot.phone} onChange={e=>setBot(p=>({...p,phone:e.target.value}))} placeholder="+33 6 12 34 56 78" style={botErrs.phone?fieldError:fieldBase} onFocus={e=>{e.target.style.borderColor='rgba(29,92,255,0.5)'}} onBlur={e=>{e.target.style.borderColor=botErrs.phone?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.09)'}} />
                    </Field>

                    <button type="submit" disabled={botLoading} className="btn-primary" style={{ padding:'14px 24px', borderRadius:12, border:'none', fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:17, letterSpacing:'0.06em', textTransform:'uppercase', color:'#fff', cursor:botLoading?'not-allowed':'pointer', opacity:botLoading?0.7:1 }}>
                      {botLoading ? 'Création…' : 'Créer mon bot →'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ═══ CARTE B : Groupe / Canal ═════════════════════════ */}
            {selected === 'group' && (
              <div style={{ padding:'36px 32px', borderRadius:20, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(0,207,255,0.7)', marginBottom:12 }}>
                  <GroupIcon color="rgba(0,207,255,0.7)" size={14} /> // Groupe / Canal
                </div>
                <h2 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:800, fontSize:28, color:'#f0f4ff', textTransform:'uppercase', letterSpacing:'0.01em', marginBottom:24 }}>
                  Nouveau groupe Copilo
                </h2>

                {groupResult ? (
                  <GroupWizard
                    groupName={group.groupName.trim()}
                    inviteLink={groupResult.inviteLink}
                    step={wizardStep}
                    onStep={setWizardStep}
                  />
                ) : groupApiError ? <NotReady /> : (
                  <form onSubmit={submitGroup} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                    <Field label="Nom du groupe" error={groupErrs.groupName}>
                      <input type="text" value={group.groupName} onChange={e=>setGroup(p=>({...p,groupName:e.target.value}))} placeholder="Taxis Côte d'Azur" style={groupErrs.groupName?fieldError:fieldBase} onFocus={e=>{e.target.style.borderColor='rgba(29,92,255,0.5)'}} onBlur={e=>{e.target.style.borderColor=groupErrs.groupName?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.09)'}} />
                    </Field>

                    {/* Type radio */}
                    <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                      <span style={{ fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(0,207,255,0.7)' }}>Type</span>
                      <div style={{ display:'flex', gap:10 }}>
                        {([['private','Groupe privé',<LockSmIcon key="l" color={group.type==='private'?'#f0f4ff':'rgba(180,200,255,0.5)'} />],['public','Canal public',<BroadcastIcon key="b" color={group.type==='public'?'#f0f4ff':'rgba(180,200,255,0.5)'} />]] as const).map(([val,label,icon])=>(
                          <label key={val} style={{ flex:1, display:'flex', alignItems:'center', gap:8, padding:'10px 14px', borderRadius:10, background:group.type===val?'rgba(29,92,255,0.12)':'rgba(255,255,255,0.03)', border:`1px solid ${group.type===val?'rgba(29,92,255,0.45)':'rgba(255,255,255,0.09)'}`, cursor:'pointer', transition:'all 0.15s' }}>
                            <input type="radio" name="groupType" value={val} checked={group.type===val} onChange={()=>setGroup(p=>({...p,type:val}))} style={{accentColor:'#1d5cff'}} />
                            {icon}
                            <span style={{ fontFamily:"'Barlow', sans-serif", fontSize:13, color:group.type===val?'#f0f4ff':'rgba(180,200,255,0.5)' }}>{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Field label="Description (optionnel)">
                      <textarea value={group.description} onChange={e=>setGroup(p=>({...p,description:e.target.value}))} placeholder="Ex: Groupe de coordination pour les taxis de Nice" rows={3} style={{ ...fieldBase, resize:'vertical', minHeight:80 }} onFocus={e=>{e.target.style.borderColor='rgba(29,92,255,0.5)'}} onBlur={e=>{e.target.style.borderColor='rgba(255,255,255,0.09)'}} />
                    </Field>

                    <button type="submit" disabled={groupLoading} className="btn-primary" style={{ padding:'14px 24px', borderRadius:12, border:'none', fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:17, letterSpacing:'0.06em', textTransform:'uppercase', color:'#fff', cursor:groupLoading?'not-allowed':'pointer', opacity:groupLoading?0.7:1 }}>
                      {groupLoading ? 'Création…' : 'Configurer le groupe →'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ═══ CARTE C : Admin existant ═════════════════════════ */}
            {selected === 'admin' && (
              <div style={{ padding:'36px 32px', borderRadius:20, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, fontFamily:"'DM Mono', monospace", fontSize:10, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(0,207,255,0.7)', marginBottom:12 }}>
                  <PlusCircleIcon color="rgba(0,207,255,0.7)" size={14} /> // Admin existant
                </div>
                <h2 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:800, fontSize:28, color:'#f0f4ff', textTransform:'uppercase', letterSpacing:'0.01em', marginBottom:24 }}>
                  Rejoindre en admin
                </h2>

                {adminResult ? (
                  <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:12, padding:'20px 24px', borderRadius:14, background:'rgba(5,150,105,0.08)', border:'1px solid rgba(5,150,105,0.3)', color:'#34d399', fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:18 }}>
                      <CheckCircleIcon size={22} /> Suis les étapes ci-dessous
                    </div>
                    {adminResult.steps && (
                      <div style={{ padding:'14px 18px', borderRadius:10, background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', display:'flex', flexDirection:'column', gap:8 }}>
                        {adminResult.steps.map((s,i)=>(
                          <div key={i} style={{ fontFamily:"'Barlow', sans-serif", fontSize:13, color:'rgba(180,200,255,0.7)', lineHeight:1.5 }}>{s}</div>
                        ))}
                      </div>
                    )}
                    {adminResult.addBotUrl && (
                      <a href={adminResult.addBotUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, padding:'14px 28px', borderRadius:12, fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:17, letterSpacing:'0.06em', textTransform:'uppercase', color:'#fff', textDecoration:'none' }}>
                        <TgIcon /> Ajouter @Copilo_TaxiBot →
                      </a>
                    )}
                  </div>
                ) : adminApiError ? <NotReady /> : (
                  <form onSubmit={submitAdmin} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                    <Field label="Groupe Telegram" error={adminErrs.groupHandle}>
                      <input type="text" value={admin.groupHandle} onChange={e=>setAdmin({groupHandle:e.target.value})} placeholder="@MonGroupe ou t.me/MonGroupe" style={adminErrs.groupHandle?fieldError:fieldBase} onFocus={e=>{e.target.style.borderColor='rgba(29,92,255,0.5)'}} onBlur={e=>{e.target.style.borderColor=adminErrs.groupHandle?'rgba(239,68,68,0.5)':'rgba(255,255,255,0.09)'}} />
                    </Field>

                    <div style={{ padding:'16px 18px', borderRadius:12, background:'rgba(29,92,255,0.06)', border:'1px solid rgba(29,92,255,0.2)', display:'flex', flexDirection:'column', gap:8 }}>
                      <div style={{ fontFamily:"'DM Mono', monospace", fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', color:'rgba(0,207,255,0.6)' }}>Instructions</div>
                      <ol style={{ paddingLeft:18, display:'flex', flexDirection:'column', gap:6 }}>
                        {['Ouvre ton groupe Telegram', <span key="2">Recherche <strong style={{color:'#f0f4ff'}}>@Copilo_TaxiBot</strong> et ajoute-le</span>, 'Donne-lui les droits admin (messages)', 'Reviens ici et clique sur le bouton ci-dessous'].map((step,i)=>(
                          <li key={i} style={{ fontFamily:"'Barlow', sans-serif", fontSize:13, color:'rgba(180,200,255,0.6)', lineHeight:1.5 }}>{step}</li>
                        ))}
                      </ol>
                    </div>

                    <button type="submit" disabled={adminLoading} className="btn-primary" style={{ padding:'14px 24px', borderRadius:12, border:'none', fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:17, letterSpacing:'0.06em', textTransform:'uppercase', color:'#fff', cursor:adminLoading?'not-allowed':'pointer', opacity:adminLoading?0.7:1 }}>
                      {adminLoading ? 'Vérification…' : "J'ai ajouté Copilo →"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Spin keyframe for SpinnerIcon */}
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </main>

      {/* ── Vidéo de présentation (was missing on /onboard) ── */}
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ maxWidth:960, margin:'0 auto', padding:'0 clamp(16px,5vw,60px) 28px', textAlign:'center' }}>
          <div style={{ fontFamily:"'DM Mono', monospace", fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(0,207,255,0.7)', marginBottom:14 }}>
            // {lang === 'fr' ? 'EN 33 SECONDES' : 'IN 33 SECONDS'}
          </div>
          <h2 style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:800, fontSize:'clamp(30px,4.5vw,48px)', lineHeight:1, letterSpacing:'-0.01em', textTransform:'uppercase', color:'#f0f4ff', margin:0 }}>
            {lang === 'fr' ? 'Vois Copilo en action.' : 'See Copilo in action.'}
          </h2>
        </div>
        <VideoBanner />
      </div>

      <div style={{ position:'relative', zIndex:1 }}>
        <Footer lang={lang} />
      </div>
    </>
  )
}

/* ── Telegram icon ─────────────────────────────────────────────────── */
function TgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

/* ── Group Wizard ──────────────────────────────────────────────────── */
function GroupWizard({ groupName, inviteLink, step, onStep }: {
  groupName: string; inviteLink: string
  step: 1|2|3|4; onStep: (s: 1|2|3|4) => void
}) {
  const steps = [
    {
      num: 1, icon: <PhoneIcon color="#60a5fa" />, title: 'Crée le groupe Telegram',
      desc: <>Dans Telegram : nouvelle conversation → <strong style={{color:'#f0f4ff'}}>Nouveau groupe</strong> → nomme-le <strong style={{color:'#00cfff'}}>&ldquo;{groupName}&rdquo;</strong> et ajoute au moins un contact.</>,
      cta: null as null | { label: string; href: string },
      confirm: 'Groupe créé →',
    },
    {
      num: 2, icon: <BotIcon color="#60a5fa" size={15} />, title: 'Ajoute @Copilo_TaxiBot',
      desc: <>Clique sur le bouton — Telegram affiche tes groupes. Sélectionne <strong style={{color:'#00cfff'}}>&ldquo;{groupName}&rdquo;</strong> et valide.</>,
      cta: { label: 'Ajouter @Copilo_TaxiBot dans mon groupe', href: inviteLink },
      confirm: 'Bot ajouté →',
    },
    {
      num: 3, icon: <KeyIcon color="#60a5fa" />, title: 'Nomme Copilo administrateur',
      desc: <>Dans ton groupe : <strong style={{color:'#f0f4ff'}}>tape sur @Copilo_TaxiBot</strong> → Promouvoir admin → active <strong style={{color:'#f0f4ff'}}>Gérer les messages</strong>. Indispensable pour le dispatch.</>,
      cta: null,
      confirm: 'Admin configuré',
    },
  ]

  if (step === 4) {
    return (
      <div style={{ padding:'32px 24px', borderRadius:14, background:'rgba(5,150,105,0.08)', border:'1px solid rgba(5,150,105,0.35)', display:'flex', flexDirection:'column', gap:14, animation:'fadeUp 0.35s ease forwards' }}>
        <div style={{ width:52, height:52, borderRadius:'50%', background:'rgba(52,211,153,0.15)', border:'1.5px solid rgba(52,211,153,0.4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
          <CheckCircleIcon color="#34d399" size={28} />
        </div>
        <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:800, fontSize:22, color:'#34d399', textTransform:'uppercase', letterSpacing:'0.03em' }}>Groupe prêt !</div>
        <p style={{ fontFamily:"'Barlow', sans-serif", fontSize:14, color:'rgba(180,200,255,0.65)', lineHeight:1.6, margin:0 }}>
          @Copilo_TaxiBot est actif dans <strong style={{color:'#f0f4ff'}}>&ldquo;{groupName}&rdquo;</strong>.<br />Le dispatch de courses s&apos;active automatiquement.
        </p>
      </div>
    )
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
      {/* Progress bar */}
      <div style={{ display:'flex', alignItems:'center', marginBottom:28 }}>
        {[1,2,3].map((n,i) => {
          const done = step > n, active = step === n
          return (
            <div key={n} style={{ display:'flex', alignItems:'center', flex: n < 3 ? 1 : 'none' }}>
              <div style={{ width:32, height:32, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Mono', monospace", fontSize:12, fontWeight:700, background: done?'rgba(52,211,153,0.2)':active?'rgba(29,92,255,0.25)':'rgba(255,255,255,0.04)', border: `1.5px solid ${done?'rgba(52,211,153,0.6)':active?'rgba(29,92,255,0.7)':'rgba(255,255,255,0.1)'}`, color: done?'#34d399':active?'#60a5fa':'rgba(180,200,255,0.3)', transition:'all 0.3s', boxShadow: active?'0 0 14px rgba(29,92,255,0.25)':'none' }}>
                {done ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : n}
              </div>
              {i < 2 && (
                <div style={{ flex:1, height:1.5, margin:'0 4px', background: step>n+1?'rgba(52,211,153,0.4)':step>n?'linear-gradient(to right,rgba(52,211,153,0.4),rgba(29,92,255,0.25))':'rgba(255,255,255,0.07)', transition:'all 0.4s' }} />
              )}
            </div>
          )
        })}
      </div>

      {/* Active step */}
      {steps.filter(s=>s.num===step).map(st=>(
        <div key={st.num} style={{ padding:'24px 22px', borderRadius:14, background:'rgba(29,92,255,0.06)', border:'1px solid rgba(29,92,255,0.22)', display:'flex', flexDirection:'column', gap:16, animation:'fadeUp 0.35s ease forwards' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:32, height:32, borderRadius:10, background:'rgba(96,165,250,0.12)', border:'1px solid rgba(96,165,250,0.25)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {st.icon}
            </div>
            <div style={{ fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:19, color:'#f0f4ff', textTransform:'uppercase', letterSpacing:'0.03em' }}>
              Étape {st.num} — {st.title}
            </div>
          </div>

          <p style={{ fontFamily:"'Barlow', sans-serif", fontSize:13.5, color:'rgba(180,200,255,0.7)', lineHeight:1.65, margin:0 }}>
            {st.desc}
          </p>

          {/* CTA Telegram (step 2) */}
          {st.cta && (
            <a href={st.cta.href} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8, padding:'13px 20px', borderRadius:12, fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:15, letterSpacing:'0.05em', textTransform:'uppercase', color:'#fff', textDecoration:'none' }}>
              <TgIcon /> {st.cta.label}
            </a>
          )}

          {/* Précédent + Confirmer */}
          <div style={{ display:'flex', gap:10 }}>
            {step > 1 && (
              <button
                onClick={() => onStep((step - 1) as 1|2|3|4)}
                style={{ flex:'0 0 auto', display:'flex', alignItems:'center', gap:6, padding:'12px 16px', borderRadius:12, border:'1px solid rgba(255,255,255,0.1)', background:'rgba(255,255,255,0.03)', color:'rgba(180,200,255,0.5)', fontFamily:"'Barlow Condensed', sans-serif", fontWeight:600, fontSize:14, letterSpacing:'0.04em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.2s' }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.2)';e.currentTarget.style.color='#f0f4ff'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';e.currentTarget.style.color='rgba(180,200,255,0.5)'}}
              >
                <ChevronLeftIcon color="currentColor" /> Précédent
              </button>
            )}
            <button
              onClick={() => onStep((step + 1) as 1|2|3|4)}
              style={{ flex:1, padding:'12px 20px', borderRadius:12, border:`1.5px solid ${step===2?'rgba(52,211,153,0.35)':'rgba(29,92,255,0.35)'}`, background:step===2?'rgba(52,211,153,0.06)':'rgba(29,92,255,0.08)', color:step===2?'#34d399':'#60a5fa', fontFamily:"'Barlow Condensed', sans-serif", fontWeight:700, fontSize:15, letterSpacing:'0.05em', textTransform:'uppercase', cursor:'pointer', transition:'all 0.2s' }}
              onMouseEnter={e=>{e.currentTarget.style.opacity='0.85'}}
              onMouseLeave={e=>{e.currentTarget.style.opacity='1'}}
            >
              {st.confirm}
            </button>
          </div>
        </div>
      ))}

      {/* Future steps (collapsed) */}
      {steps.filter(s=>s.num>step).map(st=>(
        <div key={st.num} style={{ padding:'14px 22px', borderRadius:12, background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.05)', marginTop:8, display:'flex', alignItems:'center', gap:10, opacity:0.4 }}>
          <div style={{ width:26, height:26, borderRadius:8, background:'rgba(96,165,250,0.08)', display:'flex', alignItems:'center', justifyContent:'center' }}>{st.icon}</div>
          <div style={{ fontFamily:"'Barlow', sans-serif", fontSize:13, color:'rgba(180,200,255,0.5)' }}>
            <strong style={{color:'rgba(180,200,255,0.6)'}}>Étape {st.num}</strong> — {st.title}
          </div>
        </div>
      ))}
    </div>
  )
}
