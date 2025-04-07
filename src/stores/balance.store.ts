import { http } from '@/services/http'
import type { BalanceMovement } from '@/types/balance-movement.type'
import type { Client } from '@/types/client.type'
import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useBalanceStore = defineStore('balance', () => {
  const CLIENTS_ENDPOINT = '/clients'
  const client = ref<Client>()
  const foundClients = ref<Client[]>([])
  const balanceMovements = ref<BalanceMovement[]>([])
  const state = reactive({
    clients: { loading: false, error: false },
    movements: { loading: false, error: false },
    balance: { loading: false, error: false },
  })

  const searchClientsByTerm = (term: string) => {
    state.clients.loading = true
    state.clients.error = false
    http
      .get(`${CLIENTS_ENDPOINT}?term=${term}`)
      .then((res) => (foundClients.value = res.data))
      .catch((e) => {
        console.log(e)
        state.clients.error = true
      })
      .finally(() => (state.clients.loading = false))
  }

  const adjustClientBalance = (amount: number) => {
    if (amount === 0) {
      return
    }

    state.balance.loading = true
    setTimeout(() => {
      http
        .post(`${CLIENTS_ENDPOINT}/${client.value?.credential}/balance`, { amount })
        .then((res: AxiosResponse) => {
          balanceMovements.value.push(res.data)
          client.value!.balance = res.data.newBalance
        })
        .catch((e) => console.log(e))
        .finally(() => (state.balance.loading = false))
    }, 250)
  }

  const fetchBalanceMovementsByCredential = (credential: string) => {
    state.movements.loading = true
    setTimeout(() => {
      http
        .get(`${CLIENTS_ENDPOINT}/${credential}/balance`)
        .then((res) => (balanceMovements.value = res.data))
        .catch((e) => console.log(e))
        .finally(() => (state.movements.loading = false))
    }, 250)
  }

  const setSelected = (credential: string) => {
    const found = foundClients.value.find((client) => client.credential === credential)
    if (found) {
      client.value = found
      fetchBalanceMovementsByCredential(client.value.credential)
    }
  }
  const resetFoundClients = () => {
    foundClients.value = []
  }

  return {
    client,
    balanceMovements,
    foundClients,
    state,
    searchClientsByTerm,
    setSelected,
    resetFoundClients,
    adjustClientBalance,
  }
})
