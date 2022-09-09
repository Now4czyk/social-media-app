import { Locale, Localization } from "../translations/types";
import create from "zustand";
import { defaultLocale } from "../translations/config";
import translations from "../translations/locales";

export interface State {
  readonly localization: Localization;
  readonly changeLocale: (language: Locale) => void;
}

export const useStore = create<State>((set) => ({
  localization: {
    locale: (localStorage.getItem("lang") as Locale) || defaultLocale,
    translations:
      translations[(localStorage.getItem("lang") as Locale) || defaultLocale],
  },
  changeLocale: (language: Locale) => {
    set((state: State) => ({
      localization: {
        locale: language,
        translations: translations[language],
      },
    }));
    localStorage.setItem("lang", language);
  },
}));
