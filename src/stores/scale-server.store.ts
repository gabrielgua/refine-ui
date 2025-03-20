import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScaleServerStore = defineStore('scale-server', () => {
  const IP_SERVICE_URL = 'http://172.16.1.92:5000/get-ip'
  // const SCALE_SERVICE_URL = 'ws://172.16.1.92:8765'
  const SCALE_SERVICE_URL = 'ws://localhost:8765'

  const ip = ref<string>()
  const server = ref<WebSocket>()

  const fetchClientIp = async () => {
    try {
      ip.value = 'CLIENT_1'
      // const res = await http.get(IP_SERVICE_URL)
      // ip.value = res.data.ip
    } catch (error) {
      console.log(error)
    }
  }

  const readWeight = async (): Promise<number> => {
    await fetchClientIp()

    return new Promise((resolve, reject) => {
      if (!ip.value) {
        reject(new Error('Client IP not available.'))
      }

      server.value = new WebSocket(`${SCALE_SERVICE_URL}/${ip.value}`)

      server.value.onopen = () => {
        console.log('Connected to scale websocket server with ip: ', ip.value)
      }

      server.value.onmessage = (event) => {
        const weight = parseFloat(event.data)
        if (isNaN(weight)) {
          console.warn('Invalid weight received: ', event.data)
          server.value?.close()
          reject(new Error('Invalid weight received.'))
        }

        console.log(`Received weight: ${weight}kg`)
        resolve(weight)
        server.value?.close()
      }

      server.value.onerror = (error) => {
        console.error('Websocket server error: ', error)
        server.value?.close()
        reject(new Error('Websocket error.'))
      }

      server.value.onclose = () => console.log('Disconnected from scale websocket server')

      setTimeout(() => {
        reject(new Error('Timeout: No weight received within 10 seconds.'))
        server.value?.close()
      }, 10000)
    })
  }

  return { readWeight }
})
