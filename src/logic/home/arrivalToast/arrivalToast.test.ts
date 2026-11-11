import { describe, expect, it } from 'vitest'

import { arrivalToastMessage } from '@/logic/home/arrivalToast/arrivalToast'

describe('arrivalToastMessage — RM3, RM4 message du toast selon l’origine', () => {
  it('RM3 : après un signup, souhaite la bienvenue avec le prénom', () => {
    const firstName = 'Marc'

    const signupToast = arrivalToastMessage('signup', firstName)

    expect(signupToast).toBe('Bienvenue Marc, ton compte est créé.')
  })

  it('RM4 : après un signin, salue le retour avec le prénom', () => {
    const firstName = 'Marc'

    const signinToast = arrivalToastMessage('signin', firstName)

    expect(signinToast).toBe('Content de te revoir Marc.')
  })

  it('sans origine (accès direct, rechargement), aucun toast', () => {
    const firstName = 'Marc'

    const toastWithoutOrigin = arrivalToastMessage(undefined, firstName)

    expect(toastWithoutOrigin).toBeNull()
  })
})
