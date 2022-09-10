import { useStore } from "../../store";

export default function useTranslation() {
  const { localization } = useStore();

  function t(key: string, count?: number) {
    if (!localization.translations[key]) {
      console.warn(
        `Translation '${key}' for locale '${localization.locale}' not found.`
      );
    }
    return count && count > 1
      ? localization.translations[`${key}_plural`] || ""
      : localization.translations[key] || "";
  }

  return {
    t,
    locale: localization.locale,
  };
}
