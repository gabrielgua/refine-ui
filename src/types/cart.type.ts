import type { OrderItem } from './order.item.type'

export type Cart = {
  items: OrderItem[]
  discount: number
  finalPrice: number
  originalPrice: number
  discountedPrice: number
}
