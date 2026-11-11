import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router'

import AuthCard from '@/components/ui/AuthCard'
import { buttonVariants } from '@/components/ui/button'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import SignupForm from '@/components/pages/Signup/SignupForm'
import { layoutContent } from '@/data/layout'
import { signupContent } from '@/data/signup'
import { ApiRequestError } from '@/lib/api/apiClient'
import { getSession, signUp } from '@/lib/api/auth'
import { queryKeys } from '@/lib/api/queryKeys'
import { authErrorDisplay } from '@/logic/auth/error/error'

export default function SignupPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: signUp,
    // Recharge la session avant d'arriver sur l'accueil, sinon il afficherait
    // brièvement l'ancienne session (null) gardée en cache. Si ce rechargement
    // échoue, le compte est quand même connecté : on vide le cache et l'accueil
    // relira la session lui-même, au lieu d'afficher une erreur au formulaire.
    onSuccess: async () => {
      await queryClient
        .fetchQuery({ queryKey: queryKeys.session, queryFn: getSession })
        .catch(() => queryClient.removeQueries({ queryKey: queryKeys.session }))
      await navigate('/', { state: { arrivalOrigin: 'signup' } })
    },
  })

  // RM16 : 2 clics rapprochés passent tous les 2 la validation asynchrone avant que le
  // bouton ne soit désactivé. Le verrou, lui, est posé de façon synchrone.
  const isSubmittingRef = useRef(false)

  const submit = (values: Parameters<typeof mutation.mutate>[0]) => {
    if (isSubmittingRef.current) {
      return
    }

    isSubmittingRef.current = true
    mutation.mutate(values, {
      onSettled: () => {
        isSubmittingRef.current = false
      },
    })
  }

  const serverError = useMemo(
    () =>
      mutation.error
        ? authErrorDisplay(
            mutation.error instanceof ApiRequestError
              ? mutation.error.apiError
              : undefined,
          )
        : undefined,
    [mutation.error],
  )

  return (
    <div className="bg-background flex min-h-svh flex-col">
      <Navbar>
        <Link
          to="/signin"
          className={buttonVariants({ variant: 'secondary', size: 'navbar' })}
        >
          {layoutContent.navbar.signin}
        </Link>
      </Navbar>

      <main className="flex flex-1 flex-col items-center px-4 pt-8 pb-8 sm:pt-[218px]">
        <AuthCard
          title={signupContent.title}
          footer={
            <>
              {signupContent.footerText}
              <Link to="/signin" className="text-primary cursor-pointer">
                {signupContent.footerLink}
              </Link>
            </>
          }
        >
          <SignupForm
            onSubmit={submit}
            isPending={mutation.isPending}
            serverError={serverError}
          />
        </AuthCard>
      </main>

      <Footer />
    </div>
  )
}
