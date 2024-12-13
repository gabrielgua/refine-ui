import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useClockStore = defineStore('clock', () => {
  const time = ref<string>()
  const interval = ref<number>()

  const init = () => {
    interval.value = setInterval(() => {
      time.value = Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format()
    }, 1000)
  }

  const clear = () => {
    clearInterval(interval.value)
  }

  return { time, init, clear }
})
