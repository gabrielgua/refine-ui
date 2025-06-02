import { useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ModalType = 'success' | 'error'
type ModalOptions = {
  autoclose?: boolean
  waitTime?: number
}

export const useModalStore = defineStore('modal', () => {
  const opened = ref<boolean>(false)

  const type = ref<ModalType>('success')
  const title = ref<string>('Ops, Algo aconteceu.')
  const body = ref<string>('Estamos tentando resolver o problema.')

  const autocloseWaitTime = ref<number>(1000)

  const open = (
    modalTitle: string,
    modalType: ModalType,
    modalBody?: string,
    options?: ModalOptions,
  ) => {
    opened.value = true
    title.value = modalTitle
    if (modalBody) {
      body.value = modalBody
    }
    type.value = modalType

    if (options?.autoclose) {
      setTimeout(() => close(), options.waitTime ? options.waitTime : autocloseWaitTime.value)
    }
  }

  const success = (title: string, body?: string, options?: ModalOptions) => {
    open(title, 'success', body, options ? options : { autoclose: true })
  }

  const error = (title: string, body?: string) => {
    open(title, 'error', body)
  }

  const close = () => {
    opened.value = false
    title.value = ''
    body.value = ''
    type.value = 'error'
  }

  return { opened, title, body, type, success, error, close }
})
