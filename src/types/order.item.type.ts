import type { Product } from './product.type'

export type OrderItem = {
  id: number
  quantity: number
  unitPrice: number
  totalPrice: number
  product: Product
  weight?: number
}
