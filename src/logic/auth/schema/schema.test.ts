import { describe, expect, it } from 'vitest'

import { signinSchema, signupSchema } from '@/logic/auth/schema/schema'

const validSignup = {
  name: 'Marc',
  email: 'marc.developpeur@gmail.com',
  password: 'motdepas',
}

function failingFieldsOf(values: unknown) {
  const parsed = signupSchema.safeParse(values)

  return parsed.success ? [] : parsed.error.issues.map((issue) => issue.path[0])
}

function issuesOf(values: unknown) {
  const parsed = signupSchema.safeParse(values)

  return parsed.success
    ? []
    : parsed.error.issues.map((issue) => ({ field: issue.path[0], message: issue.message }))
}

describe('signupSchema — RM10, RM11, RM20 critères de validation du signup', () => {
  it('accepte un signup qui respecte les 3 critères', () => {
    const signupValues = validSignup

    expect(signupSchema.safeParse(signupValues).success).toBe(true)
  })

  describe('prénom trimé non vide', () => {
    it('refuse un prénom vide', () => {
      const valuesWithEmptyName = { ...validSignup, name: '' }

      expect(issuesOf(valuesWithEmptyName)).toEqual([
        { field: 'name', message: 'Le prénom est obligatoire.' },
      ])
    })

    it("refuse un prénom fait uniquement d'espaces", () => {
      const valuesWithBlankName = { ...validSignup, name: '   ' }

      expect(issuesOf(valuesWithBlankName)).toEqual([
        { field: 'name', message: 'Le prénom est obligatoire.' },
      ])
    })

    it("accepte un prénom entouré d'espaces", () => {
      const valuesWithPaddedName = { ...validSignup, name: '  Marc  ' }

      expect(signupSchema.safeParse(valuesWithPaddedName).success).toBe(true)
    })
  })

  describe('email bien formé', () => {
    it('refuse un email sans @', () => {
      const valuesWithEmailWithoutAt = { ...validSignup, email: 'marc.gmail.com' }

      expect(issuesOf(valuesWithEmailWithoutAt)).toEqual([
        { field: 'email', message: "L'email n'est pas valide." },
      ])
    })

    it('refuse un email vide', () => {
      const valuesWithEmptyEmail = { ...validSignup, email: '' }

      expect(issuesOf(valuesWithEmptyEmail)).toEqual([
        { field: 'email', message: "L'email n'est pas valide." },
      ])
    })
  })

  describe('mot de passe d’au moins 8 caractères', () => {
    it('refuse un mot de passe de 7 caractères, avec le message de la maquette', () => {
      const valuesWithSevenCharPassword = { ...validSignup, password: '1234567' }

      expect(issuesOf(valuesWithSevenCharPassword)).toEqual([
        { field: 'password', message: 'Le mot de passe doit contenir au moins 8 caractères.' },
      ])
    })

    it('accepte un mot de passe de exactement 8 caractères', () => {
      const valuesWithEightCharPassword = { ...validSignup, password: '12345678' }

      expect(signupSchema.safeParse(valuesWithEightCharPassword).success).toBe(true)
    })
  })

  it('signale les 3 champs en faute en même temps', () => {
    const allInvalidValues = { name: '  ', email: 'marc', password: '123' }

    expect(failingFieldsOf(allInvalidValues).sort()).toEqual(['email', 'name', 'password'])
  })
})

describe('signinSchema — RM10, RM11, RM20 aucun format vérifié au signin', () => {
  it('accepte un email mal formé', () => {
    const valuesWithMalformedEmail = { email: 'pas-un-email', password: 'motdepasse' }

    expect(signinSchema.safeParse(valuesWithMalformedEmail).success).toBe(true)
  })

  it('accepte un mot de passe de moins de 8 caractères', () => {
    const valuesWithShortPassword = { email: 'marc@gmail.com', password: '123' }

    expect(signinSchema.safeParse(valuesWithShortPassword).success).toBe(true)
  })
})
