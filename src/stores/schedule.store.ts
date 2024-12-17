import { http } from '@/services/http'
import type { Schedule } from '@/types/schedule.type'
import { formatAtendimentoTime, parseTime } from '@/utils/dates'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useScheduleStore = defineStore('schedule', () => {
  const SCHEDULE_ENDPOINT = '/atendimentos/schedule'
  const schedule = ref<Schedule>()
  const state = reactive({ loading: false, error: false })

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

  return { schedule, state, fetch }
})
