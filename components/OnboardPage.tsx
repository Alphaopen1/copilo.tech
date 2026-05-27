'use client'
import { useState } from 'react'

/* ── Types ─────────────────────────────────────────────────────────── */
type CardId = 'bot' | 'group' | 'admin'

interface BotForm   { firstName: string; phone: string }
interface GroupForm  { groupName: string; type: 'private' | 'public'; description: string }
interface AdminForm  { groupHandle: string }

/* ── Inline style helpers ───────────────────────────────────────────── */
const fieldBase: React.CSSProperties = {
  width: '100%',
  padding: '13px 16px',
  borderRadius: 10,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.09)',
  color: '#f0f4ff',
  fontFamily: "'Barlow', sans-serif",
  fontSize: 15,
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

const fieldError: React.CSSProperties = {
  ...fieldBase,
  border: '1px solid rgba(239,68,68,0.5)',
}

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'rgba(0,207,255,0.7)',
      }}>
        {label}
      </label>
      {children}
      {error && (
        <span style={{
          fontFamily: "'Barlow', sans-serif",
          fontSize: 12,
          color: '#ef4444',
        }}>
          {error}
        </span>
      )}
    </div>
  )
}

/* ── Validation helpers ─────────────────────────────────────────────── */
function validatePhone(p: string) {
  const c = p.replace(/[\s\-.()]/g, '')
  return /^(\+33|0033)[1-9]\d{8}$/.test(c) || /^0[1-9]\d{8}$/.test(c)
}

