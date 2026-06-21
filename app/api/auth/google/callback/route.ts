import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/auth/google/callback
 * 
 * Reçoit le callback OAuth2 de Google et transmet le code au backend.
 * Google redirige ici après autorisation.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  // Handle OAuth error
  if (error) {
    return NextResponse.redirect('https://copilo.tech/auth/failed?error=' + error)
  }

  if (!code || !state) {
    return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
  }

  // Decode state to get driver_id
  let driverId: string | null = null
  try {
    // State was encoded by frontend during OAuth flow - may not have driver_id
    // The backend will extract it from state
    driverId = null // backend extracts from state
  } catch (e) {
    return NextResponse.json({ error: 'State invalide' }, { status: 400 })
  }

  // Forward to backend via internal API (POST endpoint for frontend callback)
  const backendUrl = process.env.API_URL || 'http://localhost:8000'
  
  try {
    const response = await fetch(`${backendUrl}/api/auth/google/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Callback': 'true',
      },
      body: JSON.stringify({ code, state }),
    })

    if (response.ok) {
      // Success - redirect to Telegram deep link with success message
      const telegramDeepLink = `https://t.me/Copilo_TaxiBot?start=google_calendar_connected`
      return NextResponse.redirect(telegramDeepLink)
    } else {
      const result = await response.json().catch(() => ({}))
      return NextResponse.redirect(`https://copilo.tech/auth/failed?error=${result?.detail || 'auth_failed'}`)
    }
  } catch (err) {
    console.error('OAuth callback forwarding error:', err)
    return NextResponse.redirect('https://copilo.tech/auth/failed?error=backend_unreachable')
  }
}