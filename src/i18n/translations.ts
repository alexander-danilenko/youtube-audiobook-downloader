import enTranslations from './locales/en.json';
import ukrTranslations from './locales/ukr.json';

// Export type for translation keys based on English structure
export type TranslationKey = keyof typeof enTranslations;

// Export translations object
export const translations = {
  en: enTranslations,
  ukr: ukrTranslations,
} as const;

export type Language = keyof typeof translations;

