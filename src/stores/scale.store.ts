import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useScaleServerStore } from './scale-server.store'
import { useModalStore } from './modal.store'

export const useScaleStore = defineStore('scale', () => {
  const serverStore = useScaleServerStore()
  const state = reactive({ loading: false })
  const modalStore = useModalStore()

  const defaultWeight = 0

  const weight = ref<number>(defaultWeight)

  const read = async () => {
    state.loading = true
    try {
      const weightValue = await serverStore.readWeight()
      weight.value = weightValue
    } catch (e) {
      console.log(e)
      modalStore.error(
        'Erro ao ler o peso',
        'Algum erro ocorreu ao tentar ler o peso da balança, favor contate a assistência.',
      )
    } finally {
      state.loading = false
    }
  }

  const reset = () => {
    weight.value = defaultWeight
  }

  return { weight, state, read, reset }
})
