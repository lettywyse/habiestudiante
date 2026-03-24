import { NextRequest, NextResponse } from 'next/server'
import { MOCK_ROOMS } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 })

  const room = MOCK_ROOMS.find(r => r.id === Number(id))
  const url = room?.url_original || 'https://badi.com'

  return NextResponse.redirect(url, { status: 302 })
}
