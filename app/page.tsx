'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import AvatarSection from '@/components/AvatarSection'
import TelegramSection from '@/components/TelegramSection'
import Waitlist from '@/components/Waitlist'
import Footer from '@/components/Footer'

export default function Home() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')

  return (
    <>
      {/* Fixed stars background */}
      <div className="stars-bg" />

      <Nav lang={lang} setLang={setLang} />

      <main className="relative z-10">
        <Hero lang={lang} />
        <Features lang={lang} />
        <HowItWorks lang={lang} />
        <AvatarSection lang={lang} />
        <TelegramSection lang={lang} />
        <Waitlist lang={lang} />
      </main>

      <Footer lang={lang} />
    </>
  )
}
