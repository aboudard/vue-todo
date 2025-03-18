import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import './assets/main.css'

import App from './App.vue'
import router from './router'

import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'
import { ToastService } from 'primevue'

const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#642e9b',
      100: '#642e9b',
      200: '#642e9b',
      300: '#642e9b',
      400: '#642e9b',
      500: '#642e9b',
      600: '#642e9b',
      700: '#642e9b',
      800: '#642e9b',
      900: '#642e9b',
      950: '#642e9b',
    },
  },
})

app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(PrimeVue, {
  unstyled: false,
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: 'system',
    },
  },
})

app.mount('#app')
