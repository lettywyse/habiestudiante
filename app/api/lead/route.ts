import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, ciudad, universidad, presupuesto_max, tipo_hab, erasmus, room_id } = body

    if (!email) return NextResponse.json({ error: 'Email requerido' }, { status: 400 })

    await fetch('https://formspree.io/f/xlgpqvzk', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, email, ciudad, universidad, presupuesto_max, tipo_hab, erasmus, room_id }),
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
