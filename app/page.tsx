import type { Metadata } from 'next'
import { getRooms } from '@/lib/rooms'
import { isMockMode } from '@/lib/supabase'
import RoomDirectory from '@/components/RoomDirectory'

export const metadata: Metadata = {
  title: 'Habitaciones para estudiantes en Madrid, Barcelona y Valencia',
  description: 'Encuentra tu habitación cerca de la universidad. Pisos compartidos, habitaciones individuales y estudios para estudiantes y Erasmus.',
}

export const revalidate = 21600

export default async function HomePage() {
  const rooms = await getRooms()
  const mock  = isMockMode()

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {mock && (
        <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700 flex items-center gap-2">
          <span>Modo demo — datos de ejemplo. Añade las API keys para datos reales.</span>
        </div>
      )}
      <section className="mb-10">
        <p className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-3">
          {rooms.length} habitaciones verificadas · Madrid · Barcelona · Valencia
        </p>
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-3">
          Tu habitación<br />cerca de la uni
        </h1>
        <p className="text-lg text-gray-500 max-w-xl">
          Habitaciones de Badi y Uniplaces filtradas para estudiantes. Sin sorpresas, sin comisiones para ti.
        </p>
      </section>
      <RoomDirectory rooms={rooms} />
      <section className="mt-16 bg-gray-50 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1">
          <p className="font-semibold text-gray-900 mb-1">¿Tienes pisos cerca de universidades?</p>
          <p className="text-sm text-gray-500">Publica en nuestra plataforma y recibe estudiantes cualificados.</p>
        </div>
        <a href="mailto:gestores@habiestudiante.es"
          className="shrink-0 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors">
          Contactar →
        </a>
      </section>
    </main>
  )
}
