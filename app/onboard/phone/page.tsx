'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import OnboardPhone from '@/components/OnboardPhone'

export default function Page() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  return (
    <>
      <div className="stars-bg" />
      <Nav lang={lang} setLang={setLang} linkPrefix="/" />

      <main style={{ minHeight: '100vh', background: 'transparent', position: 'relative', zIndex: 1, padding: '104px clamp(16px,5vw,40px) 100px' }}>
        <div aria-hidden style={{ position: 'absolute', top: '-6%', left: '50%', transform: 'translateX(-50%)', width: 'min(1000px,110vw)', height: 480, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 58% 55% at 50% 0%, rgba(29,92,255,0.32) 0%, rgba(0,207,255,0.1) 40%, transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <OnboardPhone />
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer lang={lang} />
      </div>
    </>
  )
}
