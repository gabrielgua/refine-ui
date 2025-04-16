import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { http } from '@/services/http'
import { useModalStore } from './modal.store'
import type { AxiosResponse } from 'axios'
import { saveAs } from 'file-saver'

export const useReportStore = defineStore('report', () => {
  const state = reactive({
    xlsx: { loading: false, error: false },
    pdf: { loading: false, error: false },
  })
  const { success, error } = useModalStore()

  const generateReport = (endpoint: string, type: 'xlsx' | 'pdf', params?: Record<string, any>) => {
    type === 'pdf' ? requestPdf() : requestXlsx()
    setTimeout(() => {
      http
        .get(endpoint, { params: params, responseType: 'blob' })
        .then((response) => {
          handleFileDownload(response)
          success(
            'Relatório gerado',
            `Seu relatório <span class="text-sky-600">"${getFilename(response)}"</span> foi gerado com successo.`,
          )
        })
        .catch((err) => {
          console.log(err)
          type === 'pdf' ? (state.pdf.error = true) : (state.xlsx.error = true)
          error('Erro ao gerar', 'Um erro inesperado ocorreu ao gerar seu relatório.')
        })
        .finally(() => {
          state.pdf.loading = false
          state.xlsx.loading = false
        })
    }, 500)
  }

  const handleFileDownload = (response: AxiosResponse) => {
    const blob = new Blob([response.data], { type: 'application/octet-stream' })
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

  const requestPdf = () => {
    state.pdf.loading = true
    state.pdf.error = false
  }

  const requestXlsx = () => {
    state.xlsx.loading = true
    state.xlsx.error = false
  }

  return { generateReport, state }
})
