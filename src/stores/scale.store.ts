import { defineStore } from 'pinia'
import { useScaleServerStore } from './scale-server.store'
import { computed, ref, watch } from 'vue'

export const useScaleStore = defineStore('scale', () => {
  const serverStore = useScaleServerStore()

  const defaultWeight = 0.876

  const weight = ref<number>(defaultWeight)
  const data = computed(() => serverStore.data)

  watch(
    () => data.value,
    () => {
      weight.value = Number.parseFloat(data.value)
    },
  )

  const read = () => {
    serverStore.connect()
  }

  const stop = () => {
    serverStore.close()
  }

  const reset = () => {
    stop()
    weight.value = defaultWeight
  }

  return { weight, read, stop, reset }
})
