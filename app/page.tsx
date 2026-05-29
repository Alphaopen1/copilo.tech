'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import Waitlist from '@/components/Waitlist'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ProgressBar from '@/components/ProgressBar'
import ScrollReveal from '@/components/ScrollReveal'
import VideoBanner from '@/components/VideoBanner'
import StatBand from '@/components/StatBand'

export default function Home() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')

  return (
    <>
      {/* Global UI enhancements */}
      <CustomCursor />
      <ProgressBar />
      <ScrollReveal />

      {/* Fixed stars background */}
      <div className="stars-bg" />

      <Nav lang={lang} setLang={setLang} />

      <main className="relative z-10">
        <Hero lang={lang} />
        <VideoBanner />
        <Features lang={lang} />
        <HowItWorks lang={lang} />
        <StatBand lang={lang} />
        <Waitlist lang={lang} />
      </main>

      <Footer lang={lang} />
    </>
  )
}
