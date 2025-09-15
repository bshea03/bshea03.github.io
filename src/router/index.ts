// router.ts
import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('@/views/HomeView.vue')
const ExperienceView = () => import('@/views/ExperienceView.vue')
const ReadmeView = () => import('@/views/ReadmeView.vue')

const SCROLL_OFFSET = 64 // same offset you used elsewhere

function waitForElement(selector: string | null, timeout = 600, pollInterval = 20) {
  if (!selector) return Promise.resolve(document.documentElement)
  const id = selector.replace('#', '')
  let elapsed = 0
  return new Promise<HTMLElement | null>((resolve) => {
    const tryFind = () => {
      const el = document.getElementById(id)
      if (el) return resolve(el as HTMLElement)
      elapsed += pollInterval
      if (elapsed >= timeout) return resolve(null)
      setTimeout(tryFind, pollInterval)
    }
    tryFind()
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView, meta: { transition: 'fade' } },
    { path: '/experience', component: ExperienceView, meta: { transition: 'fade' } },
    {
      path: '/readme/:version',
      component: ReadmeView,
      meta: { transition: 'fade' },
    },
  ],

  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      const el = await waitForElement(to.hash, 800, 25)

      if (el) {
        const rect = el.getBoundingClientRect()
        const top = (window.scrollY || window.pageYOffset) + rect.top - SCROLL_OFFSET
        return { left: 0, top, behavior: 'smooth' }
      }

      return { left: 0, top: 0 }
    }

    return { left: 0, top: 0 }
  },
})

export default router
