import type { OrderItemRequest } from './order.item.request.type'
import type { OrderItem } from './order.item.type'

export type Cart = {
  items: OrderItem[]
  discount: number
  finalPrice: number
  originalPrice: number
  discountedPrice: number
}

export const CartRequest = {
  credential: '64444',
  atendimentoId: 3,
  items: [{productCode: "7891234567888", quantity: 1}],
}
