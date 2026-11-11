import { getJson, postJson } from '@/lib/api/apiClient'
import type { Session } from '@/types/apiContract'

// Routes fournies par Better Auth, montées par le backend sous /api/auth.
const AUTH_PATH = '/api/auth'

type SignupBody = { name: string; email: string; password: string }
type SigninBody = { email: string; password: string }

export const signUp = (body: SignupBody) =>
  postJson<unknown>(`${AUTH_PATH}/sign-up/email`, body)

export const signIn = (body: SigninBody) =>
  postJson<unknown>(`${AUTH_PATH}/sign-in/email`, body)

export const signOut = () => postJson<unknown>(`${AUTH_PATH}/sign-out`)

export const getSession = () => getJson<Session>(`${AUTH_PATH}/get-session`)
