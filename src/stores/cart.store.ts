import { http } from '@/services/http'
import type { Cart, CartRequest } from '@/types/cart.type'
import type { OrderItemRequest } from '@/types/order.item.request.type'
import type { Product } from '@/types/product.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref, watch } from 'vue'
import { useScaleStore } from './scale.store'
import type { OrderItem } from '@/types/order.item.type'
import { useModalStore } from './modal.store'
import { useScheduleStore } from './schedule.store'
import { useOrderStore } from './order.store'

export const useCartStore = defineStore('cart', () => {
  const CART_ENDPOINT = '/cart/calculate'
  const PRODUCTS_ENDPOINT = '/products'

  const cart = ref<Cart>({
    items: [],
    discount: 0,
    finalPrice: 0,
    originalPrice: 0,
    discountedPrice: 0,
  })
  const state = reactive({ loading: false, error: false })
  const valid = computed(() => cart.value.items.length >= 1)

  const modalStore = useModalStore()
  const orderStore = useOrderStore()
  const scaleStore = useScaleStore()

  const weight = computed(() => scaleStore.weight)
  const client = computed(() => orderStore.client)
  const atendimento = computed(() => useScheduleStore().current)

  const itemsRequest = ref<OrderItemRequest[]>([])

 // const calculateManualPrice(request:CartRequest) => {}//todo

  watch(
    () => itemsRequest.value,
    () => {
      if (itemsRequest.value.length) {
        calculateCartPrice()
      }
    },
    { deep: true },
  )

  const addItem = (code: string) => {
    const orderItem = cart.value.items.find((item) => item.product.code === code)
    if (orderItem) {
      handleSameProduct(orderItem)
      return
    }

    handleNewProduct(code)
  }

  const removeItem = (code: string) => {
    const index = itemsRequest.value.findIndex((item) => item.productCode === code)
    if (index === -1) return

    const item = itemsRequest.value[index]

    item.quantity > 1 ? item.quantity-- : itemsRequest.value.splice(index, 1)
  }

  const handleSameProduct = (orderItem: OrderItem) => {
    if (!orderItem.product.allowMultiple) {
      modalStore.error(
        'Erro ao adicionar produto',
        'Esse produto não pode ser adicionado mais de uma vez ao carrinho.',
      )
      return
    }

    const index = itemsRequest.value.findIndex(
      (request) => request.productCode === orderItem.product.code,
    )
    if (index !== -1) {
      itemsRequest.value[index].quantity += 1
    }
  }

  const handleNewProduct = (code: string) => {
    request()
    setTimeout(() => {
      http
        .get(`${PRODUCTS_ENDPOINT}/${code}`)
        .then((res) => {
          const requestItem = {
            productCode: res.data.code,
            quantity: 1,
            ...(res.data.priceType === 'PRICE_PER_KG' && { weight: weight.value }),
          }

          itemsRequest.value.push(requestItem)
        })
        .catch((e) => {
          state.error = true
          console.log(e)
        })
        .finally(() => (state.loading = false))
    }, 250)
  }

  const calculateCartPrice = () => {
    request()
    setTimeout(() => {
      http
        .post(`${CART_ENDPOINT}`, {
          credential: client.value?.credential,
          atendimentoId: atendimento.value?.id,
          items: itemsRequest.value,
        })
        .then((res) => {
          cart.value = res.data
        })
        .catch((e) => {
          state.error = true
          console.log(e)
        })
        .finally(() => (state.loading = false))
    }, 250)
  }

  const calculateManualCartPrice = (request:CartRequest) => {

    setTimeout(() => {
      http
        .post(`${CART_ENDPOINT}`, {
          credential: request.credential,
          atendimentoId: request.atendimentoId,
          items: request.items,
        })
        .then((response) => console.log(response.data))
        .catch((e) => {
          state.error = true
          console.log(e)
        })
        .finally(() => (state.loading = false))
    }, 250)
  }

  const submitCart = () => {
    if (!client.value || !atendimento.value) {
      return
    }

    orderStore.createOrder(itemsRequest.value, client.value.credential, atendimento.value.id)
  }

  const reset = () => {
    itemsRequest.value = []
    cart.value = {
      items: [],
      discount: 0,
      finalPrice: 0,
      originalPrice: 0,
      discountedPrice: 0,
    }
  }

  const request = () => {
    state.error = false
    state.loading = true
  }

  return { cart, state, valid, reset, addItem, removeItem, submitCart, calculateManualCartPrice }
})
