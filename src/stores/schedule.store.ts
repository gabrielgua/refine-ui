import { http } from '@/services/http'
import type { Atendimento } from '@/types/atendimento.type'
import type { Schedule } from '@/types/schedule.type'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { useSelfServiceOrderStore } from './self-service-order-store'

export const useScheduleStore = defineStore('schedule', () => {
  const SCHEDULE_ENDPOINT = '/atendimentos/schedule'
  const schedule = ref<Schedule>()
  const state = reactive({ loading: false, error: false })

  const client = computed(() => useSelfServiceOrderStore().client)

  const current = computed<Atendimento | undefined>(() => {
    if (!schedule.value) {
      return
    }

    if (!schedule.value.current) {
      if (!client.value) {
        return
      }
      return schedule.value.previous
    }

    return schedule.value.current
  })

  const fetch = () => {
    state.loading = true
    setTimeout(() => {
      http
        .get(SCHEDULE_ENDPOINT)
        .then((res) => {
          schedule.value = res.data
        })
        .catch((e) => {
          console.error(e)
          state.error = true
        })
        .finally(() => (state.loading = false))
    }, 500)
  }

  const reset = () => {
    state.error = false
    state.loading = false
    schedule.value = undefined
  }

  return { schedule, current, state, fetch, reset }
})
