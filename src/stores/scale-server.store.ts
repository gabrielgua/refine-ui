import { http } from '@/services/http'
import { useWebSocket, type UseWebSocketReturn } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useScaleServerStore = defineStore('scale-server', () => {
  const IP_SERVICE_URL = 'http://172.16.1.92:5000/get-ip'
  const SCALE_SERVICE_URL = 'ws://172.16.1.92:8765'

  const ip = ref<string>()
  const server = ref<UseWebSocketReturn<any>>()

  const data = ref<string>('')

  const fetchClientIp = async () => {
    try {
      const res = await http.get(IP_SERVICE_URL)
      ip.value = res.data.ip
    } catch (error) {
      console.log(error)
    }
  }

  const connect = async () => {
    await fetchClientIp()

    if (ip.value) {
      console.log(ip.value)
      server.value = useWebSocket(`${SCALE_SERVICE_URL}/${ip.value}`, {
        immediate: false,
        autoReconnect: {
          retries: 3,
          delay: 1000,
          onFailed() {
            console.log('Connection failed to scale webserver after 3 retries.')
          },
        },
        onConnected() {
          console.log('Connected to scale websocket server.')
        },
        onDisconnected() {
          console.log('Disconnected from scale websocket server.')
        },
        onMessage(_, event) {
          data.value = event.data
        },
      })

      if (server.value) {
        open()
      }
    }
  }

  const open = () => {
    if (server.value) {
      server.value.open()
    }
  }

  const close = () => {
    if (server.value) {
      server.value.close()
    }
  }

  return { connect, data, open, close }
})
