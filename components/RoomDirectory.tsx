'use client'
import { useState, useMemo } from 'react'
import type { Room, Filtros } from '@/types'
import RoomCard from './RoomCard'
import { calcComision } from '@/lib/rooms'
const CIUDADES = ['todas','madrid','barcelona','valencia'] as const
const TIPOS    = ['todos','individual','compartida','estudio'] as const
const SOURCES  = ['todas','badi','uniplaces'] as const
const CIUDAD_LABEL: Record<string,string> = {todas:'Todas',madrid:'Madrid',barcelona:'Barcelona',valencia:'Valencia'}
function Chip({label,active,onClick}:{label:string;active:boolean;onClick:()=>void}) {
  return <button onClick={onClick} className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-100 ${active?'bg-gray-900 text-white border-gray-900':'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}>{label}</button>
}
export default function RoomDirectory({rooms}:{rooms:Room[]}) {
  const [filtros, setFiltros] = useState<Filtros>({ciudad:'todas',tipo:'todos',src:'todas',precioMax:700,orden:'precio_asc',erasmus:false})
  const visible = useMemo(()=>{
    let r = rooms.filter(room=>
      (filtros.ciudad==='todas'||room.ciudad===filtros.ciudad)&&
      (filtros.tipo==='todos'||room.tipo===filtros.tipo)&&
      (filtros.src==='todas'||room.source===filtros.src)&&
      room.precio<=filtros.precioMax&&
      (!filtros.erasmus||room.erasmus_ok)
    )
    if(filtros.orden==='precio_asc')  r.sort((a,b)=>a.precio-b.precio)
    if(filtros.orden==='precio_desc') r.sort((a,b)=>b.precio-a.precio)
    if(filtros.orden==='comision')    r.sort((a,b)=>calcComision(b)-calcComision(a))
    return r
  },[rooms,filtros])
  const avgPrecio = visible.length ? Math.round(visible.reduce((s,r)=>s+r.precio,0)/visible.length) : 0
  const set = (key:keyof Filtros)=>(val:unknown)=>setFiltros(f=>({...f,[key]:val}))
  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mb-8">
        {[{n:visible.length,l:'habitaciones'},{n:`€${avgPrecio}`,l:'precio medio'},{n:visible.filter(r=>r.source==='badi').length,l:'de Badi'},{n:visible.filter(r=>r.source==='uniplaces').length,l:'de Uniplaces'}].map(({n,l})=>(
          <div key={l} className="bg-gray-50 rounded-xl px-4 py-3 text-center">
            <p className="text-xl font-semibold text-gray-900">{n}</p>
            <p className="text-xs text-gray-400 mt-0.5">{l}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-5 mb-6">
        <div>
          <p className="text-xs text-gray-400 mb-2">Ciudad</p>
          <div className="flex gap-1.5 flex-wrap">{CIUDADES.map(c=><Chip key={c} label={CIUDAD_LABEL[c]} active={filtros.ciudad===c} onClick={()=>set('ciudad')(c)} />)}</div>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">Tipo</p>
          <div className="flex gap-1.5 flex-wrap">{TIPOS.map(t=><Chip key={t} label={t.charAt(0).toUpperCase()+t.slice(1)} active={filtros.tipo===t} onClick={()=>set('tipo')(t)} />)}</div>
        </div>
        <div>
          <p className="text-xs text-gray-400 mb-2">Fuente</p>
          <div className="flex gap-1.5">{SOURCES.map(s=><Chip key={s} label={s.charAt(0).toUpperCase()+s.slice(1)} active={filtros.src===s} onClick={()=>set('src')(s)} />)}</div>
        </div>
        <div className="ml-auto min-w-[180px]">
          <p className="text-xs text-gray-400 mb-2">Precio máx: <span className="font-medium text-gray-700">€{filtros.precioMax}/mes</span></p>
          <input type="range" min={200} max={800} step={10} value={filtros.precioMax} onChange={e=>set('precioMax')(Number(e.target.value))} className="w-full accent-gray-900" />
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" checked={filtros.erasmus} onChange={e=>set('erasmus')(e.target.checked)} className="rounded border-gray-300" />
          Solo Erasmus-friendly
        </label>
        <select value={filtros.orden} onChange={e=>set('orden')(e.target.value)} className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-600">
          <option value="precio_asc">Precio: menor primero</option>
          <option value="precio_desc">Precio: mayor primero</option>
          <option value="comision">Mayor comisión primero</option>
        </select>
      </div>
      {visible.length===0 ? (
        <div className="text-center py-16 text-gray-400 text-sm">Sin habitaciones con estos filtros.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {visible.map(room=><RoomCard key={room.id} room={room} />)}
        </div>
      )}
    </div>
  )
}
