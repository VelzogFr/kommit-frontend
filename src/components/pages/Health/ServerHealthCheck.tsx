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
import { fetchHealth } from '@/lib/api/health'

export default function ServerHealthCheck() {
  const { mutate, data, error, isPending } = useMutation({
    mutationFn: fetchHealth,
  })

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{healthContent.server.title}</CardTitle>
        <CardDescription>{healthContent.server.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-3">
        <Button onClick={() => mutate()} disabled={isPending}>
          {isPending
            ? healthContent.server.pendingButton
            : healthContent.server.button}
        </Button>

        {data && (
          <p className="flex items-center gap-2 text-sm text-emerald-600">
            <CircleCheckIcon className="size-4" />
            {healthContent.server.success} En ligne depuis {data.uptime} s.
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
