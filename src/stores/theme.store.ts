import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const isDark = useDark()
  const toggle = useToggle(isDark)

  return { isDark, toggle }
})
