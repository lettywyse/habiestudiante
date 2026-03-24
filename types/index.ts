export type Ciudad = 'madrid' | 'barcelona' | 'valencia'
export type TipoHab = 'individual' | 'compartida' | 'estudio'
export type Source = 'badi' | 'uniplaces'
export type ComisionTipo = 'porcentaje' | 'fijo'

export interface Room {
  id: number
  source: Source
  external_id: string
  titulo: string
  descripcion: string | null
  ciudad: Ciudad
  barrio: string | null
  lat: number | null
  lng: number | null
  precio: number
  tipo: TipoHab
  metros: number | null
  bano_privado: boolean
  erasmus_ok: boolean
  disponible_desde: string | null
  url_original: string
  thumbnail_url: string | null
  comision_tipo: ComisionTipo
  comision_valor: number
  activo: boolean
  scraped_at: string
}

export interface Filtros {
  ciudad: Ciudad | 'todas'
  tipo: TipoHab | 'todos'
  src: Source | 'todas'
  precioMax: number
  orden: 'precio_asc' | 'precio_desc' | 'comision'
  erasmus: boolean
}

export interface LeadPayload {
  nombre: string
  email: string
  ciudad: string
  universidad: string
  presupuesto_max: number
  tipo_hab: string
  erasmus: boolean
  room_id?: number
}
