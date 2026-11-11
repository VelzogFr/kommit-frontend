import { homeContent } from '@/data/home'

export type ArrivalOrigin = 'signup' | 'signin'

export function arrivalToastMessage(
  origin: ArrivalOrigin | undefined,
  firstName: string,
): string | null {
  if (origin === undefined) {
    return null
  }

  const { start, end } = homeContent.arrivalToast[origin]

  return `${start}${firstName}${end}`
}
