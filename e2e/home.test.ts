import { expect, test } from '@playwright/test'

import { createAccount, newAccount } from './support/accounts.ts'
import { greetingHeading, navbar, visitorHeading } from './support/screen.ts'

const AUTHOR_URL = 'https://www.youtube.com/@videv9858'

test('SM-1 : accueil visiteur non connecté', async ({ page }) => {
  await page.goto('/')

  await expect(visitorHeading(page)).toBeVisible()
  await expect(
    page.getByText('Track tes résultats pour que les jours ne se ressemblent pas.'),
  ).toBeVisible()
  await expect(navbar(page).getByRole('link', { name: 'Se connecter' })).toBeVisible()
  await expect(navbar(page).getByRole('link', { name: 'Créer un compte' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Se déconnecter' })).toHaveCount(0)
})

test('SM-2 : accueil connecté, titre avec le prénom de la session', async ({
  page,
  request,
}) => {
  const account = newAccount()
  await createAccount(request, account)
  await page.goto('/signin')

  await page.getByLabel('Email', { exact: true }).fill(account.email)
  await page.getByLabel('Mot de passe', { exact: true }).fill(account.password)
  await page.getByRole('button', { name: 'Me connecter' }).click()

  await expect(page).toHaveURL('/')
  await expect(greetingHeading(page, 'Marc')).toBeVisible()
  await expect(page.getByText('Renseigne ton daily du jour ci-dessous.')).toBeVisible()
})

test('SM-3 : le lien ViDev du footer ouvre YouTube dans un nouvel onglet', async ({
  page,
  context,
}) => {
  // YouTube est servi en local : le test ne dépend ni du réseau ni de la page de consentement.
  await context.route('https://www.youtube.com/**', (route) =>
    route.fulfill({ contentType: 'text/html', body: '<title>YouTube</title>' }),
  )
  await page.goto('/')
  const newTabPromise = context.waitForEvent('page')

  await page.getByRole('contentinfo').getByRole('link', { name: 'ViDev' }).click()

  const newTab = await newTabPromise
  await expect(newTab).toHaveURL(AUTHOR_URL)
  await expect(page).toHaveURL('/')
  await expect(visitorHeading(page)).toBeVisible()
})
