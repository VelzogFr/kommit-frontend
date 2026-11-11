import { describe, expect, it } from 'vitest'

import {
  isSigninSubmitDisabled,
  isSignupSubmitDisabled,
  pendingSubmitLabel,
} from '@/logic/auth/submitButton/submitButton'

const notPending = false
const pending = true

describe('isSigninSubmitDisabled — RM32 bouton « Me connecter » grisé si champs vides', () => {
  it('est désactivé quand les 2 champs sont vides', () => {
    const emptyValues = { email: '', password: '' }

    expect(isSigninSubmitDisabled(emptyValues, notPending)).toBe(true)
  })

  it("est désactivé quand l'email est vide", () => {
    const valuesWithoutEmail = { email: '', password: 'motdepasse' }

    expect(isSigninSubmitDisabled(valuesWithoutEmail, notPending)).toBe(true)
  })

  it('est désactivé quand le mot de passe est vide', () => {
    const valuesWithoutPassword = { email: 'marc@gmail.com', password: '' }

    expect(isSigninSubmitDisabled(valuesWithoutPassword, notPending)).toBe(true)
  })

  it("est désactivé quand l'email n'est fait que d'espaces", () => {
    const valuesWithBlankEmail = { email: '   ', password: 'motdepasse' }

    expect(isSigninSubmitDisabled(valuesWithBlankEmail, notPending)).toBe(true)
  })

  it("est désactivé quand le mot de passe n'est fait que d'espaces", () => {
    const valuesWithBlankPassword = { email: 'marc@gmail.com', password: '   ' }

    expect(isSigninSubmitDisabled(valuesWithBlankPassword, notPending)).toBe(true)
  })

  it('est actif quand les 2 champs sont remplis, sans vérifier leur format', () => {
    const filledValues = { email: 'pas-un-email', password: '123' }

    expect(isSigninSubmitDisabled(filledValues, notPending)).toBe(false)
  })
})

describe('isSignupSubmitDisabled — RM33 bouton « Créer un compte » grisé si champ requis vide', () => {
  const filledValues = { name: 'Marc', email: 'marc@gmail.com', password: 'motdepasse' }

  it('est désactivé quand les 3 champs sont vides', () => {
    const emptyValues = { name: '', email: '', password: '' }

    expect(isSignupSubmitDisabled(emptyValues, notPending)).toBe(true)
  })

  it('est désactivé quand le prénom est vide', () => {
    const valuesWithoutName = { ...filledValues, name: '' }

    expect(isSignupSubmitDisabled(valuesWithoutName, notPending)).toBe(true)
  })

  it("est désactivé quand le prénom n'est fait que d'espaces", () => {
    const valuesWithBlankName = { ...filledValues, name: '   ' }

    expect(isSignupSubmitDisabled(valuesWithBlankName, notPending)).toBe(true)
  })

  it("est désactivé quand l'email est vide", () => {
    const valuesWithoutEmail = { ...filledValues, email: '' }

    expect(isSignupSubmitDisabled(valuesWithoutEmail, notPending)).toBe(true)
  })

  it('est désactivé quand le mot de passe est vide', () => {
    const valuesWithoutPassword = { ...filledValues, password: '' }

    expect(isSignupSubmitDisabled(valuesWithoutPassword, notPending)).toBe(true)
  })

  it("est désactivé quand l'email n'est fait que d'espaces", () => {
    const valuesWithBlankEmail = { ...filledValues, email: '   ' }

    expect(isSignupSubmitDisabled(valuesWithBlankEmail, notPending)).toBe(true)
  })

  it("est désactivé quand le mot de passe n'est fait que d'espaces", () => {
    const valuesWithBlankPassword = { ...filledValues, password: '        ' }

    expect(isSignupSubmitDisabled(valuesWithBlankPassword, notPending)).toBe(true)
  })

  it('est actif quand les 3 champs sont remplis, même avec un format invalide (validé à la soumission)', () => {
    const filledButInvalidValues = { name: 'Marc', email: 'pas-un-email', password: '123' }

    expect(isSignupSubmitDisabled(filledButInvalidValues, notPending)).toBe(false)
  })
})

describe('RM17 — état du bouton pendant l’appel', () => {
  it('le bouton « Me connecter » est désactivé pendant la requête, champs remplis', () => {
    const filledSigninValues = { email: 'marc@gmail.com', password: 'motdepasse' }

    expect(isSigninSubmitDisabled(filledSigninValues, pending)).toBe(true)
  })

  it('le bouton « Créer un compte » est désactivé pendant la requête, champs remplis', () => {
    const filledSignupValues = { name: 'Marc', email: 'marc@gmail.com', password: 'motdepasse' }

    expect(isSignupSubmitDisabled(filledSignupValues, pending)).toBe(true)
  })

  it('le libellé aria du signin en cours est « Connexion en cours »', () => {
    const signinForm = 'signin'

    expect(pendingSubmitLabel(signinForm)).toBe('Connexion en cours')
  })

  it('le libellé aria du signup en cours est « Création du compte en cours »', () => {
    const signupForm = 'signup'

    expect(pendingSubmitLabel(signupForm)).toBe('Création du compte en cours')
  })
})
