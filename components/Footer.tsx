'use client'

const t = {
  fr: {
    tagline: 'Ton copilote vocal de route.',
    links: [
      { label: 'Fonctionnalités', href: '#features' },
      { label: 'Comment ça marche', href: '#how' },
      { label: 'Telegram', href: '#telegram' },
      { label: 'Liste d\'attente', href: '#waitlist' },
    ],
    legal: [
      { label: 'Mentions légales', href: '#' },
      { label: 'Politique de confidentialité', href: '#' },
      { label: 'CGU', href: '#' },
    ],
    copyright: '© 2026 Copilo. Fait avec ❤️ en France.',
    rgpd: 'Conforme RGPD · Chiffrement UE · Hébergé en Europe',
  },
  en: {
    tagline: 'Your intelligent voice road copilot.',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how' },
      { label: 'Telegram', href: '#telegram' },
      { label: 'Waitlist', href: '#waitlist' },
    ],
    legal: [
      { label: 'Legal Notice', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
    copyright: '© 2026 Copilo. Made with ❤️ in France.',
    rgpd: 'GDPR Compliant · EU Encryption · Hosted in Europe',
  },
}

export default function Footer({ lang }: { lang: 'fr' | 'en' }) {
  const tr = t[lang]
  return (
    <footer className="relative border-t border-white/5 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          {/* Brand */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-black text-lg">C</div>
              <span className="font-bold text-lg text-white">copilo<span className="text-cyan-400">.</span>tech</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">{tr.tagline}</p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a href="https://t.me/copilo_bot" target="_blank" rel="noopener noreferrer"
                 className="glass w-9 h-9 rounded-full flex items-center justify-center hover:border-blue-500/30 transition-colors">
                <TgIcon />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-4">Navigation</p>
            <div className="flex flex-col gap-3">
              {tr.links.map(l => (
                <a key={l.label} href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">{l.label}</a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <p className="text-gray-600 text-xs uppercase tracking-widest mb-4">Legal</p>
            <div className="flex flex-col gap-3">
              {tr.legal.map(l => (
                <a key={l.label} href={l.href} className="text-gray-400 hover:text-white text-sm transition-colors">{l.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">{tr.copyright}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-gray-600 text-xs">{tr.rgpd}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function TgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#60A5FA">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}
