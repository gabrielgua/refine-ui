import { http } from '@/services/http'
import type { User } from '@/types/user.type'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useUserOrderStore = defineStore('user_order', () => {
  const USER_ENDPOINT = '/users'
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
        })
        .finally(() => (state.loading = false))
    }, 500)
  }

  const request = () => {
    state.loading = true
    state.error = false
  }

  return { user, state, findByCredential }
})
