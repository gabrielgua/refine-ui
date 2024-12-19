import { http } from '@/services/http'
import type { Cart } from '@/types/cart.type'
import type { OrderItemRequest } from '@/types/order.item.request.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useUserOrderStore } from './user.order.store'

export const useCartStore = defineStore('cart', () => {
  const CART_ENDPOINT = '/cart/calculate'
  const user = computed(() => useUserOrderStore().user)
  const state = reactive({ loading: false, error: false })

  const cart = ref<Cart>({
    items: [],
    discount: 0,
    discountedPrice: 0,
    finalPrice: 0,
    originalPrice: 0,
  })

  const add = (code: string) => {
    if (!cart.value) {
      return
    }

    const item = cart.value.items.find((item) => item.product.code === code)

    if (item) {
      item.quantity += 1
      calculate()
      return
    }

    calculate(code)
  }

  const remove = (code: string) => {
    if (!cart.value) {
      return
    }

    console.log('remove: ', code)

    const item = cart.value.items.find((item) => item.product.code === code)

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

  const calculate = (code?: string) => {
    if (!cart.value || !user.value) {
      return
    }

    const items: OrderItemRequest[] = cart.value.items.map((item) => {
      return { productCode: item.product.code, quantity: item.quantity }
    })

    if (code) {
      items.push({ productCode: code, quantity: 1 })
    }

    request()
    setTimeout(() => {
      http
        .post(CART_ENDPOINT, { items, credential: user.value?.credential })
        .then((res) => {
          cart.value = res.data
        })
        .catch((e) => console.error(e))
        .finally(() => (state.loading = false))
    }, 500)
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

  return { cart, state, add, remove, reset }
})
