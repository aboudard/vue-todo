import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import './assets/base.css'
import './assets/main.css'

import App from './App.vue'
import router from './router'
import ConfirmationService from 'primevue/confirmationservice'

import { definePreset } from '@primeuix/themes'
import Material from '@primeuix/themes/lara'
import PrimeVue from 'primevue/config'
import { ToastService } from 'primevue'
import { useAppStore } from './stores/app.store'

const app = createApp(App)

const MyPreset = definePreset(Material, {
  semantic: {
    primary: {
      50: '#ede7f6',
      100: '#d1c4e9',
      200: '#b39ddb',
      300: '#9575cd',
      400: '#7e57c2',
      500: '#673ab7',
      600: '#5e35b1',
      700: '#512da8',
      800: '#4527a0',
      900: '#311b92',
      950: '#23036a',
    },
  },
})

app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(ConfirmationService)
app.use(PrimeVue, {
  unstyled: false,
  ripple: true,
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: 'system',
    },
  },
})

app.mount('#app')
