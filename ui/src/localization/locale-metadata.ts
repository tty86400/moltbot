/**
 * Locale metadata for display in language switcher
 */
export interface LocaleMetadata {
  /** ISO locale code */
  code: string;
  /** English name */
  label: string;
  /** Native name (displayed to users) */
  nativeLabel: string;
  /** Optional region specifier */
  region?: string;
}

/**
 * Supported locales with their display metadata
 */
export const LOCALE_METADATA: Record<string, LocaleMetadata> = {
  en: {
    code: "en",
    label: "English",
    nativeLabel: "English",
  },
  "zh-Hans": {
    code: "zh-Hans",
    label: "Chinese (Simplified)",
    nativeLabel: "简体中文",
    region: "Mainland China",
  },
};

/**
 * Get display label for a locale (native name preferred)
 */
export function getLocaleLabel(locale: string): string {
  return LOCALE_METADATA[locale]?.nativeLabel ?? locale;
}
