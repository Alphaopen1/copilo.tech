'use client'

const t = {
  fr: {
    badge: 'Personnalisation',
    title: 'Ton Copilo,',
    title2: 'ta personnalité.',
    sub: 'Donne un nom et un look gaming à ton assistant. Chaque Copilo est unique, chiffré, et ne partage jamais tes données avec les autres.',
    avatars: [
      { name: 'Copilo_de_Marc', color: 'from-blue-600 to-cyan-400', emoji: '🚗', role: 'Taxi Paris' },
      { name: 'Copilo_de_Layla', color: 'from-violet-600 to-pink-400', emoji: '🚕', role: 'VTC Lyon' },
      { name: 'Copilo_de_Karim', color: 'from-orange-500 to-amber-400', emoji: '🚐', role: 'Transport médical' },
    ],
    features: [
      { icon: '🎮', label: 'Style gaming unique' },
      { icon: '🔒', label: 'Données isolées' },
      { icon: '📱', label: 'Dispo sur Telegram' },
      { icon: '🌍', label: 'Groupes & canaux' },
    ],
    invite: 'Inviter Copilo dans un groupe',
  },
  en: {
    badge: 'Personalization',
    title: 'Your Copilo,',
    title2: 'your personality.',
    sub: 'Give your assistant a name and a gaming look. Each Copilo is unique, encrypted, and never shares your data with others.',
    avatars: [
      { name: 'Copilo_de_Marc', color: 'from-blue-600 to-cyan-400', emoji: '🚗', role: 'Paris Taxi' },
      { name: 'Copilo_de_Layla', color: 'from-violet-600 to-pink-400', emoji: '🚕', role: 'Lyon VTC' },
      { name: 'Copilo_de_Karim', color: 'from-orange-500 to-amber-400', emoji: '🚐', role: 'Medical Transport' },
    ],
    features: [
      { icon: '🎮', label: 'Unique gaming style' },
      { icon: '🔒', label: 'Isolated data' },
      { icon: '📱', label: 'Available on Telegram' },
      { icon: '🌍', label: 'Groups & channels' },
    ],
    invite: 'Invite Copilo to a group',
  },
}

export default function AvatarSection({ lang }: { lang: 'fr' | 'en' }) {
  const tr = t[lang]
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left: avatar cards */}
        <div className="flex-1 grid grid-cols-1 gap-4 w-full max-w-sm mx-auto lg:mx-0">
          {tr.avatars.map((a, i) => (
            <div key={a.name} className="glass rounded-2xl p-4 flex items-center gap-4 hover:-translate-y-0.5 transition-transform">
              {/* Avatar circle */}
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${a.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                {a.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-bold text-sm truncate">{a.name}</div>
                <div className="text-gray-500 text-xs">{a.role}</div>
              </div>
              {/* Status */}
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}`} />
                <span className={`text-xs ${i === 0 ? 'text-green-400' : 'text-gray-600'}`}>
                  {i === 0 ? 'actif' : 'offline'}
                </span>
              </div>
            </div>
          ))}

          {/* Add new */}
          <div className="glass rounded-2xl p-4 flex items-center gap-4 border-dashed border-white/10 hover:border-white/20 transition-colors cursor-pointer">
            <div className="w-14 h-14 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center text-2xl text-gray-600">
              +
            </div>
            <div>
              <div className="text-gray-400 text-sm font-medium">Créer ton Copilo</div>
              <div className="text-gray-600 text-xs">Personnalise ton assistant</div>
            </div>
          </div>
        </div>

        {/* Right: text */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 mb-6">
            {tr.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            <span className="text-white">{tr.title}</span>
            <br />
            <span className="gt-blue">{tr.title2}</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">{tr.sub}</p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
            {tr.features.map((f) => (
              <div key={f.label} className="glass flex items-center gap-2 px-4 py-2 rounded-full text-sm text-gray-300">
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          <a href="https://t.me/copilo_bot" target="_blank" rel="noopener noreferrer"
             className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold text-white">
            <span>🌍</span>
            {tr.invite}
          </a>
        </div>
      </div>
    </section>
  )
}
