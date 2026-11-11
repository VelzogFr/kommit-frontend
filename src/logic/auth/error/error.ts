import { authContent } from '@/data/auth'
import type { ApiError } from '@/types/apiContract'

export type AuthErrorDisplay = {
  target: 'email' | 'form'
  message: string
}

// Le contrat route par le code : seul EMAIL_ALREADY_EXISTS vise un champ.
// Sans ApiError, le backend n'a pas répondu : le message ne peut pas venir de lui.
export function authErrorDisplay(error: ApiError | undefined): AuthErrorDisplay {
  if (!error) {
    return { target: 'form', message: authContent.unreachableServer }
  }

  return {
    target: error.code === 'EMAIL_ALREADY_EXISTS' ? 'email' : 'form',
    message: error.message,
  }
}
