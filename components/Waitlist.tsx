'use client'
import { useState } from 'react'

const T = {
  fr: {
    label: '// ACCÈS ANTICIPÉ',
    title: 'REJOINS LA\nLISTE D\'ATTENTE.',
    sub: 'Beta privée. Inscris-toi pour recevoir ton accès en priorité.',
    ph: 'ton@email.pro',
    cta: 'Rejoindre',
    ok: '🎉 Tu es sur la liste — on te contacte très bientôt.',
    profiles: ['Taxi','VTC','Ambulancier','Commercial','VRP','Livreur'],
    pl: 'Tu es :',
    privacy: 'Pas de spam. RGPD. Désinscription en un clic.',
    count: '+240 pros déjà inscrits',
  },
  en: {
    label: '// EARLY ACCESS',
    title: 'JOIN THE\nWAITLIST.',
    sub: 'Private beta. Sign up to get priority access.',
    ph: 'your@email.pro',
    cta: 'Join',
    ok: '🎉 You\'re on the list — we\'ll be in touch soon.',
    profiles: ['Taxi','VTC','Ambulance','Sales','Field Rep','Delivery'],
    pl: 'You are:',
    privacy: 'No spam. GDPR. Unsubscribe in one click.',
    count: '+240 pros already signed up',
  },
}

export default function Waitlist({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 900))
    setDone(true)
    setLoading(false)
  }

  return (
    <section id="waitlist" style={{ padding: '100px 0' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>

        <div className="mono" style={{ fontSize: 12, letterSpacing: '0.12em', color: 'rgba(0,207,255,0.7)', marginBottom: 16 }}>
          {tr.label}
        </div>
        <h2 className="display" style={{ fontSize: 'clamp(40px,6vw,72px)', color: '#f0f4ff', marginBottom: 16, whiteSpace: 'pre-line' }}>
          {tr.title}
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(180,200,255,0.5)', marginBottom: 40 }}>{tr.sub}</p>

        {done ? (
          <div style={{
            padding: '28px 32px', borderRadius: 16,
            background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.3)',
            color: '#34d399', fontSize: 17, fontWeight: 600,
            fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.03em',
          }}>
            {tr.ok}
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Profile */}
            <div>
              <p className="mono" style={{ fontSize: 11, letterSpacing: '0.08em', color: 'rgba(180,200,255,0.4)', marginBottom: 12, textTransform: 'uppercase' }}>
                {tr.pl}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {tr.profiles.map(p => (
                  <button type="button" key={p} onClick={() => setProfile(p)} style={{
                    padding: '6px 16px', borderRadius: 8, cursor: 'pointer',
                    fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600,
                    fontSize: 14, letterSpacing: '0.04em', textTransform: 'uppercase',
                    border: '1px solid ' + (profile === p ? 'rgba(29,92,255,0.8)' : 'rgba(255,255,255,0.1)'),
                    background: profile === p ? 'rgba(29,92,255,0.2)' : 'rgba(255,255,255,0.03)',
                    color: profile === p ? '#f0f4ff' : 'rgba(180,200,255,0.5)',
                    transition: 'all 0.15s',
                  }}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Email + submit */}
            <div style={{ display: 'flex', gap: 12 }}>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={tr.ph}
                style={{
                  flex: 1, padding: '14px 18px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#f0f4ff', fontSize: 15, outline: 'none',
                  fontFamily: "'Barlow', sans-serif",
                  transition: 'border-color 0.2s',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(29,92,255,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button type="submit" disabled={loading} className="btn-primary"
                style={{
                  padding: '14px 28px', borderRadius: 12,
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700, fontSize: 17, letterSpacing: '0.06em',
                  textTransform: 'uppercase', color: '#fff', cursor: 'pointer',
                  border: 'none', flexShrink: 0,
                  opacity: loading ? 0.7 : 1,
                }}>
                {loading ? '...' : tr.cta}
              </button>
            </div>

            <p className="mono" style={{ fontSize: 11, color: 'rgba(180,200,255,0.3)', letterSpacing: '0.04em' }}>
              {tr.privacy}
            </p>
          </form>
        )}

        {/* Social proof */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 36 }}>
          <div style={{ display: 'flex' }}>
            {['🧑‍✈️','👩‍⚕️','🧔','👩','🧑'].map((e, i) => (
              <div key={i} style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '2px solid rgba(4,8,15,1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, marginLeft: i > 0 ? -8 : 0,
              }}>{e}</div>
            ))}
          </div>
          <span className="mono" style={{ fontSize: 12, color: 'rgba(180,200,255,0.4)' }}>
            <span style={{ color: '#f0f4ff', fontWeight: 500 }}>+240</span> {tr.count.replace('+240 ','').replace('+240 pros ','pros ')}
          </span>
        </div>
      </div>
    </section>
  )
}
