import { http } from '@/services/http'
import type {
  CredentialRange,
  CrendentialRangePaymentType as CredentialRangePaymentType,
} from '@/types/credential-range.type'
import type { Pagination } from '@/types/pagination.type'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useReportStore } from './report.store'

export type CredentialRangeFilter = {
  size?: number
  page?: number
  paymentType?: CredentialRangePaymentType
}

export const useCredentialRangeStore = defineStore('credential-range', () => {
  const CREDENTIAL_RANGE_ENDPOINT = '/credential-ranges'
  const credentialRanges = ref<CredentialRange[]>([])
  const pagination = ref<Pagination<CredentialRange>>()
  const state = reactive({ loading: false, error: false })
  const filter = ref<CredentialRangeFilter>({
    size: 10,
    page: 1,
  })

  const reportStore = useReportStore()

  const fetchAll = () => {
    request()
    setTimeout(() => {
      http
        .get(CREDENTIAL_RANGE_ENDPOINT, { params: filter.value })
        .then((res) => {
          pagination.value = res.data
          if (pagination.value) {
            credentialRanges.value = pagination.value.content
          }
        })
        .catch((e) => console.log(e))
        .finally(() => (state.loading = false))
    }, 250)
  }

  const generateXLSXReport = () => {
    reportStore.generateReport(`${CREDENTIAL_RANGE_ENDPOINT}/xlsx`, 'xlsx', filter.value)
  }

  const request = () => {
    state.loading = true
    state.error = false
  }

  const reset = () => {
    credentialRanges.value = []
    state.loading = false
    state.error = false
  }

  const resetFilter = () => {
    filter.value = {
      page: 1,
      size: filter.value.size,
      paymentType: undefined,
    }
    fetchAll()
  }

  return {
    credentialRanges,
    pagination,
    state,
    filter,
    fetchAll,
    reset,
    resetFilter,
    generateXLSXReport,
  }
})
