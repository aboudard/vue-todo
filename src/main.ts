import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import './assets/main.css'

import App from './App.vue'
import router from './router'

import Aura from '@primevue/themes/aura'
import PrimeVue from 'primevue/config'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  unstyled: false,
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
