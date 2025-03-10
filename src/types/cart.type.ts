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
  credential: '10891',
  atendimentoId: 2,
  items: [{productCode: "7891234567899", quantity: 1}],
}
