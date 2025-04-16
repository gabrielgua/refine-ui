export type BalanceMovement = {
  id: number
  credential: string
  type: BalanceMovementType
  amount: number
  oldBalance: number
  newBalance: number
  timestamp: Date
}

export enum BalanceMovementType {
  'ADJUSTMENT' = 'ADJUSTMENT',
  'PURCHASE' = 'PURCHASE',
}
