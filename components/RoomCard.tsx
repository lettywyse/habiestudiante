'use client'
import type { Room } from '@/types'
import { calcComision } from '@/lib/rooms'
import { useState } from 'react'
import LeadModal from './LeadModal'
const CIUDAD_STYLES: Record<string,{pill:string;bg:string}> = {
  madrid:    {pill:'bg-amber-100 text-amber-800',   bg:'bg-amber-50'},
  barcelona: {pill:'bg-purple-100 text-purple-800', bg:'bg-purple-50'},
  valencia:  {pill:'bg-teal-100 text-teal-800',     bg:'bg-teal-50'},
}
const CIUDAD_LABEL: Record<string,string> = {madrid:'Madrid',barcelona:'Barcelona',valencia:'Valencia'}
export default function RoomCard({room}:{room:Room}) {
  const [showLead, setShowLead] = useState(false)
  const styles = CIUDAD_STYLES[room.ciudad] || CIUDAD_STYLES.madrid
  const comision = calcComision(room)
  const srcLabel = room.source==='badi' ? 'Badi' : 'Uniplaces'
  const comisionLabel = room.comision_tipo==='porcentaje' ? `Comisión: €${comision} (15% 1er mes)` : `Comisión: €${comision} fija`
  async function handleAffiliate() {
    await fetch(`/api/room-click?id=${room.id}`)
    window.open(room.url_original,'_blank','noopener')
  }
  return (
    <>
      <article className="flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors duration-150">
        <div className={`relative h-40 flex items-center justify-center ${styles.bg}`}>
          {room.thumbnail_url ? (
            <img src={room.thumbnail_url} alt={room.titulo} className="w-full h-full object-cover" />
          ) : (
            <svg className="opacity-20 w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
              <path d="M9 21V12h6v9" />
            </svg>
          )}
          <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${styles.pill}`}>{CIUDAD_LABEL[room.ciudad]}</span>
            {room.erasmus_ok && <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">Erasmus ok</span>}
          </div>
          <span className={`absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${room.source==='badi'?'bg-teal-100 text-teal-800':'bg-purple-100 text-purple-800'}`}>{srcLabel}</span>
        </div>
        <div className="flex flex-col flex-1 p-3 gap-2">
          <p className="text-sm font-medium text-gray-900 leading-snug">{room.titulo}</p>
          <p className="text-xs text-gray-400">{room.barrio} · {room.metros}m² · baño {room.bano_privado?'privado':'compartido'}</p>
          {room.descripcion && <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{room.descripcion}</p>}
          <div className="flex items-baseline gap-1 mt-auto pt-1">
            <span className="text-xl font-semibold text-gray-900">€{room.precio}</span>
            <span className="text-xs text-gray-400">/mes</span>
          </div>
          <button onClick={()=>setShowLead(true)} className="w-full py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors">Contactar gestor — gratis</button>
          <button onClick={handleAffiliate} className="w-full py-2 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors">Ver en {srcLabel} →</button>
          <p className="text-[11px] text-gray-400 border-t border-gray-100 pt-2">{comisionLabel}</p>
        </div>
      </article>
      {showLead && <LeadModal room={room} onClose={()=>setShowLead(false)} />}
    </>
  )
}
