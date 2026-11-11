import type { ReactNode } from 'react'
import { Link } from 'react-router'

import Logo from '@/components/ui/Logo'

type NavbarProps = {
  children: ReactNode
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <header className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-3 bg-white/80 px-4 py-5 backdrop-blur-[6px] sm:px-6">
      <Link to="/" className="cursor-pointer">
        <Logo />
      </Link>
      <div className="ml-auto flex items-center gap-3 sm:gap-6">{children}</div>
    </header>
  )
}
