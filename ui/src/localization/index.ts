import { configureLocalization, type LocaleModule } from "@lit/localize";
import { sourceLocale, targetLocales, type Locale } from "../generated/locale-codes.js";
import { detectUserLocale, saveLocalePreference } from "./locale-detector.js";

export { sourceLocale, targetLocales, type Locale } from "../generated/locale-codes.js";
export { allLocales } from "../generated/locale-codes.js";
export { LOCALE_METADATA, getLocaleLabel } from "./locale-metadata.js";

const localeModules: Record<string, () => Promise<LocaleModule>> = {
  "zh-Hans": () => import("../generated/locales/zh-Hans.js") as Promise<LocaleModule>,
};

const localization = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: async (locale: string) => {
    const loader = localeModules[locale];
    if (!loader) {
      throw new Error(`Unknown locale: ${locale}`);
    }
    return loader();
  },
});

export const getLocale = localization.getLocale;
export const setLocale = localization.setLocale;

export async function changeLocale(locale: Locale): Promise<void> {
  await setLocale(locale);
  saveLocalePreference(locale);
}

export async function initializeLocale(): Promise<void> {
  const detectedLocale = detectUserLocale();
  if (detectedLocale !== sourceLocale) {
    try {
      await setLocale(detectedLocale);
    } catch {
      console.warn(`Failed to load locale ${detectedLocale}, falling back to ${sourceLocale}`);
    }
  }
}
