import { Localization } from "../translations/types";
import create from "zustand";
import { defaultLocale } from "../translations/config";
import translations from "../translations/locales";

export interface State {
  readonly localization: Localization;
  readonly changeLocale: () => void;
}

export const useStore = create<State>((set) => ({
  localization: {
    locale: defaultLocale,
    translations: translations[defaultLocale],
  },
  changeLocale: () =>
    set((state: State) => ({
      localization:
        state.localization.locale === defaultLocale
          ? {
              locale: "en",
              translations: translations["en"],
            }
          : {
              locale: defaultLocale,
              translations: translations[defaultLocale],
            },
    })),
}));
