import type { CredentialRange } from './credential-range.type'

export type Client = {
  credential: string
  name: string
  role: string
  balance?: number
  freeOfCharge: boolean
  credentialRange: CredentialRange
}
