import DbHealthCheck from '@/components/pages/Health/DbHealthCheck'
import ServerHealthCheck from '@/components/pages/Health/ServerHealthCheck'
import { healthContent } from '@/data/health'

export default function HealthPage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-3xl flex-col items-center gap-8 px-6 py-16">
      <header className="text-center">
        <h1 className="text-3xl font-semibold">{healthContent.title}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {healthContent.subtitle}
        </p>
      </header>

      <div className="flex w-full flex-col items-center gap-6">
        <ServerHealthCheck />
        <DbHealthCheck />
      </div>
    </main>
  )
}
