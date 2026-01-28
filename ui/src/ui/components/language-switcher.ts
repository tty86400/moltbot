import { html } from "lit";
import { msg } from "@lit/localize";
import {
  allLocales,
  changeLocale,
  getLocale,
  getLocaleLabel,
  type Locale,
} from "../../localization/index.js";
import { icons } from "../icons.js";

export interface LanguageSwitcherProps {
  onLocaleChange?: (locale: Locale) => void;
}

export function renderLanguageSwitcher(props: LanguageSwitcherProps = {}) {
  const currentLocale = getLocale();

  const handleChange = async (e: Event) => {
    const select = e.target as HTMLSelectElement;
    const newLocale = select.value as Locale;
    try {
      await changeLocale(newLocale);
      props.onLocaleChange?.(newLocale);
    } catch (err) {
      console.error("Failed to change locale:", err);
    }
  };

  return html`
    <div class="language-switcher" title="${msg("Change language")}">
      <span class="language-switcher__icon">${icons.globe}</span>
      <select
        class="language-switcher__select"
        @change=${handleChange}
        .value=${currentLocale}
        aria-label="${msg("Language")}"
      >
        ${allLocales.map(
          (locale) => html`
            <option value=${locale} ?selected=${locale === currentLocale}>
              ${getLocaleLabel(locale)}
            </option>
          `
        )}
      </select>
    </div>
  `;
}
