import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { http } from '@/services/http'
import { useModalStore } from './modal.store'
import type { AxiosResponse } from 'axios'
import { saveAs } from 'file-saver'

export const useReportStore = defineStore('report', () => {
  const REPORT_ENDPOINT = '/orders/reports/csv'
  const state = reactive({ loading: false, error: false })
  const { success, error } = useModalStore()

  const generateReport = (formValues: Record<string, any>) => {
    request()
    setTimeout(() => {
      http
        .get(REPORT_ENDPOINT)
        .then((response) => {
          handleFileDownload(response)
          success(
            'Relatório gerado',
            `Seu relatório <span class="text-sky-600">"${getFilename(response)}"</span> foi gerado com successo.`,
          )
        })
        .catch((err) => {
          console.log(err)
          state.error = true
          error('Erro ao gerar', 'Um erro inesperado ocorreu ao gerar seu relatório.')
        })
        .finally(() => {
          state.loading = false
        })
    }, 500)
  }

  const handleFileDownload = (response: AxiosResponse) => {
    const blob = new Blob([response.data], { type: 'application/octed-stream' })
    saveAs(blob, getFilename(response))
  }

  const getFilename = (response: AxiosResponse) => {
    let filename = 'order_report'
    const contentDisposition = response.headers['content-disposition']

    if (contentDisposition) {
      const match = contentDisposition.match(/filename=([^;]+)/)
      if (match) {
        filename = match[1]
      }
    }

    return filename
  }

  const request = () => {
    state.loading = true
    state.error = false
  }

  return { generateReport, state }
})
