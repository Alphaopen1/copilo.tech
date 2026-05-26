'use client'

const t = {
  fr: {
    badge: 'Accès instantané',
    title: 'Disponible sur',
    title2: 'Telegram dès maintenant.',
    sub: 'Pas d\'app à télécharger. Pas de compte à créer. Lance @Copilo_bot, présente-toi, et commence à parler. C\'est tout.',
    features: [
      { icon: '💬', label: 'Chat individuel', desc: 'Parle à Copilo en privé, à la voix ou par texte.' },
      { icon: '👥', label: 'Groupes & canaux', desc: 'Invite Copilo dans ton groupe pro pour coordonner l\'équipe.' },
      { icon: '🎙️', label: 'Messages vocaux', desc: 'Envoie un vocal — Copilo transcrit et agit immédiatement.' },
      { icon: '🔔', label: 'Notifications smart', desc: 'Brief du matin à 6h30, rappels avant chaque course.' },
    ],
    cta: 'Démarrer sur Telegram',
    ctaSub: 'Gratuit · Aucune carte requise',
  },
  en: {
    badge: 'Instant access',
    title: 'Available on',
    title2: 'Telegram right now.',
    sub: 'No app to download. No account to create. Launch @Copilo_bot, introduce yourself, and start talking. That\'s it.',
    features: [
      { icon: '💬', label: 'Private chat', desc: 'Talk to Copilo privately, by voice or text.' },
      { icon: '👥', label: 'Groups & channels', desc: 'Invite Copilo to your professional group to coordinate the team.' },
      { icon: '🎙️', label: 'Voice messages', desc: 'Send a voice note — Copilo transcribes and acts immediately.' },
      { icon: '🔔', label: 'Smart notifications', desc: 'Morning brief at 6:30am, reminders before each ride.' },
    ],
    cta: 'Start on Telegram',
    ctaSub: 'Free · No card required',
  },
}

export default function TelegramSection({ lang }: { lang: 'fr' | 'en' }) {
  const tr = t[lang]
  return (
    <section id="telegram" className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-blue-600/8 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-3xl p-10 md:p-16 border border-blue-500/20 relative overflow-hidden">
          {/* Inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
            {/* Left */}
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 border border-blue-500/30 bg-blue-500/10 mb-6">
                {tr.badge}
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                <span className="text-white">{tr.title}</span>
                <br />
                <span className="gradient-text">{tr.title2}</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">{tr.sub}</p>

              <a
                href="https://t.me/copilo_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white text-lg mb-3"
              >
                <TelegramIcon />
                {tr.cta}
              </a>
              <p className="text-gray-600 text-sm">{tr.ctaSub}</p>
            </div>

            {/* Right: features grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {tr.features.map((f) => (
                <div key={f.label} className="bg-white/3 rounded-2xl p-5 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="text-2xl mb-3">{f.icon}</div>
                  <div className="text-white font-semibold text-sm mb-1">{f.label}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TelegramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}
