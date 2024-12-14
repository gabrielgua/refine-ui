import { useAuthStore } from '@/stores/auth.store'
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
  ],
})

router.beforeEach((to, from, next) => {
  const publicViews = ['/login']

  const authStore = useAuthStore()

  if (!publicViews.includes(to.path) && !authStore.isAuthenticated) {
    next('/login')
  } else if (publicViews.includes(to.path) && authStore.isAuthenticated) {
    next('/home')
  } else next()
})

export default router
