import { describe, expect, it } from 'vitest'

import { authErrorDisplay } from '@/logic/auth/error/error'
import type { ApiError } from '@/types/apiContract'

describe('authErrorDisplay — RM9, RM13 message et emplacement selon le code de l’ApiError', () => {
  it('RM9 : EMAIL_ALREADY_EXISTS s’affiche sous le champ email, avec le message du serveur', () => {
    const emailTakenError: ApiError = {
      code: 'EMAIL_ALREADY_EXISTS',
      message: 'Un compte avec cet email existe déjà',
    }

    expect(authErrorDisplay(emailTakenError)).toEqual({
      target: 'email',
      message: 'Un compte avec cet email existe déjà',
    })
  })

  it('RM13 : INVALID_CREDENTIALS s’affiche en message global du formulaire, avec le message générique du serveur', () => {
    const badCredentialsError: ApiError = {
      code: 'INVALID_CREDENTIALS',
      message: 'Email ou mot de passe incorrect',
    }

    expect(authErrorDisplay(badCredentialsError)).toEqual({
      target: 'form',
      message: 'Email ou mot de passe incorrect',
    })
  })

  it.each<ApiError['code']>(['VALIDATION_ERROR', 'INTERNAL_ERROR'])(
    'tout autre code (%s) s’affiche en message global du formulaire',
    (otherCode) => {
      const otherError: ApiError = { code: otherCode, message: 'Message du serveur' }

      expect(authErrorDisplay(otherError)).toEqual({
        target: 'form',
        message: 'Message du serveur',
      })
    },
  )

  it('sans ApiError (serveur injoignable), affiche le message de repli en message global du formulaire', () => {
    const missingApiError = undefined

    expect(authErrorDisplay(missingApiError)).toEqual({
      target: 'form',
      message: 'Une erreur est survenue. Réessaie dans un instant.',
    })
  })
})
