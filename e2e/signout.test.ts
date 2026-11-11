import { expect, test, type Page } from '@playwright/test'

import {
  createAccount,
  newAccount,
  signInThroughApi,
  type Account,
} from './support/accounts.ts'
import { DATABASE_URL, expireBrowserSession } from './support/database.ts'
import { greetingHeading, navbar, toasts, visitorHeading } from './support/screen.ts'

let account: Account

test.beforeAll(async ({ playwright }) => {
  const request = await playwright.request.newContext()
  account = newAccount()
  await createAccount(request, account)
  await request.dispose()
})

// Session ouverte via l'API puis accueil ouvert directement : connecté, aucun toast.
test.beforeEach(async ({ page }) => {
  await signInThroughApi(page, account)
  await page.goto('/')
  await expect(greetingHeading(page, 'Marc')).toBeVisible()
})

async function expectSilentVisitorHome(page: Page) {
  await expect(visitorHeading(page)).toBeVisible()
  await expect(navbar(page).getByRole('link', { name: 'Se connecter' })).toBeVisible()
  await expect(navbar(page).getByRole('link', { name: 'Créer un compte' })).toBeVisible()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByRole('alertdialog')).toHaveCount(0)
  await expect(toasts(page)).toHaveCount(0)
}

test('SM-18 : déconnexion silencieuse', async ({ page }) => {
  await expect(toasts(page)).toHaveCount(0)

  await navbar(page).getByRole('button', { name: 'Se déconnecter' }).click()

  await expectSilentVisitorHome(page)

  await page.reload()

  await expectSilentVisitorHome(page)
})

test('SM-19 : session expirée, accueil non connecté sans message', async ({
  page,
  context,
}) => {
  test.skip(!DATABASE_URL, 'E2E_DATABASE_URL absent : SM-19 doit écrire dans la base du backend.')
  await expireBrowserSession(context)

  await page.reload()

  await expectSilentVisitorHome(page)
  await expect(page.getByRole('alert')).toHaveCount(0)
})
