import type { TranslationMessages } from './i18n'

export const mockTranslations: Record<string, TranslationMessages> = {
  en: {
    title: 'The Vue App',
    home: {
      title: 'Home',
      description: 'Welcome to the home page',
    },
    about: {
      title: 'About',
      description: 'This is the about page',
    },
  },
  fr: {
    title: "L'application Vue",
    home: {
      title: 'Accueil',
      description: "Bienvenue sur la page d'accueil",
    },
    about: {
      title: 'À propos',
      description: 'Ceci est la page à propos',
    },
  },
}
