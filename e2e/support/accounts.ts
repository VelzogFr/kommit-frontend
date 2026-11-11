import { expect, type APIRequestContext, type Page } from '@playwright/test'

export const API_URL = process.env.VITE_API_URL ?? 'http://localhost:3000'
export const FRONT_ORIGIN = 'http://localhost:5173'

export type Account = { name: string; email: string; password: string }

// Un email neuf par appel : un second run ne bute pas sur l'unicité en base.
export const uniqueEmail = () =>
  `marc+${Date.now()}-${Math.random().toString(36).slice(2, 8)}@test.dev`

export const newAccount = (): Account => ({
  name: 'Marc',
  email: uniqueEmail(),
  password: 'motdepasse123',
})

// Better Auth refuse une requête sans Origin de confiance (trustedOrigins du backend).
const authHeaders = { Origin: FRONT_ORIGIN }

/** Crée le compte directement via l'API, pour les scénarios qui exigent un compte préexistant. */
export async function createAccount(request: APIRequestContext, account: Account) {
  const response = await request.post(`${API_URL}/api/auth/sign-up/email`, {
    headers: authHeaders,
    data: account,
  })
  expect(response.ok(), `création du compte ${account.email}`).toBeTruthy()
}

/** Ouvre une session via l'API : le cookie arrive dans le contexte du navigateur de `page`. */
export async function signInThroughApi(page: Page, account: Account) {
  const response = await page.request.post(`${API_URL}/api/auth/sign-in/email`, {
    headers: authHeaders,
    data: { email: account.email, password: account.password },
  })
  expect(response.ok(), `connexion de ${account.email}`).toBeTruthy()
}
