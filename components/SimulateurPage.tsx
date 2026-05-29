'use client'
import { useState } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Simulator from '@/components/Simulator'

export default function SimulateurPage() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  return (
    <>
      <div className="stars-bg" />
      <Nav lang={lang} setLang={setLang} linkPrefix="/" />

      <main style={{ minHeight: '100vh', background: 'transparent', position: 'relative', zIndex: 1, padding: '104px clamp(16px,5vw,40px) 100px' }}>
        {/* Atmospheric glow */}
        <div aria-hidden style={{ position: 'absolute', top: '-6%', left: '50%', transform: 'translateX(-50%)', width: 'min(1100px,120vw)', height: 520, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 58% 55% at 50% 0%, rgba(29,92,255,0.32) 0%, rgba(0,207,255,0.1) 40%, transparent 70%)' }} />

        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="mono" style={{ fontSize: 12, letterSpacing: '0.14em', color: 'rgba(0,207,255,0.7)', marginBottom: 18 }}>
            // OUTIL GRATUIT · CONVENTION 2025
          </div>
          <h1 className="display" style={{ fontSize: 'clamp(36px,6vw,64px)', color: '#f0f4ff', marginBottom: 16, lineHeight: 0.98 }}>
            Simulateur prix taxi : <span className="gt-blue">calcul du tarif d&apos;une course conventionnée</span>
          </h1>
          <p style={{ fontFamily: "'Barlow', sans-serif", fontSize: 17, color: 'rgba(180,200,255,0.7)', lineHeight: 1.7, marginBottom: 36, maxWidth: 620 }}>
            Estime en quelques secondes le montant d&apos;une course de transport assis conventionné (CPAM)
            selon la nouvelle convention-cadre nationale du 13 mai 2025 : forfait, tarif kilométrique
            départemental, majorations et transport partagé.
          </p>

          <Simulator />

          {/* ── Contenu SEO : règles de calcul ───────────────────────── */}
          <section style={{ marginTop: 64, fontFamily: "'Barlow', sans-serif", color: 'rgba(210,224,255,0.82)', lineHeight: 1.75 }}>
            <h2 className="display" style={{ fontSize: 'clamp(26px,4vw,38px)', color: '#f0f4ff', margin: '0 0 18px' }}>
              Comment est calculé le tarif d&apos;une course conventionnée en 2025 ?
            </h2>
            <p style={{ marginBottom: 20 }}>
              Depuis la convention-cadre nationale du 13 mai 2025, le tarif d&apos;un transport assis
              professionnalisé (TAP) en taxi conventionné repose sur une tarification socle commune, à
              laquelle s&apos;ajoutent majorations et suppléments.
            </p>
            {[
              ['Forfait de prise en charge — 13 €', "Inclut les 4 premiers kilomètres parcourus en charge avec le patient. Le tarif kilométrique ne s'applique qu'à partir du 5ᵉ km."],
              ['Forfait « Grande ville » — 15 €', "Ajouté si le patient est pris en charge et/ou déposé à Marseille, Paris, Nice, Toulouse, Lyon, Strasbourg, Montpellier, Rennes, Bordeaux, Lille, Grenoble, Nantes, ou dans les départements 92, 93, 94."],
              ['Tarif kilométrique départemental', "Variable selon le département de l'ADS (plancher national : 1,07 €/km). Appliqué à la distance en charge au-delà des 4 km inclus."],
              ['Majoration hospitalisation à vide', "Le tarif kilométrique est majoré de 25 % si le trajet en charge est inférieur à 50 km, et de 50 % au-delà, lorsque l'aller ou le retour se fait à vide."],
              ['Majoration nuit / week-end / jour férié — +50 %', "Appliquée sur tout le socle entre 20h et 8h, le samedi à partir de 12h, le dimanche et les jours fériés."],
              ['Abattement transport partagé', "−23 % pour 2 patients, −35 % pour 3, −37 % pour 4 et plus. Le transport partagé devient le mode de référence."],
              ['Suppléments', "TPMR +30 €, frais de péage (divisés par le nombre de patients en transport partagé), supplément DROM +3 € en outre-mer."],
            ].map(([t, d]) => (
              <div key={t} style={{ marginBottom: 16 }}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 19, color: '#f0f4ff', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 4 }}>{t}</h3>
                <p style={{ margin: 0, color: 'rgba(190,206,238,0.75)' }}>{d}</p>
              </div>
            ))}
            <p style={{ marginTop: 24, fontSize: 13, color: 'rgba(180,200,255,0.45)' }}>
              Simulateur fourni à titre indicatif. Les montants définitifs peuvent varier selon les accords
              locaux conclus entre les entreprises de taxi et les caisses d&apos;Assurance Maladie.
            </p>
          </section>
        </div>
      </main>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer lang={lang} />
      </div>
    </>
  )
}
