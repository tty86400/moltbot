import { allLocales, sourceLocale, type Locale } from "../generated/locale-codes.js";

const STORAGE_KEY = "moltbot-locale";

export function detectUserLocale(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && (allLocales as readonly string[]).includes(saved)) {
    return saved as Locale;
  }

  const browserLang = navigator.language;

  if ((allLocales as readonly string[]).includes(browserLang)) {
    return browserLang as Locale;
  }

  const langPrefix = browserLang.split("-")[0];

  if (langPrefix === "zh") {
    return "zh-Hans";
  }

  const match = allLocales.find((locale) => locale.startsWith(langPrefix));
  if (match) {
    return match;
  }

  return sourceLocale;
}

export function saveLocalePreference(locale: Locale): void {
  localStorage.setItem(STORAGE_KEY, locale);
}

export function clearLocalePreference(): void {
  localStorage.removeItem(STORAGE_KEY);
}
