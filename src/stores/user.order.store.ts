import { http } from '@/services/http'
import type { User } from '@/types/user.type'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useModalStore } from './modal.store'

export const useUserOrderStore = defineStore('user_order', () => {
  const USER_ENDPOINT = '/users'

  const modalStore = useModalStore()
  const user = ref<User>()
  const state = reactive({ loading: false, error: false })

  const findByCredential = (credential: string) => {
    request()
    setTimeout(() => {
      http
        .get(`${USER_ENDPOINT}/${credential}`)
        .then((res) => {
          user.value = res.data
        })
        .catch((e) => {
          console.error(e)
          state.error = true
          modalStore.error(
            'Erro ao abrir a comanda.',
            'Verifique se o crachá foi lido corretamente e tente novamente.',
          )
        })
        .finally(() => (state.loading = false))
    }, 500)
  }

  const request = () => {
    state.loading = true
    state.error = false
  }

  const reset = () => {
    state.loading = false
    state.error = false
    user.value = undefined
  }

  return { user, state, reset, findByCredential }
})
