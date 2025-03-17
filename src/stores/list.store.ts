import { defineStore } from 'pinia'
import { http } from '@/services/http'
import { computed, reactive } from 'vue'
import type { AxiosResponse } from 'axios'
import type { Order } from '@/types/order.type'
import type { Client } from '@/types/client.type'

export const useListStore = defineStore('order-list', () => {
  const ORDERS_ENDPOINT = '/orders'
  const CLIENTS_ENDPOINT = '/clients'
  const state = reactive({
    loading: false,
    error: false,
  })

  const lists = reactive ({
    weekOrderList: [] as Order[],
    monthOrderList: [] as Order[],
    clientList: [] as Client[],

  })

  const fetchOrdersThisWeek = () => {
    state.loading = true
    state.error = false

    setTimeout(() => {
      const today = new Date()
      // Calculate last Sunday as the beginning of the week
      const diff = today.getDay()
      const lastSunday = new Date(today)
      lastSunday.setDate(today.getDate() - diff)
      lastSunday.setHours(0, 0, 0, 0)
      const dateFrom = lastSunday.toISOString()

      http.get(ORDERS_ENDPOINT, { params: { dateFrom } })
        .then((response: AxiosResponse<Order[]>) => {
          lists.weekOrderList = response.data
        })
        .catch((err) => {
          console.error(err)
          state.error = true
        })
        .finally(() => {
          state.loading = false
        })
    }, 0)
  }

  const fetchOrdersThisMonth = () => {
    state.loading = true
    state.error = false

    setTimeout(() => {
      const today = new Date()
      // Calculate the first day of the current month
      const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      firstOfMonth.setHours(0, 0, 0, 0)
      const dateFrom = firstOfMonth.toISOString()

      http.get(ORDERS_ENDPOINT, { params: { dateFrom } })
        .then((response: AxiosResponse<Order[]>) => {
          lists.monthOrderList = response.data
        })
        .catch((err) => {
          console.error(err)
          state.error = true
        })
        .finally(() => {
          state.loading = false
        })
    }, 0)
  }

  const fetchClients = () => {
    state.loading = true
    state.error = false

    setTimeout(() => {
      http.get(CLIENTS_ENDPOINT)
        .then((response: AxiosResponse<Client[]>) => {
          lists.clientList = response.data
        })
        .catch((err) => {
          console.error(err)
          state.error = true
        })
        .finally(() => {
          state.loading = false
        })
    }, 0)
  }


  const weekOrdersCount = computed(() => lists.weekOrderList.length)
  const monthOrdersCount = computed(() => lists.monthOrderList.length)
  const clientsCount = computed(() => lists.clientList.length)

  const weekFinalPriceTotal = computed(() =>
    lists.weekOrderList.reduce((total, order) => total + order.finalPrice, 0)
  )

  const monthFinalPriceTotal = computed(() =>
    lists.monthOrderList.reduce((total, order) => total + order.finalPrice, 0)
  )

  return {
    fetchOrdersThisWeek,
    fetchOrdersThisMonth,
    fetchClients,
    state,
    weekOrdersCount,
    monthOrdersCount,
    clientsCount,
    weekFinalPriceTotal,
    monthFinalPriceTotal
  }
})
