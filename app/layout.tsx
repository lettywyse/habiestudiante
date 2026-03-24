import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'Habitaciones Estudiantes España', template: '%s | HabiEstudiante' },
  description: 'Directorio de habitaciones para estudiantes en Madrid, Barcelona y Valencia.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geist.className} bg-white text-gray-900 antialiased`}>
        <header className="border-b border-gray-100 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/" className="font-semibold text-gray-900 text-sm tracking-tight">
              habi<span className="text-teal-600">estudiante</span>
            </a>
            <nav className="flex items-center gap-5 text-sm text-gray-500">
              <a href="/" className="hover:text-gray-900 transition-colors">Habitaciones</a>
              <a href="mailto:gestores@habiestudiante.es"
                className="px-3 py-1.5 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-700 transition-colors">
                Publicar piso
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-gray-100 mt-20 px-4 py-8">
          <div className="max-w-7xl mx-auto text-center text-xs text-gray-400">
            <p>habiEstudiante · Habitaciones verificadas por Badi y Uniplaces</p>
            <p className="mt-1">Este sitio puede recibir comisiones por reservas realizadas a través de nuestros enlaces.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
