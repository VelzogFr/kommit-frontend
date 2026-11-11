import type { ApiError } from '@/types/apiContract'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

/** Une réponse d'erreur du backend, déjà au format `ApiError` du contrat. */
export class ApiRequestError extends Error {
  readonly apiError: ApiError

  constructor(apiError: ApiError) {
    super(apiError.message)
    this.apiError = apiError
  }
}

const isApiError = (body: unknown): body is ApiError =>
  typeof body === 'object' &&
  body !== null &&
  'code' in body &&
  'message' in body

const request = async <T>(
  path: string,
  init: RequestInit,
  acceptedStatuses: number[],
): Promise<T> => {
  // Le front (5173) et le back (3000) n'ont pas la même origine : sans
  // `credentials: 'include'`, le cookie de session n'est pas envoyé (RM8, RM12).
  const response = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: 'include',
  })

  if (!acceptedStatuses.includes(response.status)) {
    const body: unknown = await response.json().catch(() => null)

    if (isApiError(body)) {
      throw new ApiRequestError(body)
    }

    throw new Error(`${path} a répondu ${response.status}.`)
  }

  return (await response.json()) as T
}

export const getJson = <T>(path: string, acceptedStatuses: number[] = [200]) =>
  request<T>(path, { method: 'GET' }, acceptedStatuses)

export const postJson = <T>(path: string, body: unknown = {}) =>
  request<T>(
    path,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
    [200],
  )
