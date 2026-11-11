import { useMutation } from '@tanstack/react-query'
import { CircleAlertIcon, CircleCheckIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { healthContent } from '@/data/health'
import { fetchDbHealth } from '@/lib/api/dbHealth'

export default function DbHealthCheck() {
  const { mutate, data, error, isPending } = useMutation({
    mutationFn: fetchDbHealth,
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{healthContent.database.title}</CardTitle>
        <CardDescription>{healthContent.database.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-3">
        <Button onClick={() => mutate()} disabled={isPending}>
          {isPending
            ? healthContent.database.pendingButton
            : healthContent.database.button}
        </Button>

        {data?.status === 'ok' && (
          <p className="flex items-center gap-2 text-sm text-emerald-600">
            <CircleCheckIcon className="size-4" />
            {healthContent.database.success} Réponse en {data.latency} ms.
          </p>
        )}

        {data?.status === 'unreachable' && (
          <p className="text-destructive flex items-center gap-2 text-sm">
            <CircleAlertIcon className="size-4" />
            {healthContent.database.unreachable}
          </p>
        )}

        {error && (
          <p className="text-destructive flex items-center gap-2 text-sm">
            <CircleAlertIcon className="size-4" />
            {error.message}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
