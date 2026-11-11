import { homeContent } from '@/data/home'

export type Greeting = { lead: string; highlight: string }

export function composeGreeting(firstName: string): Greeting {
  return {
    lead: homeContent.connected.titleStart,
    highlight: `${firstName} ?`,
  }
}
