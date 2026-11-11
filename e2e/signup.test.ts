import { expect, test, type Page } from '@playwright/test'

import { createAccount, newAccount, type Account } from './support/accounts.ts'
import {
  greetingHeading,
  navbar,
  toastCloseButton,
  toasts,
} from './support/screen.ts'

const EMAIL_INVALID = "L'email n'est pas valide."
const PASSWORD_TOO_SHORT = 'Le mot de passe doit contenir au moins 8 caractères.'
// `message` de l'ApiError EMAIL_ALREADY_EXISTS renvoyé par le backend.
const EMAIL_ALREADY_EXISTS = 'Un compte avec cet email existe déjà'

const firstNameField = (page: Page) => page.getByLabel('Prénom*', { exact: true })
const emailField = (page: Page) => page.getByLabel('Email*', { exact: true })
const passwordField = (page: Page) => page.getByLabel('Mot de passe*', { exact: true })
const submitButton = (page: Page) => page.getByRole('button', { name: 'Créer un compte' })

async function fillSignup(page: Page, account: Account) {
  await firstNameField(page).fill(account.name)
  await emailField(page).fill(account.email)
  await passwordField(page).fill(account.password)
}

const isSignupRequest = (url: string, method: string) =>
  method === 'POST' && url.includes('/api/auth/sign-up/email')

test.beforeEach(async ({ page }) => {
  await page.goto('/signup')
})

test('SM-6 : erreur affichée à la soumission, puis effacée pendant la saisie', async ({
  page,
}) => {
  await fillSignup(page, { name: 'Marc', email: 'marc.test.dev', password: 'abc' })

  await expect(page.getByText(EMAIL_INVALID)).toHaveCount(0)
  await expect(page.getByText(PASSWORD_TOO_SHORT)).toHaveCount(0)
  await expect(submitButton(page)).toBeEnabled()

  await submitButton(page).click()

  await expect(emailField(page)).toHaveAttribute('aria-invalid', 'true')
  await expect(emailField(page)).toHaveAccessibleDescription(EMAIL_INVALID)
  await expect(passwordField(page)).toHaveAttribute('aria-invalid', 'true')
  await expect(passwordField(page)).toHaveAccessibleDescription(PASSWORD_TOO_SHORT)
  await expect(page).toHaveURL('/signup')

  await passwordField(page).press('End')
  await passwordField(page).pressSequentially('defgh')

  await expect(page.getByText(PASSWORD_TOO_SHORT)).toHaveCount(0)
  await expect(passwordField(page)).not.toHaveAttribute('aria-invalid', 'true')
  await expect(emailField(page)).toHaveAttribute('aria-invalid', 'true')
  await expect(emailField(page)).toHaveAccessibleDescription(EMAIL_INVALID)
})

test("SM-8 : un double-clic n'envoie qu'une requête", async ({ page }) => {
  const signupRequests: string[] = []
  page.on('request', (request) => {
    if (isSignupRequest(request.url(), request.method())) {
      signupRequests.push(request.url())
    }
  })
  await fillSignup(page, newAccount())

  await submitButton(page).dblclick()

  await expect(page).toHaveURL('/')
  await expect(greetingHeading(page, 'Marc')).toBeVisible()
  expect(signupRequests).toHaveLength(1)
  await expect(page.getByText(EMAIL_ALREADY_EXISTS)).toHaveCount(0)
})

test('SM-9 : email déjà pris, message sous le champ Email', async ({ page, request }) => {
  const existingAccount = newAccount()
  await createAccount(request, existingAccount)
  await fillSignup(page, existingAccount)

  await submitButton(page).click()

  await expect(emailField(page)).toHaveAccessibleDescription(EMAIL_ALREADY_EXISTS)
  await expect(emailField(page)).toHaveAttribute('aria-invalid', 'true')
  await expect(page).toHaveURL('/signup')
  await expect(toasts(page)).toHaveCount(0)
})

test('SM-11 : signup réussi, retour sur l’accueil connecté', async ({ page }) => {
  await fillSignup(page, newAccount())

  await submitButton(page).click()

  await expect(page).toHaveURL('/')
  await expect(greetingHeading(page, 'Marc')).toBeVisible()
  await expect(navbar(page).getByRole('button', { name: 'Se déconnecter' })).toBeVisible()
  await expect(navbar(page).getByRole('link', { name: 'Se connecter' })).toHaveCount(0)
  await expect(navbar(page).getByRole('link', { name: 'Créer un compte' })).toHaveCount(0)
})

test('SM-13 : toast de bienvenue après un signup', async ({ page }) => {
  await fillSignup(page, newAccount())

  await submitButton(page).click()

  const welcomeToast = toasts(page).filter({
    hasText: 'Bienvenue Marc, ton compte est créé.',
  })
  await expect(welcomeToast).toBeVisible()
  await expect(welcomeToast.getByRole('button', { name: 'Close toast' })).toBeVisible()
  await expect(toastCloseButton(page)).toHaveCount(1)
  const toastBox = await welcomeToast.boundingBox()
  const viewport = page.viewportSize()
  expect(toastBox!.x + toastBox!.width).toBeGreaterThan(viewport!.width / 2)
  expect(toastBox!.y).toBeLessThan(viewport!.height / 2)
})
