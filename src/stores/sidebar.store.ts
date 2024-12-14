import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('sidebar', () => {
  const state = ref<'expanded' | 'shrunken'>('shrunken')

  const toggle = () => {
    state.value = state.value === 'expanded' ? 'shrunken' : 'expanded'
  }

  return { state, toggle }
})
