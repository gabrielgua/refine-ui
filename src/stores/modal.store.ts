import { useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ModalType = 'success' | 'error'

export const useModalStore = defineStore('modal', () => {
  const opened = ref<boolean>(false)

  const type = ref<ModalType>('success')
  const title = ref<string>('Ops, Algo aconteceu.')
  const body = ref<string>('Estamos tentando resolver o problema.')

  const toggle = useToggle(opened)

  const open = (modalTitle: string, modalType: ModalType, modalBody?: string) => {
    toggle()
    title.value = modalTitle
    if (modalBody) {
      body.value = modalBody
    }
    type.value = modalType
  }

  const success = (title: string, body?: string) => {
    open(title, 'success', body)
  }

  const error = (title: string, body?: string) => {
    open(title, 'error', body)
  }

  const close = () => {
    toggle()
    title.value = ''
    body.value = ''
    type.value = 'success'
  }

  return { opened, title, body, type, success, error, close }
})
