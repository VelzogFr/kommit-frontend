import { LockIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { authContent } from '@/data/auth'

type AuthCardProps = {
  title: string
  children: ReactNode
  footer: ReactNode
}

export default function AuthCard({ title, children, footer }: AuthCardProps) {
  return (
    <div className="flex w-full max-w-[400px] flex-col items-center">
      <section className="bg-card border-card-border rounded-panel drop-shadow-card flex min-h-[479px] w-full flex-col items-center gap-8 border p-8">
        <h1 className="w-full text-center text-2xl leading-[33.6px] font-bold">
          {title}
        </h1>
        {children}
        <p className="text-label text-center text-sm leading-5">{footer}</p>
      </section>
      <p className="text-label/60 flex items-center gap-2 pt-8 text-[10px] leading-[15px] font-medium tracking-[1px] uppercase">
        <LockIcon className="size-3" aria-hidden />
        {authContent.securityNotice}
      </p>
    </div>
  )
}
