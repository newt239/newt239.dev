import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import WorksView from '@/views/WorksView.vue'
import ShipNotify from '@/components/ShipNotify.vue'
import QuizFlasher from '@/components/QuizFlasher.vue'
import ScoreWatcher from '@/components/ScoreWatcher.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/works/',
      component: WorksView,
      children: [
        {
          path: 'ship-notify',
          component: ShipNotify
        }, {
          path: 'quiz-flasher',
          component: QuizFlasher
        },
        {
          path: 'score-watcher',
          component: ScoreWatcher
        }
      ]
    },
    {
      path: '/',
      component: HomeView
    }
  ]
})

export default router
