'use client'

const T = {
  fr: {
    nav: [['#features','Fonctionnalités'],['#how','Comment ça marche'],['#telegram','Telegram'],['#waitlist','Accès']],
    legal: [['#','Mentions légales'],['#','Confidentialité'],['#','CGU']],
    copy: '© 2026 Copilo. Conçu en France.',
    rgpd: 'Chiffrement UE · RGPD · Hébergé en Europe',
    navTitle: 'Navigation', legalTitle: 'Legal',
  },
  en: {
    nav: [['#features','Features'],['#how','How it works'],['#telegram','Telegram'],['#waitlist','Access']],
    legal: [['#','Legal'],['#','Privacy'],['#','Terms']],
    copy: '© 2026 Copilo. Designed in France.',
    rgpd: 'EU Encryption · GDPR · Hosted in Europe',
    navTitle: 'Navigation', legalTitle: 'Legal',
  },
}

export default function Footer({ lang }: { lang: 'fr' | 'en' }) {
  const tr = T[lang]
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '60px 0 40px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(16px,5vw,40px)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div style={{ flex: '0 0 220px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10,
                background: 'linear-gradient(135deg, #1d5cff 0%, #00cfff 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 18, color: '#fff',
                boxShadow: '0 0 16px rgba(29,92,255,0.4)',
              }}>C</div>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 18, color: '#f0f4ff', letterSpacing: '0.04em' }}>
                COPILO<span style={{ color: '#00cfff' }}>.</span>TECH
              </span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(180,200,255,0.35)', lineHeight: 1.7 }}>
              Ton copilote vocal<br />de route.
            </p>
            <a href="https://t.me/Copilo_TaxiBot" target="_blank" rel="noopener noreferrer"
               style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, padding: '8px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', textDecoration: 'none' }}>
              <TgIcon />
              <span className="mono" style={{ fontSize: 11, color: 'rgba(180,200,255,0.6)', letterSpacing: '0.06em' }}>TELEGRAM</span>
            </a>
          </div>

          {/* Nav */}
          <div>
            <p className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(180,200,255,0.3)', marginBottom: 16, textTransform: 'uppercase' }}>{tr.navTitle}</p>
            {tr.nav.map(([h, l]) => (
              <a key={l} href={h} style={{ display: 'block', fontSize: 14, color: 'rgba(180,200,255,0.5)', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                 onMouseEnter={e => (e.currentTarget.style.color = '#f0f4ff')}
                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(180,200,255,0.5)')}>{l}</a>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p className="mono" style={{ fontSize: 11, letterSpacing: '0.1em', color: 'rgba(180,200,255,0.3)', marginBottom: 16, textTransform: 'uppercase' }}>{tr.legalTitle}</p>
            {tr.legal.map(([h, l]) => (
              <a key={l} href={h} style={{ display: 'block', fontSize: 14, color: 'rgba(180,200,255,0.5)', textDecoration: 'none', marginBottom: 10, transition: 'color 0.2s' }}
                 onMouseEnter={e => (e.currentTarget.style.color = '#f0f4ff')}
                 onMouseLeave={e => (e.currentTarget.style.color = 'rgba(180,200,255,0.5)')}>{l}</a>
            ))}
          </div>
        </div>

        <hr className="section-rule" style={{ marginBottom: 28 }} />
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <p className="mono" style={{ fontSize: 12, color: 'rgba(180,200,255,0.25)' }}>{tr.copy}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
            <span className="mono" style={{ fontSize: 11, color: 'rgba(180,200,255,0.3)', letterSpacing: '0.06em' }}>{tr.rgpd}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function TgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(0,207,255,0.7)">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}
