import type { ComponentProps } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type TextFieldProps = ComponentProps<'input'> & {
  id: string
  label: string
  error?: string
}

export default function TextField({ id, label, error, ...inputProps }: TextFieldProps) {
  const errorId = `${id}-error`

  return (
    <div className="flex w-full flex-col items-start gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <p id={errorId} className="text-destructive w-full text-xs">
          {error}
        </p>
      )}
    </div>
  )
}
