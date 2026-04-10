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
import * as Sentry from "@sentry/vue";

const app = createApp(App)
const MyPreset = definePreset(Material, myPreset)

Sentry.init({
  app,
  dsn: "https://6b2473d76b58d8000f620a2e893c12e4@o439212.ingest.us.sentry.io/4511149517635584",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

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
