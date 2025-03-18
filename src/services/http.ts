import { useAuthStore } from '@/stores/auth.store'
import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:8100/api',
})

const PUBLIC_API_ENDPOINTS: string[] = ['/auth/login', '/auth/validate-token']
const FILE_DOWNLOAD_ENDPOINTS: string[] = ['/orders/reports/csv', '/orders/reports/xlsx']

http.interceptors.request.use((config) => {
  if (PUBLIC_API_ENDPOINTS.some((endpoint) => config.url?.includes(endpoint))) {
    return config
  }

  const authStore = useAuthStore()
  config.headers.Authorization = `Bearer ${authStore.authentication?.token}`

  if (FILE_DOWNLOAD_ENDPOINTS.some((endpoint) => config.url?.includes(endpoint))) {
    config.responseType = 'blob'
  }

  return config
})
