import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/onboard/verify-admin
 *
 * Vérifie que @Copilo_TaxiBot est admin dans le groupe existant.
 * Actuellement : retourne les instructions pour ajouter le bot comme admin.
 * Futur : proxy vers le backend FastAPI (copilo_taxi) via NEXT_PUBLIC_API_URL.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { groupHandle?: string }

    const groupHandle = (body.groupHandle ?? '').trim().replace(/^@/, '')

    if (!groupHandle) {
      return NextResponse.json({ error: 'Username ou lien du groupe requis' }, { status: 400 })
    }

    // Si backend configuré, proxy
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (apiUrl) {
      const upstream = await fetch(`${apiUrl}/api/onboard/verify-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupHandle }),
        signal: AbortSignal.timeout(8000),
      })
      if (upstream.ok) {
        const data = await upstream.json()
        return NextResponse.json(data)
      }
    }

    // Mode standalone : instructions pour l'ajout admin
    const isLink     = groupHandle.startsWith('t.me/') || groupHandle.startsWith('https://')
    const displayRef = isLink ? groupHandle : `@${groupHandle}`

    return NextResponse.json({
      status:      'instructions_sent',
      groupHandle: displayRef,
      addBotUrl:   `https://t.me/Copilo_TaxiBot?start=admin_${groupHandle.slice(0, 40)}`,
      steps: [
        `1. Ouvre ton groupe ${displayRef} dans Telegram`,
        '2. Va dans Paramètres → Administrateurs',
        '3. Ajoute @Copilo_TaxiBot comme administrateur',
        '4. Active : Gérer les messages + Épingler les messages',
        '5. Copilo est maintenant actif dans ton groupe ✅',
      ],
    })
  } catch (err) {
    console.error('[onboard/verify-admin]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
