import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import './assets/base.css'
import './assets/main.css'

import { definePreset } from '@primeuix/themes'
import Material from '@primeuix/themes/material'
import { ToastService } from 'primevue'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import App from './App.vue'
import { myPreset } from './my-preset'
import router from './router'

const app = createApp(App)

const MyPreset = definePreset(Material, myPreset)

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
