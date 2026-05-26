'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const t = {
  fr: {
    features: 'Fonctionnalités',
    howItWorks: 'Comment ça marche',
    telegram: 'Telegram',
    waitlist: 'Liste d\'attente',
    cta: 'Commencer',
  },
  en: {
    features: 'Features',
    howItWorks: 'How it works',
    telegram: 'Telegram',
    waitlist: 'Waitlist',
    cta: 'Get Started',
  },
}

export default function Nav({ lang, setLang }: { lang: 'fr' | 'en'; setLang: (l: 'fr' | 'en') => void }) {
  const [open, setOpen] = useState(false)
  const tr = t[lang]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b border-white/5">
      {/* Logo */}
      <a href="#" className="flex items-center gap-2 group">
        <div className="relative w-9 h-9">
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 opacity-90 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 flex items-center justify-center text-white font-black text-lg">C</div>
        </div>
        <span className="font-bold text-lg tracking-tight text-white">copilo<span className="text-cyan-400">.</span>tech</span>
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">{tr.features}</a>
        <a href="#how" className="text-sm text-gray-400 hover:text-white transition-colors">{tr.howItWorks}</a>
        <a href="#telegram" className="text-sm text-gray-400 hover:text-white transition-colors">{tr.telegram}</a>
        <a href="#waitlist" className="text-sm text-gray-400 hover:text-white transition-colors">{tr.waitlist}</a>
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center gap-4">
        {/* Lang toggle */}
        <div className="flex items-center gap-1 text-sm font-medium">
          <button
            onClick={() => setLang('fr')}
            className={`px-2 py-1 rounded transition-colors ${lang === 'fr' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            FR
          </button>
          <span className="text-gray-700">|</span>
          <button
            onClick={() => setLang('en')}
            className={`px-2 py-1 rounded transition-colors ${lang === 'en' ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            EN
          </button>
        </div>
        <a
          href="#waitlist"
          className="btn-primary px-5 py-2 rounded-full text-sm font-semibold text-white"
        >
          {tr.cta}
        </a>
      </div>

      {/* Mobile hamburger */}
      <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setOpen(!open)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-full left-0 right-0 glass border-t border-white/5 p-6 flex flex-col gap-4 md:hidden">
          {[['#features', tr.features], ['#how', tr.howItWorks], ['#telegram', tr.telegram], ['#waitlist', tr.waitlist]].map(([href, label]) => (
            <a key={href} href={href} className="text-gray-300 hover:text-white transition-colors" onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
          <div className="flex gap-2 mt-2">
            <button onClick={() => setLang('fr')} className={`text-sm font-medium ${lang === 'fr' ? 'text-white' : 'text-gray-500'}`}>FR</button>
            <span className="text-gray-700">|</span>
            <button onClick={() => setLang('en')} className={`text-sm font-medium ${lang === 'en' ? 'text-white' : 'text-gray-500'}`}>EN</button>
          </div>
        </div>
      )}
    </nav>
  )
}
