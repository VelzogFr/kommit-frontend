import { expect, test, type Page } from '@playwright/test'

import { createAccount, newAccount, type Account } from './support/accounts.ts'
import { greetingHeading, toastCloseButton, toasts } from './support/screen.ts'

let account: Account

test.beforeAll(async ({ playwright }) => {
  const request = await playwright.request.newContext()
  account = newAccount()
  await createAccount(request, account)
  await request.dispose()
})

// Rejoue SM-14 (signin réussi + toast de retour), précondition des scénarios ci-dessous.
async function signInThroughUi(page: Page) {
  await page.goto('/signin')
  await page.getByLabel('Email', { exact: true }).fill(account.email)
  await page.getByLabel('Mot de passe', { exact: true }).fill(account.password)
  await page.getByRole('button', { name: 'Me connecter' }).click()
  await expect(toasts(page).filter({ hasText: 'Content de te revoir Marc.' })).toBeVisible()
}

test('SM-15 : pas de toast après un rechargement', async ({ page }) => {
  await signInThroughUi(page)

  await page.reload()

  await expect(greetingHeading(page, 'Marc')).toBeVisible()
  await page.waitForLoadState('networkidle')
  await expect(toasts(page)).toHaveCount(0)
})

test('SM-16 : pas de toast après « retour » puis « avancer »', async ({ page }) => {
  await signInThroughUi(page)
  // Le toast de SM-14 est fermé : un toast visible ensuite serait forcément un nouveau.
  await toastCloseButton(page).click()
  await expect(toasts(page)).toHaveCount(0)

  await page.goBack()

  await expect(page).toHaveURL('/signin')
  await expect(toasts(page)).toHaveCount(0)

  await page.goForward()

  await expect(page).toHaveURL('/')
  await expect(greetingHeading(page, 'Marc')).toBeVisible()
  await page.waitForLoadState('networkidle')
  await expect(toasts(page)).toHaveCount(0)
})

test("SM-17 : pas de toast à l'ouverture directe avec une session persistée", async ({
  page,
  context,
}) => {
  await signInThroughUi(page)
  const newTab = await context.newPage()

  await newTab.goto('/')

  await expect(greetingHeading(newTab, 'Marc')).toBeVisible()
  await newTab.waitForLoadState('networkidle')
  await expect(toasts(newTab)).toHaveCount(0)
})
