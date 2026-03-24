import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, email, ciudad, universidad, presupuesto_max, tipo_hab, erasmus, room_id } = body

    if (!email) return NextResponse.json({ error: 'Email requerido' }, { status: 400 })

    console.log('Lead recibido:', { nombre, email, ciudad, universidad, presupuesto_max, tipo_hab, erasmus, room_id })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
