import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/user/Login.vue'
import Dashboard from '../components/dashboard/Dashboard.vue'
import Stock from '../components/stock/Stock.vue'
import StockDetail from '../components/stock/StockDetail.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/stocks',
      name: 'stock',
      component: Stock
    },
    {
      path: '/stocks/:id',
      name: 'stock-detail',
      component: StockDetail
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
