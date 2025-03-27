import { http } from '@/services/http'
import type { Client } from '@/types/client.type'
import type { OrderRequest } from '@/types/order.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useCartStore } from './cart.store'
import { useMandatoryProductsStore } from './mandatory-products.store'
import { useModalStore } from './modal.store'
import { useScheduleStore } from './schedule.store'

export const useSelfServiceOrderStore = defineStore('self-service-order', () => {
  const ORDER_ENDPOINT = '/orders'
  const CLIENT_ENDPOINT = '/clients'

  const client = ref<Client>()
  const atendimento = computed(() => scheduleStore.current)

  const cartStore = useCartStore()
  const modalStore = useModalStore()
  const scheduleStore = useScheduleStore()
  const mandatoryProductStore = useMandatoryProductsStore()

  const state = reactive({ loading: false, error: false, success: false })
  const orderNumber = ref<string>('')

  const openOrder = (credential: string) => {
    request()
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

  const createOrder = (orderRequest: OrderRequest) => {
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
    }, 250)
  }

  const handleOrderOpened = async () => {
    if (!atendimento.value) return

    await mandatoryProductStore.getMandatoryProductsForAtendimento(atendimento.value.id)
    if (mandatoryProductStore.products && mandatoryProductStore.products.length) {
      mandatoryProductStore.products.forEach((product) => {
        cartStore.addItem(product.code)
      })
    }
  }

  const handleOrderCreated = (number: string) => {
    modalStore.success('Pedido confirmado', `n.: ${number}`, { autoclose: true })
    reset()
    cartStore.reset()
    mandatoryProductStore.reset()
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
