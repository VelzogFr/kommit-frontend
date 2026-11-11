import { getJson } from '@/lib/api/apiClient'

// Hors du contrat d'API : les 2 routes de santé servent au setup du repo et
// disparaissent avec les boutons de vérification.
type ProcessHealth = {
  status: 'ok'
  uptime: number
  timestamp: string
}

export const fetchHealth = () => getJson<ProcessHealth>('/health')
