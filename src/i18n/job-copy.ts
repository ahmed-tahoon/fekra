import type { Locale } from './routing'

export const englishJobNotice: Record<Locale, string> = {
  en: 'Job titles and descriptions are shown in their original English where a translation is not available.',
  ar: 'تُعرض المسميات والأوصاف الوظيفية باللغة الإنجليزية الأصلية عند عدم توفر ترجمة.',
  de: 'Stellenbezeichnungen und Beschreibungen werden im englischen Original angezeigt, wenn keine Übersetzung vorliegt.',
  fr: 'Les intitulés et descriptions de poste sont affichés en anglais lorsqu’aucune traduction n’est disponible.',
  es: 'Los títulos y las descripciones de los puestos se muestran en su inglés original cuando no hay una traducción disponible.',
}

const locations: Record<string, Record<Locale, string>> = {
  'Remote — Dubai business hours': { en: 'Remote — Dubai business hours', ar: 'عن بُعد — ساعات العمل في دبي', de: 'Remote — Geschäftszeiten in Dubai', fr: 'À distance — horaires de travail de Dubaï', es: 'En remoto — horario laboral de Dubái' },
  'Remote — USA time zone': { en: 'Remote — USA time zone', ar: 'عن بُعد — بتوقيت الولايات المتحدة', de: 'Remote — US-Zeitzone', fr: 'À distance — fuseau horaire des États-Unis', es: 'En remoto — zona horaria de Estados Unidos' },
  'Remote — Egypt': { en: 'Remote — Egypt', ar: 'عن بُعد — مصر', de: 'Remote — Ägypten', fr: 'À distance — Égypte', es: 'En remoto — Egipto' },
  'Remote — EMEA': { en: 'Remote — EMEA', ar: 'عن بُعد — أوروبا والشرق الأوسط وأفريقيا', de: 'Remote — Europa, Naher Osten und Afrika', fr: 'À distance — Europe, Moyen-Orient et Afrique', es: 'En remoto — Europa, Oriente Medio y África' },
  'Remote': { en: 'Remote', ar: 'عن بُعد', de: 'Remote', fr: 'À distance', es: 'En remoto' },
  'Cairo, Egypt': { en: 'Cairo, Egypt', ar: 'القاهرة، مصر', de: 'Kairo, Ägypten', fr: 'Le Caire, Égypte', es: 'El Cairo, Egipto' },
  'Riyadh, Saudi Arabia': { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، السعودية', de: 'Riad, Saudi-Arabien', fr: 'Riyad, Arabie saoudite', es: 'Riad, Arabia Saudí' },
  'Dubai, United Arab Emirates': { en: 'Dubai, United Arab Emirates', ar: 'دبي، الإمارات العربية المتحدة', de: 'Dubai, Vereinigte Arabische Emirate', fr: 'Dubaï, Émirats arabes unis', es: 'Dubái, Emiratos Árabes Unidos' },
}

export function localizeJobLocation(location: string | null | undefined, locale: Locale) {
  return location ? locations[location]?.[locale] ?? location : location
}

export function jobCopyLanguage(job: { availableLocales?: string[] | null }, locale: Locale) {
  return locale !== 'en' && !job.availableLocales?.includes(locale) ? 'en' : locale
}
