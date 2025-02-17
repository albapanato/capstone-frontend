'use client'

import { useState } from 'react'
import {
  ADD_DOCUMENTAL_SOURCE_ROUTE,
  ADD_INCIDENT_ROUTE,
  ADD_VICTIM_ROUTE,
  ADD_WITNESS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  VALIDATOR_ROUTE,
} from '@/constants'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const isValidator = false

  return (
    <header className='bg-black text-white py-4 shadow-md fixed z-20 w-full'>
      <nav className='max-w-screen-xl mx-auto flex justify-between items-center px-6'>
        {/* Menú en pantallas grandes */}
        <ul className='hidden min-[860px]:flex space-x-6'>
          <li>
            <Link href={HOME_ROUTE} className='hover:underline'>
              Inicio
            </Link>
          </li>
          <li>
            <Link href={ADD_INCIDENT_ROUTE} className='hover:underline'>
              Agregar suceso
            </Link>
          </li>
          <li>
            <Link href={ADD_WITNESS_ROUTE} className='hover:underline'>
              Agregar testigo
            </Link>
          </li>
          <li>
            <Link href={ADD_VICTIM_ROUTE} className='hover:underline'>
              Agregar víctima
            </Link>
          </li>
          <li>
            <Link href={ADD_DOCUMENTAL_SOURCE_ROUTE} className='hover:underline'>
              Agregar fuente documental
            </Link>
          </li>
          {isValidator && (
            <li>
              <Link href={VALIDATOR_ROUTE} className='hover:underline'>
                Verificar
              </Link>
            </li>
          )}
        </ul>

        {/* Icono de menú en pantallas pequeñas */}
        <button className='min-[860px]:hidden' onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menú desplegable con animación */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : -20 }}
          transition={{ duration: 0.3 }}
          className={`absolute z-10 top-10 left-0 w-full bg-black text-white shadow-md min-[860px]:hidden ${menuOpen ? 'block' : 'hidden'}`}
        >
          <ul className='flex flex-col space-y-4 py-4 px-8'>
            <li>
              <Link href={HOME_ROUTE} className='hover:underline' onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link href={ADD_INCIDENT_ROUTE} className='hover:underline' onClick={() => setMenuOpen(false)}>
                Agregar suceso
              </Link>
            </li>
            <li>
              <Link href={ADD_WITNESS_ROUTE} className='hover:underline' onClick={() => setMenuOpen(false)}>
                Agregar testigo
              </Link>
            </li>
            <li>
              <Link href={ADD_VICTIM_ROUTE} className='hover:underline' onClick={() => setMenuOpen(false)}>
                Agregar víctima
              </Link>
            </li>
            <li>
              <Link href={ADD_DOCUMENTAL_SOURCE_ROUTE} className='hover:underline' onClick={() => setMenuOpen(false)}>
                Agregar fuente documental
              </Link>
            </li>
            {isValidator && (
              <li>
                <Link href={VALIDATOR_ROUTE} className='hover:underline' onClick={() => setMenuOpen(false)}>
                  Verificar
                </Link>
              </li>
            )}
          </ul>
        </motion.div>

        <div className='flex align-middle gap-4'>
          {isValidator ? (
            <Link href='' className='hover:underline flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-log-out'
              >
                <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
                <polyline points='16 17 21 12 16 7' />
                <line x1='21' x2='9' y1='12' y2='12' />
              </svg>
              <span>Salir</span>
            </Link>
          ) : (
            <Link href={LOGIN_ROUTE} className='hover:underline'>
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
