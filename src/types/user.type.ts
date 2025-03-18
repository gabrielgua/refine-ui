export type User = {
  id: number
  name: string
  email: string
  store: string
  role: UserRole
}

export enum UserRole {
  'ADMIN',
  'SELF_SERVICE',
  'STOCK',
  'TREASURY',
}
