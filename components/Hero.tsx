'use client'

const t = {
  fr: {
    badge: 'Propulsé par l\'IA · 100% européen · RGPD',
    headline1: 'Ton copilote vocal',
    headline2: 'de route.',
    sub: 'L\'assistant intelligent qui écoute, apprend et agit pour toi — pendant que tu conduis. Chiffré en Europe, conçu pour les pros.',
    cta1: 'Rejoindre sur Telegram',
    cta2: 'Liste d\'attente',
    orSay: 'ou dis simplement :',
    voiceCmd: '"Salut Copilo..."',
    stats: [
      { value: '100%', label: 'Chiffré EU' },
      { value: 'RGPD', label: 'Conforme' },
      { value: 'IA', label: 'Propulsé' },
      { value: '24/7', label: 'Disponible' },
    ],
  },
  en: {
    badge: 'Powered by AI · 100% European · GDPR',
    headline1: 'Your intelligent voice',
    headline2: 'road copilot.',
    sub: 'The smart assistant that listens, learns and acts for you — while you drive. Encrypted in Europe, built for professionals.',
    cta1: 'Join on Telegram',
    cta2: 'Join Waitlist',
    orSay: 'or simply say:',
    voiceCmd: '"Hey Copilo..."',
    stats: [
      { value: '100%', label: 'EU Encrypted' },
      { value: 'GDPR', label: 'Compliant' },
      { value: 'AI', label: 'Powered' },
      { value: '24/7', label: 'Available' },
    ],
  },
}

export default function Hero({ lang }: { lang: 'fr' | 'en' }) {
  const tr = t[lang]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Hero glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-violet-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 max-w-6xl w-full mx-auto">
        {/* Left: text */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-cyan-400 mb-8 border border-cyan-500/20">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse-slow" />
            {tr.badge}
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="text-white">{tr.headline1}</span>
            <br />
            <span className="gradient-text">{tr.headline2}</span>
          </h1>

          {/* Sub */}
          <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
            {tr.sub}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
            <a
              href="https://t.me/copilo_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center justify-center gap-3 px-7 py-4 rounded-2xl font-semibold text-white text-base"
            >
              <TelegramIcon />
              {tr.cta1}
            </a>
            <a
              href="#waitlist"
              className="btn-secondary flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-semibold text-white text-base"
            >
              {tr.cta2}
            </a>
          </div>

          {/* Voice hint */}
          <div className="flex items-center gap-3 justify-center lg:justify-start text-gray-500 text-sm">
            <MicIcon />
            <span>{tr.orSay}</span>
            <span className="text-white font-medium italic">{tr.voiceCmd}</span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4 mt-12 pt-10 border-t border-white/5">
            {tr.stats.map((s) => (
              <div key={s.label} className="text-center lg:text-left">
                <div className="text-2xl font-black gradient-text">{s.value}</div>
                <div className="text-xs text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Phone mockup */}
        <div className="flex-shrink-0 relative">
          <PhoneMockup lang={lang} />
        </div>
      </div>
    </section>
  )
}

function PhoneMockup({ lang }: { lang: 'fr' | 'en' }) {
  const messages = lang === 'fr' ? [
    { from: 'user', text: '🎙️ « Ajoute une course demain à 9h pour Mme Dupont, Nice → Cannes »' },
    { from: 'copilo', text: '📅 Nouvelle course\n• Quand : 15/06 à 09:00\n• Client : Mme Dupont\n• Trajet : Nice → Cannes\n• ⏱ 35 min — 33.2 km\n• 💰 CA CPAM : 46.20 €' },
    { from: 'user', text: '✅ Oui' },
    { from: 'copilo', text: '✅ Course #42 créée !\n📅 Ajouté à Google Calendar' },
  ] : [
    { from: 'user', text: '🎙️ "Add a ride tomorrow at 9am for Ms Dupont, Nice → Cannes"' },
    { from: 'copilo', text: '📅 New ride\n• When: Jun 15 at 09:00\n• Client: Ms Dupont\n• Route: Nice → Cannes\n• ⏱ 35 min — 33.2 km\n• 💰 Revenue: €46.20' },
    { from: 'user', text: '✅ Yes' },
    { from: 'copilo', text: '✅ Ride #42 created!\n📅 Added to Google Calendar' },
  ]

  return (
    <div className="relative w-72 h-[580px]">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-[50px] bg-gradient-to-b from-blue-500/20 to-cyan-500/20 blur-2xl scale-110 animate-pulse-slow" />

      {/* Phone shell */}
      <div className="relative w-full h-full rounded-[44px] overflow-hidden border border-white/10 shadow-2xl"
           style={{ background: 'linear-gradient(180deg, #0f1629 0%, #070d1a 100%)' }}>

        {/* Notch */}
        <div className="flex justify-center pt-4 pb-2">
          <div className="w-28 h-7 rounded-full bg-black/60 border border-white/10 flex items-center justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-green-400 font-mono">COPILO ACTIF</span>
          </div>
        </div>

        {/* Chat area */}
        <div className="px-4 py-2 flex flex-col gap-3 overflow-hidden" style={{ height: 'calc(100% - 120px)' }}>
          {/* Copilo header */}
          <div className="flex items-center gap-2 pb-2 border-b border-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-black">C</div>
            <div>
              <div className="text-white text-xs font-semibold">Copilo</div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="text-[9px] text-gray-500">en ligne</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-3 py-2 rounded-2xl text-[10px] leading-relaxed whitespace-pre-line ${
                  m.from === 'user'
                    ? 'bg-blue-600/80 text-white rounded-br-sm'
                    : 'bg-white/5 text-gray-200 border border-white/5 rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/5 px-3 py-2 rounded-2xl rounded-bl-sm flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>

        {/* Bottom mic bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[72px] border-t border-white/5 flex items-center justify-center gap-4 px-4"
             style={{ background: 'rgba(3,7,20,0.95)' }}>
          <div className="flex-1 h-9 rounded-full bg-white/5 border border-white/10 flex items-center px-3">
            <span className="text-[10px] text-gray-600">Message...</span>
          </div>
          <button className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center glow-blue">
            <MicIconSm />
          </button>
        </div>
      </div>

      {/* Floating orbit elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none">
        <div className="orbit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 rounded-full bg-cyan-400/60" />
        </div>
        <div className="orbit-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '-4s' }}>
          <div className="w-2 h-2 rounded-full bg-violet-400/60" />
        </div>
      </div>
    </div>
  )
}

function TelegramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function MicIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  )
}

function MicIconSm() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  )
}
