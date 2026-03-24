'use client'
import { useState } from 'react'
import type { Room } from '@/types'
export default function LeadModal({ room, onClose }: { room: Room; onClose: () => void }) {
  const [form, setForm] = useState({ nombre:'', email:'', ciudad:room.ciudad, universidad:'', presupuesto_max:room.precio, tipo_hab:room.tipo, erasmus:room.erasmus_ok })
  const [status, setStatus] = useState<'idle'|'loading'|'ok'|'error'>('idle')
  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/lead', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({...form, room_id:room.id}) })
      setStatus(res.ok ? 'ok' : 'error')
    } catch { setStatus('error') }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={(e)=>e.target===e.currentTarget&&onClose()}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        {status==='ok' ? (
          <div className="text-center py-6">
            <p className="font-medium text-gray-900 mb-1">¡Solicitud enviada!</p>
            <p className="text-sm text-gray-500 mb-4">Un gestor te contactará en menos de 2 horas.</p>
            <button onClick={onClose} className="text-sm text-gray-400">Cerrar</button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <p className="font-medium text-gray-900">Contactar gestor</p>
              <p className="text-xs text-gray-400 mt-0.5">{room.titulo} · €{room.precio}/mes</p>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-3">
              <input required placeholder="Tu nombre" value={form.nombre} onChange={e=>setForm(f=>({...f,nombre:e.target.value}))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
              <input required type="email" placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
              <input placeholder="Universidad" value={form.universidad} onChange={e=>setForm(f=>({...f,universidad:e.target.value}))} className="border border-gray-200 rounded-xl px-3 py-2 text-sm" />
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" id="erasmus" checked={form.erasmus} onChange={e=>setForm(f=>({...f,erasmus:e.target.checked}))} />
                <label htmlFor="erasmus">Soy estudiante Erasmus</label>
              </div>
              {status==='error' && <p className="text-xs text-red-500">Algo salió mal.</p>}
              <button type="submit" disabled={status==='loading'} className="w-full py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium disabled:opacity-50">
                {status==='loading' ? 'Enviando...' : 'Enviar — gratis'}
              </button>
              <button type="button" onClick={onClose} className="text-sm text-gray-400 text-center">Cancelar</button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
