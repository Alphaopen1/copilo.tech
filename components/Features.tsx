'use client'

const t = {
  fr: {
    badge: 'Fonctionnalités',
    title: 'Tout ce dont tu as besoin,',
    title2: 'rien de superflu.',
    features: [
      {
        icon: '🎙️',
        color: 'from-blue-500 to-cyan-400',
        title: 'Commande Vocale',
        desc: 'Dis "Salut Copilo" et parle naturellement. Copilo comprend le contexte, les corrections, les nuances — même en conduisant.',
      },
      {
        icon: '🔒',
        color: 'from-violet-500 to-purple-400',
        title: 'Chiffrement bout-en-bout',
        desc: 'Toutes tes données sont chiffrées avec HKDF + Fernet. Aucun tiers ne peut lire tes informations. Hébergé en Europe.',
      },
      {
        icon: '📅',
        color: 'from-cyan-500 to-teal-400',
        title: 'Google Calendar Auto',
        desc: 'Chaque course planifiée est automatiquement ajoutée à ton calendrier. Couleur orange pour les courses partagées.',
      },
      {
        icon: '💶',
        color: 'from-emerald-500 to-green-400',
        title: 'CA CPAM Automatique',
        desc: 'Calcul du chiffre d\'affaires CPAM en temps réel selon la convention nationale. Péages appris automatiquement.',
      },
      {
        icon: '👥',
        color: 'from-orange-500 to-amber-400',
        title: 'Courses Partagées',
        desc: 'Détection automatique de deux clients au même créneau. Fusion intelligente avec abattement CPAM -23% par passager.',
      },
      {
        icon: '🧠',
        color: 'from-pink-500 to-rose-400',
        title: 'Mémoire Adaptative',
        desc: 'Copilo apprend tes habitudes : péages récurrents, clients fidèles, horaires préférés. RGPD : effacement sur demande.',
      },
    ],
  },
  en: {
    badge: 'Features',
    title: 'Everything you need,',
    title2: 'nothing you don\'t.',
    features: [
      {
        icon: '🎙️',
        color: 'from-blue-500 to-cyan-400',
        title: 'Voice Commands',
        desc: 'Say "Hey Copilo" and speak naturally. Copilo understands context, corrections, nuances — even while driving.',
      },
      {
        icon: '🔒',
        color: 'from-violet-500 to-purple-400',
        title: 'End-to-End Encryption',
        desc: 'All your data is encrypted with HKDF + Fernet. No third party can read your information. Hosted in Europe.',
      },
      {
        icon: '📅',
        color: 'from-cyan-500 to-teal-400',
        title: 'Auto Google Calendar',
        desc: 'Every scheduled ride is automatically added to your calendar. Orange color for shared rides.',
      },
      {
        icon: '💶',
        color: 'from-emerald-500 to-green-400',
        title: 'Automatic Revenue',
        desc: 'Real-time CPAM revenue calculation per national convention. Tolls learned automatically.',
      },
      {
        icon: '👥',
        color: 'from-orange-500 to-amber-400',
        title: 'Shared Rides',
        desc: 'Auto-detection of two clients at the same time slot. Smart merge with CPAM -23% abatement per passenger.',
      },
      {
        icon: '🧠',
        color: 'from-pink-500 to-rose-400',
        title: 'Adaptive Memory',
        desc: 'Copilo learns your habits: recurring tolls, regular clients, preferred schedules. GDPR: erasure on request.',
      },
    ],
  },
}

export default function Features({ lang }: { lang: 'fr' | 'en' }) {
  const tr = t[lang]
  return (
    <section id="features" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-blue-400 border border-blue-500/30 bg-blue-500/10 mb-6">
            {tr.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-white">{tr.title}</span>
            <br />
            <span className="gradient-text">{tr.title2}</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tr.features.map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 group hover:border-white/15 transition-all hover:-translate-y-1 cursor-default">
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
