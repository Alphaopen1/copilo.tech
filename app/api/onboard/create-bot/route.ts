import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/onboard/create-bot
 *
 * Crée le bot personnel @Copilo_de_PRENOM pour un chauffeur.
 * Actuellement : génère un deep-link Telegram pour initier le setup directement
 *                dans @Copilo_TaxiBot.
 * Futur : proxy vers le backend FastAPI (copilo_taxi) via NEXT_PUBLIC_API_URL.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { firstName?: string; phone?: string }

    const firstName = (body.firstName ?? '').trim()
    const phone     = (body.phone ?? '').trim()

    // Validation minimale
    if (firstName.length < 2) {
      return NextResponse.json({ error: 'Prénom requis (min. 2 caractères)' }, { status: 400 })
    }
    if (!phone) {
      return NextResponse.json({ error: 'Numéro requis' }, { status: 400 })
    }

    // Si un backend externe est configuré, on le proxie
    // API_URL (server-only) prend priorité sur NEXT_PUBLIC_API_URL (build-time)
    const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL
    if (apiUrl) {
      try {
        const upstream = await fetch(`${apiUrl}/api/onboard/create-bot`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, phone }),
          signal: AbortSignal.timeout(8000),
        })
        if (upstream.ok) {
          const data = await upstream.json()
          return NextResponse.json(data)
        }
        console.error('[onboard/create-bot] upstream error', upstream.status)
      } catch (upstreamErr) {
        console.error('[onboard/create-bot] upstream unreachable', upstreamErr)
        // Fallback sur le mode standalone si le backend est temporairement indisponible
      }
    }

    // Mode standalone : génère le deep-link de setup directement vers @Copilo_TaxiBot
    // Le bot Telegram traite le payload start= pour déclencher l'onboarding vocal.
    const safeFirst = firstName.replace(/[^a-zA-ZÀ-ÿ0-9]/g, '')
    const botName   = `Copilo_de_${safeFirst}`

    // Payload encodé en base64 pour le start= Telegram (max 64 chars)
    const payload = Buffer.from(
      JSON.stringify({ f: firstName.slice(0, 20), p: phone.replace(/[\s\-]/g, '') })
    ).toString('base64').slice(0, 64).replace(/=/g, '')

    return NextResponse.json({
      name:        botName,
      telegramUrl: `https://t.me/Copilo_TaxiBot?start=setup_${payload}`,
      status:      'pending',
      message:     `Ton bot @${botName} sera prêt dans 2 minutes — ouvre Telegram pour finaliser.`,
    })
  } catch (err) {
    console.error('[onboard/create-bot]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
