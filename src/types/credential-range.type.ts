export type CredentialRange = {
  id?: number
  name?: string
  min?: number
  max?: number
  paymentType?: CrendentialRangePaymentType
  createdAt?: Date
}

export enum CrendentialRangePaymentType {
  BALANCE_DEBIT = 'BALANCE_DEBIT',
  PAYROLL_DEBIT = 'PAYROLL_DEBIT',
  COURTESY = 'COURTESY',
}

export type CredentialRangeRequest = {
  name?: string
  min?: number
  max?: number
  paymentType?: CrendentialRangePaymentType
}
