import { createRouter, createWebHistory } from 'vue-router'
import IntroView from '../views/IntroView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top on new route
    return { top: 0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: IntroView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/add-new-habit',
      name: 'add-new-habit',
      component: () => import('../views/AddNewHabitView.vue'),
    },
    {
      path: '/create-new-habit',
      name: 'create-new-habit',
      component: () => import('../views/CreateNewHabitView.vue'),
    },
    {
      path: '/habits',
      name: 'habits',
      component: () => import('../views/AllHabitsView.vue'),
    },
    {
      path: '/habit/:id',
      name: 'habit-details',
      component: () => import('../views/HabitDetailsView.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatsView.vue'),
    },
  ],
})

export default router
