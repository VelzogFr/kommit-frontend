import { expect, test } from '@playwright/test'

import { navbar } from './support/screen.ts'

test('SM-4 : « Créer un compte » mène au signup', async ({ page }) => {
  await page.goto('/')

  await navbar(page).getByRole('link', { name: 'Créer un compte' }).click()

  await expect(page).toHaveURL('/signup')
  await expect(page.getByRole('heading', { name: 'Créer un compte' })).toBeVisible()
  await expect(page.getByLabel('Prénom*', { exact: true })).toBeVisible()
  await expect(page.getByLabel('Email*', { exact: true })).toBeVisible()
  await expect(page.getByLabel('Mot de passe*', { exact: true })).toBeVisible()
})

test('SM-5 : « Se connecter » mène au signin', async ({ page }) => {
  await page.goto('/')

  await navbar(page).getByRole('link', { name: 'Se connecter' }).click()

  await expect(page).toHaveURL('/signin')
  await expect(page.getByRole('heading', { name: 'Se connecter' })).toBeVisible()
  await expect(page.getByLabel('Email', { exact: true })).toBeVisible()
  await expect(page.getByLabel('Mot de passe', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Me connecter' })).toBeVisible()
})
