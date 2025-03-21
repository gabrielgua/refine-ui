import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTareStore = defineStore('tare', () => {
  const tare = ref<number>(0.412)

  return { tare }
})
