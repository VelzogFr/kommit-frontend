import { getJson } from '@/lib/api/apiClient'

type DbHealth = { status: 'ok'; latency: number } | { status: 'unreachable' }

// Le backend répond 503 avec un corps exploitable quand la base est
// injoignable : ce statut fait partie de la route, il ne vaut pas erreur.
export const fetchDbHealth = () => getJson<DbHealth>('/db-health', [200, 503])
