'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.copilo.fr'
const HCAPTCHA_SITEKEY = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || ''

type Step = 'form' | 'pending_start' | 'code' | 'redirect'

interface InitResponse {
  session_key: string
  sent_via: 'telegram' | 'pending_start'
  start_url?: string
  masked_phone?: string
}

const card: React.CSSProperties = {
  maxWidth: 480, margin: '0 auto', padding: '36px 32px', borderRadius: 18,
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
}
const label: React.CSSProperties = {
  fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: '0.12em',
  textTransform: 'uppercase', color: 'rgba(0,207,255,0.7)', marginBottom: 8, display: 'block',
}
const field: React.CSSProperties = {
  width: '100%', padding: '13px 16px', borderRadius: 10,
  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
  color: '#f0f4ff', fontFamily: "'Barlow',sans-serif", fontSize: 15,
  outline: 'none', boxSizing: 'border-box',
}
const btn: React.CSSProperties = {
  width: '100%', padding: '14px 24px', borderRadius: 12, border: 'none',
  fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 17,
  letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff',
  cursor: 'pointer',
}

export default function OnboardPhone() {
  const [step, setStep] = useState<Step>('form')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [tab, setTab] = useState<'phone' | 'username'>('phone')
  const [captchaToken, setCaptchaToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [session, setSession] = useState<InitResponse | null>(null)
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [redirect, setRedirect] = useState('')
  const [firstName, setFirstName] = useState<string | null>(null)
  const codeRefs = useRef<(HTMLInputElement | null)[]>([])

  // ── Étape 1 : submit init ────────────────────────────────────
  const submitInit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!captchaToken) {
      setError('Confirme le captcha.')
      return
    }
    if (tab === 'phone' && !phone) {
      setError('Indique ton numéro de téléphone.')
      return
    }
    if (tab === 'username' && !username) {
      setError('Indique ton pseudo Telegram.')
      return
    }
    setLoading(true)
    try {
      const r = await fetch(`${API}/api/onboard/init`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: tab === 'phone' ? phone : null,
          username: tab === 'username' ? username : null,
          email: email || null,
          captcha_token: captchaToken,
        }),
      })
      const data = await r.json()
      if (!r.ok) {
        setError(data.detail || 'Erreur. Réessaie.')
      } else {
        setSession(data as InitResponse)
        setStep(data.sent_via === 'telegram' ? 'code' : 'pending_start')
      }
    } catch {
      setError('Erreur réseau.')
    } finally {
      setLoading(false)
    }
  }

  // ── Polling /status pendant pending_start ───────────────────
  useEffect(() => {
    if (step !== 'pending_start' || !session) return
    const interval = setInterval(async () => {
      try {
        const r = await fetch(`${API}/api/onboard/status?session_key=${session.session_key}`)
        const data = await r.json()
        if (data.expired) {
          setError('Session expirée. Recommence.')
          setStep('form')
          clearInterval(interval)
        } else if (data.delivered) {
          setStep('code')
          clearInterval(interval)
        }
      } catch {
        // silence
      }
    }, 2500)
    return () => clearInterval(interval)
  }, [step, session])

  // ── Étape 2 : vérifie le code ───────────────────────────────
  const submitVerify = async () => {
    setError('')
    const c = code.join('')
    if (c.length !== 6 || !session) {
      setError('Saisis les 6 chiffres.')
      return
    }
    setLoading(true)
    try {
      const r = await fetch(`${API}/api/onboard/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_key: session.session_key, code: c }),
      })
      const data = await r.json()
      if (!r.ok) {
        setError(data.detail || 'Code incorrect.')
      } else {
        setRedirect(data.redirect)
        setFirstName(data.first_name || null)
        setStep('redirect')
      }
    } catch {
      setError('Erreur réseau.')
    } finally {
      setLoading(false)
    }
  }

  // ── Auto-jump entre les 6 inputs ────────────────────────────
  const onCodeChange = (i: number, v: string) => {
    const clean = v.replace(/\D/g, '').slice(0, 1)
    const next = [...code]
    next[i] = clean
    setCode(next)
    if (clean && i < 5) codeRefs.current[i + 1]?.focus()
    if (next.every(d => d) && next.join('').length === 6) {
      // auto submit when filled
      setTimeout(() => submitVerify(), 80)
    }
  }
  const onCodePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (text.length === 6) {
      e.preventDefault()
      setCode(text.split(''))
      setTimeout(() => submitVerify(), 80)
    }
  }

  // ── Étape 3 : redirect auto vers Telegram ───────────────────
  useEffect(() => {
    if (step !== 'redirect' || !redirect) return
    const timer = setTimeout(() => {
      window.location.href = redirect
    }, 3000)
    return () => clearTimeout(timer)
  }, [step, redirect])

  return (
    <>
      <Script
        src="https://js.hcaptcha.com/1/api.js"
        async defer
        strategy="afterInteractive"
      />
      <div style={card}>
        {step === 'form' && (
          <>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em', color: 'rgba(0,207,255,0.7)', marginBottom: 16 }}>
              // CRÉE TON COMPTE COPILO
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(28px,4vw,40px)', color: '#f0f4ff', marginBottom: 12 }}>
              Inscription en 30 secondes
            </h1>
            <p style={{ color: 'rgba(180,200,255,0.55)', marginBottom: 24, fontSize: 14 }}>
              Reçois un code de vérification sur Telegram (gratuit, aucun SMS).
            </p>

            {/* Tabs téléphone / pseudo */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              {(['phone', 'username'] as const).map(t => (
                <button key={t} type="button" onClick={() => setTab(t)}
                  style={{
                    flex: 1, padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
                    fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 13,
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    border: '1px solid ' + (tab === t ? 'rgba(29,92,255,0.6)' : 'rgba(255,255,255,0.1)'),
                    background: tab === t ? 'rgba(29,92,255,0.18)' : 'rgba(255,255,255,0.02)',
                    color: tab === t ? '#f0f4ff' : 'rgba(180,200,255,0.5)',
                  }}>
                  {t === 'phone' ? '📱 Téléphone' : '@ Pseudo Telegram'}
                </button>
              ))}
            </div>

            <form onSubmit={submitInit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {tab === 'phone' ? (
                <div>
                  <label style={label}>Numéro de téléphone Telegram</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="+33 6 12 34 56 78" autoComplete="tel" style={field} />
                </div>
              ) : (
                <div>
                  <label style={label}>Pseudo Telegram</label>
                  <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                    placeholder="@TxSaid" autoComplete="username" style={field} />
                </div>
              )}

              <div>
                <label style={label}>Email (optionnel — pour le récap compta)</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="ton@email.pro" autoComplete="email" style={field} />
              </div>

              {/* hCaptcha */}
              <div className="h-captcha"
                data-sitekey={HCAPTCHA_SITEKEY}
                data-theme="dark"
                data-callback="onHCaptchaSuccess"
                style={{ marginTop: 6 }}
              />

              {error && (
                <p role="alert" style={{ color: '#ef4444', fontSize: 13, margin: 0 }}>{error}</p>
              )}

              <button type="submit" disabled={loading} className="btn-primary"
                style={{ ...btn, opacity: loading ? 0.7 : 1, marginTop: 6 }}>
                {loading ? '...' : 'Recevoir mon code Telegram →'}
              </button>
              <p style={{ color: 'rgba(180,200,255,0.4)', fontSize: 11, textAlign: 'center', marginTop: 4 }}>
                100 % gratuit. Pas de spam. RGPD.
              </p>
            </form>

            {/* Callback hCaptcha */}
            <Script id="hcaptcha-callback">{`
              window.onHCaptchaSuccess = function(token) {
                window.__hcaptchaToken = token;
                // Pas idéal mais marche : on déclenche un event que React écoute
                window.dispatchEvent(new CustomEvent('hcaptcha-token', { detail: token }));
              };
            `}</Script>
            <HCaptchaListener onToken={setCaptchaToken} />
          </>
        )}

        {step === 'pending_start' && session?.start_url && (
          <>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em', color: 'rgba(0,207,255,0.7)', marginBottom: 16 }}>
              // ÉTAPE 1/2
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(24px,3.5vw,32px)', color: '#f0f4ff', marginBottom: 16 }}>
              Ouvre Copilo sur Telegram
            </h2>
            <p style={{ color: 'rgba(180,200,255,0.7)', lineHeight: 1.7, marginBottom: 20, fontSize: 14 }}>
              Je dois te connaître pour t'envoyer le code en privé.
              <br />Clique ci-dessous pour ouvrir <strong>@Copilo_TaxiBot</strong> et tape simplement <strong>Démarrer</strong>.
            </p>
            <a href={session.start_url} target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ ...btn, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              📨 Ouvrir Telegram
            </a>
            <p style={{ color: 'rgba(180,200,255,0.4)', fontSize: 12, textAlign: 'center', marginTop: 16 }}>
              <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#00cfff', marginRight: 6, animation: 'blink 1.2s infinite' }} />
              En attente de ton code…
            </p>
          </>
        )}

        {step === 'code' && (
          <>
            <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em', color: 'rgba(0,207,255,0.7)', marginBottom: 16 }}>
              // ÉTAPE 2/2
            </div>
            <h2 className="display" style={{ fontSize: 'clamp(24px,3.5vw,32px)', color: '#f0f4ff', marginBottom: 12 }}>
              Code reçu sur Telegram
            </h2>
            <p style={{ color: 'rgba(180,200,255,0.65)', marginBottom: 24, fontSize: 14 }}>
              Saisis le code à 6 chiffres envoyé par <strong>@Copilo_TaxiBot</strong>.
            </p>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 18 }}>
              {code.map((d, i) => (
                <input key={i}
                  ref={(el) => { codeRefs.current[i] = el }}
                  inputMode="numeric" maxLength={1}
                  value={d}
                  onChange={(e) => onCodeChange(i, e.target.value)}
                  onPaste={onCodePaste}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !code[i] && i > 0) codeRefs.current[i - 1]?.focus()
                  }}
                  style={{
                    width: 46, height: 56, textAlign: 'center', fontSize: 24, fontWeight: 700,
                    borderRadius: 10, background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(29,92,255,0.4)', color: '#f0f4ff', outline: 'none',
                    fontFamily: "'DM Mono',monospace",
                  }} />
              ))}
            </div>

            {error && (
              <p role="alert" style={{ color: '#ef4444', fontSize: 13, marginBottom: 12, textAlign: 'center' }}>{error}</p>
            )}

            <button onClick={submitVerify} disabled={loading} className="btn-primary"
              style={{ ...btn, opacity: loading ? 0.7 : 1 }}>
              {loading ? '...' : 'Vérifier'}
            </button>
            <p style={{ color: 'rgba(180,200,255,0.4)', fontSize: 11, textAlign: 'center', marginTop: 12 }}>
              Code valable 10 min. Pas reçu ? Vérifie ta conversation avec @Copilo_TaxiBot.
            </p>
          </>
        )}

        {step === 'redirect' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>✅</div>
            <h2 className="display" style={{ fontSize: 'clamp(24px,3.5vw,32px)', color: '#f0f4ff', marginBottom: 8 }}>
              Compte créé{firstName ? `, ${firstName}` : ''} !
            </h2>
            <p style={{ color: 'rgba(180,200,255,0.7)', fontSize: 14, marginBottom: 24, lineHeight: 1.7 }}>
              Tu utilises Copilo dans Telegram. Je t'y emmène dans <strong>3 s</strong>…
            </p>
            <a href={redirect}
              className="btn-primary"
              style={{ ...btn, textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              🚀 Y aller maintenant
            </a>
          </div>
        )}
      </div>
    </>
  )
}

/** Listener événement hCaptcha → state React. */
function HCaptchaListener({ onToken }: { onToken: (t: string) => void }) {
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<string>
      if (ce.detail) onToken(ce.detail)
    }
    window.addEventListener('hcaptcha-token', handler)
    return () => window.removeEventListener('hcaptcha-token', handler)
  }, [onToken])
  return null
}
