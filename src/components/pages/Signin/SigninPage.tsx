import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useMemo, useRef } from 'react'
import { Link, useNavigate } from 'react-router'

import AuthCard from '@/components/ui/AuthCard'
import { buttonVariants } from '@/components/ui/button'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import SigninForm from '@/components/pages/Signin/SigninForm'
import { layoutContent } from '@/data/layout'
import { signinContent } from '@/data/signin'
import { ApiRequestError } from '@/lib/api/apiClient'
import { getSession, signIn } from '@/lib/api/auth'
import { queryKeys } from '@/lib/api/queryKeys'
import { authErrorDisplay } from '@/logic/auth/error/error'

export default function SigninPage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: signIn,
    // Recharge la session avant d'arriver sur l'accueil, sinon il afficherait
    // brièvement l'ancienne session (null) gardée en cache. Si ce rechargement
    // échoue, le compte est quand même connecté : on vide le cache et l'accueil
    // relira la session lui-même, au lieu d'afficher une erreur au formulaire.
    onSuccess: async () => {
      await queryClient
        .fetchQuery({ queryKey: queryKeys.session, queryFn: getSession })
        .catch(() => queryClient.removeQueries({ queryKey: queryKeys.session }))
      await navigate('/', { state: { arrivalOrigin: 'signin' } })
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
          to="/signup"
          className={buttonVariants({ variant: 'primary', size: 'navbar' })}
        >
          {layoutContent.navbar.signup}
        </Link>
      </Navbar>

      <main className="flex flex-1 flex-col items-center px-4 pt-8 pb-8 sm:pt-[218px]">
        <AuthCard
          title={signinContent.title}
          footer={
            <>
              {signinContent.footerText}
              <Link to="/signup" className="text-primary cursor-pointer">
                {signinContent.footerLink}
              </Link>
              {signinContent.footerEnd}
            </>
          }
        >
          <SigninForm
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
