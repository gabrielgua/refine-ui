import { http } from '@/services/http'
import type { Cart, CartRequest } from '@/types/cart.type'
import type { OrderItemRequest } from '@/types/order.item.request.type'
import type { OrderItem } from '@/types/order.item.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useModalStore } from './modal.store'
import type { AxiosError } from 'axios'
import type { ServerError } from '@/types/server-error.type'

export const useManualServiceCartStore = defineStore('manual-service-cart', () => {
  const CART_ENDPOINT = '/cart/calculate'

  const { error } = useModalStore()

  const cart = ref<Cart>({
    items: [],
    discount: 0,
    finalPrice: 0,
    originalPrice: 0,
    discountedPrice: 0,
  })

  const cartRequest = ref<CartRequest>({
    atendimentoId: 0,
    credential: '',
    items: [],
  })

  const isCartRequestValid = computed(
    () =>
      cartRequest.value.atendimentoId !== 0 &&
      cartRequest.value.credential.length &&
      cartRequest.value.items.length,
  )

  const state = reactive({ loading: false, error: false })
  const valid = computed(() => cart.value.items.length >= 1)

  watch(
    cartRequest,
    () => {
      if (!isCartRequestValid.value) {
        if (!cartRequest.value.items.length) {
          resetCart()
        }
        return
      }

      calculateManualCartPrice()
    },
    { deep: true },
  )

  const setCredential = (credential: string) => {
    cartRequest.value.credential = credential.trim()
  }

  const setAtendimentoId = (atendimentoId: number) => {
    cartRequest.value.atendimentoId = atendimentoId
  }

  const calculateManualCartPrice = () => {
    state.loading = true
    state.error = false
    setTimeout(() => {
      http
        .post(`${CART_ENDPOINT}`, cartRequest.value)
        .then((response) => (cart.value = response.data))
        .catch((e: AxiosError) => {
          resetCart()
          state.error = true
          error('Erro ao calcular o preço do carrinho', (e.response?.data as ServerError).message)
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
    const index = cartRequest.value.items.findIndex(
      (request) => request.productCode === orderItem.product.code,
    )
    if (index !== -1) {
      cartRequest.value.items[index].quantity += request.quantity
    }
  }

  const handleNewProduct = (request: OrderItemRequest) => {
    const requestItem = {
      productCode: request.productCode,
      quantity: request.quantity,
      ...(request.weight && { weight: request.weight }),
    }

    cartRequest.value.items.push(requestItem)
  }

  const removeItem = (code: string) => {
    const index = cartRequest.value.items.findIndex((item) => item.productCode === code)
    if (index === -1) {
      return
    }
    const item = cartRequest.value.items[index]
    item.quantity > 1 ? item.quantity-- : cartRequest.value.items.splice(index, 1)
  }

  const resetCart = () => {
    cart.value = {
      items: [],
      discount: 0,
      finalPrice: 0,
      originalPrice: 0,
      discountedPrice: 0,
    }
  }

  const reset = () => {
    resetCart()
    cartRequest.value = {
      atendimentoId: 0,
      credential: '',
      items: [],
    }
  }

  return { cart, state, valid, addItem, removeItem, setCredential, setAtendimentoId, reset }
})
