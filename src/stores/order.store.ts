import { http } from '@/services/http'
import type { OrderItemRequest } from '@/types/order.item.request.type'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useModalStore } from './modal.store'
import { useCartStore } from './cart.store'
import { useClientOrderStore } from './client.order.store'

export const useOrderStore = defineStore('order', () => {
  const ORDER_ENDPOINT = '/orders'

  const modalStore = useModalStore()
  const cartStore = useCartStore()
  const userOrderStore = useClientOrderStore()
  const state = reactive({ loading: false, error: false, success: false })

  const createdNumber = ref<string>('')

  const create = (items: OrderItemRequest[], credential: string, atendimentoId: number) => {
    request()
    setTimeout(() => {
      http
        .post(ORDER_ENDPOINT, { items, credential, atendimentoId })
        .then((res) => handleOrderCreated(res.data.number))
        .catch((e) => {
          console.error(e)
          state.error = true
        })
        .finally(() => (state.loading = false))
    }, 500)
  }

  const handleOrderCreated = (number: string) => {
    modalStore.success('Pedido confirmado', `n.: ${number}`)
    cartStore.reset()
    userOrderStore.reset()
  }

  const request = () => {
    state.loading = true
    state.error = false
    state.success = false
  }

  const reset = () => {
    state.loading = false
    state.error = false
    state.success = false
  }

  return { state, create, reset, createdNumber }
})
