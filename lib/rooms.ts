import { MOCK_ROOMS, isMockMode, getSupabaseClient } from './supabase'
import type { Room } from '@/types'

export async function getRooms(): Promise<Room[]> {
  if (isMockMode()) return MOCK_ROOMS
  const sb = await getSupabaseClient()
  if (!sb) return MOCK_ROOMS
  const { data, error } = await sb.from('rooms').select('*').eq('activo', true).order('precio', { ascending: true }).limit(200)
  if (error) return MOCK_ROOMS
  return (data as Room[]) || MOCK_ROOMS
}

export function calcComision(room: Room): number {
  if (room.comision_tipo === 'porcentaje') return Math.round(room.precio * room.comision_valor)
  return room.comision_valor
}
