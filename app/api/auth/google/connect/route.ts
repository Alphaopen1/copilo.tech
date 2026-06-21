import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/auth/google/connect?driver_id=XXX
 * 
 * Redirige vers Google OAuth en utilisant le redirect_uri public.
 * Le backend a déjà généré l'URL avec PKCE.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const driverId = searchParams.get('driver_id')

  if (!driverId) {
    return NextResponse.json({ error: 'driver_id requis' }, { status: 400 })
  }

  // Demande au backend de générer l'URL OAuth avec redirect_uri public
  const backendUrl = process.env.API_URL || 'http://localhost:8000'

  try {
    const response = await fetch(`${backendUrl}/api/auth/google/connect-url?driver_id=${encodeURIComponent(driverId)}`)

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const data = await response.json()
    const authUrl = data.auth_url

    if (!authUrl) {
      throw new Error('No auth_url returned from backend')
    }

    return NextResponse.redirect(authUrl)

  } catch (err) {
    console.error('OAuth connect error:', err)
    return NextResponse.json({ error: 'Impossible de générer le lien OAuth' }, { status: 500 })
  }
}