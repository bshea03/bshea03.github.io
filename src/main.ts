import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AOS from 'aos'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import './assets/index.css'
import 'aos/dist/aos.css'
import { useExperience } from '@/stores/experience'

import App from './App.vue'
import router from './router'

AOS.init()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Particles, {
  init: async (engine) => {
    await loadSlim(engine)
  },
})

const experience = useExperience()
experience.loadAll().then(() => {
  app.mount('#app')
})

document.documentElement.classList.add('dark')
