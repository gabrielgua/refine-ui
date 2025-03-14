import { http } from '@/services/http'
import type { Client } from '@/types/client.type'
import type { Product } from '@/types/product.type'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useManualServiceStore = defineStore('manual-service', () => {
  const CLIENTS_ENDPOINT = '/clients'
  const PRODUCTS_ENDPOINT = '/products'
  const clients = ref<Client[]>([])
  const client = ref<Client>()

  const products = ref<Product[]>([])
  const product = ref<Product>()

  const state = reactive({
    clients: { loading: false, error: false },
    products: { loading: false, error: false },
  })

  const searchClientsByTerm = (term: string) => {
    state.clients.loading = true
    state.clients.error = false
    http
      .get(`${CLIENTS_ENDPOINT}?term=${term}`)
      .then((res) => (clients.value = res.data))
      .catch((e) => {
        console.log(e)
        state.clients.error = true
      })
      .finally(() => (state.clients.loading = false))
  }

  const searchProductsByTerm = (term: string) => {
    state.products.loading = true
    state.products.error = false

    http
      .get(`${PRODUCTS_ENDPOINT}?term=${term}`)
      .then((res) => (products.value = res.data))
      .catch((e) => {
        console.log(e)
        state.products.error = true
      })
      .finally(() => (state.products.loading = false))
  }

  const selectProduct = (code: string) => {
    product.value = products.value.find((product) => product.code === code)
    products.value = []
    resetOptions()
  }

  const selectClient = (credential: string) => {
    client.value = clients.value.find((client) => client.credential === credential)
    clients.value = []
    resetOptions()
  }

  const resetOptions = () => {
    clients.value = []
    products.value = []
  }

  const resetProduct = () => {
    product.value = undefined
  }

  const reset = () => {
    resetOptions()
    resetProduct()
    client.value = undefined
  }

  return {
    client,
    clients,
    product,
    products,
    state,
    searchProductsByTerm,
    searchClientsByTerm,
    selectClient,
    selectProduct,
    reset,
    resetOptions,
    resetProduct,
  }
})
