import { useAuthStore } from '@/stores/auth.store'
import { usePermissionStore } from '@/stores/permission.store'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/LayoutView.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Início',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/products',
          name: 'Produtos',
          component: () => import('../views/ProductsView.vue'),
        },
        {
          path: '/reports',
          name: 'Relatórios',
          component: () => import('../views/ReportsView.vue'),
        },
        {
          path: '/manual-service',
          name: 'Atendimento Manual',
          component: () => import('../views/ManualServiceView.vue'),
        },
        {
          path: '/balance',
          name: 'Saldo Alimentação',
          component: () => import('../views/BalanceView.vue'),
        },
      ],
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
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

//redirects user to login if not authorized and to home if is.
router.beforeEach(async (to, _, next) => {
  const authRoutes = ['/login']

  const authStore = useAuthStore()
  await authStore.checkAuthentication()

  if (!authRoutes.includes(to.path) && !authStore.isAuthenticated) {
    next('/login')
  } else if (authRoutes.includes(to.path) && authStore.isAuthenticated) {
    next('/home')
  } else next()
})

//checks if user has access to the route and redirects if dont
router.beforeEach((to, _, next) => {
  const permissionStore = usePermissionStore()
  const redirectRoute = permissionStore.getRedirect()

  if (permissionStore.role && !permissionStore.hasAccess(to.path)) {
    next(redirectRoute ? redirectRoute : '/home')
  } else next()
})

export default router
