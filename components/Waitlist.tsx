'use client'
import { useState } from 'react'

const t = {
  fr: {
    badge: 'Accès anticipé',
    title: 'Rejoins la liste',
    title2: 'd\'attente.',
    sub: 'Copilo est en beta privée. Inscris-toi pour recevoir ton accès en priorité et façonner le produit avec nous.',
    placeholder: 'Ton adresse email',
    cta: 'Rejoindre la liste',
    success: '🎉 Tu es sur la liste ! On te contacte très bientôt.',
    profiles: [
      'Taxi', 'VTC', 'Ambulancier', 'Commercial', 'VRP', 'Livreur',
    ],
    profileLabel: 'Je suis :',
    privacy: 'Aucun spam. Désinscription en un clic. RGPD.',
  },
  en: {
    badge: 'Early Access',
    title: 'Join the',
    title2: 'waitlist.',
    sub: 'Copilo is in private beta. Sign up to get priority access and help shape the product with us.',
    placeholder: 'Your email address',
    cta: 'Join the waitlist',
    success: '🎉 You\'re on the list! We\'ll be in touch very soon.',
    profiles: [
      'Taxi', 'VTC', 'Ambulance', 'Sales', 'Field Rep', 'Delivery',
    ],
    profileLabel: 'I am a:',
    privacy: 'No spam. Unsubscribe in one click. GDPR compliant.',
  },
}

export default function Waitlist({ lang }: { lang: 'fr' | 'en' }) {
  const tr = t[lang]
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    // TODO: connect to actual backend / Formspree / etc.
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section id="waitlist" className="relative py-24 px-6 overflow-hidden">
      {/* Glow */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[500px] h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-pink-400 border border-pink-500/30 bg-pink-500/10 mb-6">
          {tr.badge}
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
          <span className="text-white">{tr.title}</span>
          <br />
          <span className="gradient-text-warm">{tr.title2}</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10">{tr.sub}</p>

        {submitted ? (
          <div className="glass rounded-2xl p-8 border border-green-500/20 text-green-400 text-lg font-semibold">
            {tr.success}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Profile selector */}
            <div>
              <p className="text-gray-400 text-sm mb-3 text-left">{tr.profileLabel}</p>
              <div className="flex flex-wrap gap-2 justify-start">
                {tr.profiles.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => setProfile(p)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      profile === p
                        ? 'bg-blue-600 text-white border border-blue-500'
                        : 'glass text-gray-400 border border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Email input */}
            <div className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={tr.placeholder}
                className="flex-1 glass rounded-2xl px-5 py-4 text-white placeholder-gray-600 border border-white/10 focus:outline-none focus:border-blue-500/50 transition-colors bg-transparent text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary px-6 py-4 rounded-2xl font-semibold text-white text-sm flex-shrink-0 disabled:opacity-70"
              >
                {loading ? '...' : tr.cta}
              </button>
            </div>

            <p className="text-gray-600 text-xs">{tr.privacy}</p>
          </form>
        )}

        {/* Social proof avatars */}
        <div className="flex items-center justify-center gap-3 mt-10">
          <div className="flex -space-x-2">
            {['🧑‍✈️','👩‍⚕️','🧔','👩','🧑'].map((e, i) => (
              <div key={i} className="w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center text-sm">
                {e}
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            <span className="text-white font-semibold">+240</span> pros sur la liste
          </p>
        </div>
      </div>
    </section>
  )
}
