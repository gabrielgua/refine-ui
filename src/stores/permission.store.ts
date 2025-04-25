import type { UserRole } from '@/types/user.type'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useAuthStore } from './auth.store'

export const usePermissionStore = defineStore('permission', () => {
  const authStore = useAuthStore()

  const role = computed(() => authStore.user?.role)

  const permissions: Record<UserRole, { allowedRoutes: string[]; defaultRedirect?: string }> = {
    ADMIN: {
      allowedRoutes: [
        '/login',
        '/home',
        '/self-service',
        '/products',
        '/reports',
        '/manual-service',
        '/balance',
        '/credential-ranges',
      ],
    },
    SELF_SERVICE: { allowedRoutes: ['/login', '/self-service'], defaultRedirect: '/self-service' },
    STOCK: { allowedRoutes: [] },
    TREASURY: { allowedRoutes: [] },
  }

  const hasAccess = (route: string) => {
    if (!role.value) return
    return permissions[role.value].allowedRoutes.includes(route)
  }

  const getRedirect = () => {
    if (!role.value) return
    return permissions[role.value].defaultRedirect
  }

  return { role, hasAccess, getRedirect }
})
