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
    locale: defaultLocale,
    translations: translations[defaultLocale],
  },
  changeLocale: (language: Locale) =>
    set((state: State) => ({
      localization: {
        locale: language,
        translations: translations["en"],
      },
    })),
}));
