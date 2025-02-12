import { http } from '@/services/http'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useModalStore } from './modal.store'
import type { Client } from '@/types/client.type'

export const useClientOrderStore = defineStore('client_order', () => {
  const CLIENT_ENDPOINT = '/clients'

  const modalStore = useModalStore()
  const client = ref<Client>()
  const state = reactive({ loading: false, error: false })

  const findByCredential = (credential: string) => {
    request()
    setTimeout(() => {
      http
        .get(`${CLIENT_ENDPOINT}/${credential}`)
        .then((res) => {
          client.value = res.data
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
    client.value = undefined
  }

  return { client, state, reset, findByCredential }
})
