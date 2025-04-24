import type { BalanceMovementFilter } from '@/components/BalanceMovementsTable.vue'
import { http } from '@/services/http'
import type { BalanceMovement } from '@/types/balance-movement.type'
import type { Client } from '@/types/client.type'
import type { Pagination } from '@/types/pagination.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useReportStore } from './report.store'
import { CrendentialRangePaymentType } from '@/types/credential-range.type'
import { useModalStore } from './modal.store'

export const useBalanceStore = defineStore('balance', () => {
  const CLIENTS_ENDPOINT = '/clients'
  const client = ref<Client>()
  const foundClients = ref<Client[]>([])
  const balanceMovements = ref<BalanceMovement[]>([])
  const pagination = ref<Pagination<BalanceMovement>>()
  const reportStore = useReportStore()
  const modalStore = useModalStore()
  const state = reactive({
    clients: { loading: false, error: false },
    movements: { loading: false, error: false },
    balance: { loading: false, error: false },
  })

  const filters = ref<BalanceMovementFilter>({
    size: 5,
    page: 1,
    dateFrom: '',
    dateTo: '',
    sort: 'DESC',
  })

  const filtersFormated = computed(() => {
    const toISOString = (value: string | undefined) => {
      if (!value) return null
      const date = new Date(value)
      return date.toISOString()
    }

    return {
      ...filters.value,
      dateFrom: toISOString(filters.value.dateFrom),
      dateTo: toISOString(filters.value.dateTo),
    }
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
        .post(`${CLIENTS_ENDPOINT}/${client.value?.credential}/balance-movements`, { amount })
        .then((res) => {
          client.value!.balance = res.data.newBalance
          fetchBalanceMovementsByCredential(client.value!.credential)
        })
        .catch((e) => console.log(e))
        .finally(() => (state.balance.loading = false))
    }, 250)
  }

  const fetchBalanceMovementsByCredential = (credential: string) => {
    state.movements.loading = true
    setTimeout(() => {
      http
        .get(`${CLIENTS_ENDPOINT}/${credential}/balance-movements`, {
          params: filtersFormated.value,
        })
        .then((res) => {
          pagination.value = res.data
          if (pagination.value) {
            balanceMovements.value = pagination.value.content
          }
        })
        .catch((e) => console.log(e))
        .finally(() => (state.movements.loading = false))
    }, 250)
  }

  const generateXLSXReport = () => {
    reportStore.generateReport(
      `${CLIENTS_ENDPOINT}/${client.value?.credential}/balance-movements/xlsx`,
      'xlsx',
      filtersFormated.value,
    )
  }

  const generatePdfReport = () => {
    reportStore.generateReport(
      `${CLIENTS_ENDPOINT}/${client.value?.credential}/balance-movements/pdf`,
      'pdf',
      filtersFormated.value,
    )
  }

  const setSelected = (credential: string) => {
    const found = foundClients.value.find((client) => client.credential === credential)
    if (found) {
      if (
        found.credentialRange &&
        found.credentialRange.paymentType !== CrendentialRangePaymentType.BALANCE_DEBIT
      ) {
        modalStore.error(
          'Tipo de Pagamento Inválido',
          'Este cliente não utiliza <strong>saldo</strong> para o pagamento de compras.',
        )
        client.value = undefined
        return
      }

      client.value = found
      fetchBalanceMovementsByCredential(client.value.credential)
    }
  }
  const resetFoundClients = () => {
    foundClients.value = []
  }

  const reset = () => {
    resetFoundClients()
    balanceMovements.value = []
    client.value = undefined
    state.balance = { loading: false, error: false }
    state.clients = { loading: false, error: false }
    state.movements = { loading: false, error: false }
  }

  return {
    client,
    balanceMovements,
    pagination,
    foundClients,
    state,
    searchClientsByTerm,
    fetchBalanceMovementsByCredential,
    setSelected,
    resetFoundClients,
    adjustClientBalance,
    generateXLSXReport,
    reset,
    filters,
  }
})
