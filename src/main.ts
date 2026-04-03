import { createPinia } from 'pinia'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import './assets/base.css'
import './assets/main.css'

import { definePreset } from '@primeuix/themes'
import Material from '@primeuix/themes/material'
import { ToastService, Tooltip } from 'primevue'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import App from './App.vue'
import router from './app/router'
import { i18n, initializeI18n } from './i18n'
import { myPreset } from './my-preset'

const app = createApp(App)
const MyPreset = definePreset(Material, myPreset)

app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(ConfirmationService)
app.use(PrimeVue, {
  unstyled: false,
  ripple: true,
  inputVariant: 'filled',
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: 'system',
    },
  },
})
app.use(i18n)
app.directive('tooltip', Tooltip)

async function bootstrap(): Promise<void> {
  await initializeI18n()
  app.mount('#app')
}

void bootstrap()
