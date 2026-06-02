import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/onboard/create-bot
 *
 * Il n'y a qu'un seul bot : @Copilo_TaxiBot.
 * La "personnalisation" vient du profil chauffeur en DB, pas d'un bot dédié.
 *
 * Cet endpoint crée un profil temporaire en DB via le backend,
 * puis retourne le lien vers @Copilo_TaxiBot avec un payload d'onboarding.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { firstName?: string; phone?: string }

    const firstName = (body.firstName ?? '').trim()
    const phone     = (body.phone ?? '').trim()

    if (firstName.length < 2) {
      return NextResponse.json({ error: 'Prénom requis (min. 2 caractères)' }, { status: 400 })
    }
    if (!phone) {
      return NextResponse.json({ error: 'Numéro requis' }, { status: 400 })
    }

    // Proxy vers le backend FastAPI si configuré
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
          return NextResponse.json(await upstream.json())
        }
      } catch {
        // Fallback standalone ci-dessous
      }
    }

    // Fallback : deep-link direct vers @Copilo_TaxiBot
    const payload = Buffer.from(
      JSON.stringify({ f: firstName.slice(0, 20), p: phone.replace(/[\s\-]/g, '') })
    ).toString('base64').slice(0, 64).replace(/=/g, '')

    return NextResponse.json({
      botUsername: 'Copilo_TaxiBot',
      telegramUrl: `https://t.me/Copilo_TaxiBot?start=setup_${payload}`,
      status:      'pending',
      message:     `Ouvre @Copilo_TaxiBot sur Telegram pour finaliser ton inscription.`,
    })
  } catch (err) {
    console.error('[onboard/create-bot]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
