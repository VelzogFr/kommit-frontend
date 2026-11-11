import { expect, test, type Page } from '@playwright/test'

import { createAccount, newAccount, type Account } from './support/accounts.ts'
import { greetingHeading, navbar, toasts } from './support/screen.ts'

// `message` de l'ApiError INVALID_CREDENTIALS renvoyé par le backend, sans point final.
const INVALID_CREDENTIALS = 'Email ou mot de passe incorrect'

const emailField = (page: Page) => page.getByLabel('Email', { exact: true })
const passwordField = (page: Page) => page.getByLabel('Mot de passe', { exact: true })

async function fillSignin(page: Page, email: string, password: string) {
  await emailField(page).fill(email)
  await passwordField(page).fill(password)
}

const isSigninRequest = (url: string, method: string) =>
  method === 'POST' && url.includes('/api/auth/sign-in/email')

let account: Account

test.beforeAll(async ({ playwright }) => {
  const request = await playwright.request.newContext()
  account = newAccount()
  await createAccount(request, account)
  await request.dispose()
})

test.beforeEach(async ({ page }) => {
  await page.goto('/signin')
})

test('SM-7 : bouton en chargement pendant l’appel', async ({ page }) => {
  // La réponse de l'API est retenue jusqu'à la fin des vérifications de l'état « en vol ».
  let releaseResponse!: () => void
  const responseReleased = new Promise<void>((resolve) => {
    releaseResponse = resolve
  })
  await page.route('**/api/auth/sign-in/email', async (route) => {
    await responseReleased
    await route.continue()
  })
  const signinRequests: string[] = []
  page.on('request', (request) => {
    if (isSigninRequest(request.url(), request.method())) {
      signinRequests.push(request.url())
    }
  })
  await fillSignin(page, account.email, account.password)

  await page.getByRole('button', { name: 'Me connecter' }).click()

  const pendingButton = page.getByRole('button', { name: 'Connexion en cours' })
  await expect(pendingButton).toBeVisible()
  await expect(pendingButton).toBeDisabled()
  await expect(page.getByText('Me connecter', { exact: true })).toHaveCount(0)
  await pendingButton.click({ force: true })
  expect(signinRequests).toHaveLength(1)

  releaseResponse()

  await expect(page).toHaveURL('/')
  await expect(greetingHeading(page, 'Marc')).toBeVisible()
})

test('SM-10 : mauvais mot de passe, message générique', async ({ page }) => {
  await fillSignin(page, account.email, 'mauvaismdp1')

  await page.getByRole('button', { name: 'Me connecter' }).click()

  await expect(page.getByRole('alert')).toHaveText(INVALID_CREDENTIALS)
  await expect(emailField(page)).not.toHaveAttribute('aria-invalid', 'true')
  await expect(passwordField(page)).not.toHaveAttribute('aria-invalid', 'true')
  await expect(emailField(page)).toHaveAccessibleDescription('')
  await expect(passwordField(page)).toHaveAccessibleDescription('')
  await expect(page).toHaveURL('/signin')
  await expect(toasts(page)).toHaveCount(0)
})

test('SM-12 : signin réussi, retour sur l’accueil connecté', async ({ page }) => {
  await fillSignin(page, account.email, account.password)

  await page.getByRole('button', { name: 'Me connecter' }).click()

  await expect(page).toHaveURL('/')
  await expect(greetingHeading(page, 'Marc')).toBeVisible()
  await expect(navbar(page).getByRole('button', { name: 'Se déconnecter' })).toBeVisible()
  await expect(navbar(page).getByRole('link', { name: 'Se connecter' })).toHaveCount(0)
  await expect(navbar(page).getByRole('link', { name: 'Créer un compte' })).toHaveCount(0)
})

test('SM-14 : toast de retour après un signin', async ({ page }) => {
  await fillSignin(page, account.email, account.password)

  await page.getByRole('button', { name: 'Me connecter' }).click()

  const welcomeBackToast = toasts(page).filter({ hasText: 'Content de te revoir Marc.' })
  await expect(welcomeBackToast).toBeVisible()
  await expect(
    welcomeBackToast.getByRole('button', { name: 'Close toast' }),
  ).toBeVisible()
  await expect(page.getByText('Bienvenue', { exact: false })).toHaveCount(0)
  const toastBox = await welcomeBackToast.boundingBox()
  const viewport = page.viewportSize()
  expect(toastBox!.x + toastBox!.width).toBeGreaterThan(viewport!.width / 2)
  expect(toastBox!.y).toBeLessThan(viewport!.height / 2)
})
