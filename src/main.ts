import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import './assets/main.css'

import App from './App.vue'
import router from './router'

import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import PrimeVue from 'primevue/config'

const app = createApp(App)

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
})

app.use(createPinia())
app.use(router)
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
