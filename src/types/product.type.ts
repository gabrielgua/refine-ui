export type ProductPrice = 'PRICE_PER_KG' | 'PRICE_PER_UNIT'

export type Product = {
  id: number
  code: string
  name: string
  price: number
  type: ProductPrice
}
