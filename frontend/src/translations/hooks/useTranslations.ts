import { useStore } from "../../store";

export default function useTranslation() {
  const { localization } = useStore();

  function t(key: string) {
    if (!localization.translations[key]) {
      console.warn(
        `Translation '${key}' for locale '${localization.locale}' not found.`
      );
    }
    return localization.translations[key] || "";
  }

  return {
    t,
    locale: localization.locale,
  };
}
