import axios from 'axios'
import { createI18n } from 'vue-i18n'

export const defaultLocale = 'fr'
const fallbackLocale = 'en'

type TranslationMessages = Record<string, unknown>

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale,
  messages: {},
})

export async function loadLocaleMessages(lang: string): Promise<void> {
  const localeMessages = i18n.global.getLocaleMessage(lang)
  if (Object.keys(localeMessages).length > 0) {
    return
  }

  const { data } = await axios.get<TranslationMessages>(`/api/translations/${lang}`)
  i18n.global.setLocaleMessage(lang, data)
}

export async function setAppLocale(lang: string): Promise<void> {
  await loadLocaleMessages(lang)
  i18n.global.locale.value = lang
}

export async function initializeI18n(): Promise<void> {
  await setAppLocale(defaultLocale)
}
