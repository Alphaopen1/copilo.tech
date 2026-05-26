'use client'

const t = {
  fr: {
    badge: 'Comment ça marche',
    title: 'Opérationnel en',
    title2: '3 étapes.',
    steps: [
      {
        num: '01',
        color: 'from-blue-500 to-cyan-400',
        title: 'Démarre sur Telegram',
        desc: 'Lance @Copilo_bot sur Telegram. Présente-toi — Copilo enregistre ton profil chiffré en moins de 30 secondes.',
        detail: 'Aucun formulaire. Aucune carte bancaire. Juste ta voix.',
      },
      {
        num: '02',
        color: 'from-violet-500 to-pink-400',
        title: 'Parle naturellement',
        desc: 'Appuie sur le micro et dis ce que tu veux faire. Créer une course, modifier un détail, connaître ton CA du jour.',
        detail: '"Ajoute une course pour Mme Hamida demain à 9h Nice → Cannes"',
      },
      {
        num: '03',
        color: 'from-cyan-500 to-emerald-400',
        title: 'Copilo gère tout',
        desc: 'Confirmation, calcul du CA CPAM, péages, calendrier, co-passagers, retours — tout est automatique.',
        detail: 'Tu conduis. Copilo s\'occupe du reste.',
      },
    ],
  },
  en: {
    badge: 'How it works',
    title: 'Up and running in',
    title2: '3 steps.',
    steps: [
      {
        num: '01',
        color: 'from-blue-500 to-cyan-400',
        title: 'Start on Telegram',
        desc: 'Launch @Copilo_bot on Telegram. Introduce yourself — Copilo records your encrypted profile in under 30 seconds.',
        detail: 'No form. No credit card. Just your voice.',
      },
      {
        num: '02',
        color: 'from-violet-500 to-pink-400',
        title: 'Speak naturally',
        desc: 'Press the mic and say what you want to do. Create a ride, edit a detail, check today\'s revenue.',
        detail: '"Add a ride for Ms Hamida tomorrow at 9am Nice → Cannes"',
      },
      {
        num: '03',
        color: 'from-cyan-500 to-emerald-400',
        title: 'Copilo handles it all',
        desc: 'Confirmation, CPAM revenue, tolls, calendar, shared rides, return trips — everything is automatic.',
        detail: 'You drive. Copilo takes care of the rest.',
      },
    ],
  },
}

export default function HowItWorks({ lang }: { lang: 'fr' | 'en' }) {
  const tr = t[lang]
  return (
    <section id="how" className="relative py-24 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-violet-400 border border-violet-500/30 bg-violet-500/10 mb-6">
            {tr.badge}
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-white">{tr.title}</span>
            <br />
            <span className="gradient-text-warm">{tr.title2}</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {tr.steps.map((step, i) => (
            <div key={step.num} className="relative">
              {/* Connector line */}
              {i < tr.steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/10 to-transparent -translate-y-1/2 z-0" />
              )}

              <div className="relative z-10">
                {/* Number */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6`}>
                  <span className="text-white font-black text-xl">{step.num}</span>
                </div>

                <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{step.desc}</p>

                {/* Detail bubble */}
                <div className="glass rounded-xl px-4 py-3 text-xs text-gray-300 italic border-l-2 border-blue-500/40">
                  {step.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
