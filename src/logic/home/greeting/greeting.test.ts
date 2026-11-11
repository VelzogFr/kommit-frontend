import { describe, expect, it } from 'vitest'

import { composeGreeting } from '@/logic/home/greeting/greeting'

describe('composeGreeting — RM2 titre de l’accueil connecté', () => {
  it('compose le titre de la maquette en 2 morceaux, le prénom suivi de « ? » mis en avant', () => {
    const firstName = 'Marc'

    const greeting = composeGreeting(firstName)

    expect(greeting).toEqual({
      lead: "Quoi de neuf aujourd'hui, ",
      highlight: 'Marc ?',
    })
  })

  it('reprend un prénom composé tel quel', () => {
    const composedFirstName = 'Jean-Pierre'

    const greeting = composeGreeting(composedFirstName)

    expect(greeting).toEqual({
      lead: "Quoi de neuf aujourd'hui, ",
      highlight: 'Jean-Pierre ?',
    })
  })
})
