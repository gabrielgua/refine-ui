import type { Atendimento } from './atendimento.type'
import type { OrderItemRequest } from './order.item.request.type'
import type { OrderItem } from './order.item.type'
import type { User } from './user.type'

export type Order = {
  id: number
  number: string
  finalPrice: number
  originalPrice: number
  discountedPrice: number
  user: User
  atendimento: Atendimento
  items: OrderItem[]
  createdAt: Date
}

export type OrderRequest = {
  credential: string
  atendimentoId: number
  storeId: number
  items: OrderItemRequest[]
}
