import { http } from '@/services/http'
import type { CartRequest } from '@/types/cart.type'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useModalStore } from './modal.store'
import { useManualServiceStore } from './manual-service.store'
import { useManualServiceCartStore } from './manual-service-cart.store'

export const useManualServiceOrderStore = defineStore('manual-service-order', () => {
  const ORDER_ENDPOINT = '/orders'
  const state = reactive({ loading: false, error: false })

  const { success } = useModalStore()
  const manualServiceStore = useManualServiceStore()
  const manualServiceCartStore = useManualServiceCartStore()

  const createOrder = (orderRequest: CartRequest) => {
    request()
    setTimeout(() => {
      http
        .post(ORDER_ENDPOINT, orderRequest)
        .then((res) => handleOrderCreated(res.data.number))
        .catch((e) => {
          console.error(e)
          state.error = true
        })
        .finally(() => (state.loading = false))
    }, 500)
  }

  const handleOrderCreated = (number: string) => {
    success('Pedido confirmado', `n.: ${number}`)
    manualServiceStore.reset()
    manualServiceCartStore.reset()
  }

  const request = () => {
    state.loading = true
    state.error = false
  }

  return { state, createOrder }
})
