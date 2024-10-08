import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'

export const resources = {
  en: { translation: en },
}

const initI18n = async () => {
  i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
}

initI18n()

export default i18n
