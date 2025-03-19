import type { Store } from './store.type'

export type User = {
  id: number
  name: string
  email: string
  store: Store
  role: UserRole
}

export enum UserRole {
  'ADMIN',
  'SELF_SERVICE',
  'STOCK',
  'TREASURY',
}
