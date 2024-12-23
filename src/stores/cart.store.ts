import { http } from '@/services/http'
import type { Cart } from '@/types/cart.type'
import type { OrderItemRequest } from '@/types/order.item.request.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useModalStore } from './modal.store'
import { useUserOrderStore } from './user.order.store'
import { useScheduleStore } from './schedule.store'

export const useCartStore = defineStore('cart', () => {
  const CART_ENDPOINT = '/cart/calculate'
  const user = computed(() => useUserOrderStore().user)
  const modalStore = useModalStore()

  const state = reactive({ loading: false, error: false })
  const valid = computed(() => cart.value.items.length >= 1)
  const requestItems = ref<OrderItemRequest[]>([])
  const atendimentoId = computed(() => useScheduleStore().current?.id)

  const cart = ref<Cart>({
    items: [],
    discount: 0,
    discountedPrice: 0,
    finalPrice: 0,
    originalPrice: 0,
  })

  const add = (code: string) => {
    const item = find(code)

    if (item) {
      item.quantity += 1
      calculate()
      return
    }

    calculate(code)
  }

  const remove = (code: string) => {
    const item = find(code)

    if (!item) {
      return
    }

    if (item.quantity === 1) {
      cart.value.items = cart.value.items.filter((item) => item.product.code !== code)
    } else {
      item.quantity -= 1
    }

    calculate()
  }

  const setRequestItems = (code?: string) => {
    requestItems.value = cart.value.items.map((item) => ({
      productCode: item.product.code,
      quantity: item.quantity,
    }))

    if (code) {
      requestItems.value.push({ productCode: code, quantity: 1 })
    }
  }

  const find = (code: string) => {
    return cart.value.items.find((item) => item.product.code === code)
  }

  const calculate = (code?: string) => {
    if (!cart.value || !user.value) {
      return
    }

    setRequestItems(code)

    request()
    setTimeout(() => {
      http
        .post(CART_ENDPOINT, {
          atendimentoId: atendimentoId.value,
          items: requestItems.value,
          credential: user.value?.credential,
        })
        .then((res) => {
          cart.value = res.data
        })
        .catch((e) => {
          if (code) {
            removeRequestItem(code)
          }

          modalStore.error(
            'Erro ao adicionar ao carrinho',
            'Produto não foi encontrado ou não pode ser servido nesse atendimento.',
          )
        })
        .finally(() => (state.loading = false))
    }, 500)
  }

  const removeRequestItem = (code: string) => {
    const found = requestItems.value.find((item) => item.productCode === code)
    if (found) {
      requestItems.value = requestItems.value.filter((item) => item.productCode !== code)
    }

    console.log(code, requestItems.value)
  }

  const reset = () => {
    state.loading = false
    state.error = false

    cart.value = {
      discount: 0,
      discountedPrice: 0,
      finalPrice: 0,
      items: [],
      originalPrice: 0,
    }
  }

  const request = () => {
    state.error = false
    state.loading = true
  }

  return { cart, state, valid, add, remove, reset, requestItems }
})
