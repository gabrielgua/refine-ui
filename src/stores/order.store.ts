import { http } from '@/services/http'
import { AtendimentoCode } from '@/types/atendimento.type'
import type { Client } from '@/types/client.type'
import type { OrderItemRequest } from '@/types/order.item.request.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useCartStore } from './cart.store'
import { useModalStore } from './modal.store'
import { useScheduleStore } from './schedule.store'

export const useOrderStore = defineStore('order', () => {
  const ORDER_ENDPOINT = '/orders'
  const CLIENT_ENDPOINT = '/clients'

  const defaultProducts: Map<AtendimentoCode, string> = new Map([
    [AtendimentoCode.ALMOCO, '7891234567886'], //almoço product,
    [AtendimentoCode.JANTAR, '7891234567887'], //jantar product,
  ])

  const atendimentoHasDefaultProduct = computed(() => {
    return (
      atendimento.value?.code === AtendimentoCode.ALMOCO ||
      atendimento.value?.code === AtendimentoCode.JANTAR
    )
  })

  const client = ref<Client>()
  const atendimento = computed(() => scheduleStore.current)
  const cartStore = useCartStore()
  const modalStore = useModalStore()
  const scheduleStore = useScheduleStore()

  const state = reactive({ loading: false, error: false, success: false })
  const orderNumber = ref<string>('')

  const openOrder = (credential: string) => {
    request()

    console.log('opening order for client: ', credential)

    setTimeout(() => {
      http
        .get(`${CLIENT_ENDPOINT}/${credential}`)
        .then((res) => {
          client.value = res.data
          if (client.value) {
            handleOrderOpened()
          }
        })
        .catch((e) => {
          console.error(e)
          state.error = true
          modalStore.error(
            'Erro ao abrir a comanda.',
            'Verifique se o crachá foi lido corretamente e tente novamente.',
          )
        })
        .finally(() => (state.loading = false))
    }, 250)
  }

  const createOrder = (items: OrderItemRequest[], credential: string, atendimentoId: number) => {
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

  const handleOrderOpened = () => {
    if (!atendimento.value) return

    if (atendimentoHasDefaultProduct.value) {
      cartStore.addItem(defaultProducts.get(atendimento.value.code)!) //almoço product code
    }
  }

  const handleOrderCreated = (number: string) => {
    modalStore.success('Pedido confirmado', `n.: ${number}`)
    reset()
    cartStore.reset()
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
    client.value = undefined
  }

  return { state, reset, openOrder, createOrder, orderNumber, client }
})
