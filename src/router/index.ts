import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

type AppRoute = RouteRecordRaw & {
  meta?: {
    breadcrumb?: Array<{ label: string; to: string }>
  }
}

const appRoutes: AppRoute[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: []
  },
  {
    path: '/template',
    name: 'template',
    component: () => import('../views/TemplateUsing.vue'),
    meta: {
      breadcrumb: [
        { label: 'Home', to: '/' },
        { label: 'Template', to: '/template' },
      ],
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/todos',
    name: 'todos',
    component: () => import('../views/TodosView.vue'),
  },
  {
    path: '/todo-form',
    name: 'todo-form',
    component: () => import('../views/TodoFormView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'bg-primary text-primary-content',
  routes: appRoutes,
})

export default router