/* ── Main component ─────────────────────────────────────────────────── */
export default function OnboardPage() {
  const [selected, setSelected] = useState<CardId | null>(null)

  /* Bot form state */
  const [bot, setBot]         = useState<BotForm>({ firstName: '', phone: '' })
  const [botErrs, setBotErrs] = useState<Partial<BotForm>>({})
  const [botLoading, setBotLoading] = useState(false)
  const [botResult, setBotResult]   = useState<{ name: string; telegramUrl?: string; message?: string } | null>(null)
  const [botApiError, setBotApiError] = useState(false)

  /* Group form state */
  const [group, setGroup]         = useState<GroupForm>({ groupName: '', type: 'private', description: '' })
  const [groupErrs, setGroupErrs] = useState<Partial<GroupForm>>({})
  const [groupLoading, setGroupLoading] = useState(false)
  const [groupResult, setGroupResult]   = useState<{ inviteLink: string; steps?: string[] } | null>(null)
  const [groupApiError, setGroupApiError] = useState(false)
  const groupInvite = groupResult?.inviteLink ?? null

  /* Admin form state */
  const [admin, setAdmin]         = useState<AdminForm>({ groupHandle: '' })
  const [adminErrs, setAdminErrs] = useState<Partial<AdminForm>>({})
  const [adminLoading, setAdminLoading] = useState(false)
  const [adminResult, setAdminResult]   = useState<{ steps?: string[]; addBotUrl?: string } | null>(null)
  const [adminApiError, setAdminApiError] = useState(false)
  const adminDone = adminResult !== null

  /* ── Bot submit — 100% client-side, zero API ────────────────────── */
  const submitBot = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Partial<BotForm> = {}
    if (bot.firstName.trim().length < 2) errs.firstName = 'Prénom requis (min. 2 caractères)'
    if (!validatePhone(bot.phone))        errs.phone     = 'Format invalide — ex: +33 6 12 34 56 78'
    if (Object.keys(errs).length) { setBotErrs(errs); return }
    setBotErrs({})
    setBotLoading(true)

    const first   = bot.firstName.trim()
    const safe    = first.replace(/[^a-zA-ZÀ-ÿ0-9]/g, '')
    const botName = `Copilo_de_${safe}`
    const payload = btoa(`${first}|${bot.phone.replace(/[\s\-]/g, '')}`).slice(0, 60).replace(/=/g, '')

    setBotResult({
      name:        botName,
      telegramUrl: `https://t.me/Copilo_TaxiBot?start=setup_${payload}`,
      message:     `Ouvre Telegram — @Copilo_TaxiBot va configurer ton bot @${botName} en 2 minutes.`,
    })
    setBotLoading(false)
  }

  /* ── Group submit — 100% client-side, zero API ──────────────────── */
  const submitGroup = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Partial<GroupForm> = {}
    if (group.groupName.trim().length < 3) errs.groupName = 'Nom requis (min. 3 caractères)'
    if (Object.keys(errs).length) { setGroupErrs(errs); return }
    setGroupErrs({})
    setGroupLoading(true)

    const gName   = group.groupName.trim()
    // ?startgroup= ouvre un dialog de sélection de groupe dans Telegram
    // L'utilisateur choisit son groupe existant → le bot rejoint + s'initialise
    const payload = btoa(`g:${gName}`).slice(0, 60).replace(/=/g, '')

    setGroupResult({
      inviteLink: `https://t.me/Copilo_TaxiBot?startgroup=${payload}`,
      steps: [
        `1. Crée d'abord un groupe Telegram nommé "${gName}" (icône crayon → Nouveau groupe)`,
        `2. Clique sur le bouton ci-dessous — Telegram va te demander dans quel groupe ajouter @Copilo_TaxiBot`,
        `3. Sélectionne "${gName}" dans la liste`,
        '4. Une fois ajouté, nomme @Copilo_TaxiBot administrateur (Gérer les messages)',
        '5. Le dispatch de courses s\'active automatiquement ✅',
      ],
    })
    setGroupLoading(false)
  }

  /* ── Admin submit — 100% client-side, zero API ──────────────────── */
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
        '5. Copilo est actif dans ton groupe ✅',
      ],
    })
    setAdminLoading(false)
  }

  /* ── Card data ─────────────────────────────────────────────────── */
  const cards: { id: CardId; icon: string; title: string; sub: string }[] = [
    { id: 'bot',   icon: '🤖', title: 'Mon Copilo perso',   sub: 'Bot @Copilo_de_PRENOM dédié à toi' },
    { id: 'group', icon: '👥', title: 'Groupe / Canal',      sub: 'Copilo dispatche les courses dans ton groupe' },
    { id: 'admin', icon: '➕', title: 'Rejoindre en admin',  sub: 'Invite Copilo dans un groupe existant' },
  ]

  /* ── Shared card style ─────────────────────────────────────────── */
  const cardStyle = (id: CardId): React.CSSProperties => ({
    flex: '1 1 200px',
    minWidth: 180,
    padding: '24px 20px',
    borderRadius: 16,
    background: 'rgba(255,255,255,0.03)',
    border: selected === id
      ? '1px solid rgba(29,92,255,0.5)'
      : '1px solid rgba(255,255,255,0.07)',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
    boxShadow: selected === id ? '0 0 24px rgba(29,92,255,0.12)' : 'none',
    transform: selected === id ? 'translateY(-2px)' : 'none',
  })

  /* ── Error / not-ready banner ────────────────────────────────────── */
  function NotReady() {
    return (
      <div style={{
        padding: '16px 20px',
        borderRadius: 12,
        background: 'rgba(249,115,22,0.07)',
        border: '1px solid rgba(249,115,22,0.25)',
        color: 'rgba(249,115,22,0.9)',
        fontFamily: "'Barlow', sans-serif",
        fontSize: 14,
        lineHeight: 1.5,
      }}>
        ⏳ En cours de déploiement — reviens bientôt.
      </div>
    )
  }

  /* ══════════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════════ */
  return (
    <main style={{
      minHeight: '100vh',
      background: '#04080f',
      padding: '80px clamp(16px,5vw,60px) 120px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Atmospheric glow */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 900,
        height: 500,
        background: 'radial-gradient(ellipse 60% 55% at 50% 0%, rgba(29,92,255,0.35) 0%, rgba(0,207,255,0.08) 40%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: 960,
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* ── Hero section ──────────────────────────────────────────── */}
        <div style={{
          animation: 'fadeUp 0.6s ease forwards',
          marginBottom: 64,
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-block',
            fontFamily: "'DM Mono', monospace",
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(0,207,255,0.7)',
            marginBottom: 20,
          }}>
            // ONBOARDING
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(40px,6vw,72px)',
            lineHeight: 0.95,
            letterSpacing: '-0.01em',
            textTransform: 'uppercase',
            color: '#f0f4ff',
            marginBottom: 20,
          }}>
            Crée ton Copilo{' '}
            <span style={{
              background: 'linear-gradient(120deg,#fff 0%,#60a5fa 55%,#00cfff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              en 2 minutes.
            </span>
          </h1>

          <p style={{
            fontFamily: "'Barlow', sans-serif",
            fontSize: 16,
            color: 'rgba(180,200,255,0.5)',
            lineHeight: 1.7,
            maxWidth: 480,
          }}>
            Choisis comment tu veux utiliser Copilo dans ton activité.
          </p>
        </div>

        {/* ── 3 selector cards ──────────────────────────────────────── */}
        <div style={{
          display: 'flex',
          gap: 16,
          flexWrap: 'wrap',
          marginBottom: 48,
          animation: 'fadeUp 0.7s ease 0.1s forwards',
          opacity: 0,
        }}>
          {cards.map(c => (
            <div
              key={c.id}
              style={cardStyle(c.id)}
              onClick={() => setSelected(selected === c.id ? null : c.id)}
              onMouseEnter={e => {
                if (selected !== c.id) {
                  e.currentTarget.style.borderColor = 'rgba(29,92,255,0.3)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={e => {
                if (selected !== c.id) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                  e.currentTarget.style.transform = 'none'
                }
              }}
            >
              <div style={{ fontSize: 32 }}>{c.icon}</div>
              <div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: '#f0f4ff',
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}>
                  {c.title}
                </div>
                <div style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: 13,
                  color: 'rgba(180,200,255,0.5)',
                  lineHeight: 1.5,
                }}>
                  {c.sub}
                </div>
              </div>
              {selected === c.id && (
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 9,
                  letterSpacing: '0.12em',
                  color: 'rgba(29,92,255,0.85)',
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#1d5cff', display: 'inline-block' }} />
                  Sélectionné
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Forms ─────────────────────────────────────────────────── */}
        {selected && (
          <div style={{
            animation: 'fadeUp 0.45s ease forwards',
            maxWidth: 560,
          }}>

            {/* ── CARTE A : Bot personnel ────────────────────────────── */}
            {selected === 'bot' && (
              <div style={{
                padding: '36px 32px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,207,255,0.7)',
                  marginBottom: 12,
                }}>
                  🤖 // Bot personnel
                </div>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 28,
                  color: '#f0f4ff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em',
                  marginBottom: 24,
                }}>
                  {bot.firstName.trim().length >= 2
                    ? `@Copilo_de_${bot.firstName.trim()}`
                    : '@Copilo_de_PRENOM'}
                </h2>

                {botResult ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div style={{
                      padding: '20px 24px',
                      borderRadius: 14,
                      background: 'rgba(5,150,105,0.08)',
                      border: '1px solid rgba(5,150,105,0.3)',
                      color: '#34d399',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                      letterSpacing: '0.03em',
                    }}>
                      ✅ @{botResult.name} est prêt !
                    </div>
                    {botResult.message && (
                      <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 14, color: 'rgba(180,200,255,0.6)', lineHeight: 1.6, margin: 0 }}>
                        {botResult.message}
                      </p>
                    )}
                    <a
                      href={botResult.telegramUrl ?? `https://t.me/${botResult.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        padding: '14px 28px',
                        borderRadius: 12,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 17,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        textDecoration: 'none',
                      }}
                    >
                      <TgIcon /> Ouvrir sur Telegram →
                    </a>
                  </div>
                ) : botApiError ? (
                  <NotReady />
                ) : (
                  <form onSubmit={submitBot} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <Field label="Ton prénom" error={botErrs.firstName}>
                      <input
                        type="text"
                        value={bot.firstName}
                        onChange={e => setBot(p => ({ ...p, firstName: e.target.value }))}
                        placeholder="Marc"
                        style={botErrs.firstName ? fieldError : fieldBase}
                        onFocus={e => { e.target.style.borderColor = 'rgba(29,92,255,0.5)' }}
                        onBlur={e => { e.target.style.borderColor = botErrs.firstName ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.09)' }}
                      />
                    </Field>
                    <Field label="Numéro Telegram" error={botErrs.phone}>
                      <input
                        type="tel"
                        value={bot.phone}
                        onChange={e => setBot(p => ({ ...p, phone: e.target.value }))}
                        placeholder="+33 6 12 34 56 78"
                        style={botErrs.phone ? fieldError : fieldBase}
                        onFocus={e => { e.target.style.borderColor = 'rgba(29,92,255,0.5)' }}
                        onBlur={e => { e.target.style.borderColor = botErrs.phone ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.09)' }}
                      />
                    </Field>
                    <button
                      type="submit"
                      disabled={botLoading}
                      className="btn-primary"
                      style={{
                        padding: '14px 24px',
                        borderRadius: 12,
                        border: 'none',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 17,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        cursor: botLoading ? 'not-allowed' : 'pointer',
                        opacity: botLoading ? 0.7 : 1,
                      }}
                    >
                      {botLoading ? 'Création…' : 'Créer mon bot →'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ── CARTE B : Groupe / Canal ───────────────────────────── */}
            {selected === 'group' && (
              <div style={{
                padding: '36px 32px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,207,255,0.7)',
                  marginBottom: 12,
                }}>
                  👥 // Groupe / Canal
                </div>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 28,
                  color: '#f0f4ff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em',
                  marginBottom: 24,
                }}>
                  Nouveau groupe Copilo
                </h2>

                {groupResult ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{
                      padding: '20px 24px',
                      borderRadius: 14,
                      background: 'rgba(5,150,105,0.08)',
                      border: '1px solid rgba(5,150,105,0.3)',
                      color: '#34d399',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                    }}>
                      ✅ Groupe configuré !
                    </div>
                    {groupResult.steps && (
                      <div style={{
                        padding: '14px 18px',
                        borderRadius: 10,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}>
                        {groupResult.steps.map((s, i) => (
                          <div key={i} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: 'rgba(180,200,255,0.7)', lineHeight: 1.5 }}>
                            {s}
                          </div>
                        ))}
                      </div>
                    )}
                    <a
                      href={groupResult.inviteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 8,
                        padding: '14px 28px',
                        borderRadius: 12,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 17,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        textDecoration: 'none',
                      }}
                    >
                      <TgIcon /> Ajouter @Copilo_TaxiBot à mon groupe →
                    </a>
                  </div>
                ) : groupApiError ? (
                  <NotReady />
                ) : (
                  <form onSubmit={submitGroup} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <Field label="Nom du groupe" error={groupErrs.groupName}>
                      <input
                        type="text"
                        value={group.groupName}
                        onChange={e => setGroup(p => ({ ...p, groupName: e.target.value }))}
                        placeholder="Taxis Côte d'Azur"
                        style={groupErrs.groupName ? fieldError : fieldBase}
                        onFocus={e => { e.target.style.borderColor = 'rgba(29,92,255,0.5)' }}
                        onBlur={e => { e.target.style.borderColor = groupErrs.groupName ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.09)' }}
                      />
                    </Field>

                    {/* Radio type */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <span style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 10,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(0,207,255,0.7)',
                      }}>
                        Type
                      </span>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {([['private', '🔒 Groupe privé'], ['public', '📢 Canal public']] as const).map(([val, label]) => (
                          <label key={val} style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            padding: '10px 14px',
                            borderRadius: 10,
                            background: group.type === val ? 'rgba(29,92,255,0.12)' : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${group.type === val ? 'rgba(29,92,255,0.45)' : 'rgba(255,255,255,0.09)'}`,
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}>
                            <input
                              type="radio"
                              name="groupType"
                              value={val}
                              checked={group.type === val}
                              onChange={() => setGroup(p => ({ ...p, type: val }))}
                              style={{ accentColor: '#1d5cff' }}
                            />
                            <span style={{
                              fontFamily: "'Barlow', sans-serif",
                              fontSize: 13,
                              color: group.type === val ? '#f0f4ff' : 'rgba(180,200,255,0.5)',
                            }}>
                              {label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Field label="Description (optionnel)">
                      <textarea
                        value={group.description}
                        onChange={e => setGroup(p => ({ ...p, description: e.target.value }))}
                        placeholder="Ex: Groupe de coordination pour les taxis de Nice"
                        rows={3}
                        style={{
                          ...fieldBase,
                          resize: 'vertical',
                          minHeight: 80,
                        }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(29,92,255,0.5)' }}
                        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.09)' }}
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={groupLoading}
                      className="btn-primary"
                      style={{
                        padding: '14px 24px',
                        borderRadius: 12,
                        border: 'none',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 17,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        cursor: groupLoading ? 'not-allowed' : 'pointer',
                        opacity: groupLoading ? 0.7 : 1,
                      }}
                    >
                      {groupLoading ? 'Création…' : 'Créer le groupe →'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ── CARTE C : Admin existant ───────────────────────────── */}
            {selected === 'admin' && (
              <div style={{
                padding: '36px 32px',
                borderRadius: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,207,255,0.7)',
                  marginBottom: 12,
                }}>
                  ➕ // Admin existant
                </div>
                <h2 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 28,
                  color: '#f0f4ff',
                  textTransform: 'uppercase',
                  letterSpacing: '0.01em',
                  marginBottom: 24,
                }}>
                  Rejoindre en admin
                </h2>

                {adminResult ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{
                      padding: '20px 24px',
                      borderRadius: 14,
                      background: 'rgba(5,150,105,0.08)',
                      border: '1px solid rgba(5,150,105,0.3)',
                      color: '#34d399',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: 18,
                    }}>
                      ✅ Suis les étapes ci-dessous
                    </div>
                    {adminResult.steps && (
                      <div style={{
                        padding: '14px 18px',
                        borderRadius: 10,
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 8,
                      }}>
                        {adminResult.steps.map((s, i) => (
                          <div key={i} style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: 'rgba(180,200,255,0.7)', lineHeight: 1.5 }}>
                            {s}
                          </div>
                        ))}
                      </div>
                    )}
                    {adminResult.addBotUrl && (
                      <a
                        href={adminResult.addBotUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 8,
                          padding: '14px 28px',
                          borderRadius: 12,
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                          fontSize: 17,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#fff',
                          textDecoration: 'none',
                        }}
                      >
                        <TgIcon /> Ajouter @Copilo_TaxiBot →
                      </a>
                    )}
                  </div>
                ) : adminApiError ? (
                  <NotReady />
                ) : (
                  <form onSubmit={submitAdmin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <Field label="Groupe Telegram" error={adminErrs.groupHandle}>
                      <input
                        type="text"
                        value={admin.groupHandle}
                        onChange={e => setAdmin({ groupHandle: e.target.value })}
                        placeholder="@MonGroupe ou t.me/MonGroupe"
                        style={adminErrs.groupHandle ? fieldError : fieldBase}
                        onFocus={e => { e.target.style.borderColor = 'rgba(29,92,255,0.5)' }}
                        onBlur={e => { e.target.style.borderColor = adminErrs.groupHandle ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.09)' }}
                      />
                    </Field>

                    {/* Instructions */}
                    <div style={{
                      padding: '16px 18px',
                      borderRadius: 12,
                      background: 'rgba(29,92,255,0.06)',
                      border: '1px solid rgba(29,92,255,0.2)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                    }}>
                      <div style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: 9,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'rgba(0,207,255,0.6)',
                      }}>
                        Instructions
                      </div>
                      <ol style={{
                        paddingLeft: 18,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 6,
                      }}>
                        {[
                          'Ouvre ton groupe Telegram',
                          <>Recherche <strong style={{ color: '#f0f4ff' }}>@Copilo_TaxiBot</strong> et ajoute-le</>,
                          'Donne-lui les droits admin (messages)',
                          'Reviens ici et clique sur le bouton ci-dessous',
                        ].map((step, i) => (
                          <li key={i} style={{
                            fontFamily: "'Barlow', sans-serif",
                            fontSize: 13,
                            color: 'rgba(180,200,255,0.6)',
                            lineHeight: 1.5,
                          }}>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <button
                      type="submit"
                      disabled={adminLoading}
                      className="btn-primary"
                      style={{
                        padding: '14px 24px',
                        borderRadius: 12,
                        border: 'none',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: 17,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: '#fff',
                        cursor: adminLoading ? 'not-allowed' : 'pointer',
                        opacity: adminLoading ? 0.7 : 1,
                      }}
                    >
                      {adminLoading ? 'Vérification…' : "J'ai ajouté Copilo →"}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
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
