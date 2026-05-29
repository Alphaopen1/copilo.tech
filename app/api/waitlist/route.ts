import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { email, profile } = await req.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 })
    }

    const entry = {
      email: email.trim().toLowerCase(),
      profile: profile || null,
      createdAt: new Date().toISOString(),
      source: req.headers.get('referer') || 'direct',
    }

    /* ── 1. Webhook (Zapier / Make / n8n) ── */
    const webhookUrl = process.env.WAITLIST_WEBHOOK_URL
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      }).catch(() => {/* non-blocking */})
    }

    /* ── 2. Airtable ── */
    const airtableKey    = process.env.AIRTABLE_API_KEY
    const airtableBaseId = process.env.AIRTABLE_BASE_ID
    const airtableTable  = process.env.AIRTABLE_TABLE_NAME || 'Waitlist'
    if (airtableKey && airtableBaseId) {
      await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTable}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: { Email: entry.email, Profil: entry.profile, Date: entry.createdAt } }),
      }).catch(() => {/* non-blocking */})
    }

    /* ── 3. Server log (always) ── */
    console.log('[waitlist]', JSON.stringify(entry))

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[waitlist] error:', err)
    return NextResponse.json({ ok: true }) // ne jamais montrer d'erreur à l'utilisateur
  }
}
