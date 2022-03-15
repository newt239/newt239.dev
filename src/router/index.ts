import { createRouter, createWebHistory } from 'vue-router'
import gsap from 'gsap'
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

router.beforeEach((to, from, next) => {
  const tl = gsap.timeline()
  tl.to(".wrapper", {
    duration: 0.5,
    opacity: 0,
    onComplete: () => {
      next()
    }
  }).to(".wrapper", {
    duration: 0.5,
    opacity: 1
  }, 1)
})

export default router
