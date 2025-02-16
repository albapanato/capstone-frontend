'use client'

import Link from 'next/link'
import { FileUser } from 'lucide-react'

const Footer = () => (
  <footer className='w-full bg-gray-100 py-4 text-center border-t border-gray-300'>
    <Link
      href='/about'
      className='text-gray-600 hover:text-gray-800 transition flex items-center justify-center gap-2'
    >
      <FileUser size={20} />
      Sobre nosotros
    </Link>
  </footer>
)

export default Footer
