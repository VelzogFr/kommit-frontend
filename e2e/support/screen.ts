import type { Page } from '@playwright/test'

export const visitorHeading = (page: Page) =>
  page.getByRole('heading', { name: 'Prêt(e) pour ton daily standup ?' })

export const greetingHeading = (page: Page, firstName: string) =>
  page.getByRole('heading', { name: `Quoi de neuf aujourd'hui, ${firstName} ?` })

// Les toasts Sonner vivent dans la région « Notifications ».
export const toasts = (page: Page) =>
  page.getByRole('region', { name: /Notifications/ }).getByRole('listitem')

export const toastCloseButton = (page: Page) =>
  page.getByRole('button', { name: 'Close toast' })

export const navbar = (page: Page) => page.getByRole('banner')
