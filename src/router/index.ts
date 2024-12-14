import { useAuthStore } from '@/stores/auth.store'
import { usePermissionStore } from '@/stores/permission.store'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/self-service',
      name: 'self-service',
      component: () => import('../views/SelfServiceView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    { path: '/:pathMatch(.*)*', redirect: '/home' },
  ],
})

//refirects user to login if not authorized and to home if is.
router.beforeEach((to, from, next) => {
  const authRoutes = ['/login']

  const authStore = useAuthStore()

  if (!authRoutes.includes(to.path) && !authStore.isAuthenticated) {
    next('/login')
  } else if (authRoutes.includes(to.path) && authStore.isAuthenticated) {
    next('/home')
  } else next()
})

//checks if user has access to the route and redirects if dont
router.beforeEach((to, from, next) => {
  const permissionStore = usePermissionStore()
  const redirectRoute = permissionStore.getRedirect()

  if (permissionStore.role && !permissionStore.hasAccess(to.path)) {
    next(redirectRoute ? redirectRoute : '/home')
  } else next()
})

export default router
