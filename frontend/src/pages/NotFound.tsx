import useTranslation from "../translations/hooks/useTranslations";

export const NotFound = () => {
  const { t } = useTranslation();

  return <div>{t("messages.pageNotFound")}</div>;
};
