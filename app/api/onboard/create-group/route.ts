import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/onboard/create-group
 *
 * Crée un groupe/canal Telegram avec @Copilo_Dispatcher.
 * Actuellement : retourne le lien pour ajouter le bot dispatcher + instructions.
 * Futur : proxy vers le backend FastAPI (copilo_taxi) via NEXT_PUBLIC_API_URL.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      groupName?:   string
      type?:        'private' | 'public'
      description?: string
    }

    const groupName   = (body.groupName ?? '').trim()
    const groupType   = body.type ?? 'private'
    const description = (body.description ?? '').trim()

    if (groupName.length < 3) {
      return NextResponse.json({ error: 'Nom du groupe requis (min. 3 caractères)' }, { status: 400 })
    }

    // Si backend configuré, proxy
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (apiUrl) {
      const upstream = await fetch(`${apiUrl}/api/onboard/create-group`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupName, type: groupType, description }),
        signal: AbortSignal.timeout(8000),
      })
      if (upstream.ok) {
        const data = await upstream.json()
        return NextResponse.json(data)
      }
    }

    // Mode standalone : guide l'utilisateur pour créer le groupe manuellement
    // et y inviter @Copilo_Dispatcher
    const payload = Buffer.from(
      JSON.stringify({ g: groupName.slice(0, 30), t: groupType })
    ).toString('base64').slice(0, 64).replace(/=/g, '')

    return NextResponse.json({
      // Deep-link vers @Copilo_TaxiBot qui orchestre la création de groupe
      inviteLink:  `https://t.me/Copilo_TaxiBot?start=group_${payload}`,
      dispatchBot: 'https://t.me/Copilo_TaxiBot',
      steps: [
        `1. Crée un groupe Telegram nommé "${groupName}"`,
        '2. Invite @Copilo_TaxiBot dans le groupe',
        '3. Nomme @Copilo_TaxiBot administrateur',
        '4. Le dispatch de courses est automatiquement activé',
      ],
      status: 'pending',
    })
  } catch (err) {
    console.error('[onboard/create-group]', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
