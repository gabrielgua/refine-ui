import { http } from '@/services/http'
import type {
  CredentialRange,
  CrendentialRangePaymentType as CredentialRangePaymentType,
  CredentialRangeRequest,
} from '@/types/credential-range.type'
import type { Pagination } from '@/types/pagination.type'
import type { ServerError } from '@/types/server-error.type'
import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useModalStore } from './modal.store'
import { useReportStore } from './report.store'

export type CredentialRangeFilter = {
  size?: number
  page?: number
  paymentType?: CredentialRangePaymentType
}

export const useCredentialRangeStore = defineStore('credential-range', () => {
  const CREDENTIAL_RANGE_ENDPOINT = '/credential-ranges'
  const credentialRanges = ref<CredentialRange[]>([])
  const overlap = ref<{
    verified: boolean
    overlaps: CredentialRange[]
  }>({ verified: false, overlaps: [] })

  const pagination = ref<Pagination<CredentialRange>>()
  const state = reactive({
    listing: { loading: false, error: false },
    single: { loading: false, error: false, success: false },
    overlap: { loading: false, error: false },
  })
  const filter = ref<CredentialRangeFilter>({
    size: 10,
    page: 1,
  })

  const modalStore = useModalStore()
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
        .catch((e) => {
          console.log(e)
          state.listing.error = true
          resetCredentialRanges()
        })
        .finally(() => (state.listing.loading = false))
    }, 250)
  }

  const getOverlapping = (min: number, max: number, id?: number) => {
    state.overlap.loading = true
    setTimeout(() => {
      http
        .get(`${CREDENTIAL_RANGE_ENDPOINT}/overlaps`, { params: { min, max, id } })
        .then((res) => {
          overlap.value.verified = true
          overlap.value.overlaps = res.data
        })
        .catch((e) => console.log(e))
        .finally(() => (state.overlap.loading = false))
    }, 500)
  }

  const save = (cRange: CredentialRangeRequest) => {
    state.single.loading = true
    state.single.error = false
    setTimeout(() => {
      http
        .post(CREDENTIAL_RANGE_ENDPOINT, cRange)
        .then((res) => {
          fetchAll()
          modalStore.success(
            'Credential Range adicionado',
            `Credential Range <span class="text-sky-600 font-semibold">${res.data.name}</span> adicionado com sucesso.`,
            { autoclose: true, waitTime: 1250 },
          )
          state.single.success = true
        })
        .catch((e: AxiosError) => {
          console.log(e)
          const err = e.response ? (e.response.data as ServerError) : e
          modalStore.error('Erro ao adicionar', err.message)
        })
        .finally(() => (state.single.loading = false))
    }, 250)
  }

  const edit = (cRange: CredentialRangeRequest, cRangeId: number) => {
    state.single.loading = true
    state.single.error = false
    setTimeout(() => {
      http
        .put(`${CREDENTIAL_RANGE_ENDPOINT}/${cRangeId}`, cRange)
        .then((res) => {
          fetchAll()
          modalStore.success(
            'Credential Range editado',
            `Credential Range <span class="text-sky-600 font-semibold">${res.data.name}</span> editado com sucesso.`,
            { autoclose: true, waitTime: 1250 },
          )
          state.single.success = true
        })
        .catch((e: AxiosError) => {
          console.log(e)
          const err = e.response ? (e.response.data as ServerError) : e
          modalStore.error('Erro ao editar', err.message)
        })
        .finally(() => (state.single.loading = false))
    }, 250)
  }

  const generateXLSXReport = () => {
    reportStore.generateReport(`${CREDENTIAL_RANGE_ENDPOINT}/xlsx`, 'xlsx', filter.value)
  }

  const request = () => {
    state.listing.loading = true
    state.listing.error = false
  }

  const resetState = () => {
    state.listing.loading = false
    state.listing.error = false
    state.single.loading = false
    state.single.error = false
    state.single.success = false
  }

  const reset = () => {
    resetCredentialRanges()
    resetState()
  }

  const resetCredentialRanges = () => {
    credentialRanges.value = []
  }

  const resetFilter = () => {
    filter.value = {
      page: 1,
      size: filter.value.size,
      paymentType: undefined,
    }
    fetchAll()
  }

  const resetOverlap = () => {
    overlap.value.verified = false
    overlap.value.overlaps = []
  }

  return {
    credentialRanges,
    pagination,
    state,
    filter,
    fetchAll,
    reset,
    resetState,
    resetFilter,
    resetOverlap,
    generateXLSXReport,
    getOverlapping,
    overlap,
    save,
    edit,
  }
})
