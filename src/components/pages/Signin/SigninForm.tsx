import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import TextField from '@/components/ui/TextField'
import { signinContent } from '@/data/signin'
import type { AuthErrorDisplay } from '@/logic/auth/error/error'
import { signinSchema, type SigninFormValues } from '@/logic/auth/schema/schema'
import {
  isSigninSubmitDisabled,
  pendingSubmitLabel,
} from '@/logic/auth/submitButton/submitButton'

type SigninFormProps = {
  onSubmit: (values: SigninFormValues) => void
  isPending: boolean
  serverError?: AuthErrorDisplay
}

const emptyValues: SigninFormValues = { email: '', password: '' }

export default function SigninForm({
  onSubmit,
  isPending,
  serverError,
}: SigninFormProps) {
  const { control, register, handleSubmit } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: emptyValues,
  })
  const values = useWatch({ control, defaultValue: emptyValues }) as SigninFormValues

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center gap-5"
    >
      <TextField
        id="signin-email"
        type="email"
        label={signinContent.emailLabel}
        placeholder={signinContent.emailPlaceholder}
        autoComplete="email"
        {...register('email')}
      />
      <TextField
        id="signin-password"
        type="password"
        label={signinContent.passwordLabel}
        autoComplete="current-password"
        {...register('password')}
      />
      {/* L'espace de 65px de la maquette accueille le message d'erreur global, sans décaler le bouton. */}
      <div className="flex h-[65px] w-full items-end">
        {serverError && (
          <p role="alert" className="text-destructive w-full text-xs">
            {serverError.message}
          </p>
        )}
      </div>
      <Button
        type="submit"
        variant="submit"
        size="submit"
        disabled={isSigninSubmitDisabled(values, isPending)}
      >
        {isPending ? (
          <>
            <Loader2Icon className="animate-spin" aria-hidden />
            <span className="sr-only">{pendingSubmitLabel('signin')}</span>
          </>
        ) : (
          signinContent.submit
        )}
      </Button>
    </form>
  )
}
