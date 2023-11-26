import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue')
    },
    {
      path: '/Map',
      name: 'map',
      component: () => import('../views/MapView.vue')
    }
  ]
})

export default router
