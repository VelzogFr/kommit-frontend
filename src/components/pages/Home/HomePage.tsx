import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Loader2Icon, LogOutIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { toast } from 'sonner'

import { Button, buttonVariants } from '@/components/ui/button'
import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import { homeContent } from '@/data/home'
import { layoutContent } from '@/data/layout'
import { getSession, signOut } from '@/lib/api/auth'
import { queryKeys } from '@/lib/api/queryKeys'
import {
  arrivalToastMessage,
  type ArrivalOrigin,
} from '@/logic/home/arrivalToast/arrivalToast'
import { composeGreeting } from '@/logic/home/greeting/greeting'

// Un id fixe empêche le doublon quand le mode strict de React rejoue l'effet.
const ARRIVAL_TOAST_ID = 'arrival'

type ArrivalState = { arrivalOrigin?: ArrivalOrigin } | null

export default function HomePage() {
  const queryClient = useQueryClient()
  const location = useLocation()
  const navigate = useNavigate()

  const { data: session, isPending: isSessionPending } = useQuery({
    queryKey: queryKeys.session,
    queryFn: getSession,
  })

  // RM5 : déconnexion silencieuse, ni modale ni toast.
  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => queryClient.setQueryData(queryKeys.session, null),
  })

  const arrivalOrigin = (location.state as ArrivalState)?.arrivalOrigin

  useEffect(() => {
    if (isSessionPending || arrivalOrigin === undefined) {
      return
    }

    const message = session
      ? arrivalToastMessage(arrivalOrigin, session.user.name)
      : null

    if (message) {
      toast.success(message, { id: ARRIVAL_TOAST_ID })
    }

    // RM24, RM25 : l'origine est effacée de l'historique une fois lue, pour qu'un
    // rechargement ou un retour arrière ne refasse pas apparaître le toast.
    navigate(location.pathname, { replace: true, state: null })
  }, [arrivalOrigin, isSessionPending, location.pathname, navigate, session])

  const greeting = session ? composeGreeting(session.user.name) : null

  return (
    <div className="bg-background flex min-h-svh flex-col">
      <Navbar>
        {isSessionPending ? null : session ? (
          <Button
            variant="tertiary"
            size="navbar"
            onClick={() => signOutMutation.mutate()}
          >
            <LogOutIcon aria-hidden />
            {layoutContent.navbar.signout}
          </Button>
        ) : (
          <>
            <Link
              to="/signin"
              className={buttonVariants({ variant: 'secondary', size: 'navbar' })}
            >
              {layoutContent.navbar.signin}
            </Link>
            <Link
              to="/signup"
              className={buttonVariants({ variant: 'primary', size: 'navbar' })}
            >
              {layoutContent.navbar.signup}
            </Link>
          </>
        )}
      </Navbar>

      <main className="flex flex-1 flex-col items-center px-4 py-8">
        {isSessionPending ? (
          <div role="status" className="flex flex-1 items-center justify-center">
            <Loader2Icon className="text-primary size-8 animate-spin" aria-hidden />
            <span className="sr-only">{homeContent.loading}</span>
          </div>
        ) : (
          <div className="flex w-full flex-col items-center gap-3 py-7 text-center">
            <h1 className="text-[30px] leading-[1.2] font-bold sm:text-5xl sm:whitespace-nowrap">
              {greeting ? (
                <>
                  {greeting.lead}
                  <span className="text-highlight">{greeting.highlight}</span>
                </>
              ) : (
                <>
                  {homeContent.visitor.titleStart}
                  <span className="text-highlight">
                    {homeContent.visitor.titleHighlight}
                  </span>
                </>
              )}
            </h1>
            <p className="text-muted-foreground max-w-[544px] text-lg leading-7">
              {session
                ? homeContent.connected.subtitle
                : homeContent.visitor.subtitle}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
