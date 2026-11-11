import type { BrowserContext } from '@playwright/test'
import pg from 'pg'

// URL de la base du backend, fournie explicitement : sans elle, le scénario qui
// écrit en base (SM-19) est sauté.
export const DATABASE_URL = process.env.E2E_DATABASE_URL

/** Passe dans le passé la date d'expiration de la session du navigateur (table `session`). */
export async function expireBrowserSession(context: BrowserContext) {
  const cookies = await context.cookies()
  const sessionCookie = cookies.find((cookie) => cookie.name.endsWith('session_token'))
  if (!sessionCookie) {
    throw new Error('Aucun cookie de session Better Auth dans le navigateur.')
  }
  // Valeur du cookie : `<token>.<signature>`, encodée pour l'URL.
  const token = decodeURIComponent(sessionCookie.value).split('.')[0]

  const client = new pg.Client({ connectionString: DATABASE_URL })
  await client.connect()
  try {
    const { rowCount } = await client.query(
      `UPDATE "session" SET "expiresAt" = now() - interval '1 minute' WHERE "token" = $1`,
      [token],
    )
    if (rowCount !== 1) {
      throw new Error(`Session introuvable en base (${rowCount} ligne modifiée).`)
    }
  } finally {
    await client.end()
  }
}
