import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import TextField from '@/components/ui/TextField'
import { signupContent } from '@/data/signup'
import type { AuthErrorDisplay } from '@/logic/auth/error/error'
import {
  signupSchema,
  type SignupData,
  type SignupFormValues,
} from '@/logic/auth/schema/schema'
import {
  isSignupSubmitDisabled,
  pendingSubmitLabel,
} from '@/logic/auth/submitButton/submitButton'

type SignupFormProps = {
  onSubmit: (data: SignupData) => void
  isPending: boolean
  serverError?: AuthErrorDisplay
}

const emptyValues: SignupFormValues = { name: '', email: '', password: '' }

export default function SignupForm({
  onSubmit,
  isPending,
  serverError,
}: SignupFormProps) {
  const {
    control,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormValues, unknown, SignupData>({
    resolver: zodResolver(signupSchema),
    defaultValues: emptyValues,
  })
  const values = useWatch({ control, defaultValue: emptyValues }) as SignupFormValues

  useEffect(() => {
    if (serverError?.target === 'email') {
      setError('email', { type: 'server', message: serverError.message })
    }
  }, [serverError, setError])

  const formError = serverError?.target === 'form' ? serverError.message : undefined

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-8"
    >
      <TextField
        id="signup-first-name"
        label={signupContent.firstNameLabel}
        autoComplete="given-name"
        error={errors.name?.message}
        {...register('name')}
      />
      <TextField
        id="signup-email"
        type="email"
        label={signupContent.emailLabel}
        placeholder={signupContent.emailPlaceholder}
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <TextField
        id="signup-password"
        type="password"
        label={signupContent.passwordLabel}
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password')}
      />
      {formError && (
        <p role="alert" className="text-destructive -mt-4 w-full text-xs">
          {formError}
        </p>
      )}
      <Button
        type="submit"
        variant="submit"
        size="submit"
        disabled={isSignupSubmitDisabled(values, isPending)}
      >
        {isPending ? (
          <>
            <Loader2Icon className="animate-spin" aria-hidden />
            <span className="sr-only">{pendingSubmitLabel('signup')}</span>
          </>
        ) : (
          signupContent.submit
        )}
      </Button>
    </form>
  )
}
