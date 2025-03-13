import { http } from '@/services/http'
import type { Cart, CartRequest } from '@/types/cart.type'
import type { OrderItemRequest } from '@/types/order.item.request.type'
import type { OrderItem } from '@/types/order.item.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'

export const useCartManualServiceStore = defineStore('manual-service-cart', () => {
  const CART_ENDPOINT = '/cart/calculate'

  const cart = ref<Cart>({
    items: [],
    discount: 0,
    finalPrice: 0,
    originalPrice: 0,
    discountedPrice: 0,
  })

  const requestItems = ref<OrderItemRequest[]>([])
  const cartRequest = ref<CartRequest>({
    atendimentoId: 0,
    credential: '0',
    items: requestItems.value,
  })

  const state = reactive({ loading: false, error: false })
  const valid = computed(() => cart.value.items.length >= 1)

  watch(
    () => requestItems.value,
    () => {
      if (requestItems.value.length && cartRequest.value) {
        calculateManualCartPrice(cartRequest.value)
      }
    },
    { deep: true },
  )

  const initialize = (atendimentoId: number, credential: string) => {
    cartRequest.value.atendimentoId = atendimentoId
    cartRequest.value.credential = credential
  }

  const calculateManualCartPrice = (request: CartRequest) => {
    state.loading = true
    state.error = false
    setTimeout(() => {
      http
        .post(`${CART_ENDPOINT}`, request)
        .then((response) => (cart.value = response.data))
        .catch((e) => {
          state.error = true
          console.log(e)
        })
        .finally(() => (state.loading = false))
    }, 250)
  }

  const addItem = (request: OrderItemRequest) => {
    const orderItem = cart.value.items.find((item) => item.product.code === request.productCode)
    if (orderItem) {
      handleSameProduct(orderItem, request)
      return
    }

    handleNewProduct(request)
  }

  const handleSameProduct = (orderItem: OrderItem, request: OrderItemRequest) => {
    const index = requestItems.value.findIndex(
      (request) => request.productCode === orderItem.product.code,
    )
    if (index !== -1) {
      requestItems.value[index].quantity += request.quantity
    }
  }

  const handleNewProduct = (request: OrderItemRequest) => {
    const requestItem = {
      productCode: request.productCode,
      quantity: request.quantity,
      ...(request.weight && { weight: request.weight }),
    }

    requestItems.value.push(requestItem)
  }

  const removeItem = (code: string) => {
    const index = requestItems.value.findIndex((item) => item.productCode === code)
    if (index === -1) return

    const item = requestItems.value[index]

    item.quantity > 1 ? item.quantity-- : requestItems.value.splice(index, 1)
  }

  return { cart, state, valid, initialize, addItem, removeItem }
})
